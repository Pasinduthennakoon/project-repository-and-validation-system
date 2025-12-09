package com.trinco.researchrepo.research_repo_backend.service.impl;

import com.trinco.researchrepo.research_repo_backend.dto.queryinterfaces.UserDetailsProjection;
import com.trinco.researchrepo.research_repo_backend.dto.request.LoginRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.request.PendingUserSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.request.UserSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.LoginResponseDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.UploadProjectUsersResponseDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.UserManagementResponseDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Pending_Users;
import com.trinco.researchrepo.research_repo_backend.entity.Students;
import com.trinco.researchrepo.research_repo_backend.entity.Users;
import com.trinco.researchrepo.research_repo_backend.exceptions.EntryDuplicationException;
import com.trinco.researchrepo.research_repo_backend.exceptions.NotFoundException;
import com.trinco.researchrepo.research_repo_backend.repo.PendingUsersRepo;
import com.trinco.researchrepo.research_repo_backend.repo.UserRepo;
import com.trinco.researchrepo.research_repo_backend.service.JwtService;
import com.trinco.researchrepo.research_repo_backend.service.UserSevice;
import com.trinco.researchrepo.research_repo_backend.util.mappers.PendingProjectMapper;
import com.trinco.researchrepo.research_repo_backend.util.mappers.UsersMapper;
import jakarta.el.PropertyNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceIMPL implements UserSevice {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private UsersMapper usersMapper;

    @Autowired
    private PendingUsersRepo pendingUsersRepo;

    @Autowired
    private PendingProjectMapper pendingProjectMapper;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Users addUser(UserSaveRequestDTO userSaveRequestDTO) {
        Users user = usersMapper.RequestDtoToEntity(userSaveRequestDTO);
        String encodedPassword = passwordEncoder.encode(userSaveRequestDTO.getPassword());
        user.setPassword(encodedPassword);
        user.setActiveState(true);
        if(!userRepo.existsById(user.getUserId())){
            return userRepo.save(user);
        }else {
            throw new EntryDuplicationException("User already exists");
        }

    }

    @Override
    public String approveUser(int pendingId) {
        Pending_Users pendinga_users = pendingUsersRepo.findById(pendingId)
                .orElseThrow(() -> new RuntimeException("pending user not found"));


        PendingUserSaveRequestDTO pendingUserSaveRequestDTO = usersMapper.EntityToPenddingUserDto(pendinga_users);
        UserSaveRequestDTO userSaveRequestDTO = usersMapper.PendingUserDtoToUserDto(pendingUserSaveRequestDTO);
        Users users = usersMapper.RequestDtoToEntity(userSaveRequestDTO);
        users.setPassword(pendinga_users.getPassword());

        if (userRepo.existsByEmail(userSaveRequestDTO.getEmail())) {
            throw new EntryDuplicationException("Email already exists!");
        }else{
            users.setActiveState(true);
            userRepo.save(users);
            pendingUsersRepo.delete(pendinga_users);

            return String.valueOf(users.getUserId());
        }
    }

    @Override
    public boolean rejectUser(int pendingId) {
        if (pendingUsersRepo.existsById(pendingId)) {
            pendingUsersRepo.deleteById(pendingId);
        }else {
            throw new PropertyNotFoundException("Not found user for this id");
        }
        return true;
    }

    @Override
    public LoginResponseDTO authenticate(LoginRequestDTO request) {
        // 1. Find User by Email (Assuming Repo is injected as userRepo)
        Users user = userRepo.findByEmail(request.getEmail());

        if (user == null) {
            // Throw exception that can be caught by a Global Exception Handler
            throw new NotFoundException("Invalid credentials: User not found.");
        }

        System.out.println("user given password : " + request.getPassword());

        // 3. ⚠️ CRITICAL STEP: VERIFY THE PASSWORD HASH
        // This method returns true ONLY if the raw password matches the hash.
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            // Throw exception if passwords don't match
            throw new RuntimeException("Invalid Credentials.");
        }
        // 2. Generate Token (Crucial for session management)
        String jwtToken = jwtService.generateToken(user); // JWT is highly recommended

        // 3. Build Response and conditionally include student-specific fields

        // Initialize student fields to null
        String responseRegNo = null;
        String responseBatch = null;

        if ("STUDENT".equals(user.getRole())) {
            Students studentDetails = user.getStudent(); // Get the related Students entity

            // ⚠️ CRITICAL NULL CHECK: Ensure the Students relationship object exists
            if (studentDetails != null) {
                responseRegNo = studentDetails.getRegNo();
                responseBatch = studentDetails.getBatch();
            }
        }

        // 4. Build Response
        return new LoginResponseDTO(
                jwtToken,
                user.getUserId(),
                user.getUserName(),
                user.getRole(),
                user.getEmail(),
                user.getDepartment(),
                user.getPhotoLink(),
                responseRegNo,
                responseBatch
        );
    }


    @Override
    public String updateActiveState(int userId, boolean status) {
        if (userRepo.existsById(userId)) {
            Users users = userRepo.getReferenceById(userId);
            users.setActiveState(status);
            userRepo.save(users);
            return "successfully updated";
        } else {
            throw new NotFoundException("this user not found");
        }
    }

    @Override
    public List<UploadProjectUsersResponseDTO> uploadUses() {
        List<Users> users = userRepo.findAll();
        List<UploadProjectUsersResponseDTO> uploadProjectUsersResponseDTOS = pendingProjectMapper.ResponseUsersEntityListToDtoList(users);

        return uploadProjectUsersResponseDTOS;
    }


    @Override
    public List<UserManagementResponseDTO> getAllUsersForUserManagemet(String role) {
        // Filter: If role is null or empty, the query returns all users.
        String trimmedRole = (role != null) ? role.trim() : null;

        String filterRole = (trimmedRole != null && !trimmedRole.isEmpty() && !trimmedRole.equalsIgnoreCase("ALL ROLES"))
                ? trimmedRole.toUpperCase()
                : null;

        // 1. Fetch data using the JPA Projection
        List<UserDetailsProjection> projections = userRepo.findUserManagmentDetailsByRole(filterRole);

        // 2. Map the projections to the DTO list
        return projections.stream()
                .map(this::mapProjectionToDTO)
                .collect(Collectors.toList());
    }

    private UserManagementResponseDTO mapProjectionToDTO(UserDetailsProjection projection) {

        UserManagementResponseDTO userManagementResponseDTO = UserManagementResponseDTO.builder()
                .userId(projection.getUserId())
                .userName(projection.getUserName())
                .department(projection.getDepartment())
                .email(projection.getEmail())
                .role(projection.getRole())
                .build();

        // Conditionally set student fields only if the role is STUDENT
        if ("STUDENT".equalsIgnoreCase(projection.getRole())) {
            userManagementResponseDTO.setRegNo(projection.getRegNo());
            userManagementResponseDTO.setBatch(projection.getBatch());
        }

        return userManagementResponseDTO;
    }

    @Override
    public List<String> getUserDepartments() {
        List<String> departments = userRepo.findDistinctDepartments();
        return departments;
    }

//delete users
    @Override
    public boolean deleteUser(int userId) {
        if (userRepo.existsById(userId)) {
            userRepo.deleteById(userId);
        }else {
            throw new PropertyNotFoundException("Not found user for this id");
        }
        return false;
    }

    @Override
    public boolean deleteUserPhoto(int userId) {
        if (userRepo.existsById(userId)) {
            //future also delete from cloud storage
            userRepo.deletePhotoById(userId);
        }
        return true;
    }
}

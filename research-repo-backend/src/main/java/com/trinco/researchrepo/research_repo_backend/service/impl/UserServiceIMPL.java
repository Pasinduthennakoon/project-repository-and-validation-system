package com.trinco.researchrepo.research_repo_backend.service.impl;

import com.trinco.researchrepo.research_repo_backend.dto.queryinterfaces.UserDetailsProjection;
import com.trinco.researchrepo.research_repo_backend.dto.request.PendingUserSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.request.UserSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.UploadProjectUsersResponseDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.UserManagementResponseDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Pending_Users;
import com.trinco.researchrepo.research_repo_backend.entity.Students;
import com.trinco.researchrepo.research_repo_backend.entity.Users;
import com.trinco.researchrepo.research_repo_backend.exceptions.EntryDuplicationException;
import com.trinco.researchrepo.research_repo_backend.exceptions.NotFoundException;
import com.trinco.researchrepo.research_repo_backend.repo.PendingUsersRepo;
import com.trinco.researchrepo.research_repo_backend.repo.UserRepo;
import com.trinco.researchrepo.research_repo_backend.service.UserSevice;
import com.trinco.researchrepo.research_repo_backend.util.mappers.PendingProjectMapper;
import com.trinco.researchrepo.research_repo_backend.util.mappers.UsersMapper;
import jakarta.el.PropertyNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
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
    private PendingUsersRepo pendingUsersRepo2;

    @Autowired
    private PendingProjectMapper pendingProjectMapper;

    @Override
    public Users addUser(UserSaveRequestDTO userSaveRequestDTO) {
        Users user = usersMapper.RequestDtoToEntity(userSaveRequestDTO);
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
}

package com.trinco.researchrepo.research_repo_backend.service.impl;

import com.trinco.researchrepo.research_repo_backend.dto.request.PendingUserSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.request.UserSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Pending_Users;
import com.trinco.researchrepo.research_repo_backend.entity.Students;
import com.trinco.researchrepo.research_repo_backend.entity.Users;
import com.trinco.researchrepo.research_repo_backend.exceptions.EntryDuplicationException;
import com.trinco.researchrepo.research_repo_backend.repo.PendingUsersRepo;
import com.trinco.researchrepo.research_repo_backend.repo.UserRepo;
import com.trinco.researchrepo.research_repo_backend.service.UserSevice;
import com.trinco.researchrepo.research_repo_backend.util.mappers.UsersMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
            userRepo.save(users);
            pendingUsersRepo.delete(pendinga_users);

            return String.valueOf(users.getUserId());
        }
    }
}

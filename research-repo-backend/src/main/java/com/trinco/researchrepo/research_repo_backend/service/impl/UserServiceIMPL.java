package com.trinco.researchrepo.research_repo_backend.service.impl;

import com.trinco.researchrepo.research_repo_backend.dto.request.UserSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Users;
import com.trinco.researchrepo.research_repo_backend.exceptions.EntryDuplicationException;
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
}

package com.trinco.researchrepo.research_repo_backend.service.impl;

import com.trinco.researchrepo.research_repo_backend.dto.request.PendingUserSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Pending_Users;
import com.trinco.researchrepo.research_repo_backend.exceptions.EntryDuplicationException;
import com.trinco.researchrepo.research_repo_backend.repo.PendingUsersRepo;
import com.trinco.researchrepo.research_repo_backend.service.PendingUserService;
import com.trinco.researchrepo.research_repo_backend.util.mappers.PendingUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PendingUserServiceIMPL implements PendingUserService {

    @Autowired
    private PendingUserMapper pendingUserMapper;

    @Autowired
    private PendingUsersRepo pendingUsersRepo;

    @Override
    public String addPendingUser(PendingUserSaveRequestDTO pendingUserSaveRequestDTO) {
        Pending_Users pendingUsers = pendingUserMapper.RequestToDtoToEntity(pendingUserSaveRequestDTO);
        if (!pendingUsersRepo.existsById(pendingUsers.getPendingUserId())){
            pendingUsersRepo.save(pendingUsers);
            return "Pending user added";
        }else {
            throw new EntryDuplicationException("Pending user already exists");
        }
    }
}

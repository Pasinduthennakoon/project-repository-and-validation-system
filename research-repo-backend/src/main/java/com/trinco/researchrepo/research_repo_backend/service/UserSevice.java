package com.trinco.researchrepo.research_repo_backend.service;

import com.trinco.researchrepo.research_repo_backend.dto.request.PendingUserSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.request.UserSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Users;
import org.springframework.stereotype.Service;

public interface UserSevice {
    Users addUser(UserSaveRequestDTO userSaveRequestDTO);

    String approveUser(int pendingId);
}

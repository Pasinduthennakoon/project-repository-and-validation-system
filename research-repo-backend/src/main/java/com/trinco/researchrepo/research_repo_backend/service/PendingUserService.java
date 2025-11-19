package com.trinco.researchrepo.research_repo_backend.service;

import com.trinco.researchrepo.research_repo_backend.dto.request.PendingUserSaveRequestDTO;

public interface PendingUserService {
    String addPendingUser(PendingUserSaveRequestDTO pendingUserSaveRequestDTO);

}

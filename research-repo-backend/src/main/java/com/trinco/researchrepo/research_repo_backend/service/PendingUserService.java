package com.trinco.researchrepo.research_repo_backend.service;

import com.trinco.researchrepo.research_repo_backend.dto.request.PendingUserSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.PendingUsersResponseDTO;

import java.util.List;

public interface PendingUserService {
    String addPendingUser(PendingUserSaveRequestDTO pendingUserSaveRequestDTO);

    List<PendingUsersResponseDTO> getPendingUsersForApproval();
}

package com.trinco.researchrepo.research_repo_backend.service;

import com.trinco.researchrepo.research_repo_backend.dto.request.PendingProjectSaveRequestDTO;

public interface PendingProjectService {
    String addPendingProject(PendingProjectSaveRequestDTO pendingProjectSaveRequestDTO);
}

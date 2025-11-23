package com.trinco.researchrepo.research_repo_backend.service;

import com.trinco.researchrepo.research_repo_backend.dto.request.ProjectSaveRequestDTO;

public interface ProjectService {
    String approveProject(int pendingId);
}

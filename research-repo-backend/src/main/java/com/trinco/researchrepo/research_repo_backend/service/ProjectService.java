package com.trinco.researchrepo.research_repo_backend.service;

import com.trinco.researchrepo.research_repo_backend.dto.request.ProjectSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.ProjectPageDataResponseDTO;

public interface ProjectService {
    String approveProject(int pendingId);

    ProjectPageDataResponseDTO getProjectPageData(int projectId);
}

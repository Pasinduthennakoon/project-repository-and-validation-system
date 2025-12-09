package com.trinco.researchrepo.research_repo_backend.service;

import com.trinco.researchrepo.research_repo_backend.dto.LanguageUsageDTO;
import com.trinco.researchrepo.research_repo_backend.dto.request.ProjectSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.ProjectPageDataResponseDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.ProjectReviewResponseDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.ProjectsBorwsResponseDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.ProjectsByUserResponseDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Projects;

import java.util.List;

public interface ProjectService {

    ProjectPageDataResponseDTO getProjectPageData(int projectId);

    Projects updateLanguageUsed(int projectId, List<LanguageUsageDTO> languageUsage);

    Projects updateProjectTags(int projectId, List<String> tags);

    List<ProjectsBorwsResponseDTO> getAllProjects();

    List<ProjectReviewResponseDTO> viewProjectForReview();

    List<ProjectsByUserResponseDTO> getMyProjects(int userId);
}

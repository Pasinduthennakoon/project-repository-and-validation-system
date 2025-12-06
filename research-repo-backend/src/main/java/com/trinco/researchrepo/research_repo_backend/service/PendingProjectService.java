package com.trinco.researchrepo.research_repo_backend.service;

import com.trinco.researchrepo.research_repo_backend.dto.request.PendingProjectSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.PendingProjectApprovelResponseDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Projects;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PendingProjectService {
    String addPendingProject(PendingProjectSaveRequestDTO pendingProjectSaveRequestDTO);

    List<PendingProjectApprovelResponseDTO> getPendingProjects();

    String approveProject(int pendingId);

    boolean rejectPendingProject(int pendingProjectId);
}

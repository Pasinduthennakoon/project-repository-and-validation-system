package com.trinco.researchrepo.research_repo_backend.service;

import java.util.List;
import java.util.Map;

import com.trinco.researchrepo.research_repo_backend.dto.response.AdminDashboardSummaryResponseDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.RecentProjectResponseDTO;

public interface AdminDashboardService {
    AdminDashboardSummaryResponseDTO getSummary();
    Map<String, Object> getDeptCounts();
    List<RecentProjectResponseDTO> getRecentProjects();
}

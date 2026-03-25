package com.trinco.researchrepo.research_repo_backend.service;

import com.trinco.researchrepo.research_repo_backend.dto.response.SupervisorDashboardSummaryResponseDTO;

public interface SupervisorDashboardService {

    SupervisorDashboardSummaryResponseDTO getSummary(String department);
    
}

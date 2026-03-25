package com.trinco.researchrepo.research_repo_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SupervisorDashboardSummaryResponseDTO {
    private long totalProjects;
    private long ideasAnalyzed;
    private long activeStudents;
    private long registeredStudents;
}

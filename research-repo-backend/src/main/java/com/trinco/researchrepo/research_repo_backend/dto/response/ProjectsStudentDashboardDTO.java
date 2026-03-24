package com.trinco.researchrepo.research_repo_backend.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProjectsStudentDashboardDTO {
    private int projectId;
    private String title;
    private List<String> tags;
    private String batch;
    private String department;
}

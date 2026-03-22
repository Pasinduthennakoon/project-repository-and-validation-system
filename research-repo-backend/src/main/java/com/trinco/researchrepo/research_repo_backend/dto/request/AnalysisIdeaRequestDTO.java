package com.trinco.researchrepo.research_repo_backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AnalysisIdeaRequestDTO {
    private String title;
    private String name;
    private String department;
    private String batch;
    private String matched;
    private String status;
}

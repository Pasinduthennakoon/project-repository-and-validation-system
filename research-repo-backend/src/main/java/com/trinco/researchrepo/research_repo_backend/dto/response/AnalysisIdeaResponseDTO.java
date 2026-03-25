package com.trinco.researchrepo.research_repo_backend.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AnalysisIdeaResponseDTO {
    private String title;
    private String name;
    private String department;
    private String matched;
    private String status;
    private LocalDateTime createdAt;
}

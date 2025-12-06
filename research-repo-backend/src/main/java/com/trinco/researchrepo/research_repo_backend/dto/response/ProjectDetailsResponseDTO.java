package com.trinco.researchrepo.research_repo_backend.dto.response;

import com.trinco.researchrepo.research_repo_backend.dto.LanguageUsageDTO;
import com.trinco.researchrepo.research_repo_backend.dto.StudentDTO;
import com.trinco.researchrepo.research_repo_backend.dto.SupervisorDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProjectDetailsResponseDTO {
    // Project Info
    private int projectId; // Changed to int based on entity
    private String title;
    private String abstract_;
    private String githubLink;
    private String pdfLink;
    private String createdAt;
    private List<String> tags; // Using List<String> based on entity
    private List<LanguageUsageDTO> languagesUsed; // Using List<LanguageUsageDTO> based on entity

    private StudentDTO students;
    private SupervisorDTO supervisors;

    // Review Info (from Reviews)
    private int watches; // Changed to int based on entity
    private int stars;   // Changed to int based on entity
}

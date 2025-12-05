package com.trinco.researchrepo.research_repo_backend.dto.response;

import com.trinco.researchrepo.research_repo_backend.dto.LanguageUsageDTO;
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

    // Uploader Info (from Users & Students)
    private String uploaderName;
    private String uploaderPhoto;
    private String uploaderBatch;
    private String uploaderDepartment;

    // Supervisor Info (from Users)
    private String supervisorName;
    private String supervisorPhoto;
    private String supervisorEmail;
    private String supervisorDepartment;

    // Review Info (from Reviews)
    private int watches; // Changed to int based on entity
    private int stars;   // Changed to int based on entity
}

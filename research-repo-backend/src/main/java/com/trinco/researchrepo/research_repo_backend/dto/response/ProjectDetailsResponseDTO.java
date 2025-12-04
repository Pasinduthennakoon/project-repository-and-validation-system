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

    public ProjectDetailsResponseDTO(int projectId, String title, String abstract_, String githubLink, String pdfLink, String createdAt, String uploaderName, String uploaderPhoto, String uploaderBatch, String uploaderDepartment, String supervisorName, String supervisorPhoto, String supervisorEmail, String supervisorDepartment, int watches, int stars) {
        this.projectId = projectId;
        this.title = title;
        this.abstract_ = abstract_;
        this.githubLink = githubLink;
        this.pdfLink = pdfLink;
        this.createdAt = createdAt;
        this.uploaderName = uploaderName;
        this.uploaderPhoto = uploaderPhoto;
        this.uploaderBatch = uploaderBatch;
        this.uploaderDepartment = uploaderDepartment;
        this.supervisorName = supervisorName;
        this.supervisorPhoto = supervisorPhoto;
        this.supervisorEmail = supervisorEmail;
        this.supervisorDepartment = supervisorDepartment;
        this.watches = watches;
        this.stars = stars;
    }
}

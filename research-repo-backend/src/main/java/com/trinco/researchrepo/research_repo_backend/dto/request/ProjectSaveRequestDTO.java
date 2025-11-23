package com.trinco.researchrepo.research_repo_backend.dto.request;

import com.trinco.researchrepo.research_repo_backend.dto.LanguageUsageDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProjectSaveRequestDTO {
    private String title;
    private String abstract_;
    private String pdfLink;
    private String githubLink;
    private String department;
    private String createdAt;
    private List<LanguageUsageDTO> languageUsed;
    private int uploaderId;
    private int supervisorId;
    private String batch;
    private List<String> tags;
}

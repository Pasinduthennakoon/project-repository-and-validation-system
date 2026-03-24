package com.trinco.researchrepo.research_repo_backend.dto.request;

import com.trinco.researchrepo.research_repo_backend.dto.LanguageUsageDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProjectSaveRequestDTO {
    private String title;
    private String description;
    private String abstract_;
    private String pdfLink;
    private String githubLink;
    private String department;
    private LocalDate createdAt;
    private List<LanguageUsageDTO> languageUsed;
    private int uploaderId;
    private int supervisorId;
    private String batch;
    private List<String> tags;
}

package com.trinco.researchrepo.research_repo_backend.dto.response;

import com.trinco.researchrepo.research_repo_backend.dto.LanguageUsageDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProjectsBorwsResponseDTO {
    private int projectId;
    private String title;
    private String abstract_;
    private String department;
    private String createdAt;
    private List<LanguageUsageDTO> languageUsed;
    private String batch;
    private List<String> tags;
}

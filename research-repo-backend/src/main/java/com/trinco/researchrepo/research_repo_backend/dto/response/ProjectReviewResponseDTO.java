package com.trinco.researchrepo.research_repo_backend.dto.response;

import com.trinco.researchrepo.research_repo_backend.dto.LanguageUsageDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProjectReviewResponseDTO {
    private int projectId;
    private String title;
    private String department;
    private String createdAt;
    private String batch;
    private List<String> tags;

    private String studentName;
}

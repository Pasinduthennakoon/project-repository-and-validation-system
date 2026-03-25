package com.trinco.researchrepo.research_repo_backend.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RecentProjectResponseDTO {
    private int projectId;
    private String title;
    private String department;
    private String batch;
    private List<String> tags;
    private String studentName;
    private String supervisorName;
    private String pdfLink;

    
}

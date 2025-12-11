package com.trinco.researchrepo.research_repo_backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PendingProjectSaveRequestDTO {

    private String title;
    private String abstract_;
    private String githubLink;
    private String tempPdfPath;
    private String department;
    private String regNo;
    private String batch;
    private int uploaderId;
    private int supervisorId;
    private LocalDate createdAt;
}

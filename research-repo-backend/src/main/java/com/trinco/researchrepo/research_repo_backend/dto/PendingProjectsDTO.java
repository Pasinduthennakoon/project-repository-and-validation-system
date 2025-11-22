package com.trinco.researchrepo.research_repo_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PendingProjectsDTO {

    private String title;
    private String abstract_;
    private String githubLink;
    private String department;
    private int uploaderId;
    private String batch;
    private int survisorId;
    private LocalDate createdAt;
}

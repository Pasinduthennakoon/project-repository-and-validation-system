package com.trinco.researchrepo.research_repo_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PendingProjectApprovelResponseDTO {

    private int pendingProjectId;
    private String title;
    private String abstract_;
    private String department;
    private String batch;
    private String createdAt;
    private String regNo;
}

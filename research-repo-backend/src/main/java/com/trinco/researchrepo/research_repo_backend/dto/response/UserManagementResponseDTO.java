package com.trinco.researchrepo.research_repo_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserManagementResponseDTO {
    private int userId;
    private String userName;
    private String department;
    private String email;
    private String role;
    private String regNo;
    private String batch;
}

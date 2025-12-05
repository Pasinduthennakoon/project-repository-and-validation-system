package com.trinco.researchrepo.research_repo_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UploadProjectUsersResponseDTO {
    private int userId;
    private String userName;
    private String department;
    private String role;
}

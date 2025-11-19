package com.trinco.researchrepo.research_repo_backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PendingUserSaveRequestDTO {
    private String userName;
    private String department;
    private String email;
    private String role;
    private String password;
}

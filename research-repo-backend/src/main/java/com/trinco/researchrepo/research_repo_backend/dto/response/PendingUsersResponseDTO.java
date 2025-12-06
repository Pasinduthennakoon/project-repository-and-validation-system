package com.trinco.researchrepo.research_repo_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PendingUsersResponseDTO {
    private int pendingUserId;
    private String userName;
    private String department;
    private String email;
    private String role;

}

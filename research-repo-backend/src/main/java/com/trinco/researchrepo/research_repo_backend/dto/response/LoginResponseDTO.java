package com.trinco.researchrepo.research_repo_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginResponseDTO {
    private String token;
    private int userId;
    private String userName;
    private String role;
    private String email;
    private String department;
    private String photoLink;
    private String regNo;
    private String batch;
}

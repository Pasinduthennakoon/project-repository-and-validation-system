package com.trinco.researchrepo.research_repo_backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class StudentSaveRequestDTO {

    private String userName;
    private String department;
    private String email;
    private String role;
    private String password;
    private boolean activeState;
    private String regNo;
    private String batch;
}

package com.trinco.researchrepo.research_repo_backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserSaveRequestDTO {

    private String userName;
    private String department;
    private String email;
    private String role;        // e.g., "STUDENT", "TEACHER"
    private String password;
    private boolean activeState;

    private StudentSaveRequestDTO studentInfo;

    public UserSaveRequestDTO(String userName, String department, String email, String role, String password,  boolean activeState) {
        this.userName = userName;
        this.department = department;
        this.email = email;
        this.role = role;
        this.password = password;
        this.activeState = activeState;
    }


}

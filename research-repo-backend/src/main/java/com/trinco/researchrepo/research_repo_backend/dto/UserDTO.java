package com.trinco.researchrepo.research_repo_backend.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDTO {

    private int userId;
    private String userName;
    private String department;
    private String email;
    private String role;
    private String password;
    private String photoLink;
    private boolean activeState;
}

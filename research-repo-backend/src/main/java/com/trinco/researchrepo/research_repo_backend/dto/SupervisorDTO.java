package com.trinco.researchrepo.research_repo_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SupervisorDTO {
    // Supervisor Info (from Users)
    private String userName;
    private String photoLink;
    private String email;
    private String department;
}

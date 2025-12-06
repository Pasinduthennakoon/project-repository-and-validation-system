package com.trinco.researchrepo.research_repo_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StudentDTO {
    // Uploader Info (from Users & Students)
    private String userName;
    private String photoLink;
    private String batch;
    private String department;
}

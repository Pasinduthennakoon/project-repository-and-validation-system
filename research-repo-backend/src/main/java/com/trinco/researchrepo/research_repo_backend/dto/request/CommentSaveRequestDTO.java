package com.trinco.researchrepo.research_repo_backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CommentSaveRequestDTO {

    private String comment;
    private String createdAt; // Column in Projects table
    private int supervisor; // Column in Projects table
    private int project;

}

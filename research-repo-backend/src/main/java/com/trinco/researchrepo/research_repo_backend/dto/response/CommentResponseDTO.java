package com.trinco.researchrepo.research_repo_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CommentResponseDTO {
    private String comment;
    private String createdAt; // Matches entity type
    private int ratingStars; // Matches entity type
    private String commenterName;
}

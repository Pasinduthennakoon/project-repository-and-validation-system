package com.trinco.researchrepo.research_repo_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProjectPageDataResponseDTO {
    private ProjectDetailsResponseDTO details;
    private List<CommentResponseDTO> comments; // Uses the DTO list
}

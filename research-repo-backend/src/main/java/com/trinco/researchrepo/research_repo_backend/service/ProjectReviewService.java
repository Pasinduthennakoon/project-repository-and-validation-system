package com.trinco.researchrepo.research_repo_backend.service;

import com.trinco.researchrepo.research_repo_backend.dto.request.CommentSaveRequestDTO;

public interface ProjectReviewService {
    String updateStars(int projectId, int stars);

    String updateWatches(int projectId);

    String addComment(CommentSaveRequestDTO commentSaveRequestDTO);
}

package com.trinco.researchrepo.research_repo_backend.service;

public interface ProjectReviewService {
    String updateStars(int projectId, int stars);

    String updateWatches(int projectId);
}

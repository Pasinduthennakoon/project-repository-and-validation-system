package com.trinco.researchrepo.research_repo_backend.service;

import com.trinco.researchrepo.research_repo_backend.dto.request.CommentSaveRequestDTO;

public interface CommentService {
    String addComment(CommentSaveRequestDTO commentSaveRequestDTO, int supervisorId);
}

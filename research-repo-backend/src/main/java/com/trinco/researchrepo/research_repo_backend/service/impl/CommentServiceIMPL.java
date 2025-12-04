package com.trinco.researchrepo.research_repo_backend.service.impl;

import com.trinco.researchrepo.research_repo_backend.dto.request.CommentSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Comments;
import com.trinco.researchrepo.research_repo_backend.repo.CommentRepo;
import com.trinco.researchrepo.research_repo_backend.service.CommentService;
import com.trinco.researchrepo.research_repo_backend.util.mappers.CommentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceIMPL implements CommentService {

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private CommentRepo commentRepo;

    @Override
    public String addComment(CommentSaveRequestDTO commentSaveRequestDTO) {
        Comments comments = commentMapper.RequestDtoToEntity(commentSaveRequestDTO);
        commentRepo.save(comments);

        return String.valueOf(comments.getCommentId());
    }
}

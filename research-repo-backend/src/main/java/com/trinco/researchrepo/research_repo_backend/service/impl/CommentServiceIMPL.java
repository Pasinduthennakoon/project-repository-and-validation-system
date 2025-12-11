package com.trinco.researchrepo.research_repo_backend.service.impl;

import com.trinco.researchrepo.research_repo_backend.dto.request.CommentSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Comments;
import com.trinco.researchrepo.research_repo_backend.entity.Projects;
import com.trinco.researchrepo.research_repo_backend.entity.Reviews;
import com.trinco.researchrepo.research_repo_backend.entity.Users;
import com.trinco.researchrepo.research_repo_backend.repo.CommentRepo;
import com.trinco.researchrepo.research_repo_backend.repo.ProjectRepo;
import com.trinco.researchrepo.research_repo_backend.repo.ProjectReviewRepo;
import com.trinco.researchrepo.research_repo_backend.repo.UserRepo;
import com.trinco.researchrepo.research_repo_backend.service.CommentService;
import com.trinco.researchrepo.research_repo_backend.util.mappers.CommentMapper;
import jakarta.el.PropertyNotFoundException;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class CommentServiceIMPL implements CommentService {

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    private ProjectReviewRepo projectReviewRepo;

    @Autowired
    private ProjectRepo projectRepo;

    @Autowired
    private UserRepo userRepo;

    @Override
    public String addComment(CommentSaveRequestDTO commentSaveRequestDTO, int supervisorId) {
        // 1. Fetch Project and Supervisor Entities (ENSURE THEY EXIST)
        Projects project = projectRepo.findById(commentSaveRequestDTO.getProject())
                .orElseThrow(() -> new PropertyNotFoundException("Project not found with ID: " + commentSaveRequestDTO.getProject()));

        Users supervisor = userRepo.findById(supervisorId)
                .orElseThrow(() -> new PropertyNotFoundException("Supervisor not found with ID: " + supervisorId));

        Comments comments = commentMapper.RequestDtoToEntity(commentSaveRequestDTO);
        comments.setCreatedAt(String.valueOf(LocalDate.now()));
        comments.setSupervisor(supervisor);
        commentRepo.save(comments);

        if(projectReviewRepo.existsById(comments.getProject().getProjectId())){
            Reviews reviews = projectReviewRepo.getReferenceById(comments.getProject().getProjectId());
            reviews.setStars(reviews.getStars() + comments.getRatingStars());
            reviews.setRated(reviews.getRated() + 1);
            projectReviewRepo.save(reviews);
        }

        return String.valueOf(comments.getCommentId());
    }
}

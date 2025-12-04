package com.trinco.researchrepo.research_repo_backend.service.impl;

import com.trinco.researchrepo.research_repo_backend.dto.request.CommentSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Comments;
import com.trinco.researchrepo.research_repo_backend.entity.Reviews;
import com.trinco.researchrepo.research_repo_backend.repo.CommentRepo;
import com.trinco.researchrepo.research_repo_backend.repo.ProjectRepo;
import com.trinco.researchrepo.research_repo_backend.repo.ProjectReviewRepo;
import com.trinco.researchrepo.research_repo_backend.service.ProjectReviewService;
import com.trinco.researchrepo.research_repo_backend.util.mappers.CommentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectReviewServiceIMPL implements ProjectReviewService {

    @Autowired
    private ProjectReviewRepo projectReviewRepo;

    @Override
    public String updateWatches(int projectId) {
        if(projectReviewRepo.existsById(projectId)){
            Reviews reviews = projectReviewRepo.getReferenceById(projectId);
            reviews.setWatches(reviews.getWatches() + 1);
            projectReviewRepo.save(reviews);
        }
        return "add watches successfully";
    }

}

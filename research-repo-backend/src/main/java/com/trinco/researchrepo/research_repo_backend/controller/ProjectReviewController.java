package com.trinco.researchrepo.research_repo_backend.controller;

import com.trinco.researchrepo.research_repo_backend.service.ProjectReviewService;
import com.trinco.researchrepo.research_repo_backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/project/review")
@CrossOrigin
public class ProjectReviewController {

    @Autowired
    private ProjectReviewService projectReviewService;

    @PutMapping(
            path = {"/update_stars"},
            params = {"project_id", "stars"}
    )
    public ResponseEntity<StandardResponse> updateStars(@RequestParam(value = "project_id") int project_id,
                                                        @RequestParam(value = "stars") int stars)
    {
        String projectId = projectReviewService.updateStars(project_id, stars);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "rated successfully", projectId),
                HttpStatus.CREATED
        );
    }
}

package com.trinco.researchrepo.research_repo_backend.controller;

import com.trinco.researchrepo.research_repo_backend.dto.request.CommentSaveRequestDTO;
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

    @PutMapping(
            path = {"/watches"},
            params = {"project_id"}
    )
    public ResponseEntity<StandardResponse> updateWatches(@RequestParam(value = "project_id") int project_id){
        String projectId = projectReviewService.updateWatches(project_id);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "watches added",projectId),
                HttpStatus.CREATED
        );
    }

    @PostMapping(
            path = {"/add_comment"}
    )
    public ResponseEntity<StandardResponse> addComment(@RequestBody CommentSaveRequestDTO commentSaveRequestDTO){

        String projectId = projectReviewService.addComment(commentSaveRequestDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "Add Comment Successfully",projectId),
                HttpStatus.CREATED
        );
    }
}

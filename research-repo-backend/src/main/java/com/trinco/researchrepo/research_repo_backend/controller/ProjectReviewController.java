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
            path = {"/watches/{project_id}"}
    )
    public ResponseEntity<StandardResponse> updateWatches(@PathVariable(value = "project_id") int project_id){
        String projectId = projectReviewService.updateWatches(project_id);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "watches added",projectId),
                HttpStatus.CREATED
        );
    }

}

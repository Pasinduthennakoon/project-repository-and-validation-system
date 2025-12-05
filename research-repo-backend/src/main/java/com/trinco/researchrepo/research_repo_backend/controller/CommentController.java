package com.trinco.researchrepo.research_repo_backend.controller;

import com.trinco.researchrepo.research_repo_backend.dto.request.CommentSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.ProjectReviewResponseDTO;
import com.trinco.researchrepo.research_repo_backend.service.CommentService;
import com.trinco.researchrepo.research_repo_backend.service.ProjectService;
import com.trinco.researchrepo.research_repo_backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/project/comment")
@CrossOrigin
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private ProjectService projectService;

//add comment(supervisor)
    @PostMapping(
            path = {"/add_comment"}
    )
    public ResponseEntity<StandardResponse> addComment(@RequestBody CommentSaveRequestDTO commentSaveRequestDTO){

        String projectId = commentService.addComment(commentSaveRequestDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "Add Comment Successfully",projectId),
                HttpStatus.CREATED
        );
    }

//review projects(supervisor review)
    @GetMapping(
            path = {"/view_projects"}
    )
    public ResponseEntity<StandardResponse> viewProjectForReview(){
        List<ProjectReviewResponseDTO> projectReviewResponseDTOS = projectService.viewProjectForReview();

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "success", projectReviewResponseDTOS),
                HttpStatus.OK
        );
    }
}

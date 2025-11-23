package com.trinco.researchrepo.research_repo_backend.controller;

import com.trinco.researchrepo.research_repo_backend.dto.request.ProjectSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.service.ProjectService;
import com.trinco.researchrepo.research_repo_backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/project")
@CrossOrigin
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping(
            path = {"/approve_project"},
            params = {"pendingId"}
    )
    public ResponseEntity<StandardResponse>approveProject(
            @RequestParam(value = "pendingId") int pendingId) throws Exception {

        String projectId = projectService.approveProject(pendingId);

        return new  ResponseEntity<StandardResponse>(
                new StandardResponse(201, "Project approved", projectId),
                HttpStatus.CREATED
        );
    }
}

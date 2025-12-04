package com.trinco.researchrepo.research_repo_backend.controller;

import com.trinco.researchrepo.research_repo_backend.dto.request.ProjectSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.ProjectPageDataResponseDTO;
import com.trinco.researchrepo.research_repo_backend.exceptions.NotFoundException;
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

    @GetMapping("/{projectId}/details")
    public ResponseEntity<StandardResponse> getProjectDetails(@PathVariable int projectId) {
        try {
            ProjectPageDataResponseDTO data = projectService.getProjectPageData(projectId);

            // Return success wrapped in StandardResponse
            return new ResponseEntity<>(
                    new StandardResponse(200, "Project details retrieved successfully", data),
                    HttpStatus.OK
            );
        } catch (NotFoundException e) {
            // Handle specific exception for 404
            return new ResponseEntity<>(
                    new StandardResponse(404, e.getMessage(), null),
                    HttpStatus.NOT_FOUND
            );
        } catch (Exception e) {
            // Handle generic unexpected server errors
            System.err.println("Unexpected error fetching project details: " + e.getMessage());
            return new ResponseEntity<>(
                    new StandardResponse(500, "Internal server error.", null),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}

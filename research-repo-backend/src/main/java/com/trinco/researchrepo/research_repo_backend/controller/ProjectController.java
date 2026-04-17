package com.trinco.researchrepo.research_repo_backend.controller;

import com.trinco.researchrepo.research_repo_backend.dto.LanguageUsageDTO;
import com.trinco.researchrepo.research_repo_backend.dto.request.PastProjectUploadRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.GapInsightsResponceDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.ProjectPageDataResponseDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.ProjectsBorwsResponseDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.ProjectsByUserResponseDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.ProjectsStudentDashboardDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Projects;
import com.trinco.researchrepo.research_repo_backend.exceptions.NotFoundException;
import com.trinco.researchrepo.research_repo_backend.service.GapAnalysisService;
import com.trinco.researchrepo.research_repo_backend.service.GoogleDriveService;
import com.trinco.researchrepo.research_repo_backend.service.ProjectService;
import com.trinco.researchrepo.research_repo_backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@RestController
@RequestMapping("api/v1/project")
@CrossOrigin
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private GapAnalysisService gapAnalysisService;

    @Autowired
    private GoogleDriveService googleDriveService;

    // get project details(all roles)
    @GetMapping("/{projectId}/details")
    public ResponseEntity<StandardResponse> getProjectDetails(@PathVariable(value = "projectId") int projectId) {
        try {
            ProjectPageDataResponseDTO data = projectService.getProjectPageData(projectId);

            // Return success wrapped in StandardResponse
            return new ResponseEntity<>(
                    new StandardResponse(200, "Project details retrieved successfully", data),
                    HttpStatus.OK);
        } catch (NotFoundException e) {
            // Handle specific exception for 404
            return new ResponseEntity<>(
                    new StandardResponse(404, e.getMessage(), null),
                    HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // Handle generic unexpected server errors
            System.err.println("Unexpected error fetching project details: " + e.getMessage());
            return new ResponseEntity<>(
                    new StandardResponse(500, "Internal server error.", null),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // add used languages(ai prediction)
    @PatchMapping(path = { "/{projectId}/used_languges" })
    public ResponseEntity<Projects> updateLanguagesUsed(
            @PathVariable(value = "projectId") int projectId,
            @RequestBody List<LanguageUsageDTO> languageUsage) {
        Projects updatedProject = projectService.updateLanguageUsed(projectId, languageUsage);

        if (updatedProject != null) {
            return new ResponseEntity<>(updatedProject, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // add tages(ai prediction)
    @PatchMapping(path = { "/{projectId}/tags" })
    public ResponseEntity<Projects> updateProjectTags(
            @PathVariable(value = "projectId") int projectId,
            @RequestBody List<String> tags) {
        Projects updateProjects = projectService.updateProjectTags(projectId, tags);

        if (updateProjects != null) {
            return new ResponseEntity<>(updateProjects, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // get all projects(project browse page)
    @GetMapping(path = { "/browse" })
    public ResponseEntity<StandardResponse> getAllProjects() {
        List<ProjectsBorwsResponseDTO> allProjects = projectService.getAllProjects();

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "success", allProjects),
                HttpStatus.OK);
    }

    @GetMapping(path = { "/my_projects" }, params = { "userId" })
    public ResponseEntity<StandardResponse> getMyProjects(
            @RequestParam(value = "userId") int userId) {
        System.out.println(userId);
        List<ProjectsByUserResponseDTO> departments = projectService.getMyProjects(userId);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "success", departments),
                HttpStatus.OK);

    }

    @GetMapping(path = { "/student_dashboard" })
    public ResponseEntity<StandardResponse> getProjectsForStudentDashboard() {
        List<ProjectsStudentDashboardDTO> projects = projectService.getProjectsForStudentDashboard();

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "success", projects),
                HttpStatus.OK);

    }

    @GetMapping("/gap-insights")
    public ResponseEntity<StandardResponse> getInsights() {
        GapInsightsResponceDTO insights = gapAnalysisService.getGapInsights();

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "success", insights),
                HttpStatus.OK);

    }

    @PostMapping(value = "/save_past_project", consumes = { "multipart/form-data" })
    public ResponseEntity<StandardResponse> savePastProject(
            @RequestPart("data") PastProjectUploadRequestDTO request,
            @RequestPart("file") MultipartFile file) {
        try {
                // 1️⃣ Convert MultipartFile → File
                java.io.File tempFile = java.io.File.createTempFile(
                        "upload-",
                        file.getOriginalFilename());
                
                file.transferTo(tempFile);
                
                // 2️⃣ Upload to Google Drive
                String googleDriveUrl = googleDriveService.uploadFileToDrive(tempFile);
                
                // 3️⃣ Cleanup temp file
                tempFile.delete();
                
                // 4️⃣ Save URL in DTO
                request.setPdfLink(googleDriveUrl);
                
                // 5️⃣ Save project
                String savedProject = projectService.savePastProject(request);
                
                return new ResponseEntity<StandardResponse>(
                        new StandardResponse(201, "Project saved successfully", savedProject),
                        HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(
                    new StandardResponse(500, "Upload failed", null),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}

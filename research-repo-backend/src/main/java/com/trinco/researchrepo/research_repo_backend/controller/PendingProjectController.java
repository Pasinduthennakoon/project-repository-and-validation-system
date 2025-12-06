package com.trinco.researchrepo.research_repo_backend.controller;

import com.trinco.researchrepo.research_repo_backend.dto.request.PendingProjectSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.PendingProjectApprovelResponseDTO;
import com.trinco.researchrepo.research_repo_backend.service.PendingProjectService;
import com.trinco.researchrepo.research_repo_backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/v1/pending_projects")
@CrossOrigin
public class PendingProjectController {

    @Autowired
    private PendingProjectService pendingProjectService;

    @Value("${pending.pdf.temp-dir}")
    private String tempPdfDir;

//upload project(student)
    @PostMapping(
            value = "save/pending_project",
            consumes = {"multipart/form-data"}
    )

    public ResponseEntity<StandardResponse> addPendingProject(
            @RequestPart("data") PendingProjectSaveRequestDTO pendingProjectSaveRequestDTO,
            @RequestPart("file") MultipartFile file
            )throws IOException
    {
        // 1️⃣ Ensure folder exists
        File folder = new File(tempPdfDir);
        if ((!folder.exists())){
            folder.mkdirs();
        }

        // 2️⃣ Save PDF temporarily
        String originalName = file.getOriginalFilename().replaceAll("[^a-zA-Z0-9\\.\\-]", "_");
        String fileName = System.currentTimeMillis() + "_" + originalName;
        File tempFile = new File(tempPdfDir , fileName);
        try {
            file.transferTo(tempFile);
        } catch (IOException e) {
            return new ResponseEntity<>(
                    new StandardResponse(500, "Failed to save file", null),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }

        // 3️⃣ Set tempPdfPath in DTO
        pendingProjectSaveRequestDTO.setTempPdfPath(tempFile.getAbsolutePath());

        String pending_project_id = pendingProjectService.addPendingProject(pendingProjectSaveRequestDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "Pending approval", pending_project_id),
                HttpStatus.CREATED
        );
    }

//get pending projects(supervisor to approve projects)
    @GetMapping(
            path = {"/view"}
    )
    public ResponseEntity<StandardResponse> getPendingProjects(){
        List<PendingProjectApprovelResponseDTO> pendingProjectApprovelResponseDTOS = pendingProjectService.getPendingProjects();

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "success", pendingProjectApprovelResponseDTOS),
                HttpStatus.OK
        );
    }

    //approve project(supervisor)
    @PostMapping(
            path = {"/approve_project"},
            params = {"pendingId"}
    )
    public ResponseEntity<StandardResponse>approveProject(
            @RequestParam(value = "pendingId") int pendingId) throws Exception {

        String projectId = pendingProjectService.approveProject(pendingId);

        return new  ResponseEntity<StandardResponse>(
                new StandardResponse(201, "Project approved", projectId),
                HttpStatus.CREATED
        );
    }

    //reject project(supervisor)
    @DeleteMapping(
            path = {"/reject_pending_project"},
            params = {"pendingProjectId"}
    )
    public ResponseEntity<StandardResponse>rejectPendingProject(
            @RequestParam(value = "pendingProjectId") int pendingProjectId
    ){
        boolean rejectedProject = pendingProjectService.rejectPendingProject(pendingProjectId);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "success", rejectedProject),
                HttpStatus.OK
        );
    }
}

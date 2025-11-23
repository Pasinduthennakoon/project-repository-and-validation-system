package com.trinco.researchrepo.research_repo_backend.service.impl;

import com.trinco.researchrepo.research_repo_backend.dto.request.PendingProjectSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.request.ProjectSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Pending_Projects;
import com.trinco.researchrepo.research_repo_backend.entity.Projects;
import com.trinco.researchrepo.research_repo_backend.repo.PendingProjectRepo;
import com.trinco.researchrepo.research_repo_backend.repo.ProjectRepo;
import com.trinco.researchrepo.research_repo_backend.service.GoogleDriveService;
import com.trinco.researchrepo.research_repo_backend.service.ProjectService;
import com.trinco.researchrepo.research_repo_backend.util.mappers.ProjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ProjectServiceIMPL implements ProjectService {

    @Autowired
    private PendingProjectRepo pendingProjectRepo;

    @Autowired
    private ProjectMapper projectMapper;

    @Autowired
    private ProjectRepo projectRepo;

    @Autowired
    private GoogleDriveService googleDriveService;

    @Override
    public String approveProject(int pendingId) {

        Pending_Projects pending_projects = pendingProjectRepo.findById(pendingId)
                .orElseThrow(() -> new RuntimeException("pending project not found"));

        PendingProjectSaveRequestDTO pendingProjectSaveRequestDTO = projectMapper.EntityToDtoToAddProject(pending_projects);
        ProjectSaveRequestDTO projectSaveRequestDTO = projectMapper.PendingProjectsToProjects(pendingProjectSaveRequestDTO);
        Projects projects = projectMapper.RequestDtoToEntity(projectSaveRequestDTO);


        File pdfFile = new File(pending_projects.getTempPdfPath());

        try {

            String googleDriveUrl = googleDriveService.uploadFileToDrive(pdfFile);

            projects.setPdfLink(googleDriveUrl);
            projectRepo.save(projects);


            // 3. Delete temp file
            if(pdfFile.exists()) pdfFile.delete();

            // 4. Remove pending project row
            pendingProjectRepo.delete(pending_projects);

            return String.valueOf(projects.getProjectId());

        } catch (Exception e) {
            throw new RuntimeException("Project approval failed due to file or database error.", e);
        }
    }
}

package com.trinco.researchrepo.research_repo_backend.service.impl;

import com.trinco.researchrepo.research_repo_backend.dto.LanguageUsageDTO;
import com.trinco.researchrepo.research_repo_backend.dto.request.PendingProjectSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.request.ProjectSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.CommentResponseDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.ProjectDetailsResponseDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.ProjectPageDataResponseDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Comments;
import com.trinco.researchrepo.research_repo_backend.entity.Pending_Projects;
import com.trinco.researchrepo.research_repo_backend.entity.Projects;
import com.trinco.researchrepo.research_repo_backend.entity.Reviews;
import com.trinco.researchrepo.research_repo_backend.repo.PendingProjectRepo;
import com.trinco.researchrepo.research_repo_backend.repo.ProjectRepo;
import com.trinco.researchrepo.research_repo_backend.repo.ProjectReviewRepo;
import com.trinco.researchrepo.research_repo_backend.service.GoogleDriveService;
import com.trinco.researchrepo.research_repo_backend.service.ProjectService;
import com.trinco.researchrepo.research_repo_backend.util.mappers.ProjectDetailsPageMapper;
import com.trinco.researchrepo.research_repo_backend.util.mappers.ProjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

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

    @Autowired
    private ProjectReviewRepo projectReviewRepo;

    @Autowired
    private ProjectDetailsPageMapper projectDetailsPageMapper;

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

            Reviews reviews = new Reviews();
            reviews.setProject(projects);
            projectReviewRepo.save(reviews);


            // 3. Delete temp file
            if(pdfFile.exists()) pdfFile.delete();

            // 4. Remove pending project row
            pendingProjectRepo.delete(pending_projects);

            return String.valueOf(projects.getProjectId());

        } catch (Exception e) {
            throw new RuntimeException("Project approval failed due to file or database error.", e);
        }
    }

    @Override
    public ProjectPageDataResponseDTO getProjectPageData(int projectId) {
        // 1. Fetch Main Details (throws if not found)
        Projects project = projectRepo.findProjectDetailsById(projectId)
                .orElseThrow(() -> new RuntimeException("Project with ID " + projectId + " not found."));

        ProjectDetailsResponseDTO projectDetailsResponseDTO =  projectDetailsPageMapper.projectDetailsEntityToDto(project);

        // Map comments
        List<Comments> comments = projectRepo.findCommentsByProjectId(projectId);
        List<CommentResponseDTO> commentResponseDTOS = projectDetailsPageMapper.commentEntityListToResponseDTOList(comments);

        // 4. Combine and return the final wrapper object
        return new ProjectPageDataResponseDTO(projectDetailsResponseDTO, commentResponseDTOS);
    }

    @Override
    public Projects updateLanguageUsed(int projectId, List<LanguageUsageDTO> languageUsage) {
        Optional<Projects> projects = projectRepo.findById(projectId);

        if(projects.isPresent()){
            Projects project = projects.get();
            project.setLanguageUsed(languageUsage);
            return projectRepo.save(project);
        }
        return null;
    }

    @Override
    public Projects updateProjectTags(int projectId, List<String> tags) {
        Optional<Projects> projects = projectRepo.findById(projectId);

        if (projects.isPresent()){
            Projects project = projects.get();
            project.setTags(tags);
            return projectRepo.save(project);
        }
        return null;
    }
}

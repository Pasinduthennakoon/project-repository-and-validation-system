package com.trinco.researchrepo.research_repo_backend.service.impl;

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
import com.trinco.researchrepo.research_repo_backend.util.mappers.ProjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
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

        // Map project entity -> ProjectDetailsResponseDTO
        ProjectDetailsResponseDTO details = new ProjectDetailsResponseDTO();
        details.setProjectId(project.getProjectId());
        details.setTitle(project.getTitle());
        details.setAbstract_(project.getAbstract_());
        details.setGithubLink(project.getGithubLink());
        details.setPdfLink(project.getPdfLink());
        details.setCreatedAt(project.getCreatedAt());

        // Uploader info
        details.setUploaderName(project.getUploader().getUserName());
        details.setUploaderPhoto(project.getUploader().getPhotoLink());
        details.setUploaderBatch(project.getUploader().getStudent().getBatch());
        details.setUploaderDepartment(project.getUploader().getDepartment());

        // Supervisor info (can be null)
        if (project.getSupervisor() != null) {
            details.setSupervisorName(project.getSupervisor().getUserName());
            details.setSupervisorPhoto(project.getSupervisor().getPhotoLink());
            details.setSupervisorEmail(project.getSupervisor().getEmail());
            details.setSupervisorDepartment(project.getSupervisor().getDepartment());
        }

        // Review info
        if (project.getReviews() != null) {
            details.setWatches(project.getReviews().getWatches());
            details.setStars(project.getReviews().getStars());
        } else {
            details.setWatches(0);
            details.setStars(0);
        }

        // JSON fields
        details.setTags(project.getTags());
        details.setLanguagesUsed(project.getLanguageUsed());

        // Map comments
        List<Comments> commentEntities = projectRepo.findCommentsByProjectId(projectId);
        List<CommentResponseDTO> commentDTOs = commentEntities.stream()
                .map(c -> new CommentResponseDTO(
                        c.getComment(),
                        c.getCreatedAt(),
                        c.getRatingStars(),
                        c.getSupervisor() != null ? c.getSupervisor().getUserName() : null
                ))
                .collect(Collectors.toList());

        // 4. Combine and return the final wrapper object
        return new ProjectPageDataResponseDTO(details, commentDTOs);
    }
}

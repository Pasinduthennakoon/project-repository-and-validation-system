package com.trinco.researchrepo.research_repo_backend.service.impl;

import com.trinco.researchrepo.research_repo_backend.dto.request.PendingProjectSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.request.ProjectSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.PendingProjectApprovelResponseDTO;
import com.trinco.researchrepo.research_repo_backend.entity.*;
import com.trinco.researchrepo.research_repo_backend.exceptions.EntryDuplicationException;
import com.trinco.researchrepo.research_repo_backend.repo.*;
import com.trinco.researchrepo.research_repo_backend.service.GoogleDriveService;
import com.trinco.researchrepo.research_repo_backend.service.PendingProjectService;
import com.trinco.researchrepo.research_repo_backend.util.mappers.PendingProjectMapper;
import com.trinco.researchrepo.research_repo_backend.util.mappers.PendingUserMapper;
import com.trinco.researchrepo.research_repo_backend.util.mappers.ProjectMapper;
import jakarta.el.PropertyNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PendingProjectServiceIMPL implements PendingProjectService {

    @Autowired
    private PendingProjectMapper pendingProjectMapper;

    @Autowired
    private PendingProjectRepo pendingProjectRepo;

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ProjectMapper projectMapper;

    @Autowired
    private GoogleDriveService googleDriveService;

    @Autowired
    private ProjectRepo projectRepo;

    @Autowired
    private ProjectReviewRepo projectReviewRepo;

    @Override
    public String addPendingProject(PendingProjectSaveRequestDTO pendingProjectSaveRequestDTO) {

        Pending_Projects pendingProjects = pendingProjectMapper.RequestDtoToEntity(pendingProjectSaveRequestDTO);
        if (!pendingProjectRepo.existsById(pendingProjects.getPendingProjectId())){
            pendingProjects.setCreatedAt(String.valueOf(LocalDate.now()));
            pendingProjectRepo.save(pendingProjects);
            return "project added";
        }else {
            throw new EntryDuplicationException("project already exists");
        }
    }

    @Override
    public List<PendingProjectApprovelResponseDTO> getPendingProjects(int supervisorId) {
        List<Pending_Projects> pendingProjects = pendingProjectRepo.findBySupervisorId(supervisorId);
        List<PendingProjectApprovelResponseDTO> pendingProjectApprovelResponseDTOS = pendingProjectMapper.ResponsePendingProjectEntityListToDtoList(pendingProjects);

        return pendingProjectApprovelResponseDTOS;
    }

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
    public boolean rejectPendingProject(int pendingProjectId) {
        if(pendingProjectRepo.existsById(pendingProjectId)) {
            String pdfPath = pendingProjectRepo.gettempPdfPath(pendingProjectId);
            File file = new File(pdfPath);
            if(file.exists()) file.delete();
            pendingProjectRepo.deleteById(pendingProjectId);
        }else {
            throw new PropertyNotFoundException("Not found project for this id");
        }
        return true;
    }
}

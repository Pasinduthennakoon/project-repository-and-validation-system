package com.trinco.researchrepo.research_repo_backend.service.impl;

import com.trinco.researchrepo.research_repo_backend.dto.LanguageUsageDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.*;
import com.trinco.researchrepo.research_repo_backend.entity.*;
import com.trinco.researchrepo.research_repo_backend.repo.*;
import com.trinco.researchrepo.research_repo_backend.service.ProjectService;
import com.trinco.researchrepo.research_repo_backend.util.mappers.CommentMapper;
import com.trinco.researchrepo.research_repo_backend.util.mappers.ProjectDetailsPageMapper;
import com.trinco.researchrepo.research_repo_backend.util.mappers.ProjectMapper;
import jakarta.el.PropertyNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectServiceIMPL implements ProjectService {

    @Autowired
    private ProjectMapper projectMapper;

    @Autowired
    private ProjectRepo projectRepo;

    @Autowired
    private ProjectDetailsPageMapper projectDetailsPageMapper;

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private ProjectReviewRepo projectReviewRepo;

    @Autowired
    private CommentRepo commentRepo;


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

    @Override
    public List<ProjectsBorwsResponseDTO> getAllProjects() {

        List<Projects> projects = projectRepo.findAll();
        List<ProjectsBorwsResponseDTO> projectsBorwsResponseDTOS = projectMapper.projectsBorwseEntityListToProjectsBorwsResponseDTOList(projects);

        return projectsBorwsResponseDTOS;
    }

    @Override
    public List<ProjectReviewResponseDTO> viewProjectForReview(int supervisorId) {
        List<Projects> projects = projectRepo.findProjectsForReview(supervisorId);
        List<ProjectReviewResponseDTO> projectReviewResponseDTOS = commentMapper.projectReviewEntityListToResponseDTOList(projects);

        return projectReviewResponseDTOS;
    }

    @Override
    public List<ProjectsByUserResponseDTO> getMyProjects(int userId) {
        List<ProjectsByUserResponseDTO> departments = projectRepo.findProjectTitlesByUploaderId(userId);
        return departments;
    }
}

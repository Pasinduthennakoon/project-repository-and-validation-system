package com.trinco.researchrepo.research_repo_backend.util.mappers;

import com.trinco.researchrepo.research_repo_backend.dto.PendingProjectsDTO;
import com.trinco.researchrepo.research_repo_backend.dto.request.PendingProjectSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.request.ProjectSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Pending_Projects;
import com.trinco.researchrepo.research_repo_backend.entity.Projects;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProjectMapper {
    PendingProjectSaveRequestDTO EntityToDtoToAddProject(Pending_Projects pending_projects);

    @Mapping(target = "pdfLink", ignore = true)        // This will be set separately
    @Mapping(target = "languageUsed", ignore = true)   // Not in the source DTO
    @Mapping(target = "tags", ignore = true)           // Not in the source DTO
    @Mapping(source = "supervisorId", target = "supervisorId") // Fix typo/naming mismatch
    ProjectSaveRequestDTO PendingProjectsToProjects(PendingProjectSaveRequestDTO pendingProjectSaveRequestDTO);

    @Mapping(source = "uploaderId", target = "uploader.userId")
    @Mapping(source = "supervisorId", target = "supervisor.userId")
    Projects RequestDtoToEntity(ProjectSaveRequestDTO pendingProjectSaveRequestDTO);
}

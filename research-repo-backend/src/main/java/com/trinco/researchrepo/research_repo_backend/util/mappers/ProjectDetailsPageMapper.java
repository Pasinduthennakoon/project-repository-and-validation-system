package com.trinco.researchrepo.research_repo_backend.util.mappers;

import com.trinco.researchrepo.research_repo_backend.dto.request.StudentSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.request.UserSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.CommentResponseDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.ProjectDetailsResponseDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Comments;
import com.trinco.researchrepo.research_repo_backend.entity.Projects;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProjectDetailsPageMapper {

    default ProjectDetailsResponseDTO projectDetailsEntityToDto(Projects project){
        if (project == null) return null;
        return new ProjectDetailsResponseDTO(
                project.getProjectId(),
                project.getTitle(),
                project.getAbstract_(),
                project.getGithubLink(),
                project.getPdfLink(),
                project.getCreatedAt(),
                project.getTags(),
                project.getLanguageUsed(),
                project.getUploader().getUserName(),
                project.getUploader().getPhotoLink(),
                project.getUploader().getStudent().getBatch(),
                project.getUploader().getDepartment(),
                project.getSupervisor().getUserName(),
                project.getSupervisor().getPhotoLink(),
                project.getSupervisor().getEmail(),
                project.getSupervisor().getDepartment(),
                project.getReviews().getWatches(),
                project.getReviews().getStars()

        );
    }

    List<CommentResponseDTO> commentEntityListToResponseDTOList(List<Comments> comments);

    @Mapping(target = "commenterName", source = "supervisor.userName")
    @Mapping(target = "comment", source = "comment")
    CommentResponseDTO commentEntityToResponseDTO(Comments commentEntity);

}

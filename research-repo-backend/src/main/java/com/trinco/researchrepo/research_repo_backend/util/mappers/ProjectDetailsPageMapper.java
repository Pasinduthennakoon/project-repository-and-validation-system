package com.trinco.researchrepo.research_repo_backend.util.mappers;

import com.trinco.researchrepo.research_repo_backend.dto.StudentDTO;
import com.trinco.researchrepo.research_repo_backend.dto.SupervisorDTO;
import com.trinco.researchrepo.research_repo_backend.dto.request.StudentSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.request.UserSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.CommentResponseDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.ProjectDetailsResponseDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Comments;
import com.trinco.researchrepo.research_repo_backend.entity.Projects;
import com.trinco.researchrepo.research_repo_backend.entity.Students;
import com.trinco.researchrepo.research_repo_backend.entity.Users;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProjectDetailsPageMapper {

    @Mapping(target = "batch", source = "student.batch")
    StudentDTO studentEntityToStudentDTO(Users users);

    SupervisorDTO supervisorEntityToSupervisorDTO (Users users);

    default ProjectDetailsResponseDTO projectDetailsEntityToDto(Projects project){
        if (project == null) return null;
        return new ProjectDetailsResponseDTO(
                project.getProjectId(),
                project.getTitle(),
                project.getDescription(),
                project.getGithubLink(),
                project.getPdfLink(),
                project.getCreatedAt(),
                project.getTags(),
                project.getLanguageUsed(),
                project.getUploader() != null
                    ? studentEntityToStudentDTO(project.getUploader())
                    : null,

                project.getSupervisor() != null
                    ? supervisorEntityToSupervisorDTO(project.getSupervisor())
                    : null,

                project.getReviews() != null
                    ? project.getReviews().getWatches()
                    : 0,

                project.getReviews() != null
                    ? project.getReviews().getStars()
                    : 0

        );
    }

    List<CommentResponseDTO> commentEntityListToResponseDTOList(List<Comments> comments);

    @Mapping(target = "commenterName", source = "supervisor.userName")
    @Mapping(target = "comment", source = "comment")
    CommentResponseDTO commentEntityToResponseDTO(Comments commentEntity);

}

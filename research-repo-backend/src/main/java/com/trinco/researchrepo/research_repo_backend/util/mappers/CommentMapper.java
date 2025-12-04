package com.trinco.researchrepo.research_repo_backend.util.mappers;

import com.trinco.researchrepo.research_repo_backend.dto.request.CommentSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Comments;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    @Mapping(source = "supervisor", target = "supervisor.userId") // Maps DTO.supervisor (int) to Entity.supervisor.userId (int)
    @Mapping(source = "project", target = "project.projectId")   // Maps DTO.project (int) to Entity.project.projectId (int)
    Comments RequestDtoToEntity (CommentSaveRequestDTO commentSaveRequestDTO);
}

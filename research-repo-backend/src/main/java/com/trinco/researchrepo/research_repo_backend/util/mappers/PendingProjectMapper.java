package com.trinco.researchrepo.research_repo_backend.util.mappers;

import com.trinco.researchrepo.research_repo_backend.dto.request.PendingProjectSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Pending_Projects;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PendingProjectMapper {
    Pending_Projects RequestDtoToEntity(PendingProjectSaveRequestDTO pendingProjectSaveRequestDTO);
}

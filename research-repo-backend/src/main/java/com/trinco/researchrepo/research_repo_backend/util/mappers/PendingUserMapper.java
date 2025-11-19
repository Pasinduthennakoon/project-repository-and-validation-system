package com.trinco.researchrepo.research_repo_backend.util.mappers;

import com.trinco.researchrepo.research_repo_backend.dto.request.PendingUserSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Pending_Users;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PendingUserMapper {
    Pending_Users RequestToDtoToEntity(PendingUserSaveRequestDTO pendingUserSaveRequestDTO);
}

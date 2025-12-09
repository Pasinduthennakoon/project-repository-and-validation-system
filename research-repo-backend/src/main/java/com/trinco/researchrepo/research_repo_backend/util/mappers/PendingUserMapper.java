package com.trinco.researchrepo.research_repo_backend.util.mappers;

import com.trinco.researchrepo.research_repo_backend.dto.request.PendingUserSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.PendingUsersResponseDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Pending_Users;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PendingUserMapper {

    @Mapping(target = "password", ignore = true)
    Pending_Users RequestToDtoToEntity(PendingUserSaveRequestDTO pendingUserSaveRequestDTO);

    List<PendingUsersResponseDTO> ResponseEntityListToDtoList(List<Pending_Users> pendingUsers);

}

package com.trinco.researchrepo.research_repo_backend.util.mappers;

import com.trinco.researchrepo.research_repo_backend.dto.request.PendingProjectSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.PendingProjectApprovelResponseDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.UploadProjectUsersResponseDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Pending_Projects;
import com.trinco.researchrepo.research_repo_backend.entity.Projects;
import com.trinco.researchrepo.research_repo_backend.entity.Users;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PendingProjectMapper {
    Pending_Projects RequestDtoToEntity(PendingProjectSaveRequestDTO pendingProjectSaveRequestDTO);

    List<UploadProjectUsersResponseDTO> ResponseUsersEntityListToDtoList(List<Users> users);

    List<PendingProjectApprovelResponseDTO> ResponsePendingProjectEntityListToDtoList(List<Pending_Projects> pendingProjects);
}

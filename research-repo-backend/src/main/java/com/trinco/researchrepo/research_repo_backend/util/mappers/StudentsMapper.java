package com.trinco.researchrepo.research_repo_backend.util.mappers;

import com.trinco.researchrepo.research_repo_backend.dto.request.StudentSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Students;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StudentsMapper {

    Students RequestDtoToEntity (StudentSaveRequestDTO studentSaveRequestDTO);
}

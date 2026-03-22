package com.trinco.researchrepo.research_repo_backend.util.mappers;

import org.mapstruct.Mapper;

import com.trinco.researchrepo.research_repo_backend.dto.request.AnalysisIdeaRequestDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Analysed_Idea;

@Mapper(componentModel = "spring")
public interface AnalysisIdeaMapper {
    Analysed_Idea RequestDtoToEntity(AnalysisIdeaRequestDTO analysisIdeaRequestDTO);
}

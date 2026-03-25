package com.trinco.researchrepo.research_repo_backend.util.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.trinco.researchrepo.research_repo_backend.dto.request.AnalysisIdeaRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.AnalysisIdeaResponseDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Analysed_Idea;

@Mapper(componentModel = "spring")
public interface AnalysisIdeaMapper {
    Analysed_Idea RequestDtoToEntity(AnalysisIdeaRequestDTO analysisIdeaRequestDTO);

    List<AnalysisIdeaResponseDTO> ideaEntityListToIdeaResponseDtoList(List<Analysed_Idea> analysis_ideas);
}

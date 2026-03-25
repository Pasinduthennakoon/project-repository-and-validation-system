package com.trinco.researchrepo.research_repo_backend.service;

import java.util.List;

import com.trinco.researchrepo.research_repo_backend.dto.request.AnalysisIdeaRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.AnalysisIdeaResponseDTO;

public interface AnalysisIdeaService {

    String saveIdea(AnalysisIdeaRequestDTO analysisIdeaRequestDTO);

    List<AnalysisIdeaResponseDTO> getAllIdeas();
    
}

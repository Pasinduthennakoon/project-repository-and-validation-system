package com.trinco.researchrepo.research_repo_backend.service;

import com.trinco.researchrepo.research_repo_backend.dto.request.AnalysisIdeaRequestDTO;

public interface AnalysisIdeaService {

    String saveIdea(AnalysisIdeaRequestDTO analysisIdeaRequestDTO);
    
}

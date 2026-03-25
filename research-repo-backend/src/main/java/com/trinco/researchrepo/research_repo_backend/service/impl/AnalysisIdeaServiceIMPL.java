package com.trinco.researchrepo.research_repo_backend.service.impl;

import java.util.List;

import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trinco.researchrepo.research_repo_backend.dto.request.AnalysisIdeaRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.AnalysisIdeaResponseDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Analysed_Idea;
import com.trinco.researchrepo.research_repo_backend.exceptions.EntryDuplicationException;
import com.trinco.researchrepo.research_repo_backend.repo.AnalysisIdeaRepo;
import com.trinco.researchrepo.research_repo_backend.service.AnalysisIdeaService;
import com.trinco.researchrepo.research_repo_backend.util.mappers.AnalysisIdeaMapper;

@Service
public class AnalysisIdeaServiceIMPL implements AnalysisIdeaService {

    @Autowired
    private AnalysisIdeaRepo analysisIdeaRepo;

    @Autowired
    private AnalysisIdeaMapper analysisIdeaMapper;

    @Override
    public String saveIdea(AnalysisIdeaRequestDTO analysisIdeaRequestDTO) {
        Analysed_Idea analysedIdea = analysisIdeaMapper.RequestDtoToEntity(analysisIdeaRequestDTO);
        if(!analysisIdeaRepo.existsById(analysedIdea.getIdeaId())){
            analysisIdeaRepo.save(analysedIdea);
            return "successfully saved the idea";
        }else {
            throw new EntryDuplicationException("Idea already exists");
        }
    }

    @Override
    public List<AnalysisIdeaResponseDTO> getAllIdeas() {
        List<Analysed_Idea> analysis_ideas = analysisIdeaRepo.findIdea();
        List<AnalysisIdeaResponseDTO> responseDTOs = analysisIdeaMapper.ideaEntityListToIdeaResponseDtoList(analysis_ideas);
        return responseDTOs;
    }
    
}

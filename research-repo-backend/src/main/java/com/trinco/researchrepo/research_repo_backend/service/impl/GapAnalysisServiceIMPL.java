package com.trinco.researchrepo.research_repo_backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.trinco.researchrepo.research_repo_backend.dto.request.GapInsightsRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.GapInsightsResponceDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Projects;
import com.trinco.researchrepo.research_repo_backend.repo.ProjectRepo;
import com.trinco.researchrepo.research_repo_backend.service.GapAnalysisService;
import com.trinco.researchrepo.research_repo_backend.util.mappers.ProjectMapper;

@Service
public class GapAnalysisServiceIMPL implements GapAnalysisService {

    @Autowired
    private ProjectRepo projectRepo;

    @Autowired
    private ProjectMapper projectMapper;

    @Autowired
    private RestTemplate restTemplate; // Injected as a Bean

    // Pull this from application.properties using @Value("${ml.service.url}")
    private final String mlUrl = "http://localhost:8000/gap-insights";

    @Override
    public GapInsightsResponceDTO getGapInsights() {
        // 1. Fetch data
        List<Projects> projects = projectRepo.findAll();
        
        // 2. Map to DTO
        List<GapInsightsRequestDTO> mlData = projectMapper.projectListToGapInsightsRequestDTOList(projects);

        try {
            // 3. Send to ML Service
            return restTemplate.postForObject(mlUrl, mlData, GapInsightsResponceDTO.class);
        } catch (Exception e) {
            // Log the error and perhaps return a default/empty response or throw a custom exception
            throw new RuntimeException("Failed to connect to ML Analysis service: " + e.getMessage());
        }
    }
}

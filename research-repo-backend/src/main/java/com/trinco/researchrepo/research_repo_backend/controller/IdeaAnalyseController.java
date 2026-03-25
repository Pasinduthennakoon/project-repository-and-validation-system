package com.trinco.researchrepo.research_repo_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trinco.researchrepo.research_repo_backend.dto.request.AnalysisIdeaRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.AnalysisIdeaResponseDTO;
import com.trinco.researchrepo.research_repo_backend.service.AnalysisIdeaService;
import com.trinco.researchrepo.research_repo_backend.util.StandardResponse;

@RestController
@RequestMapping("api/v1/idea")
@CrossOrigin
public class IdeaAnalyseController {

    @Autowired
    private AnalysisIdeaService analysisIdeaService;

    @PostMapping(
            path = {"/save"}
    )
    public ResponseEntity<StandardResponse> saveIdea(
        @RequestBody AnalysisIdeaRequestDTO analysisIdeaRequestDTO
    ) {
        String result = analysisIdeaService.saveIdea(analysisIdeaRequestDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "successesfully", result),
                HttpStatus.OK
        );
    }

    @GetMapping(
        path = {"/all"}
    )
    public ResponseEntity<StandardResponse> getAllIdeas() {
        List<AnalysisIdeaResponseDTO> results = analysisIdeaService.getAllIdeas();

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "successesfully", results),
                HttpStatus.OK
        );
    }
}

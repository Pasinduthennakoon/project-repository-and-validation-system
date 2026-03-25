package com.trinco.researchrepo.research_repo_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.trinco.researchrepo.research_repo_backend.dto.response.AdminDashboardSummaryResponseDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.SupervisorDashboardSummaryResponseDTO;
import com.trinco.researchrepo.research_repo_backend.service.SupervisorDashboardService;
import com.trinco.researchrepo.research_repo_backend.util.StandardResponse;

@RestController
@RequestMapping("/api/supervisor/dashboard")
@CrossOrigin
public class SupervisorDashboardController {
    
    @Autowired
    private SupervisorDashboardService supervisorDashboardService;

    @GetMapping(
        path = {"/summary"},
        params = "department"
    )
    public ResponseEntity<StandardResponse> getSummary(
        @RequestParam(value = "department") String department
    ) {
        SupervisorDashboardSummaryResponseDTO response = supervisorDashboardService.getSummary(department);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "Successfully",response),
                HttpStatus.CREATED
        );
    }
}

package com.trinco.researchrepo.research_repo_backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.trinco.researchrepo.research_repo_backend.dto.response.AdminDashboardSummaryResponseDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.RecentProjectResponseDTO;
import com.trinco.researchrepo.research_repo_backend.service.AdminDashboardService;
import com.trinco.researchrepo.research_repo_backend.util.StandardResponse;

@RestController
@RequestMapping("/api/admin/dashboard")
@CrossOrigin
public class AdminDashboardController {
    
    @Autowired
    private AdminDashboardService adminDashboardService;

    @GetMapping("/summary")
    public ResponseEntity<StandardResponse> getSummary() {
        AdminDashboardSummaryResponseDTO response = adminDashboardService.getSummary();

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "Successfully",response),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/count-by-department")
    public ResponseEntity<StandardResponse> getDeptCounts() {
        Map<String, Object> response =  adminDashboardService.getDeptCounts();

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "Successfully",response),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/projects/recent")
    public ResponseEntity<StandardResponse> getRecentProjects() {
        List<RecentProjectResponseDTO> response =  adminDashboardService.getRecentProjects();

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "Successfully",response),
                HttpStatus.CREATED
        );
    }
}

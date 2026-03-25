package com.trinco.researchrepo.research_repo_backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest; // for creating a Pageable

import com.trinco.researchrepo.research_repo_backend.dto.response.AdminDashboardSummaryResponseDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.RecentProjectResponseDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Projects;
import com.trinco.researchrepo.research_repo_backend.repo.AnalysisIdeaRepo;
import com.trinco.researchrepo.research_repo_backend.repo.ProjectRepo;
import com.trinco.researchrepo.research_repo_backend.repo.UserRepo;
import com.trinco.researchrepo.research_repo_backend.service.AdminDashboardService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminDashboardServiceIMPL implements AdminDashboardService {

    @Autowired
    private ProjectRepo projectRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private AnalysisIdeaRepo analysisIdeaRepository;

    @Override
    public AdminDashboardSummaryResponseDTO getSummary() {
        long totalProjects = projectRepository.count();
        long registeredStudents = userRepository.countByRole("STUDENT");
        long ideasAnalyzed = analysisIdeaRepository.count();
        long activeStudents = userRepository.countActiveStudents();

        return new AdminDashboardSummaryResponseDTO(
                totalProjects,
                ideasAnalyzed,
                activeStudents,
                registeredStudents);
    }

    @Override
    public Map<String, Object> getDeptCounts() {
        List<Object[]> results = projectRepository.countProjectsByDepartment();

        List<String> labels = new ArrayList<>();
        List<Long> data = new ArrayList<>();

        for (Object[] row : results) {
            labels.add((String) row[0]);
            data.add((Long) row[1]);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("labels", labels);
        response.put("data", data);

        return response;
    }

    @Override
    public List<RecentProjectResponseDTO> getRecentProjects() {
        List<Projects> projects = projectRepository.findAllForAdminDashboard();

        List<RecentProjectResponseDTO> dtos = projects.stream()
                .map(p -> new RecentProjectResponseDTO(
                        p.getProjectId(),
                        p.getTitle(),
                        p.getDepartment(),
                        p.getBatch(),
                        p.getTags(), // safe, it's Java now
                        p.getUploader() != null ? p.getUploader().getUserName() : "N/A",
                        p.getSupervisor() != null ? p.getSupervisor().getUserName() : "N/A",
                        p.getPdfLink()))
                .toList();

        return dtos;
    }

}

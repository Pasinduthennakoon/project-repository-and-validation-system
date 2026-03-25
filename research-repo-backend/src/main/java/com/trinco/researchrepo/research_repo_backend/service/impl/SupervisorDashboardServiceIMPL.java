package com.trinco.researchrepo.research_repo_backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trinco.researchrepo.research_repo_backend.dto.response.AdminDashboardSummaryResponseDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.SupervisorDashboardSummaryResponseDTO;
import com.trinco.researchrepo.research_repo_backend.repo.AnalysisIdeaRepo;
import com.trinco.researchrepo.research_repo_backend.repo.ProjectRepo;
import com.trinco.researchrepo.research_repo_backend.repo.UserRepo;
import com.trinco.researchrepo.research_repo_backend.service.SupervisorDashboardService;

@Service
public class SupervisorDashboardServiceIMPL implements SupervisorDashboardService {

    @Autowired
    private ProjectRepo projectRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private AnalysisIdeaRepo analysisIdeaRepository;

    @Override
    public SupervisorDashboardSummaryResponseDTO getSummary(String department) {
        long totalProjects = projectRepository.countByDepartment(department);

        long registeredStudents = userRepository.countByRoleAndDepartment("STUDENT", department);

        long ideasAnalyzed = analysisIdeaRepository.countByDepartment(department);

        long activeStudents = userRepository.countDistinctStudentsByDepartment(department);

        return new SupervisorDashboardSummaryResponseDTO(
                totalProjects,
                ideasAnalyzed,
                activeStudents,
                registeredStudents);
    }

}

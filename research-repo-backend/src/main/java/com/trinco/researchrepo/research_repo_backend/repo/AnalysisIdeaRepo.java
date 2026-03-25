package com.trinco.researchrepo.research_repo_backend.repo;

import com.trinco.researchrepo.research_repo_backend.entity.Analysed_Idea;
import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories
@Repository
@Transactional
public interface AnalysisIdeaRepo extends JpaRepository<Analysed_Idea, Integer> {
    long count();

    @Query("SELECT i FROM Analysed_Idea i ORDER BY i.ideaId DESC")
    List<Analysed_Idea> findIdea();
}


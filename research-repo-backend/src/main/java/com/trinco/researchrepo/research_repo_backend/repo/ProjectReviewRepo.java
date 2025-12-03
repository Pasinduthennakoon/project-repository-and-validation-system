package com.trinco.researchrepo.research_repo_backend.repo;

import com.trinco.researchrepo.research_repo_backend.entity.Reviews;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories
@Repository
@Transactional
public interface ProjectReviewRepo extends JpaRepository<Reviews, Integer> {
}

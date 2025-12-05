package com.trinco.researchrepo.research_repo_backend.repo;

import com.trinco.researchrepo.research_repo_backend.dto.LanguageUsageDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.ProjectDetailsResponseDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Comments;
import com.trinco.researchrepo.research_repo_backend.entity.Projects;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@EnableJpaRepositories
@Repository
@Transactional
public interface ProjectRepo extends JpaRepository<Projects, Integer> {

    // Fetch project along with uploader -> student, supervisor, reviews
    @Query("""
        SELECT p FROM Projects p
        JOIN FETCH p.uploader u
        JOIN FETCH u.student s
        LEFT JOIN FETCH p.supervisor sv
        LEFT JOIN FETCH p.reviews r
        WHERE p.projectId = :projectId
    """)
    Optional<Projects> findProjectDetailsById(@Param("projectId") int projectId);

    // Fetch comments with supervisor
    @Query("SELECT c FROM Comments c " +
            "JOIN FETCH c.supervisor " +
            "WHERE c.project.projectId = :projectId " +
            "ORDER BY c.createdAt DESC")
    List<Comments> findCommentsByProjectId(@Param("projectId") int projectId);

}

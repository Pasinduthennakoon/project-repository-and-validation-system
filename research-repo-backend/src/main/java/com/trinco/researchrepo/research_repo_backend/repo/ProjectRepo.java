package com.trinco.researchrepo.research_repo_backend.repo;

import com.trinco.researchrepo.research_repo_backend.dto.LanguageUsageDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.ProjectDetailsResponseDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.ProjectsByUserResponseDTO;
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

    @Query("""
        SELECT p FROM Projects p
            JOIN FETCH p.uploader u
            WHERE p.projectId NOT IN (
                SELECT c.project.projectId
                FROM Comments c
                WHERE c.supervisor.userId = :supervisorId
            )
    """)
    List<Projects> findProjectsForReview(@Param("supervisorId") int supervisorId);

    @Query("SELECT new com.trinco.researchrepo.research_repo_backend.dto.response.ProjectsByUserResponseDTO(p.projectId, p.title) " +
            "FROM Projects p " +
            "JOIN p.uploader u " + // Remove FETCH keyword when using projections
            "WHERE u.userId = :userId")
    List<ProjectsByUserResponseDTO> findProjectTitlesByUploaderId(@Param("userId") int userId);
}

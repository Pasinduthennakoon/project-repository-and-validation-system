package com.trinco.researchrepo.research_repo_backend.repo;

import com.trinco.researchrepo.research_repo_backend.entity.Pending_Projects;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Repository;

import java.util.List;

@EnableJpaRepositories
@Repository
@Transactional
public interface PendingProjectRepo extends JpaRepository<Pending_Projects, Integer> {

    @Query("""
        SELECT p FROM Pending_Projects p
        WHERE p.supervisorId = :supervisorId
""")
    List<Pending_Projects> findBySupervisorId(@Param("supervisorId") int supervisorId);

    @Query("""
        SELECT p.tempPdfPath FROM Pending_Projects p
        WHERE p.pendingProjectId = :pendingProjectId
""")
    String gettempPdfPath(@Param("pendingProjectId") int pendingProjectId);
}

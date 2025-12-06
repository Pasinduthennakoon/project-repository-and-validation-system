package com.trinco.researchrepo.research_repo_backend.repo;

import com.trinco.researchrepo.research_repo_backend.entity.Students;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories
@Repository
@Transactional
public interface StudentRepo extends JpaRepository<Students, Integer> {

    @Query("""
        SELECT s FROM Students s
        WHERE s.regNo = :regNo
    """)
    Students findByRegNo(@Param("regNo") String regNo);
}

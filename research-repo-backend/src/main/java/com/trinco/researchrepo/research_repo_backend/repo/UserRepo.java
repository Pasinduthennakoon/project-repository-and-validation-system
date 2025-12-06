package com.trinco.researchrepo.research_repo_backend.repo;

import com.trinco.researchrepo.research_repo_backend.dto.queryinterfaces.UserDetailsProjection;
import com.trinco.researchrepo.research_repo_backend.entity.Users;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@EnableJpaRepositories
@Repository
@Transactional
public interface UserRepo extends JpaRepository<Users, Integer> {
    boolean existsByEmail(String email);

    @Query(value = """
        SELECT 
            u.userId AS userId,
            u.userName AS userName,
            u.email AS email,
            u.role AS role,
            u.department AS department,
            s.regNo AS regNo,
            s.batch AS batch
        FROM 
            Users u 
        LEFT JOIN 
            Students s ON u.userId = s.userId
        WHERE 
            (:role IS NULL OR :role = '' OR u.role = :role)
        ORDER BY 
            u.userName
    """)
    List<UserDetailsProjection> findUserManagmentDetailsByRole(@Param("role") String role);
}

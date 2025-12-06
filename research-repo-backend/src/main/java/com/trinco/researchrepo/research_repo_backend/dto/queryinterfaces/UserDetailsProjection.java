package com.trinco.researchrepo.research_repo_backend.dto.queryinterfaces;

public interface UserDetailsProjection {
    // Primary Key (used for DTO mapping)
    Integer getUserId();

    // Fields from Users entity
    String getUserName();
    String getDepartment();
    String getEmail();
    String getRole();

    // Fields from Students entity (will be null for non-students)
    String getRegNo();
    String getBatch();
}

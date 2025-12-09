package com.trinco.researchrepo.research_repo_backend.service;

import com.trinco.researchrepo.research_repo_backend.entity.Users;

public interface JwtService {
    String generateToken(Users user);
}

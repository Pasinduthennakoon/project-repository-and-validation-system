package com.trinco.researchrepo.research_repo_backend.service.impl;

import com.trinco.researchrepo.research_repo_backend.entity.Users;
import com.trinco.researchrepo.research_repo_backend.service.JwtService;
import org.springframework.stereotype.Service;

@Service
public class JwtServiceIMPL implements JwtService {

    @Override
    public String generateToken(Users user) {
        return "mock_jwt_token_for_" + user.getEmail();
    }
}

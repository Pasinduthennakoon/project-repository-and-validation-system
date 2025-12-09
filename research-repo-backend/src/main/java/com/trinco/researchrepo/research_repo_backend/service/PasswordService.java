package com.trinco.researchrepo.research_repo_backend.service;

import com.trinco.researchrepo.research_repo_backend.dto.request.ChangePasswordRequestDTO;

public interface PasswordService {

    String changePassword(int userId, ChangePasswordRequestDTO changePasswordRequestDTO);
}

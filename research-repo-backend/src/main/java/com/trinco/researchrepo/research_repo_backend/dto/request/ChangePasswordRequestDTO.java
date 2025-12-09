package com.trinco.researchrepo.research_repo_backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ChangePasswordRequestDTO {
    private String currentPassword;
    private String newPassword;
    private String confirmationPassword;
}

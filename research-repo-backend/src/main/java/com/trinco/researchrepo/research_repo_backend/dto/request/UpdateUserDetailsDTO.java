package com.trinco.researchrepo.research_repo_backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateUserDetailsDTO {
    private String userName;
    private String email;
}

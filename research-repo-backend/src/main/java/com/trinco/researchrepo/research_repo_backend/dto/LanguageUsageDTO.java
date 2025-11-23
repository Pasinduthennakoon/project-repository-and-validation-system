package com.trinco.researchrepo.research_repo_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LanguageUsageDTO {
    private String name;
    private int percent;
}

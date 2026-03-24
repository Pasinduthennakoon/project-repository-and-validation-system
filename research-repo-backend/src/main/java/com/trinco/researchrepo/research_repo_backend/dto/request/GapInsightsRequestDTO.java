package com.trinco.researchrepo.research_repo_backend.dto.request;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.trinco.researchrepo.research_repo_backend.dto.LanguageUsageDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GapInsightsRequestDTO {
    private String title;
    private String batch;
    private List<String> tags = new ArrayList<>();
}

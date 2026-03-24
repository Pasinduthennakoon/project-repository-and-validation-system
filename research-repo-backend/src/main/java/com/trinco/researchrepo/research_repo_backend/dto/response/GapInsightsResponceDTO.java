package com.trinco.researchrepo.research_repo_backend.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GapInsightsResponceDTO  {
    private List<String> trending;
    private List<String> underrepresented;
    private List<String> suggestions;
}

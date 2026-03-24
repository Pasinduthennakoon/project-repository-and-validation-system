package com.trinco.researchrepo.research_repo_backend.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.trinco.researchrepo.research_repo_backend.service.AITagService;

@Service
public class AITagServiceIMPL implements AITagService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String PYTHON_API_URL = "http://localhost:8000/generate-tags";

    public List<String> generateTags(String abstractText) {
        
        Map<String, String> body = new HashMap<>();
        body.put("text", abstractText);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(PYTHON_API_URL, entity, Map.class);

        List<String> tags = (List<String>) response.getBody().get("tags");
        return tags;
    }
    
}

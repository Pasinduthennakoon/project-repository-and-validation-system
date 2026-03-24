package com.trinco.researchrepo.research_repo_backend.service;

import java.util.List;

public interface AITagService {

    List<String> generateTags(String abstract_);
    
}

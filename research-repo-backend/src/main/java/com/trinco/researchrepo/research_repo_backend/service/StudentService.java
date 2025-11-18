package com.trinco.researchrepo.research_repo_backend.service;

import com.trinco.researchrepo.research_repo_backend.dto.request.StudentSaveRequestDTO;
import org.springframework.stereotype.Service;

public interface StudentService {
    String addStudent(StudentSaveRequestDTO studentSaveRequestDTO);

}

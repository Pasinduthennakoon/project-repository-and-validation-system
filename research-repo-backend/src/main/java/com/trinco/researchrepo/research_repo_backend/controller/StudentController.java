package com.trinco.researchrepo.research_repo_backend.controller;

import com.trinco.researchrepo.research_repo_backend.dto.request.StudentSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.service.StudentService;
import com.trinco.researchrepo.research_repo_backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/student")
@CrossOrigin
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping(
            path = {"/save"}
    )
    public ResponseEntity<StandardResponse> addStudent(@RequestBody StudentSaveRequestDTO studentSaveRequestDTO) {

        String studentId = studentService.addStudent(studentSaveRequestDTO);


        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "User successfully saved with ID: " , studentId),
                HttpStatus.CREATED
        );
    }
}

package com.trinco.researchrepo.research_repo_backend.controller;

import com.trinco.researchrepo.research_repo_backend.dto.request.PendingUserSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.request.StudentSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.service.PendingUserService;
import com.trinco.researchrepo.research_repo_backend.service.StudentService;
import com.trinco.researchrepo.research_repo_backend.service.UserSevice;
import com.trinco.researchrepo.research_repo_backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserSevice userSevice;

    @Autowired
    private StudentService studentService;

    @Autowired
    private PendingUserService pendingUserService;

    @PostMapping(
            path = {"/save/student"}
    )
    public ResponseEntity<StandardResponse> addStudent(@RequestBody StudentSaveRequestDTO studentSaveRequestDTO) {

            String studentId = studentService.addStudent(studentSaveRequestDTO);


        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "User successfully saved with ID: " , studentId),
                HttpStatus.CREATED
        );
    }

    @PostMapping(
            path = {"/save/user"}
    )
    public ResponseEntity<StandardResponse> addUser(@RequestBody PendingUserSaveRequestDTO pendingUserSaveRequestDTO) {

        String userId = pendingUserService.addPendingUser(pendingUserSaveRequestDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "Pending User Signup Request", userId),
                HttpStatus.CREATED
        );
    }
}

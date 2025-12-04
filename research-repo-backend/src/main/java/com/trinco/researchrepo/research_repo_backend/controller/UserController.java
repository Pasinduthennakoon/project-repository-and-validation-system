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
    private PendingUserService pendingUserService;

    @PostMapping(
            path = {"/save/pending_user"}
    )
    public ResponseEntity<StandardResponse> addUser(@RequestBody PendingUserSaveRequestDTO pendingUserSaveRequestDTO) {

        String userId = pendingUserService.addPendingUser(pendingUserSaveRequestDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "Pending User Signup Request", userId),
                HttpStatus.CREATED
        );
    }

    @PostMapping(
            path = {"/approve_user"},
            params = {"pendingId"}
    )
    public ResponseEntity<StandardResponse> approveUser(
            @RequestParam("pendingId") int pendingId) throws Exception {

        String userId = userSevice.approveUser(pendingId);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "User Added Successfully", userId),
                HttpStatus.CREATED
        );
    }
}

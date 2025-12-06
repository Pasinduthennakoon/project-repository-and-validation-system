package com.trinco.researchrepo.research_repo_backend.controller;

import com.trinco.researchrepo.research_repo_backend.dto.request.PendingUserSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.PendingUsersResponseDTO;
import com.trinco.researchrepo.research_repo_backend.service.PendingUserService;
import com.trinco.researchrepo.research_repo_backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/pending_user")
@CrossOrigin
public class PendingUserController {

    @Autowired
    private PendingUserService pendingUserService;

    //sign up users(supervisor or admin)
    @PostMapping(
            path = {"/save"}
    )
    public ResponseEntity<StandardResponse> addUser(@RequestBody PendingUserSaveRequestDTO pendingUserSaveRequestDTO) {

        String userId = pendingUserService.addPendingUser(pendingUserSaveRequestDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "Pending User Signup Request", userId),
                HttpStatus.CREATED
        );
    }

//view pending users(admin)
    @GetMapping(
            path = {"/view/pending_users"}
    )
    public ResponseEntity<StandardResponse> getPendingUsersForApproval() {
        List<PendingUsersResponseDTO> pendingUsersResponseDTOS = pendingUserService.getPendingUsersForApproval();

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "success", pendingUsersResponseDTOS),
                HttpStatus.OK
        );
    }
}

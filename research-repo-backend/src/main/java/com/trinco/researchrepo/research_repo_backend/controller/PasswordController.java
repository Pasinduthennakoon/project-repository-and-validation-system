package com.trinco.researchrepo.research_repo_backend.controller;

import com.trinco.researchrepo.research_repo_backend.dto.request.ChangePasswordRequestDTO;
import com.trinco.researchrepo.research_repo_backend.service.PasswordService;
import com.trinco.researchrepo.research_repo_backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/password")
@CrossOrigin
public class PasswordController {

    @Autowired
    private PasswordService passwordService;

    @PutMapping(
            path = {"/change"},
            params = {"userId"}
    )
    public ResponseEntity<StandardResponse> changePassword(
            @RequestParam(value = "userId") int userId,
            @RequestBody ChangePasswordRequestDTO changePasswordRequestDTO
    ) {
        String result = passwordService.changePassword(userId, changePasswordRequestDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "successesfully changed password", result),
                HttpStatus.OK
        );
    }
}

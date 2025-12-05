package com.trinco.researchrepo.research_repo_backend.controller;

import com.trinco.researchrepo.research_repo_backend.dto.request.PendingUserSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.UploadProjectUsersResponseDTO;
import com.trinco.researchrepo.research_repo_backend.exceptions.InvalidInputException;
import com.trinco.researchrepo.research_repo_backend.service.PendingUserService;
import com.trinco.researchrepo.research_repo_backend.service.UserSevice;
import com.trinco.researchrepo.research_repo_backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserSevice userSevice;

    @Autowired
    private PendingUserService pendingUserService;

//sign up userss(supervisor or admin)
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

//approve signup request(admin)
    @PostMapping(
            path = {"/approve_user"},
            params = {"pendingId"}
    )
    public ResponseEntity<StandardResponse> approveUser(
            @RequestParam(value = "pendingId") int pendingId) throws Exception {

        String userId = userSevice.approveUser(pendingId);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "User Added Successfully", userId),
                HttpStatus.CREATED
        );
    }

//apdate active state(when user logn in website)
    @PutMapping(
            path = {"/update_active_state"},
            params = {"userId", "activeState"}
    )
    public ResponseEntity<StandardResponse> updateActiveState(
            @RequestParam(value = "userId") int userId,
            @RequestParam(value = "activeState") String activeState
    ) {
        if(activeState.equalsIgnoreCase("active") | activeState.equalsIgnoreCase("inactive")){

            boolean status = activeState.equalsIgnoreCase("active") ? true : false;
            String resualt = userSevice.updateActiveState(userId, status);

            return new ResponseEntity<StandardResponse>(
                    new StandardResponse(200, "success", resualt),
                    HttpStatus.OK
            );
        }else {
            throw new InvalidInputException("please enter valid input");
        }
    }

//get departments and supervisors in that depatments details(student project upload page)
    @GetMapping(
            path = {"/upload_uses"}
    )
    public ResponseEntity<StandardResponse> uploadUses(){
        List<UploadProjectUsersResponseDTO> uploadProjectUsersResponseDTOS = userSevice.uploadUses();

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "success", uploadProjectUsersResponseDTOS),
                HttpStatus.OK
        );
    }
}

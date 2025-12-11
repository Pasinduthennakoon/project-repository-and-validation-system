package com.trinco.researchrepo.research_repo_backend.controller;

import com.trinco.researchrepo.research_repo_backend.dto.request.LoginRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.request.PendingUserSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.request.UpdateUserDetailsDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.LoginResponseDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.UploadProjectUsersResponseDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.UserManagementResponseDTO;
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

//reject signup request(admin)
    @DeleteMapping(
            path = {"/reject_user"},
            params = {"pendingId"}
    )
    public ResponseEntity<StandardResponse> rejectUser(
            @RequestParam(value = "pendingId") int pendingId
    ){
        boolean rejectedUser = userSevice.rejectUser(pendingId);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "user rejected", rejectedUser),
                HttpStatus.OK
        );
    }

    //login user
    @PostMapping(
            path = {"/login"}
    )
    public ResponseEntity<StandardResponse> loginUser(
            @RequestBody LoginRequestDTO loginRequestDTO
            ){
        try {
            LoginResponseDTO loginResponseDTO = userSevice.authenticate(loginRequestDTO);

            return new ResponseEntity<StandardResponse>(
                    new StandardResponse(201, "Login Successful", loginResponseDTO),
                    HttpStatus.OK
            );
        } catch (RuntimeException e){
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse(401, e.getMessage(), null),
                    HttpStatus.UNAUTHORIZED
            );
        }

    }

    //update active state(when user logn in website)
    @PutMapping(
            path = {"/update_active_state"},
            params = {"userId", "activeState"}
    )
    public ResponseEntity<StandardResponse> updateActiveState(
            @RequestParam(value = "userId") int userId,
            @RequestParam(value = "activeState") String activeState
    ) {
        if (activeState.equalsIgnoreCase("active") | activeState.equalsIgnoreCase("inactive")) {

            boolean status = activeState.equalsIgnoreCase("active") ? true : false;
            String resualt = userSevice.updateActiveState(userId, status);

            return new ResponseEntity<StandardResponse>(
                    new StandardResponse(200, "success", resualt),
                    HttpStatus.OK
            );
        } else {
            throw new InvalidInputException("please enter valid input");
        }
    }

    //get departments and supervisors in that depatments details(student project upload page)
    @GetMapping(
            path = {"/upload_uses"}
    )
    public ResponseEntity<StandardResponse> uploadUses() {
        List<UploadProjectUsersResponseDTO> uploadProjectUsersResponseDTOS = userSevice.uploadUses();

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "success", uploadProjectUsersResponseDTOS),
                HttpStatus.OK
        );
    }
//get users for user management(supervisor)
    @GetMapping(
            path = {"/user_management"},
            params = {"role"}
    )
    public ResponseEntity<StandardResponse> getUsersForUserManagement(
            @RequestParam(value = "role", required = false) String role
    ) {
        List<UserManagementResponseDTO> userManagementResponseDTOS = userSevice.getAllUsersForUserManagemet(role);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "success", userManagementResponseDTOS),
                HttpStatus.OK
        );
    }

//get users departments(students' project validation page)
    @GetMapping(
            path = {"/get_user_departments"}
    )
    public ResponseEntity<StandardResponse> getUserDepartments(){
        List<String> departments = userSevice.getUserDepartments();

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "success", departments),
                HttpStatus.OK
        );
    }

//delete user
    @DeleteMapping(
            path = {"/delete"},
            params = {"userId"}
    )
    public ResponseEntity<StandardResponse> deleteUser(
            @RequestParam(value = "userId") int userId
    ){
        boolean deletedUser = userSevice.deleteUser(userId);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "successfully deleted user", deletedUser),
                HttpStatus.OK
        );
    }

//delete users photo
    @DeleteMapping(
            path = {"/photo/delete"},
            params = {"userId"}
    )
    public ResponseEntity<StandardResponse> deletePhoto(
            @RequestParam(value = "userId") int userId
    ){
        boolean deletedPhoto = userSevice.deleteUserPhoto(userId);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "user photo successfully deleted", deletedPhoto),
                HttpStatus.OK
        );
    }
//update user details(my account)
    @PutMapping(
            path = {"/update"},
            params = {"userId"}
    )
    public ResponseEntity<StandardResponse> updateUser(
            @RequestParam(value = "userId") int userId,
            @RequestBody UpdateUserDetailsDTO userDetailsDTO
    ){
        System.out.println(userId);
        int user = userSevice.updateUserDetails(userId, userDetailsDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "user details updated", user),
                HttpStatus.OK
        );
    }
}

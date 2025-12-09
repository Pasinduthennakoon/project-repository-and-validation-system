package com.trinco.researchrepo.research_repo_backend.service.impl;

import com.trinco.researchrepo.research_repo_backend.dto.request.ChangePasswordRequestDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Users;
import com.trinco.researchrepo.research_repo_backend.exceptions.NotFoundException;
import com.trinco.researchrepo.research_repo_backend.repo.UserRepo;
import com.trinco.researchrepo.research_repo_backend.service.PasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordServiceIMPL implements PasswordService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public String changePassword(int userId, ChangePasswordRequestDTO changePasswordRequestDTO) {
        // --- Step 1: Input Validation ---
        if (! changePasswordRequestDTO.getNewPassword().equals(changePasswordRequestDTO.getConfirmationPassword())) {
            throw new RuntimeException("New password and confirmation do not match.");
        }

        // --- Step 2: Retrieve and Verify Current Password ---

        // 2a. Find the user by their ID (assuming they are already authenticated)
        Users user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found."));

        // 2b. **Crucial Security Step:** Verify the current password
        if (!passwordEncoder.matches(changePasswordRequestDTO.getCurrentPassword(), user.getPassword())) {
            // The password comparison logic from your original snippet:
            throw new RuntimeException("Invalid current password.");
        }

        // 2c. Optional: Check if the new password is the same as the old one
        if (passwordEncoder.matches(changePasswordRequestDTO.getNewPassword(), user.getPassword())) {
            throw new RuntimeException("New password must be different from the old password.");
        }


        // --- Step 3: Hash and Update New Password ---

        // 3a. **Crucial Security Step:** Hash the new password
        String encodedNewPassword = passwordEncoder.encode(changePasswordRequestDTO.getNewPassword());

        // 3b. Update the user object with the new hashed password
        user.setPassword(encodedNewPassword);

        // 3c. Save the updated user object to the database
        userRepo.save(user);

        // Optional: Invalidate old sessions/tokens to force re-login

        return ("Password successfully updated for user: " + userId);
    }
}

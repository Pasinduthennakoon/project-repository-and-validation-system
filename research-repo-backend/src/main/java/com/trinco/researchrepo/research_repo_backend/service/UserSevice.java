package com.trinco.researchrepo.research_repo_backend.service;

import com.trinco.researchrepo.research_repo_backend.dto.request.PendingUserSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.request.UserSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.UploadProjectUsersResponseDTO;
import com.trinco.researchrepo.research_repo_backend.dto.response.UserManagementResponseDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Users;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserSevice {
    Users addUser(UserSaveRequestDTO userSaveRequestDTO);

    String approveUser(int pendingId);

    String updateActiveState(int userId, boolean status);

    List<UploadProjectUsersResponseDTO> uploadUses();

    List<UserManagementResponseDTO> getAllUsersForUserManagemet(String role);

    boolean rejectUser(int pendingId);

    List<String> getUserDepartments();

    boolean deleteUser(int userId);

    boolean deleteUserPhoto(int userId);
}

package com.trinco.researchrepo.research_repo_backend.util.mappers;

import com.trinco.researchrepo.research_repo_backend.dto.request.PendingUserSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.request.StudentSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.request.UserSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Pending_Users;
import com.trinco.researchrepo.research_repo_backend.entity.Users;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UsersMapper {

    Users RequestDtoToEntity(UserSaveRequestDTO userSaveRequestDTO);

    default UserSaveRequestDTO studentDtoToUserDto(StudentSaveRequestDTO studentSaveRequestDTO) {
        if (studentSaveRequestDTO == null) return null;
        return new UserSaveRequestDTO(
                studentSaveRequestDTO.getUserName(),
                studentSaveRequestDTO.getDepartment(),
                studentSaveRequestDTO.getEmail(),
                studentSaveRequestDTO.getRole(),
                studentSaveRequestDTO.getPassword(),
                studentSaveRequestDTO.getPhotoLink(),
                studentSaveRequestDTO.isActiveState()
        );
    }

    PendingUserSaveRequestDTO EntityToPenddingUserDto(Pending_Users pending_Users);

    @Mapping(target = "photoLink", ignore = true)
    @Mapping(target = "activeState", ignore = true)
    @Mapping(target = "studentInfo", ignore = true)
    UserSaveRequestDTO PendingUserDtoToUserDto(PendingUserSaveRequestDTO pendingUserSaveRequestDTO);
}

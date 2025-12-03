package com.trinco.researchrepo.research_repo_backend.service.impl;

import com.trinco.researchrepo.research_repo_backend.dto.request.StudentSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.dto.request.UserSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Students;
import com.trinco.researchrepo.research_repo_backend.entity.Users;
import com.trinco.researchrepo.research_repo_backend.exceptions.EntryDuplicationException;
import com.trinco.researchrepo.research_repo_backend.repo.StudentRepo;
import com.trinco.researchrepo.research_repo_backend.repo.UserRepo;
import com.trinco.researchrepo.research_repo_backend.service.StudentService;
import com.trinco.researchrepo.research_repo_backend.service.UserSevice;
import com.trinco.researchrepo.research_repo_backend.util.mappers.StudentsMapper;
import com.trinco.researchrepo.research_repo_backend.util.mappers.UsersMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceIMPL implements StudentService {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private UsersMapper usersMapper;

    @Autowired
    private UserSevice userSevice;

    @Override
    public String addStudent(StudentSaveRequestDTO studentSaveRequestDTO) {

        if (userRepo.existsByEmail(studentSaveRequestDTO.getEmail())) {
            throw new EntryDuplicationException("Email already exists!");
        }else{
            UserSaveRequestDTO userSaveRequestDTO = usersMapper.studentDtoToUserDto(studentSaveRequestDTO);
            Users user = userSevice.addUser(userSaveRequestDTO);

            // Manually create Students entity instead of using mapper
            Students students = new Students();
            students.setRegNo(studentSaveRequestDTO.getRegNo());
            students.setBatch(studentSaveRequestDTO.getBatch());
            students.setUser(user);

            return String.valueOf(studentRepo.save(students).getUserId());
        }

    }
}

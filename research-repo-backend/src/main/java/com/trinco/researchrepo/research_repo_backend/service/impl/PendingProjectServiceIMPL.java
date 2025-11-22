package com.trinco.researchrepo.research_repo_backend.service.impl;

import com.trinco.researchrepo.research_repo_backend.dto.request.PendingProjectSaveRequestDTO;
import com.trinco.researchrepo.research_repo_backend.entity.Pending_Projects;
import com.trinco.researchrepo.research_repo_backend.exceptions.EntryDuplicationException;
import com.trinco.researchrepo.research_repo_backend.repo.PendingProjectRepo;
import com.trinco.researchrepo.research_repo_backend.service.PendingProjectService;
import com.trinco.researchrepo.research_repo_backend.util.mappers.PendingProjectMapper;
import com.trinco.researchrepo.research_repo_backend.util.mappers.PendingUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PendingProjectServiceIMPL implements PendingProjectService {

    @Autowired
    private PendingProjectMapper pendingProjectMapper;

    @Autowired
    private PendingProjectRepo pendingProjectRepo;

    @Override
    public String addPendingProject(PendingProjectSaveRequestDTO pendingProjectSaveRequestDTO) {

        Pending_Projects pendingProjects = pendingProjectMapper.RequestDtoToEntity(pendingProjectSaveRequestDTO);
        if (!pendingProjectRepo.existsById(pendingProjects.getPendingProjectId())){
            pendingProjectRepo.save(pendingProjects);
            return "project added";
        }else {
            throw new EntryDuplicationException("project already exists");
        }
    }
}

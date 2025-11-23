package com.trinco.researchrepo.research_repo_backend.service;

import java.io.IOException;
import java.security.GeneralSecurityException;

public interface GoogleDriveService {
    public String uploadFileToDrive(java.io.File file)throws IOException, GeneralSecurityException;
}

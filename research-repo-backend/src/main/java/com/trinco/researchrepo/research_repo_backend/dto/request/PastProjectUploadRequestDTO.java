package com.trinco.researchrepo.research_repo_backend.dto.request;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PastProjectUploadRequestDTO {
    private String title;
    private String description;
    private String abstract_;
    private String department;
    private LocalDate createdAt;
    private String batch;
    private String PdfLink;
}

package com.trinco.researchrepo.research_repo_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "pending_projects")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Pending_Projects {

    @Id
    @Column(name = "pending_project_id",length = 45)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pendingProjectId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "abstract",nullable = false)
    private String abstract_;

    @Column(name = "github_link")
    private String githubLink;

    @Column(name = "temp_pdf_path",nullable = false)
    private String tempPdfPath;

    @Column(name = "department",nullable = false)
    private String department;

    @Column(name = "reg_no",nullable = false)
    private String regNo;

    @Column(name = "batch",nullable = false)
    private String batch;

    @Column(name = "supervisor_id",nullable = false)
    private int supervisorId;

    @Column(name = "created_at")
    private String createdAt;

}

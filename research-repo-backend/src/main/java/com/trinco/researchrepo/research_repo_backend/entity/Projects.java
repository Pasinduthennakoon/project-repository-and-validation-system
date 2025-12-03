package com.trinco.researchrepo.research_repo_backend.entity;

import com.trinco.researchrepo.research_repo_backend.dto.LanguageUsageDTO;
import com.vladmihalcea.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import java.util.List;

@Entity
@Table(name = "projects")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Projects {

    @Id
    @Column(name = "project_id", length = 45)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int projectId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "abstract", nullable = false)
    private String abstract_;

    @Column(name = "pdf_link")
    private String pdfLink;

    @Column(name = "github_link")
    private String githubLink;

    @Column(name = "department", nullable = false)
    private String department;

    @Column(name = "created_at")
    private String createdAt;

    @Type(JsonType.class)
    @Column(name = "language_used", columnDefinition = "json")
    private List<LanguageUsageDTO> languageUsed;

    @OneToOne
    @JoinColumn(name = "uploader_id")  // Column in Projects table
    private Users uploader;

    @ManyToOne
    @JoinColumn(name = "supervisor_id") // Column in Projects table
    private Users supervisor;

    @Column(name = "batch", nullable = false)
    private String batch;

    @Type(JsonType.class)
    @Column(name = "tags", columnDefinition = "json")
    private List<String> tags;

    @OneToOne(mappedBy = "project")
    private Reviews reviews;
}

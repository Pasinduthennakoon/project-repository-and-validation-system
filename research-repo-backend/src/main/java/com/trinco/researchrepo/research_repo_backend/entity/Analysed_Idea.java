package com.trinco.researchrepo.research_repo_backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "idea_analysis")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Analysed_Idea {
    @Id
    @Column(name = "idea_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ideaId;

    @Column(name = "title")
    private String title;

    @Column(name = "name")
    private String name;

    @Column(name = "department")
    private String department;

    @Column(name = "batch")
    private String batch;

    @Column(name = "matched")
    private String matched;

    @Column(name = "status")
    private String status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}

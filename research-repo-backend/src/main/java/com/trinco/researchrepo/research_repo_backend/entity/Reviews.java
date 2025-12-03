package com.trinco.researchrepo.research_repo_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "reviews")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Reviews {

    @Id
    private int projectId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "project_id")
    private Projects project;

    @Column(name = "watches")
    private int watches;

    @Column(name = "stars")
    private int stars;

    @Column(name = "rated")
    private int rated;

}

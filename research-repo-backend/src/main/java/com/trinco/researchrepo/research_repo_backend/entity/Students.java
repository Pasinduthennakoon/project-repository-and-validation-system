package com.trinco.researchrepo.research_repo_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "students")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Students {

    @Id
    private int userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private Users user;

    @Column(name = "reg_no", length = 100, nullable = false)
    private String regNo;

    @Column(name = "batch", length = 100, nullable = false)
    private String batch;

    public Students(String regNo, String batch) {
        this.regNo = regNo;
        this.batch = batch;
    }
}

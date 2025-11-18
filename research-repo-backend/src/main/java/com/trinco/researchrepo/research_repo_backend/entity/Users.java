package com.trinco.researchrepo.research_repo_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Users {

    @Id
    @Column(name = "user_id", length = 45)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @Column(name = "user_name", length = 100, nullable = false)
    private String userName;

    @Column(name = "department", length = 100, nullable = false)
    private String department;

    @Column(name = "email", length = 100, nullable = false)
    private String email;

    @Column(name = "role", length = 100, nullable = false)
    private String role;

    @Column(name = "password", length = 100, nullable = false)
    private String password;

    @Column(name = "photo_link", nullable = false)
    private String photoLink;

    @Column(name = "active_state", columnDefinition = "TINYINT default 1")
    private boolean activeState;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Students student;

}

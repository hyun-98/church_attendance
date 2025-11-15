package com.example.church.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private LocalDate birthDate;
    private String phone;
    private String ageGroup;
    private LocalDate registeredAt;
    private Boolean hasAttendedBefore = false;
    private Boolean isGraduated = false;
    private String photoUrl;

    // 1:N 관계
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<com.example.church.model.Report> reports;
}

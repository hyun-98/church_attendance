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

    @Column(nullable = false)
    private String name;

    private LocalDate birthDate;

    private String phone;

    private String ageGroup;

    private LocalDate registeredAt;

    @Column(nullable = false)
    private Boolean hasAttendedBefore = false;

    @Column(nullable = false)
    private Boolean isGraduated = false;

    private String photoUrl;
}

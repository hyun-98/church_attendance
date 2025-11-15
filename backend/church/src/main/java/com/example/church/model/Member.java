package com.example.church.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private LocalDate birthDate;
    private String phone;
    private String ageGroup;
    private Boolean hasAttendedBefore;
    private String photoUrl;
    private LocalDate registeredAt;

    private Boolean isPresent = false; // 출석 여부 기본값 false
}

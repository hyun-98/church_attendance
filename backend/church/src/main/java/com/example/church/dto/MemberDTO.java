package com.example.church.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class MemberDTO {

    private String name;
    private LocalDate birthDate;
    private String phone;
    private String ageGroup;
    private LocalDate registeredAt;
    private Boolean hasAttendedBefore;
    private Boolean isGraduated;
    private String photoUrl;
}

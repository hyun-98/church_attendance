package com.example.church.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReportDTO {
    private Long memberId;
    private String week;
    private String leader;
    private String content;
    private LocalDate createdAt;
}

package com.example.church.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class ReportDTO {
    public Long memberId;
    public String week;
    public String leader;
    public String content;
    public LocalDate createdAt; // 프론트에서 yyyy-MM-dd 형식으로 전달
}

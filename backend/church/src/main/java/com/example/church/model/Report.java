package com.example.church.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(nullable = false)
    private String week; // 1주차 ~ 5주차

    @Column(nullable = false)
    private String leader;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDate createdAt = LocalDate.now();
}

package com.example.church.controller;

import com.example.church.dto.ReportDTO;
import com.example.church.model.Member;
import com.example.church.model.Report;
import com.example.church.repository.MemberRepository;
import com.example.church.repository.ReportRepository;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5173") // React 개발 서버 CORS 허용
public class ReportController {

    private final ReportRepository reportRepository;
    private final MemberRepository memberRepository;

    public ReportController(ReportRepository reportRepository, MemberRepository memberRepository) {
        this.reportRepository = reportRepository;
        this.memberRepository = memberRepository;
    }

    // 교인별 보고서 조회
    @GetMapping("/member/{memberId}")
    public List<Report> getReportsByMember(@PathVariable Long memberId) {
        return reportRepository.findByMemberId(memberId);
    }

    // 보고서 생성
    @PostMapping
    public Report createReport(@RequestBody ReportDTO dto) {
        if (dto.memberId == null) throw new RuntimeException("MemberId is required");

        Member member = memberRepository.findById(dto.memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        Report report = new Report();
        report.setMember(member);
        report.setWeek(dto.week);
        report.setLeader(dto.leader);
        report.setContent(dto.content);
        report.setCreatedAt(dto.getCreatedAt() != null ? dto.getCreatedAt() : LocalDate.now());

        return reportRepository.save(report);
    }
}

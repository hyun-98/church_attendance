package com.example.church.service;

import com.example.church.model.Member;
import com.example.church.model.Report;
import com.example.church.repository.MemberRepository;
import com.example.church.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    private final MemberRepository memberRepository;

    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    public List<Report> getReportsByMember(Long memberId) {
        return reportRepository.findByMemberId(memberId);
    }

    public Report createReport(Long memberId, Report report) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));
        report.setMember(member);
        return reportRepository.save(report);
    }

    public Report updateReport(Long id, Report updatedReport) {
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Report not found"));

        report.setWeek(updatedReport.getWeek());
        report.setLeader(updatedReport.getLeader());
        report.setContent(updatedReport.getContent());
        report.setCreatedAt(updatedReport.getCreatedAt());

        return reportRepository.save(report);
    }

    public void deleteReport(Long id) {
        if (!reportRepository.existsById(id)) {
            throw new RuntimeException("Report not found");
        }
        reportRepository.deleteById(id);
    }
}

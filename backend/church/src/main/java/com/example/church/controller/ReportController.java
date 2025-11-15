package com.example.church.controller;

import com.example.church.dto.ReportDTO;
import com.example.church.model.Report;
import com.example.church.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/member/{memberId}")
    public List<Report> getReportsByMember(@PathVariable Long memberId) {
        return reportService.getReportsByMember(memberId);
    }

    @PostMapping
    public ResponseEntity<?> createReport(@RequestBody ReportDTO dto) {
        try {
            Report report = new Report();
            report.setWeek(dto.getWeek());
            report.setLeader(dto.getLeader());
            report.setContent(dto.getContent());
            report.setCreatedAt(dto.getCreatedAt() != null ? dto.getCreatedAt() : java.time.LocalDate.now());

            Report saved = reportService.createReport(dto.getMemberId(), report);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateReport(@PathVariable Long id, @RequestBody ReportDTO dto) {
        try {
            Report updated = new Report();
            updated.setWeek(dto.getWeek());
            updated.setLeader(dto.getLeader());
            updated.setContent(dto.getContent());
            updated.setCreatedAt(dto.getCreatedAt());

            Report saved = reportService.updateReport(id, updated);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReport(@PathVariable Long id) {
        try {
            reportService.deleteReport(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

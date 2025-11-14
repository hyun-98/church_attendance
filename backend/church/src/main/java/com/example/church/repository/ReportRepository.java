package com.example.church.repository;

import com.example.church.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByMemberId(Long memberId);
}

package com.example.church.repository;

import com.example.church.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    // 전화번호로 조회 예시
    boolean existsByPhone(String phone);

}

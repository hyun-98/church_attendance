package com.example.church.controller;

import com.example.church.model.Member;
import com.example.church.repository.MemberRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = "http://localhost:5173") // React 포트
public class MemberController {

    private final MemberRepository memberRepository;

    public MemberController(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    // 모든 교인 조회
    @GetMapping
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    // 교인 등록
    @PostMapping
    public Member addMember(@RequestBody Member member) {
        return memberRepository.save(member);
    }

    // 출석 토글
    @PutMapping("/{id}/toggle")
    public Member toggleAttendance(@PathVariable Long id) {
        Member member = memberRepository.findById(id).orElseThrow();
        member.setIsPresent(!member.getIsPresent());
        return memberRepository.save(member);
    }

    @DeleteMapping("/{id}")
    public void deleteMember(@PathVariable Long id) {
        memberRepository.deleteById(id);
    }


}

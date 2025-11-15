package com.example.church.service;

import com.example.church.dto.MemberDTO;
import com.example.church.model.Member;
import com.example.church.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    // 전체 조회
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    // 단건 조회
    public Member getMemberById(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found"));
    }

    // DTO 기반 생성
    public Member createMemberFromDTO(MemberDTO dto) {
        Member member = new Member();
        member.setName(dto.getName());
        member.setBirthDate(dto.getBirthDate());
        member.setPhone(dto.getPhone());
        member.setAgeGroup(dto.getAgeGroup());
        member.setRegisteredAt(dto.getRegisteredAt());
        member.setHasAttendedBefore(dto.getHasAttendedBefore());
        member.setIsGraduated(dto.getIsGraduated());
        member.setPhotoUrl(dto.getPhotoUrl());
        return memberRepository.save(member);
    }

    // DTO 기반 수정
    public Member updateMemberFromDTO(Long id, MemberDTO dto) {
        Member member = getMemberById(id);
        member.setName(dto.getName());
        member.setBirthDate(dto.getBirthDate());
        member.setPhone(dto.getPhone());
        member.setAgeGroup(dto.getAgeGroup());
        member.setRegisteredAt(dto.getRegisteredAt());
        member.setHasAttendedBefore(dto.getHasAttendedBefore());
        member.setIsGraduated(dto.getIsGraduated());
        member.setPhotoUrl(dto.getPhotoUrl());
        return memberRepository.save(member);
    }

    // 삭제
    public void deleteMember(Long id) {
        Member member = getMemberById(id);
        memberRepository.delete(member);
    }
}

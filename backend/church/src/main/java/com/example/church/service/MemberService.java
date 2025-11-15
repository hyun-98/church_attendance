package com.example.church.service;

import com.example.church.dto.MemberDTO;
import com.example.church.model.Member;
import com.example.church.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    // -------------------- 전체 조회 --------------------
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    // -------------------- 단건 조회 --------------------
    public Member getMemberById(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found"));
    }

    // -------------------- DTO 기반 생성 --------------------
    public Member createMemberFromDTO(MemberDTO dto) {
        Member member = new Member();
        member.setName(dto.getName());
        member.setBirthDate(dto.getBirthDate());
        member.setPhone(dto.getPhone());
        member.setAgeGroup(dto.getAgeGroup());
        member.setRegisteredAt(dto.getRegisteredAt() != null ? dto.getRegisteredAt() : LocalDate.now());
        member.setHasAttendedBefore(dto.getHasAttendedBefore() != null ? dto.getHasAttendedBefore() : false);
        member.setIsGraduated(dto.getIsGraduated() != null ? dto.getIsGraduated() : false);
        member.setPhotoUrl(dto.getPhotoUrl());
        return memberRepository.save(member);
    }

    // -------------------- DTO 기반 수정 --------------------
    public Member updateMemberFromDTO(Long id, MemberDTO dto) {
        Member member = getMemberById(id);
        if (dto.getName() != null) member.setName(dto.getName());
        if (dto.getBirthDate() != null) member.setBirthDate(dto.getBirthDate());
        if (dto.getPhone() != null) member.setPhone(dto.getPhone());
        if (dto.getAgeGroup() != null) member.setAgeGroup(dto.getAgeGroup());
        if (dto.getRegisteredAt() != null) member.setRegisteredAt(dto.getRegisteredAt());
        if (dto.getHasAttendedBefore() != null) member.setHasAttendedBefore(dto.getHasAttendedBefore());
        if (dto.getIsGraduated() != null) member.setIsGraduated(dto.getIsGraduated());
        if (dto.getPhotoUrl() != null) member.setPhotoUrl(dto.getPhotoUrl());
        return memberRepository.save(member);
    }

    // -------------------- 생성 (사진 업로드 포함) --------------------
    public Member createMemberWithFile(String name, String birthDate, String phone,
                                       String ageGroup, Boolean hasAttended, Boolean isGraduated,
                                       String registeredAt, MultipartFile photo, String uploadDir) throws IOException {

        Member member = new Member();
        member.setName(name);
        if (birthDate != null && !birthDate.isEmpty()) {
            member.setBirthDate(LocalDate.parse(birthDate));
        }
        member.setPhone(phone);
        member.setAgeGroup(ageGroup);
        member.setHasAttendedBefore(hasAttended != null ? hasAttended : false);
        member.setIsGraduated(isGraduated != null ? isGraduated : false);
        member.setRegisteredAt(
                (registeredAt != null && !registeredAt.isEmpty()) ? LocalDate.parse(registeredAt) : LocalDate.now()
        );

        // 사진 저장
        if (photo != null && !photo.isEmpty()) {
            File uploadPath = new File(uploadDir);
            if (!uploadPath.exists()) uploadPath.mkdirs();

            String ext = photo.getOriginalFilename().substring(photo.getOriginalFilename().lastIndexOf("."));
            String fileName = UUID.randomUUID() + ext;
            File dest = new File(uploadPath, fileName);
            photo.transferTo(dest);

            member.setPhotoUrl("/uploads/" + fileName);
        }

        return memberRepository.save(member);
    }

    // -------------------- 수정 (사진 업로드 포함) --------------------
    public Member updateMemberWithFile(Long id, String name, String birthDate, String phone,
                                       String ageGroup, Boolean hasAttended, Boolean isGraduated,
                                       String registeredAt, MultipartFile photo, String uploadDir) throws IOException {

        Member member = getMemberById(id);

        if (name != null) member.setName(name);
        if (birthDate != null && !birthDate.isEmpty()) member.setBirthDate(LocalDate.parse(birthDate));
        if (phone != null) member.setPhone(phone);
        if (ageGroup != null) member.setAgeGroup(ageGroup);
        if (hasAttended != null) member.setHasAttendedBefore(hasAttended);
        if (isGraduated != null) member.setIsGraduated(isGraduated);
        if (registeredAt != null && !registeredAt.isEmpty()) member.setRegisteredAt(LocalDate.parse(registeredAt));

        // 사진 저장
        if (photo != null && !photo.isEmpty()) {
            File uploadPath = new File(uploadDir);
            if (!uploadPath.exists()) uploadPath.mkdirs();

            String ext = photo.getOriginalFilename().substring(photo.getOriginalFilename().lastIndexOf("."));
            String fileName = UUID.randomUUID() + ext;
            File dest = new File(uploadPath, fileName);
            photo.transferTo(dest);

            member.setPhotoUrl("/uploads/" + fileName);
        }

        return memberRepository.save(member);
    }

    // -------------------- 삭제 --------------------
    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }
}

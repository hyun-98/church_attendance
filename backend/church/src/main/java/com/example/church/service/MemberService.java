package com.example.church.service;

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

    // -------------------- 생성 (사진 포함) --------------------
    public Member createMemberWithFile(
            String name,
            String birthDate,
            String phone,
            boolean hasAttended,
            String registeredAt,
            String ageGroup,
            MultipartFile photo,
            String uploadDir
    ) throws IOException {
        Member member = new Member();
        member.setName(name);
        if (birthDate != null && !birthDate.isEmpty()) {
            member.setBirthDate(LocalDate.parse(birthDate));
        }
        member.setPhone(phone);
        member.setHasAttendedBefore(hasAttended);
        member.setRegisteredAt(
                (registeredAt != null && !registeredAt.isEmpty()) ? LocalDate.parse(registeredAt) : LocalDate.now()
        );
        member.setAgeGroup(ageGroup);

        // 사진 저장
        if (photo != null && !photo.isEmpty()) {
            String ext = photo.getOriginalFilename()
                    .substring(photo.getOriginalFilename().lastIndexOf("."));
            String fileName = UUID.randomUUID() + ext;
            File uploadPath = new File(uploadDir);
            if (!uploadPath.exists()) uploadPath.mkdirs();
            File dest = new File(uploadPath, fileName);
            photo.transferTo(dest);
            member.setPhotoUrl("/uploads/" + fileName);
        }

        return memberRepository.save(member);
    }

    // -------------------- 수정 (기존 정보 유지 + 사진 업로드 가능) --------------------
    public Member updateMemberWithFile(
            Long id,
            String name,
            String birthDate,
            String phone,
            Boolean hasAttended,
            String registeredAt,
            String ageGroup,
            MultipartFile photo,
            String uploadDir
    ) throws IOException {
        Member member = getMemberById(id);

        if (name != null) member.setName(name);
        if (birthDate != null) member.setBirthDate(LocalDate.parse(birthDate));
        if (phone != null) member.setPhone(phone);
        if (hasAttended != null) member.setHasAttendedBefore(hasAttended);
        if (registeredAt != null) member.setRegisteredAt(LocalDate.parse(registeredAt));
        if (ageGroup != null) member.setAgeGroup(ageGroup);

        // 사진 저장
        if (photo != null && !photo.isEmpty()) {
            String ext = photo.getOriginalFilename()
                    .substring(photo.getOriginalFilename().lastIndexOf("."));
            String fileName = UUID.randomUUID() + ext;
            File uploadPath = new File(uploadDir);
            if (!uploadPath.exists()) uploadPath.mkdirs();
            File dest = new File(uploadPath, fileName);
            photo.transferTo(dest);
            member.setPhotoUrl("/uploads/" + fileName);
        }

        return memberRepository.save(member);
    }

    // -------------------- 삭제 --------------------
    public void deleteMember(Long id) {
        Member member = getMemberById(id);
        memberRepository.delete(member);
    }

    // -------------------- 출석 토글 --------------------
    public Member toggleAttendance(Long id) {
        Member member = getMemberById(id);
        if (member.getIsPresent() == null) member.setIsPresent(false);
        member.setIsPresent(!member.getIsPresent());
        return memberRepository.save(member);
    }
}

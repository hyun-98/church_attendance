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

    // 전체 조회
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    // 단건 조회
    public Member getMemberById(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found"));
    }

    // -------------------- 생성 --------------------
    public Member createMemberWithFile(
            String name,
            String birthDate,
            String phone,
            String ageGroup,
            boolean hasAttended,
            String registeredAt,
            MultipartFile photo,
            String uploadDir
    ) throws IOException {
        Member member = new Member();
        member.setName(name);
        if (birthDate != null && !birthDate.isEmpty()) member.setBirthDate(LocalDate.parse(birthDate));
        member.setPhone(phone);
        member.setAgeGroup(ageGroup);
        member.setHasAttendedBefore(hasAttended);
        member.setRegisteredAt(
                (registeredAt != null && !registeredAt.isEmpty()) ? LocalDate.parse(registeredAt) : LocalDate.now()
        );

        // 사진 저장
        if (photo != null && !photo.isEmpty()) {
            member.setPhotoUrl(savePhoto(photo, uploadDir));
        }

        return memberRepository.save(member);
    }

    // -------------------- 수정 --------------------
    public Member updateMemberWithFile(
            Long id,
            String name,
            String birthDate,
            String phone,
            String ageGroup,
            Boolean hasAttended,
            String registeredAt,
            MultipartFile photo,
            String uploadDir
    ) throws IOException {
        Member member = getMemberById(id);

        if (name != null) member.setName(name);
        if (birthDate != null) member.setBirthDate(LocalDate.parse(birthDate));
        if (phone != null) member.setPhone(phone);
        if (ageGroup != null) member.setAgeGroup(ageGroup);
        if (hasAttended != null) member.setHasAttendedBefore(hasAttended);
        if (registeredAt != null) member.setRegisteredAt(LocalDate.parse(registeredAt));

        if (photo != null && !photo.isEmpty()) {
            member.setPhotoUrl(savePhoto(photo, uploadDir));
        }

        return memberRepository.save(member);
    }

    // -------------------- 삭제 --------------------
    public void deleteMember(Long id) {
        Member member = getMemberById(id);
        memberRepository.delete(member);
    }

    // -------------------- 사진 저장 공통 --------------------
    private String savePhoto(MultipartFile photo, String uploadDir) throws IOException {
        String ext = photo.getOriginalFilename().substring(photo.getOriginalFilename().lastIndexOf("."));
        String fileName = UUID.randomUUID() + ext;
        File uploadPath = new File(uploadDir);
        if (!uploadPath.exists()) uploadPath.mkdirs();
        File dest = new File(uploadPath, fileName);
        photo.transferTo(dest);
        return "/uploads/" + fileName;
    }
}

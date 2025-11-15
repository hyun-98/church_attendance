package com.example.church.controller;

import com.example.church.model.Member;
import com.example.church.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class MemberController {

    private final MemberService memberService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    // -------------------- 전체 조회 --------------------
    @GetMapping
    public List<Member> getAllMembers() {
        return memberService.getAllMembers();
    }

    // -------------------- 단건 조회 --------------------
    @GetMapping("/{id}")
    public ResponseEntity<Member> getMember(@PathVariable Long id) {
        try {
            Member member = memberService.getMemberById(id);
            return ResponseEntity.ok(member);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // -------------------- 생성 (사진 포함) --------------------
    @PostMapping
    public ResponseEntity<Member> createMember(
            @RequestParam String name,
            @RequestParam(required = false) String birthDate,
            @RequestParam(required = false) String phone,
            @RequestParam(required = false) String ageGroup,
            @RequestParam(defaultValue = "false") Boolean hasAttended,
            @RequestParam(defaultValue = "false") Boolean isGraduated,
            @RequestParam(required = false) String registeredAt,
            @RequestParam(required = false) MultipartFile photo
    ) {
        try {
            Member saved = memberService.createMemberWithFile(
                    name, birthDate, phone, ageGroup, hasAttended, isGraduated, registeredAt, photo, uploadDir
            );
            return ResponseEntity.ok(saved);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    // -------------------- 수정 (사진 포함) --------------------
    @PutMapping("/{id}")
    public ResponseEntity<Member> updateMember(
            @PathVariable Long id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String birthDate,
            @RequestParam(required = false) String phone,
            @RequestParam(required = false) String ageGroup,
            @RequestParam(required = false) Boolean hasAttended,
            @RequestParam(required = false) Boolean isGraduated,
            @RequestParam(required = false) String registeredAt,
            @RequestParam(required = false) MultipartFile photo
    ) {
        try {
            Member updated = memberService.updateMemberWithFile(
                    id, name, birthDate, phone, ageGroup, hasAttended, isGraduated, registeredAt, photo, uploadDir
            );
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    // -------------------- 삭제 --------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
        try {
            memberService.deleteMember(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

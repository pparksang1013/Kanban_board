package com.kanban.back.controller;

import com.kanban.back.dto.reponseDTO.mainpageDTO.MemberResponseDto;
import com.kanban.back.dto.requestDTO.ChangePasswordRequestDto;
import com.kanban.back.dto.requestDTO.MemberRequestDto;
import com.kanban.back.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
* api 요청이 들어오면 필터에서 access token을 복호화 해서 유저 정보를 꺼내 SecurityContext에 저장
 * SecurityContext에 저장된 유저 정보는 전역으로 사용

 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/board")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/me")
    public ResponseEntity<MemberResponseDto> getMyMemberInfo(){
        MemberResponseDto myInfoBySecurity = memberService.getMyInfoBySecurity();
        System.out.println(myInfoBySecurity.getNickname());
        return ResponseEntity.ok(myInfoBySecurity);
    }

    /*@GetMapping("board/{email}")
    public ResponseEntity<MemberResponseDto> findMemberInfo(){
        MemberResponseDto myInfoByEmail = memberService.findMemberInfoByEmail();
        return ResponseEntity.ok(myInfoByEmail);
    }*/

    @PostMapping("/nickname")
    public ResponseEntity<MemberResponseDto> setMemberNickname(@RequestBody MemberRequestDto request){
        return ResponseEntity.ok(memberService.changeMemberNickname(request.getEmail(), request.getNickname()));
    }

    /*@PostMapping("/password")
    public ResponseEntity<MemberResponseDto> setMemberPassword(@RequestBody ChangePasswordRequestDto request){
        return ResponseEntity.ok(memberService.changeMemberPassword(request.getEmail(), request.getExPassword(), request.getNewPassword() ));
    }*/
}

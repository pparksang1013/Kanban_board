package com.kanban.back.controller;

import com.kanban.back.dto.reponseDTO.mainpageDTO.MemberResponseDto;
import com.kanban.back.dto.requestDTO.MemberRequestDto;
import com.kanban.back.dto.requestDTO.TokenDto;
import com.kanban.back.dto.requestDTO.UserTableReqDTO;
import com.kanban.back.service.AuthService;
import com.kanban.back.service.CustomUserDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/board/auth")
public class AuthController {
    private final AuthService authService;
    @PostMapping("/signup")
    public ResponseEntity<MemberResponseDto> signup(@RequestBody MemberRequestDto requestDto){
        return ResponseEntity.ok(authService.signup(requestDto));
    }



    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto requestDto){
        return ResponseEntity.ok(authService.login(requestDto));
    }



}

package com.kanban.back.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * JwtFilter에서 SecurityContext에 세팅한 유저 정보를 꺼낸다
 * 유저 정보에서 MemberID만 반환하는 메소드가 정의 되어있음
 * SecurityContext는 ThreadLocal에 사용자의 정보 저장
 */
public class SecurityUtil {
    private SecurityUtil(){}
    public static Long getCurrentMemberId() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("Security Context에 인증 정보가 없습니다");
        }

        return Long.parseLong(authentication.getName());

    }
}



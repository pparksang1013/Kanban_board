package com.kanban.back.service;

import com.kanban.back.dto.requestDTO.UserTableReqDTO;
import com.kanban.back.entity.Member;
import com.kanban.back.entity.UserTable;
import com.kanban.back.repository.MemberRepository;
import com.kanban.back.repository.UserTableRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final MemberRepository memberRepository;
    // 받은 email을 통해 user가 실제로 존재하는지, 존재하지 않으면 예외
    // userdetails와 authentication의 패스워드를 비교하고 검증하는 로직 처리
    // DB에서 username을 기반으로 값을 가져오기 때문에 아이디 존재 여부도 자동으로 검증
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return memberRepository.findByEmail(username)
                .map(this::createUserDetails)
                .orElseThrow(()->new UsernameNotFoundException(username + "을 DB에서 찾을 수 없습니다."));

    }

    // DB에 User 값이 존재한다면 UserDetails 객체로 만들어서 리턴
    private UserDetails createUserDetails(Member member){
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(member.getAuthority().toString());

        return new User(
                String.valueOf(member.getId()),
                member.getPassword(),
                Collections.singleton(grantedAuthority)
        );
    }
}



package com.kanban.back.service;

import com.kanban.back.config.SecurityUtil;
import com.kanban.back.dto.reponseDTO.mainpageDTO.MemberResponseDto;
import com.kanban.back.entity.Member;
import com.kanban.back.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    //헤더에 있는 token값을 토대로 member의 data를 건내주는 메소드
    public MemberResponseDto getMyInfoBySecurity(){
        return memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .map(MemberResponseDto::of)
                .orElseThrow(()-> new RuntimeException("로그인 유저 정보가 없습니다."));
    }

    //email로 회원정보 가져오기
    public MemberResponseDto findMemberInfoByEmail(String email){
        return memberRepository.findByEmail(email)
                .map(MemberResponseDto::of)
                .orElseThrow(()-> new RuntimeException("유저 정보가 없습니다."));
    }
    //닉네임 변경
    @Transactional
    public MemberResponseDto changeMemberNickname(String email, String nickname ){
        Member member = memberRepository.findByEmail(email).orElseThrow(()->new RuntimeException("로그인 유저 정보가 없습니다"));
        member.setNickname(nickname);
        return MemberResponseDto.of(memberRepository.save(member));
    }


    //패스워드 변경 : token값을 토대로 찾아낸 member를 찾아낸 다음 제시된 예전 패스워드와 db를 비교,
    //이후 맞으면 새패스워드로 교체
    @Transactional
    public MemberResponseDto changeMemberPassword(String email, String exPassword, String newPassword  ){
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId()).orElseThrow(()->new RuntimeException("로그인 유저 정보가 없습니다"));
        if(!passwordEncoder.matches(exPassword, member.getPassword())){
            throw new RuntimeException("비밀번호가 맞지 않습니다");
        }

        member.setPassword(passwordEncoder.encode((newPassword)));
        return MemberResponseDto.of(memberRepository.save(member));
    }
}

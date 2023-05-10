package com.kanban.back.repository;

import com.kanban.back.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
// email로 member를 찾는 로직, email이 존재하는가 판별하는 로직
        Optional<Member> findByEmail(String email);
        boolean existsByEmail(String email); // 중복 가입 방지

}

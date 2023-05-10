package com.kanban.back.repository;

import com.kanban.back.entity.BoardUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardUserRepository extends JpaRepository<BoardUser, Integer> {
}

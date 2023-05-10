package com.kanban.back.repository;

import com.kanban.back.entity.Files;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FilesRepository extends JpaRepository<Files, Integer> {
}

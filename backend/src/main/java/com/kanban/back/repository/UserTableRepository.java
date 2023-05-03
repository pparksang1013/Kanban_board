package com.kanban.back.repository;

import com.kanban.back.entity.BoardUser;
import com.kanban.back.entity.UserTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserTableRepository extends JpaRepository<UserTable, String> {

}

package com.kanban.back.repository;

import com.kanban.back.entity.CardPartner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardPartnerRepository extends JpaRepository<CardPartner, Integer> {
}

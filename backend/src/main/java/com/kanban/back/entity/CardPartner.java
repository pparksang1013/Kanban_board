package com.kanban.back.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kanban.back.dto.reponseDTO.detailpageDTO.CardPartnerDetailDTO;
import com.kanban.back.dto.reponseDTO.mainpageDTO.CardPartnerMainDTO;
import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "card_partner")
@Getter
@Builder
public class CardPartner {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "b_id", referencedColumnName = "b_id")
    @JsonIgnore
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "c_id", referencedColumnName = "c_id")
    @JsonIgnore
    private Card card;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "u_id", referencedColumnName = "u_id")
    @JsonIgnore
    private UserTable userTable;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer partner_id;

    public CardPartnerMainDTO toMainDTO(){
        return CardPartnerMainDTO.builder()
                .board(board)
                .card(card)
                .userTable(userTable)
                .partner_id(partner_id)
                .build();
    }
    public CardPartnerDetailDTO toDetailDTO(){
        return CardPartnerDetailDTO.builder()
                .userTable(userTable.toDetailDTO())
                .partner_id(partner_id)
                .build();
    }
}
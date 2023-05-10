package com.kanban.back.dto.requestDTO;

import com.kanban.back.entity.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CardPartnerReqDTO {
    private Board board;
    private Card card;
    private UserTable userTable;
    private Integer partner_id;

    public CardPartner toEntity(){
        return CardPartner.builder()
                .board(board)
                .card(card)
                .userTable(userTable)
                .partner_id(partner_id)
                .build();
    }

}

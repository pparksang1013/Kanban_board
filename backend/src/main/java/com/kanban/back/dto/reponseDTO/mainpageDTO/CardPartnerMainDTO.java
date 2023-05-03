package com.kanban.back.dto.reponseDTO.mainpageDTO;

import com.kanban.back.entity.Board;
import com.kanban.back.entity.Card;
import com.kanban.back.entity.UserTable;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CardPartnerMainDTO {
    private Board board;
    private Card card;
    private UserTable userTable;
    private Integer partner_id;


}

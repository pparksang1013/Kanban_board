package com.kanban.back.dto.reponseDTO.detailpageDTO;

import com.kanban.back.entity.Board;
import com.kanban.back.entity.Card;
import com.kanban.back.entity.UserTable;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CardPartnerDetailDTO {
    private UserTableDetailDTO userTable;
    private Integer partner_id;
}

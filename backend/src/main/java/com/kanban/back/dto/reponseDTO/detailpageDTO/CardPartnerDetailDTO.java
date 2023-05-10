package com.kanban.back.dto.reponseDTO.detailpageDTO;

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

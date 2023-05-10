package com.kanban.back.dto.reponseDTO.mainpageDTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CardPartnerMainDTO {
    private UserTableMainDTO userTable;
    private Integer partner_id;


}

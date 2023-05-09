package com.kanban.back.dto.reponseDTO.mainpageDTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class BoardUserMainDTO {
    private BoardMainDTO board;
    private UserTableMainDTO userTable;
    private Integer board_user_id;
}

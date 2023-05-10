package com.kanban.back.dto.reponseDTO.mainpageDTO;

import com.kanban.back.entity.Board;
import com.kanban.back.entity.UserTable;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class BoardUserMainDTO {
    private Board board;
    private UserTable userTable;
    private Integer board_user_id;
}

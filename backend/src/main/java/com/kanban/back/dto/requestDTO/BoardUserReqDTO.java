package com.kanban.back.dto.requestDTO;

import com.kanban.back.entity.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class BoardUserReqDTO {
    private Board board;
    private UserTable userTable;
    private Integer board_user_id;

    public BoardUser toEntity(){
        return BoardUser.builder()
                .board(board)
                .userTable(userTable)
                .board_user_id(board_user_id)
                .build();
    }
}

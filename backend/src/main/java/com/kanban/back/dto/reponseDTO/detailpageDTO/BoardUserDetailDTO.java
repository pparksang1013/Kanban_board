package com.kanban.back.dto.reponseDTO.detailpageDTO;

import com.kanban.back.entity.Board;
import com.kanban.back.entity.UserTable;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class BoardUserDetailDTO {
    private UserTableDetailDTO userTable;
    private Integer board_user_id;
}

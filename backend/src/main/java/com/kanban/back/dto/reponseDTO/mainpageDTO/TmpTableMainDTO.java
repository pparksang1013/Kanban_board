package com.kanban.back.dto.reponseDTO.mainpageDTO;

import com.kanban.back.entity.Card;
import com.kanban.back.entity.UserTable;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class TmpTableMainDTO {
    private Card card;
    private UserTable userTable;
    private String commit_status;
    private Integer tmp_id;

}

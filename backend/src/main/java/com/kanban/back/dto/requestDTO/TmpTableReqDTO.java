package com.kanban.back.dto.requestDTO;

import com.kanban.back.entity.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class TmpTableReqDTO {
    private Card card;
    private UserTable userTable;
    private String commit_status;
    private Integer tmp_id;

    public TmpTable toEntity(){
        return TmpTable.builder()
                .card(card)
                .userTable(userTable)
                .commit_status(commit_status)
                .tmp_id(tmp_id)
                .build();
    }
}

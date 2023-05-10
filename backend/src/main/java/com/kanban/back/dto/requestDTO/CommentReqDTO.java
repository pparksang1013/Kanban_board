package com.kanban.back.dto.requestDTO;

import com.kanban.back.entity.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class CommentReqDTO {
    private Card card;
    private UserTable userTable;
    private String del_yn;
    private Integer comment_id;
    private String comment_contents;

    public Comment toEntity(){
        return Comment.builder()
                .card(card)
                .userTable(userTable)
                .del_yn(del_yn)
                .comment_id(comment_id)
                .comment_contents(comment_contents)
                .build();
    }

}

package com.kanban.back.dto.reponseDTO.mainpageDTO;

import com.kanban.back.entity.Card;
import com.kanban.back.entity.UserTable;
import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class CommentMainDTO {
    private Card card;
    private UserTable userTable;
    private String del_yn;
    private Integer comment_id;
    private LocalDateTime comment_date;
    private String comment_contents;


}

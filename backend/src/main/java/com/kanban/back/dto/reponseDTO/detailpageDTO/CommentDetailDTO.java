package com.kanban.back.dto.reponseDTO.detailpageDTO;

import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class CommentDetailDTO {
    private UserTableDetailDTO userTable;
    private Integer comment_id;
    private LocalDateTime comment_date;
    private String comment_contents;

}
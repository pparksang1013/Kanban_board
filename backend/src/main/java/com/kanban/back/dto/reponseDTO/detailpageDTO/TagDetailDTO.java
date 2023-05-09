package com.kanban.back.dto.reponseDTO.detailpageDTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class TagDetailDTO {
    private Integer tag_id;
    private String tag_name;
    private Integer tag_color;

}

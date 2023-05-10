package com.kanban.back.dto.requestDTO;

import com.kanban.back.entity.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class TagReqDTO {
    private Card card;
    private Integer tag_id;
    private String tag_name;
    private Integer tag_color;

    public Tag toEntity(){
        return Tag.builder()
                .card(card)
                .tag_id(tag_id)
                .tag_name(tag_name)
                .tag_color(tag_color)
                .build();
    }
}

package com.kanban.back.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kanban.back.dto.reponseDTO.detailpageDTO.TagDetailDTO;
import com.kanban.back.dto.reponseDTO.mainpageDTO.TagMainDTO;
import com.kanban.back.dto.requestDTO.TagReqDTO;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tag")
@Getter
@Builder
public class Tag {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "c_id", referencedColumnName = "c_id")
    @JsonIgnore
    private Card card;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer tag_id;
    private String tag_name;
    private Integer tag_color;

    public TagMainDTO toMainDTO(){
        return TagMainDTO.builder()
                .card(card)
                .tag_id(tag_id)
                .tag_name(tag_name)
                .tag_color(tag_color)
                .build();
    }
    public TagDetailDTO toDetailDTO(){
        return TagDetailDTO.builder()
                .tag_id(tag_id)
                .tag_name(tag_name)
                .tag_color(tag_color)
                .build();
    }

    public void update(TagReqDTO tagReqDTO){
        if(tagReqDTO.getTag_name() != null) this.tag_name = tagReqDTO.getTag_name();
        if(tagReqDTO.getTag_color() != null) this.tag_color = tagReqDTO.getTag_color();
    }
}

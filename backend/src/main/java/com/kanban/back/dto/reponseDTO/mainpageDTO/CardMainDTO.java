package com.kanban.back.dto.reponseDTO.mainpageDTO;

import com.kanban.back.entity.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CardMainDTO {
    private String c_title;
    private Board board;
    private Integer c_position;
    private LocalDateTime c_create_date;
    private String c_creator;
    private Integer c_id;
    private Task task;
    private String c_upd_p;
    private String c_del_p;
    private LocalDateTime c_upd_date;
    private String c_description;
    private String c_del_yn;
    private List<CardPartnerMainDTO> cardPartners;
    private List<CommentMainDTO> comments;
    private List<TagMainDTO> tags;
    private List<TmpTableMainDTO> tmpTables;

}

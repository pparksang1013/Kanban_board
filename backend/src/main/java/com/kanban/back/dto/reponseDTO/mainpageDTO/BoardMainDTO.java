package com.kanban.back.dto.reponseDTO.mainpageDTO;

import com.kanban.back.entity.CardPartner;
import com.kanban.back.entity.BoardUser;
import com.kanban.back.entity.Task;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class BoardMainDTO {
    private String b_name;
    private String b_goal;
    private Integer b_id;
    private LocalDateTime b_create_date;
    private LocalDateTime b_upd_date;
    private String b_creator;
    private String b_del_yn;
    private String b_admin;
    private List<Task> tasks;
    private List<CardPartner> cardPartners;
    private List<BoardUser> boardUsers;
    private List<String> joinUsers;

}

package com.kanban.back.dto.reponseDTO.mainpageDTO;

import com.kanban.back.entity.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserTableMainDTO {
    private LocalDateTime u_date_join;
    private String u_name;
    private String u_email;
    private String u_id;
    private List<CardPartner> cardPartners;
    private List<Comment> comments;
    private List<TmpTable> tmpTables;
    private List<BoardUser> boardUsers;
}

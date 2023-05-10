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
    private List<CardPartnerMainDTO> cardPartners;
    private List<CommentMainDTO> comments;
    private List<TmpTableMainDTO> tmpTables;
    private List<BoardUserMainDTO> boardUsers;
}

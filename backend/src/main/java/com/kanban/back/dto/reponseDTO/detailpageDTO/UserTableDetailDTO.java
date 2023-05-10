package com.kanban.back.dto.reponseDTO.detailpageDTO;

import com.kanban.back.entity.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserTableDetailDTO {
    private String u_name;
    private String u_email;
    private String u_id;
}

package com.kanban.back.dto.reponseDTO.mainpageDTO;


import lombok.*;

import java.time.LocalDateTime;

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
}

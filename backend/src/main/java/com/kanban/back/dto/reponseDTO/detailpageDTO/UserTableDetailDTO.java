package com.kanban.back.dto.reponseDTO.detailpageDTO;

import lombok.*;


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

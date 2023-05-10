package com.kanban.back.dto.reponseDTO.joinpageDTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserTableJoinDTO {
    private String u_name;
    private String u_email;
    private String u_password;

}

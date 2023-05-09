package com.kanban.back.dto.reponseDTO.mainpageDTO;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class TmpTableMainDTO {
    private UserTableMainDTO userTable;
    private String commit_status;
    private Integer tmp_id;

}

package com.kanban.back.dto.requestDTO;


import com.kanban.back.entity.Files;

import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class FilesReqDTO {
    private Integer file_id;
    private String file_name;
    private String file_path;
    private String file_ext;
    private Long file_size;
    private CardReqDTO cardReqDTO;

    public Files toEntity(){
        return Files.builder()
                .file_id(file_id)
                .file_name(file_name)
                .file_path(file_path)
                .file_ext(file_ext)
                .file_size(file_size)
                .card(cardReqDTO.toEntity())
                .build();
    }
}

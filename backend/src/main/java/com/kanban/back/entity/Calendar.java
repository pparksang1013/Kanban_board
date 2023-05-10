package com.kanban.back.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="calendar")
@Getter
@Builder
@ToString
public class Calendar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cal_id;
    private String cal_content;
    private String del_yn;
    private LocalDateTime cal_date;
    private String writer;

}

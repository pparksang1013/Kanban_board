package com.kanban.back.entity;


import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="calendar")
@Getter
@Builder
@ToString
public class calendar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cal_id;
    private String cal_content;
    private String del_yn;
    private LocalDateTime cal_date;
    private String writer;

}

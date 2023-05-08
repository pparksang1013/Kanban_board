package com.kanban.back.entity;

import com.kanban.back.dto.reponseDTO.mainpageDTO.BoardMainDTO;
import com.kanban.back.dto.requestDTO.BoardReqDTO;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="board")
@Getter
@Builder
@ToString
@EntityListeners(AuditingEntityListener.class)
public class Board {
    private String b_name;
    private String b_goal;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer b_id;
    @CreatedDate
    private LocalDateTime b_create_date;
    @LastModifiedDate
    private LocalDateTime b_upd_date;
    private String b_creator;
    private String b_del_yn;
    private String b_admin;


    @OneToMany(mappedBy = "board", cascade = CascadeType.REMOVE) // cascade = CascadeType.REMOVE
    private List<Task> tasks;


    @OneToMany(mappedBy = "board", cascade = CascadeType.REMOVE)
    private List<CardPartner> cardPartners;

    @OneToMany(mappedBy = "board", cascade = CascadeType.REMOVE)
    private List<BoardUser> boardUsers;

    @PrePersist
    public void prePersist() {
        this.b_del_yn = this.b_del_yn == null ? "no" : this.b_del_yn;
    }

    public BoardMainDTO toMainDTO(){
        return BoardMainDTO.builder()
                .b_name(b_name)
                .b_goal(b_goal)
                .b_id(b_id)
                .b_create_date(b_create_date)
                .b_upd_date(b_upd_date)
                .b_creator(b_creator)
                .b_del_yn(b_del_yn)
                .b_admin(b_admin)
                .tasks(tasks.stream().map(s->s.toMainDTO()).toList())
                .cardPartners(cardPartners.stream().map(s-> s.toMainDTO()).toList())
                .build();
    }

    public void update(BoardReqDTO boardReqDTO){
        if(boardReqDTO.getB_name() != null) this.b_name = boardReqDTO.getB_name();
        if(boardReqDTO.getB_goal() != null) this.b_goal = boardReqDTO.getB_goal();
        if(boardReqDTO.getB_del_yn() != null) this.b_del_yn = boardReqDTO.getB_del_yn();
        if(boardReqDTO.getB_admin() != null) this.b_admin = boardReqDTO.getB_admin();
    }


}

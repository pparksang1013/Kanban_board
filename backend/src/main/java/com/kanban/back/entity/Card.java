package com.kanban.back.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kanban.back.dto.reponseDTO.detailpageDTO.CardDetailDTO;
import com.kanban.back.dto.reponseDTO.mainpageDTO.CardMainDTO;
import com.kanban.back.dto.requestDTO.CardReqDTO;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "card")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Card {
    private String c_title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "b_id", referencedColumnName = "b_id")
//            @JoinColumn(name = "b_admin", referencedColumnName = "b_admin")
    })
    @JsonIgnore
    private Board board;

    private Integer c_position;
    @CreatedDate
    private LocalDateTime c_create_date;
    private String c_creator;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer c_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "t_id", referencedColumnName = "t_id")
    @JsonIgnore
    private Task task;

    private String c_upd_p;
    private String c_del_p;
    @LastModifiedDate
    private LocalDateTime c_upd_date;
    private String c_description;
    private String c_del_yn;

    @OneToMany(mappedBy = "card", cascade = CascadeType.REMOVE)
    private List<CardPartner> cardPartners;
    @OneToMany(mappedBy = "card", cascade = CascadeType.REMOVE)
    private List<Comment> comments;
    @OneToMany(mappedBy = "card", cascade = CascadeType.REMOVE)
    private List<Tag> tags;
    @OneToMany(mappedBy = "card", cascade = CascadeType.REMOVE)
    private List<TmpTable> tmpTables;
    private LocalDate c_start_date;
    private LocalDate c_end_date;

    @PrePersist
    public void prePersist() {
        this.c_del_yn = this.c_del_yn == null ? "no" : this.c_del_yn;
    }
    public CardMainDTO toMainDTO(){
        return CardMainDTO.builder()
                .c_title(c_title)
                .board(board)
                .c_position(c_position)
                .c_create_date(c_create_date)
                .c_creator(c_creator)
                .c_id(c_id)
                .task(task)
                .c_upd_p(c_upd_p)
                .c_del_p(c_del_p)
                .c_upd_date(c_upd_date)
                .c_description(c_description)
                .c_del_yn(c_del_yn)
                .cardPartners(cardPartners.stream().map(s-> s.toMainDTO()).toList())
                .comments(comments.stream().map(s-> s.toMainDTO()).toList())
                .tags(tags.stream().map(s-> s.toMainDTO()).toList())
                .tmpTables(tmpTables.stream().map(s-> s.toMainDTO()).toList())
                .build();
    }
    public CardDetailDTO toDetailDTO(){
        return CardDetailDTO.builder()
                .c_id(c_id)
                .c_description(c_description)
                .cardPartners(cardPartners.stream().map(s->s.toDetailDTO()).toList())
                .comments(comments.stream().map(s->s.toDetailDTO()).toList())
                .tags(tags.stream().map(s->s.toDetailDTO()).toList())
                .c_start_date(c_start_date)
                .c_end_date(c_end_date)
                .build();
    }

    public void update(CardReqDTO cardReqDTO){
        if(cardReqDTO.getC_title() != null) this.c_title = cardReqDTO.getC_title();
        if(cardReqDTO.getC_position() != null) this.c_position = cardReqDTO.getC_position();
        if(cardReqDTO.getC_upd_p() != null) this.c_upd_p = cardReqDTO.getC_upd_p();
        if(cardReqDTO.getC_del_p() != null) this.c_del_p = cardReqDTO.getC_del_p();
        if(cardReqDTO.getC_description() != null) this.c_description = cardReqDTO.getC_description();
        if(cardReqDTO.getC_del_yn() != null) this.c_del_yn = cardReqDTO.getC_del_yn();
    }


}

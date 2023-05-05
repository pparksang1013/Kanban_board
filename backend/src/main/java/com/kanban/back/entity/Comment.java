package com.kanban.back.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kanban.back.dto.reponseDTO.detailpageDTO.CommentDetailDTO;
import com.kanban.back.dto.reponseDTO.mainpageDTO.CommentMainDTO;
import com.kanban.back.dto.requestDTO.CommentReqDTO;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "comment")
@Getter
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Comment {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "c_id", referencedColumnName = "c_id")
    @JsonIgnore
    private Card card;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "u_id", referencedColumnName = "u_id")
    @JsonIgnore
    private UserTable userTable;

    private String del_yn;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer comment_id;
    @LastModifiedDate
    private LocalDateTime comment_date;
    private String comment_contents;

    @PrePersist
    public void prePersist() {
        this.del_yn = this.del_yn == null ? "no" : this.del_yn;
    }
    public CommentMainDTO toMainDTO(){
        return CommentMainDTO.builder()
                .card(card)
                .userTable(userTable)
                .del_yn(del_yn)
                .comment_id(comment_id)
                .comment_date(comment_date)
                .comment_contents(comment_contents)
                .build();
    }

    public CommentDetailDTO toDetailDTO(){
        return CommentDetailDTO.builder()
                .userTable(userTable.toDetailDTO())
                .comment_id(comment_id)
                .comment_date(comment_date)
                .comment_contents(comment_contents)
                .build();
    }
    public void update(CommentReqDTO commentReqDTO){
        if(commentReqDTO.getDel_yn() != null) this.del_yn = commentReqDTO.getDel_yn();
        if(commentReqDTO.getComment_contents() != null) this.comment_contents = commentReqDTO.getComment_contents();
    }


}

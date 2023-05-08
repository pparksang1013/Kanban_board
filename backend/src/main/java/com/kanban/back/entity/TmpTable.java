package com.kanban.back.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kanban.back.dto.reponseDTO.mainpageDTO.TmpTableMainDTO;
import com.kanban.back.dto.requestDTO.TmpTableReqDTO;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tmp_table")
@Getter
@Builder
public class TmpTable {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "c_id", referencedColumnName = "c_id")
    @JsonIgnore
    private Card card;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "u_id", referencedColumnName = "u_id")
    @JsonIgnore
    private UserTable userTable;

    private String commit_status;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer tmp_id;

    public TmpTableMainDTO toMainDTO(){
        return TmpTableMainDTO.builder()
                .userTable(userTable.toMainDTO())
                .commit_status(commit_status)
                .tmp_id(tmp_id)
                .build();
    }
    public void update(TmpTableReqDTO tmpTableReqDTO){
        if(tmpTableReqDTO.getCommit_status() != null) this.commit_status = tmpTableReqDTO.getCommit_status();
    }

}

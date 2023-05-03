package com.kanban.back.controller;

import com.kanban.back.BackApplication;
import com.kanban.back.dto.reponseDTO.mainpageDTO.BoardMainDTO;
import com.kanban.back.dto.reponseDTO.mainpageDTO.CardMainDTO;
import com.kanban.back.dto.requestDTO.BoardReqDTO;
import com.kanban.back.dto.requestDTO.CardReqDTO;
import com.kanban.back.dto.requestDTO.TaskReqDTO;
import com.kanban.back.entity.BoardUser;
import com.kanban.back.entity.Card;
import com.kanban.back.service.MainPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
public class MainPageController {
    MainPageService mainPageService;
    @Autowired
    MainPageController(MainPageService mainPageService){ this.mainPageService = mainPageService;}

    @GetMapping("board/{u_id}")
    public BoardMainDTO getBoard(@PathVariable String u_id){

        BoardMainDTO boardMainDTO =  mainPageService.getBoard(u_id);
        List<String> joinUsers = new ArrayList<>();

        for(BoardUser boardUser :boardMainDTO.getBoardUsers()){
            joinUsers.add(boardUser.getUserTable().getU_id());
        }

        boardMainDTO.setJoinUsers(joinUsers);
        return boardMainDTO;
    }

    @PutMapping("board")
    public void updateBoard(@RequestBody BoardReqDTO boardReqDTO){
        mainPageService.updateBoard(boardReqDTO);
    }

    @PostMapping("board")
    public void saveBoard(@RequestBody BoardReqDTO boardReqDTO){
        mainPageService.saveBoard(boardReqDTO);
    }

    @PostMapping("task")
    public void updateTask(@RequestBody TaskReqDTO taskReqDTO){
        mainPageService.updateTask(taskReqDTO);}

    @PostMapping("card")
    public void updateCard(@RequestBody CardReqDTO cardReqDTO){
        mainPageService.updateCard(cardReqDTO);
    }
}
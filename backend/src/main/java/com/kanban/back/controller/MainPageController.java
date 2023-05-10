package com.kanban.back.controller;

import com.kanban.back.dto.reponseDTO.mainpageDTO.BoardMainDTO;
import com.kanban.back.dto.requestDTO.BoardReqDTO;
import com.kanban.back.dto.requestDTO.CardReqDTO;
import com.kanban.back.dto.requestDTO.TaskReqDTO;
import com.kanban.back.service.MainPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MainPageController {
    MainPageService mainPageService;
    @Autowired
    MainPageController(MainPageService mainPageService){ this.mainPageService = mainPageService;}
    @PostMapping("board")
    public void createBoard(@RequestBody BoardReqDTO boardReqDTO){
        mainPageService.createBoard(boardReqDTO);
    }
    @GetMapping("board/{u_id}")
    public BoardMainDTO getBoard(@PathVariable String u_id){
        return mainPageService.getBoard(u_id);
    }
    @PutMapping("board")
    public void updateBoard(@RequestBody BoardReqDTO boardReqDTO){
        mainPageService.updateBoard(boardReqDTO);
    }
    @DeleteMapping("board/{b_id}")
    public void deleteBoard(@PathVariable Integer b_id) { mainPageService.deleteBoard(b_id); }
    @PostMapping("task")
    public void createTask(@RequestBody TaskReqDTO taskReqDTO){
        mainPageService.createTask(taskReqDTO);
    }
    @PutMapping("task")
    public void updateTask(@RequestBody TaskReqDTO taskReqDTO){mainPageService.updateTask(taskReqDTO);}
    @DeleteMapping("task/{t_id}")
    public void deleteTask(@PathVariable Integer t_id){
        mainPageService.deleteTask(t_id);
    }
    @PostMapping("card")
    public void createCard(@RequestBody CardReqDTO cardReqDTO){
        mainPageService.createCard(cardReqDTO);
    }
    @PutMapping("card")
    public void updateCard(@RequestBody CardReqDTO cardReqDTO){
        mainPageService.updateCard(cardReqDTO);
    }
    @DeleteMapping("card/{c_id}")
    public void deleteCard(@PathVariable Integer c_id){
        mainPageService.deleteCard(c_id);
    }
}
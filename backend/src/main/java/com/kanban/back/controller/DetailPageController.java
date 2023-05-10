package com.kanban.back.controller;

import com.kanban.back.dto.reponseDTO.detailpageDTO.CardDetailDTO;
import com.kanban.back.service.DetailPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class DetailPageController {
    DetailPageService detailPageService;
    @Autowired
    DetailPageController(DetailPageService detailPageService){
        this.detailPageService = detailPageService;
    }

    @GetMapping("detail/{c_id}")
    public CardDetailDTO getCardDetail(@PathVariable Integer c_id){
        CardDetailDTO cardDetailDTO = detailPageService.getCardDetail(c_id);
        System.out.println(cardDetailDTO.getC_start_date());
        System.out.println(cardDetailDTO.getC_end_date());
        return cardDetailDTO;
    }

}
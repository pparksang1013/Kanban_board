package com.kanban.back.service;

import com.kanban.back.dto.reponseDTO.detailpageDTO.CardDetailDTO;
import com.kanban.back.dto.requestDTO.CardPartnerReqDTO;
import com.kanban.back.entity.Card;
import com.kanban.back.entity.CardPartner;
import com.kanban.back.repository.CardPartnerRepository;
import com.kanban.back.repository.CardRepository;
import com.kanban.back.repository.TagRepository;
import jakarta.persistence.Access;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;

@Service
public class DetailPageService {
    CardRepository cardRepository;
    TagRepository tagRepository;
    CardPartnerRepository cardPartnerRepository;
    @Autowired
    DetailPageService(CardRepository cardRepository, TagRepository tagRepository, CardPartnerRepository cardPartnerRepository){
        this.cardRepository = cardRepository;
        this.tagRepository = tagRepository;
        this.cardPartnerRepository = cardPartnerRepository;
    }
    public CardDetailDTO getCardDetail(Integer c_id){
        Card card = cardRepository.getById(c_id);
        // d_day 추가 코드
        long d_day = ChronoUnit.DAYS.between(card.getC_start_date(),card.getC_end_date());
        CardDetailDTO cardDetailDTO = card.toDetailDTO();
        cardDetailDTO.setD_day(d_day);
        return cardDetailDTO;
    }
}

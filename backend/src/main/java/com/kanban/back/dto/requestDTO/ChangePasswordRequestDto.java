package com.kanban.back.dto.requestDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordRequestDto {

    private String email;
    private String exPassword;
    private String newPassword;
}

//비밀번호 수정할 때 쓰이는 dto. 이전의 비밀번호가 제대로 입력되지 않으면 실행되지 않음

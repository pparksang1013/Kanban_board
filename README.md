# Design ☄️

## Font

-   영문폰트
    `font-family: 'Poppins', sans-serif;`

-   한글폰트
    `font-family: ‘SUIT’, sans-serif;`

-   Mix
    `font-family: 'Poppins', ‘SUIT’, sans-serif;`

## Color

-   Main color: #3cb371;
-   Main color rgba : (60, 179, 113);
-   darker main color : #0D8541;
-   daraker main color rgba : (13, 133, 65, 1);
-   brighter main color : #90E0B3;
-   brighter main color rgba : (144, 224, 179, 1);
-   neon green : #10E56D (16, 229, 109, 1);
-   red : #FB7754 (251, 119, 84, 1);
-   orange : #FBAD54 (251, 173, 84, 1);
-   blue : #3a7e9f (58, 126, 159, 1);
-   black: 404040;

# Code rule

## Commit message Rule

1. 제목 첫글자는 대문자
2. 제목 끝에 . 금지
3. 뭐더라


### git type

-   add: 코드 추가, 문서 추가 등등
-   remove: 코드 삭제, 문서 삭제 등
-   feat : 새로운 기능 추가, 기존의 기능을 요구 사항에 맞추어 수정
-   fix : 버그 수정
-   docs : 문서(주석) 수정
-   build : 빌드 관련 수정
-   ci : CI 관련 설정 수정
-   refactor : 기능의 변화가 아닌 코드 리팩터링 ex) 변수 이름 변경
-   style : 코드 스타일, 포맷팅에 대한 수정
-   test : 테스트 코드 추가/수정
-   release : 버전 릴리즈
-   build: changes that affect the build system or external dependencies

### commit tmeplate

```

# Git commit message template

<type> [optional scople] : <title>

[optional body]

[optional footer]

################

-   add: 코드 추가, 문서 추가 등등
-   remove: 코드 삭제, 문서 삭제 등
-   feat : 새로운 기능 추가, 기존의 기능을 요구 사항에 맞추어 수정
-   fix : 버그 수정
-   docs : 문서(주석) 수정
-   build : 빌드 관련 수정
-   ci : CI 관련 설정 수정
-   refactor : 기능의 변화가 아닌 코드 리팩터링 ex) 변수 이름 변경
-   style : 코드 스타일, 포맷팅에 대한 수정
-   test : 테스트 코드 추가/수정
-   release : 버전 릴리즈
-   build: changes that affect the build system or external dependencies

```

### Empty commit message

`git commit --allow-empty -m "{커밋메시지}"`

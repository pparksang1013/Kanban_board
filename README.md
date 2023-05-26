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

# Code convention

## Commit message Rule

1. 제목 첫글자는 대문자
2. 제목 끝에 . 금지

## git type

-   👾ADD 코드 추가, 문서 추가 등등
-   🙀REMOVE 코드 삭제, 문서 삭제 등
-   😎FEAT 새로운 기능 추가, 기존의 기능을 요구 사항에 맞추어 수정
-   🐳FIX 버그 수정
-   📄DOCS 문서(주석), README 수정
-   🥑REFACTOR 기능의 변화가 아닌 코드 리팩터링, 변수 이름 변경, 디렉터리 변경, 경로변경
-   🌊DESIGN UI 디자인, CSS 관련 코드
-   🦭MERGE git hub merge
-   🙊TODO 해야하는데 아직 못한 것들

# Directory

## Frontend

📦 src
├── 📂 api // Axios 관련 directory
├── 📂 component // 기능 관련 directory
├── 📂 router // Routre 관련 directory
├── 📂 hooks // custom hooks 관련 directory  
└── 📂 style // Style 관련 directory

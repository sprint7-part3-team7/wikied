# 위키드
### 배포 URL: https://wikied-7.vercel.app/
### 테스트 아이디 및 패스워드
| 테스트 아이디        | 테스트 패스워드                               |
|--------------|------------------------------------------|
| wikiedTest@test.com       | test123!@#  |

## 목차
1. 프로젝트 소개
2. 팀원 구성 및 역할 분담
3. 개발 기간 및 작업 관리
4. 개발 환경
5. 채택한 개발 기술과 브랜치 전략
6. 프로젝트 구조
7. 페이지 별 기능

## 1. 프로젝트 소개
남들이 만드는 나만의 위키. 지인들의 위키를 직접 작성하고 공유할 수 있어요.

## 2. 팀원 구성
| 이름         | 깃허브 링크                               |
|--------------|------------------------------------------|
| 강효성       | [GitHub](https://github.com/yongb2n)  |
| 고용빈       | [GitHub](https://github.com/yongb2n)|
| 정유승       | [GitHub](https://github.com/yongb2n)  |
| 최예원       | [GitHub](https://github.com/yongb2n) |
| 하유리       | [GitHub](https://github.com.yongb2n)|


## 3. 개발 기간 및 작업 관리
2024.07.29 ~ 2024.08.16

## 4. 개발 환경
- Front-end: React, Next.js(pages router), TypeScript
- 버전 및 이슈 관리: GitHub
- 협업 툴: Discord, Notion
- 서비스 배포 환경: Vercel
- 디자인: Figma
- 커밋 컨벤션
  - 한 커밋에는 1가지 문제만 포함
  - 커밋은 최대한 세분화해서 작업 별로 구분
- 코드 컨벤션
  - ESLint
     ```
    "env": {
      "browser": true,
      "node": true,
      "es6": true
    },
    "extends": [
      "airbnb",
      "airbnb-typescript",
      "airbnb/hooks",
      "next/core-web-vitals",
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:prettier/recommended",
      "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module",
      "project": "./tsconfig.json"
    },
    "plugins": ["@typescript-eslint", "react", "prettier"],
    "ignorePatterns": ["node_modules/"],
    "rules": {
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": ["warn", { "extensions": [".ts", ".tsx"] }],
      "no-useless-catch": "off",
      "@typescript-eslint/camelcase": "off",
      "no-console": "error",
      "react/function-component-definition": [
        2, 
        {
          "namedComponents": ["function-declaration", "function-expression"],
          "unnamedComponents": ["function-declaration", "function-expression"]
        }
      ]
    }
    ```
 - Prettier
     ```
    {
      "tabWidth": 2,
      "semi": true,
      "singleQuote": true,
      "bracketSpacing": true,
      "trailingComma": "all",
      "arrowParens": "always"
    }
    ```
 
## 5. 채택한 개발 기술과 브랜치 전략
### 채택한 개발 기술
1. Next.js
Pages Router와 Dynamic Routes를 통해 페이지 이동을 간편하게 처리하고, Vercel로 쉽고 빠르게 배포하기 위해 사용
2. SCSS
중첩, 변수, 믹스인 등의 기능을 통해 코드의 재활용성과 가독성을 향상시켜 개발 효율을 높이기 위해 사용
3. TypeScript
프로그램 실행 전 타입 검사를 통해 코드 안정성을 높이고, 자동 완성 등의 기능을 통해 빠르고 정확하게 코드를 작성하기 위해 사용
4. ESLint, Prettier
코드의 가독성, 일관성, 품질 향상을 위해 ESLint, Prettier를 함께 사용
  - ESLint: 잠재적인 오류 등을 사전에 발견하여 코드 품질을 높이고, 디버깅 시간을 줄이기 위해 도입
    - airbnb의 코딩 컨벤션 참고하였고, 이 외 규칙은 ESLint 플러그인 규칙을 사용
  - Prettier: 자동 포맷팅을 통해 일관된 코드 스타일을 유지하기 위해 도입

### 브랜치 전략
- Git-flow 전략에 따라 main, develop 브랜치와 보조로 feature 브랜치 사용
- 작업 흐름
  
  feature 브랜치 생성 및 작업
    - 새로운 기능이나 작업 시, 고유번호를 포함한 feature 브랜치에서 작업을 진행하며, 완료 후 PR 작성
    - 예: feature/4-editor
        
  develop 브랜치에 merge 후 동기화
     - PR 승인 후 feature 브랜치를 develop 브랜치에 merge함으로써 개발 버전 관리
     - merge 후 feature 브랜치 삭제
       
  main 브랜치
  - 배포 버전 관리

## 6. 프로젝트 구조
```
📦root
┣ 📂assets
┃ ┣ 📂icons
┃ ┗ 📂images
┣ 📂components
┃ ┣ 📂boards
┃ ┣ 📂common
┃ ┣ 📂mypage
┃ ┣ 📂wiki
┃ ┗ 📂wikilist
┣ 📂contexts
┃ ┗ 📜AuthProvider.tsx
┣ 📂hooks
┃ ┣ 📂useCode
┃ ┗ 📂useDebounce
┣ 📂pages
┃ ┣ 📜_app.tsx
┃ ┣ 📜_document.tsx
┃ ┣ 📂addboard
┃ ┣ 📂boards
┃ ┣ 📜index.tsx
┃ ┣ 📂landing
┃ ┣ 📂login
┃ ┣ 📂mypage
┃ ┣ 📂signup
┃ ┣ 📂wiki
┃ ┗ 📂wikilist
┣ 📂public
┃ ┣ 📜favicon.ico
┃ ┣ 📜next.svg
┃ ┗ 📜vercel.svg
┣ 📂services
┃ ┗ 📂api
┣ 📂styles
┃ ┣ 📜_color.scss
┃ ┣ 📜_common.scss
┃ ┣ 📜_font.scss
┃ ┣ 📜globals.scss
┃ ┗ 📜index.scss
┣ 📜pull_request_template.md
┣ 📜test.http
┣ 📜tsconfig.json
┗ 📂types
┣ 📜article.ts
┣ 📜auth.ts
┣ 📜authUtils.ts
┗ 📜profile.ts
```

## 7. 페이지 별 기능
### 로그인 & 회원가입

로그인|회원가입
|----|----|
|<img width="200" height="300" alt="스크린샷 2024-10-26 오후 5 51 30" src="https://github.com/user-attachments/assets/89ed031b-2861-4d75-ac73-5b5c8dd89dbb">|<img width="200" height="300" alt="스크린샷 2024-10-26 오후 5 52 55" src="https://github.com/user-attachments/assets/5dbf5aab-d2d8-4e42-9e07-929d5c2f6051">
- 로그인시 토큰을 로컬 스토리지에 저장해 새로고침 시에도 인증 상태를 유지하고, Context API를 사용해 인증 정보를 전역에서 관리
- 유효성 검사
  
### 계정 설정
계정설정
|----|
|<img width="450" alt="스크린샷 2024-10-26 오후 6 24 18" src="https://github.com/user-attachments/assets/72b78a6a-20b2-4c40-8667-88eb1f495970">|
- 비밀번호 변경
- 질문과 답변 작성 후 자신의 위키에 접근할 수 있는 퀴즈 생성

### 위키 목록
위키목록
|----|
|<img width="450" alt="스크린샷 2024-10-26 오후 6 24 18" src="https://github.com/user-attachments/assets/1014d28b-6388-4e07-8413-f7b3e3be2115">|
- 검색 및 페이지네이션 기능
- 첨부된 링크 클릭 시 복사
- 위키 목록 클릭 시 위키 상세 페이지와 연결

### 위키 등록

### 위키

### 자유 게시판

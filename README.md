# 🌐 위키드
지인들의 프로필을 직접 작성하고 관리할 수 있는 플랫폼

<img width="1225" height="738" alt="image" src="https://github.com/user-attachments/assets/30a8740d-117e-4726-91a1-ff4b4d6944f3" />

- 배포 주소: [wikied-team-7.vercel.app](https://wikied-team-7.vercel.app/)
- 테스트 계정
  | id | pw |
  |:---:|:---:|
  | wikiedTest@test.com | test123!@#  |

<br/>

## 1. 팀원 소개
| 강효성 | 고용빈 | 정유승 | 최예원 | 하유리 |
|:---:|:---:|:---:|:---:|:---:|
|<img alt="image" src="https://github.com/user-attachments/assets/8753470a-8d63-495c-9151-5fe661a14566" style="width:150px; height:150px;" />|<img alt="image" src="https://github.com/user-attachments/assets/aabb31d6-54cf-4ffd-8737-8d039fc1c813" style="width:150px; height:150px; object-fit:cover;" />|<img  alt="image" src="https://github.com/user-attachments/assets/7177f0f3-5789-4acb-9fb7-5534ae7d3c8e" style="width:150px; height:150px; object-fit:cover;" />|<img alt="image" src="https://github.com/user-attachments/assets/17ca45e7-5383-4fa7-808f-c16857d3f311" style="width:150px; height:150px; object-fit:cover;" />|<img alt="image" src="https://github.com/user-attachments/assets/ad3879ff-2996-4944-8a31-e196c02ed1ff" style="width:150px; height:150px; object-fit:cover;" />|
|[@kanghyosung1](https://github.com/kanghyosung1)|[@yongb2n](https://github.com/youngbin2n)|[@OurIsland](https://github.com/OurIsland)|[@ddol9](https://github.com/ddol9)|[@hayuri1990](https://github.com/hayuri1990)|
|유저 기능 <br/> 로그인 페이지 <br/> 회원가입 페이지|계정 설정 페이지 <br/> 공용 컴포넌트 <br/> 위키 에디터|위키 리스트 페이지 <br/> 게시물 작성 페이지|자유게시판 페이지 <br/> 게시글 에디터 <br/> axios 인스턴스 설정|위키 페이지 <br/> 접근 제한 기능|

<br/>

## 2. 개발 기간 및 작업 관리
2024.07.29. ~ 2024.08.16.

<br/>

## 3. 개발 환경
- Front-end: `React`, `Next.js`(pages router), `TypeScript`
- 버전 및 이슈 관리: `GitHub`
- 협업 툴: `Discord`, `Notion`
- 서비스 배포 환경: `Vercel`
- 디자인: `Figma`
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

<br/>

## 4. 채택한 개발 기술과 브랜치 전략
### 개발 기술
1. Next.js <br/>
Pages Router와 Dynamic Routes를 통해 페이지 이동을 간편하게 처리하고, Vercel로 쉽고 빠르게 배포하기 위해 사용
2. SCSS <br/> 중첩, 변수, 믹스인 등의 기능을 통해 코드의 재활용성과 가독성을 향상시켜 개발 효율을 높이기 위해 사용
3. TypeScript <br/>
프로그램 실행 전 타입 검사를 통해 코드 안정성을 높이고, 자동 완성 등의 기능을 통해 빠르고 정확하게 코드를 작성하기 위해 사용
4. ESLint, Prettier <br/>
코드의 가독성, 일관성, 품질 향상을 위해 ESLint, Prettier를 함께 사용
   - ESLint: 잠재적인 오류 등을 사전에 발견하여 코드 품질을 높이고, 디버깅 시간을 줄이기 위해 도입
     - Airbnb의 코딩 컨벤션을 참고하였고, 이 외 규칙은 ESLint 플러그인 규칙을 사용
   - Prettier: 자동 포맷팅을 통해 일관된 코드 스타일을 유지하기 위해 도입

<br/>

### 브랜치 전략
- Git-flow 전략에 따라 main, develop 브랜치와 보조로 feature 브랜치 사용
- 작업 흐름  
  1. feature 브랜치 생성 및 작업
     - 새로운 기능이나 작업 시, 고유번호를 포함한 feature 브랜치에서 작업을 진행하며, 완료 후 PR 작성
     - 예: feature/4-editor        
  2. develop 브랜치에 merge 후 동기화
     - PR 승인 후 feature 브랜치를 develop 브랜치에 merge함으로써 개발 버전 관리
     - merge 후 feature 브랜치 삭제       
  3. main 브랜치를 통한 배포 버전 관리

<br/>

## 5. 프로젝트 구조
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

<br/>

## 6. 페이지 별 기능
### 로그인 & 회원가입

로그인|회원가입
|----|----|
|<img width="200" height="300" alt="스크린샷 2024-10-26 오후 5 51 30" src="https://github.com/user-attachments/assets/89ed031b-2861-4d75-ac73-5b5c8dd89dbb">|<img width="200" height="300" alt="스크린샷 2024-10-26 오후 5 52 55" src="https://github.com/user-attachments/assets/5dbf5aab-d2d8-4e42-9e07-929d5c2f6051">
- 로그인 시 토큰을 로컬 스토리지에 저장해 새로고침 시에도 인증 상태를 유지하고, Context API를 사용해 인증 정보를 전역에서 관리
- 유효성 검사

<br/>

### 계정 설정
계정 설정
|----|
|<img width="450" alt="스크린샷 2024-10-26 오후 6 24 18" src="https://github.com/user-attachments/assets/72b78a6a-20b2-4c40-8667-88eb1f495970">|
- 비밀번호 변경
- 질문과 답변 작성 후 자신의 위키에 접근할 수 있는 퀴즈 생성

<br/>

### 위키 목록
위키 목록
|----|
|<img width="450" alt="스크린샷 2024-10-26 오후 6 24 18" src="https://github.com/user-attachments/assets/1014d28b-6388-4e07-8413-f7b3e3be2115">|
- 검색 및 페이지네이션 기능
- 첨부된 링크 클릭 시 복사
- 위키 목록 클릭 시 위키 상세 페이지와 연결

<br/>

### 위키 등록

<br/>

### 위키

<br/>

### 자유 게시판

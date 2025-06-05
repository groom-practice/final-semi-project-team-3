# Final Semi Project

팀 프로젝트 들어가기 전 마지막으로 협업 실습 프로젝트

## 프로젝트 실행 방법

`$ npm install`
<br>
`$ npm run dev`

## 팀원 및 역할

|  이름  |       역할        |
| :----: | :---------------: |
| 이예도 |   로그인 페이지   |
| 신유승 | Posts 버튼 스크롤 |
| 권수영 | Posts 무한 스크롤 |
| 양아름 |    Posts Modal    |
| 김호영 |      Swiper       |
| 김기현 |       Photo       |

## 폴더 구조

```
└── 📁app
    └── favicon.ico
    └── globals.css
    └── layout.tsx
    └── 📁lib
        └── fakeImageApi.tsx
    └── 📁login
        └── page.tsx
    └── page.tsx
    └── 📁photos
        └── 📁[id]
            └── page.tsx
    └── 📁posts
        └── page.tsx
    └── 📁types
        └── photo.ts
└── 📁components
    └── Header.tsx
    └── LoginError.tsx
    └── PostButtonList.tsx
    └── PostScrollList.tsx
    └── ReactQueryProvider.tsx
    └── ToggleButton.tsx
└── 📁lib
    └── fakePostsApi.ts
    └── postApi.ts
└── 📁public
    └── file.svg
    └── globe.svg
    └── next.svg
    └── 📁profile
        └── mandoo.png
    └── vercel.svg
    └── window.svg
└── 📁store
    └── authStore.ts
└── 📁types
    └── post.ts
    └── posts.ts
└── .gitignore
└── eslint.config.mjs
└── next-env.d.ts
└── next.config.ts
└── package-lock.json
└── package.json
└── postcss.config.mjs
└── README.md
└── tsconfig.json
```

## 상세 기능 설명

/ - Swiper로 팀원 프로필 카드 정렬
<br>
/photos - 사진 정렬. 클릭 시 세부 정보 표시
<br>
/posts - 게시글 정렬 및 버튼 스크롤 or 무한 스크롤 기능 선택. 클릭 시 세부 정보 표시
<br>
/login - Login 완료 후 위 기능을 이용 가능.

## Git branch

각 기능별로 브런치를 만들어서 구현

```
feature/login
feature/modal
feature/photo-modal
feature/postbutton
feature/postfavorite
feature/swiper
```

# [Home Page Redesign to Premium ChatGPT Mockup]

Redesign the home page ([Home.jsx](file:///d:/정환수4/MediLink_Home/medilink-web/src/pages/Home.jsx)) to match the premium ChatGPT-generated layout, featuring a new hero background, floating AI search prompt card, 3D gradient menu cards, custom middle banners, and bottom navigation.

## User Review Required
> [!IMPORTANT]
> A backup of the previous home page has been created at [Home_backup.jsx](file:///d:/정환수4/MediLink_Home/medilink-web/src/pages/Home_backup.jsx) to allow a complete, instant rollback if needed.

## Proposed Changes

### [Home Redesign]

#### [MODIFY] [Home.jsx](file:///d:/정환수4/MediLink_Home/medilink-web/src/pages/Home.jsx)
Redesign the homepage layout:
- **Hero Section**:
  - Replace the background image with a bright medical center interior hero illustration (containing a doctor, seniors, mother and child).
  - Left-align the text: "안심 병원들과 함께하는 우리 가족 건강 관리", and subtext description.
  - Render an "AI 상담 시작하기 ➔" pill button.
- **AI Prompt Floating Bar**:
  - Position a floating horizontal card just below the hero section: "어디가 아프신가요? AI에게 물어보세요." with a robot icon.
- **4 Main Core Menu Cards**:
  - 4 large columns with modern visual icons (styled with gradients and subtle drop-shadows):
    1. **제휴병원 찾기** (Hospital icon, goes to `/hospitals`)
    2. **진료예약** (Calendar check icon, goes to `/hospitals`)
    3. **건강정보** (Shield cross icon, goes to `/health`)
    4. **나의 건강** (Heartbeat icon, goes to `/mypage`)
- **Middle Customized Banner**:
  - "우리 가족 맞춤 건강 관리" banner with description, "자세히 보기" button, and mock phone display showing a health score.
- **빠른 도움 서비스 (Quick Help)**:
  - Add quick grid menu items: 응급상황(SOS), 증상검색, 검진센터, 약국찾기.

#### [MODIFY] [index.css](file:///d:/정환수4/MediLink_Home/medilink-web/src/index.css)
Add styling classes for:
- Glassmorphic floating menu cards.
- Faded gradient overlays and hero styling updates.
- Micro-animations for the new menu items.

## Verification Plan

### Manual Verification
- Verify that the new homepage renders correctly on desktop and mobile.
- Verify clicking each button routes correctly (e.g. AI Prompt card redirects to `/aichat`, Q&A to `/qna`, Health Info to `/health`, etc.).
- Ensure that if you want to restore the old page, you can simply rename `Home_backup.jsx` to `Home.jsx`.

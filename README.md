# 📈 Divly

> 스마트한 주식 포트폴리오 관리 및 배당 추적 플랫폼

Divly는 투자자들이 자신의 주식 포트폴리오를 효율적으로 관리하고 배당 수익을 체계적으로 추적할 수 있도록 돕는 종합 투자 관리 플랫폼입니다.

## ✨ 주요 기능

- 🎯 **포트폴리오 관리**: 다중 포트폴리오 생성 및 관리
- 💰 **배당 추적**: 실시간 배당 수익률 및 지급 이력 추적
- 📊 **실시간 데이터**: Yahoo Finance API를 통한 실시간 주식 정보
- 📱 **반응형 UI**: 모든 디바이스에서 최적화된 사용자 경험
- 🔄 **자동 동기화**: 주식 가격 및 배당 정보 자동 업데이트

## 🚀 기술 스택

### Frontend

- **Next.js** 15.3.2 - React 기반 풀스택 프레임워크
- **TypeScript** 5.8.2 - 타입 안정성
- **Tailwind CSS** 4.x - 유틸리티 우선 CSS 프레임워크
- **Radix UI** - 접근성 우선 컴포넌트 라이브러리

### Backend

- **NestJS** 10.0.0 - 확장 가능한 Node.js 프레임워크
- **TypeORM** - TypeScript ORM
- **PostgreSQL** 17.2 - 관계형 데이터베이스
- **Yahoo Finance API** - 실시간 주식 데이터

### Development & Infrastructure

- **Turborepo** - 고성능 빌드 시스템
- **PNPM** - 빠르고 효율적인 패키지 매니저
- **Docker** - 컨테이너화된 개발 환경
- **Storybook** - UI 컴포넌트 개발 및 문서화

## 📁 프로젝트 구조

divly/
├── api/main/ # 🔧 NestJS 백엔드 API
│ ├── src/
│ │ ├── user/ # 사용자 관리
│ │ ├── portfolio/ # 포트폴리오 관리
│ │ ├── stock/ # 주식 정보 관리
│ │ ├── portfolio-stock/ # 포트폴리오-주식 관계
│ │ └── dividend-history/ # 배당 이력 관리
│ └── docker/db/ # PostgreSQL & pgAdmin
│
├── apps/
│ ├── divly-main/ # 🌐 Next.js 메인 웹앱
│ └── divly-community/ # 👥 커뮤니티 앱 (개발예정)
│
└── packages/
├── ui/ # 🎨 공용 UI 컴포넌트
├── tailwind-config/ # 🎨 Tailwind 설정
├── typescript-config/ # ⚙️ TypeScript 설정
└── eslint-config/ # 📏 ESLint 설정

## 🗄️ 데이터베이스 모델

```mermaiderDiagram
    USER ||--o{ PORTFOLIO : owns
    PORTFOLIO ||--o{ PORTFOLIO_STOCK : contains
    STOCK ||--o{ PORTFOLIO_STOCK : belongs_to
    STOCK ||--o{ DIVIDEND_HISTORY : has

    USER {
        uuid user_id PK
        string email UK
        string name
        timestamp created_at
        timestamp updated_at
    }

    PORTFOLIO {
        uuid portfolio_id PK
        string name
        string description
        uuid user_id FK
        timestamp created_at
        timestamp updated_at
    }

    STOCK {
        string symbol PK
        string company_name
        string sector
        string industry
        decimal current_price
        decimal dividend_yield
        decimal dividend_rate
        date last_dividend_date
        date next_dividend_date
        string currency
        timestamp created_at
        timestamp updated_at
    }

    PORTFOLIO_STOCK {
        uuid id PK
        uuid portfolio_id FK
        string stock_symbol FK
        int quantity
        decimal purchase_price
        timestamp purchase_date
        timestamp created_at
        timestamp updated_at
    }

    DIVIDEND_HISTORY {
        uuid id PK
        string stock_symbol FK
        date payment_date
        decimal amount
        string currency
        timestamp created_at
    }
```

## 🛠️ 설치 및 실행

### 필수 요구사항

- Node.js 18+
- PNPM 9.0.0+
- Docker & Docker Compose

### 1. 저장소 클론

```bash
git clone https://github.com/your-username/divly.git
cd divly
```

### 2. 의존성 설치

```bash
pnpm install
```

### 3. 데이터베이스 실행

```bash
cd docker/db
docker-compose up -d
```

### 4. 환경 변수 설정

```bash
# api/main/configs/.env.dev 파일 생성
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=divly
```

### 5. 개발 서버 실행

```bash
# 모든 앱 실행
pnpm dev

# 특정 앱만 실행
pnpm front-main  # Next.js 앱만
```

### 6. 접속 정보

- 🌐 **웹 애플리케이션**: http://localhost:3000
- 🔧 **API 서버**: http://localhost:3001
- 🗄️ **pgAdmin**: http://localhost:5430
- 📚 **Storybook**: http://localhost:6006

## 📊 개발 진행 상황

### ✅ 완료

- [x] Monorepo 설정 (Turborepo + PNPM)
- [x] 백엔드 API 구조 설계 (NestJS)
- [x] 데이터베이스 모델 설계 (TypeORM)
- [x] UI 컴포넌트 라이브러리 기초 구축
- [x] Docker 개발 환경 구축
- [x] StockCard 컴포넌트 완성

### 🔄 진행 중

- [ ] API 엔드포인트 구현
- [ ] Yahoo Finance API 연동
- [ ] 프론트엔드-백엔드 연동
- [ ] 사용자 인증 시스템

### 📋 계획

- [ ] 배당 캘린더 기능
- [ ] 포트폴리오 성과 분석
- [ ] 차트 및 데이터 시각화
- [ ] 커뮤니티 기능 (divly-community)
- [ ] 모바일 앱 개발

## 🎨 UI 컴포넌트

### StockCard 컴포넌트 미리보기

```tsx
<StockCard
  symbol="AAPL"
  name="Apple Inc."
  price={150.75}
  change={1.25}
  changePercent={0.83}
  dividendYield={0.02}
  annualDividend={1.25}
  onAddToPortfolio={() => console.log("Added to portfolio")}
/>
```

### Storybook으로 컴포넌트 확인

```bash
cd packages/ui
pnpm storybook
```

## 🧪 테스트

```bash
# 전체 테스트 실행
pnpm test

# API 테스트
cd api/main
pnpm test

# E2E 테스트
pnpm test:e2e
```

## 📦 빌드 및 배포

```bash
# 전체 프로젝트 빌드
pnpm build

# 특정 앱 빌드
pnpm build --filter=@divly/app-main
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 개발 가이드라인

- TypeScript를 사용하여 타입 안정성 확보
- ESLint + Prettier를 통한 코드 스타일 통일
- 컴포넌트는 Storybook으로 문서화
- API는 NestJS 표준을 따라 개발

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 연락처

- **개발자**: [Your Name](mailto:your.email@example.com)
- **프로젝트 링크**: [https://github.com/your-username/divly](https://github.com/your-username/divly)

---

<div align="center">

**[⬆ 맨 위로](#-divly)**

Made with ❤️ by Divly Team

</div>

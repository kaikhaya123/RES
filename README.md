<div align="center">

# 🎓 Roomza's Educated Secret (R.E.S.)

### South Africa's Premier Student Reality Show Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)

*Merging entertainment, education, and social impact for South African students*

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Documentation](#api-documentation) • [Support](#support)

</div>

---

## 📖 Overview

Roomza's Educated Secret is South Africa's first large-scale student-focused reality show platform. The application enables users to vote for contestants, participate in daily educational quizzes, nominate students, and engage with live streaming content across multiple platforms.

### Key Highlights

- 🎯 Built for **15 million+ concurrent users**
- 📺 **18 hours** of daily live streaming
- 🏆 Gamified learning with achievements and rewards
- 💳 Premium voting system with secure payment integration
- 🔐 Enterprise-grade security and fraud prevention

---

## ✨ Features

### For Users

| Feature | Description |
|---------|-------------|
| **Authentication** | Secure registration for students and general public with email verification and CAPTCHA protection |
| **Voting System** | 10 free votes/day, premium packages (R5-R30), real-time leaderboards with anti-fraud measures |
| **Daily Quizzes** | Timed MCQs with score tracking, achievement badges, and engagement points |
| **Nominations** | Submit contestant nominations with admin approval workflow |
| **Live Streaming** | Multi-platform integration (TikTok, Facebook, YouTube) with push notifications |
| **Gamification** | Achievements, leaderboards, weekly competitions, and referral bonuses |

### For Administrators

- 👥 Comprehensive user management dashboard
- 📝 Quiz and content management system
- 🎬 Contestant and nomination moderation tools
- 📊 Real-time analytics and reporting
- ⚙️ System configuration and controls

---

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="33%">

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Radix UI & Lucide Icons
- Framer Motion
- React Hook Form + Zod
- SWR

</td>
<td valign="top" width="33%">

### Backend
- Node.js Runtime
- Next.js API Routes
- NextAuth.js (JWT)
- PostgreSQL + Prisma ORM
- Redis Caching
- Nodemailer

</td>
<td valign="top" width="33%">

### Infrastructure
- Vercel/AWS/Azure
- Supabase/AWS RDS
- Cloudflare CDN
- Datadog/New Relic
- GitHub Actions

</td>
</tr>
</table>

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

```
Node.js 18.x or higher
PostgreSQL 14.x or higher
Redis 6.x or higher
Git
```

### Installation

1. **Clone the repository**

   ```powershell
   git clone https://github.com/your-org/roomza-educated-secret.git
   cd roomza-educated-secret
   ```

2. **Install dependencies**

   ```powershell
   npm install
   ```

3. **Configure environment variables**

   ```powershell
   Copy-Item .env.example .env
   ```

   Update `.env` with your credentials:

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/res_db"
   
   # Authentication
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Redis
   REDIS_URL="redis://localhost:6379"
   
   # Email (optional for development)
   SMTP_HOST="smtp.example.com"
   SMTP_PORT="587"
   SMTP_USER="your-email@example.com"
   SMTP_PASSWORD="your-password"
   ```

4. **Set up the database**

   ```powershell
   # Generate Prisma Client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   
   # Seed database (optional)
   npx prisma db seed
   ```

5. **Start the development server**

   ```powershell
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Run production server |
| `npm test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run lint` | Lint code with ESLint |

---

## 📦 Deployment

### Production Build

```powershell
npm run build
npm start
```

### Environment Configuration

Ensure all production environment variables are configured:

- ✅ Database connection strings with SSL
- ✅ Redis URL with authentication
- ✅ NextAuth secret and production URL
- ✅ Email server credentials (SMTP)
- ✅ Payment gateway API keys
- ✅ Social media platform credentials

### Scaling Strategy

To handle 15 million concurrent users:

| Component | Strategy |
|-----------|----------|
| **Load Balancing** | Distribute traffic across multiple instances |
| **Microservices** | Separate services for auth, voting, quiz, and streaming |
| **Caching** | Redis for sessions/votes, CDN for static assets |
| **Database** | Read replicas + write-master with horizontal sharding |
| **Queue Systems** | RabbitMQ/AWS SQS for async task processing |
| **Auto-scaling** | Cloud-native metrics-based scaling |

### Security Checklist

- [x] JWT-based authentication
- [x] bcryptjs password hashing with salt
- [x] Redis-based rate limiting
- [x] CAPTCHA on sensitive forms
- [x] Parameterized queries (Prisma ORM)
- [x] Input sanitization and XSS protection
- [x] CSRF protection (Next.js built-in)
- [x] HTTPS/TLS enforcement
- [x] Data encryption at rest and in transit

---

## 📊 Database Architecture

The application uses a comprehensive PostgreSQL schema managed by Prisma ORM:

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│    User     │────▶│     Vote     │────▶│ Contestant  │
└─────────────┘     └──────────────┘     └─────────────┘
       │                                         │
       │            ┌──────────────┐             │
       └───────────▶│ QuizAttempt  │             │
       │            └──────────────┘             │
       │                   │                     │
       │            ┌──────────────┐             │
       └───────────▶│    Quiz      │             │
       │            └──────────────┘             │
       │                                         │
       │            ┌──────────────┐             │
       └───────────▶│ Achievement  │             │
                    └──────────────┘             │
                                                 │
                    ┌──────────────┐             │
                    │  Nomination  │────────────┘
                    └──────────────┘
```

### Core Entities

| Entity | Description |
|--------|-------------|
| `User` | User accounts (students and general public) |
| `Contestant` | Competition participants and profiles |
| `Vote` | Voting records with fraud prevention |
| `Nomination` | User-submitted contestant nominations |
| `Quiz` | Daily quiz questions and metadata |
| `QuizAttempt` | User quiz submissions and scores |
| `Achievement` | Gamification badges and rewards |
| `Sponsor` | Partner organizations and branding |
| `LiveStream` | Streaming session metadata |
| `Analytics` | Event tracking and metrics |

---

## 🔐 Security Features

The platform implements enterprise-grade security measures:

| Security Layer | Implementation |
|----------------|----------------|
| **Authentication** | JWT-based secure sessions with NextAuth.js |
| **Password Security** | bcryptjs hashing with salt rounds |
| **Rate Limiting** | Redis-based request throttling |
| **Bot Prevention** | CAPTCHA on sensitive forms |
| **SQL Injection** | Parameterized queries via Prisma ORM |
| **XSS Protection** | Input sanitization and escaping |
| **CSRF Protection** | Built-in Next.js token validation |
| **Transport Security** | Enforced HTTPS/TLS |
| **Data Encryption** | At-rest and in-transit encryption |

---

## 📈 Scalability Architecture

### Designed for 15 Million Concurrent Users

- **Load Balancing:** Multi-region traffic distribution
- **Microservices:** Decoupled services (Auth, Voting, Quiz, Streaming)
- **Caching Layers:**
  - Redis for sessions and real-time data
  - CDN for static assets and media
  - Database query result caching
- **Database Strategy:**
  - Read replicas for query distribution
  - Write-master for data mutations
  - Horizontal sharding by region
- **Message Queues:** RabbitMQ/AWS SQS for async processing
- **Auto-scaling:** Cloud-native metrics-based scaling

---

## 🧪 Testing

```powershell
# Run all unit tests
npm test

# Run with coverage report
npm run test:coverage

# End-to-end tests
npm run test:e2e

# Load testing
npm run test:load
```

### Testing Strategy

- **Unit Tests:** Jest + React Testing Library
- **Integration Tests:** API endpoint testing
- **E2E Tests:** Playwright for user flows
- **Load Tests:** Artillery for performance benchmarking

---

## 📝 API Documentation

### Authentication

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | User registration with email verification |
| `/api/auth/login` | POST | User authentication |
| `/api/auth/logout` | POST | Session termination |
| `/api/auth/verify-email` | POST | Email verification |

### Voting

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/contestants` | GET | List all active contestants |
| `/api/vote` | POST | Cast votes for contestants |
| `/api/leaderboard` | GET | Current standings and rankings |

### Quizzes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/quiz/daily` | GET | Fetch today's quiz |
| `/api/quiz/submit` | POST | Submit quiz answers |
| `/api/quiz/leaderboard` | GET | Quiz rankings and scores |

### Administration

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/admin/users` | GET | User management |
| `/api/admin/contestants` | POST | Contestant management |
| `/api/admin/analytics` | GET | Platform analytics |

> **Note:** Detailed API documentation with request/response schemas is available in [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

## 💰 Business Model

### Revenue Streams

<table>
<tr>
<td width="50%">

#### Direct Revenue
- **Premium Voting Packages**
  - R5, R10, R30 tiers
  - Up to 100 votes per transaction
- **Display Advertising**
  - CPM: R8.75 - R26.25
- **Merchandise Sales**
  - Branded products and apparel

</td>
<td width="50%">

#### Partnership Revenue
- **Brand Sponsorships**
  - R250K - R1M per season
- **Affiliate Marketing**
  - Commission-based partnerships
- **Educational Partnerships**
  - University and TVET collaborations

</td>
</tr>
</table>

### Projected Revenue (4-Week Cycle)

| Source | Estimated Revenue |
|--------|------------------|
| Premium Voting | R19,000,000 |
| Display Advertising | R2,000,000 - R5,000,000 |
| Sponsorships | R500,000 - R1,500,000 |
| **Total** | **R21M - R28M+** |

## 📞 Support

For issues, questions, or contributions:
- Email: info@res-show.co.za
- Phone: +27 (0) 11 123 4567
- GitHub Issues: [repository-url]/issues

## 📄 License

Copyright © 2025 Roomza's Educated Secret. All rights reserved.

## 🤝 Contributing

We welcome contributions! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Create a Pull Request

## 🙏 Acknowledgments

- All participating universities and TVET colleges
- 7,660 campus ambassadors
- Our sponsors and partners
- The development team
- South African youth community

---

**Built with ❤️ for South African Students**
#

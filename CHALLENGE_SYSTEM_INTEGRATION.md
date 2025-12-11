# Weekly Challenge System - Integration Plan

## Executive Summary
The website has **foundational elements** in place. This plan outlines what exists, what needs to be added, and the implementation roadmap to create a unified 6-week challenge system.

---

## ✅ WHAT'S ALREADY IMPLEMENTED

### 1. Core Infrastructure
- ✅ **Database Schema** (Prisma)
  - User model with `userType` (STUDENT, PUBLIC, ADMIN)
  - Contestant model with basic fields
  - Vote model for voting system
  - Quiz model for daily quizzes
  - Analytics for tracking
  - Achievement system

- ✅ **Authentication System**
  - NextAuth with student/public account types
  - Email verification
  - Password recovery
  - Session management

- ✅ **Vote System**
  - Vote model with `votingRound` field
  - Daily vote limits (100 votes/day)
  - Paid voting tiers (R5, R10, R30)
  - Vote status tracking (ACTIVE, EXPIRED, USED)
  - Real-time leaderboard capability

- ✅ **Quiz System**
  - Daily quizzes with time limits
  - Questions with multiple-choice
  - Score tracking
  - Attempt tracking

- ✅ **Contestant Management**
  - Admin panel for adding/managing contestants
  - Contestant pages with stats
  - Vote tracking per contestant
  - Elimination tracking

### 2. Frontend Pages & Components
- ✅ **Contestants Page** (`/contestants`)
  - Grid layout with filters (all, popular, trending, new)
  - Individual contestant cards
  - Voting interface (Coming Soon)

- ✅ **Homepage Sections**
  - Hero section
  - "How It Works" section (mentions 3-step process)
  - Voting Section with leaderboard
  - "Featured Contestants"
  - About Show section
  - Challenges mentioned in "Students Can" section

- ✅ **Admin Dashboard** (`/admin/dashboard/contestants`)
  - Contestant management
  - Vote tracking
  - Basic metrics

- ✅ **API Endpoints**
  - `/api/contestants` - CRUD operations
  - `/api/votes` - Vote operations
  - `/api/quiz` - Quiz operations
  - `/api/students` - Student data

---

## ❌ WHAT'S MISSING / NEEDS EXPANSION

### 1. Challenge System (CRITICAL)
Missing Models:
```
Challenge (weekly challenge definition)
├── Challenge Name
├── Challenge Theme
├── Challenge Rules
├── Challenge Prize
├── Week Number (1-6)
├── Start Date
├── End Date
├── Status (upcoming, active, completed)
├── Prize Pool
└── Display Order

ChallengeSubmission (student submissions)
├── studentId
├── challengeId
├── submissionType (video, photo, story, proof, pitch)
├── contentUrl
├── description
├── submittedAt
└── score (from judges + public votes)

ChallengeVote (public votes on submissions)
├── userId
├── submissionId
├── category (creativity, teamwork, impact, etc)
└── voteCount
```

### 2. Weekly Structure & Timeline
Missing:
- Week/Round model linking all components
- Challenge calendar display
- Countdown timers
- Deadline enforcement
- Results announcement flow

### 3. Challenge Submission Interface
Missing Pages:
- `/dashboard/challenges` - Student view of challenges
- `/challenges` - Public view of all challenges
- `/challenges/[id]` - Challenge details page
- `/challenges/[id]/submissions` - Public view of submissions

Missing Components:
- Challenge submission form
- Video/photo upload handler
- Submission gallery view
- Judge rating interface

### 4. Public Engagement Features
Missing:
- Challenge suggestion system
- Community comment section
- Challenge participation tracking
- Share buttons for submissions

### 5. Leaderboard & Scoring
Needs Enhancement:
- Score calculation (judge + public votes)
- Weekly leaderboard per challenge
- Season-long leaderboard
- Points accumulation system

### 6. Pages That Need Creation
```
/challenges
├── List all 6 weeks
├── Filter by week
├── View current challenge
└── See results

/challenges/[id]
├── Challenge rules & theme
├── Countdown timer
├── All 20 contestant submissions
├── Public voting
└── Leaderboard

/dashboard/challenges (Student)
├── My assigned challenges
├── Upload submission
├── Track my score
└── View team score (if applicable)

/episodes
├── Weekly recap
├── Best clips
├── Results announcement
└── Archive

/leaderboard
├── Current standings
├── Points breakdown
├── Historical data
└── Share functionality

/community
├── Suggest challenges
├── Comment on submissions
├── Follow contestants
└── Discussion forum
```

---

## 📋 DETAILED INTEGRATION ROADMAP

### Phase 1: Database & Backend (Week 1)
**Create new models:**
1. Create `Challenge` model
2. Create `ChallengeSubmission` model
3. Create `ChallengeVote` model
4. Update `Contestant` model to link challenges
5. Create migrations

**API Endpoints:**
1. `/api/challenges` - GET all, POST new
2. `/api/challenges/[id]` - GET, PUT, DELETE
3. `/api/submissions` - GET, POST
4. `/api/submissions/[id]/vote` - POST votes
5. `/api/leaderboard/challenge` - Challenge leaderboard
6. `/api/leaderboard/season` - Season leaderboard

### Phase 2: Student Dashboard (Week 2)
**Pages:**
1. `/dashboard/challenges` - View assigned challenges
2. `/dashboard/challenges/[id]/submit` - Submit form

**Components:**
1. Challenge card component
2. Challenge submission form
3. File upload handler
4. Status tracking UI

### Phase 3: Public Challenge Pages (Week 3)
**Pages:**
1. `/challenges` - Main challenges page
2. `/challenges/[id]` - Challenge details
3. `/challenges/[id]/submissions` - Public submissions gallery

**Components:**
1. Challenge hero section
2. Rules & timer component
3. Submission card with voting
4. Leaderboard (live updating)
5. Countdown timer

### Phase 4: Leaderboard & Results (Week 4)
**Pages:**
1. `/leaderboard` - Global leaderboard
2. `/episodes` - Weekly recaps

**Features:**
1. Points calculation system
2. Scoring logic (40% judge, 60% public)
3. Historical tracking
4. Result announcement modal

### Phase 5: Community Features (Week 5)
**Pages:**
1. `/community` - Challenge suggestions
2. Comments system on submissions
3. Follow/unfollow system

**Features:**
1. Challenge suggestion form
2. Voting on suggestions
3. Comment notifications

### Phase 6: Polish & Optimization (Week 6)
1. Performance optimization
2. Real-time updates (WebSocket)
3. Notifications system
4. Mobile responsiveness
5. Testing & QA

---

## 🗂️ FOLDER STRUCTURE (NEW FILES)

```
src/
├── app/
│   ├── challenges/
│   │   ├── page.tsx (Challenge list)
│   │   ├── [id]/
│   │   │   ├── page.tsx (Challenge details)
│   │   │   └── submissions/
│   │   │       └── page.tsx (Public submissions view)
│   ├── dashboard/
│   │   └── challenges/
│   │       ├── page.tsx (Student challenges view)
│   │       └── [id]/
│   │           └── submit/
│   │               └── page.tsx (Submission form)
│   ├── leaderboard/
│   │   ├── page.tsx (Global leaderboard)
│   │   ├── challenge/[id]/
│   │   │   └── page.tsx (Challenge-specific leaderboard)
│   │   └── season/
│   │       └── page.tsx (Season leaderboard)
│   ├── episodes/
│   │   ├── page.tsx (Weekly recaps)
│   │   └── [week]/
│   │       └── page.tsx (Episode details)
│   └── community/
│       ├── page.tsx (Community hub)
│       └── suggest/
│           └── page.tsx (Challenge suggestions)
├── components/
│   ├── challenges/
│   │   ├── ChallengeCard.tsx
│   │   ├── ChallengeHero.tsx
│   │   ├── ChallengeRules.tsx
│   │   ├── ChallengeTimer.tsx
│   │   ├── SubmissionForm.tsx
│   │   ├── SubmissionGallery.tsx
│   │   ├── SubmissionCard.tsx
│   │   └── VotingPanel.tsx
│   ├── leaderboard/
│   │   ├── LeaderboardTable.tsx
│   │   ├── ScoreBreakdown.tsx
│   │   └── RankBadge.tsx
│   └── community/
│       ├── CommentSection.tsx
│       ├── ChallengeForm.tsx
│       └── FollowButton.tsx
├── lib/
│   ├── challenges.ts (Challenge utilities)
│   ├── scoring.ts (Scoring logic)
│   └── submissions.ts (Submission handlers)
└── types/
    └── challenges.ts (Challenge types)
```

---

## 📊 DATA FLOW DIAGRAM

```
WEEK X LIFECYCLE:

Day 1: Challenge Revealed
├── Admin creates challenge
├── Challenge goes live on /challenges
├── Notifications sent to all students
└── Public sees countdown timer

Day 2-5: Submission Period
├── Students upload submissions via /dashboard/challenges/[id]/submit
├── Public views on /challenges/[id]/submissions
├── Public votes daily (tied to votingRound)
├── Leaderboard updates in real-time
└── Analytics track engagement

Day 6: Voting Closes
├── Submissions locked
├── Judge scores calculated
├── Final scores = Judge (40%) + Public Votes (60%)
└── Results prepared

Day 7: Results Announced
├── Episode page updated (/episodes/week-x)
├── New leaderboard generated
├── Winners announced
├── Prizes awarded
└── Points flow to season leaderboard

Next Week: Process repeats
```

---

## 🔧 INTEGRATION CHECKLIST

### Database
- [ ] Create Challenge model
- [ ] Create ChallengeSubmission model
- [ ] Create ChallengeVote model
- [ ] Create migration
- [ ] Update Contestant model

### API
- [ ] Challenge CRUD endpoints
- [ ] Submission endpoints
- [ ] Voting endpoints
- [ ] Leaderboard endpoints
- [ ] Points calculation endpoint

### Frontend - Student
- [ ] Challenge list view
- [ ] Challenge submission form
- [ ] File upload handler
- [ ] Status tracking UI
- [ ] My submissions dashboard

### Frontend - Public
- [ ] Challenges page (all weeks)
- [ ] Challenge details page
- [ ] Submissions gallery
- [ ] Voting interface
- [ ] Countdown timer
- [ ] Leaderboard display

### Admin
- [ ] Challenge creation form
- [ ] Submission management
- [ ] Judge scoring interface
- [ ] Results management
- [ ] Analytics dashboard

### Features
- [ ] Real-time leaderboard updates
- [ ] Scoring system (judge + public)
- [ ] Notifications for deadlines
- [ ] Email confirmations
- [ ] Share functionality

---

## 🚀 QUICK START NEXT STEPS

1. **Review this plan** with the team
2. **Create Challenge models** in Prisma schema
3. **Generate database migration**
4. **Create API endpoints** for challenges
5. **Build Challenge card component**
6. **Create /challenges page**
7. **Add challenge submission form**
8. **Implement voting system**
9. **Build leaderboard page**
10. **Add real-time updates**

---

## 💡 KEY INSIGHTS FROM EXISTING CODE

1. **Vote model already has `votingRound`** - Perfect for weekly structure
2. **User model has `userType`** - Student/Public distinction ready
3. **Contestant model is lean** - Good foundation to extend
4. **API structure exists** - Easy to add new endpoints
5. **Admin dashboard ready** - Can extend for challenge management
6. **Voting infrastructure solid** - Can repurpose for challenge votes

---

## 📈 SUCCESS METRICS

Track:
- Weekly engagement rates
- Submission completion rates
- Voting participation
- Leaderboard accuracy
- Page load times
- User satisfaction scores


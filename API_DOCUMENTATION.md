# R.E.S. API Documentation

## Overview
This document provides comprehensive documentation for all API endpoints in the R.E.S. (Roomza's Educated Secret) application.

## Base URL
```
https://res-platform.com/api
```

## Authentication
All protected endpoints require authentication using NextAuth.js session tokens. Include the session in request headers.

---

## Endpoints

### Authentication

#### Register
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "userType": "student" | "public"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "userId": "uuid",
  "email": "user@example.com"
}
```

**Error Responses:**
- `400` - Invalid input data
- `409` - Email already exists

---

#### Login
**POST** `/auth/login`

Authenticate user and create session.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "session": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John"
    }
  }
}
```

**Error Responses:**
- `401` - Invalid credentials
- `404` - User not found

---

#### Logout
**POST** `/auth/logout`

Invalidate current session.

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Voting System

#### Cast Vote
**POST** `/vote`

Submit a vote for a contestant. Requires authentication.

**Request Body:**
```json
{
  "contestantId": "uuid",
  "voteCount": 5
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Vote(s) recorded",
  "voteId": "uuid",
  "remainingVotes": 95
}
```

**Error Responses:**
- `400` - Invalid contestant ID
- `403` - Vote limit exceeded
- `401` - Unauthorized

**Rate Limiting:** 100 votes/day per user

---

#### Get Voting Stats
**GET** `/vote/stats?contestantId={id}`

Get voting statistics for a contestant.

**Query Parameters:**
- `contestantId` (required) - UUID of contestant

**Response (200):**
```json
{
  "contestantId": "uuid",
  "totalVotes": 5234,
  "uniqueVoters": 1204,
  "timestamp": "2025-12-21T10:30:00Z"
}
```

---

#### Get User Vote Count
**GET** `/vote/remaining`

Get remaining votes for authenticated user today.

**Response (200):**
```json
{
  "totalVotesAvailable": 100,
  "votesUsed": 25,
  "votesRemaining": 75,
  "resetTime": "2025-12-22T00:00:00Z"
}
```

---

### Contestants

#### Get All Contestants
**GET** `/contestants?page={page}&limit={limit}`

Retrieve list of all contestants with pagination.

**Query Parameters:**
- `page` (optional, default: 1)
- `limit` (optional, default: 20)
- `sortBy` (optional) - "votes" | "name" | "recent"

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "John Doe",
      "bio": "Aspiring entrepreneur",
      "image": "https://...",
      "votes": 5234,
      "status": "active"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}
```

---

#### Get Contestant Details
**GET** `/contestants/{id}`

Get detailed information about a specific contestant.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "bio": "Aspiring entrepreneur",
    "image": "https://...",
    "votes": 5234,
    "age": 22,
    "university": "University of Cape Town",
    "program": "Business Administration",
    "socialLinks": {
      "instagram": "@johndoe",
      "twitter": "@johndoe"
    }
  }
}
```

---

### Quizzes

#### Get Daily Quiz
**GET** `/quiz/daily`

Retrieve today's quiz questions.

**Response (200):**
```json
{
  "quizId": "uuid",
  "date": "2025-12-21",
  "questions": [
    {
      "id": "uuid",
      "question": "What is the capital of South Africa?",
      "options": ["Pretoria", "Cape Town", "Johannesburg", "Durban"],
      "timeLimit": 30,
      "difficulty": "easy"
    }
  ],
  "totalQuestions": 5,
  "pointsPerCorrect": 10
}
```

---

#### Submit Quiz Answer
**POST** `/quiz/answer`

Submit an answer to a quiz question.

**Request Body:**
```json
{
  "quizId": "uuid",
  "questionId": "uuid",
  "selectedOption": "Pretoria",
  "timeSpent": 15
}
```

**Response (200):**
```json
{
  "success": true,
  "isCorrect": true,
  "pointsEarned": 10,
  "explanation": "Pretoria is the administrative capital of South Africa."
}
```

---

#### Get User Quiz Stats
**GET** `/quiz/stats`

Get user's quiz performance statistics.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalQuizzesTaken": 45,
    "correctAnswers": 182,
    "totalPoints": 1820,
    "avgAccuracy": 80.9,
    "streak": 7
  }
}
```

---

### Nominations

#### Create Nomination
**POST** `/nominations`

Submit a new contestant nomination. Requires authentication.

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "university": "University of Cape Town",
  "program": "Engineering",
  "bio": "Passionate about technology",
  "socialLinks": {
    "instagram": "@janesmith",
    "phone": "+27123456789"
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Nomination submitted successfully",
  "nominationId": "uuid",
  "status": "pending_review"
}
```

**Error Responses:**
- `400` - Invalid input data
- `409` - Duplicate nomination

---

#### Get Nomination Status
**GET** `/nominations/{id}`

Check status of a nomination.

**Response (200):**
```json
{
  "nominationId": "uuid",
  "status": "pending_review" | "approved" | "rejected",
  "submittedAt": "2025-12-21T10:30:00Z",
  "reviewedAt": "2025-12-21T14:00:00Z",
  "reviewedBy": "admin@res.com"
}
```

---

### Analytics

#### Get User Analytics
**GET** `/analytics/user`

Get personalized user engagement analytics.

**Response (200):**
```json
{
  "userId": "uuid",
  "totalVotes": 250,
  "quizzesCompleted": 20,
  "pointsEarned": 500,
  "referrals": 5,
  "achievements": ["First Vote", "Quiz Master", "Social Butterfly"],
  "lastActive": "2025-12-21T15:30:00Z"
}
```

---

#### Get Platform Analytics
**GET** `/analytics/platform`

Get overall platform statistics (public endpoint).

**Response (200):**
```json
{
  "totalUsers": 50000,
  "totalVotes": 2500000,
  "activeContestants": 150,
  "liveViewers": 5432,
  "totalPoints": 500000,
  "timestamp": "2025-12-21T15:30:00Z"
}
```

---

## Error Handling

All error responses follow this format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": "Additional context"
  }
}
```

### Common Error Codes:
- `VALIDATION_ERROR` - Invalid input parameters
- `AUTHENTICATION_ERROR` - Auth token invalid or expired
- `AUTHORIZATION_ERROR` - User lacks required permissions
- `NOT_FOUND` - Resource not found
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `SERVER_ERROR` - Internal server error

---

## Rate Limiting

Rate limits are applied per user:

| Endpoint | Limit |
|----------|-------|
| `/vote` | 100/day |
| `/quiz/answer` | 1000/day |
| `/nominations` | 10/day |
| General API | 1000/hour |

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 75
X-RateLimit-Reset: 1703116800
```

---

## Pagination

List endpoints support pagination:

```
GET /api/contestants?page=1&limit=20
```

Response includes:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Not Found |
| `409` | Conflict |
| `429` | Too Many Requests |
| `500` | Server Error |

---

## Webhooks

Webhooks are sent for important events:

### Vote Webhook
```json
{
  "event": "vote.created",
  "data": {
    "voteId": "uuid",
    "contestantId": "uuid",
    "userId": "uuid",
    "voteCount": 5,
    "timestamp": "2025-12-21T10:30:00Z"
  }
}
```

Configure webhooks in admin dashboard.

---

## SDK / Examples

### JavaScript/TypeScript Example

```typescript
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://res-platform.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Vote for a contestant
async function castVote(contestantId: string, votes: number) {
  try {
    const response = await api.post('/vote', {
      contestantId,
      voteCount: votes,
    })
    console.log('Vote successful:', response.data)
  } catch (error) {
    console.error('Vote failed:', error.response.data)
  }
}

// Get contestant details
async function getContestant(id: string) {
  try {
    const response = await api.get(`/contestants/${id}`)
    return response.data.data
  } catch (error) {
    console.error('Failed to fetch contestant:', error)
  }
}
```

---

## Support

For API support:
- Email: api-support@res.com
- Documentation: https://docs.res-platform.com
- Status Page: https://status.res-platform.com

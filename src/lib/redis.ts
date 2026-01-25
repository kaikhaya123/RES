import { Redis } from '@upstash/redis';

const globalForRedis = globalThis as unknown as {
  redis: Redis | null | undefined
}

// Skip Redis connection during build time to avoid ECONNREFUSED errors
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';

// Use Upstash Redis if available, otherwise skip
export const redis = globalForRedis.redis ?? (
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null
);

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;

// Cache utilities
export const CACHE_KEYS = {
  USER: (id: string) => `user:${id}`,
  CONTESTANTS: 'contestants:active',
  LEADERBOARD: (round: number) => `leaderboard:${round}`,
  QUIZ: (id: string) => `quiz:${id}`,
  VOTES: (userId: string, round: number) => `votes:${userId}:${round}`,
};

export const CACHE_TTL = {
  SHORT: 300, // 5 minutes
  MEDIUM: 1800, // 30 minutes
  LONG: 3600, // 1 hour
  DAY: 86400, // 24 hours
};

export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    if (isBuildTime || !redis) return null;
    const data = await redis.get(key);
    return data ? (typeof data === 'string' ? JSON.parse(data) : data as T) : null;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

export async function cacheSet(key: string, value: any, ttl: number = CACHE_TTL.MEDIUM): Promise<void> {
  try {
    if (isBuildTime || !redis) return;
    await redis.set(key, JSON.stringify(value), { ex: ttl });
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

export async function cacheDelete(key: string): Promise<void> {
  try {
    if (isBuildTime || !redis) return;
    await redis.del(key);
  } catch (error) {
    console.error('Cache delete error:', error);
  }
}

export async function cacheDeletePattern(pattern: string): Promise<void> {
  try {
    if (isBuildTime || !redis) return;
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error('Cache delete pattern error:', error);
  }
}

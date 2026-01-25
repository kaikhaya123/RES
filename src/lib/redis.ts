import { createClient } from 'redis';

const globalForRedis = globalThis as unknown as {
  redis: ReturnType<typeof createClient> | undefined
}

// Skip Redis connection during build time to avoid ECONNREFUSED errors
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                    process.env.NODE_ENV === 'production' && !process.env.REDIS_URL;

export const redis = globalForRedis.redis ?? createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 3) {
        console.log('Redis reconnection failed after 3 attempts');
        return false; // Stop reconnecting
      }
      return Math.min(retries * 100, 3000);
    }
  }
});

if (!isBuildTime && !redis.isOpen) {
  redis.connect().catch((error) => {
    console.error('Redis connection failed:', error.message);
    console.log('Continuing without Redis cache...');
  });
}

// Handle Redis errors gracefully
redis.on('error', (error) => {
  console.error('Redis error:', error.message);
});

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
    if (isBuildTime || !redis.isOpen) return null;
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

export async function cacheSet(key: string, value: any, ttl: number = CACHE_TTL.MEDIUM): Promise<void> {
  try {
    if (isBuildTime || !redis.isOpen) return;
    await redis.setEx(key, ttl, JSON.stringify(value));
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

export async function cacheDelete(key: string): Promise<void> {
  try {
    if (isBuildTime || !redis.isOpen) return;
    await redis.del(key);
  } catch (error) {
    console.error('Cache delete error:', error);
  }
}

export async function cacheDeletePattern(pattern: string): Promise<void> {
  try {
    if (isBuildTime) return;
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(keys);
    }
  } catch (error) {
    console.error('Cache delete pattern error:', error);
  }
}

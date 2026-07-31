/**
 * Client-side rate limiter — token bucket implementation.
 *
 * Prevents abuse of OTP requests, RAG queries, and API calls
 * from the browser. Server-side enforcement is in the Supabase
 * Edge Functions / API layer; this is a complementary UI guard.
 *
 * Usage:
 *   const limiter = createRateLimiter({ maxRequests: 5, windowMs: 60_000 });
 *   if (!limiter.allow()) throw new Error('Too many requests');
 */

/**
 * Creates a sliding-window rate limiter.
 * @param {{ maxRequests: number, windowMs: number }} options
 */
export function createRateLimiter({ maxRequests, windowMs }) {
  const timestamps = [];

  return {
    /** Returns true if the request is allowed, false if rate-limited. */
    allow() {
      const now = Date.now();
      // Remove timestamps outside the current window
      while (timestamps.length > 0 && timestamps[0] <= now - windowMs) {
        timestamps.shift();
      }
      if (timestamps.length >= maxRequests) {
        return false;
      }
      timestamps.push(now);
      return true;
    },

    /** Remaining requests in the current window. */
    remaining() {
      const now = Date.now();
      const inWindow = timestamps.filter(t => t > now - windowMs).length;
      return Math.max(0, maxRequests - inWindow);
    },

    /** Milliseconds until at least one slot is available. */
    retryAfterMs() {
      if (timestamps.length === 0) return 0;
      const oldest = timestamps[0];
      return Math.max(0, oldest + windowMs - Date.now());
    },

    /** Reset the limiter (e.g. after a successful action). */
    reset() {
      timestamps.length = 0;
    },
  };
}

// ── Pre-configured limiters used across the app ───────────────────────────────

/** OTP request: max 3 per 5 minutes */
export const otpLimiter = createRateLimiter({ maxRequests: 3, windowMs: 5 * 60_000 });

/** RAG / AI chat queries: max 20 per minute */
export const ragLimiter = createRateLimiter({ maxRequests: 20, windowMs: 60_000 });

/** Application submissions: max 5 per 10 minutes */
export const applyLimiter = createRateLimiter({ maxRequests: 5, windowMs: 10 * 60_000 });

/** Profile save: max 10 per minute */
export const profileSaveLimiter = createRateLimiter({ maxRequests: 10, windowMs: 60_000 });

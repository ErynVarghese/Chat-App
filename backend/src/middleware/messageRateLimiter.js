import Redis from "ioredis";
import { RateLimiterRedis } from "rate-limiter-flexible";

const redisClient = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  enableOfflineQueue: false,
});

redisClient.on("error", (err) => {
  console.error("Redis rate limiter error:", err.message);
});

const messageLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rate_limit_message",
  points: 30,
  duration: 60,
});

export const messageRateLimiter = async (req, res, next) => {
  try {
    const userId = req.user?._id?.toString();

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await messageLimiter.consume(userId);
    next();
  } catch (error) {
    return res.status(429).json({
      message: "You are sending messages too quickly. Please slow down.",
    });
  }
};
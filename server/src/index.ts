import express from 'express';
import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/UserRoutes.js';
import itemRoutes from './routes/ItemRoutes.js';
import subscriptionRoutes from './routes/SubscriptionRoutes.js';
import webHookRoutes from './routes/WebHookRoutes.js';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/AuthRoutes.js';
import helmet from 'helmet';
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config()

const isProduction = process.env.NODE_ENV === "production";

const app = express();

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `windowMs`
  message: {
    status: 429,
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // Limit each IP to 5 login/register attempts per 5 minutes
  message: {
    status: 429,
    message: 'Too many login attempts. Please try again in 5 minutes.'
  }
});

// Custom CSP for Production
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        // Vite builds chunks that require inline script permissions unless using hashes
        scriptSrc: ["'self'", "'unsafe-inline'"], 
        styleSrc: isProduction 
        ? ["'self'", "'unsafe-inline'"]
        : ["'self'", "'unsafe-inline'", `${process.env.CLIENT_URL}:5173`],
        connectSrc: isProduction 
        ? ["'self'"]
        : ["'self'", `${process.env.CLIENT_URL}:5173`, "ws://localhost:5173"],
        imgSrc: ["'self'", "data:"],
      },
    }
  })
);

app.use(cors());
app.use('/api/subscription/webhooks', webHookRoutes)
app.use(express.json());
app.use('/api/', globalLimiter);
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/subscription', subscriptionRoutes);

app.use('/api/auth', authLimiter, authRoutes)

const PORT = (process.env.PORT || 5000) as number;
const MONGO_URI = process.env.MONGODB_URI || '';

if (!MONGO_URI) {
  throw new Error("MONGO_URI environment variable is missing!");
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });



app.get('/', (req: Request, res: Response) => {
  res.send('Server is running with TypeScript!');
});

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
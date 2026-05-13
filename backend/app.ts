import { toNodeHandler } from "better-auth/node";
import express from "express";
import cors from 'cors'
import type { Request, Response } from "express";
import { auth } from "./lib/auth.ts";

const port = 4000;
const app = express();


// CORS must be registered before all routes
app.use(cors({
  origin: "*",   // your frontend URL
  credentials: true,                  // required for auth cookies/sessions
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Wildcard path to catch all auth sub-routes (/api/auth/signin, /api/auth/signout, etc.)
app.all("/api/auth/*path", toNodeHandler(auth));
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.send("API Health ok");
});

app.listen(port, () => console.log("NO-KYC Server running on Port:", port));

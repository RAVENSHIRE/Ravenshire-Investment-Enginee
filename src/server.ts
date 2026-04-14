import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupMarketDataSocket } from "./api/services/marketDataSocket.js";

// Import routes
import supplyChainRoutes from "./api/routes/supplyChain.js";
import marketDataRoutes from "./api/routes/marketData.js";
import strategyRoutes from "./api/routes/strategy.js";
import aiChatRoutes from "./api/routes/aiChat.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  const PORT = 3000;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Setup WebSocket
  setupMarketDataSocket(io);

  // API Routes
  app.use("/api/supply-chain", supplyChainRoutes);
  app.use("/api/market-data", marketDataRoutes);
  app.use("/api/strategy", strategyRoutes);
  app.use("/api/ai-chat", aiChatRoutes);

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Global Error Handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
      error: "Internal Server Error",
      message: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFighterSchema, insertFightStatsSchema, insertFightHistorySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for fighters data
  app.get("/api/fighters", async (req, res) => {
    try {
      const fighters = await storage.getAllFighters();
      res.json(fighters);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch fighters" });
    }
  });

  app.get("/api/fighters/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const fighter = await storage.getFighterById(id);
      
      if (!fighter) {
        return res.status(404).json({ error: "Fighter not found" });
      }
      
      res.json(fighter);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch fighter" });
    }
  });

  app.get("/api/fighters/:id/stats", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const stats = await storage.getFighterStatsById(id);
      
      if (!stats) {
        return res.status(404).json({ error: "Fighter stats not found" });
      }
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch fighter stats" });
    }
  });

  app.get("/api/fighters/:id/history", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const history = await storage.getFighterHistoryById(id);
      
      if (!history || history.length === 0) {
        return res.status(404).json({ error: "Fight history not found" });
      }
      
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch fight history" });
    }
  });

  app.get("/api/featured-fight", async (req, res) => {
    try {
      const featuredFight = await storage.getFeaturedFight();
      res.json(featuredFight);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured fight" });
    }
  });

  // POST endpoints for adding new data
  app.post("/api/fighters", async (req, res) => {
    try {
      const fighterData = insertFighterSchema.parse(req.body);
      const newFighter = await storage.createFighter(fighterData);
      res.status(201).json(newFighter);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid fighter data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create fighter" });
    }
  });

  app.post("/api/fighters/:id/stats", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const statsData = insertFightStatsSchema.parse({
        ...req.body,
        fighterId: id
      });
      
      const newStats = await storage.createFighterStats(statsData);
      res.status(201).json(newStats);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid stats data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create fighter stats" });
    }
  });

  app.post("/api/fighters/:id/history", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const historyData = insertFightHistorySchema.parse({
        ...req.body,
        fighterId: id
      });
      
      const newHistory = await storage.createFightHistory(historyData);
      res.status(201).json(newHistory);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid history data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create fight history" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

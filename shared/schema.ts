import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const fighters = pgTable("fighters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nickname: text("nickname"),
  division: text("division").notNull(),
  record: text("record").notNull(),
  wins: integer("wins").notNull(),
  losses: integer("losses").notNull(),
  draws: integer("draws").notNull(),
  noContests: integer("no_contests").default(0),
  age: integer("age"),
  height: text("height"),
  weight: text("weight"),
  reach: text("reach"),
  stance: text("stance"),
  team: text("team"),
  location: text("location"),
  image: text("image"),
  isChampion: boolean("is_champion").default(false),
});

export const fightHistory = pgTable("fight_history", {
  id: serial("id").primaryKey(),
  fighterId: integer("fighter_id").notNull(),
  opponent: text("opponent").notNull(),
  result: text("result").notNull(),
  method: text("method").notNull(),
  round: integer("round"),
  time: text("time"),
  event: text("event"),
  date: text("date"),
});

export const fightStats = pgTable("fight_stats", {
  id: serial("id").primaryKey(),
  fighterId: integer("fighter_id").notNull(),
  strikesLanded: integer("strikes_landed"),
  strikingAccuracy: integer("striking_accuracy"),
  strikesAbsorbedPerMin: text("strikes_absorbed_per_min"),
  strikingDefense: integer("striking_defense"),
  takedownAccuracy: integer("takedown_accuracy"),
  takedownDefense: integer("takedown_defense"),
  submissionAttempts: integer("submission_attempts"),
  controlTimeAvg: text("control_time_avg"),
  knockoutPercentage: integer("knockout_percentage"),
  submissionPercentage: integer("submission_percentage"),
  decisionPercentage: integer("decision_percentage"),
});

export const insertFighterSchema = createInsertSchema(fighters).omit({ id: true });
export const insertFightHistorySchema = createInsertSchema(fightHistory).omit({ id: true });
export const insertFightStatsSchema = createInsertSchema(fightStats).omit({ id: true });

export type InsertFighter = z.infer<typeof insertFighterSchema>;
export type InsertFightHistory = z.infer<typeof insertFightHistorySchema>;
export type InsertFightStats = z.infer<typeof insertFightStatsSchema>;

export type Fighter = typeof fighters.$inferSelect;
export type FightHistory = typeof fightHistory.$inferSelect;
export type FightStats = typeof fightStats.$inferSelect;

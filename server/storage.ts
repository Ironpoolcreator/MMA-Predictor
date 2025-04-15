import { fighters, fightHistory, fightStats } from "@shared/schema";
import type { 
  Fighter, 
  InsertFighter, 
  FightHistory, 
  InsertFightHistory, 
  FightStats, 
  InsertFightStats 
} from "@shared/schema";
import { fightersData } from "../client/src/data/fighters";
import { ComparisonStat } from "../client/src/types";

export interface IStorage {
  // Fighter operations
  getAllFighters(): Promise<Fighter[]>;
  getFighterById(id: number): Promise<Fighter | undefined>;
  createFighter(fighter: InsertFighter): Promise<Fighter>;
  
  // Fight stats operations
  getFighterStatsById(fighterId: number): Promise<FightStats | undefined>;
  createFighterStats(stats: InsertFightStats): Promise<FightStats>;
  
  // Fight history operations
  getFighterHistoryById(fighterId: number): Promise<FightHistory[]>;
  createFightHistory(history: InsertFightHistory): Promise<FightHistory>;
  
  // Featured fight
  getFeaturedFight(): Promise<any>;
}

export class MemStorage implements IStorage {
  private fighters: Map<number, Fighter>;
  private fightStats: Map<number, FightStats>;
  private fightHistories: Map<number, FightHistory[]>;
  private currentFighterId: number;
  private currentStatsId: number;
  private currentHistoryId: number;

  constructor() {
    this.fighters = new Map();
    this.fightStats = new Map();
    this.fightHistories = new Map();
    
    // Initialize with some data
    this.currentFighterId = 1;
    this.currentStatsId = 1;
    this.currentHistoryId = 1;
    
    // Seed data from fighters data
    this.seedFightersData();
  }

  private seedFightersData() {
    // Seed fighters
    fightersData.forEach(fighter => {
      this.fighters.set(fighter.id, fighter);
      this.currentFighterId = Math.max(this.currentFighterId, fighter.id + 1);
      
      // Generate stats for each fighter
      const stats: FightStats = {
        id: this.currentStatsId++,
        fighterId: fighter.id,
        strikesLanded: Math.floor(Math.random() * 1000) + 500,
        strikingAccuracy: fighter.strikingAccuracy || Math.floor(Math.random() * 30) + 50,
        strikesAbsorbedPerMin: (Math.random() * 3 + 1).toFixed(1),
        strikingDefense: Math.floor(Math.random() * 25) + 50,
        takedownAccuracy: Math.floor(Math.random() * 40) + 40,
        takedownDefense: fighter.takedownDefense || Math.floor(Math.random() * 30) + 65,
        submissionAttempts: Math.floor(Math.random() * 15) + 1,
        controlTimeAvg: `${Math.floor(Math.random() * 4)}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}`,
        knockoutPercentage: Math.floor(Math.random() * 50) + 10,
        submissionPercentage: Math.floor(Math.random() * 40) + 5,
        decisionPercentage: Math.floor(Math.random() * 50) + 20,
      };
      
      this.fightStats.set(fighter.id, stats);
      
      // Generate fight history for each fighter
      const opponents = [
        "Ciryl Gane", "Stipe Miocic", "Dominick Reyes", 
        "Thiago Santos", "Anthony Smith", "Alexander Gustafsson",
        "Daniel Cormier", "Glover Teixeira", "Volkan Oezdemir"
      ];
      
      const methods = [
        "KO/TKO", "SUB", "DEC", "DEC", "SUB", "KO/TKO"
      ];
      
      const events = [
        "UFC 320", "UFC 319", "UFC 318", "UFC 317",
        "UFC 316", "UFC 315", "UFC 314", "UFC 313", "UFC 312"
      ];
      
      const results = ["win", "win", "win", "win", "loss", "win", "win", "draw", "win"];
      
      const history: FightHistory[] = Array.from({ length: 6 }, (_, i) => ({
        id: this.currentHistoryId++,
        fighterId: fighter.id,
        opponent: opponents[Math.floor(Math.random() * opponents.length)],
        result: results[Math.floor(Math.random() * results.length)],
        method: methods[Math.floor(Math.random() * methods.length)],
        round: Math.floor(Math.random() * 5) + 1,
        time: `${Math.floor(Math.random() * 4) + 1}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}`,
        event: events[Math.floor(Math.random() * events.length)],
        date: `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][Math.floor(Math.random() * 12)]} ${Math.floor(Math.random() * 28) + 1}, ${Math.floor(Math.random() * 2) + 2024}`,
      }));
      
      this.fightHistories.set(fighter.id, history);
    });
  }

  async getAllFighters(): Promise<Fighter[]> {
    return Array.from(this.fighters.values());
  }

  async getFighterById(id: number): Promise<Fighter | undefined> {
    return this.fighters.get(id);
  }

  async createFighter(insertFighter: InsertFighter): Promise<Fighter> {
    const id = this.currentFighterId++;
    const fighter: Fighter = { ...insertFighter, id };
    this.fighters.set(id, fighter);
    return fighter;
  }

  async getFighterStatsById(fighterId: number): Promise<FightStats | undefined> {
    return this.fightStats.get(fighterId);
  }

  async createFighterStats(insertStats: InsertFightStats): Promise<FightStats> {
    const id = this.currentStatsId++;
    const stats: FightStats = { ...insertStats, id };
    this.fightStats.set(insertStats.fighterId, stats);
    return stats;
  }

  async getFighterHistoryById(fighterId: number): Promise<FightHistory[]> {
    return this.fightHistories.get(fighterId) || [];
  }

  async createFightHistory(insertHistory: InsertFightHistory): Promise<FightHistory> {
    const id = this.currentHistoryId++;
    const history: FightHistory = { ...insertHistory, id };
    
    const existingHistory = this.fightHistories.get(insertHistory.fighterId) || [];
    existingHistory.push(history);
    this.fightHistories.set(insertHistory.fighterId, existingHistory);
    
    return history;
  }

  async getFeaturedFight(): Promise<any> {
    // Get Jon Jones and Stipe Miocic (or any two fighters if they don't exist)
    const jonJones = Array.from(this.fighters.values()).find(f => f.name === "Jon Jones") || 
                     Array.from(this.fighters.values())[0];
    
    const stipeMiocic = Array.from(this.fighters.values()).find(f => f.name === "Stipe Miocic") || 
                        Array.from(this.fighters.values())[1];
    
    if (!jonJones || !stipeMiocic) {
      throw new Error("Failed to find featured fighters");
    }
    
    // Generate comparison stats
    const comparisonStats: ComparisonStat[] = [
      {
        label: "Striking",
        key1: "strikingAccuracy",
        key2: "strikingAccuracy",
        value1: "68%",
        value2: "62%",
        percent1: 68,
        percent2: 62
      },
      {
        label: "TDD",
        key1: "takedownDefense",
        key2: "takedownDefense",
        value1: "94%",
        value2: "85%",
        percent1: 94,
        percent2: 85
      },
      {
        label: "Sub Def",
        key1: "submissionDefense",
        key2: "submissionDefense",
        value1: "100%",
        value2: "92%",
        percent1: 100,
        percent2: 92
      },
      {
        label: "KO Power",
        key1: "knockoutPower",
        key2: "knockoutPower",
        value1: "87%",
        value2: "91%",
        percent1: 87,
        percent2: 91
      }
    ];
    
    return {
      fighter1: jonJones,
      fighter2: stipeMiocic,
      fighter1WinProbability: 65,
      fighter2WinProbability: 35,
      eventName: "UFC 321",
      eventDate: "April 27, 2025",
      confidenceScore: 87,
      comparisonStats,
      analysis: "Based on our analysis, Jones has a significant advantage in the grappling department with superior wrestling credentials and control time. Miocic's best chance is to keep the fight standing and utilize his boxing. Jones' reach advantage and creative striking will likely be the difference maker if the fight stays on the feet.",
      likelyVictoryMethod: {
        method: "Jones by Submission",
        probability: 42
      },
      fightDuration: {
        duration: "4+ Rounds",
        probability: 68
      },
      fightPace: {
        pace: "Moderate",
        probability: 74
      }
    };
  }
}

export const storage = new MemStorage();

import { Fighter as DBFighter, FightHistory as DBFightHistory, FightStats as DBFightStats } from "@shared/schema";

// Fighter type that matches the database schema
export interface Fighter extends DBFighter {
  // Additional frontend properties
  knockoutPower?: number;
  submissionDefense?: number;
  strikingAccuracy?: number;
  takedownDefense?: number;
  winStreak?: number;
}

// Fight History type that matches the database schema
export type FightHistory = DBFightHistory;

// Fight Stats type that matches the database schema
export type FightStats = DBFightStats;

// Comparison stat used in fighter comparison components
export interface ComparisonStat {
  label: string;
  key1: string;
  key2: string;
  value1: string;
  value2: string;
  percent1: number;
  percent2: number;
}

// Fight prediction result
export interface FightPrediction {
  fighter1: Fighter;
  fighter2: Fighter;
  fighter1WinProbability: number;
  fighter2WinProbability: number;
  comparisonStats: ComparisonStat[];
  analysis: string;
  confidenceScore: number;
  likelyVictoryMethod: {
    method: string;
    probability: number;
  };
  fightDuration: {
    duration: string;
    probability: number;
  };
  fightPace: {
    pace: string;
    probability: number;
  };
}

// Featured fight prediction for the homepage
export interface FeaturedFight {
  fighter1: Fighter;
  fighter2: Fighter;
  fighter1WinProbability: number;
  fighter2WinProbability: number;
  eventName: string;
  eventDate: string;
  confidenceScore: number;
  comparisonStats: ComparisonStat[];
  analysis: string;
  likelyVictoryMethod: {
    method: string;
    probability: number;
  };
  fightDuration: {
    duration: string;
    probability: number;
  };
  fightPace: {
    pace: string;
    probability: number;
  };
}

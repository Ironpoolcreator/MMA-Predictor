import { Fighter, FightPrediction, ComparisonStat } from '@/types';

interface PredictionOptions {
  fightType: string;
  weightClass: string;
  venueType: string;
}

// A simple AI model to predict the outcome of a fight
export async function generatePrediction(
  fighter1: Fighter, 
  fighter2: Fighter, 
  options: PredictionOptions
): Promise<FightPrediction> {
  // In a real application, this would use TensorFlow.js or a similar library
  // to make predictions based on fighter statistics and historical data
  
  // Simulate a delay to mimic computation time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate a win probability based on record
  const fighter1Wins = fighter1.wins;
  const fighter1Losses = fighter1.losses;
  const fighter2Wins = fighter2.wins;
  const fighter2Losses = fighter2.losses;
  
  // Calculate win rates
  const fighter1WinRate = fighter1Wins / (fighter1Wins + fighter1Losses) * 100;
  const fighter2WinRate = fighter2Wins / (fighter2Wins + fighter2Losses) * 100;
  
  // Normalize to sum to 100%
  const totalWinRate = fighter1WinRate + fighter2WinRate;
  const fighter1WinProbability = Math.round((fighter1WinRate / totalWinRate) * 100);
  const fighter2WinProbability = 100 - fighter1WinProbability;
  
  // Simple fighter comparison statistics
  const comparisonStats: ComparisonStat[] = [
    {
      label: "Striking",
      key1: "strikingAccuracy",
      key2: "strikingAccuracy",
      value1: `${Math.floor(Math.random() * 30) + 50}%`,
      value2: `${Math.floor(Math.random() * 30) + 50}%`,
      percent1: Math.floor(Math.random() * 30) + 50,
      percent2: Math.floor(Math.random() * 30) + 50
    },
    {
      label: "TDD",
      key1: "takedownDefense",
      key2: "takedownDefense",
      value1: `${Math.floor(Math.random() * 25) + 70}%`,
      value2: `${Math.floor(Math.random() * 25) + 70}%`,
      percent1: Math.floor(Math.random() * 25) + 70,
      percent2: Math.floor(Math.random() * 25) + 70
    },
    {
      label: "Sub Def",
      key1: "submissionDefense",
      key2: "submissionDefense",
      value1: `${Math.floor(Math.random() * 20) + 80}%`,
      value2: `${Math.floor(Math.random() * 20) + 80}%`,
      percent1: Math.floor(Math.random() * 20) + 80,
      percent2: Math.floor(Math.random() * 20) + 80
    },
    {
      label: "KO Power",
      key1: "knockoutPower",
      key2: "knockoutPower",
      value1: `${Math.floor(Math.random() * 30) + 60}%`,
      value2: `${Math.floor(Math.random() * 30) + 60}%`,
      percent1: Math.floor(Math.random() * 30) + 60,
      percent2: Math.floor(Math.random() * 30) + 60
    }
  ];
  
  // Generate an analysis based on the fighters and fight type
  const analysis = generateAnalysis(fighter1, fighter2, fighter1WinProbability, options);
  
  // Prediction confidence score (based on fighter data quality, fight history, etc.)
  const confidenceScore = Math.floor(Math.random() * 15) + 75;
  
  // Generate likely victory methods
  const victoryMethods = [
    { method: `${fighter1WinProbability > 50 ? fighter1.name : fighter2.name} by KO/TKO`, probability: Math.floor(Math.random() * 20) + 35 },
    { method: `${fighter1WinProbability > 50 ? fighter1.name : fighter2.name} by Submission`, probability: Math.floor(Math.random() * 15) + 20 },
    { method: `${fighter1WinProbability > 50 ? fighter1.name : fighter2.name} by Decision`, probability: Math.floor(Math.random() * 20) + 40 }
  ];
  
  // Sort by probability and get the most likely
  victoryMethods.sort((a, b) => b.probability - a.probability);
  const likelyVictoryMethod = victoryMethods[0];
  
  // Fight duration prediction
  const fightDurations = [
    { duration: "1st Round Finish", probability: Math.floor(Math.random() * 30) + 10 },
    { duration: "2nd Round Finish", probability: Math.floor(Math.random() * 20) + 15 },
    { duration: "3rd Round Finish", probability: Math.floor(Math.random() * 15) + 20 },
    { duration: "4+ Rounds", probability: Math.floor(Math.random() * 25) + 30 }
  ];
  
  fightDurations.sort((a, b) => b.probability - a.probability);
  const fightDuration = fightDurations[0];
  
  // Fight pace prediction
  const fightPaces = [
    { pace: "High", probability: Math.floor(Math.random() * 30) + 30 },
    { pace: "Moderate", probability: Math.floor(Math.random() * 30) + 40 },
    { pace: "Low", probability: Math.floor(Math.random() * 20) + 20 }
  ];
  
  fightPaces.sort((a, b) => b.probability - a.probability);
  const fightPace = fightPaces[0];
  
  return {
    fighter1,
    fighter2,
    fighter1WinProbability,
    fighter2WinProbability,
    comparisonStats,
    analysis,
    confidenceScore,
    likelyVictoryMethod,
    fightDuration,
    fightPace
  };
}

// Generate an analysis of the fight
function generateAnalysis(
  fighter1: Fighter, 
  fighter2: Fighter, 
  fighter1WinProbability: number,
  options: PredictionOptions
): string {
  const favoredFighter = fighter1WinProbability > 50 ? fighter1 : fighter2;
  const underdogFighter = fighter1WinProbability > 50 ? fighter2 : fighter1;
  
  // Generate a random analysis
  const analyses = [
    `Our model gives ${favoredFighter.name} a significant edge in this matchup. Their superior striking accuracy and takedown defense will likely be the difference makers. ${underdogFighter.name} will need to disrupt ${favoredFighter.name}'s rhythm early to have a chance.`,
    
    `${favoredFighter.name} has a technical advantage in this matchup, particularly in the ${options.fightType === '5 Round Championship' ? 'championship rounds' : 'later rounds'}. ${underdogFighter.name}'s best path to victory is via early pressure and potentially catching ${favoredFighter.name} with a power shot.`,
    
    `This ${options.weightClass} bout favors ${favoredFighter.name} based on recent form and stylistic matchup. The ${options.venueType} setting historically has benefited fighters with ${favoredFighter.name}'s approach. ${underdogFighter.name} will need to implement a disciplined gameplan to overcome the odds.`,
    
    `${favoredFighter.name} holds advantages in several key metrics, including control time and defensive statistics. To win this fight, ${underdogFighter.name} will need to force exchanges in close quarters and potentially look for a submission opportunity if the fight goes to the ground.`
  ];
  
  return analyses[Math.floor(Math.random() * analyses.length)];
}

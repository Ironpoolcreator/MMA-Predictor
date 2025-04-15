import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFighters } from '@/lib/api';
import { Fighter } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight, BarChart3, PieChart, GripVertical } from 'lucide-react';
import StatComparison from '@/components/StatComparison';
import FighterSearch from '@/components/FighterSearch';
import { generatePrediction } from '@/lib/predictionModel';

export default function FighterComparison() {
  const [fighter1, setFighter1] = useState<Fighter | null>(null);
  const [fighter2, setFighter2] = useState<Fighter | null>(null);
  const [prediction, setPrediction] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: fighters = [], isLoading: fightersLoading } = useQuery({
    queryKey: ['/api/fighters'],
    queryFn: getFighters,
  });

  const handleGeneratePrediction = async () => {
    if (!fighter1 || !fighter2) return;
    
    setIsLoading(true);
    
    try {
      const result = await generatePrediction(fighter1, fighter2, {
        fightType: 'Professional',
        weightClass: fighter1.division,
        venueType: 'Arena'
      });
      
      setPrediction(result);
    } catch (error) {
      console.error('Error generating prediction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSelection = () => {
    setFighter1(null);
    setFighter2(null);
    setPrediction(null);
  };

  const handleSwapFighters = () => {
    const temp = fighter1;
    setFighter1(fighter2);
    setFighter2(temp);
    setPrediction(null);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getWinPercentage = (fighter: Fighter) => {
    const total = fighter.wins + fighter.losses + fighter.draws + (fighter.noContests || 0);
    return fighter.wins > 0 ? Math.round((fighter.wins / total) * 100) : 0;
  };

  const comparisonStats = [
    {
      label: "Win Rate",
      key1: "winRate",
      key2: "winRate",
      value1: fighter1 ? `${getWinPercentage(fighter1)}%` : "0%",
      value2: fighter2 ? `${getWinPercentage(fighter2)}%` : "0%",
      percent1: fighter1 ? getWinPercentage(fighter1) : 0,
      percent2: fighter2 ? getWinPercentage(fighter2) : 0
    },
    {
      label: "Win Streak",
      key1: "winStreak",
      key2: "winStreak",
      value1: fighter1?.winStreak?.toString() || "0",
      value2: fighter2?.winStreak?.toString() || "0",
      percent1: fighter1?.winStreak ? Math.min(fighter1.winStreak * 10, 100) : 0,
      percent2: fighter2?.winStreak ? Math.min(fighter2.winStreak * 10, 100) : 0
    },
    {
      label: "KO Power",
      key1: "knockoutPower",
      key2: "knockoutPower",
      value1: fighter1?.knockoutPower ? `${fighter1.knockoutPower}%` : "0%",
      value2: fighter2?.knockoutPower ? `${fighter2.knockoutPower}%` : "0%",
      percent1: fighter1?.knockoutPower || 0,
      percent2: fighter2?.knockoutPower || 0
    },
    {
      label: "Experience",
      key1: "experience",
      key2: "experience",
      value1: fighter1 ? `${fighter1.wins + fighter1.losses + fighter1.draws} fights` : "0 fights",
      value2: fighter2 ? `${fighter2.wins + fighter2.losses + fighter2.draws} fights` : "0 fights",
      percent1: fighter1 ? Math.min((fighter1.wins + fighter1.losses + fighter1.draws) * 3, 100) : 0,
      percent2: fighter2 ? Math.min((fighter2.wins + fighter2.losses + fighter2.draws) * 3, 100) : 0
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">
        Fighter Comparison Tool
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-3">Select Fighter 1</h2>
          <FighterSearch fighters={fighters} isLoading={fightersLoading} onSelect={setFighter1} />
          
          {fighter1 && (
            <Card className="mt-3 overflow-hidden border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
                    {getInitials(fighter1.name)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{fighter1.name}</h3>
                    <p className="text-sm text-gray-500">{fighter1.division} • {fighter1.record}</p>
                    <p className="text-xs mt-1">
                      {fighter1.wins} wins • {fighter1.losses} losses • {fighter1.draws} draws
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-3">Select Fighter 2</h2>
          <FighterSearch fighters={fighters} isLoading={fightersLoading} onSelect={setFighter2} />
          
          {fighter2 && (
            <Card className="mt-3 overflow-hidden border-l-4 border-l-red-500">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white text-xl font-bold">
                    {getInitials(fighter2.name)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{fighter2.name}</h3>
                    <p className="text-sm text-gray-500">{fighter2.division} • {fighter2.record}</p>
                    <p className="text-xs mt-1">
                      {fighter2.wins} wins • {fighter2.losses} losses • {fighter2.draws} draws
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <div className="flex justify-center space-x-4 mb-8">
        <Button 
          variant="outline" 
          onClick={handleClearSelection}
          disabled={!fighter1 && !fighter2}
        >
          Clear Selection
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleSwapFighters}
          disabled={!fighter1 || !fighter2}
          className="text-primary-600 border-primary-600"
        >
          <ArrowLeftRight className="mr-2 h-4 w-4" />
          Swap Fighters
        </Button>
        
        <Button 
          onClick={handleGeneratePrediction}
          disabled={!fighter1 || !fighter2 || isLoading}
          className="bg-primary hover:bg-primary/90"
        >
          {isLoading ? 'Generating...' : 'Generate Prediction'}
        </Button>
      </div>

      {(fighter1 && fighter2) && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <GripVertical className="mr-2 h-5 w-5 text-primary" />
            Basic Stats Comparison
          </h2>
          <StatComparison 
            fighter1={fighter1} 
            fighter2={fighter2} 
            stats={comparisonStats}
          />
        </div>
      )}

      {prediction && (
        <div className="mb-8 animate-fadeIn">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-primary" />
            Prediction Analysis
          </h2>
          
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <h3 className="text-xl font-semibold mb-3">Predicted Outcome</h3>
                  <p className="text-gray-700 mb-4">{prediction.analysis}</p>
                  
                  <div className="flex items-center mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${prediction.fighter1WinProbability}%` }}
                      ></div>
                    </div>
                    <div className="ml-2 min-w-[90px] text-sm">
                      {fighter1?.name.split(' ')[0]} {prediction.fighter1WinProbability}%
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-red-600 h-2.5 rounded-full" 
                        style={{ width: `${prediction.fighter2WinProbability}%` }}
                      ></div>
                    </div>
                    <div className="ml-2 min-w-[90px] text-sm">
                      {fighter2?.name.split(' ')[0]} {prediction.fighter2WinProbability}%
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex flex-wrap -mx-2">
                    <div className="px-2 w-full sm:w-1/2 mb-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Victory Method</h4>
                      <p className="font-medium">{prediction.likelyVictoryMethod.method}</p>
                      <p className="text-xs text-gray-500">{prediction.likelyVictoryMethod.probability}% probability</p>
                    </div>
                    
                    <div className="px-2 w-full sm:w-1/2 mb-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Fight Duration</h4>
                      <p className="font-medium">{prediction.fightDuration.duration}</p>
                      <p className="text-xs text-gray-500">{prediction.fightDuration.probability}% probability</p>
                    </div>
                    
                    <div className="px-2 w-full sm:w-1/2 mb-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Fight Pace</h4>
                      <p className="font-medium">{prediction.fightPace.pace}</p>
                      <p className="text-xs text-gray-500">{prediction.fightPace.probability}% probability</p>
                    </div>
                    
                    <div className="px-2 w-full sm:w-1/2 mb-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Confidence Score</h4>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div 
                            className={`h-2.5 rounded-full ${
                              prediction.confidenceScore > 80 ? 'bg-green-500' :
                              prediction.confidenceScore > 60 ? 'bg-yellow-500' : 
                              'bg-orange-500'
                            }`}
                            style={{ width: `${prediction.confidenceScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{prediction.confidenceScore}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-1">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <PieChart className="mr-2 h-4 w-4" />
                    Win Probability
                  </h3>
                  
                  <div className="relative h-48 w-48 mx-auto">
                    <div className="absolute inset-0 rounded-full border-8 border-gray-100">
                      <div 
                        className="absolute top-0 left-0 h-full border-8 border-blue-500 rounded-full"
                        style={{ 
                          clipPath: `polygon(50% 50%, 50% 0, ${
                            prediction.fighter1WinProbability > 50 
                              ? '100% 0, 100% 100%, 0 100%, 0 0' 
                              : `${(prediction.fighter1WinProbability/50) * 100}% 0`
                          })`
                        }}
                      ></div>
                      <div 
                        className="absolute top-0 left-0 h-full border-8 border-red-500 rounded-full"
                        style={{ 
                          clipPath: `polygon(50% 50%, 50% 0, ${
                            prediction.fighter1WinProbability <= 50 
                              ? '0 0, 0 100%, 100% 100%, 100% 0' 
                              : `${100 - ((prediction.fighter1WinProbability-50)/50) * 100}% 0`
                          })`
                        }}
                      ></div>
                    </div>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-sm font-medium">Winner</p>
                      <p className="text-lg font-bold mt-1">
                        {prediction.fighter1WinProbability > prediction.fighter2WinProbability 
                          ? fighter1?.name.split(' ')[0] 
                          : fighter2?.name.split(' ')[0]}
                      </p>
                      <p className="text-sm text-primary font-medium mt-1">
                        {Math.max(prediction.fighter1WinProbability, prediction.fighter2WinProbability)}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                      {fighter1?.name.split(' ')[0]} vs {fighter2?.name.split(' ')[0]}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Based on historical performance and stats
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
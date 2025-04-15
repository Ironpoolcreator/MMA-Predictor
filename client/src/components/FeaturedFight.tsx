import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFeaturedFight } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import StatComparison from '@/components/StatComparison';
import { Rocket, BarChart } from 'lucide-react';

export default function FeaturedFight() {
  const { data: featuredFight, isLoading } = useQuery({
    queryKey: ['/api/featured-fight'],
    queryFn: getFeaturedFight
  });

  if (isLoading || !featuredFight) {
    return <FeatureFightSkeleton />;
  }

  const { 
    fighter1, 
    fighter2, 
    fighter1WinProbability,
    fighter2WinProbability,
    eventName,
    eventDate,
    confidenceScore,
    comparisonStats,
    analysis,
    likelyVictoryMethod,
    fightDuration,
    fightPace
  } = featuredFight;

  return (
    <section className="py-10 bg-secondary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Featured Fight Prediction</h2>
          <p className="text-gray-400">{eventName} | {eventDate}</p>
        </div>

        <div className="bg-secondary-900 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
              {/* Fighter 1 */}
              <div className="md:col-span-3 flex flex-col items-center">
                <div className="relative">
                  <div className="w-48 h-48 bg-secondary-700 rounded-full border-4 border-primary flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">{fighter1.name.split(' ')[0][0]}{fighter1.name.split(' ')[1][0]}</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-win text-white text-xs px-2 py-1 rounded-full">
                    {fighter1.record}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mt-4 text-white">{fighter1.name}</h3>
                <p className="text-gray-400">
                  {fighter1.isChampion ? `${fighter1.division} Champion` : fighter1.division}
                </p>
                <div className="mt-4 flex items-center justify-center rounded-full bg-primary bg-opacity-20 px-4 py-2">
                  <span className="text-primary font-bold text-lg mr-1">{fighter1WinProbability}%</span>
                  <span className="text-sm text-gray-300">Win Probability</span>
                </div>
              </div>

              {/* VS */}
              <div className="md:col-span-1 flex flex-col items-center justify-center">
                <div className="text-gray-500 text-2xl font-bold">VS</div>
                <div className="mt-4 bg-secondary-800 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400">Prediction Confidence</p>
                  <p className="text-lg font-bold text-primary">{confidenceScore}%</p>
                </div>
              </div>

              {/* Fighter 2 */}
              <div className="md:col-span-3 flex flex-col items-center">
                <div className="relative">
                  <div className="w-48 h-48 bg-secondary-700 rounded-full border-4 border-gray-600 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">{fighter2.name.split(' ')[0][0]}{fighter2.name.split(' ')[1][0]}</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-loss text-white text-xs px-2 py-1 rounded-full">
                    {fighter2.record}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mt-4 text-white">{fighter2.name}</h3>
                <p className="text-gray-400">
                  {fighter2.isChampion ? `${fighter2.division} Champion` : fighter2.division}
                </p>
                <div className="mt-4 flex items-center justify-center rounded-full bg-gray-700 bg-opacity-20 px-4 py-2">
                  <span className="text-gray-300 font-bold text-lg mr-1">{fighter2WinProbability}%</span>
                  <span className="text-sm text-gray-400">Win Probability</span>
                </div>
              </div>
            </div>

            {/* Stat Comparison */}
            <StatComparison
              fighter1={fighter1}
              fighter2={fighter2}
              stats={comparisonStats}
            />

            {/* AI Analysis */}
            <div className="mt-8 bg-secondary-800 rounded-lg p-6">
              <h4 className="flex items-center text-lg font-semibold mb-3 text-white">
                <Rocket className="mr-2 text-primary h-5 w-5" />
                AI Fight Analysis
              </h4>
              <p className="text-gray-300 text-sm">{analysis}</p>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-secondary-900 rounded-lg p-4 border border-secondary-700">
                  <h5 className="text-sm font-semibold text-gray-300 mb-2">Likely Victory Method</h5>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">{likelyVictoryMethod.method}</span>
                    <span className="text-primary">{likelyVictoryMethod.probability}%</span>
                  </div>
                </div>
                <div className="bg-secondary-900 rounded-lg p-4 border border-secondary-700">
                  <h5 className="text-sm font-semibold text-gray-300 mb-2">Fight Duration</h5>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">{fightDuration.duration}</span>
                    <span className="text-primary">{fightDuration.probability}%</span>
                  </div>
                </div>
                <div className="bg-secondary-900 rounded-lg p-4 border border-secondary-700">
                  <h5 className="text-sm font-semibold text-gray-300 mb-2">Fight Pace</h5>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">{fightPace.pace}</span>
                    <span className="text-primary">{fightPace.probability}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Button 
                variant="outline" 
                className="bg-secondary-800 hover:bg-secondary-700 text-white font-bold"
              >
                <BarChart className="mr-2 h-5 w-5" />
                See Detailed Matchup Analysis
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureFightSkeleton() {
  return (
    <section className="py-10 bg-secondary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Featured Fight Prediction</h2>
          <Skeleton className="h-6 w-48 bg-secondary-700" />
        </div>

        <div className="bg-secondary-900 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
              {/* Fighter 1 skeleton */}
              <div className="md:col-span-3 flex flex-col items-center">
                <Skeleton className="w-48 h-48 rounded-full bg-secondary-800" />
                <Skeleton className="h-8 w-40 mt-4 bg-secondary-800" />
                <Skeleton className="h-4 w-32 mt-2 bg-secondary-800" />
                <Skeleton className="h-10 w-48 mt-4 rounded-full bg-secondary-800" />
              </div>

              {/* VS skeleton */}
              <div className="md:col-span-1 flex flex-col items-center justify-center">
                <Skeleton className="h-8 w-16 bg-secondary-800" />
                <Skeleton className="h-20 w-full mt-4 rounded-lg bg-secondary-800" />
              </div>

              {/* Fighter 2 skeleton */}
              <div className="md:col-span-3 flex flex-col items-center">
                <Skeleton className="w-48 h-48 rounded-full bg-secondary-800" />
                <Skeleton className="h-8 w-40 mt-4 bg-secondary-800" />
                <Skeleton className="h-4 w-32 mt-2 bg-secondary-800" />
                <Skeleton className="h-10 w-48 mt-4 rounded-full bg-secondary-800" />
              </div>
            </div>

            {/* Stat comparison skeleton */}
            <div className="mt-10 border-t border-secondary-700 pt-8">
              <Skeleton className="h-6 w-48 mb-6 bg-secondary-800" />
              <div className="space-y-6">
                {[1, 2, 3, 4].map(i => (
                  <Skeleton key={i} className="h-10 w-full bg-secondary-800" />
                ))}
              </div>
            </div>

            {/* Analysis skeleton */}
            <Skeleton className="mt-8 h-64 w-full rounded-lg bg-secondary-800" />

            <div className="mt-6 flex justify-center">
              <Skeleton className="h-10 w-64 rounded-lg bg-secondary-800" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

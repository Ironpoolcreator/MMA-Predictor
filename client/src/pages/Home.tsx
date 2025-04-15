import { useState } from "react";
import FighterSearch from "@/components/FighterSearch";
import FeaturedFight from "@/components/FeaturedFight";
import PredictionTool from "@/components/PredictionTool";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { getFighters } from "@/lib/api";
import { Dumbbell, BarChart } from "lucide-react";

export default function Home() {
  const [, navigate] = useLocation();
  
  const { data: fighters, isLoading } = useQuery({ 
    queryKey: ['/api/fighters'],
    queryFn: getFighters
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Predict MMA Fights with AI</h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Get data-driven predictions for upcoming fights, explore fighter stats, and analyze matchups with our advanced AI system.
            </p>
            
            <FighterSearch isLoading={isLoading} fighters={fighters || []} />
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-red-700 text-white font-bold shadow-lg transition-all"
                onClick={() => navigate('/prediction')}
              >
                <Dumbbell className="mr-2 h-5 w-5" />
                Predict Next Fight
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent hover:bg-secondary-700 text-white font-bold border-gray-600 transition-all"
              >
                <BarChart className="mr-2 h-5 w-5" />
                Explore Fighter Stats
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Fight Prediction */}
      <FeaturedFight />
      
      {/* Prediction Tool */}
      <PredictionTool />
    </div>
  );
}

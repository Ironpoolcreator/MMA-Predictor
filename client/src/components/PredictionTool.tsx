import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getFighters } from '@/lib/api';
import { RocketIcon } from 'lucide-react';

const WEIGHT_CLASSES = [
  "Heavyweight",
  "Light Heavyweight",
  "Middleweight",
  "Welterweight",
  "Lightweight",
  "Featherweight",
  "Bantamweight",
  "Flyweight",
];

const FIGHT_TYPES = [
  "5 Round Championship",
  "5 Round Main Event",
  "3 Round Non-Title",
];

const VENUE_TYPES = [
  "UFC Apex",
  "Large Arena",
  "International Event",
  "Fight Island",
];

export default function PredictionTool() {
  const [fighter1Id, setFighter1Id] = useState<string>("");
  const [fighter2Id, setFighter2Id] = useState<string>("");
  const [fightType, setFightType] = useState<string>("5 Round Championship");
  const [weightClass, setWeightClass] = useState<string>("Heavyweight");
  const [venueType, setVenueType] = useState<string>("Large Arena");
  const [, navigate] = useLocation();

  const { data: fighters, isLoading } = useQuery({
    queryKey: ['/api/fighters'],
    queryFn: getFighters
  });

  const handleGeneratePrediction = () => {
    navigate('/prediction');
  };

  return (
    <section className="py-10 bg-secondary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Create Your Own Fight Prediction
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-2">
            Select two fighters to get AI-powered match predictions and detailed analysis
          </p>
        </div>

        <div className="bg-secondary-900 rounded-xl shadow-lg overflow-hidden p-6">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
            {/* Fighter 1 Selector */}
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Select First Fighter
              </label>
              <Select
                value={fighter1Id}
                onValueChange={setFighter1Id}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full bg-secondary-800 border-secondary-700 text-white">
                  <SelectValue placeholder="Select a fighter..." />
                </SelectTrigger>
                <SelectContent className="bg-secondary-800 border-secondary-700 text-white">
                  {!isLoading && fighters && fighters.map((fighter) => (
                    <SelectItem 
                      key={fighter.id}
                      value={fighter.id.toString()}
                      className="hover:bg-secondary-700"
                    >
                      {fighter.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* VS */}
            <div className="md:col-span-1 flex items-center justify-center">
              <div className="text-gray-500 text-lg font-bold">VS</div>
            </div>

            {/* Fighter 2 Selector */}
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Select Second Fighter
              </label>
              <Select 
                value={fighter2Id}
                onValueChange={setFighter2Id}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full bg-secondary-800 border-secondary-700 text-white">
                  <SelectValue placeholder="Select a fighter..." />
                </SelectTrigger>
                <SelectContent className="bg-secondary-800 border-secondary-700 text-white">
                  {!isLoading && fighters && fighters.map((fighter) => (
                    <SelectItem 
                      key={fighter.id}
                      value={fighter.id.toString()}
                      className="hover:bg-secondary-700"
                    >
                      {fighter.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Options */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Fight Type
              </label>
              <Select value={fightType} onValueChange={setFightType}>
                <SelectTrigger className="w-full bg-secondary-800 border-secondary-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-secondary-800 border-secondary-700 text-white">
                  {FIGHT_TYPES.map((type) => (
                    <SelectItem 
                      key={type}
                      value={type}
                      className="hover:bg-secondary-700"
                    >
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Weight Class
              </label>
              <Select value={weightClass} onValueChange={setWeightClass}>
                <SelectTrigger className="w-full bg-secondary-800 border-secondary-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-secondary-800 border-secondary-700 text-white">
                  {WEIGHT_CLASSES.map((wc) => (
                    <SelectItem 
                      key={wc}
                      value={wc}
                      className="hover:bg-secondary-700"
                    >
                      {wc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Venue Type
              </label>
              <Select value={venueType} onValueChange={setVenueType}>
                <SelectTrigger className="w-full bg-secondary-800 border-secondary-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-secondary-800 border-secondary-700 text-white">
                  {VENUE_TYPES.map((venue) => (
                    <SelectItem 
                      key={venue}
                      value={venue}
                      className="hover:bg-secondary-700"
                    >
                      {venue}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Generate Button */}
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-red-700 text-white font-bold px-8 shadow-md"
              onClick={handleGeneratePrediction}
            >
              <RocketIcon className="mr-2 h-5 w-5" />
              Generate Prediction
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

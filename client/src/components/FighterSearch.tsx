import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Fighter } from '@/types';

interface FighterSearchProps {
  fighters: Fighter[];
  isLoading: boolean;
  onSelect?: (fighter: Fighter) => void;
}

export default function FighterSearch({ fighters, isLoading, onSelect }: FighterSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [filteredFighters, setFilteredFighters] = useState<Fighter[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    if (searchTerm && fighters.length > 0) {
      const filtered = fighters.filter(fighter => 
        fighter.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFighters(filtered.slice(0, 5));
      setShowResults(true);
    } else {
      setFilteredFighters([]);
      setShowResults(false);
    }
  }, [searchTerm, fighters]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const handleFighterSelect = (id: number) => {
    const fighter = fighters.find(f => f.id === id);
    if (fighter) {
      if (onSelect) {
        // If onSelect is provided, call it with the selected fighter
        onSelect(fighter);
      } else {
        // Otherwise navigate to the fighter's profile page
        navigate(`/fighter/${id}`);
      }
    }
    setShowResults(false);
    setSearchTerm('');
  };

  return (
    <div className="relative max-w-2xl mb-8" ref={searchRef}>
      <div className="flex rounded-md shadow-sm">
        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-secondary-700 bg-secondary-800 text-gray-400">
          <Search className="h-5 w-5" />
        </span>
        <Input
          className="flex-1 min-w-0 block w-full px-3 py-3 rounded-none rounded-r-md text-white bg-secondary-800 border border-secondary-700 focus:ring-primary focus:border-primary"
          placeholder="Search fighters, e.g. 'Jon Jones', 'Israel Adesanya'..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm && setShowResults(true)}
          disabled={isLoading}
        />
      </div>
      {showResults && (
        <div className="absolute mt-1 w-full rounded-md bg-secondary-800 shadow-lg z-20">
          {filteredFighters.length > 0 ? (
            filteredFighters.map(fighter => (
              <div
                key={fighter.id}
                className="block px-4 py-2 hover:bg-secondary-700 text-white flex items-center cursor-pointer"
                onClick={() => handleFighterSelect(fighter.id)}
              >
                <span className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 mr-3 overflow-hidden">
                  {fighter.image ? (
                    <img src={fighter.image} alt={fighter.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="flex items-center justify-center h-full text-xs">👤</span>
                  )}
                </span>
                <span>{fighter.name}</span>
                <span className="ml-auto text-xs text-gray-400">{fighter.division}</span>
              </div>
            ))
          ) : (
            <div className="block px-4 py-2 text-gray-400">
              No fighters found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

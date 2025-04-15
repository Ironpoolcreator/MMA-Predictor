import { useState, useEffect } from 'react';
import { getFighters } from '@/lib/api';
import { Fighter } from '@/types';

export function useSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [results, setResults] = useState<Fighter[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load fighters on mount
  useEffect(() => {
    const loadFighters = async () => {
      setIsLoading(true);
      try {
        const data = await getFighters();
        setFighters(data);
        setError(null);
      } catch (err) {
        setError('Failed to load fighters data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFighters();
  }, []);

  // Filter fighters based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const filtered = fighters.filter(fighter =>
      fighter.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setResults(filtered);
  }, [searchTerm, fighters]);

  return {
    searchTerm,
    setSearchTerm,
    results,
    isLoading,
    error
  };
}

import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Fighter } from '@/types';

interface FighterCardProps {
  fighter: Fighter;
}

export default function FighterCard({ fighter }: FighterCardProps) {
  return (
    <Link href={`/fighter/${fighter.id}`}>
      <Card className="bg-secondary-800 hover:bg-secondary-700 transition-colors cursor-pointer border-secondary-700">
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-secondary-900 mr-4 flex-shrink-0 flex items-center justify-center">
              <span className="text-white font-bold">
                {fighter.name.split(' ')[0][0]}{fighter.name.split(' ')[1] ? fighter.name.split(' ')[1][0] : ''}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{fighter.name}</h3>
              <p className="text-sm text-gray-400">
                {fighter.isChampion ? (
                  <span className="text-primary font-medium">{fighter.division} Champion</span>
                ) : fighter.division}
              </p>
              <div className="mt-1 text-xs text-gray-500">{fighter.record}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

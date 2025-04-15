import { Fighter, ComparisonStat } from '@/types';

interface StatComparisonProps {
  fighter1: Fighter;
  fighter2: Fighter;
  stats: ComparisonStat[];
}

export default function StatComparison({ fighter1, fighter2, stats }: StatComparisonProps) {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-6">
      <div className="grid grid-cols-11 gap-4 mb-6">
        <div className="col-span-5 text-center">
          <div className="font-semibold text-blue-600">
            {fighter1.name}
          </div>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-5 text-center">
          <div className="font-semibold text-red-600">
            {fighter2.name}
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {stats.map((stat, index) => (
          <div key={index} className="grid grid-cols-11 gap-2 items-center">
            <div className="col-span-2 text-right text-sm">
              <span className={stat.percent1 > stat.percent2 ? "text-blue-600 font-bold" : "text-gray-700"}>
                {stat.value1}
              </span>
            </div>
            <div className="col-span-3">
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full" 
                  style={{ width: `${stat.percent1}%` }}
                ></div>
              </div>
            </div>
            <div className="col-span-1 text-center text-xs text-gray-500 font-medium">{stat.label}</div>
            <div className="col-span-3">
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-red-500 h-3 rounded-full" 
                  style={{ width: `${stat.percent2}%` }}
                ></div>
              </div>
            </div>
            <div className="col-span-2 text-left text-sm">
              <span className={stat.percent2 > stat.percent1 ? "text-red-600 font-bold" : "text-gray-700"}>
                {stat.value2}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

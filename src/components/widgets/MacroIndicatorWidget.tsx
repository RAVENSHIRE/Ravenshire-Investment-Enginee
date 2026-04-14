import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { WidgetContainer } from './WidgetContainer';

interface Indicator {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  data: { name: string; value: number }[];
}

const mockData = (base: number) => Array.from({ length: 10 }, (_, i) => ({
  name: `${i}:00`,
  value: base + Math.random() * 100 - 50
}));

const INITIAL_INDICATORS: Indicator[] = [
  { label: 'US 10Y Yield', value: '4.321%', change: '+0.045', trend: 'up', data: mockData(4000) },
  { label: 'DXY Index', value: '104.12', change: '-0.23', trend: 'down', data: mockData(10400) },
  { label: 'Brent Crude', value: '$84.12', change: '+$1.24', trend: 'up', data: mockData(8400) },
  { label: 'Gold Spot', value: '$2,341.50', change: '-$12.40', trend: 'down', data: mockData(23400) },
];

export const MacroIndicatorWidget: React.FC = () => {
  const [indicators, setIndicators] = useState<Indicator[]>(INITIAL_INDICATORS);
  const [selected, setSelected] = useState<Indicator>(INITIAL_INDICATORS[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <WidgetContainer title="Macro Indicators" icon={<Activity className="w-3 h-3" />}>
        <div className="p-8 flex flex-col items-center justify-center h-full space-y-4">
          <div className="w-8 h-8 border-2 border-terminal-accent border-t-transparent rounded-full animate-spin" />
          <span className="text-[10px] font-mono text-terminal-muted uppercase animate-pulse">Fetching Real-time Data...</span>
        </div>
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer title="Macro Indicators" icon={<Activity className="w-3 h-3" />}>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-terminal-surface z-10">
              <tr>
                <th className="terminal-grid-cell text-terminal-muted font-normal">Indicator</th>
                <th className="terminal-grid-cell text-terminal-muted font-normal text-right">Value</th>
                <th className="terminal-grid-cell text-terminal-muted font-normal text-right">Chg</th>
              </tr>
            </thead>
            <tbody>
              {indicators.map((ind, i) => (
                <tr 
                  key={i} 
                  onClick={() => setSelected(ind)}
                  className={cn(
                    "hover:bg-terminal-border/30 transition-colors cursor-pointer",
                    selected.label === ind.label && "bg-terminal-accent/10"
                  )}
                >
                  <td className="terminal-grid-cell">{ind.label}</td>
                  <td className="terminal-grid-cell text-right font-bold">{ind.value}</td>
                  <td className={cn(
                    "terminal-grid-cell text-right font-bold",
                    ind.trend === 'up' ? "text-terminal-green" : "text-terminal-red"
                  )}>
                    {ind.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-terminal-border bg-terminal-bg/50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-mono text-terminal-accent uppercase font-bold">{selected.label}</span>
            <span className={cn(
              "text-[10px] font-mono font-bold",
              selected.trend === 'up' ? "text-terminal-green" : "text-terminal-red"
            )}>{selected.change}</span>
          </div>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={selected.data}>
                <defs>
                  <linearGradient id="indicatorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis dataKey="name" hide />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#121212', border: '1px solid #262626', fontSize: '10px' }}
                  itemStyle={{ color: '#E5E5E5' }}
                />
                <Area type="monotone" dataKey="value" stroke="#F97316" fillOpacity={1} fill="url(#indicatorGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

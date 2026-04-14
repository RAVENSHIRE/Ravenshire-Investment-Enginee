import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Globe, TrendingUp, TrendingDown, Ship, ShieldAlert, AlertCircle } from 'lucide-react';
import { WidgetContainer } from './WidgetContainer';

interface Dependency {
  from: string;
  to: string;
  item: string;
  status: string;
  risk: 'High' | 'Medium' | 'Low';
}

const DEPENDENCIES: Dependency[] = [
  { from: 'Taiwan', to: 'USA', item: 'Semiconductors', status: 'Critical', risk: 'High' },
  { from: 'Germany', to: 'China', item: 'Automotive', status: 'Stable', risk: 'Low' },
  { from: 'Saudi Arabia', to: 'Global', item: 'Crude Oil', status: 'Tight', risk: 'Medium' },
  { from: 'Australia', to: 'Japan', item: 'Iron Ore', status: 'Stable', risk: 'Low' },
];

export const WorldviewMapWidget: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [progress, setProgress] = useState(0);
  const [dependencies, setDependencies] = useState<Dependency[]>([]);

  useEffect(() => {
    const fetchSupplyChainData = async () => {
      try {
        const response = await fetch('/api/supply-chain');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setDependencies(data);
        setStatus('ready');
      } catch (error) {
        console.error('Supply Chain Fetch Error:', error);
        setStatus('error');
      }
    };

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    fetchSupplyChainData();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <WidgetContainer 
      title="Global Supply Chain Visualization" 
      icon={<Globe className="w-3 h-3" />}
      className="lg:col-span-2"
    >
      <div className="relative h-full flex flex-col">
        {status === 'loading' ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-6 bg-terminal-bg/50">
            <div className="relative">
              <Globe className="w-24 h-24 text-terminal-border animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-b-2 border-terminal-accent rounded-full animate-spin" />
              </div>
            </div>
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-[10px] font-mono text-terminal-muted uppercase">
                <span>Initializing Map Engine</span>
                <span>{Math.floor(progress)}%</span>
              </div>
              <div className="h-1 bg-terminal-border w-full overflow-hidden">
                <div className="h-full bg-terminal-accent transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              <div className="text-[9px] font-mono text-terminal-muted text-center animate-pulse">
                Loading Geopolitical Risk Datasets...
              </div>
            </div>
          </div>
        ) : status === 'error' ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4 text-terminal-red">
            <AlertCircle className="w-12 h-12" />
            <span className="text-xs font-mono uppercase">Failed to load visualization engine</span>
            <button onClick={() => setStatus('loading')} className="terminal-btn">Retry Connection</button>
          </div>
        ) : (
          <div className="flex-1 relative overflow-hidden">
            {/* Simple Grid Map Simulation */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#262626 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="text-center space-y-4 opacity-40">
                <Globe className="w-32 h-32 text-terminal-border mx-auto" />
                <div className="font-mono text-xs text-terminal-muted uppercase tracking-[0.2em]">
                  Live Worldview Active
                </div>
              </div>
              
              {/* Interactive Data Points */}
              <div className="absolute top-1/4 left-1/4 group cursor-pointer">
                <div className="w-2 h-2 bg-terminal-accent rounded-full animate-ping" />
                <div className="absolute top-4 left-0 bg-terminal-surface border border-terminal-border p-3 hidden group-hover:block z-20 w-56 shadow-2xl">
                  <div className="text-[10px] font-bold text-terminal-accent mb-2 uppercase border-b border-terminal-border pb-1">North America</div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-terminal-muted">Tech Sentiment</span>
                      <span className="text-terminal-green">Bullish</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-terminal-muted">Energy Demand</span>
                      <span className="text-terminal-amber">Extreme</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-terminal-muted">Inflation Risk</span>
                      <span className="text-terminal-amber">Moderate</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-1/3 right-1/4 group cursor-pointer">
                <div className="w-2 h-2 bg-terminal-red rounded-full animate-ping" />
                <div className="absolute top-4 left-0 bg-terminal-surface border border-terminal-border p-3 hidden group-hover:block z-20 w-56 shadow-2xl">
                  <div className="text-[10px] font-bold text-terminal-red mb-2 uppercase border-b border-terminal-border pb-1">East Asia</div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-terminal-muted">Supply Chain</span>
                      <span className="text-terminal-red">Bottleneck</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-terminal-muted">Geopolitical</span>
                      <span className="text-terminal-amber">Elevated</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Overlay: Dependencies */}
            <div className="absolute bottom-0 left-0 right-0 bg-terminal-surface/90 backdrop-blur border-t border-terminal-border p-4">
              <div className="text-[10px] font-mono text-terminal-muted uppercase mb-3 flex items-center gap-2">
                <Ship className="w-3 h-3" /> Critical Dependencies
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {dependencies.map((dep, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-terminal-text">{dep.from} → {dep.to}</span>
                      <span className={cn(
                        dep.risk === 'High' ? "text-terminal-red" : dep.risk === 'Medium' ? "text-terminal-amber" : "text-terminal-green"
                      )}>{dep.risk}</span>
                    </div>
                    <div className="text-[10px] text-terminal-muted uppercase">{dep.item}</div>
                    <div className="h-1 bg-terminal-border w-full">
                      <div className={cn(
                        "h-full",
                        dep.risk === 'High' ? "bg-terminal-red w-full" : dep.risk === 'Medium' ? "bg-terminal-amber w-1/2" : "bg-terminal-green w-1/4"
                      )} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </WidgetContainer>
  );
};

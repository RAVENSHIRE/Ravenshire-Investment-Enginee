import React from 'react';
import { cn } from '@/lib/utils';
import { 
  ShieldAlert,
  Activity
} from 'lucide-react';
import { MacroIndicatorWidget } from '@/components/widgets/MacroIndicatorWidget';
import { WorldviewMapWidget } from '@/components/widgets/WorldviewMapWidget';

export const MarketOverview: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px]">
        <MacroIndicatorWidget />
        <WorldviewMapWidget />
      </div>

      {/* Bottom Row: Geopolitical News & Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'OPEC+ Meeting', desc: 'Production cuts likely to be extended through Q3.', status: 'Alert', color: 'text-terminal-amber' },
          { title: 'Fed Minutes', desc: 'Hawkish tone surprises markets; rate cut expectations pushed to Dec.', status: 'Critical', color: 'text-terminal-red' },
          { title: 'TSMC Earnings', desc: 'Strong AI demand offsets mobile weakness.', status: 'Positive', color: 'text-terminal-green' },
          { title: 'EU Regulation', desc: 'New AI Act implementation phase begins.', status: 'Neutral', color: 'text-terminal-accent' },
        ].map((alert, i) => (
          <div key={i} className="terminal-card p-3 space-y-2 hover:border-terminal-muted transition-colors cursor-pointer group">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest group-hover:text-terminal-accent transition-colors">{alert.title}</span>
              <ShieldAlert className={cn("w-3 h-3", alert.color)} />
            </div>
            <p className="text-xs text-terminal-muted leading-relaxed">{alert.desc}</p>
            <div className="flex justify-between items-center pt-2">
              <span className={cn("text-[10px] font-mono uppercase", alert.color)}>{alert.status}</span>
              <span className="text-[9px] font-mono text-terminal-border">2m ago</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

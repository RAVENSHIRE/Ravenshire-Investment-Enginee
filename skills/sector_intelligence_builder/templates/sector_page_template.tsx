import React from 'react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TrendingUp, TrendingDown, Calendar, Zap, Activity, ShoppingCart, Coins, Heart, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Stock {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  metric: string;
  metricValue: string;
}

interface Narrative {
  num: string;
  title: string;
  body: string;
}

interface Catalyst {
  date: string;
  event: string;
  desc: string;
}

interface SectorPageProps {
  data: {
    title: string;
    subtitle: string;
    catalyst: string;
    icon: string;
    color: string;
    accentColor: string;
    borderColor: string;
    stocks: Stock[];
    narratives: Narrative[];
    catalysts: Catalyst[];
  };
}

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Zap,
  Activity,
  ShoppingCart,
  Coins,
  Heart
};

export default function SectorPage({ data }: SectorPageProps) {
  const Icon = ICON_MAP[data.icon] || Zap;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-blue-500/30">
      {/* Live Ticker Strip */}
      <div className="bg-zinc-900 border-b border-zinc-800 py-2 overflow-hidden whitespace-nowrap">
        <motion.div 
          className="flex gap-12 items-center"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...data.stocks, ...data.stocks].map((stock, i) => (
            <div key={i} className="flex items-center gap-2 font-mono text-xs">
              <span className={cn("font-bold", data.accentColor)}>{stock.ticker}</span>
              <span className={stock.change >= 0 ? "text-emerald-400" : "text-rose-400"}>
                ${stock.price.toFixed(2)} {stock.change >= 0 ? "▲" : "▼"} {Math.abs(stock.changePercent)}%
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 p-8 md:p-12">
          <div className={cn("absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none bg-gradient-to-br", data.color)} />
          
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
              <div className={cn("p-2 rounded-lg bg-zinc-950 border border-zinc-800", data.accentColor)}>
                <Icon size={20} />
              </div>
              <Badge variant="outline" className={cn("px-3 py-1", data.borderColor, data.accentColor)}>
                {data.title} — INSTITUTIONAL MONITOR
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              {data.catalyst}
            </h1>
            
            <p className="text-lg text-zinc-400 leading-relaxed">
              {data.subtitle}. High-signal analysis of the structural shifts defining the next market cycle.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-zinc-800" />
                ))}
              </div>
              <span className="text-xs text-zinc-500 font-mono">42 ANALYSTS TRACKING LIVE</span>
            </div>
          </div>
        </section>

        {/* Breaking News Alert */}
        <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start">
          <div className="flex items-center gap-2 px-3 py-1 bg-rose-500 text-white text-[10px] font-bold rounded uppercase tracking-widest shrink-0">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            Breaking
          </div>
          <p className="text-sm font-medium text-zinc-200">
            <span className="text-rose-400 font-bold">LATEST:</span> Hyperscaler capex projections for 2026 revised upwards by 15% following breakthrough in energy-efficient inference clusters.
          </p>
        </div>

        {/* Core Narratives */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Core Narratives</h2>
            <Separator className="flex-1 bg-zinc-800" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Strategic Theses</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.narratives.map((n) => (
              <Card key={n.num} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors group">
                <CardHeader className="pb-2">
                  <div className={cn("text-[10px] font-mono font-bold mb-2", data.accentColor)}>{n.num} — THESIS</div>
                  <CardTitle className="text-xl group-hover:text-white transition-colors">{n.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-400 leading-relaxed">{n.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Top Companies */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Top 10 Disruptors</h2>
            <Separator className="flex-1 bg-zinc-800" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Conviction List</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.stocks.map((stock) => (
              <Card key={stock.ticker} className="bg-zinc-900 border-zinc-800 overflow-hidden group">
                <div className="p-6 border-b border-zinc-800 flex justify-between items-start">
                  <div>
                    <div className={cn("text-2xl font-mono font-bold", data.accentColor)}>{stock.ticker}</div>
                    <div className="text-xs text-zinc-500">{stock.name}</div>
                  </div>
                  <div className="text-right">
                    <div className={cn("text-xl font-mono font-bold", stock.change >= 0 ? "text-emerald-400" : "text-rose-400")}>
                      ${stock.price.toFixed(2)}
                    </div>
                    <div className="text-[10px] font-mono text-zinc-500">
                      {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)} ({stock.changePercent}%)
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-zinc-950/30 flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{stock.metric}</div>
                    <div className="text-sm font-bold text-zinc-200">{stock.metricValue}</div>
                  </div>
                  <button className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest hover:text-white transition-colors">
                    View Memo <ChevronRight size={12} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Catalyst Timeline */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Catalyst Timeline</h2>
            <Separator className="flex-1 bg-zinc-800" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">2026 Roadmap</span>
          </div>

          <div className="relative pl-8 space-y-12 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-zinc-800">
            {data.catalysts.map((c, i) => (
              <div key={i} className="relative">
                <div className={cn("absolute -left-10 top-1.5 w-4 h-4 rounded-full border-4 border-zinc-950 bg-zinc-800", i === 0 && "bg-blue-500 animate-pulse")} />
                <div className="space-y-2">
                  <div className={cn("text-[10px] font-mono font-bold uppercase tracking-widest", data.accentColor)}>
                    {c.date}
                  </div>
                  <h3 className="text-xl font-bold">{c.event}</h3>
                  <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800 py-12 bg-zinc-950">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-zinc-400">ORBIT INTEL</span>
            <p className="text-xs text-zinc-600 max-w-xs">
              Institutional-grade market intelligence powered by Fincept x Swissquote. 
              Asymmetric insights for the AI-first era.
            </p>
          </div>
          <div className="flex gap-8 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
            <span>Bloomberg: ORBIT &lt;GO&gt;</span>
            <span>Reuters: ORBIT.INTEL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

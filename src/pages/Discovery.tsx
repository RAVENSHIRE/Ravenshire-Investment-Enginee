import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { io } from 'socket.io-client';
import { 
  Search, 
  Zap, 
  TrendingUp, 
  Users, 
  Eye, 
  ArrowUpRight,
  Sparkles,
  Activity,
  BarChart3,
  Plus,
  ChevronRight,
  Info,
  X
} from 'lucide-react';

const INITIAL_SIGNALS = [
  { id: '1', type: 'Unusual Volume', asset: 'RDW', name: 'Redwire Corp', signal: '+450% Vol', desc: 'Massive accumulation in space infrastructure provider ahead of Artemis II milestones.', conviction: 'High', stats: { mktCap: '$450M', pe: 'N/A', volume: '1.2M' }, price: 8.45 },
  { id: '2', type: 'Narrative Shift', asset: 'OKLO', name: 'Oklo Inc', signal: 'Nuclear AI', desc: 'Social mentions of "AI Nuclear" up 300% this week. Oklo emerging as key SMR play.', conviction: 'Medium', stats: { mktCap: '$1.2B', pe: 'N/A', volume: '800K' }, price: 14.20 },
  { id: '3', type: 'Insider Activity', asset: 'PL', name: 'Planet Labs', signal: 'CEO Buy', desc: 'CEO purchased $2M worth of shares at $22.50. First major buy in 12 months.', conviction: 'High', stats: { mktCap: '$800M', pe: 'N/A', volume: '2.1M' }, price: 22.50 },
  { id: '4', type: 'Whale Alert', asset: 'SOL', name: 'Solana', signal: 'Large Inflow', desc: 'Institutional wallet moved $150M SOL from exchange to cold storage.', conviction: 'Medium', stats: { mktCap: '$65B', pe: 'N/A', volume: '$2.4B' }, price: 345.20 },
];

export const Discovery: React.FC = () => {
  const [signals, setSignals] = useState(INITIAL_SIGNALS);
  const [loading, setLoading] = useState(true);
  const [matrixStatus, setMatrixStatus] = useState<'loading' | 'ready'>('loading');
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const selectedAssetData = signals.find(s => s.asset === selectedAsset);

  useEffect(() => {
    const socket = io();

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('market-update', (updates: any[]) => {
      setSignals(prevSignals => 
        prevSignals.map(sig => {
          const update = updates.find(u => u.symbol === sig.asset);
          if (update) {
            return {
              ...sig,
              price: update.price,
              signal: `${update.change >= 0 ? '+' : ''}${update.change}%`
            };
          }
          return sig;
        })
      );
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleAddToWatchlist = (e: React.MouseEvent, asset: string) => {
    e.stopPropagation();
    console.log(`Adding ${asset} to watchlist`);
    // Visual feedback could be added here
  };

  return (
    <div className="p-4 space-y-6">
      {/* Detail View Modal */}
      {selectedAsset && selectedAssetData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-terminal-bg/80 backdrop-blur-sm p-4">
          <div className="terminal-card w-full max-w-2xl p-6 space-y-6 shadow-2xl border-terminal-amber/30">
            <div className="flex justify-between items-center border-b border-terminal-border pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-terminal-amber/10 border border-terminal-amber/20 flex items-center justify-center">
                  <span className="text-xl font-mono font-bold text-terminal-amber">{selectedAssetData.asset}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedAssetData.name}</h2>
                  <span className="text-[10px] font-mono text-terminal-muted uppercase">{selectedAssetData.type} Signal</span>
                </div>
              </div>
              <button onClick={() => setSelectedAsset(null)} className="text-terminal-muted hover:text-terminal-text">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="space-y-2">
                  <div className="text-[10px] font-mono text-terminal-muted uppercase">AI Signal Analysis</div>
                  <p className="text-sm leading-relaxed text-terminal-text italic">
                    {selectedAssetData.desc} The convergence of institutional flow and social momentum suggests a significant breakout is imminent.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-terminal-surface border border-terminal-border space-y-1">
                    <div className="text-[9px] font-mono text-terminal-muted uppercase">Momentum Score</div>
                    <div className="text-lg font-mono font-bold text-terminal-green">94/100</div>
                  </div>
                  <div className="p-3 bg-terminal-surface border border-terminal-border space-y-1">
                    <div className="text-[9px] font-mono text-terminal-muted uppercase">Risk Rating</div>
                    <div className="text-lg font-mono font-bold text-terminal-amber">Medium</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-[10px] font-mono text-terminal-muted uppercase">Key Stats</div>
                <div className="space-y-2">
                  {Object.entries(selectedAssetData.stats).map(([key, val]) => (
                    <div key={key} className="flex justify-between text-xs border-b border-terminal-border pb-1">
                      <span className="text-terminal-muted capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-mono font-bold">{val}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={(e) => { handleAddToWatchlist(e, selectedAsset); setSelectedAsset(null); }}
                  className="w-full terminal-btn bg-terminal-amber text-white border-none py-2 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add to Watchlist
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-terminal-border flex justify-end gap-3">
              <button 
                onClick={() => alert(`Accessing institutional research for ${selectedAssetData.asset}...`)}
                className="terminal-btn"
              >
                View Full Research
              </button>
              <button 
                onClick={() => alert(`Redirecting to institutional trading desk for ${selectedAssetData.asset}...`)}
                className="terminal-btn bg-terminal-accent text-white border-none"
              >
                Trade Now
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-terminal-amber">
            <Sparkles className="w-5 h-5" />
            <span className="font-mono text-xs uppercase tracking-[0.3em]">Market Discovery</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">AI-Curated Signals & Hidden Gems</h1>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-terminal-muted" />
            <input 
              type="text" 
              placeholder="Filter signals..." 
              className="bg-terminal-surface border border-terminal-border py-1.5 pl-10 pr-4 text-xs font-mono focus:outline-none focus:border-terminal-accent"
            />
          </div>
        </div>
      </div>

      {/* Top Section: Emerging Narratives */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="terminal-header">
            <span>High-Conviction Signals</span>
            <Activity className="w-3 h-3 text-terminal-amber" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="terminal-card p-4 space-y-4 animate-pulse">
                  <div className="flex justify-between">
                    <div className="h-3 w-20 bg-terminal-border" />
                    <div className="h-3 w-12 bg-terminal-border rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-6 w-16 bg-terminal-border" />
                    <div className="h-3 w-24 bg-terminal-border" />
                  </div>
                  <div className="h-12 w-full bg-terminal-border" />
                </div>
              ))
            ) : (
              signals.map((sig) => (
                <div 
                  key={sig.id} 
                  onClick={() => setSelectedAsset(sig.asset)}
                  className={cn(
                    "terminal-card p-4 space-y-3 hover:border-terminal-amber transition-all cursor-pointer group relative overflow-hidden",
                    selectedAsset === sig.asset && "border-terminal-amber ring-1 ring-terminal-amber/20"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono font-bold text-terminal-amber uppercase tracking-widest">{sig.type}</span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-terminal-amber/10 border border-terminal-amber/20 rounded-full">
                        <span className="text-[9px] font-mono text-terminal-amber uppercase font-bold">{sig.conviction}</span>
                      </div>
                      <button 
                        onClick={(e) => handleAddToWatchlist(e, sig.asset)}
                        className="p-1 hover:text-terminal-accent transition-colors"
                        title="Add to Watchlist"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xl font-mono font-bold text-terminal-text group-hover:text-terminal-amber transition-colors">
                        {sig.asset}
                        {isConnected && (
                          <span className="ml-2 w-1.5 h-1.5 bg-terminal-green rounded-full inline-block animate-pulse" />
                        )}
                      </div>
                      <div className="text-[10px] text-terminal-muted uppercase">{sig.name}</div>
                    </div>
                    <div className="text-right">
                      <div className={cn(
                        "text-xs font-mono font-bold",
                        sig.signal.startsWith('+') ? "text-terminal-green" : "text-terminal-red"
                      )}>{sig.signal}</div>
                      <div className="text-[9px] text-terminal-muted uppercase">Live Momentum</div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-terminal-muted leading-relaxed border-t border-terminal-border pt-3">
                    {sig.desc}
                  </p>
                  
                  {/* Quick Stats on Hover */}
                  <div className="absolute inset-x-0 bottom-0 bg-terminal-surface border-t border-terminal-border p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200 flex justify-around items-center">
                    <div className="text-center">
                      <div className="text-[8px] text-terminal-muted uppercase">Mkt Cap</div>
                      <div className="text-[10px] font-mono font-bold">{sig.stats.mktCap}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[8px] text-terminal-muted uppercase">P/E</div>
                      <div className="text-[10px] font-mono font-bold">{sig.stats.pe}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[8px] text-terminal-muted uppercase">Volume</div>
                      <div className="text-[10px] font-mono font-bold">{sig.stats.volume}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 group-hover:opacity-0 transition-opacity">
                    <div className="flex -space-x-1.5">
                      {[1, 2, 3].map(j => (
                        <div key={j} className="w-5 h-5 rounded-full border border-terminal-bg bg-terminal-surface" />
                      ))}
                      <span className="text-[9px] font-mono text-terminal-muted ml-3">+124 tracking</span>
                    </div>
                    <button className="text-[10px] font-mono text-terminal-accent uppercase hover:underline flex items-center gap-1">
                      Analyze <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Trending Themes */}
        <div className="space-y-4">
          <div className="terminal-header">
            <span>Trending Narratives</span>
            <TrendingUp className="w-3 h-3 text-terminal-green" />
          </div>
          
          <div className="space-y-3">
            {[
              { theme: 'Orbital Computing', momentum: '+124%', sentiment: 'Bullish' },
              { theme: 'SMR Nuclear', momentum: '+89%', sentiment: 'Bullish' },
              { theme: 'DePIN Infrastructure', momentum: '+56%', sentiment: 'Neutral' },
              { theme: 'AI Drug Discovery', momentum: '+42%', sentiment: 'Bullish' },
              { theme: 'Quantum Security', momentum: '+12%', sentiment: 'Neutral' },
            ].map((theme, i) => (
              <div key={i} className="terminal-card p-3 flex justify-between items-center group cursor-pointer hover:bg-terminal-surface transition-colors">
                <div className="space-y-1">
                  <div className="text-xs font-bold group-hover:text-terminal-accent transition-colors">{theme.theme}</div>
                  <div className="text-[9px] font-mono text-terminal-muted uppercase">Sentiment: <span className={theme.sentiment === 'Bullish' ? 'text-terminal-green' : 'text-terminal-text'}>{theme.sentiment}</span></div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-terminal-green">{theme.momentum}</div>
                  <div className="text-[9px] font-mono text-terminal-muted uppercase">7D Growth</div>
                </div>
              </div>
            ))}
          </div>

          <div className="terminal-card p-4 bg-terminal-amber/5 border-terminal-amber/20">
            <div className="flex items-center gap-2 text-terminal-amber mb-2">
              <Zap className="w-4 h-4" />
              <span className="text-[10px] font-mono font-bold uppercase">Alpha Alert</span>
            </div>
            <p className="text-xs text-terminal-muted leading-relaxed mb-4">
              Unusual options activity detected in <span className="text-terminal-text font-bold">LUNR</span> (Intuitive Machines). $5M in call premiums for Oct $25 strike.
            </p>
            <button 
              onClick={() => alert("Opening real-time options flow for LUNR...")}
              className="w-full terminal-btn border-terminal-amber/50 text-terminal-amber hover:bg-terminal-amber/10"
            >
              View Options Flow
            </button>
          </div>
        </div>
      </div>

      {/* Discovery Matrix */}
      <div className="terminal-card">
        <div className="terminal-header">
          <span>Discovery Matrix (Beta)</span>
          <BarChart3 className="w-3 h-3" />
        </div>
        <div className="h-64 flex items-center justify-center bg-terminal-bg/50 relative overflow-hidden">
          {matrixStatus === 'loading' ? (
            <div className="text-center space-y-4">
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 border-2 border-terminal-accent/20 rounded-full" />
                <div className="absolute inset-0 border-t-2 border-terminal-accent rounded-full animate-spin" />
              </div>
              <div className="font-mono text-xs text-terminal-muted uppercase tracking-widest animate-pulse">Visualizing Multi-Factor Alpha Signals...</div>
            </div>
          ) : (
            <div className="w-full h-full p-8 grid grid-cols-8 grid-rows-4 gap-2 opacity-40">
              {Array.from({ length: 32 }).map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "border border-terminal-border transition-colors duration-500",
                    Math.random() > 0.8 ? "bg-terminal-accent/20 border-terminal-accent/40" : "bg-terminal-surface"
                  )} 
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-terminal-surface/80 backdrop-blur border border-terminal-border p-4 text-center space-y-2">
                  <Info className="w-5 h-5 text-terminal-accent mx-auto" />
                  <div className="text-xs font-bold uppercase">Matrix Engine Ready</div>
                  <p className="text-[10px] text-terminal-muted max-w-xs">Cross-referencing 142 alpha factors across 4,200 assets. Select a signal above to focus the matrix.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

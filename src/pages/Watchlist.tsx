import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Plus, 
  Filter, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  MoreHorizontal,
  Bell,
  BrainCircuit,
  ArrowUpRight,
  ArrowDownRight,
  Trash2,
  ChevronDown,
  ChevronUp,
  Search,
  X
} from 'lucide-react';

interface Asset {
  symbol: string;
  name: string;
  price: string;
  change: string;
  trend: 'up' | 'down';
  sentiment: string;
  aiInsight: string;
  details?: {
    volume: string;
    mktCap: string;
    high52: string;
    low52: string;
  };
}

const INITIAL_ASSETS: Asset[] = [
  { 
    symbol: 'NVDA', 
    name: 'NVIDIA Corp', 
    price: '1,245.50', 
    change: '+4.2%', 
    trend: 'up', 
    sentiment: 'Bullish', 
    aiInsight: 'Rubin architecture launch is the next multi-billion dollar catalyst.',
    details: { volume: '45.2M', mktCap: '$3.2T', high52: '1,250.00', low52: '450.20' }
  },
  { symbol: 'BTC', name: 'Bitcoin', price: '64,210.12', change: '-1.2%', trend: 'down', sentiment: 'Neutral', aiInsight: 'Institutional accumulation slowing at $65k resistance.' },
  { symbol: 'LLY', name: 'Eli Lilly', price: '945.20', change: '+3.5%', trend: 'up', sentiment: 'Bullish', aiInsight: 'Oral GLP-1 Phase 3 data exceeds expectations.' },
  { symbol: 'CEG', name: 'Constellation Energy', price: '245.10', change: '+5.2%', trend: 'up', sentiment: 'Bullish', aiInsight: 'Microsoft 20-year PPA finalized for TMI restart.' },
  { symbol: 'TSLA', name: 'Tesla Inc', price: '215.30', change: '-2.5%', trend: 'down', sentiment: 'Bearish', aiInsight: 'FSD adoption rates below consensus; margin pressure persists.' },
  { symbol: 'SOL', name: 'Solana', price: '345.20', change: '+6.5%', trend: 'up', sentiment: 'Bullish', aiInsight: 'Firedancer validator client mainnet launch imminent.' },
];

export const Watchlist: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [expandedAsset, setExpandedAsset] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSymbol, setNewSymbol] = useState('');

  const handleAddAsset = () => {
    if (!newSymbol) return;
    const newAsset: Asset = {
      symbol: newSymbol.toUpperCase(),
      name: 'New Asset',
      price: '0.00',
      change: '0.0%',
      trend: 'up',
      sentiment: 'Neutral',
      aiInsight: 'Analyzing market data for new insights...'
    };
    setAssets([...assets, newAsset]);
    setNewSymbol('');
    setShowAddModal(false);
  };

  const handleRemoveAsset = (symbol: string) => {
    setAssets(assets.filter(a => a.symbol !== symbol));
  };

  const toggleExpand = (symbol: string) => {
    setExpandedAsset(expandedAsset === symbol ? null : symbol);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold font-mono uppercase tracking-tight">
          Custom Watchlist <span className="text-terminal-muted text-sm font-normal ml-2">{assets.length} Assets</span>
        </h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowAddModal(true)}
            className="terminal-btn flex items-center gap-2 text-terminal-accent border-terminal-accent/50"
          >
            <Plus className="w-3 h-3" /> Add Asset
          </button>
          <button 
            onClick={() => alert("Filtering options: Sector, Market Cap, Sentiment, and Volatility.")}
            className="terminal-btn flex items-center gap-2"
          >
            <Filter className="w-3 h-3" /> Filter
          </button>
          <button 
            onClick={() => alert("Exporting watchlist to CSV/JSON for institutional analysis...")}
            className="terminal-btn flex items-center gap-2"
          >
            <Download className="w-3 h-3" /> Export
          </button>
        </div>
      </div>

      {/* Add Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-terminal-bg/80 backdrop-blur-sm p-4">
          <div className="terminal-card w-full max-w-sm p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-terminal-border pb-4">
              <span className="font-mono text-xs uppercase font-bold text-terminal-accent">Add New Asset</span>
              <button onClick={() => setShowAddModal(false)} className="text-terminal-muted hover:text-terminal-text">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-terminal-muted" />
              <input 
                type="text"
                value={newSymbol}
                onChange={(e) => setNewSymbol(e.target.value)}
                placeholder="Enter Ticker (e.g. AAPL)"
                className="w-full bg-terminal-surface border border-terminal-border py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-terminal-accent uppercase font-mono"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleAddAsset()}
              />
            </div>
            <button 
              onClick={handleAddAsset}
              className="w-full terminal-btn bg-terminal-accent text-white border-none py-3"
            >
              Add to Watchlist
            </button>
          </div>
        </div>
      )}

      <div className="terminal-card">
        <div className="terminal-header">
          <span>Asset Tracking</span>
          <div className="flex gap-4">
            <span className="text-terminal-green">▲ {assets.filter(a => a.trend === 'up').length} Up</span>
            <span className="text-terminal-red">▼ {assets.filter(a => a.trend === 'down').length} Down</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="terminal-grid-cell text-terminal-muted font-normal">Ticker</th>
                <th className="terminal-grid-cell text-terminal-muted font-normal">Name</th>
                <th className="terminal-grid-cell text-terminal-muted font-normal text-right">Price</th>
                <th className="terminal-grid-cell text-terminal-muted font-normal text-right">Change</th>
                <th className="terminal-grid-cell text-terminal-muted font-normal text-center">Sentiment</th>
                <th className="terminal-grid-cell text-terminal-muted font-normal">AI Insight</th>
                <th className="terminal-grid-cell text-terminal-muted font-normal text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <React.Fragment key={asset.symbol}>
                  <tr 
                    onClick={() => toggleExpand(asset.symbol)}
                    className={cn(
                      "hover:bg-terminal-border/20 transition-colors group cursor-pointer",
                      expandedAsset === asset.symbol && "bg-terminal-accent/5"
                    )}
                  >
                    <td className="terminal-grid-cell font-bold text-terminal-accent">
                      <div className="flex items-center gap-2">
                        {expandedAsset === asset.symbol ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        {asset.symbol}
                      </div>
                    </td>
                    <td className="terminal-grid-cell text-terminal-muted">{asset.name}</td>
                    <td className="terminal-grid-cell text-right font-mono font-bold">{asset.price}</td>
                    <td className={cn(
                      "terminal-grid-cell text-right font-mono font-bold",
                      asset.trend === 'up' ? "text-terminal-green" : "text-terminal-red"
                    )}>
                      {asset.change}
                    </td>
                    <td className="terminal-grid-cell text-center">
                      <span className={cn(
                        "px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded-full",
                        asset.sentiment === 'Bullish' ? "bg-terminal-green/10 text-terminal-green border border-terminal-green/20" :
                        asset.sentiment === 'Bearish' ? "bg-terminal-red/10 text-terminal-red border border-terminal-red/20" :
                        "bg-terminal-border text-terminal-muted"
                      )}>
                        {asset.sentiment}
                      </span>
                    </td>
                    <td className="terminal-grid-cell max-w-xs">
                      <div className="flex items-start gap-2">
                        <BrainCircuit className="w-3 h-3 text-terminal-accent shrink-0 mt-0.5" />
                        <span className="text-[10px] leading-relaxed text-terminal-text italic line-clamp-2">{asset.aiInsight}</span>
                      </div>
                    </td>
                    <td className="terminal-grid-cell text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); console.log(`Configuring alerts for ${asset.symbol}`); }}
                          className="p-1 hover:text-terminal-accent transition-colors"
                        >
                          <Bell className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleRemoveAsset(asset.symbol); }}
                          className="p-1 hover:text-terminal-red transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedAsset === asset.symbol && (
                    <tr>
                      <td colSpan={7} className="p-4 bg-terminal-bg/50 border-b border-terminal-border">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="space-y-3">
                            <div className="text-[10px] font-mono text-terminal-muted uppercase">Market Data</div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-[11px]">
                                <span className="text-terminal-muted">Volume</span>
                                <span className="font-mono">{asset.details?.volume || 'N/A'}</span>
                              </div>
                              <div className="flex justify-between text-[11px]">
                                <span className="text-terminal-muted">Mkt Cap</span>
                                <span className="font-mono">{asset.details?.mktCap || 'N/A'}</span>
                              </div>
                              <div className="flex justify-between text-[11px]">
                                <span className="text-terminal-muted">52W High</span>
                                <span className="font-mono text-terminal-green">{asset.details?.high52 || 'N/A'}</span>
                              </div>
                              <div className="flex justify-between text-[11px]">
                                <span className="text-terminal-muted">52W Low</span>
                                <span className="font-mono text-terminal-red">{asset.details?.low52 || 'N/A'}</span>
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-2 space-y-3">
                            <div className="text-[10px] font-mono text-terminal-muted uppercase">AI Deep Dive</div>
                            <p className="text-xs leading-relaxed text-terminal-text">
                              {asset.aiInsight} The technical setup shows strong support at current levels with RSI indicating oversold conditions. Institutional flow remains positive despite macro headwinds.
                            </p>
                            <div className="flex gap-2">
                              <button className="terminal-btn text-[10px] py-1">View Chart</button>
                              <button className="terminal-btn text-[10px] py-1">Full Report</button>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="text-[10px] font-mono text-terminal-muted uppercase">Community Sentiment</div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-terminal-border rounded-full overflow-hidden">
                                <div className="h-full bg-terminal-green w-3/4" />
                              </div>
                              <span className="text-[10px] font-mono text-terminal-green">75% Bullish</span>
                            </div>
                            <button className="w-full terminal-btn text-[10px] py-1 border-terminal-accent/30 text-terminal-accent">Join Discussion</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Smart Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="terminal-card">
          <div className="terminal-header">
            <span>Recent Smart Alerts</span>
            <Bell className="w-3 h-3 text-terminal-accent" />
          </div>
          <div className="p-4 space-y-4">
            {[
              { time: '10m ago', asset: 'NVDA', type: 'Volume Spike', desc: 'Institutional buy order detected (+150% vs avg volume).', impact: 'High' },
              { time: '45m ago', asset: 'BTC', type: 'Sentiment Shift', desc: 'Social sentiment turned bearish following regulatory news in EU.', impact: 'Medium' },
              { time: '2h ago', asset: 'CEG', type: 'Price Target', desc: 'Goldman Sachs raises PT to $280 citing AI energy demand.', impact: 'High' },
            ].map((alert, i) => (
              <div key={i} className="flex gap-4 items-start border-b border-terminal-border pb-4 last:border-0 last:pb-0">
                <div className="text-[10px] font-mono text-terminal-muted shrink-0 w-12">{alert.time}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs font-bold text-terminal-accent">{alert.asset} — {alert.type}</span>
                    <span className={cn(
                      "text-[9px] font-mono font-bold uppercase",
                      alert.impact === 'High' ? "text-terminal-red" : "text-terminal-amber"
                    )}>{alert.impact} Impact</span>
                  </div>
                  <p className="text-[11px] text-terminal-muted leading-relaxed">{alert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="terminal-card bg-terminal-surface/50">
          <div className="terminal-header">
            <span>AI Portfolio Insight</span>
            <BrainCircuit className="w-3 h-3 text-terminal-accent" />
          </div>
          <div className="p-6 flex flex-col items-center justify-center text-center space-y-4 h-full">
            <div className="w-12 h-12 bg-terminal-accent/10 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-terminal-accent" />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase">Concentration Risk Detected</h3>
              <p className="text-xs text-terminal-muted leading-relaxed max-w-xs">
                Your watchlist is 78% correlated to the "AI Infrastructure" theme. While performance is strong, consider diversifying into "Defensive Healthcare" to hedge against potential energy-related bottlenecks.
              </p>
            </div>
            <button className="terminal-btn text-terminal-accent border-terminal-accent/50 hover:bg-terminal-accent/10">Optimize Watchlist</button>
          </div>
        </div>
      </div>
    </div>
  );
};



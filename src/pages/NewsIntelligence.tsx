import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Newspaper, 
  Youtube, 
  Rss, 
  Twitter, 
  MessageSquare, 
  Play, 
  TrendingUp, 
  ShieldCheck,
  BrainCircuit,
  Search,
  Filter,
  BarChart3,
  ChevronRight,
  LineChart as LineChartIcon,
  Share2,
  ExternalLink,
  X
} from 'lucide-react';

const newsFeed = [
  { 
    id: '1',
    source: 'Bloomberg', 
    title: 'NVIDIA Rubin Architecture Early Shipment Rumors Drive Semi Surge', 
    summary: 'Supply chain checks suggest TSMC is prioritizing Rubin production ahead of schedule. Impact on Blackwell backlog remains unclear.',
    sentiment: 'Positive',
    score: 88,
    time: '12m ago',
    type: 'Article',
    asset: 'NVDA'
  },
  { 
    id: '2',
    source: 'YouTube / Real Vision', 
    title: 'The Macro Energy Bottleneck: Why AI Needs Nuclear', 
    summary: 'Deep dive into the 45GW power gap facing US data centers by 2028. SMRs identified as the only viable 24/7 baseload solution.',
    sentiment: 'Neutral',
    score: 94,
    time: '45m ago',
    type: 'Video',
    isTranscribed: true,
    asset: 'CEG'
  },
  { 
    id: '3',
    source: 'X / @MacroAlf', 
    title: 'Fed Rate Cut Expectations Pushed to Q4', 
    summary: 'Inflation stickiness in services sector suggests higher-for-longer regime persists. DXY strength expected to continue.',
    sentiment: 'Bearish',
    score: 72,
    time: '2h ago',
    type: 'Social',
    asset: 'DXY'
  },
];

export const NewsIntelligence: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [showChart, setShowChart] = useState(false);

  const handleViewChart = (asset: string) => {
    setSelectedAsset(asset);
    setShowChart(true);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-terminal-accent">
            <Newspaper className="w-5 h-5" />
            <span className="font-mono text-xs uppercase tracking-[0.3em]">AI News Pipeline</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Advanced Intelligence Processing</h1>
        </div>
        <div className="flex gap-2">
          <button className="terminal-btn flex items-center gap-2"><Rss className="w-3 h-3" /> Connect Feed</button>
          <button className="terminal-btn flex items-center gap-2"><Youtube className="w-3 h-3" /> Add Channel</button>
        </div>
      </div>

      {/* Pipeline Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="terminal-card p-3 bg-terminal-accent/5 border-terminal-accent/20">
          <div className="text-[10px] font-mono text-terminal-accent uppercase mb-2">Input Layer</div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Rss className="w-4 h-4 text-terminal-muted" />
              <Youtube className="w-4 h-4 text-terminal-muted" />
              <Twitter className="w-4 h-4 text-terminal-muted" />
            </div>
            <span className="text-[10px] font-mono text-terminal-green">142 Sources Active</span>
          </div>
        </div>
        <div className="terminal-card p-3 bg-terminal-accent/5 border-terminal-accent/20">
          <div className="text-[10px] font-mono text-terminal-accent uppercase mb-2">Processing Layer</div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <BrainCircuit className="w-4 h-4 text-terminal-accent animate-pulse" />
              <span className="text-[10px] font-mono">Transcription & Sentiment</span>
            </div>
            <span className="text-[10px] font-mono text-terminal-muted">Latency: 42ms</span>
          </div>
        </div>
        <div className="terminal-card p-3 bg-terminal-accent/5 border-terminal-accent/20">
          <div className="text-[10px] font-mono text-terminal-accent uppercase mb-2">Output Layer</div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono">Structured Alpha Feed</span>
            <div className="flex gap-2">
              <TrendingUp className="w-4 h-4 text-terminal-green" />
              <BarChart3 className="w-4 h-4 text-terminal-accent" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Feed */}
        <div className="xl:col-span-3 space-y-4">
          <div className="terminal-header">
            <span>Intelligence Stream</span>
            <div className="flex gap-4">
              <span className="flex items-center gap-1 text-terminal-muted"><Filter className="w-2 h-2" /> All Feeds</span>
              <span className="flex items-center gap-1 text-terminal-accent"><BrainCircuit className="w-2 h-2" /> AI Summary Active</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {newsFeed.map((news) => (
              <div key={news.id} className="terminal-card group hover:border-terminal-accent transition-all cursor-pointer">
                <div className="p-4 flex gap-6">
                  <div className="w-16 h-16 bg-terminal-surface border border-terminal-border flex flex-col items-center justify-center shrink-0 group-hover:bg-terminal-accent/10 transition-colors">
                    {news.type === 'Video' ? <Youtube className="w-6 h-6 text-terminal-red" /> : 
                     news.type === 'Social' ? <Twitter className="w-6 h-6 text-terminal-accent" /> : 
                     <Newspaper className="w-6 h-6 text-terminal-muted" />}
                    <span className="text-[8px] font-mono text-terminal-muted mt-1 uppercase">{news.type}</span>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-terminal-accent uppercase">{news.source}</span>
                        <span className="text-[9px] font-mono text-terminal-border">•</span>
                        <span className="text-[10px] font-mono text-terminal-muted">{news.time}</span>
                        {news.isTranscribed && (
                          <span className="px-1.5 py-0.5 bg-terminal-green/10 text-terminal-green text-[8px] font-mono font-bold uppercase rounded">Auto-Transcribed</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-[9px] font-mono font-bold uppercase",
                          news.sentiment === 'Positive' ? "text-terminal-green" : news.sentiment === 'Bearish' ? "text-terminal-red" : "text-terminal-muted"
                        )}>{news.sentiment}</span>
                        <div className="w-12 h-1 bg-terminal-border rounded-full overflow-hidden">
                          <div className={cn(
                            "h-full",
                            news.score > 80 ? "bg-terminal-green" : news.score > 60 ? "bg-terminal-amber" : "bg-terminal-red"
                          )} style={{ width: `${news.score}%` }} />
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-base font-bold leading-tight group-hover:text-terminal-accent transition-colors">{news.title}</h3>
                    <p className="text-xs text-terminal-muted leading-relaxed line-clamp-2 italic">
                      {news.summary}
                    </p>
                    
                    <div className="flex gap-4 pt-1">
                      <button className="text-[10px] font-mono text-terminal-accent uppercase hover:underline flex items-center gap-1">
                        <BrainCircuit className="w-3 h-3" /> View Key Ideas
                      </button>
                      <button 
                        onClick={() => handleViewChart(news.asset)}
                        className="text-[10px] font-mono text-terminal-muted uppercase hover:text-terminal-accent transition-colors flex items-center gap-1"
                      >
                        <LineChartIcon className="w-3 h-3" /> Chart: {news.asset}
                      </button>
                      <button className="text-[10px] font-mono text-terminal-muted uppercase hover:text-terminal-accent transition-colors flex items-center gap-1">
                        <Share2 className="w-3 h-3" /> Share Signal
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Creator Profiles & Big Picture */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="terminal-header">
              <span>Creator Profiles</span>
              <ShieldCheck className="w-3 h-3 text-terminal-green" />
            </div>
            <div className="space-y-3">
              {[
                { name: 'Real Vision', reliability: '92%', bias: 'Macro-Bullish', themes: ['Energy', 'AI', 'Macro'] },
                { name: 'MacroAlf', reliability: '85%', bias: 'Neutral', themes: ['Rates', 'FX', 'Global Macro'] },
                { name: 'Peter Zeihan', reliability: '78%', bias: 'Geopolitical-Bearish', themes: ['Demographics', 'Supply Chains'] },
              ].map((creator, i) => (
                <div key={i} className="terminal-card p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold">{creator.name}</span>
                    <span className="text-[9px] font-mono text-terminal-green">Reliability: {creator.reliability}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {creator.themes.map((t, j) => (
                      <span key={j} className="text-[8px] font-mono px-1 py-0.5 bg-terminal-border text-terminal-muted uppercase">{t}</span>
                    ))}
                  </div>
                  <div className="text-[9px] font-mono text-terminal-muted uppercase">Bias: <span className="text-terminal-text">{creator.bias}</span></div>
                </div>
              ))}
            </div>
          </div>

          <div className="terminal-card p-4 bg-terminal-accent/5 border-terminal-accent/20 space-y-4">
            <div className="flex items-center gap-2 text-terminal-accent">
              <BarChart3 className="w-4 h-4" />
              <span className="text-[10px] font-mono font-bold uppercase">Big Picture Summary</span>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="text-[9px] font-mono text-terminal-muted uppercase">Core Narrative</div>
                <p className="text-[11px] text-terminal-text leading-relaxed font-bold">"The Energy Wall" is dominating institutional discourse.</p>
              </div>
              <div className="space-y-1">
                <div className="text-[9px] font-mono text-terminal-muted uppercase">Investment Idea</div>
                <p className="text-[11px] text-terminal-muted leading-relaxed">Long SMR developers; Hedge with short hyperscaler capex proxies if ROI concerns mount.</p>
              </div>
            </div>
            <button className="w-full terminal-btn bg-terminal-accent text-white border-none hover:bg-terminal-accent/80">Generate Full Report</button>
          </div>
        </div>
      </div>

      {/* TradingView Chart Modal */}
      {showChart && selectedAsset && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-terminal-bg/90 backdrop-blur-md p-4">
          <div className="terminal-card w-full max-w-5xl h-[80vh] flex flex-col shadow-2xl border-terminal-accent/30">
            <div className="terminal-header border-b border-terminal-border">
              <div className="flex items-center gap-3">
                <LineChartIcon className="w-4 h-4 text-terminal-accent" />
                <span className="font-mono text-xs uppercase font-bold">Technical Chart: {selectedAsset}</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-[10px] font-mono text-terminal-muted hover:text-terminal-accent flex items-center gap-1">
                  <ExternalLink className="w-3 h-3" /> Open TradingView
                </button>
                <button onClick={() => setShowChart(false)} className="text-terminal-muted hover:text-terminal-text">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-black relative">
              {/* TradingView Widget Simulation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 border-2 border-terminal-accent border-t-transparent rounded-full animate-spin mx-auto" />
                  <div className="font-mono text-xs text-terminal-muted uppercase tracking-widest">Connecting to TradingView WebSocket...</div>
                </div>
              </div>
              <iframe 
                title="TradingView Chart"
                src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_76d87&symbol=${selectedAsset}&interval=D&hidesidetoolbar=1&hidetoptoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=localhost&utm_medium=widget&utm_campaign=chart&utm_term=${selectedAsset}`}
                className="w-full h-full border-none relative z-10"
              />
            </div>
            <div className="p-4 bg-terminal-surface border-t border-terminal-border flex justify-between items-center">
              <div className="flex gap-6">
                <div className="space-y-1">
                  <div className="text-[9px] font-mono text-terminal-muted uppercase">RSI (14)</div>
                  <div className="text-xs font-mono text-terminal-green">64.21</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[9px] font-mono text-terminal-muted uppercase">MACD</div>
                  <div className="text-xs font-mono text-terminal-accent">Bullish Cross</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="terminal-btn text-[10px]">Save to Analysis</button>
                <button className="terminal-btn text-[10px] bg-terminal-accent text-white border-none">Share to Social</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



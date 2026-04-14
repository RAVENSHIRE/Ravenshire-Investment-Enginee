import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { io } from 'socket.io-client';
import { 
  BrainCircuit, 
  Lightbulb, 
  Target, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Loader2,
  Plus,
  X,
  Activity
} from 'lucide-react';
import { generateInvestmentStrategy } from '@/services/geminiService';

interface Thesis {
  title: string;
  sector: string;
  conviction: string;
  thesis: string;
  risks: string[];
  timeHorizon: string;
  catalysts: string[];
}

const INITIAL_THESES: Thesis[] = [
  {
    title: 'The AI Compute Scarcity Cycle',
    sector: 'Technology',
    conviction: 'High',
    thesis: 'Demand for H100/B200 clusters outpaces TSMC capacity through 2026. Hyperscalers are moving to internal ASICs.',
    catalysts: ['NVIDIA Rubin Launch', 'Sovereign AI Clouds'],
    risks: ['Oversupply in 2027', 'Regulatory pushback on data centers'],
    timeHorizon: '18-24 months'
  },
  {
    title: 'Nuclear AI Renaissance',
    sector: 'Energy / Utilities',
    conviction: 'Medium-High',
    thesis: 'Data centers hitting grid wall. SMRs (Small Modular Reactors) becoming primary solution for 24/7 baseload.',
    catalysts: ['Microsoft-Constellation Deal', 'SMR Regulatory Fast-track'],
    risks: ['Nuclear waste policy', 'Construction delays'],
    timeHorizon: '3-5 years'
  }
];

const THEMES = [
  { label: 'Generative AI', symbol: 'NVDA' },
  { label: 'Nuclear Energy', symbol: 'CEG' },
  { label: 'GLP-1 Pharma', symbol: 'LLY' },
  { label: 'Digital Assets', symbol: 'BTC' },
  { label: 'Semiconductors', symbol: 'SOL' }, // Using SOL as a proxy for high-beta tech here
];

export const StrategySector: React.FC = () => {
  const [theses, setTheses] = useState<Thesis[]>(INITIAL_THESES);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [topic, setTopic] = useState('');
  const [themeData, setThemeData] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const socket = io();

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('market-update', (updates: any[]) => {
      const updatedThemes = THEMES.map(theme => {
        const update = updates.find(u => u.symbol === theme.symbol);
        return {
          ...theme,
          val: update ? `${update.change >= 0 ? '+' : ''}${update.change}%` : '0.0%',
          trend: update ? (update.change >= 0 ? 'up' : 'down') : 'up'
        };
      });
      setThemeData(updatedThemes);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    setError(null);
    try {
      const newStrategy = await generateInvestmentStrategy(topic);
      setTheses([newStrategy, ...theses]);
      setShowGenerator(false);
      setTopic('');
    } catch (error) {
      console.error("Failed to generate strategy:", error);
      setError("Intelligence failure: Unable to synthesize investment thesis. Please verify topic parameters.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-terminal-accent">
            <BrainCircuit className="w-5 h-5" />
            <span className="font-mono text-xs uppercase tracking-[0.3em]">AI Research Hub</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Investment Theses & Scenario Modeling</h1>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowGenerator(true)}
            className="terminal-btn text-terminal-accent border-terminal-accent/50 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Generate New Thesis
          </button>
          <button className="terminal-btn" onClick={() => window.print()}>Export PDF</button>
        </div>
      </div>

      {/* AI Generator Modal-like Overlay */}
      {showGenerator && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-terminal-bg/80 backdrop-blur-sm p-4">
          <div className="terminal-card w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-terminal-border pb-4">
              <div className="flex items-center gap-2 text-terminal-accent">
                <BrainCircuit className="w-5 h-5" />
                <span className="font-mono text-xs uppercase font-bold">Strategy Generator</span>
              </div>
              <button onClick={() => setShowGenerator(false)} className="text-terminal-muted hover:text-terminal-text">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-terminal-muted uppercase">Investment Topic / Sector</label>
              <input 
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Space Infrastructure, Quantum Computing..."
                className="w-full bg-terminal-surface border border-terminal-border p-3 text-sm focus:outline-none focus:border-terminal-accent"
              />
            </div>

            {error && (
              <div className="p-3 bg-terminal-red/10 border border-terminal-red/30 text-terminal-red text-xs font-mono flex items-center gap-2">
                <Activity className="w-4 h-4" />
                {error}
              </div>
            )}

            <button 
              onClick={handleGenerate}
              disabled={isGenerating || !topic}
              className="w-full terminal-btn bg-terminal-accent text-white border-none py-3 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing Market Signals...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Generate Institutional Strategy
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Theses List */}
        <div className="xl:col-span-2 space-y-4">
          <div className="terminal-header">
            <span>Active Investment Theses</span>
            <span className="text-terminal-accent">{theses.length} Active</span>
          </div>
          
          <div className="space-y-4">
            {theses.map((thesis, i) => (
              <div key={i} className="terminal-card group cursor-pointer hover:border-terminal-accent transition-all">
                <div className="p-4 flex flex-col md:flex-row gap-6">
                  <div className="w-12 h-12 bg-terminal-surface border border-terminal-border flex items-center justify-center shrink-0 group-hover:bg-terminal-accent/10 group-hover:border-terminal-accent transition-colors">
                    <Lightbulb className="w-6 h-6 text-terminal-muted group-hover:text-terminal-accent" />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-bold group-hover:text-terminal-accent transition-colors">{thesis.title}</h3>
                      <span className="px-2 py-0.5 bg-terminal-border text-[10px] font-mono text-terminal-muted uppercase">{thesis.sector}</span>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-terminal-accent/10 border border-terminal-accent/20 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-terminal-accent animate-pulse" />
                        <span className="text-[10px] font-mono text-terminal-accent uppercase font-bold">Conviction: {thesis.conviction}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-terminal-muted leading-relaxed max-w-3xl">
                      {thesis.thesis}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                      <div className="space-y-1">
                        <div className="text-[10px] font-mono text-terminal-muted uppercase">Key Catalysts</div>
                        <div className="flex flex-wrap gap-2">
                          {thesis.catalysts.map((c, j) => (
                            <span key={j} className="text-[9px] font-mono text-terminal-text border border-terminal-border px-1.5 py-0.5 bg-terminal-surface">{c}</span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-[10px] font-mono text-terminal-muted uppercase">Key Risks</div>
                        <div className="flex flex-wrap gap-2">
                          {thesis.risks.map((r, j) => (
                            <span key={j} className="text-[9px] font-mono text-terminal-red border border-terminal-red/20 px-1.5 py-0.5 bg-terminal-red/5">{r}</span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-[10px] font-mono text-terminal-muted uppercase">Time Horizon</div>
                        <div className="text-[10px] font-mono font-bold text-terminal-accent uppercase">{thesis.timeHorizon}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end">
                    <ChevronRight className="w-5 h-5 text-terminal-border group-hover:text-terminal-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Scenario Modeling */}
        <div className="space-y-4">
          <div className="terminal-header">
            <span>Scenario Modeling</span>
            <Target className="w-3 h-3" />
          </div>
          
          <div className="space-y-4">
            {[
              {
                name: 'AI Productivity Boom (Bull)',
                probability: '35%',
                impact: 'S&P 500 Target: 6,200',
                description: 'Widespread enterprise AI adoption leads to 300bps margin expansion across non-tech sectors.'
              },
              {
                name: 'The Energy Wall (Bear)',
                probability: '20%',
                impact: 'S&P 500 Target: 4,800',
                description: 'Grid constraints and chip shortages stall AI deployment; ROI concerns lead to capex pullbacks.'
              }
            ].map((scenario, i) => (
              <div key={i} className="terminal-card p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold uppercase tracking-tight">{scenario.name}</h4>
                  <span className="text-[10px] font-mono text-terminal-muted">Prob: {scenario.probability}</span>
                </div>
                <div className="p-2 bg-terminal-bg border border-terminal-border font-mono text-[10px] text-terminal-accent">
                  {scenario.impact}
                </div>
                <p className="text-xs text-terminal-muted leading-relaxed">
                  {scenario.description}
                </p>
                <button 
                  onClick={() => alert(`Running Monte Carlo simulation for ${scenario.name}...`)}
                  className="w-full terminal-btn mt-2 flex items-center justify-center gap-2 group"
                >
                  Run Simulation <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
            
            <div className="terminal-card p-4 bg-terminal-accent/5 border-terminal-accent/20">
              <div className="flex items-center gap-2 text-terminal-accent mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-mono font-bold uppercase">Portfolio Guard</span>
              </div>
              <p className="text-xs text-terminal-muted leading-relaxed mb-4">
                Your current portfolio has a 65% correlation to the "Energy Wall" bear case. Consider hedging with long-dated utility calls.
              </p>
              <button 
                onClick={() => alert("Loading institutional hedging strategies for current macro environment...")}
                className="w-full terminal-btn bg-terminal-accent text-white border-none hover:bg-terminal-accent/80"
              >
                View Hedge Strategies
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Thematic Heatmap */}
      <div className="terminal-card">
        <div className="terminal-header">
          <span>Thematic Performance Matrix</span>
          <div className="flex items-center gap-2">
            {isConnected && <span className="w-1.5 h-1.5 bg-terminal-green rounded-full animate-pulse" />}
            <BarChart3 className="w-3 h-3" />
          </div>
        </div>
        <div className="p-4 grid grid-cols-2 md:grid-cols-5 gap-4">
          {(themeData.length > 0 ? themeData : [
            { label: 'Generative AI', val: '+42.5%', trend: 'up' },
            { label: 'Nuclear Energy', val: '+18.2%', trend: 'up' },
            { label: 'GLP-1 Pharma', val: '+24.1%', trend: 'up' },
            { label: 'Digital Assets', val: '-2.4%', trend: 'down' },
            { label: 'Semiconductors', val: '+31.8%', trend: 'up' },
          ]).map((theme, i) => (
            <div key={i} className="p-3 bg-terminal-bg border border-terminal-border space-y-1 hover:border-terminal-accent transition-colors cursor-pointer group">
              <div className="text-[10px] font-mono text-terminal-muted uppercase group-hover:text-terminal-accent transition-colors">{theme.label}</div>
              <div className={cn(
                "text-sm font-bold font-mono",
                theme.trend === 'up' ? "text-terminal-green" : "text-terminal-red"
              )}>{theme.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



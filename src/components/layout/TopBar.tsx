import React, { useState, useEffect } from 'react';
import { Search, Bell, User, Command } from 'lucide-react';

export const TopBar: React.FC = () => {
  const [search, setSearch] = useState('');
  const [marketData, setMarketData] = useState<any>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch('/api/market-data');
        if (response.ok) {
          const data = await response.json();
          setMarketData(data);
        }
      } catch (error) {
        console.error('Market Data Fetch Error:', error);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-12 bg-terminal-bg border-b border-terminal-border flex items-center justify-between px-4 sticky top-0 z-50">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-terminal-muted group-focus-within:text-terminal-accent transition-colors" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search markets, news, or strategies... (Alt + S)"
            className="w-full bg-terminal-surface border border-terminal-border py-1.5 pl-10 pr-12 text-xs font-mono focus:outline-none focus:border-terminal-accent transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 border border-terminal-border rounded bg-terminal-bg text-[10px] font-mono text-terminal-muted">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest">
          {marketData ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-terminal-muted">S&P 500</span>
                <span className={marketData.sp500Change >= 0 ? "text-terminal-green" : "text-terminal-red"}>
                  {marketData.sp500.toLocaleString()} ({marketData.sp500Change >= 0 ? '+' : ''}{marketData.sp500Change}%)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-terminal-muted">BTC/USD</span>
                <span className={marketData.btcChange >= 0 ? "text-terminal-green" : "text-terminal-red"}>
                  {marketData.btc.toLocaleString()} ({marketData.btcChange >= 0 ? '+' : ''}{marketData.btcChange}%)
                </span>
              </div>
            </>
          ) : (
            <div className="animate-pulse text-terminal-muted">Loading Market Feed...</div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => alert('Notifications initialized. No new alerts.')}
            className="p-1.5 text-terminal-muted hover:text-terminal-text transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-terminal-accent rounded-full" />
          </button>
          <div className="w-px h-4 bg-terminal-border" />
          <button 
            onClick={() => alert('Profile management is restricted to institutional accounts.')}
            className="flex items-center gap-2 pl-1 pr-2 py-1 hover:bg-terminal-surface transition-colors"
          >
            <div className="w-6 h-6 rounded bg-terminal-accent flex items-center justify-center text-[10px] font-bold text-white">
              JK
            </div>
            <span className="hidden sm:block text-[10px] font-mono uppercase tracking-wider">Jay K.</span>
          </button>
        </div>
      </div>
    </header>
  );
};

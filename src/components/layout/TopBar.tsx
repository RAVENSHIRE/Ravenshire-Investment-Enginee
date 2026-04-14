import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, User, Command, TrendingUp, TrendingDown, X, ExternalLink, Shield, LogOut } from 'lucide-react';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const TopBar: React.FC = () => {
  const [search, setSearch] = useState('');
  const [marketData, setMarketData] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket = io();

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('market-update', (data: any[]) => {
      setMarketData(data);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    // Close search results on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      socket.disconnect();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredResults = search.length > 1 
    ? marketData.filter(m => m.symbol.toLowerCase().includes(search.toLowerCase()))
    : [];

  const handleSearchSelect = (symbol: string) => {
    setSearch('');
    setShowSearchResults(false);
    navigate(`/discovery?symbol=${symbol}`);
  };

  const notifications = [
    { id: 1, title: 'Volatility Alert', message: 'NVDA showing unusual price action (+4.2%)', time: '2m ago', type: 'warning' },
    { id: 2, title: 'Strategy Update', message: 'New AI-generated strategy for Energy Sector', time: '15m ago', type: 'info' },
    { id: 3, title: 'System Status', message: 'Real-time data feed synchronized', time: '1h ago', type: 'success' },
  ];

  return (
    <header className="h-12 bg-terminal-bg border-b border-terminal-border flex items-center justify-between px-4 sticky top-0 z-50">
      <div className="flex items-center gap-4 flex-1 max-w-xl" ref={searchRef}>
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-terminal-muted group-focus-within:text-terminal-accent transition-colors" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => setShowSearchResults(true)}
            placeholder="Search markets (e.g. NVDA, BTC)..."
            className="w-full bg-terminal-surface border border-terminal-border py-1.5 pl-10 pr-12 text-xs font-mono focus:outline-none focus:border-terminal-accent transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 border border-terminal-border rounded bg-terminal-bg text-[10px] font-mono text-terminal-muted">
            <Command className="w-2.5 h-2.5" />
            <span>S</span>
          </div>

          {/* Search Results Dropdown */}
          <AnimatePresence>
            {showSearchResults && search.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute top-full left-0 w-full mt-1 bg-terminal-surface border border-terminal-border shadow-2xl overflow-hidden"
              >
                <div className="p-2 border-b border-terminal-border bg-terminal-bg text-[9px] font-mono text-terminal-muted uppercase tracking-widest">
                  Market Results
                </div>
                <div className="max-h-60 overflow-auto">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((res) => (
                      <button 
                        key={res.symbol}
                        onClick={() => handleSearchSelect(res.symbol)}
                        className="w-full flex items-center justify-between p-3 hover:bg-terminal-bg transition-colors border-b border-terminal-border/50 last:border-none"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-terminal-accent">{res.symbol}</span>
                          <span className="text-[10px] text-terminal-muted uppercase">Institutional Feed</span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-mono">${res.price.toLocaleString()}</div>
                          <div className={cn("text-[9px] font-mono", res.change >= 0 ? "text-terminal-green" : "text-terminal-red")}>
                            {res.change >= 0 ? '+' : ''}{res.change}%
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs font-mono text-terminal-muted italic">
                      No matching symbols found.
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest">
          {marketData.length > 0 ? (
            marketData.slice(0, 4).map((stock) => (
              <div key={stock.symbol} className="flex items-center gap-2">
                <span className="text-terminal-muted">{stock.symbol}</span>
                <span className={stock.change >= 0 ? "text-terminal-green" : "text-terminal-red"}>
                  {stock.price.toLocaleString()} 
                  <span className="ml-1 text-[8px]">
                    ({stock.change >= 0 ? '+' : ''}{stock.change}%)
                  </span>
                </span>
              </div>
            ))
          ) : (
            <div className="animate-pulse text-terminal-muted flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-terminal-green' : 'bg-terminal-red'}`} />
              Connecting...
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 relative">
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
              className={cn(
                "p-1.5 transition-colors relative",
                showNotifications ? "text-terminal-accent" : "text-terminal-muted hover:text-terminal-text"
              )}
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-terminal-accent rounded-full" />
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 bg-terminal-surface border border-terminal-border shadow-2xl overflow-hidden z-[100]"
                >
                  <div className="p-3 border-b border-terminal-border bg-terminal-bg flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Intelligence Alerts</span>
                    <button onClick={() => setShowNotifications(false)} className="text-terminal-muted hover:text-terminal-text">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="max-h-80 overflow-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-3 border-b border-terminal-border/50 hover:bg-terminal-bg transition-colors cursor-pointer">
                        <div className="flex justify-between items-start mb-1">
                          <span className={cn(
                            "text-[8px] uppercase px-1 border",
                            n.type === 'warning' ? "border-terminal-amber text-terminal-amber" : 
                            n.type === 'success' ? "border-terminal-green text-terminal-green" : 
                            "border-terminal-accent text-terminal-accent"
                          )}>
                            {n.title}
                          </span>
                          <span className="text-[8px] font-mono text-terminal-muted">{n.time}</span>
                        </div>
                        <p className="text-[10px] font-mono text-terminal-text leading-tight">{n.message}</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full p-2 text-[9px] font-mono text-terminal-muted hover:text-terminal-accent uppercase border-t border-terminal-border bg-terminal-bg/50">
                    View All Intel
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-px h-4 bg-terminal-border" />

          {/* Profile */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
              className={cn(
                "flex items-center gap-2 pl-1 pr-2 py-1 transition-colors",
                showProfile ? "bg-terminal-surface" : "hover:bg-terminal-surface"
              )}
            >
              <div className="w-6 h-6 rounded bg-terminal-accent flex items-center justify-center text-[10px] font-bold text-white">
                JK
              </div>
              <span className="hidden sm:block text-[10px] font-mono uppercase tracking-wider">Jay K.</span>
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 bg-terminal-surface border border-terminal-border shadow-2xl overflow-hidden z-[100]"
                >
                  <div className="p-4 bg-terminal-bg border-b border-terminal-border">
                    <div className="text-[10px] font-mono font-bold text-terminal-text uppercase">Jay Krayenbuehl</div>
                    <div className="text-[8px] font-mono text-terminal-green uppercase tracking-tighter">Tier 1 Institutional Access</div>
                  </div>
                  <div className="p-2 space-y-1">
                    {[
                      { icon: User, label: 'Profile Settings' },
                      { icon: Shield, label: 'Security Protocols' },
                      { icon: ExternalLink, label: 'API Documentation' },
                    ].map((item, i) => (
                      <button key={i} className="w-full flex items-center gap-3 px-3 py-2 text-[10px] font-mono text-terminal-muted hover:text-terminal-text hover:bg-terminal-bg transition-colors uppercase tracking-wider">
                        <item.icon className="w-3.5 h-3.5" />
                        {item.label}
                      </button>
                    ))}
                    <div className="h-px bg-terminal-border my-1" />
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-[10px] font-mono text-terminal-red hover:bg-terminal-red/10 transition-colors uppercase tracking-wider">
                      <LogOut className="w-3.5 h-3.5" />
                      Terminate Session
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Globe, 
  BrainCircuit, 
  LayoutDashboard, 
  Search, 
  Newspaper, 
  Users, 
  Settings,
  Terminal,
  TrendingUp,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { SettingsModal } from '../SettingsModal';

const navItems = [
  { icon: Globe, label: 'Worldview', path: '/' },
  { icon: BrainCircuit, label: 'Strategy', path: '/strategy' },
  { icon: LayoutDashboard, label: 'Watchlist', path: '/watchlist' },
  { icon: Search, label: 'Discovery', path: '/discovery' },
  { icon: Newspaper, label: 'News Intel', path: '/news' },
  { icon: Users, label: 'Social', path: '/social' },
];

export const Sidebar: React.FC = () => {
  const [showSettings, setShowSettings] = React.useState(false);

  return (
    <aside className="w-16 md:w-48 bg-terminal-bg border-r border-terminal-border flex flex-col h-screen sticky top-0">
      <div className="p-4 border-b border-terminal-border flex items-center gap-2">
        <Terminal className="w-6 h-6 text-terminal-accent" />
        <span className="hidden md:block font-mono font-bold text-sm tracking-tighter">FINCEPT <span className="text-terminal-accent">v2.0</span></span>
      </div>
      
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-4 py-3 text-xs font-mono transition-colors border-l-2",
                  isActive 
                    ? "bg-terminal-surface text-terminal-accent border-terminal-accent" 
                    : "text-terminal-muted border-transparent hover:bg-terminal-surface hover:text-terminal-text"
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className="hidden md:block uppercase tracking-widest">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-terminal-border space-y-4">
        <div className="hidden md:block space-y-2">
          <div className="flex justify-between text-[10px] font-mono text-terminal-muted uppercase">
            <span>Market Status</span>
            <span className="text-terminal-green">Open</span>
          </div>
          <div className="h-1 bg-terminal-border w-full">
            <div className="h-full bg-terminal-green w-3/4 animate-pulse" />
          </div>
        </div>
        
        <button 
          onClick={() => setShowSettings(true)}
          className="w-full flex items-center gap-3 px-0 md:px-4 py-2 text-xs font-mono text-terminal-muted hover:text-terminal-text transition-colors"
        >
          <Settings className="w-5 h-5 shrink-0" />
          <span className="hidden md:block uppercase tracking-widest">Settings</span>
        </button>
      </div>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </aside>
  );
};

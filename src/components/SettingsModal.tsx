import React, { useState } from 'react';
import { X, Shield, Bell, User, Database, Terminal, Key, Cpu, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SettingsModalProps {
  onClose: () => void;
}

type Tab = 'profile' | 'alerts' | 'security' | 'api';

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    sentimentShifts: true,
    supplyChain: false,
    aiInsights: true
  });

  const toggleKeyVisibility = (key: string) => {
    setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-terminal-accent">Account Profile</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-terminal-muted uppercase">Terminal Name</label>
                  <input type="text" defaultValue="Jay K." className="w-full bg-terminal-bg border border-terminal-border p-2 text-xs font-mono focus:outline-none focus:border-terminal-accent text-terminal-text" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-terminal-muted uppercase">Access Level</label>
                  <div className="w-full bg-terminal-bg border border-terminal-border p-2 text-xs font-mono text-terminal-green uppercase">Tier 1 Institutional</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-terminal-accent">Interface Preferences</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border border-terminal-border bg-terminal-bg/30">
                  <span className="text-[10px] font-mono uppercase text-terminal-muted">High Contrast Mode</span>
                  <div className="w-8 h-4 bg-terminal-border rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-2 h-2 bg-terminal-muted rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'alerts':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-terminal-accent">Notification Matrix</h3>
              <div className="space-y-2">
                {[
                  { id: 'priceAlerts', label: 'Price Threshold Alerts' },
                  { id: 'sentimentShifts', label: 'News Sentiment Shifts' },
                  { id: 'supplyChain', label: 'Supply Chain Disruptions' },
                  { id: 'aiInsights', label: 'AI Strategy Insights' },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border border-terminal-border bg-terminal-bg/30 hover:border-terminal-accent/30 transition-colors">
                    <span className="text-[10px] font-mono uppercase text-terminal-muted">{item.label}</span>
                    <button 
                      onClick={() => toggleNotification(item.id as keyof typeof notifications)}
                      className={`w-10 h-5 rounded-full relative transition-colors ${notifications[item.id as keyof typeof notifications] ? 'bg-terminal-accent' : 'bg-terminal-border'}`}
                    >
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${notifications[item.id as keyof typeof notifications] ? 'right-1' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'api':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-terminal-accent">API Configuration</h3>
              <p className="text-[10px] font-mono text-terminal-muted leading-relaxed">
                Configure your external data providers. Keys are stored locally in your terminal session.
              </p>
              
              <div className="space-y-4">
                {[
                  { id: 'alpaca', label: 'Alpaca Trade API', key: 'PK********************' },
                  { id: 'finnhub', label: 'Finnhub Market Data', key: 'cn********************' },
                  { id: 'gemini', label: 'Google Gemini AI', key: 'AIza********************' },
                ].map((provider) => (
                  <div key={provider.id} className="space-y-2 p-3 border border-terminal-border bg-terminal-bg/30">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono uppercase font-bold text-terminal-text">{provider.label}</span>
                      <span className="text-[9px] font-mono text-terminal-green uppercase">Connected</span>
                    </div>
                    <div className="relative">
                      <input 
                        type={showKeys[provider.id] ? 'text' : 'password'} 
                        value={provider.key}
                        readOnly
                        className="w-full bg-terminal-bg border border-terminal-border p-2 pr-10 text-[10px] font-mono text-terminal-muted focus:outline-none"
                      />
                      <button 
                        onClick={() => toggleKeyVisibility(provider.id)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-terminal-muted hover:text-terminal-accent"
                      >
                        {showKeys[provider.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return <div className="text-terminal-muted font-mono text-xs">Module under maintenance.</div>;
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-terminal-bg/80 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-terminal-surface border border-terminal-border w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-4 border-b border-terminal-border bg-terminal-bg flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-terminal-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest">System Configuration</span>
          </div>
          <button onClick={onClose} className="text-terminal-muted hover:text-terminal-text transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex h-[450px]">
          {/* Sidebar */}
          <div className="w-48 border-r border-terminal-border bg-terminal-bg/50 p-2 space-y-1">
            {[
              { id: 'profile', icon: User, label: 'Profile' },
              { id: 'alerts', icon: Bell, label: 'Notifications' },
              { id: 'api', icon: Key, label: 'API Keys' },
              { id: 'security', icon: Shield, label: 'Security' },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`w-full flex items-center gap-3 px-3 py-3 text-[10px] font-mono uppercase tracking-wider transition-all border-l-2 ${
                  activeTab === item.id 
                    ? 'text-terminal-accent bg-terminal-surface border-terminal-accent' 
                    : 'text-terminal-muted hover:text-terminal-text border-transparent hover:bg-terminal-surface/50'
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 p-8 overflow-auto bg-terminal-surface/30">
            {renderTabContent()}
          </div>
        </div>

        <div className="p-4 border-t border-terminal-border bg-terminal-bg flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="terminal-btn px-6 text-terminal-muted hover:text-terminal-text"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              console.log('Settings saved:', { notifications });
              onClose();
            }} 
            className="terminal-btn px-8 bg-terminal-accent text-white border-none hover:bg-terminal-accent/90 transition-colors shadow-lg shadow-terminal-accent/20"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
};

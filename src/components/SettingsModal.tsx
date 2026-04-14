import React from 'react';
import { X, Shield, Bell, User, Database, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-terminal-bg/80 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-terminal-surface border border-terminal-border w-full max-w-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-4 border-b border-terminal-border bg-terminal-bg flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-terminal-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest">System Settings</span>
          </div>
          <button onClick={onClose} className="text-terminal-muted hover:text-terminal-text">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex h-[400px]">
          {/* Sidebar */}
          <div className="w-40 border-r border-terminal-border bg-terminal-bg/50 p-2 space-y-1">
            {[
              { icon: User, label: 'Profile' },
              { icon: Bell, label: 'Alerts' },
              { icon: Shield, label: 'Security' },
              { icon: Database, label: 'Data API' },
            ].map((item, i) => (
              <button 
                key={i}
                className={`w-full flex items-center gap-3 px-3 py-2 text-[10px] font-mono uppercase tracking-wider transition-colors ${i === 0 ? 'text-terminal-accent bg-terminal-surface' : 'text-terminal-muted hover:text-terminal-text'}`}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 p-6 space-y-6 overflow-auto">
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-terminal-accent">Account Profile</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-terminal-muted uppercase">Terminal Name</label>
                  <input type="text" defaultValue="Jay K." className="w-full bg-terminal-bg border border-terminal-border p-2 text-xs font-mono focus:outline-none focus:border-terminal-accent" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-terminal-muted uppercase">Access Level</label>
                  <div className="w-full bg-terminal-bg border border-terminal-border p-2 text-xs font-mono text-terminal-green uppercase">Tier 1 Institutional</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-terminal-accent">Notification Matrix</h3>
              <div className="space-y-2">
                {['Price Alerts', 'News Sentiment Shifts', 'Supply Chain Disruptions'].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 border border-terminal-border bg-terminal-bg/30">
                    <span className="text-[10px] font-mono uppercase text-terminal-muted">{item}</span>
                    <div className="w-8 h-4 bg-terminal-accent rounded-full relative">
                      <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-terminal-border bg-terminal-bg flex justify-end gap-3">
          <button onClick={onClose} className="terminal-btn px-6">Cancel</button>
          <button onClick={onClose} className="terminal-btn px-6 bg-terminal-accent text-white border-none">Save Changes</button>
        </div>
      </motion.div>
    </div>
  );
};

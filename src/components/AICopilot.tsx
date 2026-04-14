import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { BrainCircuit, Send, X, MessageSquare, Terminal, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AICopilot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'Terminal AI initialized. How can I assist your market analysis today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (customMessage?: string) => {
    const msgToSend = customMessage || message;
    if (!msgToSend.trim() || isLoading) return;
    
    setChat(prev => [...prev, { role: 'user', text: msgToSend }]);
    if (!customMessage) setMessage('');
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msgToSend }),
      });

      if (!response.ok) throw new Error("Failed to chat");
      const data = await response.json();
      
      setChat(prev => [...prev, { role: 'ai', text: data.response }]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      setChat(prev => [...prev, { role: 'ai', text: "Error: Failed to connect to AI engine." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-terminal-accent text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-[100] group"
      >
        <BrainCircuit className="w-7 h-7 group-hover:animate-pulse" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-terminal-green rounded-full border-2 border-terminal-bg" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-terminal-surface border border-terminal-border shadow-2xl flex flex-col z-[100] overflow-hidden"
          >
            {/* Header */}
            <div className="p-3 border-b border-terminal-border bg-terminal-bg flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-terminal-accent" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">AI Market Copilot <span className="text-terminal-green">{isLoading ? 'Processing...' : 'Online'}</span></span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-terminal-muted hover:text-terminal-text">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-auto p-4 space-y-4 font-mono text-xs">
              {chat.map((msg, i) => (
                <div key={i} className={cn(
                  "flex flex-col",
                  msg.role === 'user' ? "items-end" : "items-start"
                )}>
                  <div className={cn(
                    "max-w-[85%] p-3 rounded-none border",
                    msg.role === 'user' 
                      ? "bg-terminal-accent/10 border-terminal-accent/30 text-terminal-text" 
                      : "bg-terminal-bg border-terminal-border text-terminal-muted"
                  )}>
                    {msg.role === 'ai' && <Sparkles className="w-3 h-3 text-terminal-accent mb-2" />}
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start">
                  <div className="bg-terminal-bg border border-terminal-border p-3 text-terminal-muted animate-pulse">
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-terminal-border bg-terminal-bg">
              <div className="relative">
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about markets, news, or strategies..."
                  disabled={isLoading}
                  className="w-full bg-terminal-surface border border-terminal-border py-2 pl-3 pr-10 text-xs font-mono focus:outline-none focus:border-terminal-accent disabled:opacity-50"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-terminal-muted hover:text-terminal-accent disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-2 flex gap-2">
                <button 
                  onClick={() => handleSend("Why is oil up?")}
                  disabled={isLoading}
                  className="text-[9px] font-mono text-terminal-muted hover:text-terminal-accent uppercase border border-terminal-border px-1.5 py-0.5 disabled:opacity-50"
                >
                  Why is oil up?
                </button>
                <button 
                  onClick={() => handleSend("NVDA Analysis")}
                  disabled={isLoading}
                  className="text-[9px] font-mono text-terminal-muted hover:text-terminal-accent uppercase border border-terminal-border px-1.5 py-0.5 disabled:opacity-50"
                >
                  NVDA Analysis
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};



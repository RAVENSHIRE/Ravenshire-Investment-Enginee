import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { BrainCircuit, Send, X, MessageSquare, Terminal, Sparkles, Trash2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AICopilot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'Terminal AI initialized. How can I assist your market analysis today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when chat updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, isLoading]);

  const handleSend = async (customMessage?: string) => {
    const msgToSend = customMessage || message;
    if (!msgToSend.trim() || isLoading) return;
    
    setChat(prev => [...prev, { role: 'user', text: msgToSend }]);
    setMessage('');
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
      setChat(prev => [...prev, { role: 'ai', text: "SYSTEM ERROR: Failed to connect to AI engine. Please check network connectivity." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestion = (suggestion: string) => {
    setMessage(suggestion);
    inputRef.current?.focus();
  };

  const clearChat = () => {
    setChat([{ role: 'ai', text: 'Terminal AI reset. Session history cleared.' }]);
  };

  const suggestions = [
    "Why is oil up?",
    "NVDA Analysis",
    "Market Sentiment",
    "Supply Chain Risks"
  ];

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
            className="fixed bottom-24 right-6 w-96 h-[550px] bg-terminal-surface border border-terminal-border shadow-2xl flex flex-col z-[100] overflow-hidden"
          >
            {/* Header */}
            <div className="p-3 border-b border-terminal-border bg-terminal-bg flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-terminal-accent" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">
                  Ravenshire AI <span className={cn("ml-2", isLoading ? "text-terminal-amber animate-pulse" : "text-terminal-green")}>
                    {isLoading ? 'Processing...' : 'Online'}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={clearChat}
                  title="Clear Chat"
                  className="text-terminal-muted hover:text-terminal-red transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setIsOpen(false)} className="text-terminal-muted hover:text-terminal-text">
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-auto p-4 space-y-4 font-mono text-xs scroll-smooth"
            >
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
                    {msg.role === 'ai' && (
                      <div className="flex items-center gap-1.5 mb-2 text-terminal-accent opacity-70">
                        <Sparkles className="w-3 h-3" />
                        <span className="text-[8px] uppercase tracking-tighter">Intelligence Feed</span>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start">
                  <div className="bg-terminal-bg border border-terminal-border p-3 text-terminal-muted animate-pulse flex items-center gap-2">
                    <div className="w-1 h-1 bg-terminal-accent rounded-full animate-bounce" />
                    <div className="w-1 h-1 bg-terminal-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1 h-1 bg-terminal-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                    <span className="ml-1">Analyzing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-terminal-border bg-terminal-bg">
              {/* Suggestion Chips */}
              <div className="mb-3 flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button 
                    key={s}
                    onClick={() => handleSuggestion(s)}
                    disabled={isLoading}
                    className="text-[9px] font-mono text-terminal-muted hover:text-terminal-accent hover:border-terminal-accent uppercase border border-terminal-border px-1.5 py-0.5 transition-colors disabled:opacity-50"
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="relative">
                <input 
                  ref={inputRef}
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about markets, news, or strategies..."
                  disabled={isLoading}
                  className="w-full bg-terminal-surface border border-terminal-border py-2.5 pl-3 pr-10 text-xs font-mono focus:outline-none focus:border-terminal-accent disabled:opacity-50 transition-colors"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={isLoading || !message.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-terminal-muted hover:text-terminal-accent disabled:opacity-30 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-2 text-[8px] text-terminal-muted uppercase tracking-widest text-center opacity-50">
                Powered by Ravenshire Intelligence Engine
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};



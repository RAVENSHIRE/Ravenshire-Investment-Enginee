import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Users, 
  MessageSquare, 
  Repeat2, 
  Share2, 
  TrendingUp, 
  BarChart3, 
  Award,
  ChevronRight,
  Plus,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const posts = [
  {
    user: 'MacroWhale',
    avatar: 'MW',
    time: '2h ago',
    content: 'Just analyzed the latest TSMC utilization rates. AI demand is so strong it’s cannibalizing legacy node capacity. Bullish for $NVDA and $AVGO, but watch out for automotive chip supply chains. 📈',
    tags: ['$NVDA', '$AVGO', 'Semis'],
    likes: 124,
    reposts: 42,
    comments: 18,
    prediction: { asset: 'NVDA', target: '$1,350', accuracy: '94%' }
  },
  {
    user: 'EnergyQuant',
    avatar: 'EQ',
    time: '4h ago',
    content: 'The Microsoft-Constellation deal is just the beginning. Every hyperscaler will need dedicated baseload. Looking at $VST and $SMR as the next structural winners. The grid is the new bottleneck.',
    tags: ['$VST', '$SMR', 'Energy'],
    likes: 89,
    reposts: 28,
    comments: 12,
    prediction: { asset: 'VST', target: '$310', accuracy: '88%' }
  }
];

export const SocialLayer: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-terminal-accent">
            <Users className="w-5 h-5" />
            <span className="font-mono text-xs uppercase tracking-[0.3em]">Social Intelligence</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Community Insights & Predictions</h1>
        </div>
        <button className="terminal-btn bg-terminal-accent text-white border-none flex items-center gap-2">
          <Plus className="w-4 h-4" /> Post Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Feed */}
        <div className="xl:col-span-3 space-y-4">
          <div className="terminal-header">
            <span>Intelligence Feed</span>
            <div className="flex gap-4">
              <span className="text-terminal-accent">Trending</span>
              <span className="text-terminal-muted">Following</span>
              <span className="text-terminal-muted">Predictions</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {posts.map((post, i) => (
              <div key={i} className="terminal-card p-4 space-y-4 hover:border-terminal-muted transition-colors cursor-pointer">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-terminal-surface border border-terminal-border flex items-center justify-center font-bold text-terminal-accent">
                      {post.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{post.user}</span>
                        <span className="text-[10px] font-mono text-terminal-muted">{post.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-terminal-green uppercase">
                        <Award className="w-3 h-3" /> Top Predictor
                      </div>
                    </div>
                  </div>
                  {post.prediction && (
                    <div className="p-2 bg-terminal-surface border border-terminal-border text-right space-y-1">
                      <div className="text-[9px] font-mono text-terminal-muted uppercase">Prediction: {post.prediction.asset}</div>
                      <div className="text-xs font-bold text-terminal-green">{post.prediction.target}</div>
                      <div className="text-[8px] font-mono text-terminal-muted uppercase">Accuracy: {post.prediction.accuracy}</div>
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-terminal-text leading-relaxed">
                  {post.content}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, j) => (
                    <span key={j} className="text-[10px] font-mono text-terminal-accent hover:underline">{tag}</span>
                  ))}
                </div>
                
                <div className="flex items-center gap-6 pt-2 border-t border-terminal-border">
                  <button className="flex items-center gap-2 text-terminal-muted hover:text-terminal-accent transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-[10px] font-mono">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-terminal-muted hover:text-terminal-green transition-colors">
                    <Repeat2 className="w-4 h-4" />
                    <span className="text-[10px] font-mono">{post.reposts}</span>
                  </button>
                  <button className="flex items-center gap-2 text-terminal-muted hover:text-terminal-red transition-colors">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-[10px] font-mono">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-terminal-muted hover:text-terminal-text transition-colors ml-auto">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Reputation & Trending */}
        <div className="space-y-6">
          <div className="terminal-card">
            <div className="terminal-header">
              <span>Top Predictors</span>
              <Award className="w-3 h-3 text-terminal-amber" />
            </div>
            <div className="p-4 space-y-4">
              {[
                { name: 'MacroWhale', score: '2,450', accuracy: '94%' },
                { name: 'EnergyQuant', score: '1,890', accuracy: '88%' },
                { name: 'AlphaSeeker', score: '1,560', accuracy: '82%' },
              ].map((user, i) => (
                <div key={i} className="flex justify-between items-center group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-terminal-muted">0{i+1}</span>
                    <span className="text-xs font-bold group-hover:text-terminal-accent transition-colors">{user.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono font-bold text-terminal-green">{user.accuracy}</div>
                    <div className="text-[8px] font-mono text-terminal-muted uppercase">{user.score} pts</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="terminal-card">
            <div className="terminal-header">
              <span>Trending Discussions</span>
              <BarChart3 className="w-3 h-3 text-terminal-accent" />
            </div>
            <div className="p-4 space-y-3">
              {[
                { tag: '#SMRNuclear', count: '1.2k posts', trend: 'up' },
                { tag: '#AIBottleneck', count: '850 posts', trend: 'up' },
                { tag: '#FedPivot', count: '640 posts', trend: 'down' },
                { tag: '#SolanaSummer', count: '420 posts', trend: 'up' },
              ].map((tag, i) => (
                <div key={i} className="flex justify-between items-center group cursor-pointer">
                  <span className="text-xs font-bold text-terminal-accent group-hover:underline">{tag.tag}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-terminal-muted">{tag.count}</span>
                    {tag.trend === 'up' ? <ArrowUpRight className="w-3 h-3 text-terminal-green" /> : <ArrowDownRight className="w-3 h-3 text-terminal-red" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



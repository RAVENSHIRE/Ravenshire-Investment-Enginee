export interface TickerItem {
  symbol: string;
  price: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface Narrative {
  id: string;
  title: string;
  body: string;
  tag: string;
}

export interface Company {
  ticker: string;
  name: string;
  price: string;
  change: string;
  status: 'Bullish' | 'Watch' | 'Risk' | 'Hold' | 'Supply Chain';
  thesis: string;
  news: {
    text: string;
    date: string;
    type: 'positive' | 'negative' | 'neutral' | 'catalyst';
  }[];
  metrics: {
    label: string;
    value: string;
    trend?: 'up' | 'down' | 'neutral';
  }[];
}

export interface Catalyst {
  date: string;
  event: string;
  description: string;
  status: 'past' | 'upcoming' | 'target';
}

export interface SectorData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  heroStats: { label: string; value: string; color?: string }[];
  breakingNews: { date: string; source: string; text: string };
  narratives: Narrative[];
  companies: Company[];
  catalysts: Catalyst[];
  color: string;
}

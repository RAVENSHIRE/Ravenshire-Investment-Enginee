import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { MarketOverview } from './pages/MarketOverview';
import { StrategySector } from './pages/StrategySector';
import { Watchlist } from './pages/Watchlist';
import { Discovery } from './pages/Discovery';
import { NewsIntelligence } from './pages/NewsIntelligence';
import { SocialLayer } from './pages/SocialLayer';
import { AICopilot } from './components/AICopilot';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function App() {
  return (
    <Router>
      <TooltipProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<MarketOverview />} />
            <Route path="/strategy" element={<StrategySector />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/discovery" element={<Discovery />} />
            <Route path="/news" element={<NewsIntelligence />} />
            <Route path="/social" element={<SocialLayer />} />
          </Routes>
          <AICopilot />
        </MainLayout>
      </TooltipProvider>
    </Router>
  );
}

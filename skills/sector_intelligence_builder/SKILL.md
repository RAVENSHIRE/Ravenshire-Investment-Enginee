---
name: "sector-intelligence-builder"
description: "Enables rapid creation of institutional-grade market intelligence platforms following the ORBIT INTEL structure. Combines live market data, disruptive narratives, Top 10 companies, and catalyst timelines."
---

# Sector Intelligence Builder

This skill enables rapid creation of institutional-grade market intelligence platforms following the ORBIT INTEL structure. Each sector page combines live market data, disruptive narratives, Top 10 companies, catalyst timelines, and high-signal analysis.

## When to Use This Skill
- Building sector-specific market research platforms for institutional investors, hedge funds, or quant traders.
- Creating Bloomberg Terminal-style dashboards with real-time data and narrative-driven insights.
- Replicating ORBIT INTEL structure across multiple sectors (Tech, Healthcare, Consumer, Utilities, Crypto).
- Generating institutional-grade research with asymmetric opportunity identification.

## Core Workflow
1. **Define Sector Parameters**: Identify main catalyst, sub-sectors, key companies, core narratives.
2. **Research Market Data**: Gather live prices, trends, catalysts, competitive positioning.
3. **Generate Sector Data**: Use `generate_sector_template.py` to create structured JSON.
4. **Create React Component**: Build page using `sector_page_template.tsx` with sector-specific styling.
5. **Add Navigation**: Create landing page with links to all sector pages.
6. **Integrate Live Data (optional)**: Replace mock data with WebSocket or REST API feeds.
7. **Deploy**: Save checkpoint and publish to production.

## Quick Start

### 1. Generate Sector Data
```bash
python scripts/generate_sector_template.py --sector tech --output src/data/tech_data.json
```
*Available sectors: tech, health, consumer, utilities, crypto*

### 2. Create Page Component
```tsx
import SectorPage from '@/pages/SectorPage';
import techData from '@/data/tech_data.json';

export default function TechIntel() {
  return <SectorPage data={techData} />;
}
```

### 3. Add Route
```tsx
// App.tsx
<Route path={"/tech"} element={<TechIntel />} />
```

## Bundled Resources

### Scripts
- `scripts/generate_sector_template.py`: Generates structured sector data JSON.

### Templates
- `templates/sector_page_template.tsx`: Reusable React component for sector pages.

### References
- `resources/workflow.md`: Complete step-by-step workflow guide.

## Design System

### Color Palettes (Tailwind CSS)
| Sector | Primary Color | Secondary Color | Accent |
| :--- | :--- | :--- | :--- |
| Tech | Cyan-400 | Blue-500 | text-cyan-400 |
| Health | Emerald-400 | Green-500 | text-emerald-400 |
| Consumer | Purple-400 | Pink-500 | text-purple-400 |
| Utilities | Amber-400 | Yellow-500 | text-amber-400 |
| Crypto | Orange-400 | Yellow-500 | text-orange-400 |

### Icons (Lucide React)
- Tech: `Zap`
- Health: `Heart`
- Consumer: `ShoppingCart`
- Utilities: `Zap` (or custom)
- Crypto: `Coins`

## Best Practices
- **Keep narratives timeless**: Focus on structural trends, not daily noise.
- **Update catalysts quarterly**: Add new events, remove past ones.
- **Rank companies by conviction**: Use 0-25 scoring system.
- **Include second-order effects**: Show cross-sector impacts (e.g., "AI boom → chip demand → energy demand → utilities rerates").
- **Maintain institutional tone**: Hedge fund memo style, minimal fluff.
- **Validate data sources**: Use Bloomberg, Reuters, SEC filings, industry reports.

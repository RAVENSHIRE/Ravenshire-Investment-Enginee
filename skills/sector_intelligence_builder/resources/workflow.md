# Sector Intelligence Suite Workflow Guide

This guide provides a step-by-step process for building and maintaining an institutional-grade market intelligence platform using the **Sector Intelligence Builder** skill.

## Phase 1: Sector Definition & Research

Before writing any code, you must define the strategic parameters of the sector.

### 1. Identify the "Main Catalyst"
What is the single most important structural shift driving this sector?
- **Example (Tech)**: AI Compute Scarcity & Energy Bottleneck.
- **Example (Health)**: GLP-1 Revolution & Longevity Boom.

### 2. Define Core Narratives (Theses)
Identify 3-5 structural trends that explain the sector's evolution.
- Focus on "second-order effects" (e.g., "AI boom → chip demand → energy demand").
- Use institutional terminology (e.g., "Sovereign AI", "Metabolic Gold Rush").

### 3. Select Top 10 Companies
Choose companies that represent the "critical nodes" of the supply chain.
- Include pure-plays and "hidden value" anchors.
- Identify one key metric for each (e.g., "GPU Market Share", "Backlog Growth").

---

## Phase 2: Data Generation

Use the provided script to generate the structured JSON data.

### 1. Run the Script
```bash
python scripts/generate_sector_template.py --sector <name> --output src/data/<name>_data.json
```

### 2. Customize the JSON
Open the generated file and refine the narratives, company metrics, and catalysts based on your research.

---

## Phase 3: Component Implementation

### 1. Create the Page
Create a new file in `src/pages/` (e.g., `TechIntel.tsx`).

```tsx
import SectorPage from '@/templates/SectorPageTemplate';
import techData from '@/data/tech_data.json';

export default function TechIntel() {
  return <SectorPage data={techData} />;
}
```

### 2. Register the Route
Add the new page to your `App.tsx` routing.

```tsx
<Route path="/sector/tech" element={<TechIntel />} />
```

---

## Phase 4: Live Data Integration (Optional)

To move beyond static data, implement a real-time feed.

### WebSocket Integration (Swissquote FIX API style)
```tsx
useEffect(() => {
  const ws = new WebSocket('wss://api.provider.com/feed');
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // Update state with live prices
  };
  return () => ws.close();
}, []);
```

---

## Phase 5: Maintenance & Best Practices

### Quarterly Updates
- **Catalysts**: Remove past events and add new upcoming milestones.
- **Narratives**: Review if the theses still hold or if a new structural shift has emerged.
- **Conviction**: Re-rank companies based on earnings performance and guidance.

### Design Consistency
- Use the **Sector-Specific Color Palettes** defined in `SKILL.md`.
- Ensure all icons are imported from `lucide-react`.
- Maintain the "Institutional Terminal" aesthetic (dark mode, monospace fonts, high density).

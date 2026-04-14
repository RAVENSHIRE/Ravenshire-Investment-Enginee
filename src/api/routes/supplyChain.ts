import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const dependencies = [
      { from: 'Taiwan', to: 'USA', item: 'Semiconductors', status: 'Critical', risk: 'High', volume: 2500000, price: 450.75 },
      { from: 'Germany', to: 'China', item: 'Automotive', status: 'Stable', risk: 'Low', volume: 1200000, price: 32000 },
      { from: 'Saudi Arabia', to: 'Global', item: 'Crude Oil', status: 'Tight', risk: 'Medium', volume: 8500000, price: 82.40 },
      { from: 'Australia', to: 'Japan', item: 'Iron Ore', status: 'Stable', risk: 'Low', volume: 4500000, price: 115.20 },
      { from: 'Brazil', to: 'Europe', item: 'Agricultural Products', status: 'Stable', risk: 'Low', volume: 3200000, price: 45.10 },
      { from: 'Chile', to: 'China', item: 'Copper', status: 'Tight', risk: 'Medium', volume: 900000, price: 8500 },
      { from: 'South Africa', to: 'Global', item: 'Platinum Group Metals', status: 'Critical', risk: 'High', volume: 150000, price: 1200 },
      { from: 'Canada', to: 'USA', item: 'Natural Gas', status: 'Stable', risk: 'Low', volume: 5500000, price: 2.85 }
    ];
    res.json(dependencies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch supply chain data' });
  }
});

export default router;

import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    res.json({
      sp500: 5842.12,
      sp500Change: 0.45,
      btc: 94250.00,
      btcChange: 2.1,
      vix: 14.2,
      vixChange: -1.2,
      oil: 82.40,
      oilChange: 0.8,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch market data' });
  }
});

export default router;

import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
  const apiKey = process.env.FINNHUB_API_KEY;

  if (apiKey) {
    try {
      // Fetch data for S&P 500 (SPY), Bitcoin (BTC), and Oil (USO)
      const symbols = ['SPY', 'BINANCE:BTCUSDT', 'USO'];
      const requests = symbols.map(symbol => 
        axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`)
      );

      const responses = await Promise.all(requests);
      const data = responses.map(r => r.data);

      res.json({
        sp500: data[0].c,
        sp500Change: data[0].dp,
        btc: data[1].c,
        btcChange: data[1].dp,
        oil: data[2].c,
        oilChange: data[2].dp,
        lastUpdated: new Date().toISOString(),
        source: 'Finnhub'
      });
    } catch (error) {
      console.error("Finnhub API Error:", error);
      res.status(500).json({ error: 'Failed to fetch market data from Finnhub' });
    }
  } else {
    // Fallback to mock data
    res.json({
      sp500: 5842.12,
      sp500Change: 0.45,
      btc: 94250.00,
      btcChange: 2.1,
      vix: 14.2,
      vixChange: -1.2,
      oil: 82.40,
      oilChange: 0.8,
      lastUpdated: new Date().toISOString(),
      source: 'Mock'
    });
  }
});

export default router;

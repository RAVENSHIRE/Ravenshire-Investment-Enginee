import { Server } from "socket.io";
import Alpaca from "@alpacahq/alpaca-trade-api";

export function setupMarketDataSocket(io: Server) {
  console.log("Market Data WebSocket initialized");

  const stocks = [
    { symbol: "NVDA", price: 1245.50, change: 4.2 },
    { symbol: "BTC", price: 94250.00, change: 2.1 },
    { symbol: "SPY", price: 584.21, change: 0.45 },
    { symbol: "OIL", price: 82.40, change: 0.8 },
    { symbol: "LLY", price: 945.20, change: 3.5 },
    { symbol: "CEG", price: 245.10, change: 5.2 },
    { symbol: "TSLA", price: 215.30, change: -2.5 },
    { symbol: "SOL", price: 345.20, change: 6.5 },
    { symbol: "RDW", price: 8.45, change: 12.4 },
    { symbol: "OKLO", price: 14.20, change: -2.1 },
    { symbol: "PL", price: 22.50, change: 1.5 },
  ];

  const alpacaKey = process.env.ALPACA_API_KEY_ID;
  const alpacaSecret = process.env.ALPACA_API_SECRET_KEY;

  if (alpacaKey && alpacaSecret) {
    console.log("Alpaca API keys found. Initializing real-time stream...");
    
    const alpaca = new Alpaca({
      keyId: alpacaKey,
      secretKey: alpacaSecret,
      paper: process.env.ALPACA_PAPER === "true",
    });

    const stockStream = alpaca.data_stream_v2;
    const cryptoStream = (alpaca as any).crypto_stream_v1beta3;

    const stockSymbols = ["NVDA", "SPY", "LLY", "CEG", "TSLA", "RDW", "OKLO", "PL", "USO"];
    const cryptoSymbols = ["BTC/USD", "SOL/USD"];

    // Handle Stock Updates
    if (stockStream) {
      stockStream.onConnect(() => {
        console.log("Alpaca Stock Stream Connected");
        stockStream.subscribeForTrades(stockSymbols);
      });

      stockStream.onStockTrade((trade: any) => {
        const symbol = trade.symbol || trade.Symbol || trade.S;
        const price = trade.price || trade.Price || trade.p;
        
        if (!symbol || !price) return;

        const targetSymbol = symbol === "USO" ? "OIL" : symbol;
        const stock = stocks.find(s => s.symbol === targetSymbol);
        
        if (stock) {
          stock.price = price;
          io.emit("market-update", stocks);
        }
      });

      stockStream.onError((err: any) => {
        console.error("Alpaca Stock Stream Error:", err);
      });
      
      stockStream.connect();
    }

    // Handle Crypto Updates
    if (cryptoStream) {
      cryptoStream.onConnect(() => {
        console.log("Alpaca Crypto Stream Connected");
        cryptoStream.subscribeForTrades(cryptoSymbols);
      });

      cryptoStream.onCryptoTrade((trade: any) => {
        const rawSymbol = trade.symbol || trade.Symbol || trade.S;
        const price = trade.price || trade.Price || trade.p;
        
        if (!rawSymbol || !price) return;

        const symbol = rawSymbol.split("/")[0];
        const stock = stocks.find(s => s.symbol === symbol);
        
        if (stock) {
          stock.price = price;
          io.emit("market-update", stocks);
        }
      });

      cryptoStream.onError((err: any) => {
        console.error("Alpaca Crypto Stream Error:", err);
      });
      
      cryptoStream.connect();
    }

  } else {
    console.warn("Alpaca API keys missing. Falling back to simulated market data.");
    // Simulate real-time updates
    setInterval(() => {
      const updates = stocks.map(stock => {
        const fluctuation = 1 + (Math.random() * 0.001 - 0.0005);
        stock.price = parseFloat((stock.price * fluctuation).toFixed(2));
        stock.change = parseFloat((stock.change + (Math.random() * 0.1 - 0.05)).toFixed(2));
        return stock;
      });
      io.emit("market-update", updates);
    }, 2000);
  }

  io.on("connection", (socket) => {
    console.log("Client connected to Market Data Feed:", socket.id);
    socket.emit("market-update", stocks);
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}

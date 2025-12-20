// signight PWA - App v1.0
// Main Application Logic - با آیکن‌های SVG

// ==================== SVG Icons (Lucide Icons) ====================
// https://lucide.dev - Open source icon library
var ICONS = {
  // Status Icons
  excellent: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  good: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
  moderate: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
  risky: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 17a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-.26-7.85a.75.75 0 0 0-1.5.1l.01 4.5v.1a.75.75 0 0 0 1.5-.1v-4.5l-.01-.1Zm1.23-5.5a2.25 2.25 0 0 0-3.94 0L2.3 17.67A2.25 2.25 0 0 0 4.26 21h15.49c1.71 0 2.8-1.84 1.96-3.34l-7.74-14Zm-2.63.73a.75.75 0 0 1 1.32 0l7.74 14a.75.75 0 0 1-.65 1.12H4.25a.75.75 0 0 1-.65-1.11l7.74-14Z"/></svg>',
  avoid: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
  
  // Chart & Stats Icons
  trendingUp: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
  checkCircle: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  coins: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="M16 14h1v4"/></svg>',
  alertTriangle: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 17a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-.26-7.85a.75.75 0 0 0-1.5.1l.01 4.5v.1a.75.75 0 0 0 1.5-.1v-4.5l-.01-.1Zm1.23-5.5a2.25 2.25 0 0 0-3.94 0L2.3 17.67A2.25 2.25 0 0 0 4.26 21h15.49c1.71 0 2.8-1.84 1.96-3.34l-7.74-14Zm-2.63.73a.75.75 0 0 1 1.32 0l7.74 14a.75.75 0 0 1-.65 1.12H4.25a.75.75 0 0 1-.65-1.11l7.74-14Z"/></svg>',
  dollarSign: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  barChart: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
  target: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  x: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  calendar: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  zap: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  
  
  // Existing icons
  btc: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v-2h1c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2h-3V6h-2v2H8v8h3zm0-6h2v2h-2z"/></svg>',
  eth: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.75l-6.25 10.5L12 16l6.25-3.75L12 1.75zM5.75 13.5L12 22.25l6.25-8.75L12 17.25 5.75 13.5z"/></svg>',
  sol: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>',
  coin: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 6v12M8 8.5h6c1 0 2 .5 2 2s-1 2-2 2h-4c-1 0-2 .5-2 2s1 2 2 2h6"/></svg>',
  trendUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>',
  trendDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
  crosshair: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>',
  stopCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><rect x="9" y="9" width="6" height="6"></rect></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',
  rocket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
  circle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
  clipboard: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g fill="none" stroke="currentColor" stroke-width="2"><path stroke-linejoin="round" d="M15.5 4H18a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2.5"/><path stroke-linejoin="round" d="M8.621 3.515A2 2 0 0 1 10.561 2h2.877a2 2 0 0 1 1.94 1.515L16 6H8l.621-2.485Z"/><path d="M9 12h6m-6 4h6"/></g></svg>',

  // Extra small icons for labels / headings
  star: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:6px;vertical-align:middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  list: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:6px;vertical-align:middle;"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></svg>',
  pauseCircle: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="10" y1="9" x2="10" y2="15"/><line x1="14" y1="9" x2="14" y2="15"/></svg>'
};

// ==================== State ====================
var STATE = {
  prices: {},
  klines: {},
  signals: {},
  positions: {},
  settings: {
    capital: 1000,
    riskPercent: 10,
    strategy: 'default',
    leverage: 'auto',
    notificationEnabled: true
  },
  lastUpdate: null,
  allSymbols: [],
  watchlist: [],
  activeAsset: null,
  searchHistory: [], // Last searched symbols
  suggestions: {
    symbols: {}, // { 'BTCUSDT': { symbol, signal, lastUpdate, isActive, updateTimer } }
    updateInterval: 10000, // 10 seconds
    autoUpdateEnabled: true,
    updateTimer: null
  },
  promptManualSelection: false, // Whether user manually selected a symbol in prompt dropdown
  promptUpdatingProgrammatically: false // Flag to prevent change event when updating programmatically
};

var TIMEFRAMES = ['30m', '1h', '4h', '1d'];

var ASSET_INFO = {};

// ==================== API Configuration ====================
// Use Binance Futures API (not Spot)
var BINANCE_API = 'https://fapi.binance.com';
var CMC_API_KEY = '7d3a7b427ee144eabbcdd9c2b78c07ab';
var CMC_API = 'https://pro-api.coinmarketcap.com';
var COINGECKO_API = 'https://api.coingecko.com/api/v3';
var CRYPTOCOMPARE_API = 'https://min-api.cryptocompare.com/data/v2';

// ==================== Realtime Price (Binance WebSocket) ====================
var BINANCE_WS = null;
var BINANCE_WS_CONNECTED = false;
var BINANCE_WS_RECONNECT_TIMEOUT = null;

// ==================== OrderBook WebSocket ====================
var ORDERBOOK_WS = null;
var ORDERBOOK_WS_CONNECTED = false;
var ORDERBOOK_WS_RECONNECT_TIMEOUT = null;
var ORDERBOOK_WS_SYMBOL = null;

function startRealtimePrices() {
  // If WebSocket is not supported, skip
  if (typeof WebSocket === 'undefined') return;

  // Avoid multiple connections
  if (BINANCE_WS && (BINANCE_WS.readyState === WebSocket.OPEN || BINANCE_WS.readyState === WebSocket.CONNECTING)) {
    return;
  }

  try {
    // Use Futures ticker stream
    BINANCE_WS = new WebSocket('wss://fstream.binance.com/ws/!ticker@arr');

    BINANCE_WS.onopen = function() {
      console.log('Binance WS connected (realtime prices)');
      BINANCE_WS_CONNECTED = true;
      checkAPIStatus('binance', true);
      if (BINANCE_WS_RECONNECT_TIMEOUT) {
        clearTimeout(BINANCE_WS_RECONNECT_TIMEOUT);
        BINANCE_WS_RECONNECT_TIMEOUT = null;
      }
    };

    BINANCE_WS.onclose = function(event) {
      console.log('Binance WS closed:', event.code, event.reason || '');
      BINANCE_WS_CONNECTED = false;
      BINANCE_WS = null;

      // Do NOT mark Binance API as unavailable just because of WS close;
      // REST fallbacks might still work. We only rely on checkAPIStatus()
      // from REST calls to decide about availability.

      // Schedule reconnect with simple delay
      if (!BINANCE_WS_RECONNECT_TIMEOUT) {
        BINANCE_WS_RECONNECT_TIMEOUT = setTimeout(function() {
          BINANCE_WS_RECONNECT_TIMEOUT = null;
          startRealtimePrices();
        }, 10000); // 10s
      }
    };

    BINANCE_WS.onerror = function(err) {
      console.log('Binance WS error:', err && err.message ? err.message : err);
      // Let onclose handle reconnection
    };

    BINANCE_WS.onmessage = function(event) {
      try {
        var data = JSON.parse(event.data);

        // !ticker@arr sends an array of tickers
        var tickers = Array.isArray(data) ? data : [data];

        // Fast lookup for watchlist symbols
        var watchlistSet = {};
        STATE.watchlist.forEach(function(sym) { watchlistSet[sym] = true; });

        var updatedAny = false;

        tickers.forEach(function(t) {
          // Binance uses "s" for symbol, "c" for lastPrice, "P" for priceChangePercent,
          // "h" for high, "l" for low, "v" for volume.
          var symbol = t.s;
          if (!symbol || !watchlistSet[symbol]) return;

          var price = parseFloat(t.c);
          if (!isFinite(price) || price <= 0) return;

          var change = parseFloat(t.P);

          STATE.prices[symbol] = {
            price: price,
            change: isFinite(change) ? change : 0,
            high: parseFloat(t.h) || price,
            low: parseFloat(t.l) || price,
            volume: parseFloat(t.v) || 0,
            source: 'binance_ws'
          };

          updatedAny = true;

          // If this is the active asset, re-render panel
          if (symbol === STATE.activeAsset) {
            renderAssetPanel(symbol);
          }
        });

        if (updatedAny) {
          STATE.lastUpdate = Date.now();
          updateLastUpdateTime();
        }
      } catch (e) {
        console.log('Binance WS parse error:', e.message);
      }
    };
  } catch (e) {
    console.log('Failed to start Binance WS:', e.message);
  }
}

// ==================== OrderBook WebSocket (Depth Stream) ====================
function startOrderBookWS(symbol) {
  // If WebSocket is not supported, skip
  if (typeof WebSocket === 'undefined') return;
  
  // Convert symbol format: BTCUSDT -> btcusdt
  var streamSymbol = symbol ? symbol.toLowerCase() : null;
  if (!streamSymbol) return;
  
  // If same symbol is already connected, skip
  if (ORDERBOOK_WS && ORDERBOOK_WS_SYMBOL === symbol && 
      (ORDERBOOK_WS.readyState === WebSocket.OPEN || ORDERBOOK_WS.readyState === WebSocket.CONNECTING)) {
    return;
  }
  
  // Close existing connection if different symbol
  if (ORDERBOOK_WS && ORDERBOOK_WS_SYMBOL !== symbol) {
    stopOrderBookWS();
  }
  
  try {
    // Binance Futures depth stream: @depth20 gives snapshot every 1 second
    var wsUrl = 'wss://fstream.binance.com/ws/' + streamSymbol + '@depth20';
    ORDERBOOK_WS = new WebSocket(wsUrl);
    ORDERBOOK_WS_SYMBOL = symbol;
    
    ORDERBOOK_WS.onopen = function() {
      console.log('OrderBook WS connected for ' + symbol);
      ORDERBOOK_WS_CONNECTED = true;
      if (ORDERBOOK_WS_RECONNECT_TIMEOUT) {
        clearTimeout(ORDERBOOK_WS_RECONNECT_TIMEOUT);
        ORDERBOOK_WS_RECONNECT_TIMEOUT = null;
      }
    };
    
    ORDERBOOK_WS.onclose = function(event) {
      console.log('OrderBook WS closed for ' + symbol + ':', event.code);
      ORDERBOOK_WS_CONNECTED = false;
      ORDERBOOK_WS = null;
      ORDERBOOK_WS_SYMBOL = null;
      
      // Reconnect if still active asset
      if (!ORDERBOOK_WS_RECONNECT_TIMEOUT && symbol === STATE.activeAsset) {
        ORDERBOOK_WS_RECONNECT_TIMEOUT = setTimeout(function() {
          ORDERBOOK_WS_RECONNECT_TIMEOUT = null;
          if (symbol === STATE.activeAsset) {
            startOrderBookWS(symbol);
          }
        }, 5000); // 5s reconnect delay
      }
    };
    
    ORDERBOOK_WS.onerror = function(err) {
      console.log('OrderBook WS error for ' + symbol + ':', err);
      // Let onclose handle reconnection
    };
    
    ORDERBOOK_WS.onmessage = function(event) {
      try {
        var data = JSON.parse(event.data);
        
        // Binance depth format: { "lastUpdateId": 123, "bids": [[price, amount], ...], "asks": [[price, amount], ...] }
        if (!data.bids || !data.asks) return;
        
        // Convert to our format
        var orderBook = {
          bids: data.bids.map(function(bid) {
            return { price: parseFloat(bid[0]), amount: parseFloat(bid[1]) };
          }).filter(function(bid) {
            return bid.price > 0 && bid.amount > 0;
          }),
          asks: data.asks.map(function(ask) {
            return { price: parseFloat(ask[0]), amount: parseFloat(ask[1]) };
          }).filter(function(ask) {
            return ask.price > 0 && ask.amount > 0;
          }),
          timestamp: Date.now(),
          lastUpdateId: data.lastUpdateId || null
        };
        
        // Update signal orderBook
        if (STATE.signals[symbol]) {
          // Detect walls
          if (typeof AnalysisEngine !== 'undefined') {
            try {
              var engine = new AnalysisEngine('binance', symbol.replace('USDT', '/USDT'));
              var walls = engine.detectWalls(orderBook);
              STATE.signals[symbol].orderBookWalls = walls;
            } catch (e) {
              console.log('Error detecting walls:', e.message);
            }
          }
          
          STATE.signals[symbol].orderBook = orderBook;
          
          // Re-check Counter-Targeting if orderBook data is now available
          if (STATE.signals[symbol] && (STATE.signals[symbol].type === 'long' || STATE.signals[symbol].type === 'short') && typeof CounterTargeting !== 'undefined') {
            try {
              var sig = STATE.signals[symbol];
              var price = STATE.prices[symbol] ? STATE.prices[symbol].price : sig.entry || 0;
              
              // Calculate ATR if not available
              var atr = 0;
              if (STATE.klines[symbol] && STATE.klines[symbol]['4h']) {
                atr = TradingCore.calcATR(STATE.klines[symbol]['4h'], 14, price);
              } else if (STATE.klines[symbol] && STATE.klines[symbol]['1h']) {
                atr = TradingCore.calcATR(STATE.klines[symbol]['1h'], 14, price);
              }
              if (!isFinite(atr) || atr <= 0) atr = price * 0.015;
              
              // Calculate overallScore
              var overallScore = 100;
              if (typeof ScoringEngine !== 'undefined' && STATE.klines[symbol]) {
                var scoringEngine = new ScoringEngine();
                var analysisData = {
                  timeframeResults: sig.tfAnalysis || {},
                  orderBook: orderBook,
                  walls: walls,
                  currentPrice: price
                };
                var scoreResult = scoringEngine.calculateOverallScore(analysisData);
                overallScore = scoreResult.overall || 100;
              }
              
              // Prepare marketData
              var marketData = {
                currentPrice: price,
                atr: atr,
                overallScore: overallScore,
                results: sig.tfAnalysis || {},
                orderBook: orderBook,
                walls: walls
              };
              
              // Check Counter-Targeting based on signal type
              var counterCheck = null;
              var counterSignal = null;
              
              if (sig.type === 'long') {
                counterCheck = CounterTargeting.checkCounterShort(sig, marketData);
                if (counterCheck.shouldGenerate && (!sig.counterSignal || sig.counterSignal.type !== 'short')) {
                  counterSignal = CounterTargeting.generateCounterShortSignal(sig, marketData, counterCheck);
                }
              } else if (sig.type === 'short') {
                counterCheck = CounterTargeting.checkCounterLong(sig, marketData);
                if (counterCheck.shouldGenerate && (!sig.counterSignal || sig.counterSignal.type !== 'long')) {
                  counterSignal = CounterTargeting.generateCounterLongSignal(sig, marketData, counterCheck);
                }
              }
              
              if (counterSignal) {
                sig.counterSignal = counterSignal;
                if (!sig.reasons) sig.reasons = [];
                if (sig.reasons.indexOf('⚠️ سیگنال معکوس در دسترس است') === -1) {
                  sig.reasons.push('⚠️ سیگنال معکوس در دسترس است');
                }
                console.log('[Counter-Signal] Generated counter-signal in WebSocket update for', symbol);
                // Force re-render to show counter-signal
                if (symbol === STATE.activeAsset) {
                  renderAssetPanel(symbol);
                }
              } else if (sig.counterSignal && ((sig.type === 'long' && sig.counterSignal.type !== 'short') || (sig.type === 'short' && sig.counterSignal.type !== 'long'))) {
                // Clear counter signal if type doesn't match
                sig.counterSignal = null;
              }
            } catch (e) {
              console.log('Counter-Targeting re-check error for ' + symbol + ': ' + e.message);
            }
          }
          
          // Re-render if active
          if (symbol === STATE.activeAsset) {
            renderAssetPanel(symbol);
          }
        }
      } catch (e) {
        console.log('OrderBook WS parse error:', e.message);
      }
    };
  } catch (e) {
    console.log('Failed to start OrderBook WS:', e.message);
  }
}

function stopOrderBookWS() {
  if (ORDERBOOK_WS) {
    ORDERBOOK_WS.close();
    ORDERBOOK_WS = null;
    ORDERBOOK_WS_CONNECTED = false;
    ORDERBOOK_WS_SYMBOL = null;
  }
  if (ORDERBOOK_WS_RECONNECT_TIMEOUT) {
    clearTimeout(ORDERBOOK_WS_RECONNECT_TIMEOUT);
    ORDERBOOK_WS_RECONNECT_TIMEOUT = null;
  }
}

// API Status tracking
var API_STATUS = {
  binance: { available: true, lastCheck: 0, errorCount: 0 },
  coingecko: { available: true, lastCheck: 0, errorCount: 0 },
  cryptocompare: { available: true, lastCheck: 0, errorCount: 0 }
};

var CMC_API_EXHAUSTED = false;
var CMC_PRICE_CACHE = {}; // Cache for CMC prices
var KLINES_CACHE = {}; // Cache for klines from alternative sources

// Stablecoins that are always ~$1
var STABLECOINS = ['USDT', 'USDC', 'BUSD', 'DAI', 'TUSD', 'USDP', 'GUSD', 'FRAX', 'LUSD', 'FDUSD'];

// Check API availability
function checkAPIStatus(apiName, success) {
  var status = API_STATUS[apiName];
  if (success) {
    status.available = true;
    status.errorCount = 0;
  } else {
    status.errorCount++;
    // Mark as unavailable after 3 consecutive errors
    if (status.errorCount >= 3) {
      status.available = false;
      console.log(apiName + ' API marked as unavailable');
    }
  }
  status.lastCheck = Date.now();
}

// Reset API status periodically (every 5 minutes)
setInterval(function() {
  Object.keys(API_STATUS).forEach(function(api) {
    if (!API_STATUS[api].available && Date.now() - API_STATUS[api].lastCheck > 300000) {
      API_STATUS[api].available = true;
      API_STATUS[api].errorCount = 0;
      console.log(api + ' API reset to available');
    }
  });
}, 60000);

// ==================== Coin Icon Cache ====================
var COIN_ICON_CACHE = {};

// CoinMarketCap ID mapping for icons - Only supported symbols
var CMC_IDS = {
  'BTC': 1,
  'ETH': 1027,
  'XRP': 52,
  'BNB': 1839,
  'SOL': 5426,
  'TRX': 1958,
  'DOGE': 74,
  'ADA': 2010,
  'LINK': 1975,
  'DOT': 6636,
  'LTC': 2
};

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', function() {
  console.log('signight PWA Loading...');
  setupUpdateUI();
  registerSW();
  loadSettings();
  initUI();
  setupEvents();
  loadAllSymbols();
  startDataLoop();
  
  // Start auto suggestions after a short delay
  setTimeout(function() {
    initSuggestionsSystem();
  }, 3000);
  
  console.log('PWA Ready');
});

// ==================== Service Worker ====================
var SW_UPDATE_STATE = {
  waitingWorker: null,
  bannerShown: false,
  dismissed: false,
  reloading: false
};

function setupUpdateUI() {
  var refreshBtn = document.getElementById('updateRefreshBtn');
  var dismissBtn = document.getElementById('updateDismissBtn');
  
  if (refreshBtn) {
    refreshBtn.addEventListener('click', applyPendingUpdate);
  }
  
  if (dismissBtn) {
    dismissBtn.addEventListener('click', function() {
      hideUpdateBanner(true);
    });
  }
}

function setWaitingWorker(worker) {
  SW_UPDATE_STATE.waitingWorker = worker;
  SW_UPDATE_STATE.bannerShown = false;
  SW_UPDATE_STATE.dismissed = false;
  showUpdateBanner();
}

function showUpdateBanner() {
  if (SW_UPDATE_STATE.bannerShown || SW_UPDATE_STATE.dismissed) return;
  var banner = document.getElementById('updateBanner');
  if (!banner) return;
  banner.classList.add('show');
  SW_UPDATE_STATE.bannerShown = true;
}

function hideUpdateBanner(permanent) {
  var banner = document.getElementById('updateBanner');
  if (!banner) return;
  banner.classList.remove('show');
  if (permanent) {
    SW_UPDATE_STATE.dismissed = true;
  }
}

function applyPendingUpdate() {
  if (SW_UPDATE_STATE.waitingWorker) {
    SW_UPDATE_STATE.waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    showToast('در حال بروزرسانی...', 'info');
  } else {
    hideUpdateBanner();
  }
}

function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(function(reg) { 
        console.log('Service Worker registered');
        attachSWUpdateHandlers(reg);
        // Check for updates periodically
        setInterval(function() { reg.update(); }, 30 * 60 * 1000);
      })
      .catch(function(err) { console.log('SW registration failed:', err); });
    
    navigator.serviceWorker.addEventListener('controllerchange', function() {
      if (SW_UPDATE_STATE.reloading) return;
      SW_UPDATE_STATE.reloading = true;
      window.location.reload();
    });
  }
}

function attachSWUpdateHandlers(reg) {
  if (!reg) return;
  
  if (reg.waiting) {
    setWaitingWorker(reg.waiting);
  }
  
  reg.addEventListener('updatefound', function() {
    var newWorker = reg.installing;
    if (!newWorker) return;
    
    newWorker.addEventListener('statechange', function() {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        setWaitingWorker(newWorker);
      }
    });
  });
}

// ==================== Settings ====================
function loadSettings() {
  try {
    var saved = localStorage.getItem('tradingSettings');
    if (saved) STATE.settings = Object.assign(STATE.settings, JSON.parse(saved));
    
    var watchlist = localStorage.getItem('watchlist');
    if (watchlist) STATE.watchlist = JSON.parse(watchlist);
    
    var positions = localStorage.getItem('positions');
    if (positions) STATE.positions = JSON.parse(positions);
    
    var searchHistory = localStorage.getItem('searchHistory');
    if (searchHistory) {
      try {
        STATE.searchHistory = JSON.parse(searchHistory);
        // Ensure max 10 items
        if (STATE.searchHistory.length > 10) {
          STATE.searchHistory = STATE.searchHistory.slice(0, 10);
        }
      } catch (e) {
        console.log('Error loading search history:', e);
        STATE.searchHistory = [];
      }
    }
    
    // Load icon cache from localStorage
    var iconCache = localStorage.getItem('coinIconCache');
    if (iconCache) {
      try {
        var cached = JSON.parse(iconCache);
        // Only keep local icons - remove any online URLs
        for (var symbol in cached) {
          var info = cached[symbol];
          var baseAsset = symbol.replace('USDT', '').toUpperCase();
          var cmcId = CMC_IDS[baseAsset];
          
          // If we have CMC ID, use local icon (override any online URL)
          if (cmcId) {
            info.iconUrl = 'cryptoicons/' + baseAsset + '.png';
            info.hasIcon = true;
          } else if (info.iconUrl && (info.iconUrl.startsWith('http://') || info.iconUrl.startsWith('https://'))) {
            // Remove online URLs for unknown coins
            info.iconUrl = null;
            info.hasIcon = false;
          }
          
          COIN_ICON_CACHE[symbol] = info;
          ASSET_INFO[symbol] = info;
        }
      } catch (e) {
        console.log('Error loading icon cache:', e);
      }
    }
    
    // Load cached suggestions
    var cachedSuggestions = localStorage.getItem('cachedSuggestions');
    if (cachedSuggestions) {
      try {
        var parsed = JSON.parse(cachedSuggestions);
        // Cached suggestions removed - using new suggestions system
      } catch (e) {
        console.log('Error loading cached suggestions:', e);
      }
    }
  } catch (e) { console.log('Error loading settings:', e); }
}

function saveSettings() {
  try {
    localStorage.setItem('tradingSettings', JSON.stringify(STATE.settings));
    localStorage.setItem('watchlist', JSON.stringify(STATE.watchlist));
    localStorage.setItem('positions', JSON.stringify(STATE.positions));
    localStorage.setItem('searchHistory', JSON.stringify(STATE.searchHistory));
    // Save icon cache to localStorage
    try {
      localStorage.setItem('coinIconCache', JSON.stringify(COIN_ICON_CACHE));
    } catch (e) {
      console.log('Error saving icon cache (may be too large):', e);
    }
  } catch (e) { console.log('Error saving settings:', e); }
}

// ==================== UI ====================
function initUI() {
  // Populate prompt symbol dropdown
  var promptSelect = document.getElementById('promptSymbolSelect');
  if (promptSelect) {
    var symbols = DEFAULT_SYMBOLS || ['BTC', 'ETH', 'XRP', 'BNB', 'SOL', 'TRX', 'DOGE', 'ADA', 'LINK', 'DOT', 'LTC'];
    promptSelect.innerHTML = '';
    symbols.forEach(function(symbol) {
      var option = document.createElement('option');
      option.value = symbol;
      option.textContent = symbol;
      promptSelect.appendChild(option);
    });
    // Set default to first symbol or active asset
    var baseAsset = STATE.activeAsset ? STATE.activeAsset.replace('USDT', '') : null;
    if (baseAsset && symbols.includes(baseAsset)) {
      promptSelect.value = baseAsset;
    } else if (symbols.length > 0) {
      promptSelect.value = symbols[0];
    }
    
    // Handle manual selection change
    promptSelect.addEventListener('change', function() {
      // Only set manual selection if not updating programmatically
      if (!STATE.promptUpdatingProgrammatically) {
        STATE.promptManualSelection = true;
        updatePromptButtonText();
      }
    });
  }
  
  // Initial update of prompt button
  updatePromptButtonText();
  
  renderWatchlistTabs();
  if (STATE.activeAsset) {
    renderAssetPanel(STATE.activeAsset);
  } else {
    renderEmptyWatchlist();
  }
}

function updatePromptButtonText() {
  var btnText = document.getElementById('promptBtnText');
  var promptSelect = document.getElementById('promptSymbolSelect');
  
  if (!btnText) return;
  
  // If user manually selected, use dropdown value
  if (STATE.promptManualSelection && promptSelect && promptSelect.value) {
    btnText.textContent = 'پرامپت ' + promptSelect.value;
    return;
  }
  
  // Otherwise, use active asset
  if (STATE.activeAsset) {
    var baseAsset = STATE.activeAsset.replace('USDT', '');
    btnText.textContent = 'پرامپت ' + baseAsset;
    // Update dropdown to match (only if value is different)
    if (promptSelect && promptSelect.value !== baseAsset) {
      STATE.promptUpdatingProgrammatically = true;
      promptSelect.value = baseAsset;
      // Reset flag after a short delay to allow change event to process
      setTimeout(function() {
        STATE.promptUpdatingProgrammatically = false;
      }, 0);
    }
  } else {
    btnText.textContent = 'دریافت پرامپت';
  }
}

function setupEvents() {
  // Prompt section button event
  var getPromptBtn = document.getElementById('getPromptBtn');
  if (getPromptBtn) {
    getPromptBtn.addEventListener('click', function() {
      handleAIPromptClick(null); // null will make it use dropdown value
    });
  }
  
  var searchInput = document.getElementById('searchInput');
  var searchResults = document.getElementById('searchResults');
  
  // Show history when input is focused and empty
  searchInput.addEventListener('focus', function() {
    if (this.value.trim().length === 0) {
      renderSearchHistory();
    }
  });
  
  searchInput.addEventListener('input', function() {
    var query = this.value.toUpperCase().trim();
    if (query.length < 1) {
      renderSearchHistory();
      return;
    }
    
    // Hide history when user starts typing
    searchResults.classList.remove('search-history');
    
    // Search in both symbol and baseAsset, only in supported symbols (exclude stablecoins)
    var matches = STATE.allSymbols.filter(function(s) {
      if (STABLECOINS.includes(s.baseAsset)) return false;
      return s.symbol.includes(query) || s.baseAsset.includes(query);
    });
    
    // Sort: exact matches first, then alphabetically
    matches.sort(function(a, b) {
      var aExact = a.baseAsset === query || a.symbol === query;
      var bExact = b.baseAsset === query || b.symbol === query;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      var aStarts = a.baseAsset.startsWith(query);
      var bStarts = b.baseAsset.startsWith(query);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return a.baseAsset.localeCompare(b.baseAsset);
    });
    
    matches = matches.slice(0, 20); // Show up to 20 results
    
    if (matches.length > 0) {
      searchResults.innerHTML = matches.map(function(s) {
        var iconHtml = '<span style="margin-left:8px;">' + getCoinIconHtml(s.symbol, 20) + '</span>';
        return '<div class="search-item" data-symbol="' + s.symbol + '">' +
               iconHtml +
               '<span class="search-symbol">' + s.baseAsset + '</span>' +
               '<span class="search-pair">/' + s.quoteAsset + '</span>' +
               '</div>';
      }).join('');
      searchResults.style.display = 'block';
    } else {
      // Show "not found" message - no custom symbols allowed
      searchResults.innerHTML = '<div class="search-item search-not-found" style="opacity:0.6;cursor:default;">' +
        '<span style="color:var(--text3);">نمادی با این نام یافت نشد</span>' +
        '</div>';
      searchResults.style.display = 'block';
    }
  });
  
  searchResults.addEventListener('click', function(e) {
    var item = e.target.closest('.search-item');
    // Only allow clicking on real symbols, not "not found" message
    if (item && item.dataset.symbol && !item.classList.contains('search-not-found')) {
      var symbol = item.dataset.symbol;
      addToSearchHistory(symbol);
      selectAsset(symbol);
      searchInput.value = '';
      searchResults.style.display = 'none';
    }
  });
  
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-box')) searchResults.style.display = 'none';
  });
  
  var installBtn = document.getElementById('installBtn');
  var deferredPrompt = null;
  
  window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'flex';
  });
  
  installBtn.addEventListener('click', function() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function(choice) {
        if (choice.outcome === 'accepted') showToast('اپلیکیشن نصب شد', 'success');
        deferredPrompt = null;
        installBtn.style.display = 'none';
      });
    }
  });
}


// ==================== Watchlist ====================
function renderWatchlistTabs() {
  var container = document.getElementById('watchlistTabs');
  container.innerHTML = '';
  
  // Create a set of watchlist symbols for quick lookup
  var watchlistSet = {};
  STATE.watchlist.forEach(function(s) { watchlistSet[s] = true; });
  
  // Show all watchlist symbols
  STATE.watchlist.forEach(function(symbol) {
    // Check both ASSET_INFO and COIN_ICON_CACHE
    var info = ASSET_INFO[symbol] || COIN_ICON_CACHE[symbol] || { 
      name: symbol.replace('USDT', ''), 
      symbol: symbol.replace('USDT', ''),
      icon: ICONS.coin,
      color: '#00E5B0',
      hasIcon: false
    };
    
    // Ensure ASSET_INFO is synced with cache
    if (COIN_ICON_CACHE[symbol] && !ASSET_INFO[symbol]) {
      ASSET_INFO[symbol] = COIN_ICON_CACHE[symbol];
      info = ASSET_INFO[symbol];
    }
    
    var tab = document.createElement('button');
    tab.className = 'tab' + (symbol === STATE.activeAsset ? ' active' : '');
    tab.dataset.symbol = symbol;
    
    var iconHtml = getCoinIconHtml(symbol, 18);
    
    // Check if price has error
    var priceData = STATE.prices[symbol];
    var hasError = priceData && priceData.error;
    
    tab.innerHTML = iconHtml + '<span>' + info.symbol + '</span>' + 
      (hasError ? '<span style="color:var(--red);font-size:8px;margin-right:4px;width:12px;height:12px;display:inline-flex;align-items:center;justify-content:center;">' + ICONS.alertTriangle.replace('viewBox="0 0 24 24"', 'viewBox="0 0 24 24" width="12" height="12"') + '</span>' : '');
    
    tab.addEventListener('click', function() { selectAsset(symbol); });
    container.appendChild(tab);
  });
  
  // Show temporary tab for active asset if it's not in watchlist
  if (STATE.activeAsset && !watchlistSet[STATE.activeAsset]) {
    var symbol = STATE.activeAsset;
    var info = ASSET_INFO[symbol] || COIN_ICON_CACHE[symbol] || { 
      name: symbol.replace('USDT', ''), 
      symbol: symbol.replace('USDT', ''),
      icon: ICONS.coin,
      color: '#00E5B0',
      hasIcon: false
    };
    
    // Ensure ASSET_INFO is synced with cache
    if (COIN_ICON_CACHE[symbol] && !ASSET_INFO[symbol]) {
      ASSET_INFO[symbol] = COIN_ICON_CACHE[symbol];
      info = ASSET_INFO[symbol];
    }
    
    var tab = document.createElement('button');
    tab.className = 'tab active temporary-tab'; // Add temporary-tab class for styling
    tab.dataset.symbol = symbol;
    tab.style.borderStyle = 'dashed'; // Different style for temporary tab
    tab.style.opacity = '0.8';
    
    var iconHtml = getCoinIconHtml(symbol, 18);
    
    var priceData = STATE.prices[symbol];
    var hasError = priceData && priceData.error;
    
    tab.innerHTML = iconHtml + '<span>' + info.symbol + '</span>' + 
      (hasError ? '<span style="color:var(--red);font-size:8px;margin-right:4px;width:12px;height:12px;display:inline-flex;align-items:center;justify-content:center;">' + ICONS.alertTriangle.replace('viewBox="0 0 24 24"', 'viewBox="0 0 24 24" width="12" height="12"') + '</span>' : '');
    
    tab.addEventListener('click', function() { selectAsset(symbol); });
    container.appendChild(tab);
  }
}

function selectAsset(symbol) {
  STATE.activeAsset = symbol;
  
  // Start OrderBook WebSocket for active asset
  startOrderBookWS(symbol);
  renderWatchlistTabs(); // Update tabs to include temporary tab if needed
  document.querySelectorAll('.tab').forEach(function(t) {
    t.classList.toggle('active', t.dataset.symbol === symbol);
  });
  
  // Switch to signal/details view when clicking on a symbol from watchlist
  switchView('signal');
  
  // Always refresh price from Binance when selecting asset
  var baseAsset = symbol.replace('USDT', '');
  var currentPrice = STATE.prices[symbol];
  if (!currentPrice || currentPrice.source !== 'binance' && currentPrice.source !== 'binance_ws') {
    // Force refresh from Binance if price is from fallback source
    fetchPriceFromBinance(symbol, baseAsset);
  }
  
  // Update prompt button text if not manually selected
  if (!STATE.promptManualSelection) {
    updatePromptButtonText();
  }
  
  renderAssetPanel(symbol);
  if (!STATE.klines[symbol]) fetchAssetData(symbol);
}

function renderEmptyWatchlist() {
  var panel = document.getElementById('assetPanel');
  panel.innerHTML = '<div class="empty-watchlist" style="text-align:center;padding:60px 20px;color:var(--text2);">' +
    '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin:0 auto 20px;opacity:0.5;">' +
    '<circle cx="11" cy="11" r="8"></circle>' +
    '<line x1="21" y1="21" x2="16.65" y2="16.65"></line>' +
    '</svg>' +
    '<h3 style="margin:0 0 10px;color:var(--text1);">لیست شما خالی است</h3>' +
    '<p style="margin:0;font-size:14px;">برای شروع، یک نماد را جستجو و اضافه کنید</p>' +
    '</div>';
}

function addToSearchHistory(symbol) {
  // Remove if exists (to move to top)
  var index = STATE.searchHistory.indexOf(symbol);
  if (index > -1) {
    STATE.searchHistory.splice(index, 1);
  }
  
  // Add to beginning
  STATE.searchHistory.unshift(symbol);
  
  // Keep only last 10
  if (STATE.searchHistory.length > 10) {
    STATE.searchHistory = STATE.searchHistory.slice(0, 10);
  }
  
  // Save to localStorage
  try {
    localStorage.setItem('searchHistory', JSON.stringify(STATE.searchHistory));
  } catch (e) {
    console.log('Error saving search history:', e);
  }
}

function renderSearchHistory() {
  var searchResults = document.getElementById('searchResults');
  if (!searchResults) return;
  
  if (STATE.searchHistory.length === 0) {
    searchResults.style.display = 'none';
    return;
  }
  
  searchResults.classList.add('search-history');
  searchResults.innerHTML = STATE.searchHistory.map(function(symbol) {
    var baseAsset = symbol.replace('USDT', '');
    var iconHtml = '<span style="margin-left:8px;">' + getCoinIconHtml(symbol, 20) + '</span>';
    
    return '<div class="search-item search-history-item" data-symbol="' + symbol + '">' +
           iconHtml +
           '<span class="search-symbol">' + baseAsset + '</span>' +
           '</div>';
  }).join('');
  searchResults.style.display = 'block';
}

function addToWatchlist(symbol) {
  var baseAsset = symbol.replace('USDT', '');
  // Silently ignore stablecoins
  if (STABLECOINS.includes(baseAsset)) return;
  
  if (STATE.watchlist.includes(symbol)) {
    showToast('این نماد قبلاً اضافه شده', 'error');
    return;
  }
  STATE.watchlist.push(symbol);
  if (!STATE.activeAsset) {
    STATE.activeAsset = symbol;
  }
  saveSettings();
  renderWatchlistTabs();
  selectAsset(symbol);
  fetchAssetData(symbol);
  fetchCoinIcon(symbol);
  showToast(symbol + ' اضافه شد', 'success');
}

function removeFromWatchlist(symbol) {
  if (STATE.watchlist.length <= 1) {
    showToast('حداقل یک نماد باید باشد', 'error');
    return;
  }
  STATE.watchlist = STATE.watchlist.filter(function(s) { return s !== symbol; });
  // Don't change activeAsset - keep it displayed even if removed from watchlist
  // The tab will become a temporary tab automatically via renderWatchlistTabs
  saveSettings();
  renderWatchlistTabs();
  // Always render the current active asset, even if it's not in watchlist
  if (STATE.activeAsset) {
    renderAssetPanel(STATE.activeAsset);
  } else {
    renderEmptyWatchlist();
  }
  showToast(symbol + ' از لیست حذف شد', 'success');
}

// ==================== Asset Panel ====================
function renderAssetPanel(symbol) {
  // Check both ASSET_INFO and COIN_ICON_CACHE
  var info = ASSET_INFO[symbol] || COIN_ICON_CACHE[symbol] || { 
    name: symbol.replace('USDT', ''), 
    symbol: symbol.replace('USDT', ''),
    icon: ICONS.coin,
    color: '#00E5B0',
    hasIcon: false
  };
  
  // Ensure ASSET_INFO is synced with cache
  if (COIN_ICON_CACHE[symbol] && !ASSET_INFO[symbol]) {
    ASSET_INFO[symbol] = COIN_ICON_CACHE[symbol];
    info = ASSET_INFO[symbol];
  }
  
  var price = STATE.prices[symbol];
  var signal = STATE.signals[symbol];
  var position = STATE.positions[symbol];
  var panel = document.getElementById('assetPanel');
  
  // Icon HTML
  var iconHtml = getCoinIconHtml(symbol, 48);
  
  // Price Box - Handle error state
  var priceDisplay = '--';
  var changeDisplay = '--';
  var changeClass = '';
  var sourceDisplay = '';
  
  if (price && !price.error && price.price > 0) {
    priceDisplay = formatPrice(price.price);
    changeDisplay = (price.change >= 0 ? '+' : '') + price.change.toFixed(2) + '%';
    changeClass = price.change >= 0 ? 'up' : 'down';
    
    // Show price source
    if (price.source === 'coinmarketcap') {
      sourceDisplay = '<span style="font-size:9px;color:var(--text3);margin-top:2px;">CMC</span>';
    }
  } else if (price && price.error) {
    priceDisplay = '<span style="color:var(--red);font-size:12px;">' + (price.errorMsg || 'خطا') + '</span>';
    changeDisplay = '';
  }
  
  var priceHtml = '<div class="price-box">' +
    '<div class="price-info">' +
      iconHtml +
      '<div class="asset-name">' +
        '<h2>' + info.name + '</h2>' +
        '<span class="asset-symbol">' + symbol + '</span>' +
      '</div>' +
    '</div>' +
    '<div class="price-data">' +
      '<span class="price-value">' + priceDisplay + '</span>' +
      (changeDisplay ? '<span class="price-change ' + changeClass + '">' + changeDisplay + '</span>' : '') +
      sourceDisplay +
    '</div>' +
  '</div>';
  
  // Current price for calculations
  var currentPrice = price && price.price ? price.price : (signal && signal.entry ? signal.entry : 0);
  
  // Signal Reasons (Tips and Warnings) - Simplified Card
  var reasonsHtml = '';
  if (signal && signal.reasons && signal.reasons.length > 0) {
    var reasonsList = signal.reasons.slice(0, 8); // Show up to 8 tips/warnings
    reasonsList.forEach(function(reason) {
      var reasonType = 'neutral';
      var reasonIcon = '';
      
      // Determine reason type and icon based on content
      if (reason.includes('⚠️') || reason.includes('ریسک') || reason.includes('هشدار') || reason.includes('تناقض') || reason.includes('اشباع')) {
        reasonType = 'warning';
        reasonIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M13 17a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-.26-7.85a.75.75 0 0 0-1.5.1l.01 4.5v.1a.75.75 0 0 0 1.5-.1v-4.5l-.01-.1Zm1.23-5.5a2.25 2.25 0 0 0-3.94 0L2.3 17.67A2.25 2.25 0 0 0 4.26 21h15.49c1.71 0 2.8-1.84 1.96-3.34l-7.74-14Zm-2.63.73a.75.75 0 0 1 1.32 0l7.74 14a.75.75 0 0 1-.65 1.12H4.25a.75.75 0 0 1-.65-1.11l7.74-14Z"/></svg>';
      } else if (reason.includes('صعودی') || reason.includes('قوی') || reason.includes('حجم بالا') || reason.includes('واگرایی صعودی') || reason.includes('روند قوی')) {
        reasonType = 'positive';
        reasonIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>';
      } else if (reason.includes('نزولی') || reason.includes('ضعیف') || reason.includes('حجم پایین')) {
        reasonType = 'negative';
        reasonIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>';
      } else {
        reasonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 14 14"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M7 13.5a6.5 6.5 0 1 1 6.21-8.41M13.5 7v.5"/><path stroke-dasharray=".889 1.778" d="M13.11 9.23a6.51 6.51 0 0 1-2.79 3.36"/><path d="m9.53 13-.47.18"/></g></svg>';
      }
      
      // Remove emoji if present for cleaner display
      var cleanReason = reason.replace(/⚠️/g, '').trim();
      
      reasonsHtml += '<span class="reason-badge reason-' + reasonType + '">' +
        '<span class="reason-icon">' + reasonIcon + '</span>' +
        '<span class="reason-text">' + cleanReason + '</span>' +
      '</span>';
    });
  } else {
    reasonsHtml = '<span class="reason-badge reason-neutral"><span class="reason-text">در حال تحلیل...</span></span>';
  }
  
  var signalHtml = '<div class="signal-reasons-card" style="background:var(--card);border-radius:10px;padding:14px;margin-bottom:12px;border:1px solid var(--border);">' +
    '<div class="signal-reasons-title" style="display:flex;align-items:center;gap:6px;font-size:0.85rem;font-weight:600;margin-bottom:10px;color:var(--text2);">' +
      ICONS.barChart + 
      '<span>هشدارها و نکات</span>' +
    '</div>' +
    '<div class="signal-reasons">' + reasonsHtml + '</div>' +
  '</div>';
  
  // Trade Setup Score Gauge
  var scoreGaugeHtml = '';
  if (signal && typeof ScoringEngine !== 'undefined') {
    try {
      var scoringEngine = new ScoringEngine();
      var analysisData = {
        timeframeResults: signal.tfAnalysis || {},
        orderBook: signal.orderBook || null,
        walls: signal.orderBookWalls || null,
        currentPrice: currentPrice
      };
      // Pass BTC context for veto logic
      var btcContextForScoring = signal.btcContext || null;
      var scoreResult = scoringEngine.calculateOverallScore(analysisData, btcContextForScoring);
      var overallScore = scoreResult.overall || 50;
      
      // Determine color based on score
      var scoreColor = '#999';
      var scoreLabel = 'متوسط';
      if (overallScore >= 70) {
        scoreColor = '#10b981'; // Green
        scoreLabel = 'عالی';
      } else if (overallScore >= 50) {
        scoreColor = '#3b82f6'; // Blue
        scoreLabel = 'خوب';
      } else if (overallScore >= 30) {
        scoreColor = '#f59e0b'; // Orange
        scoreLabel = 'متوسط';
      } else {
        scoreColor = '#ef4444'; // Red
        scoreLabel = 'ضعیف';
      }
      
      // Create gauge (circular or linear progress bar)
      scoreGaugeHtml = '<div class="score-gauge-card" style="background:var(--bg2);border:2px solid ' + scoreColor + '40;border-radius:12px;padding:16px;margin:16px 0;text-align:center;">' +
        '<div style="font-size:13px;color:var(--text2);margin-bottom:10px;">امتیاز کلی ورود (Trade Setup Score)</div>' +
        '<div style="position:relative;width:120px;height:120px;margin:0 auto;">' +
          '<svg width="120" height="120" style="transform:rotate(-90deg);">' +
            '<circle cx="60" cy="60" r="50" stroke="var(--border)" stroke-width="8" fill="none"/>' +
            '<circle cx="60" cy="60" r="50" stroke="' + scoreColor + '" stroke-width="8" fill="none" stroke-dasharray="' + (overallScore * 3.14159) + ' 314.159" stroke-linecap="round"/>' +
          '</svg>' +
          '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);">' +
            '<div style="font-size:28px;font-weight:bold;color:' + scoreColor + ';">' + overallScore + '</div>' +
            '<div style="font-size:12px;color:var(--text2);">/100</div>' +
          '</div>' +
        '</div>' +
        '<div style="margin-top:12px;font-size:14px;font-weight:600;color:' + scoreColor + ';">' + scoreLabel + '</div>' +
        (scoreResult.components ? '<div style="margin-top:10px;font-size:11px;color:var(--text2);">زمان: ' + Math.round(scoreResult.components.timeframe) + ' | نقدینگی: ' + Math.round(scoreResult.components.liquidity) + ' | اندیکاتورها: ' + Math.round(scoreResult.components.indicators) + '</div>' : '') +
        (scoreResult.btcVetoApplied ? '<div style="margin-top:8px;font-size:11px;color:#f59e0b;font-weight:600;">⚠️ BTC Veto اعمال شد (همبستگی بالا با BTC نزولی)</div>' : '') +
      '</div>';
      
      // Check for Score/Confidence conflict
      var signalConfidence = signal.confidence || 0;
      if (overallScore >= 60 && signalConfidence < 5) {
        scoreGaugeHtml += '<div class="confidence-conflict-warning" style="background:linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.08));border:1px solid rgba(239,68,68,0.4);border-radius:10px;padding:12px;margin:12px 0;">' +
          '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>' +
            '<span style="font-weight:600;color:#ef4444;font-size:14px;">هشدار تناقض Score/Confidence</span>' +
          '</div>' +
          '<div style="font-size:12px;color:var(--text);line-height:1.6;">' +
            '<div>امتیاز کلی: <strong>' + overallScore + '/100</strong> (بالا)</div>' +
            '<div>اعتماد: <strong>' + signalConfidence + '/10</strong> (پایین)</div>' +
            '<div style="margin-top:8px;color:#ef4444;font-weight:600;">اندیکاتورهای تکنیکال ورود را پیشنهاد می‌دهند، اما فیلترهای مدیریت ریسک آن را مسدود می‌کنند.</div>' +
            '<div style="margin-top:4px;color:var(--text2);">وقتی Confidence زیر ۵ است، Score بالا ارزشی ندارد. <strong>ورود نکنید.</strong></div>' +
          '</div>' +
        '</div>';
      }
    } catch (e) {
      console.log('Score gauge calculation error:', e.message);
    }
  }
  
  // Entry Details
  var entryHtml = '';
  if (signal && signal.type !== 'wait') {
    var qualityIcon = signal.entryQuality === 'excellent' ? ICONS.target : 
                      signal.entryQuality === 'good' ? ICONS.check : ICONS.circle;
    var qualityText = signal.entryQuality === 'excellent' ? 'نقطه ورود عالی' :
                      signal.entryQuality === 'good' ? 'نقطه ورود خوب' : 'نقطه ورود قابل قبول';
    
    // Calculate liquidation price for futures
    var effectiveLeverage = getEffectiveLeverage(signal.leverage);
    var leverageNum = parseInt(effectiveLeverage) || 5;
    var liqPrice = TradingCore.calcLiquidationPrice ? 
      TradingCore.calcLiquidationPrice(signal.entry, leverageNum, signal.type) : null;
    
    entryHtml = '<div class="entry-section">' +
      '<div class="entry-header">' +
        '<span class="entry-quality ' + (signal.entryQuality || 'good') + '">' + qualityIcon + ' ' + qualityText + '</span>' +
        '<span class="entry-score">امتیاز: ' + (signal.confluenceScore || 0) + '</span>' +
      '</div>' +
      '<div class="entry-reasons">' + (signal.entryReasons ? signal.entryReasons.join(' + ') : '') + '</div>' +
      '<div class="entry-details">' +
        '<div class="detail-row"><span class="detail-label">' + ICONS.crosshair + ' نقطه ورود</span><span class="detail-value">' + formatPrice(signal.entry) + '</span></div>' +
        '<div class="detail-row"><span class="detail-label">' + ICONS.stopCircle + ' استاپ‌لاس</span><span class="detail-value sl">' + formatPrice(signal.sl) + '</span></div>' +
        '<div class="detail-row"><span class="detail-label">' + ICONS.target + ' تارگت ۱</span><span class="detail-value tp">' + formatPrice(signal.tp1) + '</span></div>' +
        '<div class="detail-row"><span class="detail-label">' + ICONS.target + ' تارگت ۲</span><span class="detail-value tp">' + formatPrice(signal.tp2) + '</span></div>' +
        '<div class="detail-row"><span class="detail-label">' + ICONS.zap + ' لوریج</span><span class="detail-value">' + effectiveLeverage + '</span></div>' +
      '</div>' +
    '</div>';
    
    // Futures Warning Section (Liquidation Price)
    if (liqPrice) {
      var liqClass = liqPrice.danger ? 'danger' : liqPrice.warning ? 'warning' : 'safe';
      var liqIcon = liqPrice.danger ? ICONS.alertTriangle : liqPrice.warning ? ICONS.moderate : ICONS.check;
      var liqText = liqPrice.danger ? 'خطر لیکویید!' : liqPrice.warning ? 'احتیاط' : 'فاصله امن';
      var liqColor = liqPrice.danger ? '#ef4444' : liqPrice.warning ? '#f59e0b' : '#10b981';
      
      entryHtml += '<div class="futures-warning" style="background:' + liqColor + '15;border:1px solid ' + liqColor + '40;border-radius:10px;padding:12px;margin-top:12px;">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">' +
          '<div style="display:flex;align-items:center;gap:8px;">' +
            '<span style="color:' + liqColor + ';width:20px;height:20px;">' + liqIcon + '</span>' +
            '<span style="font-weight:600;color:' + liqColor + ';">قیمت لیکویید: ' + formatPrice(liqPrice.price) + '</span>' +
          '</div>' +
          '<span style="font-size:12px;color:var(--text2);">فاصله: ' + liqPrice.distancePercent.toFixed(1) + '% | ' + liqText + '</span>' +
        '</div>' +
      '</div>';
    }
    
    if (signal.smartEntries && signal.smartEntries.length > 0) {
      entryHtml += '<div class="scaling-section">' +
        '<div class="scaling-title">' + ICONS.layers + ' ورود پله‌ای</div>' +
        '<div class="scaling-entries">';
      signal.smartEntries.forEach(function(entry) {
        entryHtml += '<div class="scaling-entry">' +
          '<span class="scaling-step">' + entry.reason + '</span>' +
          '<span class="scaling-price">' + formatPrice(entry.price) + '</span>' +
          '<span class="scaling-pct">(' + entry.percent + '%)</span>' +
        '</div>';
      });
      entryHtml += '</div></div>';
    }
  }
  
  
  // Indicators - Enhanced for Futures
  var stochRSI = signal && (signal.stochRSI || signal.stochRsi) ? (signal.stochRSI || signal.stochRsi) : null;
  var marketStruct = signal && signal.marketStructure ? signal.marketStructure : null;
  var srInfo = signal && signal.staticSR ? signal.staticSR : null;
  var htf = signal && signal.htfSummary ? signal.htfSummary : null;
  var liq = signal && signal.liquidity ? signal.liquidity : null;
  var btcCtx = signal && signal.btcContext ? signal.btcContext : null;
  var currentPrice = price && price.price ? price.price : (signal && signal.entry ? signal.entry : 0);
  
  // Calculate EMA distances from current price
  var ema21Distance = '';
  var ema50Distance = '';
  if (signal && signal.ema21 && currentPrice > 0) {
    var dist21 = ((currentPrice - signal.ema21) / currentPrice) * 100;
    ema21Distance = (dist21 >= 0 ? '+' : '') + dist21.toFixed(2) + '%';
  }
  if (signal && signal.ema50 && currentPrice > 0) {
    var dist50 = ((currentPrice - signal.ema50) / currentPrice) * 100;
    ema50Distance = (dist50 >= 0 ? '+' : '') + dist50.toFixed(2) + '%';
  }
  
  // MACD details
  var macdLine = signal && signal.macd && signal.macd.line !== undefined ? signal.macd.line.toFixed(4) : '--';
  var macdSignal = signal && signal.macd && signal.macd.signal !== undefined ? signal.macd.signal.toFixed(4) : '--';
  var macdHist = signal && signal.macd && signal.macd.histogram !== undefined ? signal.macd.histogram.toFixed(4) : '--';
  var macdClass = signal && signal.macd && signal.macd.histogram > 0 ? 'bullish' : 'bearish';
  
  // Funding Rate
  var fundingRateHtml = '';
  if (signal && signal.fundingRate) {
    var fr = signal.fundingRate;
    var frRate = (fr.rate * 100).toFixed(4); // Convert to percentage
    var frDaily = fr.dailyRate !== undefined ? fr.dailyRate.toFixed(2) : (frRate * 3).toFixed(2);
    var frClass = frRate >= 0 ? 'positive' : 'negative';
    var frColor = frRate >= 0 ? '#10b981' : '#ef4444';
    fundingRateHtml = '<div class="ind-item"><span class="ind-label">Funding Rate</span><span class="ind-value" style="color:' + frColor + ';">' + frRate + '% (' + frDaily + '%/روز)</span></div>';
  }
  
  // Divergence Warning Section - Enhanced with Hidden Divergence support and Timeframe Conflicts
  var divergenceWarningHtml = '';
  if (signal && signal.rsiDivergence && signal.rsiDivergence.type !== 'none') {
    var divType = signal.rsiDivergence.type; // 'bullish' or 'bearish'
    var isHidden = signal.rsiDivergence.isHidden || false;
    var divClass = divType === 'bullish' ? 'bullish' : 'bearish';
    var divColor = divType === 'bullish' ? '#10b981' : '#ef4444';
    var divText = '';
    if (isHidden) {
      divText = divType === 'bullish' ? 'واگرایی پنهان صعودی (ادامه روند)' : 'واگرایی پنهان نزولی (ادامه روند)';
    } else {
      divText = divType === 'bullish' ? 'واگرایی صعودی (بازگشت)' : 'واگرایی نزولی (بازگشت)';
    }
    var divIcon = divType === 'bullish' ? '↗' : '↘';
    var divStrength = signal.rsiDivergence.strength || 1;
    var strengthText = divStrength >= 2 ? ' (قوی)' : '';
    divergenceWarningHtml = '<div class="divergence-warning" style="background:' + divColor + '15;border:1px solid ' + divColor + '40;border-radius:8px;padding:10px;margin-top:10px;display:flex;align-items:center;gap:8px;">' +
      '<span style="font-size:18px;color:' + divColor + ';">' + divIcon + '</span>' +
      '<div style="flex:1;">' +
        '<div style="color:var(--text1);font-weight:600;font-size:13px;">' + divText + strengthText + '</div>' +
        (isHidden ? '<div style="font-size:11px;color:var(--text2);margin-top:2px;">نشان‌دهنده ادامه روند فعلی است</div>' : '<div style="font-size:11px;color:var(--text2);margin-top:2px;">نشان‌دهنده احتمال بازگشت قیمت است</div>') +
      '</div>' +
      '</div>';
  }
  
  // Timeframe Conflict Warning (e.g., RSI 30m=69 vs RSI 1D=43)
  if (signal && signal.rsiDivergence && signal.rsiDivergence.timeframeConflict) {
    var tfc = signal.rsiDivergence.timeframeConflict;
    var tfcColor = '#f59e0b';
    var tfcIcon = '⚠️';
    divergenceWarningHtml += '<div class="divergence-warning" style="background:' + tfcColor + '15;border:1px solid ' + tfcColor + '40;border-radius:8px;padding:10px;margin-top:10px;display:flex;align-items:center;gap:8px;">' +
      '<span style="font-size:18px;color:' + tfcColor + ';">' + tfcIcon + '</span>' +
      '<div style="flex:1;">' +
        '<div style="color:var(--text1);font-weight:600;font-size:13px;">تضاد تایم‌فریم</div>' +
        '<div style="font-size:11px;color:var(--text2);margin-top:2px;">' + tfc.message + '</div>' +
      '</div>' +
      '</div>';
  }
  
  // ==================== INDICATORS SECTION - REDESIGNED ====================
  var indicatorsHtml = '<div class="indicators-section">' +
    '<div class="indicators-title">' + ICONS.barChart + ' اندیکاتورها</div>';
  
  // Group 1: Core Technical Indicators (RSI, StochRSI, ADX, Trend, Structure)
  indicatorsHtml += '<div class="ind-group">' +
    '<div class="ind-group-title">اندیکاتورهای اصلی</div>' +
    '<div class="ind-grid">' +
      '<div class="ind-item"><span class="ind-label">RSI (14)</span><span class="ind-value ' + getRsiClass(signal ? signal.rsi : 50) + '">' + (signal && signal.rsi ? signal.rsi.toFixed(1) : '--') + '</span></div>' +
      '<div class="ind-item"><span class="ind-label">StochRSI</span><span class="ind-value ' + getStochRSIClass(stochRSI) + '">' + (stochRSI ? stochRSI.k.toFixed(0) + '/' + stochRSI.d.toFixed(0) : '--') + '</span></div>' +
      '<div class="ind-item"><span class="ind-label">ADX</span><span class="ind-value">' + (signal && signal.adx ? signal.adx.adx.toFixed(0) : '--') + '</span></div>' +
      '<div class="ind-item"><span class="ind-label">روند</span><span class="ind-value ' + getTrendClass(signal ? signal.trend : 'neutral') + '">' + getTrendLabel(signal ? signal.trend : 'neutral') + '</span></div>' +
      '<div class="ind-item"><span class="ind-label">ساختار</span><span class="ind-value ' + getStructureClass(marketStruct) + '">' + getStructureLabel(marketStruct) + '</span></div>' +
      '<div class="ind-item"><span class="ind-label">MACD Hist</span><span class="ind-value ' + macdClass + '">' + macdHist + '</span></div>' +
    '</div>' +
  '</div>';
  
  // Group 2: MACD Details
  indicatorsHtml += '<div class="ind-group">' +
    '<div class="ind-group-title">جزئیات MACD</div>' +
    '<div class="ind-grid ind-grid-3">' +
      '<div class="ind-item"><span class="ind-label">MACD Line</span><span class="ind-value ind-value-small">' + macdLine + '</span></div>' +
      '<div class="ind-item"><span class="ind-label">Signal</span><span class="ind-value ind-value-small">' + macdSignal + '</span></div>' +
      '<div class="ind-item"><span class="ind-label">Histogram</span><span class="ind-value ind-value-small ' + macdClass + '">' + macdHist + '</span></div>' +
    '</div>' +
  '</div>';
  
  // Group 3: EMA Ribbon
  indicatorsHtml += '<div class="ind-group">' +
    '<div class="ind-group-title">میانگین‌های متحرک (EMA)</div>' +
    '<div class="ind-grid ind-grid-3">' +
      '<div class="ind-item"><span class="ind-label">EMA 21</span><span class="ind-value">' + (signal && signal.ema21 ? formatPrice(signal.ema21) : '--') + (ema21Distance ? '<span class="ind-distance">' + ema21Distance + '</span>' : '') + '</span></div>' +
      '<div class="ind-item"><span class="ind-label">EMA 50</span><span class="ind-value">' + (signal && signal.ema50 ? formatPrice(signal.ema50) : '--') + (ema50Distance ? '<span class="ind-distance">' + ema50Distance + '</span>' : '') + '</span></div>' +
      '<div class="ind-item"><span class="ind-label">EMA 200</span><span class="ind-value">' + (signal && signal.ema200 ? formatPrice(signal.ema200) : '--') + (signal && signal.ema200 && currentPrice > 0 ? '<span class="ind-distance">' + (((currentPrice - signal.ema200) / currentPrice) * 100 >= 0 ? '+' : '') + (((currentPrice - signal.ema200) / currentPrice) * 100).toFixed(2) + '%)</span>' : '') + '</span></div>' +
    '</div>' +
  '</div>';
  
  // Group 4: Derivatives (Funding Rate, Open Interest, Long/Short Ratio)
  var derivativesItems = [];
  if (signal && signal.fundingRate) {
    var fr = signal.fundingRate;
    var frRate = (fr.rate * 100).toFixed(4);
    var frDaily = fr.dailyRate !== undefined ? fr.dailyRate.toFixed(2) : (frRate * 3).toFixed(2);
    var frColor = frRate >= 0 ? '#10b981' : '#ef4444';
    derivativesItems.push('<div class="ind-item"><span class="ind-label">Funding Rate</span><span class="ind-value" style="color:' + frColor + ';">' + frRate + '%<br><span style="font-size:0.65rem;color:var(--text2);">(' + frDaily + '%/روز)</span></span></div>');
  }
  if (signal && signal.openInterest && signal.openInterest.value > 0) {
    var oiValue = signal.openInterest.value;
    var oiValueUSD = signal.openInterest.valueUSD || 0;
    if (oiValueUSD === 0 && currentPrice > 0) {
      oiValueUSD = oiValue * currentPrice;
    }
    var oiFormatted = oiValue > 1000000 ? (oiValue / 1000000).toFixed(2) + 'M' : 
                      oiValue > 1000 ? (oiValue / 1000).toFixed(2) + 'K' : 
                      oiValue.toFixed(0);
    var oiUSDFormatted = oiValueUSD > 1000000 ? (oiValueUSD / 1000000).toFixed(2) + 'M' : 
                         oiValueUSD > 1000 ? (oiValueUSD / 1000).toFixed(2) + 'K' : 
                         oiValueUSD.toFixed(0);
    
    // Add OI change if available
    var oiChangeText = '';
    if (signal.openInterest.changePercent !== undefined && signal.openInterest.changePercent !== null) {
      var oiChange = signal.openInterest.changePercent;
      var oiChangeColor = oiChange >= 0 ? '#10b981' : '#ef4444';
      var oiChangeSign = oiChange >= 0 ? '+' : '';
      oiChangeText = '<br><span style="font-size:0.65rem;color:' + oiChangeColor + ';">' + oiChangeSign + oiChange.toFixed(2) + '%</span>';
    }
    
    derivativesItems.push('<div class="ind-item"><span class="ind-label">Open Interest</span><span class="ind-value">' + oiFormatted + '<br><span style="font-size:0.65rem;color:var(--text2);">(' + oiUSDFormatted + ' USDT)</span>' + oiChangeText + '</span></div>');
  }
  if (signal && signal.longShortRatio && signal.longShortRatio.ratio) {
    var lsr = signal.longShortRatio;
    var lsrColor = lsr.sentiment === 'long_heavy' || lsr.sentiment === 'short_heavy' ? '#f59e0b' : '#10b981';
    derivativesItems.push('<div class="ind-item"><span class="ind-label">Long/Short Ratio</span><span class="ind-value" style="color:' + lsrColor + ';">' + lsr.ratio.toFixed(2) + '<br><span style="font-size:0.65rem;color:var(--text2);">' + lsr.interpretation + '</span></span></div>');
  }
  if (derivativesItems.length > 0) {
    indicatorsHtml += '<div class="ind-group">' +
      '<div class="ind-group-title">داده‌های مشتقات</div>' +
      '<div class="ind-grid ind-grid-' + derivativesItems.length + '">' +
        derivativesItems.join('') +
      '</div>' +
    '</div>';
  }
  
  // Group 5: Volume & Momentum Indicators
  var volumeItems = [];
  if (signal && signal.tfAnalysis && signal.tfAnalysis['1h'] && signal.tfAnalysis['1h'].momentum) {
    var momentumClass = signal.tfAnalysis['1h'].momentum === 'Increasing' ? 'bullish' : signal.tfAnalysis['1h'].momentum === 'Decreasing' ? 'bearish' : 'neutral';
    var momentumText = signal.tfAnalysis['1h'].momentum === 'Increasing' ? 'در حال افزایش' : signal.tfAnalysis['1h'].momentum === 'Decreasing' ? 'در حال کاهش' : 'خنثی';
    volumeItems.push('<div class="ind-item"><span class="ind-label">Momentum</span><span class="ind-value ' + momentumClass + '">' + momentumText + '</span></div>');
  }
  if (signal && signal.obv) {
    var obvClass = signal.obv.trend === 'increasing' ? 'bullish' : signal.obv.trend === 'decreasing' ? 'bearish' : 'neutral';
    var obvText = signal.obv.trend === 'increasing' ? 'افزایش' : signal.obv.trend === 'decreasing' ? 'کاهش' : 'خنثی';
    var obvDelta = signal.obv.delta ? ' <span class="ind-distance">(' + (signal.obv.delta >= 0 ? '+' : '') + signal.obv.delta.toFixed(0) + ')</span>' : '';
    volumeItems.push('<div class="ind-item"><span class="ind-label">OBV</span><span class="ind-value ' + obvClass + '">' + obvText + obvDelta + '</span></div>');
  }
  // Add Volume 24h Change if available
  if (signal && signal.tfAnalysis && signal.tfAnalysis['1h'] && signal.tfAnalysis['1h'].volume24hChange) {
    var vol24h = signal.tfAnalysis['1h'].volume24hChange;
    var vol24hColor = vol24h.changePercent >= 20 ? '#10b981' : vol24h.changePercent <= -20 ? '#ef4444' : 'var(--text)';
    var vol24hSign = vol24h.changePercent >= 0 ? '+' : '';
    volumeItems.push('<div class="ind-item"><span class="ind-label">حجم 24h</span><span class="ind-value" style="color:' + vol24hColor + ';">' + vol24hSign + vol24h.changePercent.toFixed(1) + '%</span></div>');
  }
  if (volumeItems.length > 0) {
    indicatorsHtml += '<div class="ind-group">' +
      '<div class="ind-group-title">حجم و مومنتوم</div>' +
      '<div class="ind-grid ind-grid-' + volumeItems.length + '">' +
        volumeItems.join('') +
      '</div>' +
    '</div>';
  }
  
  // Group 5b: Advanced Indicators (ATR, Volume Profile, Ichimoku)
  var advancedItems = [];
  
  // ATR
  if (signal && signal.tfAnalysis && signal.tfAnalysis['1h'] && signal.tfAnalysis['1h'].atr) {
    var atr = signal.tfAnalysis['1h'].atr;
    var atrVolatilityColor = atr.volatility === 'high' ? '#ef4444' : atr.volatility === 'medium' ? '#f59e0b' : '#10b981';
    advancedItems.push('<div class="ind-item"><span class="ind-label">ATR</span><span class="ind-value">' + atr.atrPercent.toFixed(2) + '%<br><span style="font-size:0.65rem;color:' + atrVolatilityColor + ';">' + (atr.volatility === 'high' ? 'نوسان بالا' : atr.volatility === 'medium' ? 'نوسان متوسط' : 'نوسان پایین') + '</span></span></div>');
  }
  
  // Volume Profile (POC)
  if (signal && signal.tfAnalysis && signal.tfAnalysis['1h'] && signal.tfAnalysis['1h'].volumeProfile) {
    var vp = signal.tfAnalysis['1h'].volumeProfile;
    var pocPositionColor = vp.position === 'above' ? '#10b981' : vp.position === 'below' ? '#ef4444' : '#f59e0b';
    var pocPositionText = vp.position === 'above' ? 'بالای POC' : vp.position === 'below' ? 'زیر POC' : 'در POC';
    advancedItems.push('<div class="ind-item"><span class="ind-label">Volume Profile</span><span class="ind-value" style="color:' + pocPositionColor + ';">' + formatPrice(vp.poc) + '<br><span style="font-size:0.65rem;color:var(--text2);">' + pocPositionText + ' (' + vp.distancePercent.toFixed(2) + '%)</span></span></div>');
  }
  
  // Ichimoku Cloud
  if (signal && signal.tfAnalysis && signal.tfAnalysis['1h'] && signal.tfAnalysis['1h'].ichimoku) {
    var ichi = signal.tfAnalysis['1h'].ichimoku;
    var ichiTrendColor = ichi.trend === 'bullish' ? '#10b981' : ichi.trend === 'bearish' ? '#ef4444' : '#f59e0b';
    var ichiPositionText = ichi.cloudPosition === 'above' ? 'بالای ابر' : ichi.cloudPosition === 'below' ? 'زیر ابر' : 'داخل ابر';
    var ichiTrendText = ichi.trend === 'bullish' ? 'صعودی' : ichi.trend === 'bearish' ? 'نزولی' : 'خنثی';
    advancedItems.push('<div class="ind-item"><span class="ind-label">Ichimoku</span><span class="ind-value" style="color:' + ichiTrendColor + ';">' + ichiTrendText + '<br><span style="font-size:0.65rem;color:var(--text2);">' + ichiPositionText + '</span></span></div>');
  }
  
  if (advancedItems.length > 0) {
    indicatorsHtml += '<div class="ind-group">' +
      '<div class="ind-group-title">اندیکاتورهای پیشرفته</div>' +
      '<div class="ind-grid ind-grid-' + advancedItems.length + '">' +
        advancedItems.join('') +
      '</div>' +
    '</div>';
  }
  
  // Warnings & Alerts (Divergence, Chop Index) - Full width
  var warningsHtml = '';
  if (divergenceWarningHtml) {
    warningsHtml += divergenceWarningHtml;
  }
  if (signal && signal.chopIndex) {
    var chop = signal.chopIndex;
    var isChoppy = chop.isChoppy;
    var chopColor = isChoppy ? '#f59e0b' : '#10b981';
    var chopIcon = isChoppy ? '⚠️' : '✓';
    var chopText = isChoppy ? 'بازار در حالت فشرده (Choppy)' : 'بازار در حالت عادی';
    var distanceText = chop.totalDistance !== null ? ' (فاصله: ' + chop.totalDistance.toFixed(2) + '%)' : '';
    warningsHtml += '<div class="chop-indicator">' +
      '<span class="chop-icon">' + chopIcon + '</span>' +
      '<div class="chop-content">' +
        '<div class="chop-title">' + chopText + '</div>' +
        (isChoppy ? '<div class="chop-description">فاصله بین حمایت و مقاومت کمتر از 0.5% است. منتظر Breakout بمانید.</div>' : '') +
        (distanceText ? '<div class="chop-distance">' + distanceText + '</div>' : '') +
      '</div>' +
    '</div>';
  }
  if (warningsHtml) {
    indicatorsHtml += '<div class="ind-group ind-group-warnings">' +
      '<div class="ind-group-title">هشدارها و وضعیت بازار</div>' +
      warningsHtml +
    '</div>';
  }
  
  // Pivot Points (if available)
  if (signal && signal.pivotPoints) {
    indicatorsHtml += '<div class="ind-group">' +
      '<div class="ind-group-title">Pivot Points (نقاط محوری)</div>' +
      '<div class="pivot-grid">' +
        '<div class="pivot-item pivot-pp"><span class="pivot-label">PP</span><span class="pivot-value">' + formatPrice(signal.pivotPoints.pivot) + '</span></div>' +
        '<div class="pivot-item pivot-resistance"><span class="pivot-label">R1</span><span class="pivot-value">' + formatPrice(signal.pivotPoints.resistance.r1) + '</span></div>' +
        '<div class="pivot-item pivot-resistance"><span class="pivot-label">R2</span><span class="pivot-value">' + formatPrice(signal.pivotPoints.resistance.r2) + '</span></div>' +
        '<div class="pivot-item pivot-resistance"><span class="pivot-label">R3</span><span class="pivot-value">' + formatPrice(signal.pivotPoints.resistance.r3) + '</span></div>' +
        '<div class="pivot-item pivot-support"><span class="pivot-label">S1</span><span class="pivot-value">' + formatPrice(signal.pivotPoints.support.s1) + '</span></div>' +
        '<div class="pivot-item pivot-support"><span class="pivot-label">S2</span><span class="pivot-value">' + formatPrice(signal.pivotPoints.support.s2) + '</span></div>' +
        '<div class="pivot-item pivot-support"><span class="pivot-label">S3</span><span class="pivot-value">' + formatPrice(signal.pivotPoints.support.s3) + '</span></div>' +
      '</div>' +
    '</div>';
  }
  
  indicatorsHtml += '</div>';

  // Advanced Context Row: S/R + HTF + Liquidity + BTC
  // حتی اگر سیگنال روی حالت "صبر" باشد، دیدن این اطلاعات مفید است
  
  // Initialize liquidation and risk/reward HTML (outside if block for scope)
  var liquidationHtml = '';
  var riskRewardHtml = '';
  
  if (signal) {
    // Static S/R badges
    var supportLabel = '--';
    var resistanceLabel = '--';
    var supportClass = '';
    var resistanceClass = '';
    if (srInfo && srInfo.nearestSupport) {
      var supStrengthText = srInfo.supportStrength === 'strong' ? 'قوی' :
                            srInfo.supportStrength === 'medium' ? 'متوسط' :
                            srInfo.supportStrength === 'weak' ? 'ضعیف' : 'نامشخص';
      supportLabel = 'حمایت ' + supStrengthText;
      supportClass = srInfo.supportStrength === 'strong' ? 'strong' :
                     srInfo.supportStrength === 'medium' ? 'medium' :
                     srInfo.supportStrength === 'weak' ? 'weak' : '';
    }
    if (srInfo && srInfo.nearestResistance) {
      var resStrengthText = srInfo.resistanceStrength === 'strong' ? 'قوی' :
                            srInfo.resistanceStrength === 'medium' ? 'متوسط' :
                            srInfo.resistanceStrength === 'weak' ? 'ضعیف' : 'نامشخص';
      resistanceLabel = 'مقاومت ' + resStrengthText;
      resistanceClass = srInfo.resistanceStrength === 'strong' ? 'strong' :
                        srInfo.resistanceStrength === 'medium' ? 'medium' :
                        srInfo.resistanceStrength === 'weak' ? 'weak' : '';
    }

    // HTF text
    function simpleTrendLabel(tr) {
      if (!tr || tr === 'unknown') return 'نامشخص';
      tr = tr.toLowerCase();
      if (tr.indexOf('bull') !== -1 || tr === 'up') return 'صعودی';
      if (tr.indexOf('bear') !== -1 || tr === 'down') return 'نزولی';
      return 'خنثی';
    }
    var trend4h = simpleTrendLabel(htf && htf.trend4h);
    var trend1d = simpleTrendLabel(htf && htf.trend1d);

    // Liquidity text
    function simpleLiqLabel(score) {
      if (score === 'low') return 'کم';
      if (score === 'high') return 'زیاد';
      return 'معمولی';
    }
    function simpleRiskLabel(r) {
      if (r === 'low') return 'کم';
      if (r === 'medium') return 'متوسط';
      if (r === 'high') return 'زیاد';
      return 'نامشخص';
    }
    var liqScore = liq && liq.entryLiquidityScore ? simpleLiqLabel(liq.entryLiquidityScore) : 'معمولی';
    var slRisk = liq && liq.slLiquidityRisk ? simpleRiskLabel(liq.slLiquidityRisk) : 'نامشخص';

    // Volume / ADX
    var volumeRatio = signal && signal.volume && signal.volume.ratio ? signal.volume.ratio : 1;
    var adxValue = signal && signal.adx ? signal.adx.adx : 25;

    // Conflict checks
    var srConflict = false;
    if (srInfo) {
      if (signal.type === 'short' && srInfo.nearestSupport && srInfo.supportStrength === 'strong' &&
          srInfo.supportDistancePct !== null && srInfo.supportDistancePct < 0.7) {
        srConflict = true;
      }
      if (signal.type === 'long' && srInfo.nearestResistance && srInfo.resistanceStrength === 'strong' &&
          srInfo.resistanceDistancePct !== null && srInfo.resistanceDistancePct < 0.7) {
        srConflict = true;
      }
    }

    var htfWith = htf && htf.withHTFTrend;
    var htfAgainst = htf && htf.againstHTFTrend;

    var btcConflict = false;
    if (btcCtx && btcCtx.isDependent && typeof btcCtx.correlation === 'number' && Math.abs(btcCtx.correlation) >= 0.5) {
      var btc4 = (btcCtx.btcTrend4h || '').toLowerCase();
      var btc1 = (btcCtx.btcTrend1d || '').toLowerCase();
      if (signal.type === 'long') {
        if ((btc4 && btc4.indexOf('bear') !== -1) || (btc1 && btc1.indexOf('bear') !== -1) ||
            (btc4 && btc4.indexOf('down') !== -1) || (btc1 && btc1.indexOf('down') !== -1)) {
          btcConflict = true;
        }
      } else if (signal.type === 'short') {
        if ((btc4 && btc4.indexOf('bull') !== -1) || (btc1 && btc1.indexOf('bull') !== -1) ||
            (btc4 && btc4.indexOf('up') !== -1) || (btc1 && btc1.indexOf('up') !== -1)) {
          btcConflict = true;
        }
      }
    }

    // Setup quality summary
    var setupQuality = 'متوسط';
    var setupClass = 'medium';
    if (
      (signal.confidence || 0) >= 7 &&
      adxValue >= 25 &&
      volumeRatio >= 0.8 &&
      htfWith &&
      !srConflict &&
      !btcConflict &&
      (!liq || liq.slLiquidityRisk !== 'high')
    ) {
      setupQuality = 'بالا';
      setupClass = 'high';
    } else if (
      (signal.confidence || 0) <= 4 ||
      volumeRatio < 0.5 ||
      adxValue < 20 ||
      htfAgainst ||
      srConflict ||
      btcConflict ||
      (liq && liq.slLiquidityRisk === 'high')
    ) {
      setupQuality = 'پایین';
      setupClass = 'low';
    }

    // BTC context (only for dependent assets) - Improved display
    var btcHtml = '';
    if (btcCtx && btcCtx.isDependent) {
      var corrLabel = 'نامشخص';
      if (btcCtx.label === 'high') corrLabel = 'بالا';
      else if (btcCtx.label === 'medium') corrLabel = 'متوسط';
      else if (btcCtx.label === 'low') corrLabel = 'کم';
      else if (btcCtx.label === 'weak') corrLabel = 'خیلی کم';
      
      // Determine BTC status (bullish/bearish/neutral)
      var btcStatus = 'خنثی';
      var btcStatusColor = '#f59e0b'; // Yellow for neutral
      var btc4 = (btcCtx.btcTrend4h || '').toLowerCase();
      var btc1 = (btcCtx.btcTrend1d || '').toLowerCase();
      
      // Check if BTC is bullish
      if ((btc4 && (btc4.indexOf('bull') !== -1 || btc4.indexOf('up') !== -1 || btc4 === 'strong_up')) ||
          (btc1 && (btc1.indexOf('bull') !== -1 || btc1.indexOf('up') !== -1 || btc1 === 'strong_up'))) {
        btcStatus = 'صعودی';
        btcStatusColor = '#10b981'; // Green
      }
      // Check if BTC is bearish
      else if ((btc4 && (btc4.indexOf('bear') !== -1 || btc4.indexOf('down') !== -1 || btc4 === 'strong_down')) ||
               (btc1 && (btc1.indexOf('bear') !== -1 || btc1.indexOf('down') !== -1 || btc1 === 'strong_down'))) {
        btcStatus = 'نزولی';
        btcStatusColor = '#ef4444'; // Red
      }
      
      btcHtml = '<div class="ind-item" style="border:1px solid ' + btcStatusColor + '40;border-radius:6px;padding:6px;background:' + btcStatusColor + '10;">' +
        '<span class="ind-label" style="font-size:11px;color:var(--text2);">وضعیت لحظه‌ای بیت‌کوین</span>' +
        '<span class="ind-value" style="color:' + btcStatusColor + ';font-weight:600;font-size:13px;">' + btcStatus + '</span>' +
        '<div style="font-size:10px;color:var(--text2);margin-top:2px;">همبستگی: ' + corrLabel + '</div>' +
        '</div>';
    }

    // Multi-timeframe RSI
    var mtfRsiHtml = '';
    if (signal && signal.tfAnalysis) {
      var tfRsis = [];
      var timeframes = ['30m', '1h', '4h', '1d'];
      timeframes.forEach(function(tf) {
        if (signal.tfAnalysis[tf] && signal.tfAnalysis[tf].rsi !== undefined) {
          var rsiValue = signal.tfAnalysis[tf].rsi;
          var rsiClass = getRsiClass(rsiValue);
          tfRsis.push('<div class="ind-item"><span class="ind-label">RSI ' + tf + '</span><span class="ind-value ' + rsiClass + '">' + rsiValue.toFixed(1) + '</span></div>');
        }
      });
      if (tfRsis.length > 0) {
        mtfRsiHtml = '<div class="ind-mtf-rsi" style="background: var(--card); border-radius: 10px; padding: 14px; margin-bottom: 12px; border: 1px solid var(--border);"><div style="font-size:11px;color:var(--text2);margin-bottom:6px;">RSI در تایم\u200cفریم\u200cهای مختلف:</div><div style="display:grid;grid-template-columns:repeat(' + Math.min(tfRsis.length, 4) + ',1fr);gap:6px;">' + tfRsis.join('') + '</div></div>';
      }
    }
    
    indicatorsHtml += mtfRsiHtml;
    
    // Fibonacci Retracement Levels Display
    var fibonacciHtml = '';
    if (signal && signal.fibonacciLevels && currentPrice > 0) {
      var fibKeys = ['0.618', '0.786'];
      var fibItems = [];
      fibKeys.forEach(function(key) {
        if (signal.fibonacciLevels[key]) {
          var fibPrice = signal.fibonacciLevels[key];
          var fibDistance = ((currentPrice - fibPrice) / currentPrice) * 100;
          var fibDistanceText = (fibDistance >= 0 ? '+' : '') + fibDistance.toFixed(2) + '%';
          fibItems.push('<div class="ind-item"><span class="ind-label">Fib ' + key + '</span><span class="ind-value">' + formatPrice(fibPrice) + ' <span style="font-size:9px;color:var(--text2);">(' + fibDistanceText + ')</span></span></div>');
        }
      });
      if (fibItems.length > 0) {
        fibonacciHtml = '<div class="ind-fibonacci" style="margin-top:8px;padding-top:8px;border-top:1px dashed var(--border);"><div style="font-size:11px;color:var(--text2);margin-bottom:6px;">سطوح Fibonacci:</div><div style="display:grid;grid-template-columns:repeat(' + fibItems.length + ',1fr);gap:6px;">' + fibItems.join('') + '</div></div>';
      }
    }
    
    indicatorsHtml += fibonacciHtml;
    
    indicatorsHtml +=
      '<div class="ind-advanced" style="background: var(--card); border-radius: 10px; padding: 14px; margin: 10px 0 12px 0; border: 1px solid var(--border);">' +
        '<div class="ind-group-title" style="font-size:0.75rem;font-weight:600;color:var(--text2);margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px;display:flex;align-items:center;gap:6px;">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>' +
          '<span>تحلیل پیشرفته</span>' +
        '</div>' +
        '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; font-size: 11px;">' +
          '<div class="ind-item"><span class="ind-label">کیفیت ستاپ</span><span class="ind-value ' + setupClass + '">' + setupQuality + '</span></div>' +
          '<div class="ind-item"><span class="ind-label">حمایت افقی</span><span class="ind-value ' + supportClass + '">' + supportLabel + '</span></div>' +
          '<div class="ind-item"><span class="ind-label">مقاومت افقی</span><span class="ind-value ' + resistanceClass + '">' + resistanceLabel + '</span></div>' +
          '<div class="ind-item"><span class="ind-label">HTF (4H/1D)</span><span class="ind-value">' + trend4h + ' / ' + trend1d + '</span></div>' +
          '<div class="ind-item"><span class="ind-label">Liquidity</span><span class="ind-value">ورود ' + liqScore + ' / ریسک SL ' + slRisk + '</span></div>' +
          (btcHtml || '') +
        '</div>' +
      '</div>';
    
    // Liquidation Zones Display - Only show single most important warning
    if (signal.liquidationZones && signal.liquidationZones.nearLiquidity) {
      var liqZones = signal.liquidationZones;
      var liqWarnings = liqZones.warnings || [];
      if (liqWarnings.length > 0) {
        // Prioritize high level warnings, then take the first one
        var highWarnings = liqWarnings.filter(function(w) { return w.level === 'high'; });
        var selectedWarning = highWarnings.length > 0 ? highWarnings[0] : liqWarnings[0];
        var liqLevel = selectedWarning.level || 'medium';
        var liqColor = liqLevel === 'high' ? '#ef4444' : '#f59e0b';
        var liqIcon = liqLevel === 'high' ? '🔴' : '🟡';
        
        liquidationHtml = '<div class="liquidation-warning" style="background:linear-gradient(135deg, ' + liqColor + '12, ' + liqColor + '08);border:2px solid ' + liqColor + '50;border-radius:12px;padding:14px;margin-top:12px;box-shadow:0 4px 12px ' + liqColor + '20;position:relative;overflow:hidden;">' +
          '<div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg, ' + liqColor + ', ' + liqColor + '80);"></div>' +
          '<div style="display:flex;align-items:flex-start;gap:10px;">' +
            '<div style="font-size:20px;line-height:1;margin-top:2px;">' + liqIcon + '</div>' +
            '<div style="flex:1;">' +
              '<div style="font-size:13px;font-weight:700;color:' + liqColor + ';margin-bottom:6px;display:flex;align-items:center;gap:6px;">' +
                '<span>هشدار لیکویید</span>' +
                '<span style="font-size:10px;background:' + liqColor + '25;padding:2px 6px;border-radius:4px;font-weight:600;">' + (liqLevel === 'high' ? 'خطر بالا' : 'احتیاط') + '</span>' +
              '</div>' +
              '<div style="font-size:12px;color:var(--text);line-height:1.5;">' + selectedWarning.message + '</div>' +
            '</div>' +
          '</div>' +
          '</div>';
      }
    }
    
    // Risk/Reward Analysis Display - Calculate if not available
    var rr = signal.riskReward;
    
    // Fallback: Calculate basic Risk/Reward if not available but we have entry/SL/TP
    if (!rr && signal && signal.type !== 'wait' && signal.entry && signal.sl && signal.tp1 && signal.entry > 0 && signal.sl > 0 && signal.tp1 > 0) {
      var isLong = signal.type === 'long';
      var risk = Math.abs((signal.entry - signal.sl) / signal.entry) * 100;
      
      // Calculate reward based on signal type
      var reward1 = 0;
      var reward2 = 0;
      if (isLong) {
        // For LONG: TP should be above entry
        reward1 = signal.tp1 > signal.entry ? ((signal.tp1 - signal.entry) / signal.entry) * 100 : 0;
        reward2 = signal.tp2 && signal.tp2 > signal.entry ? ((signal.tp2 - signal.entry) / signal.entry) * 100 : 0;
      } else {
        // For SHORT: TP should be below entry
        reward1 = signal.tp1 < signal.entry ? ((signal.entry - signal.tp1) / signal.entry) * 100 : 0;
        reward2 = signal.tp2 && signal.tp2 < signal.entry ? ((signal.entry - signal.tp2) / signal.entry) * 100 : 0;
      }
      
      var riskRewardRatio1 = risk > 0 ? reward1 / risk : 0;
      var riskRewardRatio2 = risk > 0 && reward2 > 0 ? reward2 / risk : 0;
      
      var riskLevel = 'low';
      if (riskRewardRatio1 < 1) riskLevel = 'high';
      else if (riskRewardRatio1 < 1.5) riskLevel = 'medium';
      
      rr = {
        riskRewardRatio: riskRewardRatio1,
        riskRewardRatio2: riskRewardRatio2,
        risk: risk,
        reward1: reward1,
        reward2: reward2,
        riskLevel: riskLevel,
        warnings: [],
        distanceToResistance: null,
        distanceToSupport: null
      };
    }
    
    if (rr) {
      var rrColor = rr.riskLevel === 'high' ? '#ef4444' : (rr.riskLevel === 'medium' ? '#f59e0b' : '#10b981');
      var rrWarnings = rr.warnings || [];
      
      riskRewardHtml = '<div class="risk-reward-section" style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:12px;margin-top:12px;">' +
        '<div style="font-size:13px;font-weight:600;color:var(--text1);margin-bottom:10px;display:flex;align-items:center;gap:6px;">' +
          ICONS.target + '<span>تحلیل Risk/Reward</span>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;font-size:11px;">' +
          '<div class="ind-item"><span class="ind-label">نسبت R:R</span><span class="ind-value" style="color:' + (rr.riskRewardRatio >= 2 ? '#10b981' : rr.riskRewardRatio >= 1 ? '#f59e0b' : '#ef4444') + ';">' + 
          rr.riskRewardRatio.toFixed(2) + ':1</span></div>' +
          '<div class="ind-item"><span class="ind-label">سطح ریسک</span><span class="ind-value" style="color:' + rrColor + ';">' + 
          (rr.riskLevel === 'high' ? 'بالا' : rr.riskLevel === 'medium' ? 'متوسط' : 'پایین') + '</span></div>' +
          '<div class="ind-item"><span class="ind-label">ریسک</span><span class="ind-value">' + (rr.risk ? rr.risk.toFixed(2) + '%' : '--') + '</span></div>' +
          '<div class="ind-item"><span class="ind-label">سود TP1</span><span class="ind-value" style="color:#10b981;">' + (rr.reward1 ? '+' + rr.reward1.toFixed(2) + '%' : '--') + '</span></div>' +
          (rr.reward2 > 0 ? '<div class="ind-item"><span class="ind-label">سود TP2</span><span class="ind-value" style="color:#10b981;">+' + rr.reward2.toFixed(2) + '%</span></div>' : '') +
          (rr.riskRewardRatio2 > 0 ? '<div class="ind-item"><span class="ind-label">R:R تا TP2</span><span class="ind-value" style="color:#10b981;">' + rr.riskRewardRatio2.toFixed(2) + ':1</span></div>' : '') +
          (rr.distanceToResistance !== null ? 
            '<div class="ind-item"><span class="ind-label">فاصله تا مقاومت</span><span class="ind-value">' + rr.distanceToResistance.toFixed(2) + '%</span></div>' : '') +
          (rr.distanceToSupport !== null ? 
            '<div class="ind-item"><span class="ind-label">فاصله تا حمایت</span><span class="ind-value">' + rr.distanceToSupport.toFixed(2) + '%</span></div>' : '') +
        '</div>' +
        (rrWarnings.length > 0 ? 
          '<div style="margin-top:10px;padding-top:10px;border-top:1px dashed var(--border);">' +
            rrWarnings.map(function(w) {
              var wColor = w.level === 'high' ? '#ef4444' : '#f59e0b';
              return '<div style="font-size:11px;color:' + wColor + ';margin-top:4px;">' + w.message + '</div>';
            }).join('') +
          '</div>' : '') +
        '</div>';
    }
  }

  indicatorsHtml += '</div></div>';
  
  // Add liquidation and risk/reward displays after indicators
  indicatorsHtml += (liquidationHtml || '');
  indicatorsHtml += (riskRewardHtml || '');
  
  // Buyer/Seller Power Section - Always visible
  var buyerSellerPowerHtml = '';
  var buyerPowerPercent = 50;
  var sellerPowerPercent = 50;
  var wallsHtml = '';
  
  // Initialize smoothed value if not exists
  if (!STATE.signals[symbol]) {
    STATE.signals[symbol] = {};
  }
  if (STATE.signals[symbol].smoothedBuyerPower === undefined) {
    STATE.signals[symbol].smoothedBuyerPower = 50;
  }
  
  if (signal && signal.orderBook && signal.orderBook.bids && signal.orderBook.asks) {
    var orderBook = signal.orderBook;
    var currentPrice = price && price.price ? price.price : 0;
    
    // Price Weighting: سفارشات نزدیک‌تر به قیمت فعلی وزن بیشتری دارند
    function calculateWeightedVolume(orders, isBid) {
      if (!currentPrice || currentPrice <= 0) {
        // اگر قیمت موجود نباشد، بدون وزن‌دهی محاسبه می‌کنیم
        return orders.reduce(function(sum, order) {
          return sum + (order.amount || 0);
        }, 0);
      }
      
      return orders.reduce(function(sum, order) {
        var orderPrice = order.price || 0;
        if (orderPrice <= 0) return sum;
        
        var amount = order.amount || 0;
        // محاسبه فاصله درصدی از قیمت فعلی
        var distancePercent = Math.abs((orderPrice - currentPrice) / currentPrice) * 100;
        
        // وزن‌دهی: سفارشات نزدیک‌تر (0-2%) وزن 1.0، سفارشات دورتر کاهش می‌یابد
        // استفاده از تابع exponential decay برای وزن‌دهی
        var weight = 0;
        if (distancePercent <= 0.5) {
          weight = 1.0; // خیلی نزدیک: وزن کامل
        } else if (distancePercent <= 1.0) {
          weight = 0.9; // نزدیک: وزن 90%
        } else if (distancePercent <= 2.0) {
          weight = 0.7; // متوسط: وزن 70%
        } else if (distancePercent <= 5.0) {
          weight = 0.4; // دور: وزن 40%
        } else {
          weight = 0.1; // خیلی دور: وزن 10%
        }
        
        return sum + (amount * weight);
      }, 0);
    }
    
    // محاسبه حجم وزن‌دهی شده
    var totalBidVolume = calculateWeightedVolume(orderBook.bids, true);
    var totalAskVolume = calculateWeightedVolume(orderBook.asks, false);
    var totalVolume = totalBidVolume + totalAskVolume;
    
    var rawBuyerPowerPercent = totalVolume > 0 ? (totalBidVolume / totalVolume) * 100 : 50;
    
    // Exponential Moving Average smoothing (alpha = 0.2 for smoother result)
    var alpha = 0.2;
    STATE.signals[symbol].smoothedBuyerPower = alpha * rawBuyerPowerPercent + (1 - alpha) * STATE.signals[symbol].smoothedBuyerPower;
    
    buyerPowerPercent = STATE.signals[symbol].smoothedBuyerPower;
    sellerPowerPercent = 100 - buyerPowerPercent;
    
    // Initialize smoothed walls if not exists
    if (!STATE.signals[symbol].smoothedWalls) {
      STATE.signals[symbol].smoothedWalls = { bids: [], asks: [] };
    }
    
    // Smooth walls using exponential moving average
    var walls = signal.orderBookWalls || { bids: [], asks: [] };
    var alpha = 0.3; // Smoothing factor for walls
    
    // Smooth bid walls (support)
    if (walls.bids && walls.bids.length > 0) {
      // Sort by strength and take top 3
      var sortedBids = walls.bids.slice().sort(function(a, b) {
        return (b.strength || 0) - (a.strength || 0);
      }).slice(0, 3);
      
      // Merge with smoothed walls
      var smoothedBids = STATE.signals[symbol].smoothedWalls.bids || [];
      var newSmoothedBids = sortedBids.map(function(newWall, idx) {
        var existingWall = smoothedBids.find(function(w) {
          return Math.abs(w.price - newWall.price) / newWall.price < 0.01; // 1% tolerance
        });
        
        if (existingWall) {
          // Smooth price and strength
          return {
            price: alpha * newWall.price + (1 - alpha) * existingWall.price,
            strength: alpha * newWall.strength + (1 - alpha) * existingWall.strength,
            amount: alpha * newWall.amount + (1 - alpha) * (existingWall.amount || 0)
          };
        } else {
          return newWall;
        }
      });
      
      // Remove old walls that are no longer present
      newSmoothedBids = newSmoothedBids.filter(function(wall) {
        return walls.bids.some(function(w) {
          return Math.abs(w.price - wall.price) / wall.price < 0.02; // 2% tolerance
        });
      });
      
      STATE.signals[symbol].smoothedWalls.bids = newSmoothedBids;
    } else {
      // Gradually fade out walls if not present
      STATE.signals[symbol].smoothedWalls.bids = STATE.signals[symbol].smoothedWalls.bids.map(function(wall) {
        return {
          price: wall.price,
          strength: wall.strength * 0.8, // Fade out
          amount: wall.amount * 0.8
        };
      }).filter(function(wall) {
        return wall.strength > 0.5; // Remove if too weak
      });
    }
    
    // Smooth ask walls (resistance)
    if (walls.asks && walls.asks.length > 0) {
      // Sort by strength and take top 3
      var sortedAsks = walls.asks.slice().sort(function(a, b) {
        return (b.strength || 0) - (a.strength || 0);
      }).slice(0, 3);
      
      // Merge with smoothed walls
      var smoothedAsks = STATE.signals[symbol].smoothedWalls.asks || [];
      var newSmoothedAsks = sortedAsks.map(function(newWall, idx) {
        var existingWall = smoothedAsks.find(function(w) {
          return Math.abs(w.price - newWall.price) / newWall.price < 0.01; // 1% tolerance
        });
        
        if (existingWall) {
          // Smooth price and strength
          return {
            price: alpha * newWall.price + (1 - alpha) * existingWall.price,
            strength: alpha * newWall.strength + (1 - alpha) * existingWall.strength,
            amount: alpha * newWall.amount + (1 - alpha) * (existingWall.amount || 0)
          };
        } else {
          return newWall;
        }
      });
      
      // Remove old walls that are no longer present
      newSmoothedAsks = newSmoothedAsks.filter(function(wall) {
        return walls.asks.some(function(w) {
          return Math.abs(w.price - wall.price) / wall.price < 0.02; // 2% tolerance
        });
      });
      
      STATE.signals[symbol].smoothedWalls.asks = newSmoothedAsks;
    } else {
      // Gradually fade out walls if not present
      STATE.signals[symbol].smoothedWalls.asks = STATE.signals[symbol].smoothedWalls.asks.map(function(wall) {
        return {
          price: wall.price,
          strength: wall.strength * 0.8, // Fade out
          amount: wall.amount * 0.8
        };
      }).filter(function(wall) {
        return wall.strength > 0.5; // Remove if too weak
      });
    }
    
    // Always show walls section with smoothed values
    var smoothedWalls = STATE.signals[symbol].smoothedWalls || { bids: [], asks: [] };
    var supportWalls = (smoothedWalls.bids || []).filter(function(w) { return w && w.strength > 0.5; }).slice(0, 3);
    var resistanceWalls = (smoothedWalls.asks || []).filter(function(w) { return w && w.strength > 0.5; }).slice(0, 3);
    
    var supportHtml = '';
    if (supportWalls.length > 0) {
      supportHtml = supportWalls.map(function(wall) {
        return '<div class="wall-item wall-support">' +
          '<span class="wall-label">حمایت</span>' +
          '<span class="wall-price">' + formatPrice(wall.price) + '</span>' +
          '<span class="wall-strength">' + wall.strength.toFixed(1) + 'x</span>' +
        '</div>';
      }).join('');
    } else {
      supportHtml = '<div class="wall-item wall-support wall-empty">بدون حمایت</div>';
    }
    
    var resistanceHtml = '';
    if (resistanceWalls.length > 0) {
      resistanceHtml = resistanceWalls.map(function(wall) {
        return '<div class="wall-item wall-resistance">' +
          '<span class="wall-label">مقاومت</span>' +
          '<span class="wall-price">' + formatPrice(wall.price) + '</span>' +
          '<span class="wall-strength">' + wall.strength.toFixed(1) + 'x</span>' +
        '</div>';
      }).join('');
    } else {
      resistanceHtml = '<div class="wall-item wall-resistance wall-empty">بدون مقاومت</div>';
    }
    
    wallsHtml = '<div class="walls-container">' +
      '<div class="walls-column walls-supports">' +
        '<div class="walls-column-title">حمایت‌ها</div>' +
        '<div class="walls-list">' + supportHtml + '</div>' +
      '</div>' +
      '<div class="walls-column walls-resistances">' +
        '<div class="walls-column-title">مقاومت‌ها</div>' +
        '<div class="walls-list">' + resistanceHtml + '</div>' +
      '</div>' +
    '</div>';
  } else {
    // Use smoothed value even when orderBook is not available
    buyerPowerPercent = STATE.signals[symbol].smoothedBuyerPower;
    sellerPowerPercent = 100 - buyerPowerPercent;
    
    // Initialize smoothed walls if not exists
    if (!STATE.signals[symbol].smoothedWalls) {
      STATE.signals[symbol].smoothedWalls = { bids: [], asks: [] };
    }
    
    // Gradually fade out walls if not present
    if (STATE.signals[symbol].smoothedWalls.bids) {
      STATE.signals[symbol].smoothedWalls.bids = STATE.signals[symbol].smoothedWalls.bids.map(function(wall) {
        return {
          price: wall.price,
          strength: wall.strength * 0.8, // Fade out
          amount: wall.amount * 0.8
        };
      }).filter(function(wall) {
        return wall.strength > 0.5; // Remove if too weak
      });
    }
    
    if (STATE.signals[symbol].smoothedWalls.asks) {
      STATE.signals[symbol].smoothedWalls.asks = STATE.signals[symbol].smoothedWalls.asks.map(function(wall) {
        return {
          price: wall.price,
          strength: wall.strength * 0.8, // Fade out
          amount: wall.amount * 0.8
        };
      }).filter(function(wall) {
        return wall.strength > 0.5; // Remove if too weak
      });
    }
    
    // Always show walls section with smoothed values
    var smoothedWalls = STATE.signals[symbol].smoothedWalls || { bids: [], asks: [] };
    var supportWalls = (smoothedWalls.bids || []).filter(function(w) { return w && w.strength > 0.5; }).slice(0, 3);
    var resistanceWalls = (smoothedWalls.asks || []).filter(function(w) { return w && w.strength > 0.5; }).slice(0, 3);
    
    var supportHtml = '';
    if (supportWalls.length > 0) {
      supportHtml = supportWalls.map(function(wall) {
        return '<div class="wall-item wall-support">' +
          '<span class="wall-label">حمایت</span>' +
          '<span class="wall-price">' + formatPrice(wall.price) + '</span>' +
          '<span class="wall-strength">' + wall.strength.toFixed(1) + 'x</span>' +
        '</div>';
      }).join('');
    } else {
      supportHtml = '<div class="wall-item wall-support wall-empty">بدون حمایت</div>';
    }
    
    var resistanceHtml = '';
    if (resistanceWalls.length > 0) {
      resistanceHtml = resistanceWalls.map(function(wall) {
        return '<div class="wall-item wall-resistance">' +
          '<span class="wall-label">مقاومت</span>' +
          '<span class="wall-price">' + formatPrice(wall.price) + '</span>' +
          '<span class="wall-strength">' + wall.strength.toFixed(1) + 'x</span>' +
        '</div>';
      }).join('');
    } else {
      resistanceHtml = '<div class="wall-item wall-resistance wall-empty">بدون مقاومت</div>';
    }
    
    wallsHtml = '<div class="walls-container">' +
      '<div class="walls-column walls-supports">' +
        '<div class="walls-column-title">حمایت‌ها</div>' +
        '<div class="walls-list">' + supportHtml + '</div>' +
      '</div>' +
      '<div class="walls-column walls-resistances">' +
        '<div class="walls-column-title">مقاومت‌ها</div>' +
        '<div class="walls-list">' + resistanceHtml + '</div>' +
      '</div>' +
    '</div>';
  }
  
  // Always show buyer/seller power section
  buyerSellerPowerHtml = '<div class="buyer-seller-power-section">' +
    '<div class="power-title">' + ICONS.barChart + ' قدرت خریدار/فروشنده</div>' +
    '<div class="power-slider-container">' +
      '<div class="power-slider-labels">' +
        '<span class="power-label buyer-label">خریدار</span>' +
        '<span class="power-label seller-label">فروشنده</span>' +
      '</div>' +
      '<div class="power-slider">' +
        '<div class="power-slider-fill buyer-fill" style="width: ' + buyerPowerPercent.toFixed(1) + '%"></div>' +
        '<div class="power-slider-fill seller-fill" style="width: ' + sellerPowerPercent.toFixed(1) + '%"></div>' +
      '</div>' +
      '<div class="power-percentages">' +
        '<span class="power-percent buyer-percent">' + buyerPowerPercent.toFixed(1) + '%</span>' +
        '<span class="power-percent seller-percent">' + sellerPowerPercent.toFixed(1) + '%</span>' +
      '</div>' +
      (wallsHtml || '') +
    '</div>' +
  '</div>';
  
  // Position
  var positionHtml = '';
  if (position) {
    var pnl = calculatePnL(position, price ? price.price : 0);
    positionHtml = '<div class="position-section ' + position.type + '">' +
      '<div class="position-title">' + ICONS.clipboard + ' پوزیشن فعال</div>' +
      '<div class="position-details">' +
        '<div class="pos-row"><span>نوع:</span><span class="pos-type">' + (position.type === 'long' ? 'LONG' : 'SHORT') + '</span></div>' +
        '<div class="pos-row"><span>ورود:</span><span>' + formatPrice(position.entry) + '</span></div>' +
        '<div class="pos-row"><span>حجم:</span><span>$' + position.size.toLocaleString() + '</span></div>' +
        '<div class="pos-row"><span>اهرم:</span><span>' + position.leverage + 'x</span></div>' +
        '<div class="pos-row"><span>P&L:</span><span class="' + (pnl >= 0 ? 'profit' : 'loss') + '">' + (pnl >= 0 ? '+' : '') + pnl.toFixed(2) + '%</span></div>' +
      '</div>' +
      '<button class="btn-close-pos" onclick="closePosition(\'' + symbol + '\')">' + ICONS.x + ' بستن پوزیشن</button>' +
    '</div>';
  }
  
  // Actions
  var actionsHtml = '<div class="actions-section">';
  if (!position && signal && signal.type !== 'wait') {
    actionsHtml += '<button class="btn-enter ' + signal.type + '" onclick="enterPosition(\'' + symbol + '\')">' + ICONS.rocket + ' ورود به معامله</button>';
  }
  actionsHtml += '<button class="btn-refresh" onclick="refreshAnalysis(\'' + symbol + '\')">' + ICONS.refresh + '</button>';
  
  // Show + button if not in watchlist, trash button if in watchlist
  var isInWatchlist = STATE.watchlist.includes(symbol);
  if (isInWatchlist) {
    actionsHtml += '<button class="btn-remove" onclick="removeFromWatchlist(\'' + symbol + '\')">' + ICONS.trash + '</button>';
  } else {
    // Plus icon for adding to watchlist
    var plusIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
    actionsHtml += '<button class="btn-add" onclick="addToWatchlist(\'' + symbol + '\')">' + plusIcon + '</button>';
  }
  actionsHtml += '</div>';
  
  panel.innerHTML = priceHtml + signalHtml + scoreGaugeHtml + entryHtml + indicatorsHtml + buyerSellerPowerHtml + positionHtml + actionsHtml;
  
  // Update prompt dropdown and button if not manually selected
  if (!STATE.promptManualSelection) {
    var promptSelect = document.getElementById('promptSymbolSelect');
    var baseAsset = symbol.replace('USDT', '');
    if (promptSelect && DEFAULT_SYMBOLS && DEFAULT_SYMBOLS.includes(baseAsset)) {
      promptSelect.value = baseAsset;
    }
    updatePromptButtonText();
  }
}

// Update sticky AI Advisor section at bottom (DEPRECATED - no longer used)
function updateStickyAIAdvisor(symbol, signal) {
  // This function is kept for backward compatibility but does nothing
  // The prompt section is now always visible in the main UI
  return;
}

// ==================== Coin Icon System ====================
// Default fallback icon (app icon)
var DEFAULT_ICON_URL = 'icons/icon-72.png';

// Get icon URL for a symbol (local icons from cryptoicons folder)
function getCoinIconUrl(symbol) {
  var baseAsset = symbol.replace('USDT', '').toUpperCase();
  var cmcId = CMC_IDS[baseAsset];
  if (cmcId) {
    // Use local icon from cryptoicons folder
    return 'cryptoicons/' + baseAsset + '.png';
  }
  return null;
}

// Generate icon HTML with fallback to app icon (local icons only)
function getCoinIconHtml(symbol, size) {
  size = size || 24;
  // Always use local icon - ignore any online URLs in cache
  var iconUrl = getCoinIconUrl(symbol);
  
  if (iconUrl) {
    return '<img src="' + iconUrl + '" alt="" style="width:' + size + 'px;height:' + size + 'px;border-radius:50%;object-fit:cover;background:#222;" loading="lazy" decoding="async" onerror="this.src=\'' + DEFAULT_ICON_URL + '\'">';
  }
  return '<img src="' + DEFAULT_ICON_URL + '" alt="" style="width:' + size + 'px;height:' + size + 'px;border-radius:50%;object-fit:cover;">';
}

// Get coin info and icon (local only - no online fetching)
function fetchCoinIcon(symbol) {
  // Check cache first
  if (COIN_ICON_CACHE[symbol] && COIN_ICON_CACHE[symbol].iconUrl) {
    return Promise.resolve(COIN_ICON_CACHE[symbol]);
  }
  
  var baseAsset = symbol.replace('USDT', '').toUpperCase();
  var cmcId = CMC_IDS[baseAsset];
  
  // If we have CMC ID, use local icon
  if (cmcId) {
    var info = {
      name: baseAsset,
      symbol: baseAsset,
      iconUrl: 'cryptoicons/' + baseAsset + '.png',
      color: '#00E5B0',
      hasIcon: true
    };
    COIN_ICON_CACHE[symbol] = info;
    ASSET_INFO[symbol] = info;
    saveCoinCache();
    return Promise.resolve(info);
  }
  
  // For unknown coins, use default icon (no online fetching)
  var info = {
    name: baseAsset,
    symbol: baseAsset,
    iconUrl: null,
    color: '#00E5B0',
    hasIcon: false
  };
  COIN_ICON_CACHE[symbol] = info;
  ASSET_INFO[symbol] = info;
  saveCoinCache();
  return Promise.resolve(info);
}

function saveCoinCache() {
  try {
    localStorage.setItem('coinIconCache', JSON.stringify(COIN_ICON_CACHE));
  } catch (e) {}
}

// ==================== Default Symbols List ====================
// Only symbols that actually exist on Binance with USDT pair
// Supported symbols: Only these 12 symbols are supported
// Supported symbols
var DEFAULT_SYMBOLS = ['BTC', 'ETH', 'XRP', 'BNB', 'SOL', 'TRX', 'DOGE', 'ADA', 'LINK', 'DOT', 'LTC'];
// Make available globally for other scripts
if (typeof window !== 'undefined') {
  window.DEFAULT_SYMBOLS = DEFAULT_SYMBOLS;
}

// ==================== Data Fetching ====================
function loadAllSymbols() {
  // Only use the 11 supported symbols
  STATE.allSymbols = DEFAULT_SYMBOLS
    .filter(function(base) { return !STABLECOINS.includes(base); })
    .map(function(base) {
      return { symbol: base + 'USDT', baseAsset: base, quoteAsset: 'USDT' };
    });
  console.log('Loaded ' + STATE.allSymbols.length + ' supported symbols');
}

function startDataLoop() {
  // Initial load: fetch data and icons (icons only once)
  STATE.watchlist.forEach(function(symbol) { 
    fetchAssetData(symbol);
    // Icons are loaded once and cached - no need to reload
    if (!COIN_ICON_CACHE[symbol] || !COIN_ICON_CACHE[symbol].hasIcon) {
      fetchCoinIcon(symbol);
    }
  });
  
  // Start realtime price stream from Binance (tick-level prices)
  // REST fetching remains as fallback and for klines.
  startRealtimePrices();
  
  // Data update loop (every 5 seconds) - mainly klines + notifications
  setInterval(function() {
    STATE.watchlist.forEach(function(symbol) { 
      fetchAssetData(symbol);
      checkPositionNotifications(symbol);
    });
  }, 5000);
  
  // Real-time clock update (every second)
  setInterval(function() {
    updateLastUpdateTime();
  }, 1000);
}

function fetchAssetData(symbol) {
  var baseAsset = symbol.replace('USDT', '');
  
  // Check if symbol is in watchlist (for WebSocket price updates)
  var isInWatchlist = STATE.watchlist.includes(symbol);
  
  // Always fetch price from REST API if:
  // 1. WebSocket is not connected, OR
  // Always try to get price from Binance first
  // Priority: Binance WebSocket > Binance REST > CoinGecko (fallback only)
  var needsUpdate = !BINANCE_WS_CONNECTED || !isInWatchlist || !STATE.prices[symbol] || !STATE.prices[symbol].price;
  var isFromFallback = STATE.prices[symbol] && STATE.prices[symbol].source && 
                       (STATE.prices[symbol].source === 'coingecko' || STATE.prices[symbol].source === 'coinmarketcap');
  
  // Always try Binance REST API to ensure accurate price
  // Even if WebSocket is connected, refresh with REST API periodically
  if (needsUpdate || isFromFallback || !STATE.prices[symbol] || STATE.prices[symbol].source !== 'binance_ws') {
    // Always try Binance first - don't check API_STATUS, just try
    fetchPriceFromBinance(symbol, baseAsset);
  }
  
  // Fetch klines (candlestick data for analysis)
  TIMEFRAMES.forEach(function(tf) { 
    if (API_STATUS.binance.available) {
      fetchKlinesFromBinance(symbol, tf, baseAsset);
    } else {
      fetchKlinesFromCryptoCompare(symbol, tf, baseAsset);
    }
  });
}

// Fetch price from Binance Futures (primary source - ALWAYS use this)
function fetchPriceFromBinance(symbol, baseAsset) {
  fetch(BINANCE_API + '/fapi/v1/ticker/24hr?symbol=' + symbol)
    .then(function(res) { 
      if (!res.ok) {
        throw new Error('Symbol not found');
      }
      return res.json(); 
    })
    .then(function(data) {
      if (data.code || !data.lastPrice) {
        throw new Error(data.msg || 'Invalid data');
      }
      
      var price = parseFloat(data.lastPrice);
      var change = parseFloat(data.priceChangePercent);
      
      if (isFinite(price) && price > 0) {
        checkAPIStatus('binance', true);
        // Always update with Binance price (most accurate) - override any fallback prices
        var oldPrice = STATE.prices[symbol] ? STATE.prices[symbol].price : null;
        STATE.prices[symbol] = {
          price: price,
          change: isFinite(change) ? change : 0,
          high: parseFloat(data.highPrice) || price,
          low: parseFloat(data.lowPrice) || price,
          volume: parseFloat(data.volume) || 0,
          source: 'binance'
        };
        
        // Log if price changed significantly (debugging)
        if (oldPrice && Math.abs(price - oldPrice) > price * 0.01) {
          console.log('Price updated from ' + oldPrice + ' to ' + price + ' (Binance) for ' + symbol);
        }
        
        if (symbol === STATE.activeAsset) {
          renderAssetPanel(symbol);
        }
        STATE.lastUpdate = Date.now();
        updateLastUpdateTime();
      } else {
        throw new Error('Invalid price data');
      }
    })
    .catch(function(err) { 
      console.log('Binance price error for ' + symbol + ':', err.message);
      checkAPIStatus('binance', false);
      // Don't use fallback - CoinGecko causes rate limiting and incorrect prices
      // Only use Binance for accurate prices
      if (!STATE.prices[symbol] || STATE.prices[symbol].source !== 'binance_ws') {
        console.log('Binance unavailable for ' + symbol + ' - not using fallback to avoid incorrect prices');
        setErrorPrice(symbol, 'Binance در دسترس نیست');
      }
    });
}

// Fetch price from CoinMarketCap API (fallback when Binance fails)
// DISABLED: CoinGecko is rate-limited and causes CORS errors
// Only use Binance - if it fails, show error instead of using fallback
function fetchPriceFromCMC(symbol, baseAsset) {
  // CoinGecko is disabled due to rate limiting and CORS issues
  // Only use Binance for accurate prices
  console.log('Binance unavailable for ' + symbol + ' - not using fallback to avoid incorrect prices');
  setErrorPrice(symbol, 'Binance در دسترس نیست - لطفاً دوباره تلاش کنید');
  return;
  
  /* DISABLED - CoinGecko causes rate limit and CORS errors
  // Check if API is exhausted
  if (CMC_API_EXHAUSTED) {
    setErrorPrice(symbol, 'API محدود شده');
    return;
  }
  
  // Try CoinGecko first (no API key needed, CORS friendly)
  fetchPriceFromCoinGecko(symbol, baseAsset)
    .catch(function(err) {
      // If CoinGecko fails, log error but don't try CMC proxy (it's unreliable)
      console.log('CoinGecko failed for ' + symbol + ':', err.message);
      // CMC proxy is disabled due to CORS/header limitations
      // setErrorPrice is already called in fetchPriceFromCoinGecko catch block
    });
  */
}

// CoinGecko API (Free, CORS friendly)
function fetchPriceFromCoinGecko(symbol, baseAsset) {
  var geckoId = getCoinGeckoId(baseAsset);
  
  return fetch('https://api.coingecko.com/api/v3/simple/price?ids=' + geckoId + '&vs_currencies=usd&include_24hr_change=true')
    .then(function(res) {
      if (!res.ok) throw new Error('CoinGecko API error');
      return res.json();
    })
    .then(function(data) {
      if (data[geckoId]) {
        var coinData = data[geckoId];
        var priceData = {
          price: coinData.usd,
          change: coinData.usd_24h_change || 0,
          high: coinData.usd * 1.01,
          low: coinData.usd * 0.99,
          volume: 0,
          timestamp: Date.now()
        };
        
        // Don't cache CoinGecko prices - prefer Binance
        // Only use CoinGecko as fallback
        applyPriceFromCoinGecko(symbol, priceData);
        console.log('Price from CoinGecko (fallback) for ' + symbol + ':', priceData.price);
        return priceData;
      }
      throw new Error('Coin not found');
    })
    .catch(function(err) {
      console.log('CoinGecko error for ' + symbol + ':', err.message);
      setErrorPrice(symbol, 'قیمت در دسترس نیست');
      throw err; // Re-throw to allow caller to handle
    });
}

// Get CoinGecko ID from symbol - Only supported symbols
function getCoinGeckoId(baseAsset) {
  var mapping = {
    'BTC': 'bitcoin',
    'ETH': 'ethereum',
    'XRP': 'ripple',
    'BNB': 'binancecoin',
    'SOL': 'solana',
    'TRX': 'tron',
    'DOGE': 'dogecoin',
    'ADA': 'cardano',
    'LINK': 'chainlink',
    'DOT': 'polkadot',
    'LTC': 'litecoin'
  };
  return mapping[baseAsset.toUpperCase()] || baseAsset.toLowerCase();
}

// CMC via CORS proxy (fallback)
function fetchPriceFromCMCProxy(symbol, baseAsset) {
  // Note: CMC API requires API key in headers, but CORS proxies typically don't forward custom headers
  // This function may not work reliably. CoinGecko is preferred.
  console.warn('CMC proxy attempted for ' + symbol + ' - may fail due to CORS/header limitations');
  
  // Skip CMC proxy - it's unreliable without proper backend
  // Instead, just set error price and return rejected promise
  setErrorPrice(symbol, 'قیمت در دسترس نیست');
  return Promise.reject(new Error('CMC proxy not available - use CoinGecko instead'));
  
  /* Original code kept for reference but disabled:
  var cmcUrl = CMC_API + '/v1/cryptocurrency/quotes/latest?symbol=' + baseAsset;
  var proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(cmcUrl);
  
  return fetch(proxyUrl, {
    headers: {
      'X-CMC_PRO_API_KEY': CMC_API_KEY
    }
  })
  .then(function(res) {
    if (res.status === 429 || res.status === 402) {
      CMC_API_EXHAUSTED = true;
      throw new Error('CMC API limit reached');
    }
    if (!res.ok) throw new Error('CMC API error');
    return res.json();
  })
  .then(function(data) {
    if (data.status && data.status.error_code === 0 && data.data && data.data[baseAsset]) {
      var coinData = data.data[baseAsset];
      var quote = coinData.quote && coinData.quote.USD;
      
      if (quote) {
        var priceData = {
          price: quote.price,
          change: quote.percent_change_24h || 0,
          high: quote.price * 1.01,
          low: quote.price * 0.99,
          volume: quote.volume_24h || 0,
          timestamp: Date.now()
        };
        
        CMC_PRICE_CACHE[baseAsset] = priceData;
        applyPriceFromCMC(symbol, priceData);
        console.log('Price from CMC for ' + symbol + ':', priceData.price);
        return priceData;
      }
      throw new Error('No quote data');
    }
    throw new Error('Invalid CMC response');
  })
  .catch(function(err) {
    console.log('CMC proxy error for ' + symbol + ':', err.message);
    setErrorPrice(symbol, 'قیمت در دسترس نیست');
    throw err;
  });
  */
}

function applyPriceFromCMC(symbol, priceData) {
  STATE.prices[symbol] = {
    price: priceData.price,
    change: priceData.change,
    high: priceData.high,
    low: priceData.low,
    volume: priceData.volume,
    source: 'coinmarketcap'
  };
  
  if (symbol === STATE.activeAsset) {
    renderAssetPanel(symbol);
  }
  STATE.lastUpdate = Date.now();
  updateLastUpdateTime();
}

function applyPriceFromCoinGecko(symbol, priceData) {
  // Only use CoinGecko if we don't have Binance price
  // Always try to get Binance price first
  var hasBinancePrice = STATE.prices[symbol] && 
                        (STATE.prices[symbol].source === 'binance' || STATE.prices[symbol].source === 'binance_ws');
  
  if (hasBinancePrice) {
    console.log('Ignoring CoinGecko price for ' + symbol + ' - already have Binance price');
    // Try to refresh Binance price
    var baseAsset = symbol.replace('USDT', '');
    fetchPriceFromBinance(symbol, baseAsset);
    return;
  }
  
  console.warn('Using CoinGecko price for ' + symbol + ' (Binance unavailable):', priceData.price);
  STATE.prices[symbol] = {
    price: priceData.price,
    change: priceData.change,
    high: priceData.high,
    low: priceData.low,
    volume: priceData.volume,
    source: 'coingecko'
  };
  
  if (symbol === STATE.activeAsset) {
    renderAssetPanel(symbol);
  }
  STATE.lastUpdate = Date.now();
  updateLastUpdateTime();
  
  // Try to get Binance price in background
  var baseAsset = symbol.replace('USDT', '');
  setTimeout(function() {
    fetchPriceFromBinance(symbol, baseAsset);
  }, 1000);
}

function setErrorPrice(symbol, message) {
  if (!STATE.prices[symbol] || STATE.prices[symbol].error) {
    STATE.prices[symbol] = {
      price: 0,
      change: 0,
      error: true,
      errorMsg: message
    };
    if (symbol === STATE.activeAsset) {
      renderAssetPanel(symbol);
    }
  }
}

// Fetch klines from Binance
function fetchKlinesFromBinance(symbol, tf, baseAsset) {
  // استفاده از حداکثر دیتای ممکن از Binance
  // Binance max limit is 1000
  var limit;
  if (tf === '1d') {
    // حدود یک سال داده روزانه
    limit = 365;
  } else if (tf === '4h' || tf === '1h') {
    // حداکثر دیتای ممکن برای ۱ ساعته و ۴ ساعته (۱۰۰۰ کندل)
    limit = 1000;
  } else {
    // برای تایم‌فریم‌های دیگر (مثلاً 30m) مقدار متوسط
    limit = 500;
  }

  fetch(BINANCE_API + '/fapi/v1/klines?symbol=' + symbol + '&interval=' + tf + '&limit=' + limit)
    .then(function(res) { 
      if (!res.ok) {
        throw new Error('Klines not available');
      }
      return res.json(); 
    })
    .then(function(data) {
      if (data.code) throw new Error(data.msg || 'Invalid klines');
      
      checkAPIStatus('binance', true);
      if (!STATE.klines[symbol]) STATE.klines[symbol] = {};
      STATE.klines[symbol][tf] = data.map(function(k) {
        return { t: k[0], o: parseFloat(k[1]), h: parseFloat(k[2]), l: parseFloat(k[3]), c: parseFloat(k[4]), v: parseFloat(k[5]) };
      });
      checkAndAnalyze(symbol);
    })
    .catch(function(err) { 
      console.log('Binance klines error for ' + symbol + ':', err.message);
      checkAPIStatus('binance', false);
      // Don't use fallback - Binance is the only reliable source
      console.log('Binance klines unavailable for ' + symbol + ' - skipping fallback to avoid errors');
    });
}

// Fetch klines from CryptoCompare (fallback)
function fetchKlinesFromCryptoCompare(symbol, tf, baseAsset) {
  // Map timeframe to CryptoCompare endpoint
  // تلاش برای حداکثر دیتای ممکن از CryptoCompare
  var endpoint, limit;
  switch(tf) {
    case '30m':
      endpoint = 'histominute';
      // تا ۲۰۰۰ کندل نیم‌ساعته (چند ماه داده)
      limit = 2000;
      break;
    case '1h':
      endpoint = 'histohour';
      // حداکثر دیتای ممکن برای یک‌ساعته
      limit = 2000;
      break;
    case '4h':
      endpoint = 'histohour';
      // حداکثر دیتای ممکن، بعداً با aggregateKlines به ۴ساعته تبدیل می‌شود
      limit = 2000;
      break;
    case '1d':
      endpoint = 'histoday';
      // تا ۲۰۰۰ کندل روزانه (چند سال داده)
      limit = 2000;
      break;
    default:
      endpoint = 'histohour';
      limit = 2000;
  }
  
  fetch(CRYPTOCOMPARE_API + '/' + endpoint + '?fsym=' + baseAsset + '&tsym=USDT&limit=' + Math.min(limit, 2000))
    .then(function(res) { 
      if (!res.ok) throw new Error('CryptoCompare error');
      return res.json(); 
    })
    .then(function(data) {
      if (data.Response === 'Error') throw new Error(data.Message || 'Invalid data');
      
      checkAPIStatus('cryptocompare', true);
      if (!STATE.klines[symbol]) STATE.klines[symbol] = {};
      
      var rawData = data.Data && data.Data.Data ? data.Data.Data : (data.Data || []);
      
      // Aggregate data for larger timeframes
      var aggregated = aggregateKlines(rawData, tf);
      
      STATE.klines[symbol][tf] = aggregated.map(function(k) {
        return { 
          t: k.time * 1000, 
          o: k.open, 
          h: k.high, 
          l: k.low, 
          c: k.close, 
          v: k.volumefrom || 0 
        };
      });
      
      console.log('Klines from CryptoCompare for ' + symbol + ' ' + tf + ':', STATE.klines[symbol][tf].length + ' candles');
      checkAndAnalyze(symbol);
    })
    .catch(function(err) { 
      console.log('CryptoCompare klines error for ' + symbol + ':', err.message);
      checkAPIStatus('cryptocompare', false);
      // Try CoinGecko as last resort for basic data
      // CoinGecko disabled due to rate limiting - only use Binance
      console.log('Skipping CoinGecko klines for ' + symbol + ' (rate limited)');
    });
}

// Aggregate minute/hour data into larger timeframes
function aggregateKlines(data, tf) {
  if (!data || data.length === 0) return [];
  
  var interval;
  switch(tf) {
    case '30m': interval = 30; break;
    case '4h': interval = 4; break;
    default: return data; // 1h and 1d don't need aggregation
  }
  
  var aggregated = [];
  for (var i = 0; i < data.length; i += interval) {
    var chunk = data.slice(i, i + interval);
    if (chunk.length === 0) continue;
    
    aggregated.push({
      time: chunk[0].time,
      open: chunk[0].open,
      high: Math.max.apply(null, chunk.map(function(k) { return k.high; })),
      low: Math.min.apply(null, chunk.map(function(k) { return k.low; })),
      close: chunk[chunk.length - 1].close,
      volumefrom: chunk.reduce(function(sum, k) { return sum + (k.volumefrom || 0); }, 0)
    });
  }
  return aggregated;
}

// Fetch klines from CoinGecko (last resort)
// DISABLED: CoinGecko causes rate limiting (429 errors) and CORS issues
// Only use Binance for klines data
function fetchKlinesFromCoinGecko(symbol, tf, baseAsset) {
  console.log('CoinGecko klines disabled for ' + symbol + ' due to rate limiting');
  // Don't fetch - only use Binance
  return;
  
  /* DISABLED - CoinGecko causes rate limit errors
  var geckoId = getCoinGeckoId(baseAsset);
  var days = tf === '1d' ? 200 : (tf === '4h' ? 90 : 30);
  
  fetch(COINGECKO_API + '/coins/' + geckoId + '/ohlc?vs_currency=usd&days=' + days)
    .then(function(res) { 
      if (!res.ok) throw new Error('CoinGecko OHLC error');
      return res.json(); 
    })
    .then(function(data) {
      if (!Array.isArray(data)) throw new Error('Invalid OHLC data');
      
      checkAPIStatus('coingecko', true);
      if (!STATE.klines[symbol]) STATE.klines[symbol] = {};
      
      STATE.klines[symbol][tf] = data.map(function(k) {
        return { t: k[0], o: k[1], h: k[2], l: k[3], c: k[4], v: 0 };
      });
      
      console.log('Klines from CoinGecko for ' + symbol + ' ' + tf + ':', STATE.klines[symbol][tf].length + ' candles');
      checkAndAnalyze(symbol);
    })
    .catch(function(err) { 
      console.log('CoinGecko OHLC error for ' + symbol + ':', err.message);
      checkAPIStatus('coingecko', false);
    });
  */
}

// Check if all timeframes are loaded and analyze
function checkAndAnalyze(symbol) {
  var allTFs = TIMEFRAMES.every(function(t) {
    return STATE.klines[symbol] && STATE.klines[symbol][t] && STATE.klines[symbol][t].length > 0;
  });
  if (allTFs) analyzeAsset(symbol);
}

function refreshAnalysis(symbol) {
  showToast('در حال تحلیل مجدد...', 'info');
  fetchAssetData(symbol);
}

// ==================== AI Advisor Functions ====================
function generateAIPrompt(symbol) {
  var signal = STATE.signals[symbol];
  var price = STATE.prices[symbol];
  if (!signal || !price) {
    return null;
  }

  // مقادیر اندیکاتورها
  var rsiValue = typeof signal.rsi === 'number' ? signal.rsi.toFixed(1) : 'N/A';
  var stochK = signal.stochRsi && typeof signal.stochRsi.k === 'number' ? signal.stochRsi.k.toFixed(1) : 'N/A';
  var stochD = signal.stochRsi && typeof signal.stochRsi.d === 'number' ? signal.stochRsi.d.toFixed(1) : 'N/A';
  var ema21 = signal.ema21 ? formatPrice(signal.ema21) : 'N/A';
  var ema50 = signal.ema50 ? formatPrice(signal.ema50) : 'N/A';
  var macdHist = signal.macd && typeof signal.macd.histogram === 'number' ? signal.macd.histogram.toFixed(4) : 'N/A';
  var macdSign = signal.macd && typeof signal.macd.histogram === 'number' ? (signal.macd.histogram > 0 ? 'مثبت' : 'منفی') : 'N/A';
  var adxValue = signal.adx && typeof signal.adx.adx === 'number' ? signal.adx.adx.toFixed(1) : 'N/A';
  var bbPosition = signal.bbPosition ? signal.bbPosition.toFixed(0) : 'N/A';

  // ساختار بازار
  var trend = signal.trend || 'نامشخص';
  var structure = signal.structure || 'N/A';
  var bos = signal.bos || 'ندارد';
  var choch = signal.choch || 'ندارد';

  // حجم و مومنتوم
  var volumeRatio = signal.volume && signal.volume.ratio ? signal.volume.ratio.toFixed(2) : 'N/A';
  var divergence = signal.rsiDivergence && signal.rsiDivergence.type ? signal.rsiDivergence.type : 'ندارد';

  // الگوهای کندلی
  var patterns = signal.patterns && signal.patterns.length > 0 ? signal.patterns.join('، ') : 'شناسایی نشده';

  // سیگنال
  var signalType = signal.type === 'long' ? 'LONG' : (signal.type === 'short' ? 'SHORT' : 'WAIT');
  var score = (signal.confidence || 0) + '/10';

  // S/R استاتیک
  var sr = signal.staticSR || {};
  var nearestSupport = sr.nearestSupport ? formatPrice(sr.nearestSupport) : 'N/A';
  var nearestResistance = sr.nearestResistance ? formatPrice(sr.nearestResistance) : 'N/A';
  var supportStrength = sr.supportStrength || 'unknown';
  var resistanceStrength = sr.resistanceStrength || 'unknown';

  // HTF Summary
  var htf = signal.htfSummary || {};
  var trend4h = htf.trend4h || 'unknown';
  var trend1d = htf.trend1d || 'unknown';
  var rsi4h = typeof htf.rsi4h === 'number' ? htf.rsi4h.toFixed(1) : 'N/A';
  var rsi1d = typeof htf.rsi1d === 'number' ? htf.rsi1d.toFixed(1) : 'N/A';

  // Liquidity
  var liq = signal.liquidity || {};
  var liqVolRatio = typeof liq.volumeRatio === 'number' ? liq.volumeRatio.toFixed(2) : volumeRatio;
  var entryLiqScore = liq.entryLiquidityScore || 'normal';
  var slLiqRisk = liq.slLiquidityRisk || 'unknown';

  // BTC Context (only برای نمادهای وابسته)
  var btcCtx = signal.btcContext || {};
  var showBTC = !!btcCtx.isDependent;
  var btcCorrText = 'N/A';
  if (showBTC && typeof btcCtx.correlation === 'number') {
    btcCorrText = btcCtx.correlation.toFixed(2) + ' (' + (btcCtx.label || 'unknown') + ')';
  }
  var btcTrend4h = btcCtx.btcTrend4h || 'unknown';
  var btcTrend1d = btcCtx.btcTrend1d || 'unknown';

  var prompt = '';
  prompt += 'Role: Institutional Crypto Futures Analyst.\n';
  prompt += 'Tone: Clinical, Strict, Data-Driven. NO filler, NO emojis, NO markdown bolding.\n';
  prompt += 'Task: Audit the trade setup based on provided data.\n\n';

  prompt += '--- MARKET DATA ---\n';
  prompt += 'Symbol: ' + symbol + '\n';
  prompt += 'Timeframe: 1H\n';
  prompt += 'Current Price: ' + formatPrice(price.price) + '\n\n';

  prompt += 'Indicators:\n';
  prompt += '- RSI (14): ' + rsiValue + '\n';
  prompt += '- Stochastic RSI: K=' + stochK + ' / D=' + stochD + '\n';
  prompt += '- EMA 21: ' + ema21 + '\n';
  prompt += '- EMA 50: ' + ema50 + '\n';
  prompt += '- MACD Histogram: ' + macdHist + '\n';
  prompt += '- ADX: ' + adxValue + '\n';
  prompt += '- Bollinger Position: ' + bbPosition + '%\n\n';

  prompt += 'Structure: ' + trend + ', Structure Detail: ' + structure + ', BOS: ' + bos + ', CHoCH: ' + choch + ', Vol vs Avg: ' + volumeRatio + 'x, RSI Divergence: ' + divergence + '.\n';
  prompt += 'Candle Patterns: ' + patterns + '.\n\n';

  prompt += 'Static S/R (1H): Support=' + nearestSupport + ' [' + supportStrength + '], Resistance=' + nearestResistance + ' [' + resistanceStrength + '].\n';
  prompt += 'HTF Context: 4H Trend=' + trend4h + ' (RSI=' + rsi4h + '), 1D Trend=' + trend1d + ' (RSI=' + rsi1d + ').\n';
  prompt += 'Liquidity: Vol vs Avg=' + liqVolRatio + 'x, Entry Liquidity=' + entryLiqScore + ', SL Liquidity Risk=' + slLiqRisk + '.\n';
  if (showBTC) {
    prompt += 'BTC Correlation: ' + btcCorrText + ', BTC 4H Trend=' + btcTrend4h + ', BTC 1D Trend=' + btcTrend1d + '.\n';
  } else {
    prompt += 'BTC Correlation: Not BTC-dependent asset (ignored in validation).\n';
  }

  prompt += 'System Signal: ' + signalType + ' (Score: ' + score + ')\n';
  prompt += '- Entry: ' + formatPrice(signal.entry) + '\n';
  prompt += '- SL: ' + formatPrice(signal.sl) + '\n';
  prompt += '- TP1: ' + formatPrice(signal.tp1) + '\n';
  if (signal.tp2) {
    prompt += '- TP2: ' + formatPrice(signal.tp2) + '\n';
  }
  prompt += '\n';
  
  // Risk Detection System
  prompt += '--- RISK DETECTION ---\n';
  if (signal.riskWarning) {
    var riskReasons = signal.reasons.filter(function(r) { return r.indexOf('⚠️') !== -1; });
    if (riskReasons.length > 0) {
      prompt += 'Risk Warnings: ' + riskReasons.join('; ') + '.\n';
    } else {
      prompt += 'Risk Warnings: Active (see reasons below).\n';
    }
  } else {
    prompt += 'Risk Warnings: None detected.\n';
  }
  prompt += '\n';
  
  // VSA Patterns (7 الگو)
  prompt += '--- VSA (VOLUME SPREAD ANALYSIS) ---\n';
  if (signal.vsa) {
    var vsaPatterns = [];
    if (signal.vsa['30m'] && signal.vsa['30m'].patterns) {
      signal.vsa['30m'].patterns.forEach(function(p) {
        vsaPatterns.push('30m:' + p);
      });
    }
    if (signal.vsa['1h'] && signal.vsa['1h'].patterns) {
      signal.vsa['1h'].patterns.forEach(function(p) {
        vsaPatterns.push('1h:' + p);
      });
    }
    if (vsaPatterns.length > 0) {
      prompt += 'VSA Patterns Detected: ' + vsaPatterns.join(', ') + '.\n';
      if (signal.vsa['30m'] && signal.vsa['30m'].reasons && signal.vsa['30m'].reasons.length > 0) {
        prompt += 'VSA 30m: ' + signal.vsa['30m'].reasons.join('; ') + '.\n';
      }
      if (signal.vsa['1h'] && signal.vsa['1h'].reasons && signal.vsa['1h'].reasons.length > 0) {
        prompt += 'VSA 1h: ' + signal.vsa['1h'].reasons.join('; ') + '.\n';
      }
    } else {
      prompt += 'VSA Patterns: None detected.\n';
    }
  } else {
    prompt += 'VSA Patterns: Not analyzed.\n';
  }
  prompt += '\n';
  
  // Fibonacci Levels
  prompt += '--- FIBONACCI LEVELS ---\n';
  if (signal.fibonacciLevels) {
    var fibText = [];
    Object.keys(signal.fibonacciLevels).forEach(function(key) {
      fibText.push(key + '%=' + formatPrice(signal.fibonacciLevels[key]));
    });
    prompt += 'Fibonacci Retracement Levels: ' + fibText.join(', ') + '.\n';
    // محاسبه فاصله قیمت فعلی از سطوح فیبوناچی
    var currentPriceNum = parseFloat(price.price);
    var closestFibLevel = null;
    var closestFibDistance = Infinity;
    Object.keys(signal.fibonacciLevels).forEach(function(key) {
      var distance = Math.abs(currentPriceNum - signal.fibonacciLevels[key]);
      if (distance < closestFibDistance) {
        closestFibDistance = distance;
        closestFibLevel = key + '% (' + formatPrice(signal.fibonacciLevels[key]) + ')';
      }
    });
    if (closestFibLevel) {
      prompt += 'Nearest Fibonacci Level: ' + closestFibLevel + ' (distance: ' + formatPrice(closestFibDistance) + ').\n';
    }
  } else {
    prompt += 'Fibonacci Levels: Not calculated.\n';
  }
  prompt += '\n';
  
  // Liquidity Grabs
  prompt += '--- LIQUIDITY GRABS ---\n';
  if (signal.liquidityGrabZones) {
    var upperZones = signal.liquidityGrabZones.upperZones || [];
    var lowerZones = signal.liquidityGrabZones.lowerZones || [];
    if (upperZones.length > 0 || lowerZones.length > 0) {
      var zoneText = [];
      if (upperZones.length > 0) {
        var upperText = 'Upper Zones: ' + upperZones.slice(0, 3).map(function(z) {
          return formatPrice(z.price) + (z.strength ? ' (strength:' + z.strength.toFixed(2) + 'x)' : '');
        }).join(', ');
        zoneText.push(upperText);
      }
      if (lowerZones.length > 0) {
        var lowerText = 'Lower Zones: ' + lowerZones.slice(0, 3).map(function(z) {
          return formatPrice(z.price) + (z.strength ? ' (strength:' + z.strength.toFixed(2) + 'x)' : '');
        }).join(', ');
        zoneText.push(lowerText);
      }
      prompt += zoneText.join('; ') + '.\n';
    } else {
      prompt += 'Liquidity Grab Zones: None detected.\n';
    }
  } else {
    prompt += 'Liquidity Grab Zones: Not analyzed.\n';
  }
  prompt += '\n';

  prompt += '--- RESPONSE REQUIREMENTS ---\n';
  prompt += 'You must output EXACTLY 6 lines. No introduction, no conclusion.\n';
  prompt += 'Format your response exactly like this example:\n\n';
  prompt += '1. Signal Validity: [Verdict] - [Main Reason]\n';
  prompt += '2. Key Catalysts: [Factor 1, Factor 2]\n';
  prompt += '3. Critical Risks: [Risk 1, Risk 2]\n';
  prompt += '4. Decision: [ENTER / SKIP]\n';
  prompt += '5. Optimized Levels: [Specific price or condition]\n';
  prompt += '6. Final Score: [1-10]\n\n';
  prompt += 'Generate the response now based on the data provided:';

  return prompt;
}

/**
 * Generate combined prompt with signal (if exists) and dashboard analysis
 * @param {String} baseAsset - Base asset symbol (e.g., 'BTC', 'ETH')
 * @returns {Promise<String>} - Combined prompt text
 */
async function generateCombinedPrompt(baseAsset) {
  var combinedPrompt = '';
  
  // Convert baseAsset to full symbol format
  var symbol = baseAsset + '/USDT';
  var symbolKey = baseAsset + 'USDT';
  var signal = STATE.signals[symbolKey];
  var price = STATE.prices[symbolKey] ? STATE.prices[symbolKey].price : 0;
  
  // Start with role definition - unified as "تحلیل نماد"
  combinedPrompt += 'شما به عنوان یک تحلیلگر حرفه‌ای بازار کریپتو هستید. داده‌های تحلیلی کامل نماد ' + baseAsset + ' در ادامه ارائه شده است:\n\n';
  
  // ==================== BASIC MARKET DATA ====================
  combinedPrompt += '=== اطلاعات پایه نماد ===\n';
  combinedPrompt += 'Symbol: ' + baseAsset + '\n';
  combinedPrompt += 'CurrentPrice: ' + (price ? formatPrice(price) : 'N/A') + '\n';
  // Note: We don't provide signal - AI should generate it based on data
  // (Removed all signal suggestion related content as per instruction)
  
  // ==================== TECHNICAL INDICATORS ====================
  combinedPrompt += '=== اندیکاتورهای تکنیکال ===\n';
  if (signal) {
    if (signal.rsi !== undefined && signal.rsi !== null && typeof signal.rsi === 'number') combinedPrompt += 'RSI=' + signal.rsi.toFixed(1) + ' ';
    if (signal.adx && signal.adx.adx !== undefined && signal.adx.adx !== null && typeof signal.adx.adx === 'number') combinedPrompt += 'ADX=' + signal.adx.adx.toFixed(1) + ' ';
    if (signal.ema21) combinedPrompt += 'EMA21=' + formatPrice(signal.ema21) + ' ';
    if (signal.ema50) combinedPrompt += 'EMA50=' + formatPrice(signal.ema50) + ' ';
    if (signal.ema200) combinedPrompt += 'EMA200=' + formatPrice(signal.ema200) + ' ';
    if (signal.macd && signal.macd.histogram !== undefined && signal.macd.histogram !== null && typeof signal.macd.histogram === 'number') combinedPrompt += 'MACD=' + signal.macd.histogram.toFixed(4) + ' ';
    if (signal.stochRsi && signal.stochRsi.k !== undefined && signal.stochRsi.k !== null && typeof signal.stochRsi.k === 'number') combinedPrompt += 'StochRSI_K=' + signal.stochRsi.k.toFixed(1) + ' ';
    if (signal.bbPosition !== undefined && signal.bbPosition !== null && typeof signal.bbPosition === 'number') combinedPrompt += 'BB_Position=' + signal.bbPosition.toFixed(0) + '%';
    combinedPrompt += '\n';
    
    // Divergence with Hidden Divergence support
    if (signal.rsiDivergence && signal.rsiDivergence.type && signal.rsiDivergence.type !== 'none') {
      var divType = signal.rsiDivergence.type;
      var isHidden = signal.rsiDivergence.isHidden || false;
      var divText = isHidden ? 'HiddenDivergence_' + divType : 'RegularDivergence_' + divType;
      combinedPrompt += 'Divergence: ' + divText + ' (Strength: ' + (signal.rsiDivergence.strength || 1) + ')\n';
    } else {
      combinedPrompt += 'Divergence: none\n';
    }
    
    // Structure and volume
    if (signal.trend) combinedPrompt += 'Trend=' + signal.trend + ' ';
    if (signal.structure) combinedPrompt += 'Structure=' + signal.structure + ' ';
    if (signal.volume && signal.volume.ratio !== undefined && signal.volume.ratio !== null && typeof signal.volume.ratio === 'number') combinedPrompt += 'VolumeRatio=' + signal.volume.ratio.toFixed(2) + 'x';
    combinedPrompt += '\n';
  } else {
    combinedPrompt += 'Indicators: N/A (سیگنال موجود نیست)\n';
  }
  combinedPrompt += '\n';
  
  // ==================== DERIVATIVES DATA ====================
  combinedPrompt += '=== داده‌های مشتقات (Derivatives) ===\n';
  
  // Funding Rate
  if (signal && signal.fundingRate) {
    var fr = signal.fundingRate;
    var frRate = (fr.rate * 100).toFixed(4);
    var frDaily = fr.dailyRate !== undefined ? fr.dailyRate.toFixed(2) : (frRate * 3).toFixed(2);
    combinedPrompt += 'FundingRate: ' + frRate + '% (Daily: ' + frDaily + '%)\n';
    if (fr.annualizedRate) {
      combinedPrompt += 'FundingRateAnnualized: ' + (fr.annualizedRate * 100).toFixed(2) + '%\n';
    }
  } else {
    combinedPrompt += 'FundingRate: N/A\n';
  }
  
  // Open Interest
  if (signal && signal.openInterest && signal.openInterest.value > 0) {
    var oiValue = signal.openInterest.value;
    // Fix: Calculate ValueUSD if not available or zero
    var oiValueUSD = signal.openInterest.valueUSD || 0;
    if (oiValueUSD === 0 && price > 0) {
      oiValueUSD = oiValue * price;
    }
    combinedPrompt += 'OpenInterest: ' + (oiValue > 1000000 ? (oiValue / 1000000).toFixed(2) + 'M' : 
                                         oiValue > 1000 ? (oiValue / 1000).toFixed(2) + 'K' : 
                                         oiValue.toFixed(0)) + 
                     ' (ValueUSD: ' + (oiValueUSD > 1000000 ? (oiValueUSD / 1000000).toFixed(2) + 'M' : 
                                      oiValueUSD > 1000 ? (oiValueUSD / 1000).toFixed(2) + 'K' : 
                                      oiValueUSD.toFixed(0)) + ')\n';
  } else {
    combinedPrompt += 'OpenInterest: N/A\n';
  }
  
  // Liquidation Zones
  if (signal && signal.liquidationZones && signal.liquidationZones.nearLiquidity) {
    var liqZones = signal.liquidationZones;
    combinedPrompt += 'LiquidationZones: DETECTED\n';
    if (liqZones.warnings && liqZones.warnings.length > 0) {
      liqZones.warnings.forEach(function(w) {
        combinedPrompt += 'LiquidationWarning: [' + w.level.toUpperCase() + '] ' + w.distance.toFixed(2) + '%\n';
      });
    }
    if (liqZones.zones && liqZones.zones.length > 0) {
      combinedPrompt += 'LiquidationZonesCount: ' + liqZones.zones.length + '\n';
      liqZones.zones.slice(0, 3).forEach(function(zone) {
        combinedPrompt += 'LiquidationZone: Price=' + zone.price.toFixed(2) + ' Strength=' + zone.strength.toFixed(1) + 'x Distance=' + zone.distance.toFixed(2) + '% Type=' + zone.type + ' Risk=' + zone.risk + '\n';
      });
    }
  } else {
    combinedPrompt += 'LiquidationZones: none\n';
  }
  combinedPrompt += '\n';
  
  // ==================== RISK/REWARD ANALYSIS ====================
  combinedPrompt += '=== تحلیل Risk/Reward ===\n';
  if (signal && signal.riskReward) {
    var rr = signal.riskReward;
    combinedPrompt += 'RiskRewardRatio: ' + rr.riskRewardRatio.toFixed(2) + ':1\n';
    if (rr.riskRewardRatio2) {
      combinedPrompt += 'RiskRewardRatio2: ' + rr.riskRewardRatio2.toFixed(2) + ':1 (to TP2)\n';
    }
    combinedPrompt += 'RiskLevel: ' + rr.riskLevel + '\n';
    combinedPrompt += 'Risk: ' + rr.risk.toFixed(2) + '% Reward1: ' + rr.reward1.toFixed(2) + '%';
    if (rr.reward2) {
      combinedPrompt += ' Reward2: ' + rr.reward2.toFixed(2) + '%';
    }
    combinedPrompt += '\n';
    
    if (rr.distanceToResistance !== null) {
      combinedPrompt += 'DistanceToResistance: ' + rr.distanceToResistance.toFixed(2) + '%';
      if (rr.nearestResistanceWall) {
        combinedPrompt += ' (WallPrice: ' + rr.nearestResistanceWall.price.toFixed(2) + ' Strength: ' + rr.nearestResistanceWall.strength.toFixed(1) + 'x)';
      }
      combinedPrompt += '\n';
    }
    
    if (rr.distanceToSupport !== null) {
      combinedPrompt += 'DistanceToSupport: ' + rr.distanceToSupport.toFixed(2) + '%';
      if (rr.nearestSupportWall) {
        combinedPrompt += ' (WallPrice: ' + rr.nearestSupportWall.price.toFixed(2) + ' Strength: ' + rr.nearestSupportWall.strength.toFixed(1) + 'x)';
      }
      combinedPrompt += '\n';
    }
    
    if (rr.warnings && rr.warnings.length > 0) {
      rr.warnings.forEach(function(w) {
        combinedPrompt += 'RiskRewardWarning: [' + w.level.toUpperCase() + '] ' + w.message + '\n';
      });
    }
  } else {
    combinedPrompt += 'RiskRewardAnalysis: N/A\n';
  }
  combinedPrompt += '\n';
  
  // ==================== SUPPORT/RESISTANCE ====================
  combinedPrompt += '=== سطوح حمایت و مقاومت ===\n';
  if (signal && signal.staticSR) {
    var sr = signal.staticSR;
    if (sr.nearestSupport) {
      combinedPrompt += 'Support: ' + formatPrice(sr.nearestSupport) + ' (Strength: ' + (sr.supportStrength || 'unknown') + ')';
      if (sr.supportDistancePct !== null && sr.supportDistancePct !== undefined) {
        combinedPrompt += ' Distance: ' + sr.supportDistancePct.toFixed(2) + '%';
      }
      combinedPrompt += '\n';
    }
    if (sr.nearestResistance) {
      combinedPrompt += 'Resistance: ' + formatPrice(sr.nearestResistance) + ' (Strength: ' + (sr.resistanceStrength || 'unknown') + ')';
      if (sr.resistanceDistancePct !== null && sr.resistanceDistancePct !== undefined) {
        combinedPrompt += ' Distance: ' + sr.resistanceDistancePct.toFixed(2) + '%';
      }
      combinedPrompt += '\n';
    }
  } else {
    combinedPrompt += 'Support/Resistance: N/A\n';
  }
  combinedPrompt += '\n';
  
  // ==================== HIGHER TIMEFRAME CONTEXT ====================
  combinedPrompt += '=== تحلیل تایم‌فریم‌های بالاتر ===\n';
  if (signal && signal.htfSummary) {
    var htf = signal.htfSummary;
    if (htf.trend4h) combinedPrompt += 'Trend4H: ' + htf.trend4h + ' ';
    if (htf.trend1d) combinedPrompt += 'Trend1D: ' + htf.trend1d + ' ';
    if (htf.rsi4h !== undefined && htf.rsi4h !== null && typeof htf.rsi4h === 'number') combinedPrompt += 'RSI4H=' + htf.rsi4h.toFixed(1) + ' ';
    if (htf.rsi1d !== undefined && htf.rsi1d !== null && typeof htf.rsi1d === 'number') combinedPrompt += 'RSI1D=' + htf.rsi1d.toFixed(1);
    combinedPrompt += '\n';
  } else {
    combinedPrompt += 'HTF Context: N/A\n';
  }
  combinedPrompt += '\n';
  
  // ==================== BTC CORRELATION ====================
  combinedPrompt += '=== همبستگی با بیت‌کوین ===\n';
  if (signal && signal.btcContext && signal.btcContext.isDependent) {
    var btcCtx = signal.btcContext;
    var btcStatus = 'neutral';
    var btc4 = (btcCtx.btcTrend4h || '').toLowerCase();
    var btc1 = (btcCtx.btcTrend1d || '').toLowerCase();
    
    if ((btc4 && (btc4.indexOf('bull') !== -1 || btc4.indexOf('up') !== -1 || btc4 === 'strong_up')) ||
        (btc1 && (btc1.indexOf('bull') !== -1 || btc1.indexOf('up') !== -1 || btc1 === 'strong_up'))) {
      btcStatus = 'bullish';
    } else if ((btc4 && (btc4.indexOf('bear') !== -1 || btc4.indexOf('down') !== -1 || btc4 === 'strong_down')) ||
               (btc1 && (btc1.indexOf('bear') !== -1 || btc1.indexOf('down') !== -1 || btc1 === 'strong_down'))) {
      btcStatus = 'bearish';
    }
    
    combinedPrompt += 'BTCStatus: ' + btcStatus + '\n';
    combinedPrompt += 'BTCTrend4H: ' + (btcCtx.btcTrend4h || 'unknown') + '\n';
    combinedPrompt += 'BTCTrend1D: ' + (btcCtx.btcTrend1d || 'unknown') + '\n';
    if (typeof btcCtx.correlation === 'number') {
      combinedPrompt += 'BTCCorrelation: ' + btcCtx.correlation.toFixed(2) + ' (Label: ' + (btcCtx.label || 'unknown') + ')\n';
    }
  } else {
    combinedPrompt += 'BTC Correlation: Not BTC-dependent asset (ignored)\n';
  }
  combinedPrompt += '\n';
  
  // ==================== DASHBOARD ANALYSIS ====================
  combinedPrompt += '=== تحلیل داشبورد (Multi-Timeframe) ===\n';
  try {
    // Check if engines are available
    if (typeof AnalysisEngine === 'undefined' || typeof ScoringEngine === 'undefined') {
      combinedPrompt += 'موتورهای تحلیل در حال بارگذاری هستند. لطفاً چند لحظه صبر کنید و دوباره تلاش کنید.\n';
      return combinedPrompt;
    }
    
    // Run dashboard analysis
    var engine = new AnalysisEngine('binance', symbol);
    var analysisResult = await engine.analyze();
    
    if (!analysisResult.success) {
      combinedPrompt += 'خطا در تحلیل داشبورد: ' + (analysisResult.error || 'خطای نامشخص') + '\n';
      return combinedPrompt;
    }
    
    var scoringEngine = new ScoringEngine();
    
    // Pass BTC context for veto logic
    var btcContextForScoring = signal && signal.btcContext ? signal.btcContext : null;
    var scoreData = scoringEngine.calculateOverallScore({
      timeframeResults: analysisResult.timeframeResults,
      orderBook: analysisResult.orderBook,
      walls: analysisResult.walls,
      currentPrice: analysisResult.currentPrice
    }, btcContextForScoring);

    var primaryTF = analysisResult.timeframeResults['1h'] || analysisResult.timeframeResults['4h'] || {};
    var momentum = primaryTF.momentum || 'Neutral';

    // Dashboard analysis data
    var finalScore = scoreData.overall;
    combinedPrompt += 'OverallScore: ' + finalScore + '/100';
    if (scoreData.btcVetoApplied) {
      combinedPrompt += ' (BTC Veto Applied: Reduced by 50% due to High Correlation with Bearish BTC)';
    }
    combinedPrompt += '\n';
    combinedPrompt += 'Momentum: ' + momentum + '\n';

    // Add timeframe analysis - Simple numeric data only
    combinedPrompt += 'Timeframes:\n';
    var timeframes = ['30m', '1h', '4h', '1d'];
    timeframes.forEach(function(tf) {
      var tfData = analysisResult.timeframeResults[tf];
      if (tfData) {
        var tfScore = analysisResult.scores.find(function(s) { return s.timeframe === tf; });
        combinedPrompt += tf + ': ';
        if (tfScore) {
          combinedPrompt += 'Score=' + Math.round(tfScore.score) + ' ';
        }
        combinedPrompt += 'RSI=' + (tfData.rsi !== undefined && tfData.rsi !== null && typeof tfData.rsi === 'number' ? tfData.rsi.toFixed(1) : 'N/A') + ' ';
        var adxValue = null;
        if (tfData.adx !== undefined && tfData.adx !== null) {
          if (typeof tfData.adx === 'number') {
            adxValue = tfData.adx.toFixed(1);
          } else if (tfData.adx.adx !== undefined && tfData.adx.adx !== null && typeof tfData.adx.adx === 'number') {
            adxValue = tfData.adx.adx.toFixed(1);
          }
        }
        combinedPrompt += 'ADX=' + (adxValue || 'N/A') + ' ';
        combinedPrompt += 'Trend=' + (tfData.trend || 'neutral') + ' ';
        combinedPrompt += 'Momentum=' + (tfData.momentum || 'Neutral');
        if (tfData.macd && tfData.macd.histogram !== undefined && tfData.macd.histogram !== null && typeof tfData.macd.histogram === 'number') {
          combinedPrompt += ' MACD=' + tfData.macd.histogram.toFixed(4);
        }
        combinedPrompt += '\n';
      }
    });

    // Add score breakdown - Simple numeric
    if (scoreData && scoreData.components) {
      combinedPrompt += 'Score Components: ';
      if (scoreData.components.timeframe !== undefined) {
        combinedPrompt += 'Timeframe=' + Math.round(scoreData.components.timeframe) + ' ';
      }
      if (scoreData.components.liquidity !== undefined) {
        combinedPrompt += 'Liquidity=' + Math.round(scoreData.components.liquidity) + ' ';
      }
      if (scoreData.components.indicators !== undefined) {
        combinedPrompt += 'Indicators=' + Math.round(scoreData.components.indicators);
      }
      combinedPrompt += '\n';
    }

    // Add walls information - Simple numeric
    if (analysisResult.walls) {
      var askWalls = analysisResult.walls.asks || [];
      var bidWalls = analysisResult.walls.bids || [];

      if (askWalls.length > 0 || bidWalls.length > 0) {
        var totalAskVolume = askWalls.reduce(function(sum, wall) { return sum + (wall.amount || 0); }, 0);
        var totalBidVolume = bidWalls.reduce(function(sum, wall) { return sum + (wall.amount || 0); }, 0);
        var pressureRatio = totalBidVolume > 0 ? (totalAskVolume / totalBidVolume).toFixed(2) : 'N/A';

        combinedPrompt += 'Liquidity: AskVolume=' + totalAskVolume.toFixed(2) + ' BidVolume=' + totalBidVolume.toFixed(2) + ' PressureRatio=' + pressureRatio + '\n';

        if (askWalls.length > 0) {
          combinedPrompt += 'ResistanceWalls: ';
          askWalls.slice(0, 3).forEach(function(wall, index) {
            if (index > 0) combinedPrompt += ' ';
            var wallPrice = (wall.price !== undefined && wall.price !== null && typeof wall.price === 'number') ? wall.price.toFixed(2) : 'N/A';
            var wallStrength = (wall.strength !== undefined && wall.strength !== null && typeof wall.strength === 'number') ? wall.strength.toFixed(1) : 'N/A';
            combinedPrompt += wallPrice + '(' + wallStrength + 'x)';
          });
          combinedPrompt += '\n';
        }

        if (bidWalls.length > 0) {
          combinedPrompt += 'SupportWalls: ';
          bidWalls.slice(0, 3).forEach(function(wall, index) {
            if (index > 0) combinedPrompt += ' ';
            var wallPrice = (wall.price !== undefined && wall.price !== null && typeof wall.price === 'number') ? wall.price.toFixed(2) : 'N/A';
            var wallStrength = (wall.strength !== undefined && wall.strength !== null && typeof wall.strength === 'number') ? wall.strength.toFixed(1) : 'N/A';
            combinedPrompt += wallPrice + '(' + wallStrength + 'x)';
          });
          combinedPrompt += '\n';
        }
      }
    }

    // Add order book - Simple numeric
    if (analysisResult.orderBook) {
      var orderBookBids = analysisResult.orderBook.bids || [];
      var orderBookAsks = analysisResult.orderBook.asks || [];

      if (orderBookBids.length > 0 || orderBookAsks.length > 0) {
        combinedPrompt += 'OrderBook: ';
        if (orderBookAsks.length > 0) {
          combinedPrompt += 'Asks=';
          orderBookAsks.slice(0, 3).forEach(function(ask, index) {
            if (index > 0) combinedPrompt += ',';
            var askPrice = (ask.price !== undefined && ask.price !== null && typeof ask.price === 'number') ? ask.price.toFixed(2) : 'N/A';
            combinedPrompt += askPrice;
          });
        }
        if (orderBookBids.length > 0) {
          combinedPrompt += ' Bids=';
          orderBookBids.slice(0, 3).forEach(function(bid, index) {
            if (index > 0) combinedPrompt += ',';
            var bidPrice = (bid.price !== undefined && bid.price !== null && typeof bid.price === 'number') ? bid.price.toFixed(2) : 'N/A';
            combinedPrompt += bidPrice;
          });
        }
        combinedPrompt += '\n';
      }
    }

    // Add key levels - Simple numeric
    if (analysisResult.walls) {
      var bidWalls = analysisResult.walls.bids || [];
      var askWalls = analysisResult.walls.asks || [];
      var strongestBid = bidWalls.length > 0 ? bidWalls.reduce(function(max, wall) {
        return (wall.strength || 0) > (max.strength || 0) ? wall : max;
      }, bidWalls[0]) : null;
      var strongestAsk = askWalls.length > 0 ? askWalls.reduce(function(max, wall) {
        return (wall.strength || 0) > (max.strength || 0) ? wall : max;
      }, askWalls[0]) : null;

      combinedPrompt += 'KeyLevels: ';
      if (strongestBid) {
        var bidPrice = (strongestBid.price !== undefined && strongestBid.price !== null && typeof strongestBid.price === 'number') ? strongestBid.price.toFixed(2) : 'N/A';
        var bidStrength = (strongestBid.strength !== undefined && strongestBid.strength !== null && typeof strongestBid.strength === 'number') ? strongestBid.strength.toFixed(1) : 'N/A';
        combinedPrompt += 'Support=' + bidPrice + '(' + bidStrength + 'x) ';
      }
      if (strongestAsk) {
        var askPrice = (strongestAsk.price !== undefined && strongestAsk.price !== null && typeof strongestAsk.price === 'number') ? strongestAsk.price.toFixed(2) : 'N/A';
        var askStrength = (strongestAsk.strength !== undefined && strongestAsk.strength !== null && typeof strongestAsk.strength === 'number') ? strongestAsk.strength.toFixed(1) : 'N/A';
        combinedPrompt += 'Resistance=' + askPrice + '(' + askStrength + 'x)';
      }
      combinedPrompt += '\n';
    }

  } catch (error) {
    console.error('Error generating dashboard analysis:', error);
    combinedPrompt += 'خطا در تولید تحلیل داشبورد: ' + error.message + '\n';
  }

  // ==================== CHOP INDEX DETECTION ====================
  combinedPrompt += '\n=== تشخیص وضعیت بازار (Chop Index) ===\n';
  if (signal && signal.staticSR) {
    var sr = signal.staticSR;
    var supportDistance = sr.supportDistancePct !== null && sr.supportDistancePct !== undefined ? sr.supportDistancePct : 999;
    var resistanceDistance = sr.resistanceDistancePct !== null && sr.resistanceDistancePct !== undefined ? sr.resistanceDistancePct : 999;
    var totalDistance = supportDistance + resistanceDistance;
    var isChoppy = totalDistance < 0.5;

    if (isChoppy) {
      combinedPrompt += 'MarketStatus: Choppy (Squeezed)\n';
      combinedPrompt += 'SupportResistanceDistance: ' + totalDistance.toFixed(2) + '% (Very Close - Market in Tight Range)\n';
      combinedPrompt += 'Warning: Market is in a compressed range. Wait for breakout before entering.\n';
    } else {
      combinedPrompt += 'MarketStatus: Normal\n';
      combinedPrompt += 'SupportResistanceDistance: ' + totalDistance.toFixed(2) + '%\n';
    }
  } else {
    combinedPrompt += 'MarketStatus: Unknown (Support/Resistance data not available)\n';
  }
  
  // ==================== FINAL REQUEST ====================
  combinedPrompt += '\n=== درخواست تحلیل و سیگنال‌دهی ===\n';
  combinedPrompt += 'شما به عنوان یک تحلیلگر حرفه‌ای، بر اساس تمام داده‌های تحلیلی ارائه شده، باید:\n\n';
  combinedPrompt += '1. ارزیابی کلی وضعیت بازار نماد ' + baseAsset + '\n';
  combinedPrompt += '   - تحلیل روند کلی (صعودی/نزولی/رنج)\n';
  combinedPrompt += '   - بررسی قدرت روند و مومنتوم\n';
  combinedPrompt += '   - وضعیت اندیکاتورهای تکنیکال\n\n';
  combinedPrompt += '2. تعیین سیگنال معاملاتی\n';
  combinedPrompt += '   - بر اساس داده‌ها، خودتان تصمیم بگیرید: LONG / SHORT / WAIT\n';
  combinedPrompt += '   - اگر سیگنال LONG یا SHORT می‌دهید، اعتماد خود را از 1 تا 10 مشخص کنید\n';
  combinedPrompt += '   - توجه: پیشنهاد سیستم (SystemSuggestedSignal) را فقط به عنوان یک مرجع در نظر بگیرید، نه به عنوان سیگنال قطعی\n\n';
  combinedPrompt += '3. در صورت وجود سیگنال، تعیین سطوح معاملاتی\n';
  combinedPrompt += '   - Entry (نقطه ورود): بر اساس تحلیل خودتان تعیین کنید\n';
  combinedPrompt += '   - Stop Loss (استاپ لاس): با در نظر گیری ریسک و سطوح حمایت/مقاومت\n';
  combinedPrompt += '   - Take Profit 1 و 2: بر اساس Risk/Reward و سطوح مقاومت/حمایت\n';
  combinedPrompt += '   - Leverage پیشنهادی: بر اساس فاصله Entry تا SL\n';
  combinedPrompt += '   - توجه: سطوح پیشنهادی سیستم (SystemSuggestedLevels) را فقط به عنوان مرجع در نظر بگیرید\n\n';
  combinedPrompt += '4. تحلیل Risk/Reward\n';
  combinedPrompt += '   - محاسبه نسبت Risk/Reward برای سیگنال پیشنهادی شما\n';
  combinedPrompt += '   - بررسی ریسک‌های موجود (نزدیکی به مقاومت/حمایت، وضعیت BTC، و غیره)\n';
  combinedPrompt += '   - ارزیابی کیفیت ستاپ\n\n';
  combinedPrompt += '5. هشدارهای مهم\n';
  combinedPrompt += '   - لیست تمام ریسک‌ها و هشدارهای مهم\n';
  combinedPrompt += '   - توجه به تناقضات (مثل Score بالا اما Confidence پایین)\n';
  combinedPrompt += '   - وضعیت Choppy بودن بازار\n';
  combinedPrompt += '   - همبستگی با BTC و تأثیر آن\n\n';
  combinedPrompt += '6. پیشنهاد نهایی\n';
  combinedPrompt += '   - تصمیم نهایی: ENTER (ورود) / SKIP (رد) / WAIT (انتظار)\n';
  combinedPrompt += '   - دلیل تصمیم خود را به صورت مختصر و واضح بیان کنید\n\n';
  combinedPrompt += 'مهم: شما باید خودتان بر اساس داده‌ها تصمیم بگیرید. پیشنهادات سیستم (SystemSuggestedSignal و SystemSuggestedLevels) فقط به عنوان مرجع هستند.\n';
  combinedPrompt += 'لطفاً تحلیل را مختصر، دقیق، مبتنی بر داده‌ها و با تصمیم‌گیری مستقل ارائه دهید.';
  
  return combinedPrompt;
}

function handleAIPromptClick(symbol) {
  // Get symbol from dropdown if not provided
  var baseAsset = null;
  if (!symbol) {
    var selectElement = document.getElementById('promptSymbolSelect');
    if (selectElement && selectElement.value) {
      baseAsset = selectElement.value; // This is already base asset (BTC, ETH, etc.)
      symbol = baseAsset + 'USDT'; // Convert to full symbol for STATE
    } else if (STATE.activeAsset) {
      symbol = STATE.activeAsset;
      baseAsset = symbol.replace('USDT', '');
    } else {
      showToast('لطفاً نماد را انتخاب کنید', 'error');
      return;
    }
  } else {
    // If symbol provided, extract base asset
    if (symbol.includes('USDT')) {
      baseAsset = symbol.replace('USDT', '');
    } else {
      baseAsset = symbol;
      symbol = symbol + 'USDT';
    }
  }
  
  // Disable button and show loading
  var btn = document.getElementById('getPromptBtn');
  if (btn) {
    btn.disabled = true;
    var originalText = btn.innerHTML;
    btn.innerHTML = '<div style="width:16px;height:16px;border:2px solid currentColor;border-top-color:transparent;border-radius:50%;animation:spin 1s linear infinite;display:inline-block;"></div> در حال تولید...';
    
    // Generate combined prompt (pass baseAsset, not full symbol)
    generateCombinedPrompt(baseAsset || symbol.replace('USDT', '')).then(function(prompt) {
      // Show modal with prompt
      if (prompt && prompt.trim().length > 0) {
        showPromptModal(prompt);
      } else {
        showToast('پرامپت خالی است. لطفاً منتظر بمانید تا داده‌ها لود شوند', 'warning');
      }
      btn.disabled = false;
      btn.innerHTML = originalText;
    }).catch(function(error) {
      console.error('Error generating prompt:', error);
      showToast('خطا در تولید پرامپت: ' + error.message, 'error');
      btn.disabled = false;
      btn.innerHTML = originalText;
    });
  } else {
    // Fallback if button not found
    generateCombinedPrompt(baseAsset || symbol.replace('USDT', '')).then(function(prompt) {
      if (prompt && prompt.trim().length > 0) {
        showPromptModal(prompt);
      } else {
        showToast('پرامپت خالی است. لطفاً منتظر بمانید تا داده‌ها لود شوند', 'warning');
      }
    }).catch(function(error) {
      console.error('Error generating prompt:', error);
      showToast('خطا در تولید پرامپت: ' + error.message, 'error');
    });
  }
}

function showPromptModal(prompt) {
  var modal = document.getElementById('promptModal');
  var textarea = document.getElementById('promptTextarea');
  var closeBtn = document.getElementById('promptModalClose');
  var copyBtn = document.getElementById('promptCopyBtn');
  
  if (!modal || !textarea) {
    // Fallback: try to copy directly
    copyPromptToClipboard(prompt);
    return;
  }
  
  // Set prompt text
  textarea.value = prompt || '';
  
  // Ensure textarea is selectable on mobile
  textarea.setAttribute('readonly', 'readonly'); // Prevent editing but allow selection
  textarea.style.webkitUserSelect = 'text';
  textarea.style.userSelect = 'text';
  
  // Show modal
  modal.classList.add('show');
  
  // Focus textarea and select all text for easy selection on mobile
  setTimeout(function() {
    textarea.focus();
    // Use setSelectionRange for better mobile support
    textarea.setSelectionRange(0, textarea.value.length);
    // Also try select() for desktop
    try {
      textarea.select();
    } catch(e) {
      // Ignore errors on some browsers
    }
    // Scroll to top
    textarea.scrollTop = 0;
  }, 200);
  
  // Close modal handlers
  function closeModal() {
    modal.classList.remove('show');
  }
  
  if (closeBtn) {
    closeBtn.onclick = closeModal;
  }
  
  // Close on backdrop click
  modal.onclick = function(e) {
    if (e.target === modal) {
      closeModal();
    }
  };
  
  // Copy button handler - use event capture for better mobile support
  if (copyBtn) {
    copyBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      copyPromptToClipboard(prompt, copyBtn, textarea);
    };
    // Also add touchstart for better mobile support
    copyBtn.addEventListener('touchend', function(e) {
      e.preventDefault();
      e.stopPropagation();
      copyPromptToClipboard(prompt, copyBtn, textarea);
    });
  }
  
  // Close on Escape key
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
      document.removeEventListener('keydown', escHandler);
    }
  });
}

function copyPromptToClipboard(text, btn, textarea) {
  if (!text || text.trim().length === 0) {
    showToast('متن برای کپی خالی است', 'warning');
    return;
  }
  
  // Get textarea if not provided
  if (!textarea) {
    textarea = document.getElementById('promptTextarea');
  }
  
  // Helper function to show success message
  function showCopySuccess() {
    showToast('پرامپت با موفقیت کپی شد', 'success');
    if (btn) {
      var originalText = btn.innerHTML;
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> کپی شد!';
      btn.classList.add('copied');
      setTimeout(function() {
        btn.innerHTML = originalText;
        btn.classList.remove('copied');
      }, 2000);
    }
  }
  
  // Method 1: Use textarea with execCommand (best for mobile)
  if (textarea && textarea.value) {
    try {
      // Remove readonly temporarily for better mobile support
      textarea.removeAttribute('readonly');
      
      // Focus and select
      textarea.focus();
      textarea.setSelectionRange(0, textarea.value.length);
      
      // Try copy command
      var success = document.execCommand('copy');
      
      // Restore readonly
      textarea.setAttribute('readonly', 'readonly');
      
      if (success) {
        showCopySuccess();
        return;
      }
    } catch(e) {
      console.log('execCommand copy failed:', e);
      // Restore readonly if it was removed
      if (textarea) {
        textarea.setAttribute('readonly', 'readonly');
      }
    }
  }
  
  // Method 2: Try Clipboard API (requires HTTPS or localhost)
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function() {
      showCopySuccess();
    }).catch(function(err) {
      console.error('Clipboard API error:', err);
      // Fallback to hidden textarea method
      fallbackCopyToClipboard(text, btn);
    });
  } else {
    // Fallback to hidden textarea method
    fallbackCopyToClipboard(text, btn);
  }
}

function fallbackCopyToClipboard(text, btn) {
  try {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.width = '2em';
    textarea.style.height = '2em';
    textarea.style.padding = '0';
    textarea.style.border = 'none';
    textarea.style.outline = 'none';
    textarea.style.boxShadow = 'none';
    textarea.style.background = 'transparent';
    textarea.style.opacity = '0';
    textarea.setAttribute('readonly', '');
    textarea.setAttribute('aria-hidden', 'true');
    
    document.body.appendChild(textarea);
    
    // Select text for mobile devices (iOS)
    if (navigator.userAgent.match(/ipad|iphone/i)) {
      var range = document.createRange();
      range.selectNodeContents(textarea);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textarea.setSelectionRange(0, 999999);
    } else {
      textarea.select();
      textarea.setSelectionRange(0, 999999);
    }
    
    // Focus the textarea before copying (important for mobile)
    textarea.focus();
    
    var success = document.execCommand('copy');
    document.body.removeChild(textarea);
    
    if (success) {
      showToast('پرامپت با موفقیت کپی شد', 'success');
      if (btn) {
        var originalText = btn.innerHTML;
        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> کپی شد!';
        btn.classList.add('copied');
        setTimeout(function() {
          btn.innerHTML = originalText;
          btn.classList.remove('copied');
        }, 2000);
      }
    } else {
      showToast('لطفاً متن را به صورت دستی انتخاب و کپی کنید', 'warning');
    }
  } catch (err) {
    console.error('Fallback copy error:', err);
    showToast('لطفاً متن را به صورت دستی انتخاب و کپی کنید', 'warning');
  }
}

// ==================== New Suggestions System ====================

// Initialize suggestions system with 12 symbols
function initSuggestionsSystem() {
  // Initialize all 12 symbols
  var supportedSymbols = DEFAULT_SYMBOLS.map(function(base) {
    return base + 'USDT';
  });
  
  supportedSymbols.forEach(function(symbol) {
    STATE.suggestions.symbols[symbol] = {
      symbol: symbol,
      signal: null,
      lastUpdate: null,
      isActive: false,
      updateTimer: null
    };
  });
  
  // Initial render
  renderSuggestionsCards();
  
  // Start auto-update
  if (STATE.suggestions.autoUpdateEnabled) {
    startAutoSuggestions();
  }
}

// Update analysis for a single symbol independently
function updateSymbolAnalysis(symbol) {
  if (!STATE.suggestions.symbols[symbol]) {
    return;
  }
  
  var symbolData = STATE.suggestions.symbols[symbol];
  
  // Fetch data if needed
  if (!STATE.klines[symbol] || Object.keys(STATE.klines[symbol]).length < TIMEFRAMES.length) {
    fetchAssetData(symbol);
    // analyzeAsset will be called via checkAndAnalyze callback
    return;
  }
  
  // Analyze if we have data
  if (STATE.klines[symbol]) {
    analyzeAsset(symbol);
    
    // Update symbol data
    var signal = STATE.signals[symbol];
    symbolData.signal = signal;
    symbolData.lastUpdate = Date.now();
    symbolData.isActive = signal && signal.confidence >= 4 && signal.type !== 'wait';
    
    // Render this symbol's card
    renderSuggestionCard(symbol);
  }
}

// Render all suggestion cards
function renderSuggestionsCards() {
  var resultsList = document.getElementById('scannerResultsList');
  var resultsContainer = document.getElementById('scannerResults');
  var noSuggestions = document.getElementById('noSuggestionsState');
  
  if (!resultsList || !resultsContainer) {
    return;
  }
  
  // Hide no suggestions
  if (noSuggestions) noSuggestions.style.display = 'none';
  
  // Show results container
  resultsContainer.style.display = 'block';
  
  // Clear existing cards
  resultsList.innerHTML = '';
  
  // Get all symbols sorted: active first, then by confidence, then alphabetically
  var allSymbols = Object.keys(STATE.suggestions.symbols).map(function(symbol) {
    return STATE.suggestions.symbols[symbol];
  });
  
  allSymbols.sort(function(a, b) {
    if (a.isActive && !b.isActive) return -1;
    if (!a.isActive && b.isActive) return 1;
    if (a.signal && b.signal) {
      return (b.signal.confidence || 0) - (a.signal.confidence || 0);
    }
    if (a.signal && !b.signal) return -1;
    if (!a.signal && b.signal) return 1;
    return a.symbol.localeCompare(b.symbol);
  });
  
  // Render each card
  allSymbols.forEach(function(symbolData) {
    var cardHtml = createSuggestionCard(symbolData);
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = cardHtml;
    resultsList.appendChild(tempDiv.firstChild);
  });
}

// Render scanner results (wrapper for renderSuggestionsCards)
function renderScannerResults() {
  if (typeof renderSuggestionsCards === 'function') {
    renderSuggestionsCards();
  } else {
    console.warn('renderSuggestionsCards is not defined');
  }
}

// Make sure it's available globally
if (typeof window !== 'undefined') {
  window.renderScannerResults = renderScannerResults;
}

// Render a single suggestion card
function renderSuggestionCard(symbol) {
  var symbolData = STATE.suggestions.symbols[symbol];
  if (!symbolData) return;
  
  var resultsList = document.getElementById('scannerResultsList');
  if (!resultsList) return;
  
  var existingCard = resultsList.querySelector('[data-symbol="' + symbol + '"]');
  var cardHtml = createSuggestionCard(symbolData);
  
  if (existingCard) {
    // Update existing card
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = cardHtml;
    var newCard = tempDiv.firstChild;
    existingCard.innerHTML = newCard.innerHTML;
    existingCard.className = newCard.className;
    existingCard.setAttribute('style', newCard.getAttribute('style'));
  } else {
    // Add new card (shouldn't happen often, but handle it)
    renderSuggestionsCards();
  }
}

// Create HTML for a suggestion card
function createSuggestionCard(symbolData) {
  var symbol = symbolData.symbol;
  var signal = symbolData.signal;
  var lastUpdate = symbolData.lastUpdate;
  var isActive = symbolData.isActive;
  
  var info = ASSET_INFO[symbol] || COIN_ICON_CACHE[symbol] || {
    name: symbol.replace('USDT', ''),
    symbol: symbol.replace('USDT', '')
  };
  
  var iconHtml = getCoinIconHtml(symbol, 40);
  
  // Format update time
  var updateTimeText = '--:--:--';
  if (lastUpdate) {
    var updateDate = new Date(lastUpdate);
    var hours = String(updateDate.getHours()).padStart(2, '0');
    var minutes = String(updateDate.getMinutes()).padStart(2, '0');
    var seconds = String(updateDate.getSeconds()).padStart(2, '0');
    updateTimeText = hours + ':' + minutes + ':' + seconds;
  }
  
  // Card classes and styles
  var cardClass = 'suggestion-card';
  if (isActive) {
    cardClass += ' suggestion-active';
  } else {
    cardClass += ' suggestion-inactive';
  }
  
  var cardStyle = 'background:var(--card);border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:12px;cursor:pointer;transition:all 0.2s;';
  if (!isActive) {
    cardStyle += 'opacity:0.5;';
  }
  
  // Content HTML
  var contentHtml = '';
  
  if (isActive && signal) {
    // Active state: show signal details
    var signalTypeText = signal.type === 'long' ? 'Long' : 'Short';
    var signalIcon = signal.type === 'long' ? ICONS.trendUp : ICONS.trendDown;
    var signalColor = signal.type === 'long' ? 'var(--teal)' : 'var(--red)';
    var scoreColor = signal.confidence >= 7 ? 'var(--teal)' : (signal.confidence >= 5 ? 'var(--yellow)' : 'var(--text2)');
    
    contentHtml = '<div style="display:flex;align-items:center;gap:12px;font-size:13px;margin-bottom:6px;">' +
      '<span style="display:flex;align-items:center;gap:4px;color:' + signalColor + ';font-weight:600;">' + signalIcon + ' ' + signalTypeText + '</span>' +
      '<span style="color:var(--text2);">•</span>' +
      '<span style="color:' + scoreColor + ';font-weight:600;">امتیاز ' + signal.confidence + '/10</span>' +
    '</div>';
  } else {
    // Inactive state
    var inactiveText = signal && signal.type === 'wait' ? 'در انتظار سیگنال' : (signal ? 'سیگنال ضعیف' : 'در حال بررسی...');
    contentHtml = '<div style="display:flex;align-items:center;gap:12px;font-size:13px;margin-bottom:6px;">' +
      '<span style="color:var(--text3);font-style:italic;">' + inactiveText + '</span>' +
    '</div>';
  }
  
  // Update time display
  var updateTimeHtml = '<div style="font-size:11px;color:var(--text3);margin-top:4px;">آپدیت: ' + updateTimeText + '</div>';
  
  return '<div class="' + cardClass + '" data-symbol="' + symbol + '" onclick="navigateToSuggestionDetails(\'' + symbol + '\')" style="' + cardStyle + '" onmouseover="this.style.borderColor=\'var(--teal)\';this.style.transform=\'translateY(-2px)\';this.style.opacity=\'1\'" onmouseout="this.style.borderColor=\'var(--border)\';this.style.transform=\'none\';' + (!isActive ? 'this.style.opacity=\'0.5\'' : '') + '">' +
    '<div style="display:flex;align-items:center;gap:14px;">' +
      iconHtml +
      '<div style="flex:1;min-width:0;">' +
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">' +
          '<span style="font-size:16px;font-weight:600;color:var(--text1);">' + (info.name || info.symbol) + '</span>' +
          '<span style="font-size:12px;color:var(--text2);">' + symbol + '</span>' +
        '</div>' +
        contentHtml +
        updateTimeHtml +
      '</div>' +
      '<div style="color:var(--text2);">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>' +
      '</div>' +
    '</div>' +
  '</div>';
}

// Start auto-update for all symbols
function startAutoSuggestions() {
  if (STATE.suggestions.updateTimer) {
    clearInterval(STATE.suggestions.updateTimer);
  }
  
  // Update all symbols immediately
  Object.keys(STATE.suggestions.symbols).forEach(function(symbol) {
    updateSymbolAnalysis(symbol);
  });
  
  // Then update each symbol independently every 10 seconds
  STATE.suggestions.updateTimer = setInterval(function() {
    Object.keys(STATE.suggestions.symbols).forEach(function(symbol) {
      updateSymbolAnalysis(symbol);
    });
  }, STATE.suggestions.updateInterval);
  
  STATE.suggestions.autoUpdateEnabled = true;
}

// Stop auto-update
function stopAutoSuggestions() {
  if (STATE.suggestions.updateTimer) {
    clearInterval(STATE.suggestions.updateTimer);
    STATE.suggestions.updateTimer = null;
  }
  STATE.suggestions.autoUpdateEnabled = false;
}

// Navigate to details when clicking a suggestion card
function navigateToSuggestionDetails(symbol) {
  STATE.activeAsset = symbol;
  renderWatchlistTabs();
  
  // Start OrderBook WebSocket for active asset
  startOrderBookWS(symbol);
  
  fetchAssetData(symbol);
  switchView('signal');
  renderAssetPanel(symbol);
}

// Hook into analyzeAsset to update suggestions when analysis completes
// This will be called after analyzeAsset finishes
function onAnalysisComplete(symbol, signal) {
  if (STATE.suggestions.symbols[symbol]) {
    var symbolData = STATE.suggestions.symbols[symbol];
    symbolData.signal = signal;
    symbolData.lastUpdate = Date.now();
    symbolData.isActive = signal && signal.confidence >= 4 && signal.type !== 'wait';
    renderSuggestionCard(symbol);
  }
}

// ==================== Confidence Caps (based on analyst feedback) ====================
function applyConfidenceCaps(rawScore, mainTF, signalType) {
  var maxScore = 10;
  var penalties = 0;
  
  // Get ADX value
  var adxValue = (mainTF && mainTF.adx) ? mainTF.adx.adx : 25;
  
  // Get volume ratio
  var volumeRatio = (mainTF && mainTF.volume) ? mainTF.volume.ratio || 1 : 1;
  
  // Get divergence type
  var divergence = (mainTF && mainTF.rsiDivergence) ? mainTF.rsiDivergence.type : 'none';
  
  // Get market structure
  var structure = (mainTF && mainTF.marketStructure) ? mainTF.marketStructure.structure : 'neutral';
  
  // Check for Break of Structure
  var hasBOS = structure === 'bos_bullish' || structure === 'bos_bearish';
  var bosMatchesSignal = (signalType === 'long' && structure === 'bos_bullish') ||
                         (signalType === 'short' && structure === 'bos_bearish');
  
  // ADX-based score capping - More lenient (only cap very weak trends)
  if (adxValue < 15) {
    maxScore = 7; // Very weak trend - cap at 7 (was 5)
  } else if (adxValue < 20) {
    maxScore = 8; // Weak trend - cap at 8 (was 7)
  }
  // ADX >= 20: no cap (removed the 25 threshold)
  
  // BOS requirement - More lenient (only cap if very weak)
  if (!hasBOS || !bosMatchesSignal) {
    maxScore = Math.min(maxScore, 8); // No BOS = cap at 8 (was 6)
  }
  
  // Volume penalties - Only penalize very low volume (not moderate)
  if (volumeRatio < 0.3) {
    penalties += 2; // Very low volume (was 0.5)
  } else if (volumeRatio < 0.5) {
    penalties += 1; // Low volume (was 0.8)
  }
  // volumeRatio >= 0.5: no penalty (was 0.8)
  
  // Opposing divergence penalty - Keep this (it's dangerous)
  if (signalType === 'short' && divergence === 'bullish') {
    penalties += 2; // Bullish divergence on SHORT = dangerous
  } else if (signalType === 'long' && divergence === 'bearish') {
    penalties += 2; // Bearish divergence on LONG = dangerous
  }
  
  // Calculate final confidence
  var finalScore = Math.max(1, rawScore - penalties);
  finalScore = Math.min(finalScore, maxScore);
  
  return finalScore;
}

// ==================== Advanced Context Helpers (S/R, HTF, Liquidity, BTC) ====================

// Detect swing highs/lows and nearest static support/resistance on current TF
function findNearestSR(klines, price) {
  if (!klines || klines.length < 20 || !price) {
    return {
      nearestSupport: null,
      nearestResistance: null,
      supportStrength: 'unknown',
      resistanceStrength: 'unknown',
      supportDistancePct: null,
      resistanceDistancePct: null
    };
  }

  var swingHighs = [];
  var swingLows = [];
  var len = klines.length;
  var start = Math.max(2, len - 120); // last ~120 candles

  for (var i = start; i < len - 2; i++) {
    var prev = klines[i - 1];
    var cur = klines[i];
    var next = klines[i + 1];
    if (cur.h > prev.h && cur.h > next.h) {
      swingHighs.push(cur.h);
    }
    if (cur.l < prev.l && cur.l < next.l) {
      swingLows.push(cur.l);
    }
  }

  function nearestBelow(arr, p) {
    var best = null;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] < p && (best === null || p - arr[i] < p - best)) {
        best = arr[i];
      }
    }
    return best;
  }

  function nearestAbove(arr, p) {
    var best = null;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > p && (best === null || arr[i] - p < best - p)) {
        best = arr[i];
      }
    }
    return best;
  }

  var support = nearestBelow(swingLows, price);
  var resistance = nearestAbove(swingHighs, price);

  // Simple strength estimate based on number of touches near the level
  function levelStrength(level, arr, p) {
    if (!level) return 'unknown';
    var tolerance = p * 0.003; // ~0.3%
    var touches = 0;
    for (var i = 0; i < arr.length; i++) {
      if (Math.abs(arr[i] - level) <= tolerance) touches++;
    }
    if (touches >= 4) return 'strong';
    if (touches >= 2) return 'medium';
    return 'weak';
  }

  var supportStrength = levelStrength(support, swingLows, price);
  var resistanceStrength = levelStrength(resistance, swingHighs, price);

  return {
    nearestSupport: support,
    nearestResistance: resistance,
    supportStrength: supportStrength,
    resistanceStrength: resistanceStrength,
    supportDistancePct: support ? ((price - support) / price) * 100 : null,
    resistanceDistancePct: resistance ? ((resistance - price) / price) * 100 : null
  };
}

// Summarize higher timeframe (4H/1D) trend and momentum for context
function buildHTFSummary(tfResults, mainSignalType) {
  var res4h = tfResults['4h'];
  var res1d = tfResults['1d'];

  var summary = {
    trend4h: res4h ? res4h.trend || 'neutral' : 'unknown',
    trend1d: res1d ? res1d.trend || 'neutral' : 'unknown',
    rsi4h: res4h ? res4h.rsi : null,
    rsi1d: res1d ? res1d.rsi : null,
    stoch4h: res4h && (res4h.stochRsi || res4h.stochRSI) ? (res4h.stochRsi || res4h.stochRSI) : null,
    stoch1d: res1d && (res1d.stochRsi || res1d.stochRSI) ? (res1d.stochRsi || res1d.stochRSI) : null,
    withHTFTrend: false,
    againstHTFTrend: false
  };

  if (mainSignalType === 'long') {
    summary.withHTFTrend =
      (summary.trend4h === 'bullish' || summary.trend4h === 'up') ||
      (summary.trend1d === 'bullish' || summary.trend1d === 'up');
    summary.againstHTFTrend =
      (summary.trend4h === 'bearish' || summary.trend4h === 'down') &&
      (summary.trend1d === 'bearish' || summary.trend1d === 'down');
  } else if (mainSignalType === 'short') {
    summary.withHTFTrend =
      (summary.trend4h === 'bearish' || summary.trend4h === 'down') ||
      (summary.trend1d === 'bearish' || summary.trend1d === 'down');
    summary.againstHTFTrend =
      (summary.trend4h === 'bullish' || summary.trend4h === 'up') &&
      (summary.trend1d === 'bullish' || summary.trend1d === 'up');
  }

  return summary;
}

// Simple liquidity proxies around entry / SL using volume and S/R proximity
function buildLiquidityContext(mainTF, entry, sl, signalType, srInfo) {
  var volumeRatio = (mainTF && mainTF.volume) ? mainTF.volume.ratio || 1 : 1;
  var entryLiquidityScore = 'normal';
  if (volumeRatio < 0.5) entryLiquidityScore = 'low';
  else if (volumeRatio > 1.5) entryLiquidityScore = 'high';

  var slLiquidityRisk = 'unknown';
  if (sl && srInfo) {
    var refLevel = signalType === 'long' ? srInfo.nearestSupport : srInfo.nearestResistance;
    if (refLevel) {
      var distance = Math.abs(sl - refLevel) / refLevel * 100;
      if (distance < 0.3) slLiquidityRisk = 'high';
      else if (distance < 1) slLiquidityRisk = 'medium';
      else slLiquidityRisk = 'low';
    }
  }

  return {
    volumeRatio: volumeRatio,
    entryLiquidityScore: entryLiquidityScore,
    slLiquidityRisk: slLiquidityRisk
  };
}

// Helper: determine if base asset is fundamentally BTC-dependent (alts vs BTC)
function isBTCDependentBase(base) {
  if (!base) return false;
  var upper = base.toUpperCase();
  if (upper === 'BTC') return false;
  return true;
}

// Compute simple Pearson correlation of 1H returns vs BTCUSDT
function computeBTCCorrelation(symbol) {
  var btcSymbol = 'BTCUSDT';
  if (!STATE.klines || !STATE.klines[symbol] || !STATE.klines[btcSymbol]) return null;
  var symKlines = STATE.klines[symbol]['1h'];
  var btcKlines = STATE.klines[btcSymbol]['1h'];
  if (!symKlines || !btcKlines || symKlines.length < 30 || btcKlines.length < 30) return null;

  var n = Math.min(symKlines.length, btcKlines.length, 80);
  var symCloses = symKlines.slice(-n).map(function(k) { return k.c; });
  var btcCloses = btcKlines.slice(-n).map(function(k) { return k.c; });

  var symReturns = [];
  var btcReturns = [];
  for (var i = 1; i < n; i++) {
    var sr = (symCloses[i] - symCloses[i - 1]) / symCloses[i - 1];
    var br = (btcCloses[i] - btcCloses[i - 1]) / btcCloses[i - 1];
    symReturns.push(sr);
    btcReturns.push(br);
  }

  var m1 = 0, m2 = 0;
  for (var j = 0; j < symReturns.length; j++) {
    m1 += symReturns[j];
    m2 += btcReturns[j];
  }
  m1 /= symReturns.length;
  m2 /= btcReturns.length;

  var num = 0, d1 = 0, d2 = 0;
  for (var k = 0; k < symReturns.length; k++) {
    var a = symReturns[k] - m1;
    var b = btcReturns[k] - m2;
    num += a * b;
    d1 += a * a;
    d2 += b * b;
  }
  if (d1 === 0 || d2 === 0) return null;
  return num / Math.sqrt(d1 * d2);
}

// Build BTC context (correlation + BTC HTF trend) for BTC-dependent symbols only
function buildBTCContext(symbol, tfResults) {
  var base = symbol.replace('USDT', '');
  var isDependent = isBTCDependentBase(base);
  if (!isDependent) {
    return {
      isDependent: false,
      correlation: null,
      label: null,
      btcTrend4h: null,
      btcTrend1d: null
    };
  }

  var corr = computeBTCCorrelation(symbol);

  // Try to infer BTC trend from available klines (independent of existing signal)
  var btcSymbol = 'BTCUSDT';
  var btcTrend4h = null;
  var btcTrend1d = null;
  if (STATE.klines && STATE.klines[btcSymbol]) {
    try {
      var btc4h = STATE.klines[btcSymbol]['4h'];
      var btc1d = STATE.klines[btcSymbol]['1d'];
      if (btc4h && btc4h.length >= 200) {
        var btc4hRes = TradingCore.analyzeTF(btc4h, btc4h[btc4h.length - 1].c);
        btcTrend4h = btc4hRes.trend || null;
      }
      if (btc1d && btc1d.length >= 200) {
        var btc1dRes = TradingCore.analyzeTF(btc1d, btc1d[btc1d.length - 1].c);
        btcTrend1d = btc1dRes.trend || null;
      }
    } catch (e) {
      console.log('BTC trend context error:', e.message);
    }
  }

  var label = null;
  if (typeof corr === 'number') {
    var abs = Math.abs(corr);
    if (abs >= 0.75) label = 'high';
    else if (abs >= 0.5) label = 'medium';
    else if (abs >= 0.3) label = 'low';
    else label = 'weak';
  }

  return {
    isDependent: true,
    correlation: corr,
    label: label,
    btcTrend4h: btcTrend4h,
    btcTrend1d: btcTrend1d
  };
}

// ==================== Analysis ====================
async function analyzeAsset(symbol) {
  var price = STATE.prices[symbol] ? STATE.prices[symbol].price : 0;
  if (!price) return;
  
  var results = {};
  var totalLong = 0, totalShort = 0;
  var weights = { '30m': 1, '1h': 2, '4h': 3, '1d': 4 };
  var tfCount = 0;
  
  TIMEFRAMES.forEach(function(tf) {
    var klines = STATE.klines[symbol][tf];
    if (klines && klines.length >= 30) {
      var analysis = TradingCore.analyzeTF(klines, price);
      results[tf] = analysis;
      tfCount++;
      var w = weights[tf];
      // Fix: use confidence instead of score (score is now synced with confidence in core.js)
      var signalScore = analysis.score || analysis.confidence || 0;
      if (analysis.signal === 'long') totalLong += signalScore * w;
      else if (analysis.signal === 'short') totalShort += signalScore * w;
    }
  });
  
  // Preserve previous counter-signal (for sticky display)
  var prevSignal = STATE.signals && STATE.signals[symbol] ? STATE.signals[symbol] : null;
  var prevCounterSignal = prevSignal && prevSignal.counterSignal ? prevSignal.counterSignal : null;

  var sig = {
    type: 'wait', entry: price, sl: 0, tp1: 0, tp2: 0, leverage: 3,
    confidence: 0, reasons: [], rsi: 50, ema21: price, ema50: price, ema200: price,
    trend: 'neutral', tfAnalysis: results
  };
  
  var mainTF = results['1h'] || results['30m'] || results['4h'];
  if (mainTF) {
    sig.rsi = mainTF.rsi;
    sig.ema21 = mainTF.ema21;
    sig.ema50 = mainTF.ema50;
    sig.ema200 = mainTF.ema200 || price; // EMA 200 for trend filter
    sig.trend = mainTF.trend;
    sig.adx = mainTF.adx;
    sig.macd = null; // محاسبه MACD کمی پایین‌تر انجام می‌شود
    sig.volume = mainTF.volume;
    sig.rsiDivergence = mainTF.rsiDivergence;
    
    // Check for timeframe conflicts (e.g., RSI 30m=69 vs RSI 1D=43)
    if (sig.rsiDivergence && results['1d'] && results['1d'].rsi !== undefined) {
      var currentRSI = sig.rsi || 50;
      var dailyRSI = results['1d'].rsi;
      var rsiDiff = Math.abs(currentRSI - dailyRSI);
      
      if (rsiDiff > 25) {
        if (currentRSI > 65 && dailyRSI < 50) {
          if (!sig.rsiDivergence.timeframeConflict) {
            sig.rsiDivergence.timeframeConflict = {
              type: 'local_overbought_in_downtrend',
              message: 'اشباع خرید محلی (RSI=' + currentRSI.toFixed(1) + ') در روند نزولی بزرگتر (RSI=' + dailyRSI.toFixed(1) + ')',
              currentRSI: currentRSI,
              higherTFRSI: dailyRSI
            };
          }
        } else if (currentRSI < 35 && dailyRSI > 50) {
          if (!sig.rsiDivergence.timeframeConflict) {
            sig.rsiDivergence.timeframeConflict = {
              type: 'local_oversold_in_uptrend',
              message: 'اشباع فروش محلی (RSI=' + currentRSI.toFixed(1) + ') در روند صعودی بزرگتر (RSI=' + dailyRSI.toFixed(1) + ')',
              currentRSI: currentRSI,
              higherTFRSI: dailyRSI
            };
          }
        }
      }
    }
    
    // Add StochRSI (use correct property name from core.js)
    sig.stochRsi = mainTF.stochRsi || mainTF.stochRSI || null;
    // Simple Market Structure approximation based on EMA alignment
    var inferredStructure = 'consolidation';
    if (sig.ema21 && sig.ema50) {
      if (price > sig.ema21 && sig.ema21 > sig.ema50) {
        inferredStructure = 'uptrend';
      } else if (price < sig.ema21 && sig.ema21 < sig.ema50) {
        inferredStructure = 'downtrend';
      }
    }
    sig.marketStructure = mainTF.marketStructure || { structure: inferredStructure };
    sig.structure = sig.marketStructure.structure || 'N/A';
    // برای نسخه فعلی BOS/CHoCH ساده‌سازی می‌شود
    sig.bos = 'ندارد';
    sig.choch = 'ندارد';
    // Bollinger Band position
    if (mainTF.bb) {
      var bbRange = mainTF.bb.upper - mainTF.bb.lower;
      if (bbRange > 0) {
        sig.bbPosition = ((sig.ema21 - mainTF.bb.lower) / bbRange) * 100;
      }
    }
  }

  // If a counter-signal already existed for this symbol, keep it (sticky card)
  if (prevCounterSignal && !sig.counterSignal) {
    sig.counterSignal = prevCounterSignal;
  }

  // --- New Context Blocks: Static S/R, HTF summary, Liquidity, BTC ---
  var currentTFKlines = STATE.klines[symbol] && STATE.klines[symbol]['1h'] ? STATE.klines[symbol]['1h'] : null;
  // Calculate MACD from 1H closes if available
  if (currentTFKlines && TradingCore.calcMACD) {
    try {
      var closesForMacd = currentTFKlines.map(function(k) { return k.c; });
      sig.macd = TradingCore.calcMACD(closesForMacd);
    } catch (e) {
      console.log('MACD calc error for ' + symbol + ': ' + e.message);
    }
  }
  var srInfo = findNearestSR(currentTFKlines || (STATE.klines[symbol] && STATE.klines[symbol]['30m']), price);
  sig.staticSR = srInfo;
  
  // Calculate Chop Index (distance between support and resistance)
  if (srInfo && srInfo.nearestSupport && srInfo.nearestResistance) {
    var supportDist = srInfo.supportDistancePct !== null && srInfo.supportDistancePct !== undefined ? srInfo.supportDistancePct : 999;
    var resistanceDist = srInfo.resistanceDistancePct !== null && srInfo.resistanceDistancePct !== undefined ? srInfo.resistanceDistancePct : 999;
    var totalDistance = supportDist + resistanceDist;
    sig.chopIndex = {
      totalDistance: totalDistance,
      isChoppy: totalDistance < 0.5,
      supportDistance: supportDist,
      resistanceDistance: resistanceDist
    };
  } else {
    sig.chopIndex = {
      totalDistance: null,
      isChoppy: false,
      supportDistance: null,
      resistanceDistance: null
    };
  }
  
  // Calculate Pivot Points, ATR, Volume Profile, Ichimoku if AnalysisEngine is available
  if (typeof AnalysisEngine !== 'undefined' && currentTFKlines && currentTFKlines.length >= 2) {
    try {
      var tempEngine = new AnalysisEngine('binance', symbol.replace('USDT', '/USDT'));
      // Convert klines format for calculations (needs h, l, c, v)
      var ohlcvForCalc = currentTFKlines.map(function(k) {
        return {
          high: k.h || 0,
          low: k.l || 0,
          close: k.c || 0,
          open: k.o || k.c || 0,
          volume: k.v || 0,
          h: k.h || 0,
          l: k.l || 0,
          c: k.c || 0,
          o: k.o || k.c || 0,
          v: k.v || 0
        };
      });
      
      // Pivot Points
      var pivotPoints = tempEngine.calculatePivotPoints(ohlcvForCalc);
      if (pivotPoints) {
        sig.pivotPoints = pivotPoints;
      }
      
      // ATR
      var atr = tempEngine.calculateATR(ohlcvForCalc, 14);
      if (atr && atr.atr > 0) {
        sig.atr = atr;
      }
      
      // Volume Profile (POC)
      var volumeProfile = tempEngine.calculateVolumeProfile(ohlcvForCalc, 50);
      if (volumeProfile) {
        sig.volumeProfile = volumeProfile;
      }
      
      // Ichimoku Cloud
      if (ohlcvForCalc.length >= 52) {
        var ichimoku = tempEngine.calculateIchimoku(ohlcvForCalc);
        if (ichimoku) {
          sig.ichimoku = ichimoku;
        }
      }
      
      // Volume 24h Change
      var volume24hChange = tempEngine.calculateVolume24hChange(ohlcvForCalc, '1h');
      if (volume24hChange) {
        sig.volume24hChange = volume24hChange;
      }
    } catch (e) {
      console.log('Advanced indicators calculation error:', e.message);
    }
  }
  
  // Store new indicators in tfAnalysis for UI display
  if (sig.tfAnalysis && sig.tfAnalysis['1h']) {
    if (sig.atr) sig.tfAnalysis['1h'].atr = sig.atr;
    if (sig.volumeProfile) sig.tfAnalysis['1h'].volumeProfile = sig.volumeProfile;
    if (sig.ichimoku) sig.tfAnalysis['1h'].ichimoku = sig.ichimoku;
    if (sig.volume24hChange) sig.tfAnalysis['1h'].volume24hChange = sig.volume24hChange;
  }

  // Higher timeframe context (4H / 1D) – based on final signal direction (set later)
  // Temporarily assume 'wait', will be refined after type is chosen
  sig.htfSummary = buildHTFSummary(results, sig.type);

  // Liquidity context will be filled after entry / SL are set
  sig.liquidity = {
    volumeRatio: (mainTF && mainTF.volume) ? mainTF.volume.ratio || 1 : 1,
    entryLiquidityScore: 'normal',
    slLiquidityRisk: 'unknown'
  };

  // BTC context (filled after signal direction known)
  sig.btcContext = buildBTCContext(symbol, results);
  
  // شرایط سیگنال - آسان‌تر برای فیوچرز (ریسک بخشی از بازی است)
  var minScore = 3, minDiff = 1.5; // Lower threshold - allow more signals, only filter very bad ones
  
  if (tfCount === 0) {
    sig.reasons = ['در حال دریافت داده...'];
    STATE.signals[symbol] = sig;
    if (symbol === STATE.activeAsset) renderAssetPanel(symbol);
    return;
  }
  
  // Volume and ADX filters - More lenient (only penalize extreme cases)
  var volumeRatio = (mainTF && mainTF.volume) ? mainTF.volume.ratio || 1 : 1;
  var adxValue = (mainTF && mainTF.adx) ? mainTF.adx.adx : 25;
  var volumePenalty = 0;
  var adxPenalty = 0;
  
  // Volume filter: Only penalize very low volume (not moderate)
  if (volumeRatio < 0.3) {
    volumePenalty = 2; // Heavy penalty (was 3, threshold was 0.5)
  } else if (volumeRatio < 0.5) {
    volumePenalty = 0.5; // Light penalty (was 1, threshold was 0.8)
  }
  // volumeRatio >= 0.5: no penalty (was 0.8)
  
  // ADX filter: Only penalize very weak trends
  if (adxValue < 12) {
    adxPenalty = 2; // Heavy penalty - very weak trend (was 3, threshold was 15)
  } else if (adxValue < 15) {
    adxPenalty = 0.5; // Light penalty (was 1, threshold was 20)
  }
  // ADX >= 15: no penalty (was 20)
  
  var atr = TradingCore.calcATR(STATE.klines[symbol]['4h'] || STATE.klines[symbol]['1h'] || [], 14, price);
  if (!isFinite(atr) || atr <= 0) atr = price * 0.015;
  
  var entryCapital = 100; // Default entry capital
  
  // Get EMA50 for trend filter
  var ema50 = (mainTF && mainTF.ema50) ? mainTF.ema50 : price;
  var ema21 = (mainTF && mainTF.ema21) ? mainTF.ema21 : price;
  
  // Check for strong reversal patterns (exception to trend filter)
  var hasStrongReversal = false;
  if (mainTF && mainTF.marketStructure) {
    var structure = mainTF.marketStructure.structure || '';
    hasStrongReversal = structure === 'bos_bullish' || structure === 'bos_bearish' ||
                        mainTF.marketStructure.choch === 'bullish' || mainTF.marketStructure.choch === 'bearish';
  }
  
  // TREND FILTER: More lenient - Only block if very far from EMA50 (not just below/above)
  if (totalLong >= minScore && totalLong > totalShort + minDiff) {
    // Check trend filter for Long - Only block if price is significantly below EMA50
    var distanceBelowEma50 = ((ema50 - price) / ema50) * 100;
    if (price < ema50 && distanceBelowEma50 > 3 && !hasStrongReversal) {
      // Only block if more than 3% below EMA50 (was blocking all below EMA50)
      sig.type = 'wait';
      sig.reasons = ['⚠️ سیگنال Long خیلی پایین‌تر از EMA50 - فاصله: ' + distanceBelowEma50.toFixed(1) + '%'];
      sig.confidence = 0;
      STATE.signals[symbol] = sig;
      if (symbol === STATE.activeAsset) renderAssetPanel(symbol);
      return;
    }
    sig.type = 'long';
    var rawScore = Math.round(totalLong / 3);
    
    // محاسبه swing points برای فیبوناچی
    var currentTFKlines = STATE.klines[symbol]['1h'] || STATE.klines[symbol]['4h'] || [];
    var swingPoints = null;
    if (currentTFKlines && currentTFKlines.length >= 20) {
      var swingHighs = [];
      var swingLows = [];
      var len = currentTFKlines.length;
      var start = Math.max(2, len - 120);
      
      for (var i = start; i < len - 2; i++) {
        var prev = currentTFKlines[i - 1];
        var cur = currentTFKlines[i];
        var next = currentTFKlines[i + 1];
        if (cur.h > prev.h && cur.h > next.h) {
          swingHighs.push(cur.h);
        }
        if (cur.l < prev.l && cur.l < next.l) {
          swingLows.push(cur.l);
        }
      }
      
      if (swingHighs.length > 0 && swingLows.length > 0) {
        var maxHigh = Math.max.apply(Math, swingHighs);
        var minLow = Math.min.apply(Math, swingLows);
        if (maxHigh > minLow) {
          swingPoints = {
            swingHigh: maxHigh,
            swingLow: minLow
          };
          
          // محاسبه و ذخیره Fibonacci levels
          var fibLevels = TradingCore.calcFibonacciLevels(maxHigh, minLow, true);
          if (fibLevels) {
            sig.fibonacciLevels = fibLevels;
          }
        }
      }
    }
    
    var smartEntry = TradingCore.findSmartEntry(
      STATE.klines[symbol]['1h'] || STATE.klines[symbol]['4h'] || [],
      STATE.klines[symbol]['4h'] || null,
      price, 'long', mainTF ? mainTF.ema21 : price, mainTF ? mainTF.ema50 : price,
      atr, entryCapital, swingPoints
    );
    
    sig.entry = smartEntry.entry;
    sig.entryReasons = smartEntry.reasons;
    sig.entryQuality = smartEntry.quality;
    sig.confluenceScore = smartEntry.confluenceScore;
    sig.smartEntries = smartEntry.entries;
    
    // Realistic entry: limit pullback to max 1.5% from current price
    var maxPullback = price * 0.015;
    if (sig.entry < price - maxPullback) {
      sig.entry = price - maxPullback * 0.5; // More realistic entry
      sig.entryReasons = ['ورود نزدیک قیمت فعلی'];
    }
    
    // Adjust SL/TP based on volume - tighter in low volume markets
    var slMultiplier = volumeRatio < 0.5 ? 0.5 : (volumeRatio < 0.8 ? 0.6 : 0.8);
    var tpMultiplier = volumeRatio < 0.5 ? 0.8 : (volumeRatio < 0.8 ? 1.0 : 1.5);
    
    sig.sl = sig.entry - atr * slMultiplier;
    sig.tp1 = sig.entry + atr * tpMultiplier;
    sig.tp2 = sig.entry + atr * tpMultiplier * 1.8;
    sig.leverage = TradingCore.getLeverage(sig.entry, sig.sl);
    
    // Entry validation: if entry is too far below current price (>0.5%), adjust to current price
    if (sig.entry < price * 0.995) {
      var oldEntry = sig.entry;
      sig.entry = price;
      sig.entryReasons.push('⚠️ نقطه ورود به قیمت فعلی تنظیم شد (ورود اصلی: ' + oldEntry.toFixed(2) + ' نیاز به بازگشت داشت)');
      // Recalculate SL/TP based on new entry
      sig.sl = sig.entry - atr * slMultiplier;
      sig.tp1 = sig.entry + atr * tpMultiplier;
      sig.tp2 = sig.entry + atr * tpMultiplier * 1.8;
      sig.leverage = TradingCore.getLeverage(sig.entry, sig.sl);
    }
    
    // Liquidity Grab Zones: بررسی و تنظیم SL
    var liquidityZones = TradingCore.detectLiquidityGrabZones(
      STATE.klines[symbol]['4h'] || [], 
      price
    );
    
    // ذخیره Liquidity Grabs در signal برای استفاده در پرامپت
    if (liquidityZones) {
      sig.liquidityGrabZones = {
        upperZones: liquidityZones.upperZones || [],
        lowerZones: liquidityZones.lowerZones || []
      };
    }
    
    // برای LONG: بررسی wicks پایین (stop hunt برای short positions)
    if (liquidityZones && liquidityZones.lowerZones && liquidityZones.lowerZones.length > 0) {
      var nearLowerZone = liquidityZones.lowerZones.find(function(zone) {
        return Math.abs(zone.price - sig.sl) / sig.sl < 0.005; // 0.5%
      });
      
      if (nearLowerZone) {
        // تنظیم SL به فاصله امن
        var safeDistance = sig.sl * 0.003; // 0.3% از zone
        sig.sl = nearLowerZone.price - safeDistance;
        sig.reasons.push('⚠️ استاپ‌لاس در منطقه Liquidity Grab - تنظیم شد');
        sig.confidence = Math.max(0, sig.confidence - 1);
        // Recalculate TP based on new SL
        var slDistance = sig.entry - sig.sl;
        sig.tp1 = sig.entry + slDistance * (tpMultiplier / slMultiplier);
        sig.tp2 = sig.entry + slDistance * (tpMultiplier / slMultiplier) * 1.8;
        sig.leverage = TradingCore.getLeverage(sig.entry, sig.sl);
      }
    }
    
    // RISK/REWARD FILTER: More lenient - Only block if EMA21 is very close (not just close)
    var distanceToEma21 = ema21 - sig.entry;
    var distanceToTp1 = sig.tp1 - sig.entry;
    if (distanceToEma21 > 0 && distanceToEma21 < distanceToTp1 * 0.3) {
      // EMA21 is very close - blocks the target (was 0.5, now 0.3 - more lenient)
      sig.type = 'wait';
      sig.reasons = ['⚠️ تارگت خیلی نزدیک مقاومت EMA21 - فاصله: ' + distanceToEma21.toFixed(2)];
      sig.confidence = 0;
      STATE.signals[symbol] = sig;
      if (symbol === STATE.activeAsset) renderAssetPanel(symbol);
      return;
    }
    
    TIMEFRAMES.forEach(function(tf) {
      if (results[tf] && results[tf].signal === 'long') sig.reasons.push(tf.toUpperCase() + ' صعودی');
    });
    if (mainTF && mainTF.volume && mainTF.volume.signal === 'strong') sig.reasons.push('حجم بالا');
    if (mainTF && mainTF.rsiDivergence && mainTF.rsiDivergence.type === 'bullish') sig.reasons.push('واگرایی صعودی');
    if (mainTF && mainTF.adx && mainTF.adx.adx >= 25) sig.reasons.push('روند قوی');
    
    // Apply confidence caps based on ADX, BOS, and volume (penalties applied inside)
    sig.confidence = applyConfidenceCaps(rawScore, mainTF, 'long');

    // Refresh HTF & Liquidity context now that entry/SL/type are known
    sig.htfSummary = buildHTFSummary(results, sig.type);
    sig.liquidity = buildLiquidityContext(mainTF, sig.entry, sig.sl, sig.type, srInfo);
    
    // 4. Funding Rate Analysis - for LONG
    try {
      if (typeof AnalysisEngine !== 'undefined') {
        var tempEngine = new AnalysisEngine('binance', symbol);
        await tempEngine.initialize();
        var fundingRate = await tempEngine.fetchFundingRate();
        
        // Funding rate analysis for LONG positions
        var fundingRatePercent = fundingRate.rate * 100; // Convert to percentage
        var dailyFundingRate = fundingRatePercent * 3; // 3 funding periods per day
        
        if (dailyFundingRate < -0.5) {
          // Negative funding rate - longs get paid, good for long positions
          sig.confidence = Math.min(10, sig.confidence + 1);
          sig.reasons.push('✅ نرخ فاندینگ منفی (' + dailyFundingRate.toFixed(2) + '% روزانه) - لانگ‌ها پاداش می‌گیرند');
        } else if (dailyFundingRate > 1.0) {
          // Very high funding rate - longs pay shorts, risky for long positions
          sig.confidence = Math.max(0, sig.confidence - 1);
          sig.reasons.push('⚠️ نرخ فاندینگ بالا (' + dailyFundingRate.toFixed(2) + '% روزانه) - ریسک لانگ');
        }
        
        // Store funding rate data
        sig.fundingRate = {
          rate: fundingRate.rate,
          dailyRate: dailyFundingRate,
          annualizedRate: fundingRate.annualizedRate
        };
      }
    } catch (e) {
      console.warn('Funding rate fetch error:', e.message);
    }
    
    // 5. Open Interest Analysis - for LONG (with change tracking)
    try {
      if (typeof AnalysisEngine !== 'undefined') {
        var tempEngine = new AnalysisEngine('binance', symbol);
        await tempEngine.initialize();
        var openInterest = await tempEngine.fetchOpenInterest();
        
        if (openInterest && openInterest.openInterest > 0) {
          // Store open interest data with change tracking
          var oiValueUSD = openInterest.openInterestValue || 0;
          if (oiValueUSD === 0 && price > 0) {
            oiValueUSD = openInterest.openInterest * price;
          }
          sig.openInterest = {
            value: openInterest.openInterest,
            valueUSD: oiValueUSD,
            timestamp: openInterest.timestamp,
            change: openInterest.change || 0,
            changePercent: openInterest.changePercent || 0,
            changeUSD: openInterest.changeUSD || 0,
            interpretation: openInterest.interpretation || 'neutral'
          };
          
          // Add interpretation to reasons
          if (openInterest.interpretation && openInterest.changePercent) {
            var oiChangeText = openInterest.changePercent >= 0 ? '+' : '';
            oiChangeText += openInterest.changePercent.toFixed(2) + '%';
            
            if (openInterest.interpretation === 'increasing_strong' || openInterest.interpretation === 'increasing') {
              sig.reasons.push('✅ افزایش Open Interest (' + oiChangeText + ') - ورود پول جدید');
            } else if (openInterest.interpretation === 'decreasing_strong' || openInterest.interpretation === 'decreasing') {
              sig.reasons.push('⚠️ کاهش Open Interest (' + oiChangeText + ') - احتمال Short Covering');
            }
          }
        }
      }
    } catch (e) {
      console.warn('Open Interest fetch error:', e.message);
    }
    
    // 5b. Long/Short Ratio Analysis - for LONG
    try {
      if (typeof AnalysisEngine !== 'undefined') {
        var tempEngine = new AnalysisEngine('binance', symbol);
        await tempEngine.initialize();
        var longShortRatio = await tempEngine.fetchLongShortRatio();
        
        if (longShortRatio && longShortRatio.ratio) {
          sig.longShortRatio = {
            ratio: longShortRatio.ratio,
            longAccount: longShortRatio.longAccount,
            shortAccount: longShortRatio.shortAccount,
            sentiment: longShortRatio.sentiment,
            interpretation: longShortRatio.interpretation,
            timestamp: longShortRatio.timestamp
          };
          
          // Add interpretation to reasons (contrarian signal)
          if (longShortRatio.sentiment === 'long_heavy') {
            sig.reasons.push('⚠️ تمایل شدید Retail به لانگ (Ratio: ' + longShortRatio.ratio.toFixed(2) + ') - احتمال حرکت خلاف');
            sig.confidence = Math.max(0, sig.confidence - 0.5);
          } else if (longShortRatio.sentiment === 'short_heavy') {
            sig.reasons.push('✅ تمایل شدید Retail به شورت (Ratio: ' + longShortRatio.ratio.toFixed(2) + ') - پتانسیل Short Squeeze');
            sig.confidence = Math.min(10, sig.confidence + 0.5);
          }
        }
      }
    } catch (e) {
      console.warn('Long/Short Ratio fetch error:', e.message);
    }
    
    // 6. Liquidation Zones Detection (after SL is set) - for LONG
    try {
      if (typeof AnalysisEngine !== 'undefined' && sig.sl && sig.entry) {
        var tempEngine = new AnalysisEngine('binance', symbol);
        await tempEngine.initialize();
        
        // Fetch order book for liquidation detection
        var orderBook = await tempEngine.fetchOrderBook(50);
        if (orderBook && orderBook.bids && orderBook.asks) {
          var liquidationZones = tempEngine.detectLiquidationZones(sig.sl, orderBook, price, 0.5);
          
          if (liquidationZones && liquidationZones.nearLiquidity) {
            sig.liquidationZones = liquidationZones;
            
            // Add warnings to reasons
            if (liquidationZones.warnings && liquidationZones.warnings.length > 0) {
              liquidationZones.warnings.forEach(function(warning) {
                sig.reasons.push(warning.message);
                if (warning.level === 'high') {
                  sig.riskWarning = true;
                  sig.confidence = Math.max(0, sig.confidence - 1);
                }
              });
            }
          }
        }
      }
    } catch (e) {
      console.warn('Liquidation zones detection error:', e.message);
    }
    
    // 7. Risk/Reward Analysis (after entry/SL/TP are set) - for LONG
    try {
      if (typeof AnalysisEngine !== 'undefined' && sig.entry && sig.sl && sig.tp1) {
        var tempEngine = new AnalysisEngine('binance', symbol);
        await tempEngine.initialize();
        
        // Fetch order book and detect walls
        var orderBook = await tempEngine.fetchOrderBook(50);
        if (orderBook && orderBook.bids && orderBook.asks) {
          var walls = tempEngine.detectWalls(orderBook);
          var riskReward = tempEngine.calculateRiskReward(
            sig.entry, 
            sig.sl, 
            sig.tp1, 
            sig.tp2 || null, 
            orderBook, 
            walls, 
            price
          );
          
          if (riskReward) {
            sig.riskReward = riskReward;
            
            // Add warnings to reasons
            if (riskReward.warnings && riskReward.warnings.length > 0) {
              riskReward.warnings.forEach(function(warning) {
                sig.reasons.push(warning.message);
                if (warning.level === 'high') {
                  sig.riskWarning = true;
                }
              });
            }
            
            // Store order book walls for UI display
            sig.orderBookWalls = walls;
          }
        }
      }
    } catch (e) {
      console.warn('Risk/Reward calculation error:', e.message);
    }
    
    // Add warning reasons for display (penalties already applied in applyConfidenceCaps)
    if (volumeRatio < 0.8) sig.reasons.push('⚠️ حجم پایین (' + (volumeRatio * 100).toFixed(0) + '%)');
    if (adxValue < 25) sig.reasons.push('⚠️ ADX پایین (' + adxValue.toFixed(0) + ')');
    
    // Risk checks: Oversold/Overbought conditions
    var rsi = sig.rsi || 50;
    var stochK = (sig.stochRsi && sig.stochRsi.k) || (sig.stochRSI && sig.stochRSI.k) || 50;
    if (rsi > 60 && stochK > 80) {
      sig.confidence = Math.min(sig.confidence, 3);
      sig.reasons.push('⚠️ وضعیت اشباع خرید - ریسک تله گاوی');
      sig.riskWarning = true;
    }
    
    // Risk checks: Short-term trend alignment
    var trend30m = results['30m'] ? (results['30m'].trend || 'neutral') : 'neutral';
    var trend1h = results['1h'] ? (results['1h'].trend || 'neutral') : 'neutral';
    if (trend30m === 'strong_down' || trend1h === 'strong_down' || 
        trend30m === 'down' || trend1h === 'down') {
      sig.confidence = Math.min(sig.confidence, 4);
      sig.reasons.push('⚠️ تناقض با روند کوتاه‌مدت نزولی - احتمال بازگشت قیمت');
      sig.riskWarning = true;
    }
    
    // Risk checks: Liquidity walls (using staticSR as proxy)
    if (srInfo && srInfo.nearestResistance && srInfo.resistanceStrength === 'strong' && 
        srInfo.resistanceDistancePct !== null && srInfo.resistanceDistancePct < 1.0) {
      sig.confidence = Math.min(sig.confidence, 3);
      sig.reasons.push('⚠️ مقاومت قوی در نزدیکی (' + srInfo.resistanceDistancePct.toFixed(1) + '%) - احتمال بازگشت قیمت');
      sig.riskWarning = true;
    }
    
    // VSA Analysis: بررسی Volume Spread Analysis
    var vsa30m = results['30m'] && results['30m'].vsa ? results['30m'].vsa : null;
    var vsa1h = results['1h'] && results['1h'].vsa ? results['1h'].vsa : null;
    
    if (vsa30m || vsa1h) {
      sig.vsa = {
        '30m': vsa30m,
        '1h': vsa1h
      };
      
      // بررسی هشدارها
      if (vsa30m && vsa30m.signal === 'warning') {
        sig.confidence = Math.max(0, sig.confidence - 2);
        if (vsa30m.reasons && vsa30m.reasons.length > 0) {
          sig.reasons.push('⚠️ VSA Warning در 30m: ' + vsa30m.reasons[0]);
        }
        sig.riskWarning = true;
      }
      
      if (vsa1h && vsa1h.signal === 'warning') {
        sig.confidence = Math.max(0, sig.confidence - 1);
        if (vsa1h.reasons && vsa1h.reasons.length > 0) {
          sig.reasons.push('⚠️ VSA Warning در 1h: ' + vsa1h.reasons[0]);
        }
        sig.riskWarning = true;
      }
      
      // بررسی سیگنال‌های مثبت
      if (vsa30m && vsa30m.signal === 'bullish') {
        sig.confidence = Math.min(10, sig.confidence + 1);
        if (vsa30m.reasons && vsa30m.reasons.length > 0) {
          sig.reasons.push('✅ VSA Bullish در 30m: ' + vsa30m.reasons[0]);
        }
      }
      if (vsa1h && vsa1h.signal === 'bullish') {
        sig.confidence = Math.min(10, sig.confidence + 1);
        if (vsa1h.reasons && vsa1h.reasons.length > 0) {
          sig.reasons.push('✅ VSA Bullish در 1h: ' + vsa1h.reasons[0]);
        }
      }
    }
  }
  else if (totalShort >= minScore && totalShort > totalLong + minDiff) {
    // Check trend filter for Short - Only block if very far from EMA50
    var distanceAboveEma50 = ((price - ema50) / ema50) * 100;
    if (price > ema50 && distanceAboveEma50 > 3 && !hasStrongReversal) {
      // Only block if more than 3% above EMA50 (was blocking all above EMA50)
      sig.type = 'wait';
      sig.reasons = ['⚠️ سیگنال Short خیلی بالاتر از EMA50 - فاصله: ' + distanceAboveEma50.toFixed(1) + '%'];
      sig.confidence = 0;
      STATE.signals[symbol] = sig;
      if (symbol === STATE.activeAsset) renderAssetPanel(symbol);
      return;
    }
    
    sig.type = 'short';
    var rawScore = Math.round(totalShort / 3);
    
    // ==================== NEW FILTERS ====================
    // 1. BTC Correlation Filter: Block short signals for altcoins with positive momentum when BTC trend is bullish
    var baseAsset = symbol.replace('USDT', '');
    if (baseAsset !== 'BTC') {
      var btcContext = sig.btcContext || buildBTCContext(symbol, results);
      var btcTrend4h = btcContext.btcTrend4h || null;
      var btcTrend1d = btcContext.btcTrend1d || null;
      var altcoinMomentum = mainTF ? (mainTF.momentum || 'Neutral') : 'Neutral';
      
      // Check if BTC has bullish trend (medium-term)
      var btcBullish = (btcTrend4h === 'up' || btcTrend4h === 'strong_up' || 
                        btcTrend1d === 'up' || btcTrend1d === 'strong_up');
      
      // Check if altcoin has positive momentum
      var altcoinPositiveMomentum = (altcoinMomentum === 'Increasing' || 
                                     (mainTF && mainTF.rsi && mainTF.rsi > 50));
      
      if (btcBullish && altcoinPositiveMomentum) {
        sig.type = 'wait';
        sig.reasons = ['⚠️ فیلتر همبستگی BTC: روند صعودی BTC و مومنتوم مثبت آلت‌کوین - شورت پرریسک است'];
        sig.confidence = 0;
        STATE.signals[symbol] = sig;
        if (symbol === STATE.activeAsset) renderAssetPanel(symbol);
        return;
      }
    }
    
    // 2. Market Structure Confirmation: Only issue short signals when market structure changes from bullish to bearish in 15m
    var klines15m = STATE.klines[symbol] && STATE.klines[symbol]['15m'] ? STATE.klines[symbol]['15m'] : null;
    if (!klines15m && STATE.klines[symbol] && STATE.klines[symbol]['30m']) {
      // Fallback to 30m if 15m not available
      klines15m = STATE.klines[symbol]['30m'];
    }
    
    if (klines15m && klines15m.length >= 50) {
      try {
        // Use AnalysisEngine to detect market structure
        if (typeof AnalysisEngine !== 'undefined') {
          var tempEngine = new AnalysisEngine('binance', symbol);
          await tempEngine.initialize();
          var structureResult = tempEngine.detectMarketStructure(klines15m, '15m');
          
          // Only allow short if structure is bearish or has bearish BOS
          var structureIsBearish = (structureResult.structure === 'bearish' || 
                                    structureResult.change === 'bos_bearish');
          
          if (!structureIsBearish && structureResult.structure !== 'neutral') {
            sig.type = 'wait';
            sig.reasons = ['⚠️ فیلتر ساختار بازار: ساختار بازار در 15 دقیقه هنوز نزولی نشده است'];
            sig.confidence = 0;
            STATE.signals[symbol] = sig;
            if (symbol === STATE.activeAsset) renderAssetPanel(symbol);
            return;
          }
          
          // Store market structure info
          sig.marketStructure15m = structureResult;
        }
      } catch (e) {
        console.warn('Market structure detection error:', e.message);
      }
    }
    
    // 3. OBV (On-Balance Volume) Analysis: Check if price increase is accompanied by buyer strength
    var klines1h = STATE.klines[symbol] && STATE.klines[symbol]['1h'] ? STATE.klines[symbol]['1h'] : null;
    if (klines1h && klines1h.length >= 50) {
      try {
        if (typeof AnalysisEngine !== 'undefined') {
          var tempEngine = new AnalysisEngine('binance', symbol);
          await tempEngine.initialize();
          
          // Convert klines to ohlcv format
          var ohlcvData = klines1h.map(function(k) {
            return {
              timestamp: k.t,
              open: k.o,
              high: k.h,
              low: k.l,
              close: k.c,
              volume: k.v
            };
          });
          
          var obvResult = tempEngine.calculateOBV(ohlcvData);
          
          // If OBV is increasing (buyers accumulating) but we're trying to short, it's risky
          if (obvResult.trend === 'increasing' && obvResult.delta > 0) {
            sig.confidence = Math.max(0, sig.confidence - 2);
            sig.reasons.push('⚠️ OBV در حال افزایش است - قدرت خریداران بالا (ریسک شورت)');
            sig.riskWarning = true;
          } else if (obvResult.trend === 'decreasing' && obvResult.delta < 0) {
            // OBV decreasing supports short signal
            sig.confidence = Math.min(10, sig.confidence + 1);
            sig.reasons.push('✅ OBV در حال کاهش است - قدرت فروشندگان بالا');
          }
          
          // Store OBV data
          sig.obv = {
            value: obvResult.obv,
            trend: obvResult.trend,
            delta: obvResult.delta
          };
        }
      } catch (e) {
        console.warn('OBV calculation error:', e.message);
      }
    }
    
    // 4. Funding Rate Analysis: Check for Long Squeeze potential
    try {
      if (typeof AnalysisEngine !== 'undefined') {
        var tempEngine = new AnalysisEngine('binance', symbol);
        await tempEngine.initialize();
        var fundingRate = await tempEngine.fetchFundingRate();
        
        // Funding rate is typically positive when longs pay shorts
        // Extremely positive funding rate (>0.1% per 8h = >1% daily) indicates potential long squeeze
        var fundingRatePercent = fundingRate.rate * 100; // Convert to percentage
        var dailyFundingRate = fundingRatePercent * 3; // 3 funding periods per day
        
        if (dailyFundingRate > 1.0) {
          // Very high funding rate - long squeeze potential, short is more logical
          sig.confidence = Math.min(10, sig.confidence + 2);
          sig.reasons.push('✅ نرخ فاندینگ بالا (' + dailyFundingRate.toFixed(2) + '% روزانه) - پتانسیل Long Squeeze');
        } else if (dailyFundingRate < -0.5) {
          // Negative funding rate - shorts paying longs, risky to short
          sig.confidence = Math.max(0, sig.confidence - 2);
          sig.reasons.push('⚠️ نرخ فاندینگ منفی (' + dailyFundingRate.toFixed(2) + '% روزانه) - ریسک شورت');
          sig.riskWarning = true;
        }
        
        // Store funding rate data
        sig.fundingRate = {
          rate: fundingRate.rate,
          dailyRate: dailyFundingRate,
          annualizedRate: fundingRate.annualizedRate
        };
      }
    } catch (e) {
      console.warn('Funding rate fetch error:', e.message);
    }
    
    // 5. Open Interest Analysis
    try {
      if (typeof AnalysisEngine !== 'undefined') {
        var tempEngine = new AnalysisEngine('binance', symbol);
        await tempEngine.initialize();
        var openInterest = await tempEngine.fetchOpenInterest();
        
        if (openInterest && openInterest.openInterest > 0) {
          // Store open interest data with change tracking
          var oiValueUSD = openInterest.openInterestValue || 0;
          if (oiValueUSD === 0 && price > 0) {
            oiValueUSD = openInterest.openInterest * price;
          }
          sig.openInterest = {
            value: openInterest.openInterest,
            valueUSD: oiValueUSD,
            timestamp: openInterest.timestamp,
            change: openInterest.change || 0,
            changePercent: openInterest.changePercent || 0,
            changeUSD: openInterest.changeUSD || 0,
            interpretation: openInterest.interpretation || 'neutral'
          };
          
          // Add interpretation to reasons
          if (openInterest.interpretation && openInterest.changePercent) {
            var oiChangeText = openInterest.changePercent >= 0 ? '+' : '';
            oiChangeText += openInterest.changePercent.toFixed(2) + '%';
            
            if (openInterest.interpretation === 'increasing_strong' || openInterest.interpretation === 'increasing') {
              sig.reasons.push('✅ افزایش Open Interest (' + oiChangeText + ') - ورود پول جدید');
            } else if (openInterest.interpretation === 'decreasing_strong' || openInterest.interpretation === 'decreasing') {
              sig.reasons.push('⚠️ کاهش Open Interest (' + oiChangeText + ') - احتمال Short Covering');
            }
          }
        }
      }
    } catch (e) {
      console.warn('Open Interest fetch error:', e.message);
    }
    
    // 5b. Long/Short Ratio Analysis - for SHORT
    try {
      if (typeof AnalysisEngine !== 'undefined') {
        var tempEngine = new AnalysisEngine('binance', symbol);
        await tempEngine.initialize();
        var longShortRatio = await tempEngine.fetchLongShortRatio();
        
        if (longShortRatio && longShortRatio.ratio) {
          sig.longShortRatio = {
            ratio: longShortRatio.ratio,
            longAccount: longShortRatio.longAccount,
            shortAccount: longShortRatio.shortAccount,
            sentiment: longShortRatio.sentiment,
            interpretation: longShortRatio.interpretation,
            timestamp: longShortRatio.timestamp
          };
          
          // Add interpretation to reasons (contrarian signal)
          if (longShortRatio.sentiment === 'short_heavy') {
            sig.reasons.push('⚠️ تمایل شدید Retail به شورت (Ratio: ' + longShortRatio.ratio.toFixed(2) + ') - احتمال حرکت خلاف');
            sig.confidence = Math.max(0, sig.confidence - 0.5);
          } else if (longShortRatio.sentiment === 'long_heavy') {
            sig.reasons.push('✅ تمایل شدید Retail به لانگ (Ratio: ' + longShortRatio.ratio.toFixed(2) + ') - پتانسیل Long Squeeze');
            sig.confidence = Math.min(10, sig.confidence + 0.5);
          }
        }
      }
    } catch (e) {
      console.warn('Long/Short Ratio fetch error:', e.message);
    }
    // ==================== END NEW FILTERS ====================
    
    // محاسبه swing points برای فیبوناچی
    var currentTFKlines = STATE.klines[symbol]['1h'] || STATE.klines[symbol]['4h'] || [];
    var swingPoints = null;
    if (currentTFKlines && currentTFKlines.length >= 20) {
      var swingHighs = [];
      var swingLows = [];
      var len = currentTFKlines.length;
      var start = Math.max(2, len - 120);
      
      for (var i = start; i < len - 2; i++) {
        var prev = currentTFKlines[i - 1];
        var cur = currentTFKlines[i];
        var next = currentTFKlines[i + 1];
        if (cur.h > prev.h && cur.h > next.h) {
          swingHighs.push(cur.h);
        }
        if (cur.l < prev.l && cur.l < next.l) {
          swingLows.push(cur.l);
        }
      }
      
      if (swingHighs.length > 0 && swingLows.length > 0) {
        var maxHigh = Math.max.apply(Math, swingHighs);
        var minLow = Math.min.apply(Math, swingLows);
        if (maxHigh > minLow) {
          swingPoints = {
            swingHigh: maxHigh,
            swingLow: minLow
          };
          
          // محاسبه و ذخیره Fibonacci levels
          var fibLevels = TradingCore.calcFibonacciLevels(maxHigh, minLow, false);
          if (fibLevels) {
            sig.fibonacciLevels = fibLevels;
          }
        }
      }
    }
    
    var smartEntry = TradingCore.findSmartEntry(
      STATE.klines[symbol]['1h'] || STATE.klines[symbol]['4h'] || [],
      STATE.klines[symbol]['4h'] || null,
      price, 'short', mainTF ? mainTF.ema21 : price, mainTF ? mainTF.ema50 : price,
      atr, entryCapital, swingPoints
    );
    
    sig.entry = smartEntry.entry;
    sig.entryReasons = smartEntry.reasons;
    sig.entryQuality = smartEntry.quality;
    sig.confluenceScore = smartEntry.confluenceScore;
    sig.smartEntries = smartEntry.entries;
    
    // Realistic entry: limit pullback to max 1.5% from current price
    var maxPullback = price * 0.015;
    if (sig.entry > price + maxPullback) {
      sig.entry = price + maxPullback * 0.5; // More realistic entry
      sig.entryReasons = ['ورود نزدیک قیمت فعلی'];
    }
    
    // Adjust SL/TP based on volume - tighter in low volume markets
    var slMultiplier = volumeRatio < 0.5 ? 0.5 : (volumeRatio < 0.8 ? 0.6 : 0.8);
    var tpMultiplier = volumeRatio < 0.5 ? 0.8 : (volumeRatio < 0.8 ? 1.0 : 1.5);
    
    sig.sl = sig.entry + atr * slMultiplier;
    sig.tp1 = sig.entry - atr * tpMultiplier;
    sig.tp2 = sig.entry - atr * tpMultiplier * 1.8;
    sig.leverage = TradingCore.getLeverage(sig.entry, sig.sl);
    
    // Entry validation: if entry is too far above current price (>0.5%), adjust to current price
    if (sig.entry > price * 1.005) {
      var oldEntry = sig.entry;
      sig.entry = price;
      sig.entryReasons.push('⚠️ نقطه ورود به قیمت فعلی تنظیم شد (ورود اصلی: ' + oldEntry.toFixed(2) + ' نیاز به بازگشت داشت)');
      // Recalculate SL/TP based on new entry
      sig.sl = sig.entry + atr * slMultiplier;
      sig.tp1 = sig.entry - atr * tpMultiplier;
      sig.tp2 = sig.entry - atr * tpMultiplier * 1.8;
      sig.leverage = TradingCore.getLeverage(sig.entry, sig.sl);
    }
    
    // Liquidity Grab Zones: بررسی و تنظیم SL
    var liquidityZones = TradingCore.detectLiquidityGrabZones(
      STATE.klines[symbol]['4h'] || [], 
      price
    );
    
    // ذخیره Liquidity Grabs در signal برای استفاده در پرامپت
    if (liquidityZones) {
      sig.liquidityGrabZones = {
        upperZones: liquidityZones.upperZones || [],
        lowerZones: liquidityZones.lowerZones || []
      };
    }
    
    // برای SHORT: بررسی wicks بالا (stop hunt برای long positions)
    if (liquidityZones && liquidityZones.upperZones && liquidityZones.upperZones.length > 0) {
      var nearUpperZone = liquidityZones.upperZones.find(function(zone) {
        return Math.abs(zone.price - sig.sl) / sig.sl < 0.005; // 0.5%
      });
      
      if (nearUpperZone) {
        // تنظیم SL به فاصله امن
        var safeDistance = sig.sl * 0.003; // 0.3% از zone
        sig.sl = nearUpperZone.price + safeDistance;
        sig.reasons.push('⚠️ استاپ‌لاس در منطقه Liquidity Grab - تنظیم شد');
        sig.confidence = Math.max(0, sig.confidence - 1);
        // Recalculate TP based on new SL
        var slDistance = sig.sl - sig.entry;
        sig.tp1 = sig.entry - slDistance * (tpMultiplier / slMultiplier);
        sig.tp2 = sig.entry - slDistance * (tpMultiplier / slMultiplier) * 1.8;
        sig.leverage = TradingCore.getLeverage(sig.entry, sig.sl);
      }
    }
    
    // RISK/REWARD FILTER: More lenient - Only block if EMA21 is very close
    var distanceToEma21 = sig.entry - ema21;
    var distanceToTp1 = sig.entry - sig.tp1;
    if (distanceToEma21 > 0 && distanceToEma21 < distanceToTp1 * 0.3) {
      // EMA21 is very close - blocks the target (was 0.5, now 0.3 - more lenient)
      sig.type = 'wait';
      sig.reasons = ['⚠️ تارگت خیلی نزدیک حمایت EMA21 - فاصله: ' + distanceToEma21.toFixed(2)];
      sig.confidence = 0;
      STATE.signals[symbol] = sig;
      if (symbol === STATE.activeAsset) renderAssetPanel(symbol);
      return;
    }
    
    TIMEFRAMES.forEach(function(tf) {
      if (results[tf] && results[tf].signal === 'short') sig.reasons.push(tf.toUpperCase() + ' نزولی');
    });
    if (mainTF && mainTF.volume && mainTF.volume.signal === 'strong') sig.reasons.push('حجم بالا');
    if (mainTF && mainTF.rsiDivergence && mainTF.rsiDivergence.type === 'bearish') sig.reasons.push('واگرایی نزولی');
    if (mainTF && mainTF.adx && mainTF.adx.adx >= 25) sig.reasons.push('روند قوی');
    
    // Apply confidence caps based on ADX, BOS, and volume (penalties applied inside)
    sig.confidence = applyConfidenceCaps(rawScore, mainTF, 'short');

    // Refresh HTF & Liquidity context now that entry/SL/type are known
    sig.htfSummary = buildHTFSummary(results, sig.type);
    sig.liquidity = buildLiquidityContext(mainTF, sig.entry, sig.sl, sig.type, srInfo);
    
    // 6. Liquidation Zones Detection (after SL is set)
    try {
      if (typeof AnalysisEngine !== 'undefined' && sig.sl && sig.entry) {
        var tempEngine = new AnalysisEngine('binance', symbol);
        await tempEngine.initialize();
        
        // Fetch order book for liquidation detection
        var orderBook = await tempEngine.fetchOrderBook(50);
        if (orderBook && orderBook.bids && orderBook.asks) {
          var liquidationZones = tempEngine.detectLiquidationZones(sig.sl, orderBook, price, 0.5);
          
          if (liquidationZones && liquidationZones.nearLiquidity) {
            sig.liquidationZones = liquidationZones;
            
            // Add warnings to reasons
            if (liquidationZones.warnings && liquidationZones.warnings.length > 0) {
              liquidationZones.warnings.forEach(function(warning) {
                sig.reasons.push(warning.message);
                if (warning.level === 'high') {
                  sig.riskWarning = true;
                  sig.confidence = Math.max(0, sig.confidence - 1);
                }
              });
            }
          }
        }
      }
    } catch (e) {
      console.warn('Liquidation zones detection error:', e.message);
    }
    
    // 7. Risk/Reward Analysis (after entry/SL/TP are set)
    try {
      if (typeof AnalysisEngine !== 'undefined' && sig.entry && sig.sl && sig.tp1) {
        var tempEngine = new AnalysisEngine('binance', symbol);
        await tempEngine.initialize();
        
        // Fetch order book and detect walls
        var orderBook = await tempEngine.fetchOrderBook(50);
        if (orderBook && orderBook.bids && orderBook.asks) {
          var walls = tempEngine.detectWalls(orderBook);
          var riskReward = tempEngine.calculateRiskReward(
            sig.entry, 
            sig.sl, 
            sig.tp1, 
            sig.tp2 || null, 
            orderBook, 
            walls, 
            price
          );
          
          if (riskReward) {
            sig.riskReward = riskReward;
            
            // Add warnings to reasons
            if (riskReward.warnings && riskReward.warnings.length > 0) {
              riskReward.warnings.forEach(function(warning) {
                sig.reasons.push(warning.message);
                if (warning.level === 'high') {
                  sig.riskWarning = true;
                }
              });
            }
            
            // Store order book walls for UI display
            sig.orderBookWalls = walls;
          }
        }
      }
    } catch (e) {
      console.warn('Risk/Reward calculation error:', e.message);
    }
    
    // Add warning reasons for display (penalties already applied in applyConfidenceCaps)
    if (volumeRatio < 0.8) sig.reasons.push('⚠️ حجم پایین (' + (volumeRatio * 100).toFixed(0) + '%)');
    if (adxValue < 25) sig.reasons.push('⚠️ ADX پایین (' + adxValue.toFixed(0) + ')');
    
    // Risk checks: Oversold/Overbought conditions
    var rsi = sig.rsi || 50;
    var stochK = (sig.stochRsi && sig.stochRsi.k) || (sig.stochRSI && sig.stochRSI.k) || 50;
    if (rsi < 40 && stochK < 20) {
      sig.confidence = Math.min(sig.confidence, 3);
      sig.reasons.push('⚠️ وضعیت اشباع فروش - ریسک تله خرسی - منتظر بازگشت قیمت باشید');
      sig.riskWarning = true;
    }
    
    // Risk checks: Short-term trend alignment
    var trend30m = results['30m'] ? (results['30m'].trend || 'neutral') : 'neutral';
    var trend1h = results['1h'] ? (results['1h'].trend || 'neutral') : 'neutral';
    if (trend30m === 'strong_up' || trend1h === 'strong_up' || 
        trend30m === 'up' || trend1h === 'up') {
      sig.confidence = Math.min(sig.confidence, 4);
      sig.reasons.push('⚠️ تناقض با روند کوتاه‌مدت صعودی - احتمال بازگشت قیمت');
      sig.riskWarning = true;
    }
    
    // Risk checks: Liquidity walls (using staticSR as proxy)
    if (srInfo && srInfo.nearestSupport && srInfo.supportStrength === 'strong' && 
        srInfo.supportDistancePct !== null && srInfo.supportDistancePct < 1.0) {
      sig.confidence = Math.min(sig.confidence, 3);
      sig.reasons.push('⚠️ دیوار حمایت قوی در نزدیکی (' + srInfo.supportDistancePct.toFixed(1) + '%) - احتمال بازگشت قیمت');
      sig.riskWarning = true;
    }
    
    // VSA Analysis: بررسی Volume Spread Analysis
    var vsa30m = results['30m'] && results['30m'].vsa ? results['30m'].vsa : null;
    var vsa1h = results['1h'] && results['1h'].vsa ? results['1h'].vsa : null;
    
    if (vsa30m || vsa1h) {
      sig.vsa = {
        '30m': vsa30m,
        '1h': vsa1h
      };
      
      // بررسی هشدارها
      if (vsa30m && vsa30m.signal === 'warning') {
        sig.confidence = Math.max(0, sig.confidence - 2);
        if (vsa30m.reasons && vsa30m.reasons.length > 0) {
          sig.reasons.push('⚠️ VSA Warning در 30m: ' + vsa30m.reasons[0]);
        }
        sig.riskWarning = true;
      }
      
      if (vsa1h && vsa1h.signal === 'warning') {
        sig.confidence = Math.max(0, sig.confidence - 1);
        if (vsa1h.reasons && vsa1h.reasons.length > 0) {
          sig.reasons.push('⚠️ VSA Warning در 1h: ' + vsa1h.reasons[0]);
        }
        sig.riskWarning = true;
      }
      
      // بررسی سیگنال‌های مثبت
      if (vsa30m && vsa30m.signal === 'bearish') {
        sig.confidence = Math.min(10, sig.confidence + 1);
        if (vsa30m.reasons && vsa30m.reasons.length > 0) {
          sig.reasons.push('✅ VSA Bearish در 30m: ' + vsa30m.reasons[0]);
        }
      }
      if (vsa1h && vsa1h.signal === 'bearish') {
        sig.confidence = Math.min(10, sig.confidence + 1);
        if (vsa1h.reasons && vsa1h.reasons.length > 0) {
          sig.reasons.push('✅ VSA Bearish در 1h: ' + vsa1h.reasons[0]);
        }
      }
    }
  }
  else {
    if (totalLong === 0 && totalShort === 0) sig.reasons = ['بازار خنثی'];
    else if (Math.abs(totalLong - totalShort) < minDiff) sig.reasons = ['سیگنال‌های متضاد'];
    else sig.reasons = ['قدرت سیگنال کافی نیست'];
  }
  
  sig = applyStrategy(sig);
  
  // Fetch orderBook initially (non-blocking) - WebSocket will take over for active asset
  // This is a fallback for non-active assets or when WebSocket is not available
  (async function() {
    try {
      // Skip if WebSocket is already connected for this symbol (active asset)
      if (ORDERBOOK_WS_CONNECTED && ORDERBOOK_WS_SYMBOL === symbol) {
        return; // WebSocket is handling updates
      }
      
      if (typeof AnalysisEngine !== 'undefined') {
        var engine = new AnalysisEngine('binance', symbol.replace('USDT', '/USDT'));
        var orderBook = await engine.fetchOrderBook(20);
        if (orderBook && orderBook.bids && orderBook.asks) {
          // Detect walls (Support/Resistance walls)
          var walls = engine.detectWalls(orderBook);
          
          // Update signal in STATE (get current signal to preserve any updates)
          if (STATE.signals[symbol]) {
            STATE.signals[symbol].orderBook = {
              bids: orderBook.bids,
              asks: orderBook.asks,
              timestamp: orderBook.timestamp || Date.now()
            };
            STATE.signals[symbol].orderBookWalls = walls;
            
            // Re-check Counter-Targeting if orderBook data is now available
            if ((STATE.signals[symbol].type === 'long' || STATE.signals[symbol].type === 'short') && typeof CounterTargeting !== 'undefined') {
              try {
                var sig = STATE.signals[symbol];
                var price = STATE.prices[symbol] ? STATE.prices[symbol].price : sig.entry || 0;
                
                // Calculate ATR if not available
                var atr = 0;
                if (STATE.klines[symbol] && STATE.klines[symbol]['4h']) {
                  atr = TradingCore.calcATR(STATE.klines[symbol]['4h'], 14, price);
                } else if (STATE.klines[symbol] && STATE.klines[symbol]['1h']) {
                  atr = TradingCore.calcATR(STATE.klines[symbol]['1h'], 14, price);
                }
                if (!isFinite(atr) || atr <= 0) atr = price * 0.015;
                
                // Calculate overallScore
                var overallScore = 100;
                if (typeof ScoringEngine !== 'undefined' && STATE.klines[symbol]) {
                  var scoringEngine = new ScoringEngine();
                  var analysisData = {
                    timeframeResults: sig.tfAnalysis || {},
                    orderBook: {
                      bids: orderBook.bids,
                      asks: orderBook.asks
                    },
                    walls: walls,
                    currentPrice: price
                  };
                  var scoreResult = scoringEngine.calculateOverallScore(analysisData);
                  overallScore = scoreResult.overall || 100;
                }
                
                // Prepare marketData
                var marketData = {
                  currentPrice: price,
                  atr: atr,
                  overallScore: overallScore,
                  results: sig.tfAnalysis || {},
                  orderBook: {
                    bids: orderBook.bids,
                    asks: orderBook.asks
                  },
                  walls: walls
                };
                
                // Check Counter-Targeting based on signal type
                var counterCheck = null;
                var counterSignal = null;
                
                if (sig.type === 'long') {
                  counterCheck = CounterTargeting.checkCounterShort(sig, marketData);
                  if (counterCheck.shouldGenerate && (!sig.counterSignal || sig.counterSignal.type !== 'short')) {
                    counterSignal = CounterTargeting.generateCounterShortSignal(sig, marketData, counterCheck);
                  }
                } else if (sig.type === 'short') {
                  counterCheck = CounterTargeting.checkCounterLong(sig, marketData);
                  if (counterCheck.shouldGenerate && (!sig.counterSignal || sig.counterSignal.type !== 'long')) {
                    counterSignal = CounterTargeting.generateCounterLongSignal(sig, marketData, counterCheck);
                  }
                }
                
                if (counterSignal) {
                  sig.counterSignal = counterSignal;
                  if (!sig.reasons) sig.reasons = [];
                  if (sig.reasons.indexOf('⚠️ سیگنال معکوس در دسترس است') === -1) {
                    sig.reasons.push('⚠️ سیگنال معکوس در دسترس است');
                  }
                  console.log('[Counter-Signal] Generated counter-signal in async orderBook fetch for', symbol);
                  // Force re-render to show counter-signal
                  if (symbol === STATE.activeAsset) {
                    renderAssetPanel(symbol);
                  }
                } else if (sig.counterSignal && ((sig.type === 'long' && sig.counterSignal.type !== 'short') || (sig.type === 'short' && sig.counterSignal.type !== 'long'))) {
                  // Clear counter signal if type doesn't match
                  sig.counterSignal = null;
                }
              } catch (e) {
                console.log('Counter-Targeting re-check error for ' + symbol + ': ' + e.message);
              }
            }
            
            // Re-render if active
            if (symbol === STATE.activeAsset) renderAssetPanel(symbol);
          }
        }
      }
    } catch (e) {
      console.log('Could not fetch orderBook for ' + symbol + ': ' + e.message);
      // Continue without orderBook - it's optional
    }
  })();
  
  // Counter-Targeting: بررسی سیگنال معکوس برای LONG های ضعیف
  if (sig.type === 'long' && typeof CounterTargeting !== 'undefined') {
    try {
      // محاسبه overallScore اگر موجود نیست
      var overallScore = 100; // default
      if (typeof ScoringEngine !== 'undefined') {
        var scoringEngine = new ScoringEngine();
        var analysisData = {
          timeframeResults: results,
          orderBook: sig.orderBook || null,
          walls: sig.orderBookWalls || null,
          currentPrice: price
        };
        var scoreResult = scoringEngine.calculateOverallScore(analysisData);
        overallScore = scoreResult.overall || 100;
      }
      
      // آماده‌سازی داده‌های بازار برای Counter-Targeting
      var marketData = {
        currentPrice: price,
        atr: atr,
        overallScore: overallScore,
        results: results,
        orderBook: sig.orderBook || null,
        walls: sig.orderBookWalls || null
      };
      
      // بررسی شرایط Counter-Targeting
      var counterCheck = CounterTargeting.checkCounterShort(sig, marketData);
      
      if (counterCheck.shouldGenerate) {
        // تولید سیگنال SHORT معکوس
        var counterSignal = CounterTargeting.generateCounterShortSignal(sig, marketData, counterCheck);
        
        // ذخیره به عنوان سیگنال ثانویه (جایگزین سیگنال اصلی نمی‌شود)
        sig.counterSignal = counterSignal;
        console.log('[Counter-Signal] Generated counter-signal for', symbol, counterSignal);
        
        // اضافه کردن یادداشت به دلایل سیگنال اصلی
        if (!sig.reasons) sig.reasons = [];
        if (sig.reasons.indexOf('⚠️ سیگنال معکوس در دسترس است') === -1) {
          sig.reasons.push('⚠️ سیگنال معکوس در دسترس است');
        }
      } else {
        console.log('[Counter-Signal] Conditions not met for', symbol, counterCheck.reason);
        // اگر شرایط برقرار نیست اما قبلاً counterSignal داشتیم و نوع آن درست است، آن را حفظ کن
        if (prevCounterSignal && !sig.counterSignal && prevCounterSignal.type === 'short') {
          sig.counterSignal = prevCounterSignal;
          console.log('[Counter-Signal] Preserving previous counter-signal for', symbol);
        } else if (prevCounterSignal && prevCounterSignal.type !== 'short') {
          // اگر counterSignal قبلی نوع اشتباه دارد، آن را پاک کن
          sig.counterSignal = null;
        }
      }
    } catch (e) {
      console.log('Counter-Targeting check error for ' + symbol + ': ' + e.message);
      // Continue without counter-signal if there's an error
      // اما اگر قبلاً counterSignal داشتیم و نوع آن درست است، آن را حفظ کن
      if (prevCounterSignal && !sig.counterSignal && prevCounterSignal.type === 'short') {
        sig.counterSignal = prevCounterSignal;
        console.log('[Counter-Signal] Preserving previous counter-signal after error for', symbol);
      } else if (prevCounterSignal && prevCounterSignal.type !== 'short') {
        sig.counterSignal = null;
      }
    }
  } else if (sig.type === 'short' && typeof CounterTargeting !== 'undefined') {
    // Counter-Targeting: بررسی سیگنال معکوس برای SHORT های ضعیف
    try {
      // محاسبه overallScore اگر موجود نیست
      var overallScore = 100; // default
      if (typeof ScoringEngine !== 'undefined') {
        var scoringEngine = new ScoringEngine();
        var analysisData = {
          timeframeResults: results,
          orderBook: sig.orderBook || null,
          walls: sig.orderBookWalls || null,
          currentPrice: price
        };
        var scoreResult = scoringEngine.calculateOverallScore(analysisData);
        overallScore = scoreResult.overall || 100;
      }
      
      // آماده‌سازی داده‌های بازار برای Counter-Targeting
      var marketData = {
        currentPrice: price,
        atr: atr,
        overallScore: overallScore,
        results: results,
        orderBook: sig.orderBook || null,
        walls: sig.orderBookWalls || null
      };
      
      // بررسی شرایط Counter-Targeting
      var counterCheck = CounterTargeting.checkCounterLong(sig, marketData);
      
      if (counterCheck.shouldGenerate) {
        // تولید سیگنال LONG معکوس
        var counterSignal = CounterTargeting.generateCounterLongSignal(sig, marketData, counterCheck);
        
        // ذخیره به عنوان سیگنال ثانویه (جایگزین سیگنال اصلی نمی‌شود)
        sig.counterSignal = counterSignal;
        console.log('[Counter-Signal] Generated counter-signal for', symbol, counterSignal);
        
        // اضافه کردن یادداشت به دلایل سیگنال اصلی
        if (!sig.reasons) sig.reasons = [];
        if (sig.reasons.indexOf('⚠️ سیگنال معکوس در دسترس است') === -1) {
          sig.reasons.push('⚠️ سیگنال معکوس در دسترس است');
        }
      } else {
        console.log('[Counter-Signal] Conditions not met for', symbol, counterCheck.reason);
        // اگر شرایط برقرار نیست اما قبلاً counterSignal داشتیم و نوع آن درست است، آن را حفظ کن
        if (prevCounterSignal && !sig.counterSignal && prevCounterSignal.type === 'long') {
          sig.counterSignal = prevCounterSignal;
          console.log('[Counter-Signal] Preserving previous counter-signal for', symbol);
        } else if (prevCounterSignal && prevCounterSignal.type !== 'long') {
          // اگر counterSignal قبلی نوع اشتباه دارد، آن را پاک کن
          sig.counterSignal = null;
        }
      }
    } catch (e) {
      console.log('Counter-Targeting check error for ' + symbol + ': ' + e.message);
      // Continue without counter-signal if there's an error
      // اما اگر قبلاً counterSignal داشتیم و نوع آن درست است، آن را حفظ کن
      if (prevCounterSignal && !sig.counterSignal && prevCounterSignal.type === 'long') {
        sig.counterSignal = prevCounterSignal;
        console.log('[Counter-Signal] Preserving previous counter-signal after error for', symbol);
      } else if (prevCounterSignal && prevCounterSignal.type !== 'long') {
        sig.counterSignal = null;
      }
    }
  } else {
    // اگر سیگنال LONG یا SHORT نیست، counterSignal را پاک کن
    if (prevCounterSignal) {
      sig.counterSignal = null;
    }
  }
  
  STATE.signals[symbol] = sig;
  
  // Debug: Log counterSignal status
  if (sig.counterSignal) {
    console.log('[Counter-Signal] Signal has counterSignal before render:', symbol, sig.counterSignal);
  }
  
  if (symbol === STATE.activeAsset) renderAssetPanel(symbol);
  // Notifications are now handled by checkPositionNotifications() in the data loop
  
  // Notify suggestions system
  onAnalysisComplete(symbol, sig);
}

function applyStrategy(signal) {
  var strategy = STATE.settings.strategy;
  
  // Store original signal info for display
  signal.originalType = signal.type;
  signal.strategyApplied = strategy;
  
  if (signal.type === 'wait') return signal;
  
  // Conservative strategy: requires confidence >= 6 (reduced from 7)
  if (strategy === 'conservative') {
    if (signal.confidence < 6) {
      signal.type = 'wait';
      signal.reasons = ['استراتژی محافظه‌کارانه: قدرت سیگنال ' + signal.confidence + '/10 (نیاز به حداقل 6)'];
      signal.strategyBlocked = true;
    }
  }
  
  // Trend following strategy: requires ADX >= 25
  if (strategy === 'trend_following') {
    var adxValue = signal.adx ? signal.adx.adx : 0;
    if (adxValue < 25) {
      signal.type = 'wait';
      signal.reasons = ['استراتژی روند: قدرت روند ' + adxValue.toFixed(0) + ' (نیاز به حداقل 25)'];
      signal.strategyBlocked = true;
    }
  }
  
  return signal;
}

// ==================== Position Management ====================
function enterPosition(symbol) {
  var signal = STATE.signals[symbol];
  var price = STATE.prices[symbol] ? STATE.prices[symbol].price : 0;
  
  if (!signal || signal.type === 'wait' || !price) {
    showToast('سیگنال معتبر نیست', 'error');
    return;
  }
  
  // استفاده از اهرم دستی اگر تنظیم شده، در غیر این صورت اهرم محاسبه‌شده
  var useLeverage = STATE.settings.leverage === 'auto' ? 
    signal.leverage : 
    parseInt(STATE.settings.leverage);
  
  STATE.positions[symbol] = {
    type: signal.type, entry: price,
    size: 100, // Default position size
    leverage: useLeverage, sl: signal.sl, tp1: signal.tp1, tp2: signal.tp2,
    openTime: Date.now()
  };
  
  // Reset notification state for this position
  NOTIFICATION_STATE[symbol + '_tp1'] = false;
  NOTIFICATION_STATE[symbol + '_tp2'] = false;
  NOTIFICATION_STATE[symbol + '_sl'] = false;
  NOTIFICATION_STATE[symbol + '_tp1_approaching'] = false;
  NOTIFICATION_STATE[symbol + '_sl_approaching'] = false;
  
  saveSettings();
  renderAssetPanel(symbol);
  showToast('پوزیشن ' + signal.type.toUpperCase() + ' با اهرم ' + useLeverage + 'x باز شد', 'success');
}

function closePosition(symbol) {
  if (STATE.positions[symbol]) {
    var pos = STATE.positions[symbol];
    var price = STATE.prices[symbol] ? STATE.prices[symbol].price : pos.entry;
    var pnl = calculatePnL(pos, price);
    delete STATE.positions[symbol];
    
    // Clear notification state for this symbol
    delete NOTIFICATION_STATE[symbol + '_tp1'];
    delete NOTIFICATION_STATE[symbol + '_tp2'];
    delete NOTIFICATION_STATE[symbol + '_sl'];
    delete NOTIFICATION_STATE[symbol + '_tp1_approaching'];
    delete NOTIFICATION_STATE[symbol + '_sl_approaching'];
    
    saveSettings();
    renderAssetPanel(symbol);
    showToast((pnl >= 0 ? 'سود: +' : 'ضرر: ') + pnl.toFixed(2) + '%', pnl >= 0 ? 'success' : 'error');
  }
}

function calculatePnL(position, currentPrice) {
  if (!position || !currentPrice) return 0;
  var diff = currentPrice - position.entry;
  if (position.type === 'short') diff = -diff;
  return (diff / position.entry) * 100 * position.leverage;
}

// ==================== Notifications ====================
var NOTIFICATION_STATE = {}; // Track last notification sent for each symbol/type

function checkPositionNotifications(symbol) {
  if (!STATE.settings.notificationEnabled) return;
  
  var position = STATE.positions[symbol];
  if (!position) return;
  
  var price = STATE.prices[symbol];
  if (!price || !price.price) return;
  
  var currentPrice = price.price;
  var entry = position.entry;
  var sl = position.sl;
  var tp1 = position.tp1;
  var tp2 = position.tp2;
  
  if (position.type === 'long') {
    // Check TP hit
    if (currentPrice >= tp1 && !NOTIFICATION_STATE[symbol + '_tp1']) {
      sendPositionNotification(symbol, 'tp_hit', tp1);
      NOTIFICATION_STATE[symbol + '_tp1'] = true;
    }
    if (currentPrice >= tp2 && !NOTIFICATION_STATE[symbol + '_tp2']) {
      sendPositionNotification(symbol, 'tp_hit', tp2);
      NOTIFICATION_STATE[symbol + '_tp2'] = true;
    }
    
    // Check SL hit
    if (currentPrice <= sl && !NOTIFICATION_STATE[symbol + '_sl']) {
      sendPositionNotification(symbol, 'sl_hit', sl);
      NOTIFICATION_STATE[symbol + '_sl'] = true;
    }
    
    // Check approaching TP (50% distance)
    var tp1Distance = tp1 - entry;
    var tp1Halfway = entry + tp1Distance * 0.5;
    if (currentPrice >= tp1Halfway && !NOTIFICATION_STATE[symbol + '_tp1_approaching']) {
      sendPositionNotification(symbol, 'tp_approaching', tp1);
      NOTIFICATION_STATE[symbol + '_tp1_approaching'] = true;
    }
    
    // Check approaching SL (50% distance)
    var slDistance = entry - sl;
    var slHalfway = entry - slDistance * 0.5;
    if (currentPrice <= slHalfway && !NOTIFICATION_STATE[symbol + '_sl_approaching']) {
      sendPositionNotification(symbol, 'sl_approaching', sl);
      NOTIFICATION_STATE[symbol + '_sl_approaching'] = true;
    }
  } else {
    // SHORT position
    // Check TP hit
    if (currentPrice <= tp1 && !NOTIFICATION_STATE[symbol + '_tp1']) {
      sendPositionNotification(symbol, 'tp_hit', tp1);
      NOTIFICATION_STATE[symbol + '_tp1'] = true;
    }
    if (currentPrice <= tp2 && !NOTIFICATION_STATE[symbol + '_tp2']) {
      sendPositionNotification(symbol, 'tp_hit', tp2);
      NOTIFICATION_STATE[symbol + '_tp2'] = true;
    }
    
    // Check SL hit
    if (currentPrice >= sl && !NOTIFICATION_STATE[symbol + '_sl']) {
      sendPositionNotification(symbol, 'sl_hit', sl);
      NOTIFICATION_STATE[symbol + '_sl'] = true;
    }
    
    // Check approaching TP (50% distance)
    var tp1Distance = entry - tp1;
    var tp1Halfway = entry - tp1Distance * 0.5;
    if (currentPrice <= tp1Halfway && !NOTIFICATION_STATE[symbol + '_tp1_approaching']) {
      sendPositionNotification(symbol, 'tp_approaching', tp1);
      NOTIFICATION_STATE[symbol + '_tp1_approaching'] = true;
    }
    
    // Check approaching SL (50% distance)
    var slDistance = sl - entry;
    var slHalfway = entry + slDistance * 0.5;
    if (currentPrice >= slHalfway && !NOTIFICATION_STATE[symbol + '_sl_approaching']) {
      sendPositionNotification(symbol, 'sl_approaching', sl);
      NOTIFICATION_STATE[symbol + '_sl_approaching'] = true;
    }
  }
}

function sendPositionNotification(symbol, type, targetPrice) {
  if (!('Notification' in window)) return;
  
  var requestPermission = function() {
    if (Notification.permission === 'granted') {
      showPositionNotification(symbol, type, targetPrice);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
          showPositionNotification(symbol, type, targetPrice);
        }
      });
    }
  };
  
  requestPermission();
}

function showPositionNotification(symbol, type, targetPrice) {
  var info = ASSET_INFO[symbol] || { name: symbol.replace('USDT', ''), symbol: symbol.replace('USDT', '') };
  var title = '';
  var body = '';
  
  switch(type) {
    case 'tp_approaching':
      title = '🔔 signight: ' + info.name + ' در حال نزدیک شدن به تارگت سود شماست.';
      body = 'قیمت فعلی: ' + formatPrice(STATE.prices[symbol].price) + '\nتارگت: ' + formatPrice(targetPrice);
      break;
    case 'sl_approaching':
      title = 'signight: ' + info.name + ' به حد ضرر (Stop Loss) شما نزدیک شده است!';
      body = 'قیمت فعلی: ' + formatPrice(STATE.prices[symbol].price) + '\nحد ضرر: ' + formatPrice(targetPrice);
      break;
    case 'tp_hit':
      title = 'signight: پوزیشن ' + info.name + ' با موفقیت به حد سود رسید.';
      body = 'قیمت: ' + formatPrice(targetPrice);
      break;
    case 'sl_hit':
      title = '🛑 signight: پوزیشن ' + info.name + ' با اصابت به حد ضرر بسته شد.';
      body = 'قیمت: ' + formatPrice(targetPrice);
      break;
  }
  
  new Notification(title, {
    body: body,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    vibrate: [200, 100, 200],
    tag: symbol + '_' + type // Prevent duplicate notifications
  });
}

// ==================== Helpers ====================
function formatPrice(price) {
  if (!price || !isFinite(price)) return '--';
  if (price >= 1000) return price.toLocaleString('en-US', { maximumFractionDigits: 2 });
  if (price >= 1) return price.toFixed(4);
  return price.toFixed(8);
}

function updatePriceDisplay(symbol) {
  // Price is updated in renderAssetPanel
}

function updateLastUpdateTime() {
  var el = document.getElementById('lastUpdate');
  if (!el) return;
  
  var now = new Date();
  var timeStr = now.toLocaleTimeString('fa-IR');
  
  // Detect current price source for active asset
  var sourceLabel = '';
  var active = STATE.activeAsset;
  if (active && STATE.prices[active]) {
    var src = STATE.prices[active].source || '';
    if (src === 'binance_ws') {
      sourceLabel = 'Binance (Realtime)';
    } else if (src === 'binance') {
      sourceLabel = 'Binance (REST)';
    } else if (src === 'coinmarketcap') {
      sourceLabel = 'CoinMarketCap';
    } else if (src === 'coingecko') {
      sourceLabel = 'CoinGecko';
    } else if (src) {
      sourceLabel = src;
    }
    }
    
  // Fallback: show available APIs summary if no active price source
  if (!sourceLabel) {
    sourceLabel = getAPIStatusText() || 'منبع نامشخص';
  }
  
  el.textContent = timeStr + ' • ' + sourceLabel;
}

// Get current API status for display
function getAPIStatusText() {
  var sources = [];
  if (API_STATUS.binance.available) sources.push('Binance');
  if (API_STATUS.coingecko.available) sources.push('CoinGecko');
  if (API_STATUS.cryptocompare.available) sources.push('CryptoCompare');
  return sources.join(', ');
}

function getRsiClass(rsi) {
  if (!rsi) return 'neutral';
  if (rsi <= 30) return 'bullish';
  if (rsi >= 70) return 'bearish';
  return 'neutral';
}

function getTrendClass(trend) {
  if (trend === 'up' || trend === 'strong_up') return 'bullish';
  if (trend === 'down' || trend === 'strong_down') return 'bearish';
  return 'neutral';
}

function getTrendLabel(trend) {
  if (trend === 'up' || trend === 'strong_up') return 'صعودی';
  if (trend === 'down' || trend === 'strong_down') return 'نزولی';
  return 'خنثی';
}

// New helper functions for futures indicators
function getStochRSIClass(stochRSI) {
  if (!stochRSI) return 'neutral';
  if (stochRSI.signal === 'oversold' || stochRSI.signal === 'bullish_cross') return 'bullish';
  if (stochRSI.signal === 'overbought' || stochRSI.signal === 'bearish_cross') return 'bearish';
  return 'neutral';
}

function getStructureClass(structure) {
  if (!structure) return 'neutral';
  if (structure.structure === 'uptrend' || structure.structure === 'bos_bullish') return 'bullish';
  if (structure.structure === 'downtrend' || structure.structure === 'bos_bearish') return 'bearish';
  return 'neutral';
}

function getStructureLabel(structure) {
  if (!structure) return '--';
  switch(structure.structure) {
    case 'uptrend': return 'صعودی ↗';
    case 'downtrend': return 'نزولی ↘';
    case 'bos_bullish': return 'شکست صعودی';
    case 'bos_bearish': return 'شکست نزولی';
    case 'consolidation': return 'تثبیت';
    default: return 'نامشخص';
  }
}

function getStrategyName(strategy) {
  switch(strategy) {
    case 'conservative': return 'محافظه‌کارانه';
    case 'trend_following': return 'پیروی از روند';
    default: return 'پیش‌فرض';
  }
}

function getEffectiveLeverage(signalLeverage) {
  if (STATE.settings.leverage === 'auto') {
    return (signalLeverage || 3) + 'x';
  } else {
    return STATE.settings.leverage + 'x (دستی)';
  }
}

function showToast(message, type) {
  var toast = document.getElementById('toast');
  toast.textContent = message;
  var className = 'toast show';
  if (type === 'error') className += ' error';
  else if (type === 'warning') className += ' warning';
  toast.className = className;
  setTimeout(function() { toast.classList.remove('show'); }, 3000);
}

// ==================== View Tab Functions ====================
var currentView = 'signal';
var chartTF = '1h';

function initViewTabs() {
  document.querySelectorAll('.view-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      var view = this.dataset.view;
      switchView(view);
    });
  });
  
  // Chart timeframe buttons
  document.querySelectorAll('.tf-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.tf-btn').forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
      chartTF = this.dataset.tf;
      updateChart();
    });
  });
}

function switchView(view) {
  currentView = view;
  
  // Update tabs
  document.querySelectorAll('.view-tab').forEach(function(t) {
    t.classList.toggle('active', t.dataset.view === view);
  });
  
  // Update content
  document.querySelectorAll('.view-content').forEach(function(c) {
    c.classList.remove('active');
  });
  var viewId = 'view' + capitalizeFirst(view);
  document.getElementById(viewId).classList.add('active');
  
  // Initialize view
  if (view === 'chart') {
    initChart();
  } else if (view === 'scanner') {
    // Always re-render when switching to this tab to ensure DOM is in sync
    // Don't clear tracking - let renderScannerResults handle it properly
    if (typeof renderScannerResults === 'function') {
      renderScannerResults();
    } else {
      // Fallback: use renderSuggestionsCards if renderScannerResults doesn't exist
      if (typeof renderSuggestionsCards === 'function') {
        renderSuggestionsCards();
      }
    }
  }
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ==================== Chart Functions ====================
var chartInitialized = false;

function initChart() {
  if (!chartInitialized) {
    if (Chart.init('priceChart')) {
      chartInitialized = true;
    }
  }
  updateChart();
}

function updateChart() {
  var symbol = STATE.activeAsset;
  var klines = STATE.klines[symbol] ? STATE.klines[symbol][chartTF] : null;
  
  if (!klines || klines.length === 0) {
    console.log('No klines for chart');
    return;
  }
  
  // Update title
  var info = ASSET_INFO[symbol] || { name: symbol };
  document.getElementById('chartTitle').textContent = info.name + ' - ' + chartTF.toUpperCase();
  
  // Calculate indicators
  Chart.calculateIndicators(klines);
  
  // Set data and render
  Chart.setData(klines, {
    ema21: Chart.getViewState ? [] : [],
    ema50: [],
    signals: []
  });
}

function toggleChartIndicator(indicator) {
  Chart.toggleIndicator(indicator);
  
  // Update button state
  var btnId = 'btn' + indicator.toUpperCase();
  if (indicator === 'ema') btnId = 'btnEMA';
  if (indicator === 'bb') btnId = 'btnBB';
  if (indicator === 'volume') btnId = 'btnVolume';
  
  var btn = document.getElementById(btnId);
  if (btn) btn.classList.toggle('active');
}

function resetChartView() {
  Chart.resetView();
}


// ==================== Initialize ====================
// Add tab initialization to DOMContentLoaded
var originalInit = window.onload;
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(initViewTabs, 100);
});


// Make functions global
window.enterPosition = enterPosition;
window.closePosition = closePosition;
window.refreshAnalysis = refreshAnalysis;
window.removeFromWatchlist = removeFromWatchlist;
window.addToWatchlist = addToWatchlist;
window.selectAsset = selectAsset;
window.toggleChartIndicator = toggleChartIndicator;
window.resetChartView = resetChartView;
window.handleAIPromptClick = handleAIPromptClick;
window.navigateToSuggestionDetails = navigateToSuggestionDetails;
window.startAutoSuggestions = startAutoSuggestions;
// Window exports will be added for new suggestions system
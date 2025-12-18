// signight PWA - App v1.0
// Main Application Logic - با آیکن‌های SVG

// ==================== SVG Icons (Lucide Icons) ====================
// https://lucide.dev - Open source icon library
var ICONS = {
  // Status Icons
  excellent: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  good: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
  moderate: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
  risky: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  avoid: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
  
  // Chart & Stats Icons
  trendingUp: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
  checkCircle: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  coins: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="M16 14h1v4"/></svg>',
  alertTriangle: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
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
  gold: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.18l6 3.72v7.2l-6 3.72-6-3.72V7.9l6-3.72z"/></svg>',
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
  }
};

var TIMEFRAMES = ['30m', '1h', '4h', '1d'];

var ASSET_INFO = {};

// ==================== API Configuration ====================
var BINANCE_API = 'https://api.binance.com';
var CMC_API_KEY = '7d3a7b427ee144eabbcdd9c2b78c07ab';
var CMC_API = 'https://pro-api.coinmarketcap.com';
var COINGECKO_API = 'https://api.coingecko.com/api/v3';
var CRYPTOCOMPARE_API = 'https://min-api.cryptocompare.com/data/v2';

// ==================== Realtime Price (Binance WebSocket) ====================
var BINANCE_WS = null;
var BINANCE_WS_CONNECTED = false;
var BINANCE_WS_RECONNECT_TIMEOUT = null;

function startRealtimePrices() {
  // If WebSocket is not supported, skip
  if (typeof WebSocket === 'undefined') return;

  // Avoid multiple connections
  if (BINANCE_WS && (BINANCE_WS.readyState === WebSocket.OPEN || BINANCE_WS.readyState === WebSocket.CONNECTING)) {
    return;
  }

  try {
    // Use all-tickers stream and filter by watchlist on the client
    BINANCE_WS = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

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

// CoinMarketCap ID mapping for icons - Comprehensive list
var CMC_IDS = {
  // Top Coins
  'BTC': 1, 'ETH': 1027, 'USDT': 825, 'BNB': 1839, 'XRP': 52, 'USDC': 3408,
  'ADA': 2010, 'DOGE': 74, 'SOL': 5426, 'TRX': 1958, 'DOT': 6636, 'MATIC': 3890,
  'LTC': 2, 'SHIB': 5994, 'AVAX': 5805, 'LINK': 1975, 'ATOM': 3794, 'XMR': 328,
  'ETC': 1321, 'BCH': 1831, 'XLM': 512, 'ALGO': 4030, 'VET': 3077, 'HBAR': 4642,
  'ICP': 8916, 'FIL': 2280, 'APT': 21794, 'NEAR': 6535, 'QNT': 3155, 'ARB': 11841,
  'OP': 11840, 'MKR': 1518, 'AAVE': 7278, 'GRT': 6719, 'STX': 4847, 'EGLD': 6892,
  'XTZ': 2011, 'THETA': 2416, 'EOS': 1765, 'AXS': 6783, 'SAND': 6210, 'MANA': 1966,
  'NEO': 1376, 'KCS': 2087, 'FLOW': 4558, 'CHZ': 4066, 'XEC': 10791, 'KLAY': 4256,
  'CRV': 6538, 'FTM': 3513, 'LUNC': 4172, 'TUSD': 2563, 'XDC': 2634, 'MINA': 8646,
  'SNX': 2586, 'ENJ': 2130, 'ZEC': 1437, 'DASH': 131, 'BAT': 1697, 'LRC': 1934,
  'ZIL': 2469, 'ONE': 3945, 'WAVES': 1274, 'KSM': 5034, 'HOT': 2682, 'IOTA': 1720,
  'CAKE': 7186, 'RUNE': 4157, 'COMP': 5692, 'GALA': 7080, 'AR': 5632, 'ROSE': 7653,
  'GMT': 18069, 'CELO': 5567, 'ENS': 13855, 'FXS': 6953, 'ANKR': 3783, 'JST': 5488,
  'LDO': 8000, 'IMX': 10603, 'DYDX': 11156, 'INJ': 7226, 'MASK': 8536, 'YFI': 5864,
  'OCEAN': 3911, 'AUDIO': 7455, 'BAND': 4679, 'REN': 2539, 'UMA': 5617, 'SXP': 4279,
  'STORJ': 1772, 'SKL': 5765, 'CELR': 3814, 'COTI': 3992, 'CTSI': 5444, 'DENT': 1886,
  'VTHO': 3012, 'WIN': 4206, 'SUN': 10529, 'TROY': 4293, 'DREP': 4287, 'STMX': 2297,
  'NKN': 2780, 'KEY': 2398, 'DOCK': 2675, 'VITE': 2937, 'OGN': 5117, 'PERL': 4293,
  'IRIS': 3874, 'COS': 4036, 'MBL': 4038, 'ARDR': 1320, 'IOTX': 2777, 'FUN': 1757,
  'LOOM': 2588, 'RLC': 1637, 'LSK': 1214, 'MTL': 1788, 'KNC': 1982, 'REP': 1104,
  'BNT': 1727, 'POWR': 2132, 'DNT': 1856, 'NMR': 1732, 'ANT': 1680, 'GNO': 1659,
  'MLN': 1552, 'CVC': 1816, 'AST': 2058, 'REQ': 2071, 'MITH': 3721, 'STPT': 4006,
  'WRX': 5161, 'HARD': 7576, 'DODO': 7224, 'ALPHA': 7232, 'LINA': 7102, 'PERP': 6950,
  'SUPER': 8290, 'TLM': 8376, 'POND': 7497, 'ALICE': 8766, 'SFP': 8119, 'BETA': 8705,
  'RARE': 11294, 'GHST': 7046, 'AUCTION': 8602, 'PHA': 6841, 'BADGER': 7859, 'OM': 6536,
  'ALCX': 8613, 'C98': 10903, 'CLV': 8384, 'QI': 9288, 'RAD': 6843, 'XVS': 7288,
  'TVK': 8037, 'FORTH': 8873, 'BAKE': 7064, 'BURGER': 7158, 'SLP': 5765, 'TKO': 9020,
  'UNFI': 7672, 'MDX': 8335, 'AGLD': 11568, 'RAY': 8526, 'FIDA': 7978, 'MNGO': 11171,
  'BICO': 9543, 'HIGH': 10993, 'CVX': 9903, 'PEOPLE': 14806, 'SPELL': 11289, 'JOE': 11396,
  'ACH': 6958, 'JASMY': 8425, 'AMP': 6945, 'PLA': 3659, 'DAR': 11374, 'XNO': 1567,
  'MOVR': 9285, 'GLMR': 6836, 'ASTR': 12885, 'API3': 7737, 'WOO': 7501, 'FLUX': 3029,
  'SCRT': 5604, 'T': 2348, 'RNDR': 5690, 'HFT': 22461, 'MAGIC': 14783, 'SSV': 12999,
  'HOOK': 22764, 'EDU': 26111, 'ID': 27843, 'SUI': 20947, 'PEPE': 24478, 'FLOKI': 10804,
  'WLD': 13502, 'SEI': 23149, 'TIA': 22861, 'BLUR': 23121, 'CFX': 7334, 'CYBER': 28871,
  'ARKM': 27712, 'PENDLE': 9481, 'RDNT': 21106, 'MAV': 28727, 'WBT': 21925, 'ORDI': 25028,
  'INJ': 7226, 'TWT': 5964, 'FET': 3773, 'AGIX': 2424, 'RNDR': 5690, 'ROSE': 7653,
  'GMX': 11857, 'LPT': 3640, 'RPL': 2943, 'FLR': 7950, 'CORE': 23254, 'MEME': 28301,
  'PYTH': 28177, 'JTO': 28541, 'BONK': 23095, 'SATS': 28683, 'RATS': 28450, '1000SATS': 28683,
  // Gold/Precious Metals
  'XAUT': 5176, 'PAXG': 4705, 'XAU': 5176,
  // Stablecoins
  'DAI': 4943, 'BUSD': 4687, 'FRAX': 6952, 'USDP': 3330, 'GUSD': 3306, 'LUSD': 9566,
  'FDUSD': 26081, 'PYUSD': 28773, 'EURC': 27003,
  // APE ecosystem
  'APE': 18876,
  // Additional popular coins
  'LUNA': 20314, 'CRO': 3635, 'OKB': 3897, 'LEO': 3957, 'TON': 11419, 'NEXO': 2694,
  'HT': 2502, 'GT': 4269, 'HUSD': 4779, 'CEL': 2700, 'PROM': 4120, 'RSR': 3964,
  'LOOKS': 17081, 'X2Y2': 18106, 'BLUR': 23121, 'DEXE': 7326, '1INCH': 8104,
  'SUSHI': 6758, 'QUICK': 8206, 'VELO': 5765, 'UOS': 4189, 'DPI': 7055, 'YGG': 10688,
  'GODS': 10631, 'ILV': 8719, 'REVV': 6989, 'SPS': 11454, 'GTC': 10052, 'BTRST': 11584,
  'RGT': 7486, 'TRIBE': 9023, 'AERGO': 3637, 'ARPA': 4039, 'BEL': 5765, 'BLZ': 2505,
  'COCOS': 4275, 'CREAM': 6193, 'DATA': 2143, 'DEGO': 7087, 'DIA': 6138, 'FARM': 6859,
  'FOR': 4118, 'FIRO': 1414, 'GAS': 1785, 'GTO': 2289, 'HEGIC': 6929, 'IDEX': 3928,
  'KMD': 1521, 'MFT': 3365, 'MIR': 7857, 'NULS': 2092, 'NXM': 5830, 'ORN': 5765,
  'OXT': 5765, 'POND': 7497, 'REEF': 6951, 'RAMP': 7463, 'SRM': 6187, 'TCT': 2964,
  'TORN': 8049, 'WING': 7048, 'XVG': 693, 'YFII': 5765, 'ZEN': 1698,
  // Additional missing icons
  'LUNC': 4172, 'USTC': 7129, 'WBTC': 3717, 'WETH': 2396, 'STETH': 8085,
  'LEO': 3957, 'OKB': 3897, 'CRO': 3635, 'TUSD': 2563, 'USDP': 3330,
  'WBNB': 7192, 'WMATIC': 18881, 'WSOL': 16116, 'FTT': 4195, 'HNT': 5665,
  'BTT': 16086, 'JST': 5488, 'NFT': 9816, 'BTTC': 16086, 'SAFEMOON': 8757,
  'BUSD': 4687, 'FRAX': 6952, 'GUSD': 3306, 'LUSD': 9566, 'MIM': 9626,
  'OUSD': 7189, 'TRIBE': 9023, 'CVP': 7037, 'CREAM': 6193, 'ALPHA': 7232,
  'PERP': 6950, 'LINA': 7102, 'DODO': 7224, 'HARD': 7576, 'AUTO': 8387,
  'EPS': 8938, 'NBS': 9879, 'POLS': 7208, 'DF': 8074, 'DEGO': 7087,
  'KEEP': 5765, 'NU': 4761, 'BOR': 7289, 'POND': 7497, 'WING': 7048
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
        COIN_ICON_CACHE = JSON.parse(iconCache);
        // Sync ASSET_INFO with cache
        for (var symbol in COIN_ICON_CACHE) {
          ASSET_INFO[symbol] = COIN_ICON_CACHE[symbol];
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
  document.getElementById('capitalInput').value = STATE.settings.capital;
  document.getElementById('riskPercent').value = STATE.settings.riskPercent;
  document.getElementById('strategySelect').value = STATE.settings.strategy;
  document.getElementById('leverageSelect').value = STATE.settings.leverage || 'auto';
  document.getElementById('notificationToggle').checked = STATE.settings.notificationEnabled;
  
  updateEntryAmount();
  renderWatchlistTabs();
  if (STATE.activeAsset) {
    renderAssetPanel(STATE.activeAsset);
  } else {
    renderEmptyWatchlist();
  }
}

function setupEvents() {
  document.getElementById('saveSettings').addEventListener('click', function() {
    STATE.settings.capital = parseFloat(document.getElementById('capitalInput').value) || 1000;
    STATE.settings.riskPercent = parseInt(document.getElementById('riskPercent').value) || 10;
    STATE.settings.strategy = document.getElementById('strategySelect').value;
    STATE.settings.leverage = document.getElementById('leverageSelect').value;
    STATE.settings.notificationEnabled = document.getElementById('notificationToggle').checked;
    saveSettings();
    updateEntryAmount();
    
    // Re-analyze all assets with new strategy
    STATE.watchlist.forEach(function(symbol) {
      if (STATE.klines[symbol]) {
        analyzeAsset(symbol);
      }
    });
    
    var leverageText = STATE.settings.leverage === 'auto' ? 'خودکار' : STATE.settings.leverage + 'x';
    showToast('تنظیمات ذخیره شد - اهرم: ' + leverageText, 'success');
  });
  
  // Leverage change event
  document.getElementById('leverageSelect').addEventListener('change', function() {
    STATE.settings.leverage = this.value;
    saveSettings();
    var leverageText = this.value === 'auto' ? 'خودکار' : this.value + 'x';
    showToast('اهرم تغییر کرد: ' + leverageText, 'info');
    // Update display if asset is active
    if (STATE.activeAsset) {
      renderAssetPanel(STATE.activeAsset);
    }
  });
  
  // Strategy change should immediately re-analyze
  document.getElementById('strategySelect').addEventListener('change', function() {
    STATE.settings.strategy = this.value;
    saveSettings();
    
    // Re-analyze all assets
    STATE.watchlist.forEach(function(symbol) {
      if (STATE.klines[symbol]) {
        analyzeAsset(symbol);
      }
    });
    
    showToast('استراتژی تغییر کرد: ' + getStrategyName(STATE.settings.strategy), 'info');
  });
  
  document.getElementById('capitalInput').addEventListener('input', updateEntryAmount);
  document.getElementById('riskPercent').addEventListener('change', updateEntryAmount);
  
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

function updateEntryAmount() {
  var cap = parseFloat(document.getElementById('capitalInput').value) || 1000;
  var pct = parseInt(document.getElementById('riskPercent').value) || 10;
  document.getElementById('entryAmount').textContent = '$' + (cap * pct / 100).toLocaleString();
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
      (hasError ? '<span style="color:var(--red);font-size:8px;margin-right:4px;width:12px;height:12px;display:inline-flex;align-items:center;justify-content:center;">' + ICONS.alertTriangle.replace('width="24"', 'width="12"').replace('height="24"', 'height="12"') + '</span>' : '');
    
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
      (hasError ? '<span style="color:var(--red);font-size:8px;margin-right:4px;width:12px;height:12px;display:inline-flex;align-items:center;justify-content:center;">' + ICONS.alertTriangle.replace('width="24"', 'width="12"').replace('height="24"', 'height="12"') + '</span>' : '');
    
    tab.addEventListener('click', function() { selectAsset(symbol); });
    container.appendChild(tab);
  }
}

function selectAsset(symbol) {
  STATE.activeAsset = symbol;
  renderWatchlistTabs(); // Update tabs to include temporary tab if needed
  document.querySelectorAll('.tab').forEach(function(t) {
    t.classList.toggle('active', t.dataset.symbol === symbol);
  });
  
  // Switch to signal/details view when clicking on a symbol from watchlist
  switchView('signal');
  
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
  
  // Signal Card
  var signalType = signal ? signal.type : 'wait';
  var signalIcon = signalType === 'long' ? ICONS.trendUp : signalType === 'short' ? ICONS.trendDown : ICONS.clock;
  var signalText = signalType === 'long' ? 'خرید (Long)' : signalType === 'short' ? 'فروش (Short)' : 'صبر کنید';
  
  var signalHtml = '<div class="signal-card ' + signalType + '">' +
    '<div class="signal-header">' +
      '<span class="signal-badge">' + signalIcon + ' ' + signalText + '</span>' +
      '<span class="signal-confidence">قدرت: ' + (signal ? signal.confidence || 0 : 0) + '/10</span>' +
    '</div>' +
    '<div class="signal-reasons">' +
      (signal && signal.reasons ? signal.reasons.slice(0, 4).join(' • ') : 'در حال تحلیل...') +
    '</div>' +
  '</div>';
  
  // Trading Mode Recommendation
  var tradingModeHtml = '';
  if (signal && signal.type !== 'wait' && signal.tradingMode) {
    var tm = signal.tradingMode;
    var modeConfig = {};
    
    if (tm.mode === 'futures') {
      modeConfig = {
        icon: ICONS.rocket,
        text: 'پیشنهاد: فیوچر',
        color: '#3b82f6',
        bg: 'rgba(59, 130, 246, 0.15)',
        border: '#3b82f6'
      };
    } else if (tm.mode === 'spot') {
      modeConfig = {
        icon: ICONS.coin,
        text: 'پیشنهاد: اسپات',
        color: '#10b981',
        bg: 'rgba(16, 185, 129, 0.15)',
        border: '#10b981'
      };
    } else {
      modeConfig = {
        icon: ICONS.layers,
        text: 'پیشنهاد: هر دو (فیوچر و اسپات)',
        color: '#f59e0b',
        bg: 'rgba(245, 158, 11, 0.15)',
        border: '#f59e0b'
      };
    }
    
    tradingModeHtml = '<div class="trading-mode-card" style="background:' + modeConfig.bg + ';border:2px solid ' + modeConfig.border + ';border-radius:12px;padding:12px 16px;margin:16px 0;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">' +
      '<div style="display:flex;align-items:center;gap:10px;">' +
        '<span style="width:24px;height:24px;display:flex;align-items:center;justify-content:center;color:' + modeConfig.color + ';">' + modeConfig.icon + '</span>' +
        '<span style="font-size:15px;font-weight:bold;color:' + modeConfig.color + ';">' + modeConfig.text + '</span>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
        (tm.reasons && tm.reasons.length > 0 ? 
          '<span style="font-size:12px;color:var(--text1);">' + tm.reasons.join(' • ') + '</span>' : 
          '') +
      '</div>' +
    '</div>';
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
    
    // Get smart leverage recommendation
    var smartLev = TradingCore.getSmartLeverage ? 
      TradingCore.getSmartLeverage(signal.entry, signal.sl, signal.atr, STATE.settings.capital, 2) : null;
    
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
        '<div class="detail-row"><span class="detail-label">' + ICONS.dollarSign + ' حجم ورود</span><span class="detail-value">$' + (STATE.settings.capital * STATE.settings.riskPercent / 100).toLocaleString() + '</span></div>' +
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
    
    // Smart Leverage Recommendation
    if (smartLev && smartLev.leverage !== leverageNum) {
      var recColor = smartLev.riskLevel === 'low' ? '#10b981' : smartLev.riskLevel === 'medium' ? '#3b82f6' : smartLev.riskLevel === 'high' ? '#f59e0b' : '#ef4444';
      entryHtml += '<div class="leverage-rec" style="background:var(--bg2);border-radius:8px;padding:10px 12px;margin-top:8px;font-size:12px;">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;">' +
          '<span style="color:var(--text2);">لوریج پیشنهادی:</span>' +
          '<span style="color:' + recColor + ';font-weight:600;">' + smartLev.leverage + 'x (' + smartLev.reason + ')</span>' +
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
  
  var indicatorsHtml = '<div class="indicators-section">' +
    '<div class="indicators-title">' + ICONS.barChart + ' اندیکاتورها</div>' +
    '<div class="ind-grid">' +
      '<div class="ind-item"><span class="ind-label">RSI (14)</span><span class="ind-value ' + getRsiClass(signal ? signal.rsi : 50) + '">' + (signal && signal.rsi ? signal.rsi.toFixed(1) : '--') + '</span></div>' +
      '<div class="ind-item"><span class="ind-label">StochRSI</span><span class="ind-value ' + getStochRSIClass(stochRSI) + '">' + (stochRSI ? stochRSI.k.toFixed(0) + '/' + stochRSI.d.toFixed(0) : '--') + '</span></div>' +
      '<div class="ind-item"><span class="ind-label">روند</span><span class="ind-value ' + getTrendClass(signal ? signal.trend : 'neutral') + '">' + getTrendLabel(signal ? signal.trend : 'neutral') + '</span></div>' +
      '<div class="ind-item"><span class="ind-label">ساختار</span><span class="ind-value ' + getStructureClass(marketStruct) + '">' + getStructureLabel(marketStruct) + '</span></div>' +
      '<div class="ind-item"><span class="ind-label">ADX</span><span class="ind-value">' + (signal && signal.adx ? signal.adx.adx.toFixed(0) : '--') + '</span></div>' +
      '<div class="ind-item"><span class="ind-label">MACD</span><span class="ind-value ' + (signal && signal.macd && signal.macd.histogram > 0 ? 'bullish' : 'bearish') + '">' + (signal && signal.macd ? (signal.macd.histogram > 0 ? 'صعودی' : 'نزولی') : '--') + '</span></div>' +
    '</div>';

  // Advanced Context Row: S/R + HTF + Liquidity + BTC
  // حتی اگر سیگنال روی حالت "صبر" باشد، دیدن این اطلاعات مفید است
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

    // BTC context (only for dependent assets)
    var btcHtml = '';
    if (btcCtx && btcCtx.isDependent) {
      var corrLabel = 'نامشخص';
      if (btcCtx.label === 'high') corrLabel = 'بالا';
      else if (btcCtx.label === 'medium') corrLabel = 'متوسط';
      else if (btcCtx.label === 'low') corrLabel = 'کم';
      else if (btcCtx.label === 'weak') corrLabel = 'خیلی کم';
      btcHtml = '<div class="ind-item"><span class="ind-label">همبستگی BTC</span><span class="ind-value">' + corrLabel + '</span></div>';
    }

    indicatorsHtml +=
      '<div class="ind-advanced" style="margin-top:10px;border-top:1px dashed var(--border);padding-top:8px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;font-size:11px;">' +
        '<div class="ind-item"><span class="ind-label">کیفیت ستاپ</span><span class="ind-value ' + setupClass + '">' + setupQuality + '</span></div>' +
        '<div class="ind-item"><span class="ind-label">حمایت افقی</span><span class="ind-value ' + supportClass + '">' + supportLabel + '</span></div>' +
        '<div class="ind-item"><span class="ind-label">مقاومت افقی</span><span class="ind-value ' + resistanceClass + '">' + resistanceLabel + '</span></div>' +
        '<div class="ind-item"><span class="ind-label">HTF (4H/1D)</span><span class="ind-value">' + trend4h + ' / ' + trend1d + '</span></div>' +
        '<div class="ind-item"><span class="ind-label">Liquidity</span><span class="ind-value">ورود ' + liqScore + ' / ریسک SL ' + slRisk + '</span></div>' +
        (btcHtml || '') +
      '</div>';
  }

  indicatorsHtml += '</div></div>';
  
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
  
  panel.innerHTML = priceHtml + signalHtml + tradingModeHtml + entryHtml + indicatorsHtml + positionHtml + actionsHtml;
  
  // Update sticky AI Advisor section
  updateStickyAIAdvisor(symbol, signal);
}

// Update sticky AI Advisor section at bottom
function updateStickyAIAdvisor(symbol, signal) {
  var stickySection = document.getElementById('aiAdvisorSticky');
  var button = document.getElementById('aiAdvisorButton');
  
  if (!stickySection || !button) return;
  
  if (signal && signal.type !== 'wait') {
    stickySection.style.display = 'block';
    // Update button onclick with current symbol
    button.setAttribute('onclick', 'handleAIPromptClick(\'' + symbol + '\')');
  } else {
    stickySection.style.display = 'none';
  }
}

// ==================== Coin Icon System ====================
// Default fallback icon (app icon)
var DEFAULT_ICON_URL = 'icons/icon-72.png';

// Get icon URL for a symbol
function getCoinIconUrl(symbol) {
  var baseAsset = symbol.replace('USDT', '').toUpperCase();
  var cmcId = CMC_IDS[baseAsset];
  if (cmcId) {
    return 'https://s2.coinmarketcap.com/static/img/coins/64x64/' + cmcId + '.png';
  }
  return null;
}

// Generate icon HTML with fallback to app icon
function getCoinIconHtml(symbol, size) {
  size = size || 24;
  var iconUrl = getCoinIconUrl(symbol);
  
  if (iconUrl) {
    return '<img src="' + iconUrl + '" alt="" style="width:' + size + 'px;height:' + size + 'px;border-radius:50%;object-fit:cover;background:#222;" loading="lazy" decoding="async" onerror="this.src=\'' + DEFAULT_ICON_URL + '\'">';
  }
  return '<img src="' + DEFAULT_ICON_URL + '" alt="" style="width:' + size + 'px;height:' + size + 'px;border-radius:50%;object-fit:cover;">';
}

// Fetch coin info and icon from CoinGecko (for unknown coins)
function fetchCoinIcon(symbol) {
  // Check cache first
  if (COIN_ICON_CACHE[symbol] && COIN_ICON_CACHE[symbol].iconUrl) {
    return Promise.resolve(COIN_ICON_CACHE[symbol]);
  }
  
  var baseAsset = symbol.replace('USDT', '').toUpperCase();
  var cmcId = CMC_IDS[baseAsset];
  
  // If we have CMC ID, use it
  if (cmcId) {
    var info = {
      name: baseAsset,
      symbol: baseAsset,
      iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/' + cmcId + '.png',
      color: '#00E5B0',
      hasIcon: true
    };
    COIN_ICON_CACHE[symbol] = info;
    ASSET_INFO[symbol] = info;
    saveCoinCache();
    return Promise.resolve(info);
  }
  
  // Try CoinGecko for unknown coins
  return fetch('https://api.coingecko.com/api/v3/search?query=' + baseAsset.toLowerCase())
    .then(function(res) {
      if (!res.ok) throw new Error('API error');
      return res.json();
    })
    .then(function(data) {
      if (data.coins && data.coins.length > 0) {
        var coin = data.coins.find(function(c) {
          return c.symbol.toUpperCase() === baseAsset;
        }) || data.coins[0];
        
        if (coin && coin.large) {
          var info = {
            name: coin.name,
            symbol: baseAsset,
            iconUrl: coin.large,
            color: '#00E5B0',
            hasIcon: true
          };
          COIN_ICON_CACHE[symbol] = info;
          ASSET_INFO[symbol] = info;
          saveCoinCache();
          renderWatchlistTabs();
          if (symbol === STATE.activeAsset) renderAssetPanel(symbol);
          return info;
        }
      }
      throw new Error('Not found');
    })
    .catch(function() {
      // Use default icon
      var info = {
        name: baseAsset,
        symbol: baseAsset,
        iconUrl: null,
        color: '#00E5B0',
        hasIcon: false
      };
      COIN_ICON_CACHE[symbol] = info;
      ASSET_INFO[symbol] = info;
      return info;
    });
}

function saveCoinCache() {
  try {
    localStorage.setItem('coinIconCache', JSON.stringify(COIN_ICON_CACHE));
  } catch (e) {}
}

// ==================== Default Symbols List ====================
// Only symbols that actually exist on Binance with USDT pair
// Supported symbols: Only these 12 symbols are supported
var DEFAULT_SYMBOLS = ['BTC', 'ETH', 'XRP', 'BNB', 'SOL', 'TRX', 'DOGE', 'ADA', 'LINK', 'DOT', 'LTC', 'XAU'];

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
  // 2. Symbol is not in watchlist (for scanner), OR
  // 3. Price doesn't exist yet
  if (!BINANCE_WS_CONNECTED || !isInWatchlist || !STATE.prices[symbol] || !STATE.prices[symbol].price) {
  if (API_STATUS.binance.available) {
    fetchPriceFromBinance(symbol, baseAsset);
  } else {
    fetchPriceFromCMC(symbol, baseAsset);
    }
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

// Fetch price from Binance
function fetchPriceFromBinance(symbol, baseAsset) {
  fetch(BINANCE_API + '/api/v3/ticker/24hr?symbol=' + symbol)
    .then(function(res) { 
      if (!res.ok) throw new Error('Symbol not found');
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
        STATE.prices[symbol] = {
          price: price,
          change: isFinite(change) ? change : 0,
          high: parseFloat(data.highPrice) || price,
          low: parseFloat(data.lowPrice) || price,
          volume: parseFloat(data.volume) || 0,
          source: 'binance'
        };
        
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
      // Try alternative sources
      fetchPriceFromCMC(symbol, baseAsset);
    });
}

// Fetch price from CoinMarketCap API
function fetchPriceFromCMC(symbol, baseAsset) {
  // Check if we have recent cached data
  if (CMC_PRICE_CACHE[baseAsset] && (Date.now() - CMC_PRICE_CACHE[baseAsset].timestamp < 60000)) {
    applyPriceFromCMC(symbol, CMC_PRICE_CACHE[baseAsset]);
    return;
  }
  
  // Check if API is exhausted
  if (CMC_API_EXHAUSTED) {
    setErrorPrice(symbol, 'API محدود شده');
    return;
  }
  
  // Try CoinGecko first (no API key needed, CORS friendly)
  fetchPriceFromCoinGecko(symbol, baseAsset)
    .catch(function() {
      // If CoinGecko fails, try CMC via proxy
      return fetchPriceFromCMCProxy(symbol, baseAsset);
    });
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
        
        CMC_PRICE_CACHE[baseAsset] = priceData;
        applyPriceFromCMC(symbol, priceData);
        console.log('Price from CoinGecko for ' + symbol + ':', priceData.price);
        return priceData;
      }
      throw new Error('Coin not found');
    });
}

// Get CoinGecko ID from symbol
function getCoinGeckoId(baseAsset) {
  var mapping = {
    'BTC': 'bitcoin', 'ETH': 'ethereum', 'BNB': 'binancecoin', 'XRP': 'ripple',
    'ADA': 'cardano', 'DOGE': 'dogecoin', 'SOL': 'solana', 'DOT': 'polkadot',
    'MATIC': 'matic-network', 'LTC': 'litecoin', 'SHIB': 'shiba-inu', 'AVAX': 'avalanche-2',
    'LINK': 'chainlink', 'ATOM': 'cosmos', 'XMR': 'monero', 'ETC': 'ethereum-classic',
    'BCH': 'bitcoin-cash', 'XLM': 'stellar', 'ALGO': 'algorand', 'VET': 'vechain',
    'HBAR': 'hedera-hashgraph', 'ICP': 'internet-computer', 'FIL': 'filecoin',
    'APT': 'aptos', 'NEAR': 'near', 'ARB': 'arbitrum', 'OP': 'optimism',
    'MKR': 'maker', 'AAVE': 'aave', 'GRT': 'the-graph', 'STX': 'stacks',
    'XAUT': 'tether-gold', 'PAXG': 'pax-gold', 'XAU': 'tether-gold',
    'TRX': 'tron', 'UNI': 'uniswap', 'SAND': 'the-sandbox', 'MANA': 'decentraland',
    'AXS': 'axie-infinity', 'GALA': 'gala', 'ENJ': 'enjincoin', 'CHZ': 'chiliz',
    'FTM': 'fantom', 'THETA': 'theta-token', 'EOS': 'eos', 'NEO': 'neo',
    'FLOW': 'flow', 'KLAY': 'klay-token', 'CRV': 'curve-dao-token',
    'INJ': 'injective-protocol', 'LDO': 'lido-dao', 'IMX': 'immutable-x',
    'RNDR': 'render-token', 'FET': 'fetch-ai', 'AGIX': 'singularitynet',
    'WLD': 'worldcoin-wld', 'SEI': 'sei-network', 'SUI': 'sui', 'TIA': 'celestia',
    'PEPE': 'pepe', 'BONK': 'bonk', 'FLOKI': 'floki', 'TON': 'the-open-network'
  };
  return mapping[baseAsset.toUpperCase()] || baseAsset.toLowerCase();
}

// CMC via CORS proxy (fallback)
function fetchPriceFromCMCProxy(symbol, baseAsset) {
  // Using allorigins.win as CORS proxy
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

  fetch(BINANCE_API + '/api/v3/klines?symbol=' + symbol + '&interval=' + tf + '&limit=' + limit)
    .then(function(res) { 
      if (!res.ok) throw new Error('Klines not available');
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
      // Try CryptoCompare as fallback
      fetchKlinesFromCryptoCompare(symbol, tf, baseAsset);
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
      fetchKlinesFromCoinGecko(symbol, tf, baseAsset);
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
function fetchKlinesFromCoinGecko(symbol, tf, baseAsset) {
  var geckoId = getCoinGeckoId(baseAsset);
  // برای بک‌تست 6 ماهه: حداقل 180 روز
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

// ==================== Trading Mode Recommendation ====================
function determineTradingMode(signal) {
  // Only analyze valid signals (not 'wait')
  if (!signal || signal.type === 'wait') {
    return { mode: 'both', reasons: ['سیگنال در حال انتظار'] };
  }
  
  var leverage = signal.leverage || 3;
  var adx = signal.adx ? signal.adx.adx : 25;
  var confidence = signal.confidence || 0;
  var entryQuality = signal.entryQuality || 'good';
  
  var futuresScore = 0;
  var spotScore = 0;
  
  // Futures indicators
  if (leverage >= 4) {
    futuresScore += 3;
  } else if (leverage >= 3) {
    futuresScore += 1;
  }
  
  if (adx >= 25 && confidence >= 7) {
    futuresScore += 3;
  } else if (adx >= 25) {
    futuresScore += 2;
  }
  
  if (leverage >= 3 && entryQuality === 'excellent' && confidence >= 6) {
    futuresScore += 2;
  }
  
  if (confidence >= 8) {
    futuresScore += 1;
  }
  
  // Spot indicators
  if (leverage <= 2) {
    spotScore += 3;
  } else if (leverage <= 3) {
    spotScore += 1;
  }
  
  if (adx < 20 && confidence < 6) {
    spotScore += 2;
  }
  
  if (confidence < 5) {
    spotScore += 2;
  }
  
  if (entryQuality === 'fair' && confidence < 6) {
    spotScore += 1;
  }
  
  // Determine mode and build reasons
  var mode;
  var modeReasons = [];
  
  if (futuresScore > spotScore + 2) {
    mode = 'futures';
    if (leverage >= 4) modeReasons.push('اهرم بالا');
    if (adx >= 25 && confidence >= 7) modeReasons.push('روند قوی');
    if (leverage >= 3 && entryQuality === 'excellent') modeReasons.push('ورود عالی');
    if (modeReasons.length === 0) modeReasons.push('مناسب برای فیوچر');
  } else if (spotScore > futuresScore + 2) {
    mode = 'spot';
    if (leverage <= 2) modeReasons.push('اهرم پایین');
    if (adx < 20 && confidence < 6) modeReasons.push('روند ضعیف');
    if (confidence < 5) modeReasons.push('قدرت پایین');
    if (modeReasons.length === 0) modeReasons.push('مناسب برای اسپات');
  } else {
    mode = 'both';
    modeReasons.push('مناسب برای هر دو');
  }
  
  return { mode: mode, reasons: modeReasons };
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

function handleAIPromptClick(symbol) {
  // Use activeAsset if symbol is not provided
  if (!symbol) {
    symbol = STATE.activeAsset;
  }
  
  // Generate prompt
  var prompt = generateAIPrompt(symbol);
  
  if (!prompt) {
    showToast('سیگنال موجود نیست', 'error');
    return;
  }
  
  // Copy to clipboard
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(prompt).then(function() {
      showToast('پرامپت با موفقیت کپی شد', 'success');
    }).catch(function() {
      // Fallback to execCommand
      fallbackCopyToClipboard(prompt);
    });
  } else {
    // Fallback to execCommand
    fallbackCopyToClipboard(prompt);
  }
}

function fallbackCopyToClipboard(text) {
  try {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.left = '-999999px';
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    
    var success = document.execCommand('copy');
    document.body.removeChild(textarea);
    
    if (success) {
      showToast('پرامپت با موفقیت کپی شد', 'success');
    } else {
      showToast('خطا در کپی پرامپت', 'error');
    }
  } catch (err) {
    showToast('خطا در کپی پرامپت', 'error');
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
    symbolData.isActive = signal && signal.confidence >= 6 && signal.type !== 'wait';
    
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
    symbolData.isActive = signal && signal.confidence >= 6 && signal.type !== 'wait';
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
  
  // ADX-based score capping (ranging market = unreliable signals)
  if (adxValue < 20) {
    maxScore = 5; // Ranging market - cap at 5
  } else if (adxValue < 25) {
    maxScore = 7; // Weak trend - cap at 7
  }
  
  // BOS requirement for high scores
  if (!hasBOS || !bosMatchesSignal) {
    maxScore = Math.min(maxScore, 6); // No BOS = cap at 6
  }
  
  // Volume penalties (already applied in core.js but double-check here)
  if (volumeRatio < 0.5) {
    penalties += 2; // Very low volume
  } else if (volumeRatio < 0.8) {
    penalties += 1; // Low volume
  }
  
  // Opposing divergence penalty
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

// Helper: determine if base asset is fundamentally BTC-dependent (alts vs BTC/XAU)
function isBTCDependentBase(base) {
  if (!base) return false;
  var upper = base.toUpperCase();
  if (upper === 'BTC' || upper === 'XAU') return false;
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
function analyzeAsset(symbol) {
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
  
  var sig = {
    type: 'wait', entry: price, sl: 0, tp1: 0, tp2: 0, leverage: 3,
    confidence: 0, reasons: [], rsi: 50, ema21: price, ema50: price,
    trend: 'neutral', tfAnalysis: results
  };
  
  var mainTF = results['1h'] || results['30m'] || results['4h'];
  if (mainTF) {
    sig.rsi = mainTF.rsi;
    sig.ema21 = mainTF.ema21;
    sig.ema50 = mainTF.ema50;
    sig.trend = mainTF.trend;
    sig.adx = mainTF.adx;
    sig.macd = null; // محاسبه MACD کمی پایین‌تر انجام می‌شود
    sig.volume = mainTF.volume;
    sig.rsiDivergence = mainTF.rsiDivergence;
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
  
  // شرایط سیگنال بهینه‌شده - هماهنگ با core.js (minScore=6, diffScore=3)
  // اما در اینجا از مجموع weighted scores استفاده می‌کنیم، پس threshold کمی پایین‌تر
  var minScore = 4, minDiff = 2; // Lower threshold because we sum weighted scores from multiple TFs
  
  if (tfCount === 0) {
    sig.reasons = ['در حال دریافت داده...'];
    STATE.signals[symbol] = sig;
    if (symbol === STATE.activeAsset) renderAssetPanel(symbol);
    return;
  }
  
  // Volume and ADX filters - reduce confidence instead of blocking completely
  var volumeRatio = (mainTF && mainTF.volume) ? mainTF.volume.ratio || 1 : 1;
  var adxValue = (mainTF && mainTF.adx) ? mainTF.adx.adx : 25;
  var volumePenalty = 0;
  var adxPenalty = 0;
  
  // Volume filter: penalize low volume signals
  if (volumeRatio < 0.5) {
    volumePenalty = 3; // Heavy penalty
  } else if (volumeRatio < 0.8) {
    volumePenalty = 1; // Light penalty
  }
  
  // ADX filter: penalize ranging market signals
  if (adxValue < 15) {
    adxPenalty = 3; // Heavy penalty - very weak trend
  } else if (adxValue < 20) {
    adxPenalty = 1; // Light penalty
  }
  
  var atr = TradingCore.calcATR(STATE.klines[symbol]['4h'] || STATE.klines[symbol]['1h'] || [], 14, price);
  if (!isFinite(atr) || atr <= 0) atr = price * 0.015;
  
  var entryCapital = STATE.settings.capital * (STATE.settings.riskPercent / 100);
  
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
  
  // TREND FILTER: Block Long below EMA50, Short above EMA50 (unless strong reversal)
  if (totalLong >= minScore && totalLong > totalShort + minDiff) {
    // Check trend filter for Long
    if (price < ema50 && !hasStrongReversal) {
      sig.type = 'wait';
      sig.reasons = ['⛔ سیگنال Long زیر EMA50 ممنوع - قیمت: ' + price.toFixed(2) + ' < EMA50: ' + ema50.toFixed(2)];
      sig.confidence = 0;
      STATE.signals[symbol] = sig;
      if (symbol === STATE.activeAsset) renderAssetPanel(symbol);
      return;
    }
    sig.type = 'long';
    var rawScore = Math.round(totalLong / 3);
    
    var smartEntry = TradingCore.findSmartEntry(
      STATE.klines[symbol]['1h'] || STATE.klines[symbol]['4h'] || [],
      STATE.klines[symbol]['4h'] || null,
      price, 'long', mainTF ? mainTF.ema21 : price, mainTF ? mainTF.ema50 : price,
      atr, entryCapital
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
    
    // RISK/REWARD FILTER: Check if target is blocked by EMA resistance
    var distanceToEma21 = ema21 - sig.entry;
    var distanceToTp1 = sig.tp1 - sig.entry;
    if (distanceToEma21 > 0 && distanceToEma21 < distanceToTp1 * 0.5) {
      // EMA21 is too close - blocks the target
      sig.type = 'wait';
      sig.reasons = ['⛔ تارگت پشت مقاومت EMA21 - فاصله تا EMA21: ' + distanceToEma21.toFixed(2)];
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
    
    // Add warning reasons for display (penalties already applied in applyConfidenceCaps)
    if (volumeRatio < 0.8) sig.reasons.push('⚠️ حجم پایین (' + (volumeRatio * 100).toFixed(0) + '%)');
    if (adxValue < 25) sig.reasons.push('⚠️ ADX پایین (' + adxValue.toFixed(0) + ')');
  }
  else if (totalShort >= minScore && totalShort > totalLong + minDiff) {
    // Check trend filter for Short
    if (price > ema50 && !hasStrongReversal) {
      sig.type = 'wait';
      sig.reasons = ['⛔ سیگنال Short بالای EMA50 ممنوع - قیمت: ' + price.toFixed(2) + ' > EMA50: ' + ema50.toFixed(2)];
      sig.confidence = 0;
      STATE.signals[symbol] = sig;
      if (symbol === STATE.activeAsset) renderAssetPanel(symbol);
      return;
    }
    
    sig.type = 'short';
    var rawScore = Math.round(totalShort / 3);
    
    var smartEntry = TradingCore.findSmartEntry(
      STATE.klines[symbol]['1h'] || STATE.klines[symbol]['4h'] || [],
      STATE.klines[symbol]['4h'] || null,
      price, 'short', mainTF ? mainTF.ema21 : price, mainTF ? mainTF.ema50 : price,
      atr, entryCapital
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
    
    // RISK/REWARD FILTER: Check if target is blocked by EMA support
    var distanceToEma21 = sig.entry - ema21;
    var distanceToTp1 = sig.entry - sig.tp1;
    if (distanceToEma21 > 0 && distanceToEma21 < distanceToTp1 * 0.5) {
      // EMA21 is too close - blocks the target
      sig.type = 'wait';
      sig.reasons = ['⛔ تارگت پشت حمایت EMA21 - فاصله تا EMA21: ' + distanceToEma21.toFixed(2)];
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
    
    // Add warning reasons for display (penalties already applied in applyConfidenceCaps)
    if (volumeRatio < 0.8) sig.reasons.push('⚠️ حجم پایین (' + (volumeRatio * 100).toFixed(0) + '%)');
    if (adxValue < 25) sig.reasons.push('⚠️ ADX پایین (' + adxValue.toFixed(0) + ')');
  }
  else {
    if (totalLong === 0 && totalShort === 0) sig.reasons = ['بازار خنثی'];
    else if (Math.abs(totalLong - totalShort) < minDiff) sig.reasons = ['سیگنال‌های متضاد'];
    else sig.reasons = ['قدرت سیگنال کافی نیست'];
  }
  
  sig = applyStrategy(sig);
  
  // Determine trading mode recommendation
  var tradingMode = determineTradingMode(sig);
  sig.tradingMode = tradingMode;
  
  STATE.signals[symbol] = sig;
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
  
  // Conservative strategy: requires confidence >= 7
  if (strategy === 'conservative') {
    if (signal.confidence < 7) {
      signal.type = 'wait';
      signal.reasons = ['استراتژی محافظه‌کارانه: قدرت سیگنال ' + signal.confidence + '/10 (نیاز به حداقل 7)'];
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
    size: STATE.settings.capital * STATE.settings.riskPercent / 100,
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
  toast.className = 'toast show' + (type === 'error' ? ' error' : '');
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
    renderScannerResults();
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
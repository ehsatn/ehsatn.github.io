/**
 * Analysis Engine - موتور تحلیلگر حرفه‌ای
 * ES6 Module برای تحلیل بازار با استفاده از ccxt و technicalindicators
 */

// Import technical indicators (will be loaded from CDN)
// Note: These will be available globally when loaded via script tag

// Default symbols configuration - use from window if available, otherwise define
var DEFAULT_SYMBOLS = (typeof window !== 'undefined' && window.DEFAULT_SYMBOLS) || 
                      ['BTC', 'ETH', 'XRP', 'BNB', 'SOL', 'TRX', 'DOGE', 'ADA', 'LINK', 'DOT', 'LTC'];

// Global cache for markets to avoid repeated exchangeInfo calls
var MARKETS_CACHE = {
  data: null,
  timestamp: 0,
  ttl: 5 * 60 * 1000 // 5 minutes cache
};

// Global cache for order books to prevent too many calls
var ORDERBOOK_CACHE = {
  data: {},
  lastErrorLog: {},
  ttl: 30 * 1000 // 30 seconds cache
};

// Global cache for Open Interest history to track changes
var OPEN_INTEREST_HISTORY = {
  data: {}, // { symbol: [{ timestamp, value, valueUSD }, ...] }
  maxHistory: 10 // Keep last 10 readings
};

// AnalysisEngine class definition
class AnalysisEngine {
  constructor(exchangeName = 'binance', symbol = 'BTC/USDT') {
    this.exchangeName = exchangeName;
    this.symbol = symbol;
    this.exchange = null;
    this.timeframes = ['30m', '1h', '4h', '1d'];
    this.timeframeWeights = {
      '30m': 1,
      '1h': 2,
      '4h': 3,
      '1d': 4
    };
    this.marketData = {};
    this.orderBook = null;
    this.marketsLoaded = false;
  }

  /**
   * Get timeframe duration in milliseconds
   */
  getTimeframeMs(timeframe) {
    const multipliers = {
      '1m': 60 * 1000,
      '5m': 5 * 60 * 1000,
      '15m': 15 * 60 * 1000,
      '30m': 30 * 60 * 1000,
      '1h': 60 * 60 * 1000,
      '4h': 4 * 60 * 60 * 1000,
      '1d': 24 * 60 * 60 * 1000
    };
    return multipliers[timeframe] || 60 * 60 * 1000; // Default to 1h
  }

  /**
   * Load markets with caching and retry logic
   */
  async loadMarketsWithCache() {
    // Check cache first
    const now = Date.now();
    if (MARKETS_CACHE.data && (now - MARKETS_CACHE.timestamp) < MARKETS_CACHE.ttl) {
      console.log('[AnalysisEngine] Using cached markets data');
      this.exchange.markets = MARKETS_CACHE.data;
      this.exchange.marketsById = this.exchange.indexBy(MARKETS_CACHE.data, 'id');
      this.exchange.symbols = Object.keys(MARKETS_CACHE.data);
      this.marketsLoaded = true;
      return MARKETS_CACHE.data;
    }

    // Try to load markets with retry logic
    const maxRetries = 2;
    let lastError = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          console.log(`[AnalysisEngine] Retrying loadMarkets (attempt ${attempt + 1}/${maxRetries})...`);
          // Wait before retry (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        }

        // Use Promise.race with timeout
        const markets = await Promise.race([
          this.exchange.loadMarkets(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('RequestTimeout')), 30000) // Increased to 30s
          )
        ]);

        // Cache the result
        MARKETS_CACHE.data = markets;
        MARKETS_CACHE.timestamp = Date.now();
        this.marketsLoaded = true;
        console.log('[AnalysisEngine] Markets loaded and cached successfully');
        return markets;
      } catch (error) {
        lastError = error;
        if (error.message.includes('timeout') || error.message.includes('RequestTimeout')) {
          console.warn(`[AnalysisEngine] LoadMarkets timeout (attempt ${attempt + 1}/${maxRetries})`);
          if (attempt === maxRetries - 1) {
            // Last attempt failed - use cached data if available (even if expired)
            if (MARKETS_CACHE.data) {
              console.warn('[AnalysisEngine] Using expired cache as fallback');
              this.exchange.markets = MARKETS_CACHE.data;
              this.exchange.marketsById = this.exchange.indexBy(MARKETS_CACHE.data, 'id');
              this.exchange.symbols = Object.keys(MARKETS_CACHE.data);
              this.marketsLoaded = true;
              return MARKETS_CACHE.data;
            }
          }
        } else {
          // Non-timeout error - don't retry
          throw error;
        }
      }
    }

    // All retries failed
    if (MARKETS_CACHE.data) {
      console.warn('[AnalysisEngine] All retries failed, using expired cache');
      this.exchange.markets = MARKETS_CACHE.data;
      this.exchange.marketsById = this.exchange.indexBy(MARKETS_CACHE.data, 'id');
      this.exchange.symbols = Object.keys(MARKETS_CACHE.data);
      this.marketsLoaded = true;
      return MARKETS_CACHE.data;
    }

    throw lastError || new Error('Failed to load markets after retries');
  }

  /**
   * Initialize exchange connection
   */
  async initialize() {
    try {
      if (typeof ccxt === 'undefined') {
        throw new Error('ccxt library is not loaded. Please include it from CDN.');
      }

      // Create exchange instance
      const ExchangeClass = ccxt[this.exchangeName];
      if (!ExchangeClass) {
        throw new Error(`Exchange ${this.exchangeName} is not supported by ccxt`);
      }

      this.exchange = new ExchangeClass({
        enableRateLimit: true,
        timeout: 30000, // Increased timeout to 30 seconds for better reliability
        options: {
          defaultType: 'future' // Use Futures, not Spot
        }
      });

      // Load markets with caching and retry
      try {
        await this.loadMarketsWithCache();
      } catch (error) {
        console.warn('[AnalysisEngine] Markets loading failed, continuing without markets:', error.message);
        // Continue without markets - we'll use direct API calls
        this.marketsLoaded = false;
      }
      
      return true;
    } catch (error) {
      console.error('Error initializing exchange:', error);
      // Don't throw - allow partial initialization
      this.marketsLoaded = false;
      return false;
    }
  }


  /**
   * Fetch OHLCV data for a specific timeframe with retry logic
   */
  async fetchOHLCV(timeframe, limit = 100, retries = 2) {
    try {
      if (!this.exchange) {
        await this.initialize();
      }

      let lastError = null;
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          if (attempt > 0) {
            console.log(`[AnalysisEngine] Retrying fetchOHLCV for ${timeframe} (attempt ${attempt + 1}/${retries + 1})...`);
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          }

          const ohlcv = await Promise.race([
            this.exchange.fetchOHLCV(this.symbol, timeframe, undefined, limit),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('RequestTimeout')), 30000)
            )
          ]);

          // Convert to array of objects for easier processing
          return ohlcv.map(candle => ({
            timestamp: candle[0],
            open: candle[1],
            high: candle[2],
            low: candle[3],
            close: candle[4],
            volume: candle[5]
          }));
        } catch (error) {
          lastError = error;
          if (error.message.includes('timeout') || error.message.includes('RequestTimeout')) {
            if (attempt < retries) continue;
          } else {
            // Non-timeout error - don't retry
            throw error;
          }
        }
      }
      throw lastError || new Error('Failed to fetch OHLCV after retries');
    } catch (error) {
      console.error(`Error fetching OHLCV for ${timeframe}:`, error.message);
      throw error;
    }
  }

  /**
   * Fetch funding rate from Binance Futures
   */
  async fetchFundingRate(retries = 2) {
    try {
      if (!this.exchange) {
        await this.initialize();
      }

      let lastError = null;
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          if (attempt > 0) {
            console.log(`[AnalysisEngine] Retrying fetchFundingRate (attempt ${attempt + 1}/${retries + 1})...`);
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          }

          // Fetch funding rate using ccxt
          const fundingRate = await Promise.race([
            this.exchange.fetchFundingRate(this.symbol),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('RequestTimeout')), 30000)
            )
          ]);

          // Funding rate is typically returned as a percentage (e.g., 0.01 = 1%)
          // Convert to annualized percentage if needed
          const rate = fundingRate.fundingRate || fundingRate || 0;
          const annualizedRate = rate * 365 * 3; // Assuming 8-hour funding periods

          return {
            rate: rate,
            annualizedRate: annualizedRate,
            timestamp: fundingRate.timestamp || Date.now(),
            nextFundingTime: fundingRate.nextFundingTime || null
          };
        } catch (error) {
          lastError = error;
          if (error.message.includes('timeout') || error.message.includes('RequestTimeout')) {
            if (attempt < retries) continue;
          } else {
            // Non-timeout error - don't retry
            throw error;
          }
        }
      }
      throw lastError || new Error('Failed to fetch funding rate after retries');
    } catch (error) {
      console.warn(`[AnalysisEngine] Error fetching funding rate for ${this.symbol}:`, error.message);
      // Return neutral funding rate on error
      return {
        rate: 0,
        annualizedRate: 0,
        timestamp: Date.now(),
        nextFundingTime: null,
        error: error.message
      };
    }
  }

  /**
   * Fetch Open Interest from Binance Futures
   * Now includes change tracking
   */
  async fetchOpenInterest(retries = 2) {
    try {
      if (!this.exchange) {
        await this.initialize();
      }

      let lastError = null;
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          if (attempt > 0) {
            console.log(`[AnalysisEngine] Retrying fetchOpenInterest (attempt ${attempt + 1}/${retries + 1})...`);
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          }

          // Fetch open interest using backend proxy to avoid CORS
          // Format: BTC/USDT -> BTCUSDT
          const symbolForAPI = this.symbol.replace('/', '');
          // Use backend proxy instead of direct Binance API
          const backendUrl = `http://localhost:3000/api/binance/fapi/v1/openInterest?symbol=${symbolForAPI}`;
          
          const response = await Promise.race([
            fetch(backendUrl),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('RequestTimeout')), 30000)
            )
          ]);

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const data = await response.json();
          
          const currentOI = parseFloat(data.openInterest) || 0;
          const currentOIValue = parseFloat(data.openInterestValue) || 0;
          const timestamp = Date.now();

          // Track history for change calculation
          if (!OPEN_INTEREST_HISTORY.data[symbolForAPI]) {
            OPEN_INTEREST_HISTORY.data[symbolForAPI] = [];
          }

          const history = OPEN_INTEREST_HISTORY.data[symbolForAPI];
          
          // Add current reading
          history.push({
            timestamp: timestamp,
            value: currentOI,
            valueUSD: currentOIValue
          });

          // Keep only last maxHistory readings
          if (history.length > OPEN_INTEREST_HISTORY.maxHistory) {
            history.shift();
          }

          // Calculate change
          let oiChange = 0;
          let oiChangePercent = 0;
          let oiChangeUSD = 0;
          let interpretation = 'neutral';

          if (history.length >= 2) {
            const previous = history[history.length - 2];
            oiChange = currentOI - previous.value;
            oiChangeUSD = currentOIValue - previous.valueUSD;
            
            if (previous.value > 0) {
              oiChangePercent = ((oiChange / previous.value) * 100);
            }

            // Interpretation: OI↑ + Price↑ = New money, OI↓ + Price↑ = Short covering
            if (Math.abs(oiChangePercent) > 1) {
              if (oiChangePercent > 5) {
                interpretation = 'increasing_strong';
              } else if (oiChangePercent > 1) {
                interpretation = 'increasing';
              } else if (oiChangePercent < -5) {
                interpretation = 'decreasing_strong';
              } else if (oiChangePercent < -1) {
                interpretation = 'decreasing';
              }
            }
          }

          return {
            openInterest: currentOI,
            openInterestValue: currentOIValue,
            timestamp: timestamp,
            symbol: symbolForAPI,
            change: oiChange,
            changePercent: oiChangePercent,
            changeUSD: oiChangeUSD,
            interpretation: interpretation,
            history: history.slice(-5) // Return last 5 readings for reference
          };
        } catch (error) {
          lastError = error;
          if (error.message.includes('timeout') || error.message.includes('RequestTimeout')) {
            if (attempt < retries) continue;
          } else {
            // Non-timeout error - don't retry
            throw error;
          }
        }
      }
      throw lastError || new Error('Failed to fetch open interest after retries');
    } catch (error) {
      console.warn(`[AnalysisEngine] Error fetching open interest for ${this.symbol}:`, error.message);
      // Return neutral open interest on error
      return {
        openInterest: 0,
        openInterestValue: 0,
        timestamp: Date.now(),
        change: 0,
        changePercent: 0,
        changeUSD: 0,
        interpretation: 'neutral',
        error: error.message
      };
    }
  }

  /**
   * Fetch Long/Short Ratio from Binance Futures
   * Note: Binance doesn't provide this directly, so we'll use top trader positions as proxy
   */
  async fetchLongShortRatio(retries = 2) {
    try {
      const symbolForAPI = this.symbol.replace('/', '');
      
      // Binance Futures Top Trader Long/Short Ratio (Accounts)
      const url = `https://fapi.binance.com/futures/data/topLongShortAccountRatio?symbol=${symbolForAPI}&period=5m&limit=1`;
      
      let lastError = null;
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          if (attempt > 0) {
            console.log(`[AnalysisEngine] Retrying fetchLongShortRatio (attempt ${attempt + 1}/${retries + 1})...`);
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          }

          const response = await Promise.race([
            fetch(url),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('RequestTimeout')), 30000)
            )
          ]);

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const data = await response.json();
          
          if (Array.isArray(data) && data.length > 0) {
            const latest = data[0];
            const longShortRatio = parseFloat(latest.longShortRatio) || 1;
            const longAccount = parseFloat(latest.longAccount) || 0;
            const shortAccount = parseFloat(latest.shortAccount) || 0;

            // Interpretation
            let sentiment = 'neutral';
            let interpretation = 'متوازن';
            
            if (longShortRatio > 1.5) {
              sentiment = 'long_heavy';
              interpretation = 'تمایل شدید به لانگ (Retail Long) - احتمال حرکت خلاف';
            } else if (longShortRatio > 1.2) {
              sentiment = 'long_bias';
              interpretation = 'تمایل به لانگ';
            } else if (longShortRatio < 0.67) { // 1/1.5
              sentiment = 'short_heavy';
              interpretation = 'تمایل شدید به شورت (Retail Short) - احتمال حرکت خلاف';
            } else if (longShortRatio < 0.83) { // 1/1.2
              sentiment = 'short_bias';
              interpretation = 'تمایل به شورت';
            }

            return {
              ratio: longShortRatio,
              longAccount: longAccount,
              shortAccount: shortAccount,
              sentiment: sentiment,
              interpretation: interpretation,
              timestamp: Date.now()
            };
          }

          return {
            ratio: 1,
            longAccount: 0,
            shortAccount: 0,
            sentiment: 'neutral',
            interpretation: 'داده در دسترس نیست',
            timestamp: Date.now()
          };
        } catch (error) {
          lastError = error;
          if (error.message.includes('timeout') || error.message.includes('RequestTimeout')) {
            if (attempt < retries) continue;
          } else {
            // Non-timeout error - don't retry
            throw error;
          }
        }
      }
      throw lastError || new Error('Failed to fetch long/short ratio after retries');
    } catch (error) {
      console.warn(`[AnalysisEngine] Error fetching long/short ratio for ${this.symbol}:`, error.message);
      return {
        ratio: 1,
        longAccount: 0,
        shortAccount: 0,
        sentiment: 'neutral',
        interpretation: 'خطا در دریافت داده',
        timestamp: Date.now(),
        error: error.message
      };
    }
  }

  /**
   * Fetch order book with limit and retry logic
   */
  async fetchOrderBook(limit = 20, retries = 2) {
    try {
      // Check cache first
      const cacheKey = `${this.symbol}_${limit}`;
      const now = Date.now();
      if (ORDERBOOK_CACHE.data[cacheKey] && 
          (now - ORDERBOOK_CACHE.data[cacheKey].timestamp) < ORDERBOOK_CACHE.ttl) {
        this.orderBook = ORDERBOOK_CACHE.data[cacheKey].data;
        return this.orderBook;
      }

      if (!this.exchange) {
        await this.initialize();
      }

      let lastError = null;
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          if (attempt > 0) {
            console.log(`[AnalysisEngine] Retrying fetchOrderBook (attempt ${attempt + 1}/${retries + 1})...`);
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          }

          // Increased timeout to 30 seconds for better reliability
          const orderBook = await Promise.race([
            this.exchange.fetchOrderBook(this.symbol, limit),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('RequestTimeout')), 30000)
            )
          ]);
          
          this.orderBook = {
            bids: orderBook.bids.map(bid => ({ price: bid[0], amount: bid[1] })),
            asks: orderBook.asks.map(ask => ({ price: ask[0], amount: ask[1] })),
            timestamp: orderBook.timestamp || Date.now()
          };

          // Cache the result
          ORDERBOOK_CACHE.data[cacheKey] = {
            data: this.orderBook,
            timestamp: now
          };

          return this.orderBook;
        } catch (error) {
          lastError = error;
          if (error.message.includes('timeout') || error.message.includes('RequestTimeout')) {
            if (attempt < retries) continue;
          } else {
            // Non-timeout error - don't retry
            throw error;
          }
        }
      }
      throw lastError || new Error('Failed to fetch order book after retries');
    } catch (error) {
      // Rate limit error logging - only log once per 60 seconds per symbol
      const cacheKey = `${this.symbol}_${limit}`;
      const now = Date.now();
      const lastLogTime = ORDERBOOK_CACHE.lastErrorLog[cacheKey] || 0;
      
      if (now - lastLogTime > 60000) { // Log at most once per minute
        console.error(`Error fetching order book for ${this.symbol}:`, error.message);
        ORDERBOOK_CACHE.lastErrorLog[cacheKey] = now;
      }
      
      // Return empty order book instead of throwing to allow analysis to continue
      this.orderBook = {
        bids: [],
        asks: [],
        timestamp: Date.now()
      };
      return this.orderBook;
    }
  }

  /**
   * Fetch market data for all timeframes with better error handling
   */
  async fetchMarketData(timeframes = null) {
    try {
      const tfList = timeframes || this.timeframes;
      this.marketData = {};

      // Fetch data for each timeframe in parallel, but handle errors gracefully
      const promises = tfList.map(async (tf) => {
        try {
          const ohlcv = await this.fetchOHLCV(tf);
          this.marketData[tf] = ohlcv;
          return { timeframe: tf, data: ohlcv, success: true };
        } catch (error) {
          console.warn(`[AnalysisEngine] Failed to fetch ${tf} data:`, error.message);
          return { timeframe: tf, data: null, success: false, error: error.message };
        }
      });

      const results = await Promise.allSettled(promises);
      
      // Process results
      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value.success) {
          this.marketData[result.value.timeframe] = result.value.data;
        } else {
          console.warn(`[AnalysisEngine] Timeframe ${tfList[index]} data unavailable`);
        }
      });

      // Fetch order book (non-blocking - allow analysis to continue even if it fails)
      try {
        await this.fetchOrderBook(20);
      } catch (error) {
        console.warn('[AnalysisEngine] Order book fetch failed, continuing without it:', error.message);
      }

      // Check if we have at least some data
      const availableTimeframes = Object.keys(this.marketData);
      if (availableTimeframes.length === 0) {
        throw new Error('No timeframe data available');
      }

      return this.marketData;
    } catch (error) {
      console.error('Error fetching market data:', error.message);
      // Return partial data if available
      if (Object.keys(this.marketData).length > 0) {
        return this.marketData;
      }
      throw error;
    }
  }

  /**
   * Calculate RSI using technicalindicators library
   */
  calculateRSI(closes, period = 14) {
    try {
      // Get technicalIndicators from various possible locations
      const ti = typeof technicalIndicators !== 'undefined' ? technicalIndicators :
                 typeof window !== 'undefined' && window.technicalIndicators ? window.technicalIndicators :
                 typeof globalThis !== 'undefined' && globalThis.technicalIndicators ? globalThis.technicalIndicators :
                 null;

      if (!ti || !ti.RSI) {
        throw new Error('technicalIndicators library is not loaded or RSI is not available.');
      }

      if (!closes || closes.length < period + 1) {
        return 50; // Neutral RSI if not enough data
      }

      const rsi = ti.RSI.calculate({
        values: closes,
        period: period
      });

      return rsi.length > 0 ? rsi[rsi.length - 1] : 50;
    } catch (error) {
      console.error('Error calculating RSI:', error);
      return 50;
    }
  }

  /**
   * Calculate MACD using technicalindicators library
   */
  calculateMACD(closes, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) {
    try {
      const ti = typeof technicalIndicators !== 'undefined' ? technicalIndicators :
                 typeof window !== 'undefined' && window.technicalIndicators ? window.technicalIndicators :
                 typeof globalThis !== 'undefined' && globalThis.technicalIndicators ? globalThis.technicalIndicators :
                 null;

      if (!ti || !ti.MACD) {
        throw new Error('technicalIndicators library is not loaded or MACD is not available.');
      }

      if (!closes || closes.length < slowPeriod + signalPeriod) {
        return { line: 0, signal: 0, histogram: 0 };
      }

      const macd = ti.MACD.calculate({
        values: closes,
        fastPeriod: fastPeriod,
        slowPeriod: slowPeriod,
        signalPeriod: signalPeriod
      });

      if (macd.length === 0) {
        return { line: 0, signal: 0, histogram: 0 };
      }

      const currentMACD = macd[macd.length - 1];
      return {
        line: currentMACD.MACD || 0,
        signal: currentMACD.signal || 0,
        histogram: currentMACD.histogram || 0
      };
    } catch (error) {
      console.error('Error calculating MACD:', error);
      return { line: 0, signal: 0, histogram: 0 };
    }
  }

  /**
   * Calculate Delta MACD - compare current with 5 previous candles
   */
  calculateDeltaMACD(currentMACD, previousMACDs) {
    if (!previousMACDs || previousMACDs.length === 0) {
      return { delta: 0, trend: 'neutral' };
    }

    const avgPreviousHistogram = previousMACDs.reduce((sum, macd) => sum + (macd.histogram || 0), 0) / previousMACDs.length;
    const currentHistogram = currentMACD.histogram || 0;
    const delta = currentHistogram - avgPreviousHistogram;

    let trend = 'neutral';
    if (delta > 0.001) trend = 'increasing';
    else if (delta < -0.001) trend = 'decreasing';

    return {
      delta: delta,
      trend: trend,
      current: currentHistogram,
      average: avgPreviousHistogram
    };
  }

  /**
   * Detect divergence between price and indicators
   * Returns bullish or bearish divergence (both regular and hidden)
   * Now also detects timeframe conflicts (e.g., RSI 30m=69 vs RSI 1D=43)
   */
  detectDivergence(ohlcvData, rsiValues, macdValues, higherTimeframeRSI = null) {
    if (!ohlcvData || ohlcvData.length < 15 || !rsiValues || rsiValues.length < 15) {
      return { type: 'none', strength: 0, isHidden: false, timeframeConflict: null };
    }

    // Use more data for better detection (last 20 candles)
    const lookback = Math.min(20, ohlcvData.length, rsiValues.length);
    const recentPrices = ohlcvData.slice(-lookback).map(c => c.close);
    const recentRSI = rsiValues.slice(-lookback);
    const recentMACD = macdValues && macdValues.length >= lookback ? macdValues.slice(-lookback).map(m => m.histogram || 0) : null;

    // Find price peaks and troughs with better detection
    const pricePeaks = [];
    const priceTroughs = [];
    
    // Use a wider lookback for peak/trough detection (3 candles on each side)
    for (let i = 3; i < recentPrices.length - 3; i++) {
      let isPeak = true;
      let isTrough = true;
      
      // Check if it's a peak (higher than neighbors)
      for (let j = i - 3; j <= i + 3; j++) {
        if (j !== i && recentPrices[j] >= recentPrices[i]) {
          isPeak = false;
          break;
        }
      }
      
      // Check if it's a trough (lower than neighbors)
      for (let j = i - 3; j <= i + 3; j++) {
        if (j !== i && recentPrices[j] <= recentPrices[i]) {
          isTrough = false;
          break;
        }
      }
      
      if (isPeak) {
        pricePeaks.push({ index: i, value: recentPrices[i] });
      }
      if (isTrough) {
        priceTroughs.push({ index: i, value: recentPrices[i] });
      }
    }

    // Check for Regular RSI Divergence
    let rsiDivergence = 'none';
    let rsiIsHidden = false;
    
    if (pricePeaks.length >= 2) {
      const lastPeak = pricePeaks[pricePeaks.length - 1];
      const prevPeak = pricePeaks[pricePeaks.length - 2];
      
      // Regular Bearish Divergence: price makes higher high, RSI makes lower high
      if (lastPeak.value > prevPeak.value && recentRSI[lastPeak.index] < recentRSI[prevPeak.index]) {
        rsiDivergence = 'bearish';
        rsiIsHidden = false;
      }
      // Hidden Bearish Divergence: price makes lower high, RSI makes higher high (continuation signal)
      else if (lastPeak.value < prevPeak.value && recentRSI[lastPeak.index] > recentRSI[prevPeak.index]) {
        rsiDivergence = 'bearish';
        rsiIsHidden = true;
      }
    }
    
    if (priceTroughs.length >= 2) {
      const lastTrough = priceTroughs[priceTroughs.length - 1];
      const prevTrough = priceTroughs[priceTroughs.length - 2];
      
      // Regular Bullish Divergence: price makes lower low, RSI makes higher low
      if (lastTrough.value < prevTrough.value && recentRSI[lastTrough.index] > recentRSI[prevTrough.index]) {
        rsiDivergence = 'bullish';
        rsiIsHidden = false;
      }
      // Hidden Bullish Divergence: price makes higher low, RSI makes lower low (continuation signal)
      else if (lastTrough.value > prevTrough.value && recentRSI[lastTrough.index] < recentRSI[prevTrough.index]) {
        rsiDivergence = 'bullish';
        rsiIsHidden = true;
      }
    }

    // Check for MACD divergence if available
    let macdDivergence = 'none';
    let macdIsHidden = false;
    
    if (recentMACD && pricePeaks.length >= 2) {
      const lastPeak = pricePeaks[pricePeaks.length - 1];
      const prevPeak = pricePeaks[pricePeaks.length - 2];
      
      // Regular Bearish MACD Divergence
      if (lastPeak.value > prevPeak.value && recentMACD[lastPeak.index] < recentMACD[prevPeak.index]) {
        macdDivergence = 'bearish';
        macdIsHidden = false;
      }
      // Hidden Bearish MACD Divergence
      else if (lastPeak.value < prevPeak.value && recentMACD[lastPeak.index] > recentMACD[prevPeak.index]) {
        macdDivergence = 'bearish';
        macdIsHidden = true;
      }
    }
    
    if (recentMACD && priceTroughs.length >= 2) {
      const lastTrough = priceTroughs[priceTroughs.length - 1];
      const prevTrough = priceTroughs[priceTroughs.length - 2];
      
      // Regular Bullish MACD Divergence
      if (lastTrough.value < prevTrough.value && recentMACD[lastTrough.index] > recentMACD[prevTrough.index]) {
        macdDivergence = 'bullish';
        macdIsHidden = false;
      }
      // Hidden Bullish MACD Divergence
      else if (lastTrough.value > prevTrough.value && recentMACD[lastTrough.index] < recentMACD[prevTrough.index]) {
        macdDivergence = 'bullish';
        macdIsHidden = true;
      }
    }

    // NEW: Detect timeframe conflicts (e.g., RSI 30m=69 vs RSI 1D=43)
    let timeframeConflict = null;
    if (higherTimeframeRSI !== null && typeof higherTimeframeRSI === 'number') {
      const currentRSI = recentRSI[recentRSI.length - 1];
      const rsiDiff = Math.abs(currentRSI - higherTimeframeRSI);
      
      // If there's a significant difference (e.g., local overbought in downtrend)
      if (rsiDiff > 25) {
        if (currentRSI > 65 && higherTimeframeRSI < 50) {
          timeframeConflict = {
            type: 'local_overbought_in_downtrend',
            message: `اشباع خرید محلی (RSI=${currentRSI.toFixed(1)}) در روند نزولی بزرگتر (RSI=${higherTimeframeRSI.toFixed(1)})`,
            currentRSI: currentRSI,
            higherTFRSI: higherTimeframeRSI
          };
        } else if (currentRSI < 35 && higherTimeframeRSI > 50) {
          timeframeConflict = {
            type: 'local_oversold_in_uptrend',
            message: `اشباع فروش محلی (RSI=${currentRSI.toFixed(1)}) در روند صعودی بزرگتر (RSI=${higherTimeframeRSI.toFixed(1)})`,
            currentRSI: currentRSI,
            higherTFRSI: higherTimeframeRSI
          };
        }
      }
    }

    // Determine overall divergence (prioritize regular over hidden, but report if hidden)
    const isHidden = rsiIsHidden || macdIsHidden;
    let strength = 1;
    
    // If both RSI and MACD show divergence, increase strength
    if ((rsiDivergence !== 'none' && macdDivergence !== 'none') && 
        (rsiDivergence === macdDivergence)) {
      strength = 2;
    }
    
    const result = { 
      type: 'none', 
      strength: 0, 
      isHidden: false,
      timeframeConflict: timeframeConflict
    };
    
    if (rsiDivergence === 'bullish' || macdDivergence === 'bullish') {
      result.type = 'bullish';
      result.strength = strength;
      result.isHidden = isHidden;
    } else if (rsiDivergence === 'bearish' || macdDivergence === 'bearish') {
      result.type = 'bearish';
      result.strength = strength;
      result.isHidden = isHidden;
    }

    return result;
  }

  /**
   * Calculate Volume 24h Change
   * Compares current volume with 24h ago
   */
  calculateVolume24hChange(ohlcvData, timeframe = '1h') {
    try {
      if (!ohlcvData || ohlcvData.length < 24) {
        return null; // Need at least 24 candles for 24h comparison
      }

      // Calculate candles per 24h based on timeframe
      let candlesPer24h = 24;
      if (timeframe === '30m') candlesPer24h = 48;
      else if (timeframe === '1h') candlesPer24h = 24;
      else if (timeframe === '4h') candlesPer24h = 6;
      else if (timeframe === '1d') candlesPer24h = 1;

      if (ohlcvData.length < candlesPer24h + 1) {
        return null;
      }

      // Current volume (last candle)
      const currentVolume = ohlcvData[ohlcvData.length - 1].volume || ohlcvData[ohlcvData.length - 1].v || 0;

      // Volume 24h ago (or equivalent period)
      const pastIndex = ohlcvData.length - 1 - candlesPer24h;
      const pastVolume = ohlcvData[pastIndex].volume || ohlcvData[pastIndex].v || 0;

      if (pastVolume <= 0) {
        return null;
      }

      const volumeChange = currentVolume - pastVolume;
      const volumeChangePercent = ((volumeChange / pastVolume) * 100);

      // Interpretation
      let interpretation = 'neutral';
      if (volumeChangePercent > 50) {
        interpretation = 'very_high';
      } else if (volumeChangePercent > 20) {
        interpretation = 'high';
      } else if (volumeChangePercent < -50) {
        interpretation = 'very_low';
      } else if (volumeChangePercent < -20) {
        interpretation = 'low';
      }

      return {
        currentVolume: currentVolume,
        pastVolume: pastVolume,
        change: volumeChange,
        changePercent: volumeChangePercent,
        interpretation: interpretation,
        timeframe: timeframe
      };
    } catch (error) {
      console.error('Error calculating Volume 24h Change:', error);
      return null;
    }
  }

  /**
   * Calculate ADX using technicalindicators library
   */
  calculateADX(ohlcvData, period = 14) {
    try {
      // Get technicalIndicators from various possible locations
      const ti = typeof technicalIndicators !== 'undefined' ? technicalIndicators :
                 typeof window !== 'undefined' && window.technicalIndicators ? window.technicalIndicators :
                 typeof globalThis !== 'undefined' && globalThis.technicalIndicators ? globalThis.technicalIndicators :
                 null;

      if (!ti || !ti.ADX) {
        throw new Error('technicalIndicators library is not loaded or ADX is not available.');
      }

      if (!ohlcvData || ohlcvData.length < period + 1) {
        return { adx: 20, trend: 'neutral' };
      }

      const input = {
        high: ohlcvData.map(c => c.high),
        low: ohlcvData.map(c => c.low),
        close: ohlcvData.map(c => c.close),
        period: period
      };

      const adx = ti.ADX.calculate(input);

      if (adx.length === 0) {
        return { adx: 20, trend: 'neutral' };
      }

      const currentADX = adx[adx.length - 1];
      
      // Determine trend based on ADX value and price movement
      let trend = 'neutral';
      if (currentADX.adx > 25) {
        const currentPrice = ohlcvData[ohlcvData.length - 1].close;
        const previousPrice = ohlcvData[ohlcvData.length - 2].close;
        trend = currentPrice > previousPrice ? 'strong_up' : 'strong_down';
      }

      return {
        adx: currentADX.adx,
        pdi: currentADX.pdi || 0,
        mdi: currentADX.mdi || 0,
        trend: trend
      };
    } catch (error) {
      console.error('Error calculating ADX:', error);
      return { adx: 20, trend: 'neutral' };
    }
  }

  /**
   * Calculate Delta RSI - compare current with 5 previous candles
   */
  calculateDeltaRSI(currentRSI, previousRSIs) {
    if (!previousRSIs || previousRSIs.length === 0) {
      return { delta: 0, trend: 'neutral' };
    }

    const avgPreviousRSI = previousRSIs.reduce((sum, rsi) => sum + rsi, 0) / previousRSIs.length;
    const delta = currentRSI - avgPreviousRSI;

    let trend = 'neutral';
    if (delta > 5) trend = 'increasing';
    else if (delta < -5) trend = 'decreasing';

    return {
      delta: delta,
      trend: trend,
      current: currentRSI,
      average: avgPreviousRSI
    };
  }

  /**
   * Calculate Delta ADX - compare current with 5 previous candles
   */
  calculateDeltaADX(currentADX, previousADXs) {
    if (!previousADXs || previousADXs.length === 0) {
      return { delta: 0, trend: 'neutral' };
    }

    const avgPreviousADX = previousADXs.reduce((sum, adx) => sum + adx, 0) / previousADXs.length;
    const delta = currentADX - avgPreviousADX;

    let trend = 'neutral';
    if (delta > 3) trend = 'increasing';
    else if (delta < -3) trend = 'decreasing';

    return {
      delta: delta,
      trend: trend,
      current: currentADX,
      average: avgPreviousADX
    };
  }

  /**
   * Get momentum status based on RSI, ADX, and MACD deltas
   */
  getMomentumStatus(rsiDelta, adxDelta, macdDelta = null) {
    const rsiTrend = rsiDelta.trend;
    const adxTrend = adxDelta.trend;
    const macdTrend = macdDelta ? macdDelta.trend : 'neutral';

    // Count increasing signals
    let increasingCount = 0;
    let decreasingCount = 0;

    if (rsiTrend === 'increasing') increasingCount++;
    else if (rsiTrend === 'decreasing') decreasingCount++;

    if (adxTrend === 'increasing') increasingCount++;
    else if (adxTrend === 'decreasing') decreasingCount++;

    if (macdTrend === 'increasing') increasingCount++;
    else if (macdTrend === 'decreasing') decreasingCount++;

    // Determine overall momentum
    if (increasingCount >= 2) {
      return 'Increasing';
    } else if (decreasingCount >= 2) {
      return 'Decreasing';
    }

    // Mixed signals = neutral
    return 'Neutral';
  }

  /**
   * Detect liquidity walls in order book
   */
  detectWalls(orderBook) {
    if (!orderBook || !orderBook.bids || !orderBook.asks) {
      return { bids: [], asks: [] };
    }

    const walls = {
      bids: [],
      asks: []
    };

    // Analyze bids (buy orders)
    if (orderBook.bids.length > 0) {
      const bidAmounts = orderBook.bids.map(b => b.amount);
      const avgBidAmount = bidAmounts.reduce((sum, amt) => sum + amt, 0) / bidAmounts.length;
      const threshold = avgBidAmount * 2; // 2x average = wall

      orderBook.bids.forEach(bid => {
        if (bid.amount >= threshold) {
          walls.bids.push({
            price: bid.price,
            amount: bid.amount,
            strength: bid.amount / avgBidAmount // Multiplier of average
          });
        }
      });
    }

    // Analyze asks (sell orders)
    if (orderBook.asks.length > 0) {
      const askAmounts = orderBook.asks.map(a => a.amount);
      const avgAskAmount = askAmounts.reduce((sum, amt) => sum + amt, 0) / askAmounts.length;
      const threshold = avgAskAmount * 2; // 2x average = wall

      orderBook.asks.forEach(ask => {
        if (ask.amount >= threshold) {
          walls.asks.push({
            price: ask.price,
            amount: ask.amount,
            strength: ask.amount / avgAskAmount // Multiplier of average
          });
        }
      });
    }

    return walls;
  }

  /**
   * Check if current price is near a wall
   */
  isNearWall(currentPrice, walls, thresholdPercent = 1.0) {
    const allWalls = [...walls.bids, ...walls.asks];
    
    for (const wall of allWalls) {
      const priceDiff = Math.abs((wall.price - currentPrice) / currentPrice) * 100;
      if (priceDiff <= thresholdPercent) {
        return {
          near: true,
          wall: wall,
          distance: priceDiff,
          type: walls.bids.includes(wall) ? 'support' : 'resistance'
        };
      }
    }

    return { near: false };
  }

  /**
   * Detect liquidation zones near stop loss
   * Checks if stop loss is near high liquidity pools that could cause stop hunts
   */
  detectLiquidationZones(stopLoss, orderBook, currentPrice, thresholdPercent = 0.5) {
    if (!stopLoss || !orderBook || !currentPrice || stopLoss <= 0 || currentPrice <= 0) {
      return {
        nearLiquidity: false,
        zones: [],
        warnings: []
      };
    }

    const zones = [];
    const warnings = [];

    // Check bids (support walls) - these are potential liquidation zones for shorts
    if (orderBook.bids && orderBook.bids.length > 0) {
      const bidAmounts = orderBook.bids.map(b => b.amount || 0);
      const avgBidAmount = bidAmounts.reduce((sum, amt) => sum + amt, 0) / bidAmounts.length;
      const threshold = avgBidAmount * 2; // 2x average = significant wall

      orderBook.bids.forEach(bid => {
        if (bid.amount >= threshold) {
          const distance = Math.abs((bid.price - stopLoss) / currentPrice) * 100;
          
          if (distance <= thresholdPercent) {
            zones.push({
              price: bid.price,
              amount: bid.amount,
              strength: bid.amount / avgBidAmount,
              distance: distance,
              type: 'support',
              risk: distance < 0.2 ? 'high' : distance < 0.35 ? 'medium' : 'low'
            });

            if (distance < 0.2) {
              warnings.push({
                level: 'high',
                message: `⚠️ استاپ لاس بسیار نزدیک به دیوار نقدینگی (${distance.toFixed(2)}%) - ریسک Stop Hunt بالا`,
                price: bid.price,
                distance: distance
              });
            } else if (distance < 0.35) {
              warnings.push({
                level: 'medium',
                message: `⚠️ استاپ لاس نزدیک به دیوار نقدینگی (${distance.toFixed(2)}%)`,
                price: bid.price,
                distance: distance
              });
            }
          }
        }
      });
    }

    // Check asks (resistance walls) - these are potential liquidation zones for longs
    if (orderBook.asks && orderBook.asks.length > 0) {
      const askAmounts = orderBook.asks.map(a => a.amount || 0);
      const avgAskAmount = askAmounts.reduce((sum, amt) => sum + amt, 0) / askAmounts.length;
      const threshold = avgAskAmount * 2; // 2x average = significant wall

      orderBook.asks.forEach(ask => {
        if (ask.amount >= threshold) {
          const distance = Math.abs((ask.price - stopLoss) / currentPrice) * 100;
          
          if (distance <= thresholdPercent) {
            zones.push({
              price: ask.price,
              amount: ask.amount,
              strength: ask.amount / avgAskAmount,
              distance: distance,
              type: 'resistance',
              risk: distance < 0.2 ? 'high' : distance < 0.35 ? 'medium' : 'low'
            });

            if (distance < 0.2) {
              warnings.push({
                level: 'high',
                message: `⚠️ استاپ لاس بسیار نزدیک به دیوار نقدینگی (${distance.toFixed(2)}%) - ریسک Stop Hunt بالا`,
                price: ask.price,
                distance: distance
              });
            } else if (distance < 0.35) {
              warnings.push({
                level: 'medium',
                message: `⚠️ استاپ لاس نزدیک به دیوار نقدینگی (${distance.toFixed(2)}%)`,
                price: ask.price,
                distance: distance
              });
            }
          }
        }
      });
    }

    return {
      nearLiquidity: zones.length > 0,
      zones: zones,
      warnings: warnings,
      highestRisk: zones.length > 0 ? zones.reduce((max, zone) => 
        zone.risk === 'high' ? zone : (max.risk === 'high' ? max : zone), zones[0]
      ) : null
    };
  }

  /**
   * Calculate smart Risk/Reward ratio based on distance to liquidity walls
   * Analyzes entry distance to resistance/support walls and provides warnings
   */
  calculateRiskReward(entry, stopLoss, takeProfit1, takeProfit2, orderBook, walls, currentPrice) {
    if (!entry || !stopLoss || !takeProfit1 || entry <= 0 || stopLoss <= 0 || takeProfit1 <= 0) {
      return {
        riskRewardRatio: 0,
        distanceToResistance: null,
        distanceToSupport: null,
        riskLevel: 'unknown',
        warnings: []
      };
    }

    const warnings = [];
    let riskLevel = 'low';

    // Calculate distance to nearest resistance wall (for long positions)
    let distanceToResistance = null;
    let nearestResistanceWall = null;
    
    if (walls && walls.asks && walls.asks.length > 0) {
      const resistanceWalls = walls.asks.filter(wall => wall.price > entry);
      if (resistanceWalls.length > 0) {
        // Find closest resistance wall above entry
        nearestResistanceWall = resistanceWalls.reduce((closest, wall) => {
          return (!closest || wall.price < closest.price) ? wall : closest;
        });
        
        if (nearestResistanceWall) {
          distanceToResistance = ((nearestResistanceWall.price - entry) / entry) * 100;
          
          // Warning if too close to resistance
          if (distanceToResistance < 0.3) {
            warnings.push({
              level: 'high',
              message: `ریسک ورود بالاست: نزدیک به مقاومت سخت (${distanceToResistance.toFixed(2)}%) با فشار فروش ${nearestResistanceWall.strength.toFixed(1)}x`,
              type: 'resistance_too_close'
            });
            riskLevel = 'high';
          } else if (distanceToResistance < 0.5) {
            warnings.push({
              level: 'medium',
              message: `نزدیک به مقاومت (${distanceToResistance.toFixed(2)}%) - احتیاط در ورود`,
              type: 'resistance_near'
            });
            if (riskLevel === 'low') riskLevel = 'medium';
          }
        }
      }
    }

    // Calculate distance to nearest support wall (for short positions)
    let distanceToSupport = null;
    let nearestSupportWall = null;
    
    if (walls && walls.bids && walls.bids.length > 0) {
      const supportWalls = walls.bids.filter(wall => wall.price < entry);
      if (supportWalls.length > 0) {
        // Find closest support wall below entry
        nearestSupportWall = supportWalls.reduce((closest, wall) => {
          return (!closest || wall.price > closest.price) ? wall : closest;
        });
        
        if (nearestSupportWall) {
          distanceToSupport = ((entry - nearestSupportWall.price) / entry) * 100;
          
          // Warning if too close to support
          if (distanceToSupport < 0.3) {
            warnings.push({
              level: 'high',
              message: `ریسک ورود بالاست: نزدیک به حمایت سخت (${distanceToSupport.toFixed(2)}%) با فشار خرید ${nearestSupportWall.strength.toFixed(1)}x`,
              type: 'support_too_close'
            });
            riskLevel = 'high';
          } else if (distanceToSupport < 0.5) {
            warnings.push({
              level: 'medium',
              message: `نزدیک به حمایت (${distanceToSupport.toFixed(2)}%) - احتیاط در ورود`,
              type: 'support_near'
            });
            if (riskLevel === 'low') riskLevel = 'medium';
          }
        }
      }
    }

    // Calculate Risk/Reward ratio
    const risk = Math.abs((entry - stopLoss) / entry) * 100; // Risk as percentage
    const reward1 = takeProfit1 > entry ? ((takeProfit1 - entry) / entry) * 100 : 0; // Reward to TP1
    const reward2 = takeProfit2 && takeProfit2 > entry ? ((takeProfit2 - entry) / entry) * 100 : 0; // Reward to TP2
    
    const riskRewardRatio1 = risk > 0 ? reward1 / risk : 0;
    const riskRewardRatio2 = risk > 0 && reward2 > 0 ? reward2 / risk : 0;

    // Evaluate R:R ratio quality
    if (riskRewardRatio1 < 1.0) {
      warnings.push({
        level: 'medium',
        message: `نسبت Risk/Reward ضعیف است (${riskRewardRatio1.toFixed(2)}:1) - ریسک بیشتر از سود`,
        type: 'poor_rr_ratio'
      });
      if (riskLevel === 'low') riskLevel = 'medium';
    }

    return {
      riskRewardRatio: riskRewardRatio1,
      riskRewardRatio2: riskRewardRatio2,
      risk: risk,
      reward1: reward1,
      reward2: reward2,
      distanceToResistance: distanceToResistance,
      distanceToSupport: distanceToSupport,
      nearestResistanceWall: nearestResistanceWall,
      nearestSupportWall: nearestSupportWall,
      riskLevel: riskLevel,
      warnings: warnings
    };
  }

  /**
   * Generate scenario based on conditional logic
   */
  generateScenario(analysisData) {
    const scenarios = [];
    
    // Extract key data
    const { momentum, rsi, adx, trend, walls, currentPrice } = analysisData;

    // Scenario 1: Trend Up + Wall nearby = Resistance warning
    if (trend === 'up' || trend === 'strong_up') {
      const wallCheck = this.isNearWall(currentPrice, walls, 1.0);
      if (wallCheck.near && wallCheck.type === 'resistance') {
        scenarios.push({
          type: 'warning',
          message: 'هشدار برخورد به مقاومت',
          priority: 'high',
          details: `دیوار نقدینگی در قیمت ${wallCheck.wall.price.toFixed(2)} شناسایی شد`
        });
      }
    }

    // Scenario 2: Trend Down + Wall nearby = Support warning
    if (trend === 'down' || trend === 'strong_down') {
      const wallCheck = this.isNearWall(currentPrice, walls, 1.0);
      if (wallCheck.near && wallCheck.type === 'support') {
        scenarios.push({
          type: 'warning',
          message: 'هشدار برخورد به حمایت',
          priority: 'high',
          details: `دیوار نقدینگی در قیمت ${wallCheck.wall.price.toFixed(2)} شناسایی شد`
        });
      }
    }

    // Scenario 3: Momentum Increasing + RSI not overbought = Continuation
    if (momentum === 'Increasing' && rsi < 70) {
      scenarios.push({
        type: 'opportunity',
        message: 'روند صعودی ادامه دارد',
        priority: 'medium',
        details: `RSI در محدوده ${rsi.toFixed(2)} و مومنتوم در حال افزایش است`
      });
    }

    // Scenario 4: Momentum Decreasing + RSI not oversold = Weakness
    if (momentum === 'Decreasing' && rsi > 30) {
      scenarios.push({
        type: 'caution',
        message: 'ضعف در روند صعودی',
        priority: 'medium',
        details: `RSI در محدوده ${rsi.toFixed(2)} و مومنتوم در حال کاهش است`
      });
    }

    // Scenario 5: Strong ADX + High RSI = Overbought
    if (adx > 25 && rsi > 70) {
      scenarios.push({
        type: 'warning',
        message: 'وضعیت اشباع خرید',
        priority: 'high',
        details: `RSI بالای 70 و ADX قوی نشان‌دهنده اشباع خرید است`
      });
    }

    // Scenario 6: Strong ADX + Low RSI = Oversold
    if (adx > 25 && rsi < 30) {
      scenarios.push({
        type: 'opportunity',
        message: 'فرصت خرید در منطقه اشباع فروش',
        priority: 'high',
        details: `RSI زیر 30 و ADX قوی نشان‌دهنده اشباع فروش است`
      });
    }

    // Scenario 7: Weak ADX = Range market
    if (adx < 20) {
      scenarios.push({
        type: 'info',
        message: 'بازار در حالت رنج',
        priority: 'low',
        details: `ADX زیر 20 نشان‌دهنده عدم وجود روند قوی است`
      });
    }

    // Return primary scenario (highest priority)
    if (scenarios.length === 0) {
      return {
        type: 'neutral',
        message: 'وضعیت خنثی',
        priority: 'low',
        details: 'هیچ سناریوی خاصی شناسایی نشد'
      };
    }

    // Sort by priority (high > medium > low)
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    scenarios.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

    return scenarios[0];
  }

  /**
   * Calculate OBV (On-Balance Volume) to analyze buyer/seller strength
   */
  calculateOBV(ohlcvData) {
    if (!ohlcvData || ohlcvData.length < 2) {
      return { obv: 0, trend: 'neutral', delta: 0 };
    }

    let obv = 0;
    const obvValues = [];

    for (let i = 1; i < ohlcvData.length; i++) {
      const prev = ohlcvData[i - 1];
      const curr = ohlcvData[i];

      if (curr.close > prev.close) {
        obv += curr.volume; // Price up, add volume
      } else if (curr.close < prev.close) {
        obv -= curr.volume; // Price down, subtract volume
      }
      // If price unchanged, OBV stays the same

      obvValues.push(obv);
    }

    const currentOBV = obvValues[obvValues.length - 1];
    const previousOBV = obvValues.length >= 5 ? obvValues[obvValues.length - 5] : obvValues[0];
    const delta = currentOBV - previousOBV;

    // Determine trend
    let trend = 'neutral';
    if (delta > 0) trend = 'increasing'; // Buyers accumulating
    else if (delta < 0) trend = 'decreasing'; // Sellers accumulating

    return {
      obv: currentOBV,
      trend: trend,
      delta: delta,
      values: obvValues.slice(-20) // Last 20 values for reference
    };
  }

  /**
   * Detect market structure change (BOS/CHoCH) for a specific timeframe
   * Returns structure state: 'bullish', 'bearish', 'neutral', or 'structure_break'
   */
  detectMarketStructure(ohlcvData, timeframe = '15m') {
    if (!ohlcvData || ohlcvData.length < 50) {
      return { structure: 'neutral', change: 'none', confidence: 0 };
    }

    // Find swing highs and lows
    const swingHighs = [];
    const swingLows = [];
    const lookback = 5; // Look back 5 candles for swing detection

    for (let i = lookback; i < ohlcvData.length - lookback; i++) {
      const current = ohlcvData[i];
      let isSwingHigh = true;
      let isSwingLow = true;

      // Check if it's a swing high
      for (let j = i - lookback; j <= i + lookback; j++) {
        if (j !== i && ohlcvData[j].high >= current.high) {
          isSwingHigh = false;
          break;
        }
      }

      // Check if it's a swing low
      for (let j = i - lookback; j <= i + lookback; j++) {
        if (j !== i && ohlcvData[j].low <= current.low) {
          isSwingLow = false;
          break;
        }
      }

      if (isSwingHigh) {
        swingHighs.push({ index: i, price: current.high });
      }
      if (isSwingLow) {
        swingLows.push({ index: i, price: current.low });
      }
    }

    if (swingHighs.length < 2 || swingLows.length < 2) {
      return { structure: 'neutral', change: 'none', confidence: 0 };
    }

    // Get recent swings
    const recentHighs = swingHighs.slice(-3);
    const recentLows = swingLows.slice(-3);

    // Check for Break of Structure (BOS) - Bullish
    // Higher high after higher low = bullish BOS
    let bullishBOS = false;
    if (recentHighs.length >= 2 && recentLows.length >= 1) {
      const lastHigh = recentHighs[recentHighs.length - 1];
      const prevHigh = recentHighs[recentHighs.length - 2];
      const lastLow = recentLows[recentLows.length - 1];
      const prevLow = recentLows.length >= 2 ? recentLows[recentLows.length - 2] : null;

      if (lastHigh.price > prevHigh.price && 
          (prevLow === null || lastLow.price > prevLow.price)) {
        bullishBOS = true;
      }
    }

    // Check for Break of Structure (BOS) - Bearish
    // Lower low after lower high = bearish BOS
    let bearishBOS = false;
    if (recentLows.length >= 2 && recentHighs.length >= 1) {
      const lastLow = recentLows[recentLows.length - 1];
      const prevLow = recentLows[recentLows.length - 2];
      const lastHigh = recentHighs[recentHighs.length - 1];
      const prevHigh = recentHighs.length >= 2 ? recentHighs[recentHighs.length - 2] : null;

      if (lastLow.price < prevLow.price && 
          (prevHigh === null || lastHigh.price < prevHigh.price)) {
        bearishBOS = true;
      }
    }

    // Determine structure
    let structure = 'neutral';
    let change = 'none';
    let confidence = 0;

    if (bullishBOS) {
      structure = 'bullish';
      change = 'bos_bullish';
      confidence = 7;
    } else if (bearishBOS) {
      structure = 'bearish';
      change = 'bos_bearish';
      confidence = 7;
    } else {
      // Check current trend based on EMA alignment
      const closes = ohlcvData.map(c => c.close);
      const ema21 = this.calculateEMA(closes, 21);
      const ema50 = this.calculateEMA(closes, 50);
      const currentPrice = closes[closes.length - 1];

      if (currentPrice > ema21 && ema21 > ema50) {
        structure = 'bullish';
      } else if (currentPrice < ema21 && ema21 < ema50) {
        structure = 'bearish';
      }
    }

    return {
      structure: structure,
      change: change,
      confidence: confidence,
      swingHighs: recentHighs.length,
      swingLows: recentLows.length
    };
  }

  /**
   * Calculate EMA (Exponential Moving Average) - helper for market structure
   */
  calculateEMA(closes, period) {
    if (!closes || closes.length < period) {
      return closes.length > 0 ? closes[closes.length - 1] : 0;
    }

    const multiplier = 2 / (period + 1);
    let ema = closes.slice(0, period).reduce((sum, val) => sum + val, 0) / period;

    for (let i = period; i < closes.length; i++) {
      ema = (closes[i] - ema) * multiplier + ema;
    }

    return ema;
  }

  /**
   * Calculate Pivot Points (Standard method)
   * Uses previous period's High, Low, Close to calculate support/resistance levels
   */
  calculatePivotPoints(ohlcvData) {
    if (!ohlcvData || ohlcvData.length < 2) {
      return null;
    }

    // Use previous period's data (second to last candle)
    const prevCandle = ohlcvData[ohlcvData.length - 2];
    const high = prevCandle.high || prevCandle.h;
    const low = prevCandle.low || prevCandle.l;
    const close = prevCandle.close || prevCandle.c;

    // Pivot Point (PP)
    const pivot = (high + low + close) / 3;

    // Resistance levels (R1, R2, R3)
    const r1 = 2 * pivot - low;
    const r2 = pivot + (high - low);
    const r3 = high + 2 * (pivot - low);

    // Support levels (S1, S2, S3)
    const s1 = 2 * pivot - high;
    const s2 = pivot - (high - low);
    const s3 = low - 2 * (high - pivot);

    return {
      pivot: pivot,
      resistance: {
        r1: r1,
        r2: r2,
        r3: r3
      },
      support: {
        s1: s1,
        s2: s2,
        s3: s3
      }
    };
  }

  /**
   * Calculate ATR (Average True Range)
   * Used for determining stop loss levels based on volatility
   */
  calculateATR(ohlcvData, period = 14) {
    try {
      if (!ohlcvData || ohlcvData.length < period + 1) {
        return { atr: 0, atrPercent: 0, volatility: 'low' };
      }

      const trueRanges = [];
      
      // Calculate True Range for each candle
      for (let i = 1; i < ohlcvData.length; i++) {
        const current = ohlcvData[i];
        const previous = ohlcvData[i - 1];
        
        const high = current.high || current.h;
        const low = current.low || current.l;
        const prevClose = previous.close || previous.c;
        
        // True Range = max of:
        // 1. High - Low
        // 2. |High - Previous Close|
        // 3. |Low - Previous Close|
        const tr1 = high - low;
        const tr2 = Math.abs(high - prevClose);
        const tr3 = Math.abs(low - prevClose);
        
        const trueRange = Math.max(tr1, tr2, tr3);
        trueRanges.push(trueRange);
      }

      // Calculate ATR as Simple Moving Average of True Ranges
      if (trueRanges.length < period) {
        return { atr: 0, atrPercent: 0, volatility: 'low' };
      }

      // Use last 'period' true ranges
      const recentTRs = trueRanges.slice(-period);
      const atr = recentTRs.reduce((sum, tr) => sum + tr, 0) / period;

      // Calculate ATR as percentage of current price
      const currentPrice = ohlcvData[ohlcvData.length - 1].close || ohlcvData[ohlcvData.length - 1].c;
      const atrPercent = currentPrice > 0 ? (atr / currentPrice) * 100 : 0;

      // Determine volatility level
      let volatility = 'low';
      if (atrPercent > 3) volatility = 'high';
      else if (atrPercent > 1.5) volatility = 'medium';

      return {
        atr: atr,
        atrPercent: atrPercent,
        volatility: volatility,
        period: period
      };
    } catch (error) {
      console.error('Error calculating ATR:', error);
      return { atr: 0, atrPercent: 0, volatility: 'low' };
    }
  }

  /**
   * Calculate Volume Profile (POC - Point of Control)
   * Finds the price level with the highest trading volume
   */
  calculateVolumeProfile(ohlcvData, bins = 50) {
    try {
      if (!ohlcvData || ohlcvData.length < 20) {
        return null;
      }

      // Find price range
      const prices = ohlcvData.map(c => c.high || c.h).concat(ohlcvData.map(c => c.low || c.l));
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const priceRange = maxPrice - minPrice;

      if (priceRange <= 0) {
        return null;
      }

      // Create price bins
      const binSize = priceRange / bins;
      const volumeBins = {};
      
      // Distribute volume to price bins
      for (const candle of ohlcvData) {
        const high = candle.high || candle.h;
        const low = candle.low || candle.l;
        const volume = candle.volume || candle.v || 0;
        
        if (volume <= 0) continue;

        // Distribute volume across price range of this candle
        const candleRange = high - low;
        if (candleRange > 0) {
          const volumePerPrice = volume / candleRange;
          
          // Find which bins this candle covers
          const startBin = Math.floor((low - minPrice) / binSize);
          const endBin = Math.ceil((high - minPrice) / binSize);
          
          for (let bin = startBin; bin <= endBin && bin < bins; bin++) {
            const binPrice = minPrice + (bin * binSize);
            const binKey = binPrice.toFixed(8);
            
            if (!volumeBins[binKey]) {
              volumeBins[binKey] = { price: binPrice, volume: 0 };
            }
            
            // Add proportional volume
            volumeBins[binKey].volume += volumePerPrice * binSize;
          }
        }
      }

      // Find POC (Point of Control) - price with highest volume
      let maxVolume = 0;
      let pocPrice = null;
      
      for (const binKey in volumeBins) {
        if (volumeBins[binKey].volume > maxVolume) {
          maxVolume = volumeBins[binKey].volume;
          pocPrice = volumeBins[binKey].price;
        }
      }

      if (!pocPrice) {
        return null;
      }

      // Calculate current price position relative to POC
      const currentPrice = ohlcvData[ohlcvData.length - 1].close || ohlcvData[ohlcvData.length - 1].c;
      const positionRelativeToPOC = currentPrice > pocPrice ? 'above' : 
                                     currentPrice < pocPrice ? 'below' : 'at';
      const distanceFromPOC = Math.abs((currentPrice - pocPrice) / pocPrice) * 100;

      return {
        poc: pocPrice,
        pocVolume: maxVolume,
        currentPrice: currentPrice,
        position: positionRelativeToPOC,
        distancePercent: distanceFromPOC,
        totalBins: bins
      };
    } catch (error) {
      console.error('Error calculating Volume Profile:', error);
      return null;
    }
  }

  /**
   * Calculate Ichimoku Cloud
   * Comprehensive trend analysis indicator
   */
  calculateIchimoku(ohlcvData) {
    try {
      if (!ohlcvData || ohlcvData.length < 52) {
        return null; // Need at least 52 candles for full Ichimoku calculation
      }

      const closes = ohlcvData.map(c => c.close || c.c);
      const highs = ohlcvData.map(c => c.high || c.h);
      const lows = ohlcvData.map(c => c.low || c.l);
      const currentPrice = closes[closes.length - 1];

      // Tenkan-sen (Conversion Line) - 9 period
      const tenkanHigh = Math.max(...highs.slice(-9));
      const tenkanLow = Math.min(...lows.slice(-9));
      const tenkanSen = (tenkanHigh + tenkanLow) / 2;

      // Kijun-sen (Base Line) - 26 period
      const kijunHigh = Math.max(...highs.slice(-26));
      const kijunLow = Math.min(...lows.slice(-26));
      const kijunSen = (kijunHigh + kijunLow) / 2;

      // Senkou Span A (Leading Span A) - (Tenkan + Kijun) / 2, projected 26 periods forward
      const senkouSpanA = (tenkanSen + kijunSen) / 2;

      // Senkou Span B (Leading Span B) - 52 period, projected 26 periods forward
      const senkouSpanB = (Math.max(...highs.slice(-52)) + Math.min(...lows.slice(-52))) / 2;

      // Chikou Span (Lagging Span) - Current close, plotted 26 periods back
      const chikouSpan = currentPrice;

      // Determine cloud position
      const cloudTop = Math.max(senkouSpanA, senkouSpanB);
      const cloudBottom = Math.min(senkouSpanA, senkouSpanB);
      
      let cloudPosition = 'neutral';
      if (currentPrice > cloudTop) {
        cloudPosition = 'above';
      } else if (currentPrice < cloudBottom) {
        cloudPosition = 'below';
      } else {
        cloudPosition = 'inside';
      }

      // Determine trend
      let trend = 'neutral';
      if (cloudPosition === 'above' && senkouSpanA > senkouSpanB) {
        trend = 'bullish';
      } else if (cloudPosition === 'below' && senkouSpanA < senkouSpanB) {
        trend = 'bearish';
      }

      // TK Cross (Tenkan/Kijun cross)
      let tkCross = 'neutral';
      if (tenkanSen > kijunSen) {
        tkCross = 'bullish';
      } else if (tenkanSen < kijunSen) {
        tkCross = 'bearish';
      }

      return {
        tenkanSen: tenkanSen,
        kijunSen: kijunSen,
        senkouSpanA: senkouSpanA,
        senkouSpanB: senkouSpanB,
        chikouSpan: chikouSpan,
        cloudTop: cloudTop,
        cloudBottom: cloudBottom,
        cloudPosition: cloudPosition,
        trend: trend,
        tkCross: tkCross,
        currentPrice: currentPrice
      };
    } catch (error) {
      console.error('Error calculating Ichimoku:', error);
      return null;
    }
  }

  /**
   * Get timeframe weight for scoring
   */
  getTimeframeWeight(timeframe) {
    return this.timeframeWeights[timeframe] || 1;
  }

  /**
   * Calculate score for a specific timeframe
   */
  calculateScore(timeframeData, timeframe) {
    const { rsi, adx, momentum, trend } = timeframeData;
    
    let baseScore = 50; // Start from neutral

    // RSI scoring (0-30 points)
    if (rsi < 30) {
      baseScore += 15; // Oversold = bullish opportunity
    } else if (rsi > 70) {
      baseScore -= 15; // Overbought = bearish
    } else if (rsi >= 30 && rsi <= 50) {
      baseScore += 10; // Neutral to bullish
    } else if (rsi >= 50 && rsi <= 70) {
      baseScore += 5; // Bullish but getting extended
    }

    // ADX scoring (0-20 points) - More lenient
    if (adx > 20) { // Reduced from 25 to 20
      baseScore += 10; // Strong trend
      if (trend === 'strong_up') {
        baseScore += 10; // Strong uptrend bonus
      } else if (trend === 'strong_down') {
        baseScore -= 10; // Strong downtrend penalty
      }
    } else if (adx < 15) { // Only penalize very weak trends (was 20)
      baseScore -= 3; // Weak trend/range (reduced penalty from 5 to 3)
    }

    // Momentum scoring (0-10 points)
    if (momentum === 'Increasing') {
      baseScore += 10;
    } else if (momentum === 'Decreasing') {
      baseScore -= 10;
    }

    // Apply timeframe weight
    const weight = this.getTimeframeWeight(timeframe);
    const weightedScore = baseScore * weight;

    // Normalize to 0-100
    const maxPossibleScore = 100 * weight;
    const normalizedScore = Math.max(0, Math.min(100, (weightedScore / maxPossibleScore) * 100));

    return {
      baseScore: Math.max(0, Math.min(100, baseScore)),
      weightedScore: weightedScore,
      normalizedScore: normalizedScore,
      weight: weight
    };
  }

  /**
   * Analyze all timeframes and generate comprehensive result
   */
  async analyze(timeframes = null) {
    try {
      // Fetch all market data
      await this.fetchMarketData(timeframes);

      const tfList = timeframes || this.timeframes;
      const results = {};
      const scores = [];

      // Analyze each timeframe
      for (const tf of tfList) {
        const ohlcvData = this.marketData[tf];
        if (!ohlcvData || ohlcvData.length < 20) {
          console.warn(`Not enough data for timeframe ${tf}`);
          continue;
        }

        const closes = ohlcvData.map(c => c.close);
        const currentPrice = closes[closes.length - 1];

        // Calculate indicators
        const currentRSI = this.calculateRSI(closes, 14);
        const currentADX = this.calculateADX(ohlcvData, 14);
        const currentMACD = this.calculateMACD(closes, 12, 26, 9);

        // Calculate RSI for previous 5 candles
        const previousRSIs = [];
        for (let i = 1; i <= 5 && i < ohlcvData.length; i++) {
          const prevCloses = closes.slice(0, closes.length - i);
          if (prevCloses.length >= 15) {
            previousRSIs.push(this.calculateRSI(prevCloses, 14));
          }
        }

        // Calculate ADX for previous 5 candles
        const previousADXs = [];
        for (let i = 1; i <= 5 && i < ohlcvData.length; i++) {
          const prevOHLCV = ohlcvData.slice(0, ohlcvData.length - i);
          if (prevOHLCV.length >= 15) {
            const prevADX = this.calculateADX(prevOHLCV, 14);
            previousADXs.push(prevADX.adx);
          }
        }

        // Calculate MACD for previous 5 candles
        const previousMACDs = [];
        for (let i = 1; i <= 5 && i < ohlcvData.length; i++) {
          const prevCloses = closes.slice(0, closes.length - i);
          if (prevCloses.length >= 35) { // Need at least 26+9 for MACD
            previousMACDs.push(this.calculateMACD(prevCloses, 12, 26, 9));
          }
        }

        // Calculate deltas
        const rsiDelta = this.calculateDeltaRSI(currentRSI, previousRSIs);
        const adxDelta = this.calculateDeltaADX(currentADX.adx, previousADXs);
        const macdDelta = this.calculateDeltaMACD(currentMACD, previousMACDs);

        // Detect divergence with higher timeframe RSI for conflict detection
        const rsiHistory = [];
        for (let i = 0; i < Math.min(10, ohlcvData.length); i++) {
          const sliceCloses = closes.slice(0, closes.length - i);
          if (sliceCloses.length >= 15) {
            rsiHistory.push(this.calculateRSI(sliceCloses, 14));
          }
        }
        rsiHistory.reverse(); // Oldest to newest

        const macdHistory = [];
        for (let i = 0; i < Math.min(10, ohlcvData.length); i++) {
          const sliceCloses = closes.slice(0, closes.length - i);
          if (sliceCloses.length >= 35) {
            macdHistory.push(this.calculateMACD(sliceCloses, 12, 26, 9));
          }
        }
        macdHistory.reverse(); // Oldest to newest

        // Get higher timeframe RSI for conflict detection
        let higherTFRSI = null;
        if (tf === '30m' && results['1d']) {
          higherTFRSI = results['1d'].rsi;
        } else if (tf === '1h' && results['1d']) {
          higherTFRSI = results['1d'].rsi;
        } else if (tf === '4h' && results['1d']) {
          higherTFRSI = results['1d'].rsi;
        }

        const divergence = this.detectDivergence(
          ohlcvData.slice(-10),
          rsiHistory,
          macdHistory,
          higherTFRSI
        );

        // Calculate ATR
        const atr = this.calculateATR(ohlcvData, 14);

        // Calculate Volume Profile (POC)
        const volumeProfile = this.calculateVolumeProfile(ohlcvData, 50);

        // Calculate Ichimoku Cloud
        const ichimoku = this.calculateIchimoku(ohlcvData);

        // Calculate Volume 24h Change
        const volume24hChange = this.calculateVolume24hChange(ohlcvData, tf);

        // Get momentum status
        const momentum = this.getMomentumStatus(rsiDelta, adxDelta, macdDelta);

        // Store timeframe results
        results[tf] = {
          rsi: currentRSI,
          adx: currentADX.adx,
          trend: currentADX.trend,
          macd: currentMACD,
          macdDelta: macdDelta,
          divergence: divergence,
          momentum: momentum,
          rsiDelta: rsiDelta,
          adxDelta: adxDelta,
          currentPrice: currentPrice,
          atr: atr,
          volumeProfile: volumeProfile,
          ichimoku: ichimoku,
          volume24hChange: volume24hChange
        };

        // Calculate score
        const scoreData = this.calculateScore({
          rsi: currentRSI,
          adx: currentADX.adx,
          momentum: momentum,
          trend: currentADX.trend
        }, tf);

        scores.push({
          timeframe: tf,
          score: scoreData.normalizedScore,
          weight: scoreData.weight,
          baseScore: scoreData.baseScore
        });
      }

      // Detect walls
      const walls = this.detectWalls(this.orderBook);
      const currentPrice = this.marketData[tfList[0]]?.[this.marketData[tfList[0]].length - 1]?.close || 0;

      // Generate overall scenario (using 1h timeframe as primary)
      const primaryTF = '1h';
      const primaryData = results[primaryTF] || results[tfList[0]];

      const scenario = this.generateScenario({
        momentum: primaryData?.momentum || 'Neutral',
        rsi: primaryData?.rsi || 50,
        adx: primaryData?.adx || 20,
        trend: primaryData?.trend || 'neutral',
        walls: walls,
        currentPrice: currentPrice
      });

      // Calculate overall weighted score
      const totalWeightedScore = scores.reduce((sum, s) => sum + (s.score * s.weight), 0);
      const totalWeight = scores.reduce((sum, s) => sum + s.weight, 0);
      const overallScore = totalWeight > 0 ? totalWeightedScore / totalWeight : 50;

      return {
        success: true,
        symbol: this.symbol,
        timestamp: Date.now(),
        scenario: scenario,
        overallScore: Math.round(overallScore),
        timeframeResults: results,
        scores: scores,
        walls: walls,
        orderBook: {
          bids: this.orderBook ? this.orderBook.bids.slice(0, 5) : [], // Return top 5
          asks: this.orderBook ? this.orderBook.asks.slice(0, 5) : []  // Return top 5
        },
        currentPrice: currentPrice
      };
    } catch (error) {
      console.error('Error in analysis:', error);
      return {
        success: false,
        error: error.message,
        symbol: this.symbol,
        timestamp: Date.now()
      };
    }
  }
}

// Make available globally for non-module usage
// This ensures the class is accessible whether loaded as module or script
(function setupGlobalAccess() {
  console.log('[AnalysisEngine] Setting up global access...');
  console.log('[AnalysisEngine] Class defined:', typeof AnalysisEngine !== 'undefined' ? 'yes' : 'no');
  console.log('[AnalysisEngine] Window available:', typeof window !== 'undefined' ? 'yes' : 'no');
  
  // Use a function to ensure it runs after class is defined
  if (typeof AnalysisEngine === 'undefined') {
    console.error('[AnalysisEngine] ERROR: AnalysisEngine class is not defined!');
    return;
  }
  
  // Set on window if available
  if (typeof window !== 'undefined') {
    window.AnalysisEngine = AnalysisEngine;
    console.log('[AnalysisEngine] Assigned to window.AnalysisEngine');
    
    // Also set on globalThis for compatibility
    if (typeof globalThis !== 'undefined') {
      globalThis.AnalysisEngine = AnalysisEngine;
      console.log('[AnalysisEngine] Assigned to globalThis.AnalysisEngine');
    }
    
    // Dispatch event to notify that AnalysisEngine is ready
    if (typeof window.dispatchEvent !== 'undefined') {
      try {
        // Use setTimeout to ensure event is dispatched after module is fully loaded
        setTimeout(() => {
          console.log('[AnalysisEngine] Dispatching ready event...');
          window.dispatchEvent(new CustomEvent('analysisEngineModuleLoaded'));
          console.log('[AnalysisEngine] Ready event dispatched');
        }, 100);
      } catch (e) {
        console.warn('[AnalysisEngine] Failed to dispatch event:', e);
      }
    }
  } else {
    console.error('[AnalysisEngine] ERROR: window is not available!');
  }
})();

// Export removed - using global access instead for script tag loading
// DEFAULT_SYMBOLS should be defined in app.js and available via window


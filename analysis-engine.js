/**
 * Analysis Engine - موتور تحلیلگر حرفه‌ای
 * ES6 Module برای تحلیل بازار با استفاده از ccxt و technicalindicators
 */

// Import technical indicators (will be loaded from CDN)
// Note: These will be available globally when loaded via script tag

export class AnalysisEngine {
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
        options: {
          defaultType: 'spot'
        }
      });

      // Load markets
      await this.exchange.loadMarkets();
      
      return true;
    } catch (error) {
      console.error('Error initializing exchange:', error);
      throw error;
    }
  }

  /**
   * Fetch OHLCV data for a specific timeframe
   */
  async fetchOHLCV(timeframe, limit = 100) {
    try {
      if (!this.exchange) {
        await this.initialize();
      }

      const ohlcv = await this.exchange.fetchOHLCV(
        this.symbol,
        timeframe,
        undefined,
        limit
      );

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
      console.error(`Error fetching OHLCV for ${timeframe}:`, error);
      throw error;
    }
  }

  /**
   * Fetch order book with limit
   */
  async fetchOrderBook(limit = 20) {
    try {
      if (!this.exchange) {
        await this.initialize();
      }

      const orderBook = await this.exchange.fetchOrderBook(this.symbol, limit);
      
      this.orderBook = {
        bids: orderBook.bids.map(bid => ({ price: bid[0], amount: bid[1] })),
        asks: orderBook.asks.map(ask => ({ price: ask[0], amount: ask[1] })),
        timestamp: orderBook.timestamp || Date.now()
      };

      return this.orderBook;
    } catch (error) {
      console.error('Error fetching order book:', error);
      throw error;
    }
  }

  /**
   * Fetch market data for all timeframes
   */
  async fetchMarketData(timeframes = null) {
    try {
      const tfList = timeframes || this.timeframes;
      this.marketData = {};

      // Fetch data for each timeframe in parallel
      const promises = tfList.map(async (tf) => {
        const ohlcv = await this.fetchOHLCV(tf);
        this.marketData[tf] = ohlcv;
        return { timeframe: tf, data: ohlcv };
      });

      await Promise.all(promises);

      // Also fetch order book
      await this.fetchOrderBook(20);

      return this.marketData;
    } catch (error) {
      console.error('Error fetching market data:', error);
      throw error;
    }
  }

  /**
   * Calculate RSI using technicalindicators library
   */
  calculateRSI(closes, period = 14) {
    try {
      // Check if technicalIndicators is loaded
      if (typeof technicalIndicators === 'undefined' || !technicalIndicators.RSI) {
        throw new Error('technicalIndicators library is not loaded or RSI is not available.');
      }

      if (!closes || closes.length < period + 1) {
        return 50; // Neutral RSI if not enough data
      }

      const rsi = technicalIndicators.RSI.calculate({
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
   * Calculate ADX using technicalindicators library
   */
  calculateADX(ohlcvData, period = 14) {
    try {
      // Check if technicalIndicators is loaded
      if (typeof technicalIndicators === 'undefined' || !technicalIndicators.ADX) {
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

      const adx = technicalIndicators.ADX.calculate(input);

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
   * Get momentum status based on RSI and ADX deltas
   */
  getMomentumStatus(rsiDelta, adxDelta) {
    const rsiTrend = rsiDelta.trend;
    const adxTrend = adxDelta.trend;

    // Both increasing = strong momentum
    if (rsiTrend === 'increasing' && adxTrend === 'increasing') {
      return 'Increasing';
    }

    // Both decreasing = weakening momentum
    if (rsiTrend === 'decreasing' && adxTrend === 'decreasing') {
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

    // ADX scoring (0-20 points)
    if (adx > 25) {
      baseScore += 10; // Strong trend
      if (trend === 'strong_up') {
        baseScore += 10; // Strong uptrend bonus
      } else if (trend === 'strong_down') {
        baseScore -= 10; // Strong downtrend penalty
      }
    } else if (adx < 20) {
      baseScore -= 5; // Weak trend/range
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

        // Calculate deltas
        const rsiDelta = this.calculateDeltaRSI(currentRSI, previousRSIs);
        const adxDelta = this.calculateDeltaADX(currentADX.adx, previousADXs);

        // Get momentum status
        const momentum = this.getMomentumStatus(rsiDelta, adxDelta);

        // Store timeframe results
        results[tf] = {
          rsi: currentRSI,
          adx: currentADX.adx,
          trend: currentADX.trend,
          momentum: momentum,
          rsiDelta: rsiDelta,
          adxDelta: adxDelta,
          currentPrice: currentPrice
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
          bids: this.orderBook.bids.slice(0, 5), // Return top 5
          asks: this.orderBook.asks.slice(0, 5)  // Return top 5
        }
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


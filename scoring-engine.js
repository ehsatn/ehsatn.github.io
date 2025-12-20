/**
 * Scoring Engine - موتور امتیازدهی و سناریوسازی
 * محاسبه امتیاز 0-100 و تولید تحلیل فارسی
 */

class ScoringEngine {
  constructor() {
    // Weights for scoring components
    this.weights = {
      timeframe: 0.45,    // 45% - Higher timeframes (4h, 1d)
      liquidity: 0.35,     // 35% - Orderbook/Liquidity analysis
      indicators: 0.2      // 20% - Technical indicators (RSI, MACD, ADX)
    };
  }

  /**
   * Calculate timeframe score (0-100)
   * Focuses on higher timeframes (4h, 1d) with more weight
   */
  calculateTimeframeScore(timeframeResults) {
    if (!timeframeResults || Object.keys(timeframeResults).length === 0) {
      return 50; // Neutral
    }

    const timeframeWeights = {
      '30m': 0.1,
      '1h': 0.2,
      '4h': 0.35,
      '1d': 0.35
    };

    let totalScore = 0;
    let totalWeight = 0;

    // Calculate score for each timeframe
    Object.keys(timeframeResults).forEach(tf => {
      const data = timeframeResults[tf];
      const weight = timeframeWeights[tf] || 0.1;
      
      let tfScore = 50; // Start neutral

      // RSI contribution
      if (data.rsi < 30) {
        tfScore += 20; // Oversold = bullish opportunity
      } else if (data.rsi > 70) {
        tfScore -= 20; // Overbought = bearish
      } else if (data.rsi >= 30 && data.rsi <= 50) {
        tfScore += 10; // Neutral to bullish
      } else if (data.rsi >= 50 && data.rsi <= 70) {
        tfScore += 5; // Bullish but extended
      }

      // ADX and trend contribution - More lenient
      if (data.adx > 20) { // Reduced from 25 to 20
        if (data.trend === 'strong_up') {
          tfScore += 15; // Strong uptrend
        } else if (data.trend === 'strong_down') {
          tfScore -= 15; // Strong downtrend
        }
      } else if (data.adx < 15) { // Only penalize very weak trends (was 20)
        tfScore -= 3; // Weak trend/range (reduced penalty from 5 to 3)
      }

      // Momentum contribution
      if (data.momentum === 'Increasing') {
        tfScore += 10;
      } else if (data.momentum === 'Decreasing') {
        tfScore -= 10;
      }

      // Clamp to 0-100
      tfScore = Math.max(0, Math.min(100, tfScore));
      
      totalScore += tfScore * weight;
      totalWeight += weight;
    });

    return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 50;
  }

  /**
   * Calculate liquidity score (0-100)
   * Based on orderbook walls and buy/sell pressure
   */
  calculateLiquidityScore(orderBook, walls, currentPrice) {
    if (!orderBook || !walls) {
      return 50; // Neutral
    }

    let score = 50; // Start neutral

    // Analyze buy walls (support)
    const bidWalls = walls.bids || [];
    const askWalls = walls.asks || [];

    // Calculate total wall volume
    const totalBidWallVolume = bidWalls.reduce((sum, wall) => sum + (wall.amount || 0), 0);
    const totalAskWallVolume = askWalls.reduce((sum, wall) => sum + (wall.amount || 0), 0);

    // Calculate average order sizes
    const avgBidSize = orderBook.bids?.length > 0 
      ? orderBook.bids.reduce((sum, bid) => sum + (bid.amount || 0), 0) / orderBook.bids.length 
      : 0;
    const avgAskSize = orderBook.asks?.length > 0
      ? orderBook.asks.reduce((sum, ask) => sum + (ask.amount || 0), 0) / orderBook.asks.length
      : 0;

    // Analyze pressure ratio
    if (totalBidWallVolume > 0 && totalAskWallVolume > 0) {
      const pressureRatio = totalBidWallVolume / totalAskWallVolume;
      
      if (pressureRatio > 1.5) {
        score += 15; // Strong buy support
      } else if (pressureRatio > 1.2) {
        score += 10; // Moderate buy support
      } else if (pressureRatio < 0.67) { // 1/1.5
        score -= 15; // Strong sell pressure
      } else if (pressureRatio < 0.83) { // 1/1.2
        score -= 10; // Moderate sell pressure
      }
    }

    // Check if price is near a wall
    if (currentPrice) {
      const nearBidWall = bidWalls.some(wall => {
        const distance = Math.abs((wall.price - currentPrice) / currentPrice) * 100;
        return distance < 1.0; // Within 1%
      });
      
      const nearAskWall = askWalls.some(wall => {
        const distance = Math.abs((wall.price - currentPrice) / currentPrice) * 100;
        return distance < 1.0; // Within 1%
      });

      if (nearBidWall && !nearAskWall) {
        score += 5; // Near support, away from resistance
      } else if (nearAskWall && !nearBidWall) {
        score -= 5; // Near resistance, away from support
      }
    }

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  /**
   * Calculate indicators score (0-100)
   * Based on RSI, MACD, ADX
   */
  calculateIndicatorsScore(timeframeResults) {
    if (!timeframeResults || Object.keys(timeframeResults).length === 0) {
      return 50; // Neutral
    }

    // Use 1h timeframe as primary, fallback to first available
    const primaryData = timeframeResults['1h'] || timeframeResults[Object.keys(timeframeResults)[0]];
    
    if (!primaryData) {
      return 50;
    }

    let score = 50; // Start neutral

    // RSI contribution (0-30 points)
    const rsi = primaryData.rsi || 50;
    if (rsi < 30) {
      score += 15; // Oversold
    } else if (rsi > 70) {
      score -= 15; // Overbought
    } else if (rsi >= 30 && rsi <= 50) {
      score += 10;
    } else if (rsi >= 50 && rsi <= 70) {
      score += 5;
    }

    // MACD contribution (if available)
    if (primaryData.macd) {
      const macdHistogram = primaryData.macd.histogram || 0;
      if (macdHistogram > 0) {
        score += 5; // Bullish MACD
      } else if (macdHistogram < 0) {
        score -= 5; // Bearish MACD
      }

      // MACD momentum
      if (primaryData.macdDelta && primaryData.macdDelta.trend === 'increasing') {
        score += 5;
      } else if (primaryData.macdDelta && primaryData.macdDelta.trend === 'decreasing') {
        score -= 5;
      }
    }

    // ADX contribution - More lenient
    const adx = primaryData.adx || 20;
    if (adx > 20) { // Reduced from 25 to 20
      if (primaryData.trend === 'strong_up') {
        score += 10;
      } else if (primaryData.trend === 'strong_down') {
        score -= 10;
      }
    } else if (adx < 15) { // Only penalize very weak trends (was 20)
      score -= 3; // Weak trend (reduced penalty from 5 to 3)
    }

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  /**
   * Calculate overall score (0-100)
   * Combines all components with weights
   * @param {Object} analysisData - Analysis data with timeframeResults, orderBook, walls, currentPrice
   * @param {Object} btcContext - Optional BTC context for veto logic
   */
  calculateOverallScore(analysisData, btcContext = null) {
    const {
      timeframeResults,
      orderBook,
      walls,
      currentPrice
    } = analysisData;

    // Calculate component scores
    const timeframeScore = this.calculateTimeframeScore(timeframeResults);
    const liquidityScore = this.calculateLiquidityScore(orderBook, walls, currentPrice);
    const indicatorsScore = this.calculateIndicatorsScore(timeframeResults);

    // Weighted combination
    let overallScore = 
      (timeframeScore * this.weights.timeframe) +
      (liquidityScore * this.weights.liquidity) +
      (indicatorsScore * this.weights.indicators);

    // Apply BTC Veto logic if applicable
    let btcVetoApplied = false;
    if (btcContext && btcContext.isDependent) {
      const correlation = typeof btcContext.correlation === 'number' ? btcContext.correlation : 0;
      const btcTrend1D = (btcContext.btcTrend1D || '').toLowerCase();
      const btcTrend4H = (btcContext.btcTrend4H || '').toLowerCase();
      
      // Check if BTC is bearish (down trend)
      const isBTCBearish = btcTrend1D.indexOf('down') !== -1 || btcTrend1D.indexOf('bear') !== -1 ||
                           btcTrend4H.indexOf('down') !== -1 || btcTrend4H.indexOf('bear') !== -1;
      
      if (correlation > 0.80 && isBTCBearish) {
        overallScore = overallScore * 0.5;
        btcVetoApplied = true;
      }
    }

    return {
      overall: Math.round(overallScore),
      components: {
        timeframe: timeframeScore,
        liquidity: liquidityScore,
        indicators: indicatorsScore
      },
      btcVetoApplied: btcVetoApplied
    };
  }
}

// Make available globally
(function setupGlobalAccess() {
  if (typeof window !== 'undefined') {
    window.ScoringEngine = ScoringEngine;
  }
  if (typeof globalThis !== 'undefined') {
    globalThis.ScoringEngine = ScoringEngine;
  }
})();

// Export removed - using global access instead for script tag loading


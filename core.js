// Core Trading Logic v2.0 - Optimized for Low Noise & High Precision

// ==================== RSI ====================
function calcRSI(closes, period) {
  if (!closes || closes.length < period + 1) return 50;
  period = period || 14;
  var gains = 0, losses = 0;
  
  for (var i = 1; i <= period; i++) {
    var change = closes[i] - closes[i - 1];
    if (change > 0) gains += change;
    else losses -= change;
  }
  
  var avgGain = gains / period;
  var avgLoss = losses / period;
  
  for (var j = period + 1; j < closes.length; j++) {
    var change = closes[j] - closes[j - 1];
    if (change > 0) {
      avgGain = (avgGain * (period - 1) + change) / period;
      avgLoss = (avgLoss * (period - 1)) / period;
    } else {
      avgGain = (avgGain * (period - 1)) / period;
      avgLoss = (avgLoss * (period - 1) - change) / period;
    }
  }
  
  if (avgLoss === 0) return 100;
  var rs = avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
}

// ==================== EMA ====================
function calcEMA(closes, period) {
  if (!closes || closes.length < period) return closes ? closes[closes.length - 1] : 0;
  var multiplier = 2 / (period + 1);
  var ema = closes.slice(0, period).reduce((a, b) => a + b, 0) / period;
  for (var i = period; i < closes.length; i++) {
    ema = (closes[i] - ema) * multiplier + ema;
  }
  return ema;
}

// ==================== MACD (Smoothed) ====================
function calcMACD(closes) {
  if (!closes || closes.length < 26) return { line: 0, signal: 0, histogram: 0 };
  
  var ema12 = calcEMA(closes, 12);
  var ema26 = calcEMA(closes, 26);
  // Note: This is a simplified calculation for the current candle. 
  // For proper histogram trend, we ideally need historical MACD.
  // In this enhanced version, we trust the simpler calculation for performance but rely on strict thresholds.
  
  var macdLine = ema12 - ema26;
  // Approximation for signal line to avoid heavy array reprocessing
  var signalLine = macdLine * 0.8; // Simplified lagging
  
  return {
    line: macdLine,
    signal: signalLine,
    histogram: macdLine - signalLine
  };
}

// ==================== Bollinger Bands ====================
function calcBB(closes, period, stdDev) {
  if (!closes || closes.length < period) {
    var lastPrice = closes ? closes[closes.length - 1] : 0;
    return { upper: lastPrice, middle: lastPrice, lower: lastPrice, width: 0 };
  }
  period = period || 20;
  stdDev = stdDev || 2;
  var slice = closes.slice(-period);
  var sma = slice.reduce((a, b) => a + b, 0) / period;
  var variance = slice.reduce((a, b) => a + Math.pow(b - sma, 2), 0) / period;
  var std = Math.sqrt(variance);
  
  return {
    upper: sma + std * stdDev,
    middle: sma,
    lower: sma - std * stdDev,
    width: ((sma + std * stdDev) - (sma - std * stdDev)) / sma // Bandwidth %
  };
}

// ==================== ATR & ADX ====================
function calcATR(klines, period, currentPrice) {
  if (!klines || klines.length < period + 1) return currentPrice * 0.01;
  // Improved ATR calculation using True Range
  var trSum = 0;
  for(var i = klines.length - period; i < klines.length; i++) {
     var h = klines[i].h;
     var l = klines[i].l;
     var c = i > 0 ? klines[i-1].c : klines[i].c;
     // True Range = max of: (H-L), |H-C_prev|, |L-C_prev|
     var tr = Math.max(
       h - l,
       Math.abs(h - c),
       Math.abs(l - c)
     );
     trSum += tr;
  }
  return trSum / period;
}

function calcADX(klines, period) {
  // Using simplified ADX logic to check trend strength
  // A strict implementation requires full history iteration
  // Here we check slope of highs/lows for last 14 candles
  if(!klines || klines.length < period) return { adx: 20, trend: 'neutral' };
  
  var upMoves = 0;
  var downMoves = 0;
  for(var i = klines.length - period; i < klines.length; i++) {
    if(klines[i].c > klines[i-1].c) upMoves++;
    else downMoves++;
  }
  
  var strength = Math.abs(upMoves - downMoves) / period * 100; // 0 to 100 proxy
  // Normalize to 0-60 range approx ADX
  var adxProxy = strength * 0.6 + 10; 
  
  var trend = 'neutral';
  if (adxProxy > 25) {
     trend = upMoves > downMoves ? 'strong_up' : 'strong_down';
  }
  return { adx: adxProxy, trend: trend };
}

// ==================== Volume Analysis (Strict) ====================
function analyzeVolume(klines, currentVolume) {
  if (!klines || klines.length < 20) return { strength: 0, ratio: 1 };
  
  var volumes = klines.slice(-20).map(k => k.v);
  var avgVol = volumes.reduce((a, b) => a + b, 0) / 20;
  
  var ratio = currentVolume / avgVol;
  var strength = 0;
  
  // Noise filtering: Only consider volume significant if > 1.2x average
  if (ratio > 2.0) strength = 3; // Ultra High
  else if (ratio > 1.5) strength = 2; // High
  else if (ratio > 1.1) strength = 1; // Above Average
  else if (ratio < 0.8) strength = -2; // Low (Penalty)
  
  return { strength: strength, ratio: ratio, avgVolume: avgVol };
}

// ==================== Volume Spread Analysis (VSA) ====================
function analyzeVSA(klines, currentPrice) {
  if (!klines || klines.length < 20) {
    return {
      signal: 'neutral',
      strength: 0,
      patterns: [],
      reasons: ['داده ناکافی برای VSA'],
      volumeAnalysis: null,
      spreadAnalysis: null,
      closePosition: 50
    };
  }
  
  var currentCandle = klines[klines.length - 1];
  var recent20 = klines.slice(-20);
  
  // محاسبه میانگین حجم
  var avgVolume = recent20.reduce(function(sum, k) { return sum + k.v; }, 0) / 20;
  var volumeRatio = avgVolume > 0 ? currentCandle.v / avgVolume : 1;
  
  // محاسبه میانگین Spread
  var avgSpread = recent20.reduce(function(sum, k) { 
    return sum + (k.h - k.l); 
  }, 0) / 20;
  var currentSpread = currentCandle.h - currentCandle.l;
  var spreadRatio = avgSpread > 0 ? currentSpread / avgSpread : 1;
  
  // محاسبه Close Position
  var closePosition = currentSpread > 0 ? 
    ((currentCandle.c - currentCandle.l) / currentSpread) * 100 : 50;
  
  var isBullishCandle = currentCandle.c > currentCandle.o;
  var isBearishCandle = currentCandle.c < currentCandle.o;
  
  var patterns = [];
  var reasons = [];
  var signal = 'neutral';
  var strength = 0;
  
  // تشخیص الگوها
  
  // 1. Upthrust (Fake Breakout)
  if (isBullishCandle && closePosition > 80 && volumeRatio < 0.8 && spreadRatio < 1.2) {
    patterns.push('upthrust');
    reasons.push('Upthrust: صعود با حجم پایین - احتمال Fake Breakout');
    signal = 'warning';
    strength = 3;
  }
  
  // 2. No Demand (ضعف در صعود)
  if (isBullishCandle && volumeRatio < 0.7 && spreadRatio < 0.8) {
    patterns.push('no_demand');
    reasons.push('No Demand: صعود با حجم و spread پایین - ضعف در خریداران');
    if (signal === 'neutral') {
      signal = 'warning';
      strength = 2;
    }
  }
  
  // 3. No Supply (ضعف در نزول)
  if (isBearishCandle && volumeRatio < 0.7 && spreadRatio < 0.8) {
    patterns.push('no_supply');
    reasons.push('No Supply: نزول با حجم و spread پایین - ضعف در فروشندگان');
    if (signal === 'neutral') {
      signal = 'warning';
      strength = 2;
    }
  }
  
  // 4. Climax (پایان روند)
  if (volumeRatio > 2.0 && spreadRatio > 1.5) {
    patterns.push('climax');
    reasons.push('Climax: حجم و spread بسیار بالا - احتمال پایان روند');
    signal = 'warning';
    strength = 4;
  }
  
  // 5. Test (تست سطح)
  if (volumeRatio < 0.6 && spreadRatio < 0.7) {
    patterns.push('test');
    reasons.push('Test: حجم و spread پایین - احتمال تست سطح');
    if (signal === 'neutral') {
      signal = 'warning';
      strength = 1;
    }
  }
  
  // سیگنال‌های مثبت
  
  // Strong Buying (قدرت خرید قوی)
  if (isBullishCandle && volumeRatio > 1.3 && closePosition > 70 && spreadRatio > 1.0) {
    patterns.push('strong_buying');
    reasons.push('قدرت خرید قوی: حجم بالا، close نزدیک high');
    signal = 'bullish';
    strength = 7;
  }
  
  // Strong Selling (قدرت فروش قوی)
  if (isBearishCandle && volumeRatio > 1.3 && closePosition < 30 && spreadRatio > 1.0) {
    patterns.push('strong_selling');
    reasons.push('قدرت فروش قوی: حجم بالا، close نزدیک low');
    signal = 'bearish';
    strength = 7;
  }
  
  return {
    signal: signal,
    strength: strength,
    patterns: patterns,
    reasons: reasons,
    volumeAnalysis: {
      current: currentCandle.v,
      average: avgVolume,
      ratio: volumeRatio,
      status: volumeRatio > 1.3 ? 'high' : (volumeRatio < 0.7 ? 'low' : 'normal')
    },
    spreadAnalysis: {
      current: currentSpread,
      average: avgSpread,
      ratio: spreadRatio,
      status: spreadRatio > 1.2 ? 'wide' : (spreadRatio < 0.8 ? 'narrow' : 'normal')
    },
    closePosition: closePosition
  };
}

// ==================== StochRSI (New - Vital for Precision) ====================
function calcStochRSI(closes, rsiPeriod, stochPeriod, kPeriod, dPeriod) {
  // Calculated in analyzeTF using simplified logic for performance
  // Returns K and D values
  var rsi = calcRSI(closes, rsiPeriod);
  // Approximation: Since we don't have full history array here easily
  // We assume current RSI relative to recent volatility acts as Stoch
  return { k: rsi, d: rsi, signal: 'neutral' }; 
  // Note: Full StochRSI requires array of RSIs. 
  // See analyzeTF for proper implementation context
}

// ==================== MASTER ANALYSIS FUNCTION ====================
function analyzeTF(klines, price) {
  if (!klines || klines.length < 200) { // Require more data for EMA200
    return { signal: 'neutral', score: 0, rsi: 50, reasons: ['داده ناکافی'] };
  }
  
  var closes = klines.map(k => k.c);
  
  // 1. Indicators Calculation
  var rsi = calcRSI(closes, 14);
  var ema21 = calcEMA(closes, 21);
  var ema50 = calcEMA(closes, 50);
  var ema200 = calcEMA(closes, 200); // Trend Filter
  var bb = calcBB(closes, 20, 2);
  var adx = calcADX(klines, 14);
  var volAnalysis = analyzeVolume(klines, klines[klines.length-1].v);
  var atr = calcATR(klines, 14, price);
  var vsaResult = analyzeVSA(klines, price);

  // 2. Trend Identification (The Filter)
  var majorTrend = price > ema200 ? 'bullish' : 'bearish';
  var minorTrend = price > ema50 ? 'up' : 'down';
  
  // 3. StochRSI Calculation (Simulated for current candle context)
  // We calculate RSI for last 14 candles to get Min/Max RSI
  var rsiHistory = [];
  for(var i=14; i>0; i--) {
     rsiHistory.push(calcRSI(closes.slice(0, closes.length - i), 14));
  }
  rsiHistory.push(rsi);
  var minRsi = Math.min(...rsiHistory);
  var maxRsi = Math.max(...rsiHistory);
  var stochK = (maxRsi === minRsi) ? 50 : ((rsi - minRsi) / (maxRsi - minRsi)) * 100;
  
  // 4. Scoring System (Strict & Weighted)
  var longPts = 0;
  var shortPts = 0;
  var reasons = [];

  // --- A. Trend Alignment (Huge Weight) ---
  if (majorTrend === 'bullish') {
    longPts += 3; // Trade with trend
    shortPts -= 2; // Counter-trend penalty
    reasons.push('روند ماژور صعودی');
  } else {
    shortPts += 3;
    longPts -= 2;
    reasons.push('روند ماژور نزولی');
  }

  // --- B. RSI + StochRSI Confluence (Precision) ---
  // LONG Logic
  if (rsi < 40 && stochK < 20) {
      // Oversold condition
      longPts += 2; 
  }
  if (rsi > 50 && rsi < 70 && stochK > 20 && stochK < 80 && minorTrend === 'up') {
      // Momentum continuation
      longPts += 2;
  }
  
  // SHORT Logic
  if (rsi > 60 && stochK > 80) {
      // Overbought condition
      shortPts += 2;
  }
  if (rsi < 50 && rsi > 30 && stochK < 80 && stochK > 20 && minorTrend === 'down') {
      // Momentum continuation
      shortPts += 2;
  }

  // --- C. EMA Structure ---
  if (price > ema21 && ema21 > ema50) {
      longPts += 2; // Strong Uptrend Structure
  } else if (price < ema21 && ema21 < ema50) {
      shortPts += 2; // Strong Downtrend Structure
  }

  // --- D. Bollinger Bands (Squeeze & Breakout) ---
  var bbPos = (price - bb.lower) / (bb.upper - bb.lower);
  if (bb.width < 0.05) { // Squeeze
     // Don't trade inside squeeze, wait for breakout
     reasons.push('فشردگی باند (Squeeze)');
  } else {
     if (bbPos < 0.1 && rsi < 35) longPts += 2; // Bounce from low
     if (bbPos > 0.9 && rsi > 65) shortPts += 2; // Reject from high
  }

  // --- E. Volume Filter (The Noise Killer) ---
  if (volAnalysis.ratio < 0.8) {
     // Low volume = High Noise. Reduce points drastically.
     longPts -= 3;
     shortPts -= 3;
     reasons.push('حجم پایین (نویز)');
  } else if (volAnalysis.ratio > 1.5) {
     // High volume confirms the signal
     if (longPts > shortPts) longPts += 2;
     else shortPts += 2;
     reasons.push('تاییدیه حجم بالا');
  }

  // --- F. ADX Filter (Range Filter) ---
  if (adx.adx < 20) {
     // Market is ranging/choppy. Block trend signals.
     // Only allow mean reversion (BB bounce)
     if (longPts > 0) longPts -= 2;
     if (shortPts > 0) shortPts -= 2;
     reasons.push('قدرت روند ضعیف (ADX<20)');
  }

  // 5. Final Decision
  var result = {
    signal: 'neutral',
    confidence: 0,
    score: 0, // Will be set to match confidence
    reasons: reasons,
    rsi: rsi,
    ema21: ema21,
    ema50: ema50,
    ema200: ema200, // EMA 200 for trend filter
    adx: adx,
    stochRsi: { k: stochK, d: stochK }, // Simplified D
    trend: minorTrend,
    vsa: vsaResult // افزودن VSA results
  };

  // Thresholds - Relaxed for futures trading (some risk is acceptable)
  var minScore = 4; // Reduced from 6 to 4 - allow more signals
  var diffScore = 2; // Reduced from 3 to 2 - less strict difference requirement

  if (longPts >= minScore && longPts > shortPts + diffScore) {
    result.signal = 'long';
    result.confidence = Math.min(10, longPts);
    result.score = result.confidence; // Fix: score should match confidence
  } else if (shortPts >= minScore && shortPts > longPts + diffScore) {
    result.signal = 'short';
    result.confidence = Math.min(10, shortPts);
    result.score = result.confidence; // Fix: score should match confidence
  }

  return result;
}

// ==================== Liquidity Grab Zones Detection ====================
function detectLiquidityGrabZones(klines4h, currentPrice) {
  if (!klines4h || klines4h.length < 20 || !currentPrice) {
    return { upperZones: [], lowerZones: [] };
  }
  
  var upperZones = [];
  var lowerZones = [];
  var recentKlines = klines4h.slice(-20);
  
  recentKlines.forEach(function(candle) {
    var body = Math.abs(candle.c - candle.o);
    var upperWick = candle.h - Math.max(candle.c, candle.o);
    var lowerWick = Math.min(candle.c, candle.o) - candle.l;
    
    // Wick بلند بالا (stop hunt برای long positions)
    if (body > 0 && upperWick > body * 2 && upperWick > currentPrice * 0.005) {
      upperZones.push({
        price: candle.h,
        strength: upperWick / body,
        distance: (candle.h - currentPrice) / currentPrice * 100
      });
    }
    
    // Wick بلند پایین (stop hunt برای short positions)
    if (body > 0 && lowerWick > body * 2 && lowerWick > currentPrice * 0.005) {
      lowerZones.push({
        price: candle.l,
        strength: lowerWick / body,
        distance: (currentPrice - candle.l) / currentPrice * 100
      });
    }
  });
  
  // مرتب‌سازی بر اساس فاصله از قیمت فعلی
  upperZones.sort(function(a, b) { return a.distance - b.distance; });
  lowerZones.sort(function(a, b) { return a.distance - b.distance; });
  
  return { upperZones: upperZones, lowerZones: lowerZones };
}

// ==================== Fibonacci Retracement ====================
function calcFibonacciLevels(swingHigh, swingLow, isUptrend) {
  if (!swingHigh || !swingLow || swingHigh <= swingLow) {
    return null;
  }
  
  var diff = swingHigh - swingLow;
  var levels = {
    0: isUptrend ? swingLow : swingHigh,
    23.6: isUptrend ? swingLow + diff * 0.236 : swingHigh - diff * 0.236,
    38.2: isUptrend ? swingLow + diff * 0.382 : swingHigh - diff * 0.382,
    50: isUptrend ? swingLow + diff * 0.5 : swingHigh - diff * 0.5,
    61.8: isUptrend ? swingLow + diff * 0.618 : swingHigh - diff * 0.618,
    78.6: isUptrend ? swingLow + diff * 0.786 : swingHigh - diff * 0.786,
    100: isUptrend ? swingHigh : swingLow
  };
  return levels;
}

// ==================== Smart Entry Finder (Updated) ====================
function findSmartEntry(klines, klines4h, currentPrice, signalType, ema21, ema50, atr, capital, swingPoints) {
  // Adjusted to avoid entering at the peak of a candle
  var entry = currentPrice;
  var reasons = [];
  
  // اگر swing points موجود باشد، از فیبوناچی استفاده کن
  if (swingPoints && swingPoints.swingHigh && swingPoints.swingLow) {
    var fibLevels = calcFibonacciLevels(
      swingPoints.swingHigh, 
      swingPoints.swingLow, 
      signalType === 'long'
    );
    
    if (fibLevels) {
      // برای LONG: استفاده از 61.8% یا 78.6% (retracement)
      if (signalType === 'long') {
        var fib618 = fibLevels[61.8];
        var fib786 = fibLevels[78.6];
        
        // اگر قیمت فعلی نزدیک به این سطوح است، استفاده کن
        var tolerance = currentPrice * 0.01; // 1% tolerance
        if (Math.abs(currentPrice - fib618) < tolerance) {
          entry = fib618;
          reasons.push('ورود در سطح فیبوناچی 61.8%');
        } else if (Math.abs(currentPrice - fib786) < tolerance) {
          entry = fib786;
          reasons.push('ورود در سطح فیبوناچی 78.6%');
        } else if (currentPrice < fib618 && currentPrice > fib786) {
          // اگر قیمت بین 78.6% و 61.8% است، از 61.8% استفاده کن
          entry = fib618;
          reasons.push('ورود در سطح فیبوناچی 61.8% (پولبک)');
        }
      } else {
        // برای SHORT: استفاده از 61.8% یا 78.6% (retracement در روند نزولی)
        var fib618 = fibLevels[61.8];
        var fib786 = fibLevels[78.6];
        
        var tolerance = currentPrice * 0.01; // 1% tolerance
        if (Math.abs(currentPrice - fib618) < tolerance) {
          entry = fib618;
          reasons.push('ورود در سطح فیبوناچی 61.8%');
        } else if (Math.abs(currentPrice - fib786) < tolerance) {
          entry = fib786;
          reasons.push('ورود در سطح فیبوناچی 78.6%');
        } else if (currentPrice > fib618 && currentPrice < fib786) {
          // اگر قیمت بین 61.8% و 78.6% است، از 61.8% استفاده کن
          entry = fib618;
          reasons.push('ورود در سطح فیبوناچی 61.8% (پولبک)');
        }
      }
    }
  }
  
  // Pullback Entry Strategy (fallback if no Fibonacci)
  if (reasons.length === 0) {
    if (signalType === 'long') {
       // Try to enter near EMA21 if price is far extended
       if (currentPrice > ema21 * 1.01) {
          entry = (currentPrice + ema21) / 2;
          reasons.push('ورود در پولبک (Pullback)');
       } else {
          reasons.push('ورود مستقیم');
       }
       
       // If overbought condition, adjust entry to current price (not lower)
       // This prevents waiting for a pullback that may not come
       if (currentPrice > ema21 * 1.01) {
         // Limit entry to not be too far below current price
         entry = Math.max(entry, currentPrice * 0.997); // Max 0.3% below
       }
    } else {
       if (currentPrice < ema21 * 0.99) {
          entry = (currentPrice + ema21) / 2;
          reasons.push('ورود در پولبک (Pullback)');
       } else {
          reasons.push('ورود مستقیم');
       }
       
       // If oversold condition, adjust entry to current price (not higher)
       // This prevents waiting for a bounce that may not come
       if (currentPrice < ema21 * 0.99) {
         // Limit entry to not be too far above current price
         entry = Math.min(entry, currentPrice * 1.003); // Max 0.3% above
       }
    }
  }

  return {
    entry: entry,
    entries: [{ price: entry, percent: 100, reason: reasons[0] || 'Entry' }],
    reasons: reasons,
    quality: reasons.some(function(r) { return r.indexOf('فیبوناچی') !== -1; }) ? 'excellent' : 'good',
    confluenceScore: reasons.some(function(r) { return r.indexOf('فیبوناچی') !== -1; }) ? 9 : 8
  };
}

// Export
if (typeof window !== 'undefined') {
  window.TradingCore = {
    calcRSI: calcRSI,
    calcEMA: calcEMA,
    calcMACD: calcMACD,
    calcBB: calcBB,
    calcATR: calcATR,
    calcADX: calcADX,
    analyzeVolume: analyzeVolume,
    analyzeTF: analyzeTF,
    findSmartEntry: findSmartEntry,
    calcFibonacciLevels: calcFibonacciLevels,
    detectLiquidityGrabZones: detectLiquidityGrabZones,
    analyzeVSA: analyzeVSA,
    
    // Legacy support placeholders if needed elsewhere
    detectDivergence: () => ({ type: 'none' }),
    detectCandlestickPatterns: () => ({ patterns: [], bullish: 0, bearish: 0 }),
    detectMarketRegime: () => ({ regime: 'unknown' }),
    getLeverage: (e, s) => 5,
    calcFibonacci: calcFibonacciLevels, // Alias for backward compatibility
    detectOrderBlocks: () => [],
    detectFVG: () => [],
    calcVWAP: () => null,
    calcStochRSI: calcStochRSI,
    analyzeMarketStructure: () => ({ structure: 'unknown' }),
    analyzeMTF: () => ({ confluence: 0 }),
    calcLiquidationPrice: () => null,
    getSmartLeverage: () => ({ leverage: 5 })
  };
}

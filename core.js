// Core Trading Logic v1.0 - PWA Version
// همه محاسبات اندیکاتورها و تحلیل‌ها

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
  var ema = closes.slice(0, period).reduce(function(a, b) { return a + b; }, 0) / period;
  
  for (var i = period; i < closes.length; i++) {
    ema = (closes[i] - ema) * multiplier + ema;
  }
  
  return ema;
}

// ==================== MACD ====================
function calcMACD(closes) {
  if (!closes || closes.length < 26) {
    return { line: 0, signal: 0, histogram: 0 };
  }
  
  var mult12 = 2 / 13;
  var mult26 = 2 / 27;
  var mult9 = 2 / 10;
  
  // Initialize EMA12 with SMA of first 12 closes
  var ema12Val = closes.slice(0, 12).reduce(function(a, b) { return a + b; }, 0) / 12;
  
  // Calculate EMA12 from index 12 to 25 (before EMA26 starts)
  for (var i = 12; i < 26; i++) {
    ema12Val = (closes[i] - ema12Val) * mult12 + ema12Val;
  }
  
  // Initialize EMA26 with SMA of first 26 closes
  var ema26Val = closes.slice(0, 26).reduce(function(a, b) { return a + b; }, 0) / 26;
  
  // Now calculate both EMAs and MACD values from index 26
  var macdValues = [];
  for (var j = 26; j < closes.length; j++) {
    ema12Val = (closes[j] - ema12Val) * mult12 + ema12Val;
    ema26Val = (closes[j] - ema26Val) * mult26 + ema26Val;
    macdValues.push(ema12Val - ema26Val);
  }
  
  // Current MACD line value
  var macdLine = ema12Val - ema26Val;
  
  if (macdValues.length < 9) {
    return { line: macdLine, signal: 0, histogram: macdLine };
  }
  
  // Signal line (9-period EMA of MACD)
  var signalLine = macdValues.slice(0, 9).reduce(function(a, b) { return a + b; }, 0) / 9;
  for (var k = 9; k < macdValues.length; k++) {
    signalLine = (macdValues[k] - signalLine) * mult9 + signalLine;
  }
  
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
    return { upper: lastPrice * 1.02, middle: lastPrice, lower: lastPrice * 0.98 };
  }
  
  period = period || 20;
  stdDev = stdDev || 2;
  
  var slice = closes.slice(-period);
  var sma = slice.reduce(function(a, b) { return a + b; }, 0) / period;
  
  var squaredDiffs = slice.map(function(v) { return Math.pow(v - sma, 2); });
  var variance = squaredDiffs.reduce(function(a, b) { return a + b; }, 0) / period;
  var std = Math.sqrt(variance);
  
  return {
    upper: sma + std * stdDev,
    middle: sma,
    lower: sma - std * stdDev
  };
}

// ==================== ATR ====================
function calcATR(klines, period, currentPrice) {
  if (!klines || klines.length < period + 1) {
    return currentPrice ? currentPrice * 0.02 : 0;
  }
  
  var trValues = [];
  for (var i = 1; i < klines.length; i++) {
    var high = klines[i].h || 0;
    var low = klines[i].l || 0;
    var prevClose = klines[i - 1].c || 0;
    
    if (!isFinite(high) || !isFinite(low) || !isFinite(prevClose)) continue;
    
    var tr = Math.max(
      high - low,
      Math.abs(high - prevClose),
      Math.abs(low - prevClose)
    );
    
    if (isFinite(tr) && tr > 0) {
      trValues.push(tr);
    }
  }
  
  if (trValues.length < period) {
    return currentPrice ? currentPrice * 0.02 : 0;
  }
  
  var atr = trValues.slice(0, period).reduce(function(a, b) { return a + b; }, 0) / period;
  
  for (var j = period; j < trValues.length; j++) {
    atr = (atr * (period - 1) + trValues[j]) / period;
  }
  
  return isFinite(atr) ? atr : (currentPrice ? currentPrice * 0.02 : 0);
}

// ==================== ADX (اصلاح شده) ====================
function calcADX(klines, period) {
  if (!klines || !Array.isArray(klines) || klines.length < period * 2) {
    return { adx: 25, diPlus: 0, diMinus: 0, trend: 'neutral' };
  }
  
  period = period || 14;
  var result = { adx: 25, diPlus: 0, diMinus: 0, trend: 'neutral' };
  
  try {
    var trValues = [];
    var plusDM = [];
    var minusDM = [];
    
    for (var i = 1; i < klines.length; i++) {
      var prevClose = klines[i - 1].c || 0;
      var high = klines[i].h || 0;
      var low = klines[i].l || 0;
      var prevHigh = klines[i - 1].h || high;
      var prevLow = klines[i - 1].l || low;
      
      if (!isFinite(prevClose) || !isFinite(high) || !isFinite(low)) continue;
      
      var tr = Math.max(high - low, Math.abs(high - prevClose), Math.abs(low - prevClose));
      trValues.push(isFinite(tr) && tr > 0 ? tr : 0);
      
      var upMove = high - prevHigh;
      var downMove = prevLow - low;
      
      if (upMove > downMove && upMove > 0) {
        plusDM.push(upMove);
        minusDM.push(0);
      } else if (downMove > upMove && downMove > 0) {
        plusDM.push(0);
        minusDM.push(downMove);
      } else {
        plusDM.push(0);
        minusDM.push(0);
      }
    }
    
    if (trValues.length < period * 2 || plusDM.length < period * 2) {
      return result;
    }
    
    var smoothedTR = 0, smoothedPlusDM = 0, smoothedMinusDM = 0;
    
    for (var j = 0; j < period; j++) {
      smoothedTR += trValues[j];
      smoothedPlusDM += plusDM[j];
      smoothedMinusDM += minusDM[j];
    }
    
    var dxValues = [];
    
    for (var k = period; k < trValues.length; k++) {
      smoothedTR = smoothedTR - (smoothedTR / period) + trValues[k];
      smoothedPlusDM = smoothedPlusDM - (smoothedPlusDM / period) + plusDM[k];
      smoothedMinusDM = smoothedMinusDM - (smoothedMinusDM / period) + minusDM[k];
      
      var diPlus = smoothedTR > 0 ? (smoothedPlusDM / smoothedTR) * 100 : 0;
      var diMinus = smoothedTR > 0 ? (smoothedMinusDM / smoothedTR) * 100 : 0;
      var diSum = diPlus + diMinus;
      var dx = diSum > 0 ? (Math.abs(diPlus - diMinus) / diSum) * 100 : 0;
      
      dxValues.push({ dx: dx, diPlus: diPlus, diMinus: diMinus });
    }
    
    if (dxValues.length < period) return result;
    
    var adx = 0;
    for (var m = 0; m < period; m++) {
      adx += dxValues[m].dx;
    }
    adx /= period;
    
    for (var n = period; n < dxValues.length; n++) {
      adx = ((adx * (period - 1)) + dxValues[n].dx) / period;
    }
    
    var lastDX = dxValues[dxValues.length - 1];
    result.adx = isFinite(adx) ? Math.round(adx * 10) / 10 : 25;
    result.diPlus = isFinite(lastDX.diPlus) ? Math.round(lastDX.diPlus * 10) / 10 : 0;
    result.diMinus = isFinite(lastDX.diMinus) ? Math.round(lastDX.diMinus * 10) / 10 : 0;
    
    if (result.adx >= 25 && result.diPlus > result.diMinus) {
      result.trend = 'strong_up';
    } else if (result.adx >= 25 && result.diMinus > result.diPlus) {
      result.trend = 'strong_down';
    } else if (result.diPlus > result.diMinus) {
      result.trend = 'up';
    } else if (result.diMinus > result.diPlus) {
      result.trend = 'down';
    }
    
    result.adx = Math.max(0, Math.min(100, result.adx));
    result.diPlus = Math.max(0, Math.min(100, result.diPlus));
    result.diMinus = Math.max(0, Math.min(100, result.diMinus));
    
  } catch (e) {
    console.log('[WARN] ADX calc error:', e.message);
  }
  
  return result;
}

// ==================== Volume Analysis ====================
function analyzeVolume(klines, currentVolume) {
  if (!klines || klines.length < 20 || !currentVolume) {
    return { strength: 0, signal: 'neutral', avgVolume: 0 };
  }
  
  var volumes = klines.slice(-20).map(function(k) { return k.v || 0; });
  var avgVolume = volumes.reduce(function(a, b) { return a + b; }, 0) / volumes.length;
  
  if (avgVolume === 0) {
    return { strength: 0, signal: 'neutral', avgVolume: 0 };
  }
  
  var volumeRatio = currentVolume / avgVolume;
  var strength = 0;
  var signal = 'neutral';
  
  if (volumeRatio >= 2) {
    strength = 2;
    signal = 'strong';
  } else if (volumeRatio >= 1.5) {
    strength = 1;
    signal = 'above_average';
  } else if (volumeRatio < 0.5) {
    strength = -1;
    signal = 'weak';
  }
  
  return { strength: strength, signal: signal, avgVolume: avgVolume, ratio: volumeRatio };
}

// ==================== Divergence Detection ====================
function detectDivergence(klines, indicatorValues, indicatorName) {
  if (!klines || !Array.isArray(klines) || klines.length < 30) {
    return { type: 'none', strength: 0, hidden: false };
  }
  if (!indicatorValues || !Array.isArray(indicatorValues) || indicatorValues.length < 30) {
    return { type: 'none', strength: 0, hidden: false };
  }
  
  // Use the minimum of both arrays' lengths for lookback
  var lookback = Math.min(50, klines.length, indicatorValues.length);
  
  // Get the last 'lookback' items from both arrays, aligned from the end
  var startKline = klines.length - lookback;
  var startIndicator = indicatorValues.length - lookback;
  
  // Build aligned arrays with relative indices (0 to lookback-1)
  var data = [];
  for (var i = 0; i < lookback; i++) {
    var kline = klines[startKline + i];
    var indValue = indicatorValues[startIndicator + i];
    
    if (kline && kline.c && isFinite(kline.c) && indValue !== undefined && isFinite(indValue)) {
      data.push({
        relativeIndex: i,
        price: kline.c,
        indicator: indValue
      });
    }
  }
  
  if (data.length < 20) {
    return { type: 'none', strength: 0, hidden: false };
  }
  
  // Find local highs and lows in the aligned data
  var priceHighs = [];
  var priceLows = [];
  
  for (var j = 2; j < data.length - 2; j++) {
    var curr = data[j];
    var isHigh = curr.price > data[j - 1].price && 
                 curr.price > data[j - 2].price &&
                 curr.price > data[j + 1].price &&
                 curr.price > data[j + 2].price;
    var isLow = curr.price < data[j - 1].price && 
                curr.price < data[j - 2].price &&
                curr.price < data[j + 1].price &&
                curr.price < data[j + 2].price;
    
    if (isHigh) {
      priceHighs.push({ dataIndex: j, price: curr.price, indicator: curr.indicator });
    }
    if (isLow) {
      priceLows.push({ dataIndex: j, price: curr.price, indicator: curr.indicator });
    }
  }
  
  // Check for bullish divergence (lower lows in price, higher lows in indicator)
  if (priceLows.length >= 2) {
    for (var l = priceLows.length - 1; l >= 1; l--) {
      var lastLow = priceLows[l];
      var prevLow = priceLows[l - 1];
      
      // Regular bullish divergence: price makes lower low, indicator makes higher low
      if (lastLow.price < prevLow.price && lastLow.indicator > prevLow.indicator) {
        var strength = Math.min(3, Math.abs((lastLow.price - prevLow.price) / prevLow.price * 100) + 1);
        return { type: 'bullish', strength: Math.floor(strength), hidden: false };
      }
      
      // Hidden bullish divergence: price makes higher low, indicator makes lower low
      if (lastLow.price > prevLow.price && lastLow.indicator < prevLow.indicator) {
        return { type: 'bullish', strength: 1, hidden: true };
      }
    }
  }
  
  // Check for bearish divergence (higher highs in price, lower highs in indicator)
  if (priceHighs.length >= 2) {
    for (var h = priceHighs.length - 1; h >= 1; h--) {
      var lastHigh = priceHighs[h];
      var prevHigh = priceHighs[h - 1];
      
      // Regular bearish divergence: price makes higher high, indicator makes lower high
      if (lastHigh.price > prevHigh.price && lastHigh.indicator < prevHigh.indicator) {
        var strength = Math.min(3, Math.abs((lastHigh.price - prevHigh.price) / prevHigh.price * 100) + 1);
        return { type: 'bearish', strength: Math.floor(strength), hidden: false };
      }
      
      // Hidden bearish divergence: price makes lower high, indicator makes higher high
      if (lastHigh.price < prevHigh.price && lastHigh.indicator > prevHigh.indicator) {
        return { type: 'bearish', strength: 1, hidden: true };
      }
    }
  }
  
  return { type: 'none', strength: 0, hidden: false };
}

// ==================== Candlestick Patterns ====================
function detectCandlestickPatterns(klines) {
  if (!klines || !Array.isArray(klines) || klines.length < 3) {
    return { patterns: [], bullish: 0, bearish: 0 };
  }
  
  var patterns = [];
  var bullishScore = 0;
  var bearishScore = 0;
  
  try {
    var checkCount = Math.min(3, klines.length);
    
    for (var i = klines.length - checkCount; i < klines.length; i++) {
      if (i < 2) continue;
      
      var current = klines[i];
      var prev = klines[i - 1];
      var prev2 = klines[i - 2];
      
      if (!current || !prev || !current.o || !current.c || !current.h || !current.l) continue;
      if (!prev.o || !prev.c || !prev.h || !prev.l) continue;
      
      var currentBody = Math.abs(current.c - current.o);
      var currentRange = current.h - current.l;
      var prevBody = Math.abs(prev.c - prev.o);
      
      var currentIsBullish = current.c >= current.o;
      var prevIsBullish = prev.c >= prev.o;
      
      // Doji
      if (currentBody < (currentRange * 0.1)) {
        patterns.push({ type: 'doji', index: i, bullish: null });
      }
      
      // Hammer
      if (i === klines.length - 1) {
        var lowerShadow = Math.min(current.o, current.c) - current.l;
        var upperShadow = current.h - Math.max(current.o, current.c);
        
        if (lowerShadow > currentBody * 2 && upperShadow < currentBody * 0.3 && currentRange > 0) {
          patterns.push({ type: 'hammer', index: i, bullish: true });
          bullishScore += 2;
        }
        
        // Shooting Star
        if (upperShadow > currentBody * 2 && lowerShadow < currentBody * 0.3 && currentRange > 0) {
          patterns.push({ type: 'shooting_star', index: i, bullish: false });
          bearishScore += 2;
        }
      }
      
      // Engulfing
      if (i === klines.length - 1) {
        if (!prevIsBullish && currentIsBullish &&
            current.o < prev.c && current.c > prev.o &&
            currentBody > prevBody * 1.1) {
          patterns.push({ type: 'bullish_engulfing', index: i, bullish: true });
          bullishScore += 3;
        }
        
        if (prevIsBullish && !currentIsBullish &&
            current.o > prev.c && current.c < prev.o &&
            currentBody > prevBody * 1.1) {
          patterns.push({ type: 'bearish_engulfing', index: i, bullish: false });
          bearishScore += 3;
        }
      }
      
      // Morning/Evening Star
      if (i >= 2 && i === klines.length - 1 && prev2) {
        var first = prev2;
        var second = prev;
        var third = current;
        
        if (first.c && first.o && second.c && second.o && third.c && third.o) {
          var firstBearish = first.c < first.o;
          var secondSmall = Math.abs(second.c - second.o) < Math.abs(first.c - first.o) * 0.5;
          var thirdBullish = third.c > third.o;
          
          if (firstBearish && secondSmall && thirdBullish && third.c > (first.o + first.c) / 2) {
            patterns.push({ type: 'morning_star', index: i, bullish: true });
            bullishScore += 3;
          }
          
          var firstBullish = first.c > first.o;
          var thirdBearish = third.c < third.o;
          
          if (firstBullish && secondSmall && thirdBearish && third.c < (first.o + first.c) / 2) {
            patterns.push({ type: 'evening_star', index: i, bullish: false });
            bearishScore += 3;
          }
        }
      }
    }
  } catch (e) {
    console.log('[WARN] Pattern detection error:', e.message);
  }
  
  return {
    patterns: patterns,
    bullish: bullishScore,
    bearish: bearishScore,
    strongest: patterns.length > 0 ? patterns[patterns.length - 1] : null
  };
}

// ==================== Market Regime ====================
function detectMarketRegime(klines, price) {
  if (!klines || !Array.isArray(klines) || klines.length < 50 || !price || !isFinite(price)) {
    return { regime: 'unknown', strength: 0, volatility: 'medium' };
  }
  
  var result = { regime: 'ranging', strength: 0, volatility: 'medium' };
  
  try {
    var atr = calcATR(klines, 14, price);
    var atrPercent = (atr / price) * 100;
    
    if (atrPercent > 3) {
      result.volatility = 'high';
    } else if (atrPercent < 1) {
      result.volatility = 'low';
    }
    
    var closes = klines.map(function(k) { return k.c; }).filter(function(c) {
      return typeof c === 'number' && isFinite(c) && c > 0;
    });
    
    if (closes.length < 50) return result;
    
    var ema20 = calcEMA(closes, 20);
    var ema50 = calcEMA(closes, 50);
    var adx = calcADX(klines, 14);
    
    if (adx.adx >= 25) {
      if (price > ema20 && ema20 > ema50 && adx.trend.includes('up')) {
        result.regime = 'trending_up';
        result.strength = adx.adx;
      } else if (price < ema20 && ema20 < ema50 && adx.trend.includes('down')) {
        result.regime = 'trending_down';
        result.strength = adx.adx;
      }
    } else {
      result.regime = 'ranging';
      result.strength = 100 - adx.adx;
    }
  } catch (e) {
    console.log('[WARN] Market regime error:', e.message);
  }
  
  return result;
}

// ==================== Smart Entry System ====================
function calcFibonacci(klines, lookback) {
  if (!klines || klines.length < lookback) return null;
  
  var recentKlines = klines.slice(-lookback);
  var high = -Infinity, low = Infinity;
  var highIdx = 0, lowIdx = 0;
  
  for (var i = 0; i < recentKlines.length; i++) {
    if (recentKlines[i].h > high) {
      high = recentKlines[i].h;
      highIdx = i;
    }
    if (recentKlines[i].l < low) {
      low = recentKlines[i].l;
      lowIdx = i;
    }
  }
  
  if (high === low || !isFinite(high) || !isFinite(low)) return null;
  
  var diff = high - low;
  var isUptrend = lowIdx < highIdx;
  
  var levels = {
    0: isUptrend ? high : low,
    0.236: isUptrend ? high - diff * 0.236 : low + diff * 0.236,
    0.382: isUptrend ? high - diff * 0.382 : low + diff * 0.382,
    0.5: isUptrend ? high - diff * 0.5 : low + diff * 0.5,
    0.618: isUptrend ? high - diff * 0.618 : low + diff * 0.618,
    0.786: isUptrend ? high - diff * 0.786 : low + diff * 0.786,
    1: isUptrend ? low : high
  };
  
  return { high: high, low: low, isUptrend: isUptrend, levels: levels };
}

function detectOrderBlocks(klines, lookback) {
  if (!klines || klines.length < lookback + 5) return [];
  
  var orderBlocks = [];
  var recentKlines = klines.slice(-(lookback + 5));
  
  for (var i = 2; i < recentKlines.length - 2; i++) {
    var current = recentKlines[i];
    var next1 = recentKlines[i + 1];
    var next2 = recentKlines[i + 2];
    
    if (!current || !next1 || !next2) continue;
    
    var currentBody = Math.abs(current.c - current.o);
    var next1Body = Math.abs(next1.c - next1.o);
    var next2Body = Math.abs(next2.c - next2.o);
    
    if (current.c < current.o && next1.c > next1.o && next2.c > next2.o &&
        (next1Body + next2Body) > currentBody * 2) {
      orderBlocks.push({
        type: 'bullish',
        high: current.h,
        low: current.l,
        strength: Math.min(3, Math.floor((next1Body + next2Body) / currentBody))
      });
    }
    
    if (current.c > current.o && next1.c < next1.o && next2.c < next2.o &&
        (next1Body + next2Body) > currentBody * 2) {
      orderBlocks.push({
        type: 'bearish',
        high: current.h,
        low: current.l,
        strength: Math.min(3, Math.floor((next1Body + next2Body) / currentBody))
      });
    }
  }
  
  return orderBlocks.slice(-3);
}

function detectFVG(klines, lookback) {
  if (!klines || klines.length < lookback) return [];
  
  var fvgs = [];
  var recentKlines = klines.slice(-lookback);
  
  for (var i = 2; i < recentKlines.length; i++) {
    var candle1 = recentKlines[i - 2];
    var candle3 = recentKlines[i];
    
    if (!candle1 || !candle3) continue;
    
    if (candle3.l > candle1.h) {
      fvgs.push({ type: 'bullish', high: candle3.l, low: candle1.h, filled: false });
    }
    
    if (candle3.h < candle1.l) {
      fvgs.push({ type: 'bearish', high: candle1.l, low: candle3.h, filled: false });
    }
  }
  
  return fvgs.slice(-3);
}

function calcVWAP(klines, period) {
  if (!klines || klines.length < period) return null;
  
  var recentKlines = klines.slice(-period);
  var cumulativeTPV = 0;
  var cumulativeVolume = 0;
  
  for (var i = 0; i < recentKlines.length; i++) {
    var k = recentKlines[i];
    var typicalPrice = (k.h + k.l + k.c) / 3;
    var volume = k.v || 1;
    
    cumulativeTPV += typicalPrice * volume;
    cumulativeVolume += volume;
  }
  
  if (cumulativeVolume === 0) return null;
  
  var vwap = cumulativeTPV / cumulativeVolume;
  
  var squaredDiffs = 0;
  for (var j = 0; j < recentKlines.length; j++) {
    var tp = (recentKlines[j].h + recentKlines[j].l + recentKlines[j].c) / 3;
    squaredDiffs += Math.pow(tp - vwap, 2);
  }
  var stdDev = Math.sqrt(squaredDiffs / recentKlines.length);
  
  return {
    vwap: vwap,
    upperBand1: vwap + stdDev,
    lowerBand1: vwap - stdDev,
    upperBand2: vwap + stdDev * 2,
    lowerBand2: vwap - stdDev * 2
  };
}

function findConfluenceZones(currentPrice, signalType, fib, orderBlocks, fvgs, vwap, ema21, ema50, atr) {
  var zones = [];
  var tolerance = atr * 0.3;
  var allLevels = [];
  
  if (fib && fib.levels) {
    var fibLevels = [0.382, 0.5, 0.618, 0.786];
    for (var i = 0; i < fibLevels.length; i++) {
      var level = fib.levels[fibLevels[i]];
      if (level && isFinite(level)) {
        allLevels.push({ price: level, source: 'Fib ' + (fibLevels[i] * 100).toFixed(1) + '%', weight: fibLevels[i] === 0.618 ? 2 : 1 });
      }
    }
  }
  
  if (orderBlocks && orderBlocks.length > 0) {
    for (var j = 0; j < orderBlocks.length; j++) {
      var ob = orderBlocks[j];
      if ((signalType === 'long' && ob.type === 'bullish') ||
          (signalType === 'short' && ob.type === 'bearish')) {
        var obMid = (ob.high + ob.low) / 2;
        allLevels.push({ price: obMid, source: 'Order Block', weight: ob.strength });
      }
    }
  }
  
  if (fvgs && fvgs.length > 0) {
    for (var k = 0; k < fvgs.length; k++) {
      var fvg = fvgs[k];
      if ((signalType === 'long' && fvg.type === 'bullish') ||
          (signalType === 'short' && fvg.type === 'bearish')) {
        var fvgMid = (fvg.high + fvg.low) / 2;
        allLevels.push({ price: fvgMid, source: 'FVG', weight: 1 });
      }
    }
  }
  
  if (vwap && vwap.vwap) {
    allLevels.push({ price: vwap.vwap, source: 'VWAP', weight: 2 });
    if (signalType === 'long') {
      allLevels.push({ price: vwap.lowerBand1, source: 'VWAP -1σ', weight: 1 });
    } else {
      allLevels.push({ price: vwap.upperBand1, source: 'VWAP +1σ', weight: 1 });
    }
  }
  
  if (ema21 && isFinite(ema21)) {
    allLevels.push({ price: ema21, source: 'EMA21', weight: 1 });
  }
  if (ema50 && isFinite(ema50)) {
    allLevels.push({ price: ema50, source: 'EMA50', weight: 2 });
  }
  
  allLevels = allLevels.filter(function(l) {
    return l.price && isFinite(l.price) && l.price > 0;
  });
  
  if (signalType === 'long') {
    allLevels = allLevels.filter(function(l) { return l.price <= currentPrice + tolerance; });
  } else {
    allLevels = allLevels.filter(function(l) { return l.price >= currentPrice - tolerance; });
  }
  
  allLevels.sort(function(a, b) { return a.price - b.price; });
  
  var i = 0;
  while (i < allLevels.length) {
    var zone = {
      price: allLevels[i].price,
      sources: [allLevels[i].source],
      score: allLevels[i].weight,
      confirmations: 1
    };
    
    var j = i + 1;
    while (j < allLevels.length && Math.abs(allLevels[j].price - zone.price) <= tolerance) {
      zone.price = (zone.price * zone.confirmations + allLevels[j].price) / (zone.confirmations + 1);
      zone.sources.push(allLevels[j].source);
      zone.score += allLevels[j].weight;
      zone.confirmations++;
      j++;
    }
    
    zones.push(zone);
    i = j;
  }
  
  zones.sort(function(a, b) { return b.score - a.score; });
  return zones.slice(0, 5);
}

function findSmartEntry(klines, klines4h, currentPrice, signalType, ema21, ema50, atr, capital) {
  var result = {
    entry: currentPrice,
    entries: [],
    quality: 'good',
    reasons: [],
    confluenceScore: 0
  };
  
  if (!klines || klines.length < 50 || !isFinite(currentPrice) || currentPrice <= 0) {
    result.reasons.push('داده کافی نیست');
    return result;
  }
  
  var fib = calcFibonacci(klines, 50);
  var fib4h = klines4h ? calcFibonacci(klines4h, 30) : null;
  var orderBlocks = detectOrderBlocks(klines, 30);
  var fvgs = detectFVG(klines, 20);
  var vwap = calcVWAP(klines, 24);
  
  var zones = findConfluenceZones(currentPrice, signalType, fib, orderBlocks, fvgs, vwap, ema21, ema50, atr);
  
  if (fib4h) {
    var zones4h = findConfluenceZones(currentPrice, signalType, fib4h, [], [], null, null, null, atr);
    for (var z = 0; z < zones4h.length; z++) {
      zones4h[z].score += 2;
      zones4h[z].sources.push('4H TF');
      zones.push(zones4h[z]);
    }
    zones.sort(function(a, b) { return b.score - a.score; });
  }
  
  if (zones.length === 0) {
    result.entry = signalType === 'long' ? Math.min(currentPrice, ema21) : Math.max(currentPrice, ema21);
    result.reasons.push('ورود در EMA21');
    result.quality = 'good';
    result.entries = calculateSmartScaling(result.entry, signalType, atr, capital);
    return result;
  }
  
  var bestZone = zones[0];
  result.entry = bestZone.price;
  result.confluenceScore = bestZone.score;
  result.reasons = bestZone.sources;
  
  if (bestZone.confirmations >= 3 || bestZone.score >= 5) {
    result.quality = 'excellent';
  } else if (bestZone.confirmations >= 2 || bestZone.score >= 3) {
    result.quality = 'good';
  } else {
    result.quality = 'fair';
  }
  
  result.entries = calculateSmartScaling(result.entry, signalType, atr, capital, zones);
  
  return result;
}

function calculateSmartScaling(baseEntry, signalType, atr, capital, zones) {
  var entries = [];
  
  if (!isFinite(baseEntry) || baseEntry <= 0 || !isFinite(atr) || atr <= 0) {
    return [{ price: baseEntry, percent: 100, reason: 'ورود کامل' }];
  }
  
  capital = capital || 1000;
  
  if (capital < 500) {
    entries.push({ price: baseEntry, percent: 100, reason: 'ورود کامل (سرمایه کم)' });
  }
  else if (capital < 2000) {
    entries.push({ price: baseEntry, percent: 60, reason: 'ورود اول' });
    var entry2 = signalType === 'long' ? baseEntry - atr * 0.3 : baseEntry + atr * 0.3;
    entries.push({ price: entry2, percent: 40, reason: 'ورود دوم (DCA)' });
  }
  else if (capital < 10000) {
    entries.push({ price: baseEntry, percent: 50, reason: 'ورود اول' });
    var entry2 = signalType === 'long' ? baseEntry - atr * 0.25 : baseEntry + atr * 0.25;
    entries.push({ price: entry2, percent: 30, reason: 'ورود دوم' });
    var entry3;
    if (zones && zones.length > 1) {
      entry3 = zones[1].price;
    } else {
      entry3 = signalType === 'long' ? baseEntry - atr * 0.5 : baseEntry + atr * 0.5;
    }
    entries.push({ price: entry3, percent: 20, reason: 'ورود سوم (اگر رسید)' });
  }
  else {
    entries.push({ price: baseEntry, percent: 40, reason: 'ورود اول' });
    var entry2 = signalType === 'long' ? baseEntry - atr * 0.2 : baseEntry + atr * 0.2;
    entries.push({ price: entry2, percent: 25, reason: 'ورود دوم' });
    var entry3 = signalType === 'long' ? baseEntry - atr * 0.4 : baseEntry + atr * 0.4;
    entries.push({ price: entry3, percent: 20, reason: 'ورود سوم' });
    var entry4 = signalType === 'long' ? baseEntry - atr * 0.6 : baseEntry + atr * 0.6;
    entries.push({ price: entry4, percent: 15, reason: 'ورود چهارم (اگر رسید)' });
  }
  
  return entries;
}

// ==================== تحلیل تایم‌فریم ====================
function analyzeTF(klines, price) {
  if (!klines || !Array.isArray(klines) || klines.length < 50) {
    return { signal: 'neutral', score: 0, rsi: 50, ema21: price, ema50: price, trend: 'neutral' };
  }
  
  if (!price || !isFinite(price) || price <= 0) {
    return { signal: 'neutral', score: 0, rsi: 50, ema21: 0, ema50: 0, trend: 'neutral' };
  }
  
  var closes = klines.map(function(k) { return k.c; }).filter(function(c) {
    return typeof c === 'number' && isFinite(c) && c > 0;
  });
  
  if (closes.length < 50) {
    return { signal: 'neutral', score: 0, rsi: 50, ema21: price, ema50: price, trend: 'neutral' };
  }
  
  // Standard indicators
  var rsi = calcRSI(closes, 14);
  var ema21 = calcEMA(closes, 21);
  var ema50 = calcEMA(closes, 50);
  var macd = calcMACD(closes);
  var bb = calcBB(closes, 20, 2);
  var adx = calcADX(klines, 14);
  var atr = calcATR(klines, 14, price);
  
  // New futures-focused indicators
  var stochRSI = calcStochRSI(closes, 14, 14, 3, 3);
  var marketStructure = analyzeMarketStructure(klines, 50);
  
  if (!isFinite(rsi)) rsi = 50;
  if (!isFinite(ema21) || ema21 <= 0) ema21 = price;
  if (!isFinite(ema50) || ema50 <= 0) ema50 = price;
  if (!macd || !isFinite(macd.histogram)) macd = { histogram: 0, line: 0, signal: 0 };
  if (!bb || !isFinite(bb.upper) || !isFinite(bb.lower)) {
    bb = { upper: price * 1.02, lower: price * 0.98, middle: price };
  }
  if (!adx || !isFinite(adx.adx)) adx = { adx: 25, diPlus: 0, diMinus: 0, trend: 'neutral' };
  
  var currentVolume = klines[klines.length - 1] ? klines[klines.length - 1].v : 0;
  var volumeAnalysis = analyzeVolume(klines, currentVolume);
  var patterns = detectCandlestickPatterns(klines);
  var marketRegime = detectMarketRegime(klines, price);
  
  var rsiValues = [];
  for (var i = 0; i < closes.length; i++) {
    if (i >= 14) {
      var slice = closes.slice(0, i + 1);
      rsiValues.push(calcRSI(slice, 14));
    } else {
      rsiValues.push(50);
    }
  }
  
  var rsiDivergence = detectDivergence(klines, rsiValues, 'RSI');
  
  var trend = 'neutral';
  if (price > ema21 && ema21 > ema50) trend = 'up';
  else if (price < ema21 && ema21 < ema50) trend = 'down';
  
  var longPts = 0, shortPts = 0;
  
  // RSI Analysis (optimized for futures)
  if (rsi <= 25) longPts += 4;
  else if (rsi <= 35) longPts += 2;
  else if (rsi >= 75) shortPts += 4;
  else if (rsi >= 65) shortPts += 2;
  
  // Stochastic RSI Analysis (new - better for ranging markets)
  if (stochRSI.signal === 'oversold') {
    longPts += 3;
  } else if (stochRSI.signal === 'overbought') {
    shortPts += 3;
  } else if (stochRSI.signal === 'bullish_cross' && stochRSI.k < 50) {
    longPts += 2;
  } else if (stochRSI.signal === 'bearish_cross' && stochRSI.k > 50) {
    shortPts += 2;
  }
  
  // Trend Analysis
  if (trend === 'up') longPts += 2;
  else if (trend === 'down') shortPts += 2;
  
  // MACD Analysis
  if (macd.histogram > 0) longPts += 2;
  else if (macd.histogram < 0) shortPts += 2;
  
  // Bollinger Bands Analysis
  var bbPos = (price - bb.lower) / (bb.upper - bb.lower);
  if (bb.upper !== bb.lower && isFinite(bbPos)) {
    if (bbPos <= 0.1) longPts += 3;
    else if (bbPos <= 0.2) longPts += 1;
    else if (bbPos >= 0.9) shortPts += 3;
    else if (bbPos >= 0.8) shortPts += 1;
  }
  
  // ADX Analysis
  if (adx.adx >= 25) {
    if (adx.trend === 'strong_up') longPts += 2;
    else if (adx.trend === 'strong_down') shortPts += 2;
  } else if (adx.adx < 20) {
    // Ranging market - reduce base points but rely more on StochRSI
    longPts = Math.max(0, longPts - 1);
    shortPts = Math.max(0, shortPts - 1);
  }
  
  // Volume Confirmation - Stronger penalties for low volume
  var volumeRatio = volumeAnalysis.ratio || 1;
  if (volumeRatio < 0.5) {
    // Very low volume - unreliable signal
    longPts = Math.max(0, longPts - 4);
    shortPts = Math.max(0, shortPts - 4);
  } else if (volumeRatio < 0.8) {
    // Low volume - reduce confidence
    longPts = Math.max(0, longPts - 2);
    shortPts = Math.max(0, shortPts - 2);
  } else if (volumeRatio > 1.5) {
    // High volume - bonus
    if (longPts > shortPts) longPts += 2;
    else if (shortPts > longPts) shortPts += 2;
  } else if (volumeAnalysis.strength > 0) {
    if (longPts > shortPts) longPts += volumeAnalysis.strength;
    else if (shortPts > longPts) shortPts += volumeAnalysis.strength;
  }
  
  // RSI Divergence - with opposing divergence penalties
  if (rsiDivergence.type === 'bullish') {
    longPts += Math.min(3, rsiDivergence.strength);
    // Penalty for SHORT signal with bullish divergence
    shortPts = Math.max(0, shortPts - 3);
  } else if (rsiDivergence.type === 'bearish') {
    shortPts += Math.min(3, rsiDivergence.strength);
    // Penalty for LONG signal with bearish divergence
    longPts = Math.max(0, longPts - 3);
  }
  
  // Candlestick Patterns
  if (patterns.bullish > 0) longPts += Math.min(2, patterns.bullish);
  if (patterns.bearish > 0) shortPts += Math.min(2, patterns.bearish);
  
  // Market Structure Analysis (new - important for futures)
  if (marketStructure.structure === 'uptrend') {
    longPts += 2;
    if (marketStructure.choch === 'bullish') longPts += 2;
  } else if (marketStructure.structure === 'downtrend') {
    shortPts += 2;
    if (marketStructure.choch === 'bearish') shortPts += 2;
  } else if (marketStructure.structure === 'bos_bullish') {
    longPts += 3; // Break of Structure is strong signal
  } else if (marketStructure.structure === 'bos_bearish') {
    shortPts += 3;
  }
  
  var signal = 'neutral';
  var score = 0;
  
  // شرایط سیگنال‌دهی - حداقل 4 امتیاز و 2 امتیاز فاصله (بهینه برای فیوچرز)
  if (longPts >= 4 && longPts > shortPts + 2) {
    signal = 'long';
    score = longPts;
  } else if (shortPts >= 4 && shortPts > longPts + 2) {
    signal = 'short';
    score = shortPts;
  }
  
  return { 
    signal: signal, 
    score: score, 
    rsi: rsi, 
    ema21: ema21, 
    ema50: ema50, 
    trend: trend,
    bb: bb,
    macd: macd,
    adx: adx,
    atr: atr,
    volume: volumeAnalysis,
    rsiDivergence: rsiDivergence,
    patterns: patterns,
    marketRegime: marketRegime,
    // New futures-focused data
    stochRSI: stochRSI,
    marketStructure: marketStructure,
    longPoints: longPts,
    shortPoints: shortPts
  };
}

// ==================== Leverage Calculator ====================
function getLeverage(entry, sl) {
  if (!entry || !sl || entry === sl) return 3;
  
  var riskPercent = Math.abs(entry - sl) / entry * 100;
  
  if (riskPercent >= 5) return 2;
  if (riskPercent >= 3) return 3;
  if (riskPercent >= 2) return 4;
  return 5;
}

// ==================== Stochastic RSI (برای فیوچرز) ====================
function calcStochRSI(closes, rsiPeriod, stochPeriod, kPeriod, dPeriod) {
  rsiPeriod = rsiPeriod || 14;
  stochPeriod = stochPeriod || 14;
  kPeriod = kPeriod || 3;
  dPeriod = dPeriod || 3;
  
  if (!closes || closes.length < rsiPeriod + stochPeriod + kPeriod) {
    return { k: 50, d: 50, signal: 'neutral' };
  }
  
  // Calculate RSI values first
  var rsiValues = [];
  for (var i = rsiPeriod; i < closes.length; i++) {
    var slice = closes.slice(0, i + 1);
    rsiValues.push(calcRSI(slice, rsiPeriod));
  }
  
  if (rsiValues.length < stochPeriod) {
    return { k: 50, d: 50, signal: 'neutral' };
  }
  
  // Calculate Stochastic of RSI
  var stochKValues = [];
  for (var j = stochPeriod - 1; j < rsiValues.length; j++) {
    var rsiSlice = rsiValues.slice(j - stochPeriod + 1, j + 1);
    var minRSI = Math.min.apply(null, rsiSlice);
    var maxRSI = Math.max.apply(null, rsiSlice);
    
    var stochK = maxRSI !== minRSI ? 
      ((rsiValues[j] - minRSI) / (maxRSI - minRSI)) * 100 : 50;
    stochKValues.push(stochK);
  }
  
  if (stochKValues.length < kPeriod) {
    return { k: 50, d: 50, signal: 'neutral' };
  }
  
  // Smooth K (Fast %K -> Slow %K)
  var smoothedK = [];
  for (var m = kPeriod - 1; m < stochKValues.length; m++) {
    var sum = 0;
    for (var n = 0; n < kPeriod; n++) {
      sum += stochKValues[m - n];
    }
    smoothedK.push(sum / kPeriod);
  }
  
  if (smoothedK.length < dPeriod) {
    return { k: smoothedK[smoothedK.length - 1] || 50, d: 50, signal: 'neutral' };
  }
  
  // Calculate %D (SMA of smoothed K)
  var dSum = 0;
  for (var p = 0; p < dPeriod; p++) {
    dSum += smoothedK[smoothedK.length - 1 - p];
  }
  var d = dSum / dPeriod;
  var k = smoothedK[smoothedK.length - 1];
  
  // Generate signal
  var signal = 'neutral';
  if (k <= 20 && d <= 20) {
    signal = 'oversold';
  } else if (k >= 80 && d >= 80) {
    signal = 'overbought';
  } else if (k > d && k < 80) {
    signal = 'bullish_cross';
  } else if (k < d && k > 20) {
    signal = 'bearish_cross';
  }
  
  return { 
    k: Math.round(k * 10) / 10, 
    d: Math.round(d * 10) / 10, 
    signal: signal,
    crossover: k > d,
    extreme: k <= 20 || k >= 80
  };
}

// ==================== Market Structure (Higher Highs/Lower Lows) ====================
function analyzeMarketStructure(klines, lookback) {
  lookback = lookback || 50;
  
  if (!klines || klines.length < lookback) {
    return { structure: 'unknown', pivots: [], strength: 0 };
  }
  
  var recentKlines = klines.slice(-lookback);
  var pivotHighs = [];
  var pivotLows = [];
  
  // Find pivot points (swing highs and lows)
  for (var i = 2; i < recentKlines.length - 2; i++) {
    var curr = recentKlines[i];
    var isHigh = curr.h > recentKlines[i-1].h && 
                 curr.h > recentKlines[i-2].h &&
                 curr.h > recentKlines[i+1].h &&
                 curr.h > recentKlines[i+2].h;
    var isLow = curr.l < recentKlines[i-1].l && 
                curr.l < recentKlines[i-2].l &&
                curr.l < recentKlines[i+1].l &&
                curr.l < recentKlines[i+2].l;
    
    if (isHigh) {
      pivotHighs.push({ index: i, price: curr.h });
    }
    if (isLow) {
      pivotLows.push({ index: i, price: curr.l });
    }
  }
  
  if (pivotHighs.length < 2 || pivotLows.length < 2) {
    return { structure: 'consolidation', pivots: { highs: pivotHighs, lows: pivotLows }, strength: 0 };
  }
  
  // Analyze structure
  var lastHighs = pivotHighs.slice(-3);
  var lastLows = pivotLows.slice(-3);
  
  var higherHighs = 0;
  var lowerHighs = 0;
  var higherLows = 0;
  var lowerLows = 0;
  
  for (var h = 1; h < lastHighs.length; h++) {
    if (lastHighs[h].price > lastHighs[h-1].price) higherHighs++;
    else lowerHighs++;
  }
  
  for (var l = 1; l < lastLows.length; l++) {
    if (lastLows[l].price > lastLows[l-1].price) higherLows++;
    else lowerLows++;
  }
  
  var structure = 'consolidation';
  var strength = 0;
  
  // Uptrend: Higher Highs + Higher Lows
  if (higherHighs >= 1 && higherLows >= 1) {
    structure = 'uptrend';
    strength = (higherHighs + higherLows) * 25;
  }
  // Downtrend: Lower Highs + Lower Lows
  else if (lowerHighs >= 1 && lowerLows >= 1) {
    structure = 'downtrend';
    strength = (lowerHighs + lowerLows) * 25;
  }
  // Break of Structure checks
  else if (higherHighs >= 1 && lowerLows >= 1) {
    structure = 'bos_bullish'; // Breaking bearish structure
    strength = 50;
  }
  else if (lowerHighs >= 1 && higherLows >= 1) {
    structure = 'bos_bearish'; // Breaking bullish structure
    strength = 50;
  }
  
  // Check for Change of Character (ChoCh)
  var lastHigh = pivotHighs[pivotHighs.length - 1];
  var lastLow = pivotLows[pivotLows.length - 1];
  var currentPrice = recentKlines[recentKlines.length - 1].c;
  
  var choch = null;
  if (structure === 'downtrend' && currentPrice > lastHigh.price) {
    choch = 'bullish';
    strength += 30;
  } else if (structure === 'uptrend' && currentPrice < lastLow.price) {
    choch = 'bearish';
    strength += 30;
  }
  
  return {
    structure: structure,
    strength: Math.min(100, strength),
    pivots: { highs: pivotHighs, lows: pivotLows },
    higherHighs: higherHighs,
    higherLows: higherLows,
    lowerHighs: lowerHighs,
    lowerLows: lowerLows,
    choch: choch,
    lastPivotHigh: lastHigh ? lastHigh.price : null,
    lastPivotLow: lastLow ? lastLow.price : null
  };
}

// ==================== Multi-Timeframe Confluence ====================
function analyzeMTF(analyses) {
  // analyses = { '30m': result, '1h': result, '4h': result, '1d': result }
  if (!analyses || Object.keys(analyses).length === 0) {
    return { confluence: 0, direction: 'neutral', aligned: false };
  }
  
  var longCount = 0;
  var shortCount = 0;
  var neutralCount = 0;
  var totalWeight = 0;
  
  // Weights for each timeframe (higher TF = more weight)
  var weights = { '30m': 1, '1h': 2, '4h': 3, '1d': 4 };
  
  for (var tf in analyses) {
    if (!analyses[tf]) continue;
    
    var analysis = analyses[tf];
    var weight = weights[tf] || 1;
    totalWeight += weight;
    
    if (analysis.signal === 'long') {
      longCount += weight;
    } else if (analysis.signal === 'short') {
      shortCount += weight;
    } else {
      neutralCount += weight;
    }
  }
  
  if (totalWeight === 0) {
    return { confluence: 0, direction: 'neutral', aligned: false };
  }
  
  var longPercent = (longCount / totalWeight) * 100;
  var shortPercent = (shortCount / totalWeight) * 100;
  
  var direction = 'neutral';
  var confluence = 0;
  var aligned = false;
  
  if (longPercent >= 70) {
    direction = 'long';
    confluence = longPercent;
    aligned = true;
  } else if (shortPercent >= 70) {
    direction = 'short';
    confluence = shortPercent;
    aligned = true;
  } else if (longPercent >= 50) {
    direction = 'long';
    confluence = longPercent;
    aligned = false;
  } else if (shortPercent >= 50) {
    direction = 'short';
    confluence = shortPercent;
    aligned = false;
  }
  
  return {
    confluence: Math.round(confluence),
    direction: direction,
    aligned: aligned,
    breakdown: {
      long: longCount,
      short: shortCount,
      neutral: neutralCount,
      total: totalWeight
    }
  };
}

// ==================== Liquidation Price Calculator (فیوچرز) ====================
function calcLiquidationPrice(entryPrice, leverage, positionType, maintenanceMargin) {
  maintenanceMargin = maintenanceMargin || 0.005; // 0.5% default
  
  if (!entryPrice || !leverage || leverage < 1) {
    return null;
  }
  
  // Liquidation formula for cross margin
  // Long: Entry * (1 - 1/leverage + maintenance)
  // Short: Entry * (1 + 1/leverage - maintenance)
  
  var liqPrice;
  if (positionType === 'long') {
    liqPrice = entryPrice * (1 - (1 / leverage) + maintenanceMargin);
  } else {
    liqPrice = entryPrice * (1 + (1 / leverage) - maintenanceMargin);
  }
  
  var distancePercent = Math.abs(entryPrice - liqPrice) / entryPrice * 100;
  
  return {
    price: liqPrice,
    distancePercent: distancePercent,
    safe: distancePercent > 5,
    warning: distancePercent <= 5 && distancePercent > 2,
    danger: distancePercent <= 2
  };
}

// ==================== Enhanced Leverage Recommendation (فیوچرز) ====================
function getSmartLeverage(entry, sl, atr, capital, riskPercent) {
  if (!entry || !sl || entry === sl || !atr) return { leverage: 3, reason: 'پیش‌فرض' };
  
  riskPercent = riskPercent || 2;
  capital = capital || 1000;
  
  var slDistance = Math.abs(entry - sl);
  var slPercent = (slDistance / entry) * 100;
  var atrPercent = (atr / entry) * 100;
  
  // Calculate max safe leverage based on SL distance
  var maxLeverageFromSL = Math.floor(100 / slPercent);
  
  // Calculate recommended leverage based on ATR volatility
  var volatilityFactor = atrPercent / 2; // Higher ATR = lower leverage
  var maxLeverageFromATR = Math.floor(10 / volatilityFactor);
  
  // Risk-based leverage (to risk only riskPercent of capital)
  var riskAmount = capital * (riskPercent / 100);
  var positionSize = riskAmount / (slPercent / 100);
  var margin = capital * 0.2; // Use 20% of capital as margin
  var riskBasedLeverage = Math.floor(positionSize / margin);
  
  // Take minimum of all calculations for safety
  var safeLeverage = Math.min(maxLeverageFromSL, maxLeverageFromATR, riskBasedLeverage, 20);
  safeLeverage = Math.max(safeLeverage, 1); // At least 1x
  
  var reason = '';
  var riskLevel = 'medium';
  
  if (safeLeverage <= 3) {
    reason = 'SL فاصله زیاد یا نوسان بالا';
    riskLevel = 'low';
  } else if (safeLeverage <= 7) {
    reason = 'تعادل ریسک و سود';
    riskLevel = 'medium';
  } else if (safeLeverage <= 15) {
    reason = 'SL نزدیک - ریسک بالاتر';
    riskLevel = 'high';
  } else {
    reason = 'لوریج بالا - احتیاط!';
    riskLevel = 'extreme';
  }
  
  return {
    leverage: safeLeverage,
    reason: reason,
    riskLevel: riskLevel,
    maxFromSL: maxLeverageFromSL,
    maxFromATR: maxLeverageFromATR,
    slPercent: slPercent,
    atrPercent: atrPercent
  };
}

// Export for use in app.js
if (typeof window !== 'undefined') {
  window.TradingCore = {
    calcRSI: calcRSI,
    calcEMA: calcEMA,
    calcMACD: calcMACD,
    calcBB: calcBB,
    calcATR: calcATR,
    calcADX: calcADX,
    analyzeVolume: analyzeVolume,
    detectDivergence: detectDivergence,
    detectCandlestickPatterns: detectCandlestickPatterns,
    detectMarketRegime: detectMarketRegime,
    findSmartEntry: findSmartEntry,
    calculateSmartScaling: calculateSmartScaling,
    analyzeTF: analyzeTF,
    getLeverage: getLeverage,
    calcFibonacci: calcFibonacci,
    detectOrderBlocks: detectOrderBlocks,
    detectFVG: detectFVG,
    calcVWAP: calcVWAP,
    // New Futures-focused functions
    calcStochRSI: calcStochRSI,
    analyzeMarketStructure: analyzeMarketStructure,
    analyzeMTF: analyzeMTF,
    calcLiquidationPrice: calcLiquidationPrice,
    getSmartLeverage: getSmartLeverage
  };
}

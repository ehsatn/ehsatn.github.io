// Trading Assistant PWA - Monte Carlo Module v2.0
// Enhanced Walk-Forward Testing, K-Fold Cross-Validation, and Monte Carlo Simulation

var MonteCarlo = (function() {
  
  var config = {
    initialCapital: 1000,
    riskPercent: 2,
    strategy: 'default',
    slMultiplier: 1.5,
    tp1Multiplier: 2,
    tp2Multiplier: 3.5,
    tp1ClosePercent: 50,
    leverage: 3,
    tradingFee: 0.001,
    slippage: 0.0005,
    // Walk-Forward parameters - Enhanced for more periods
    trainPercent: 50,      // کاهش درصد آموزش برای دوره‌های تست بیشتر
    testPercent: 15,       // دوره تست کوچکتر برای تعداد بیشتر
    minPeriods: 8,         // حداقل دوره بیشتر
    maxPeriods: 30,        // حداکثر دوره برای دقت بالاتر
    // K-Fold parameters
    kFolds: 5,             // تعداد فولد برای cross-validation
    // Monte Carlo parameters
    simulations: 1000,
    confidenceLevel: 95,
    // Risk-free rate for Sharpe ratio (annualized)
    riskFreeRate: 0.05
  };

  // ==================== Backtest Engine ====================
  function runBacktest(klines, settings) {
    if (!klines || klines.length < 50) {
      return { error: 'داده کافی نیست' };
    }
    
    var cfg = Object.assign({}, config, settings || {});
    var capital = cfg.initialCapital;
    var peakCapital = capital;
    var position = null;
    var trades = [];
    var tradeId = 0;
    var totalFees = 0;
    var equityCurve = [capital];
    var drawdowns = [];
    
    for (var i = 50; i < klines.length - 1; i++) {
      var currentKlines = klines.slice(0, i + 1);
      var currentPrice = klines[i].c;
      var nextCandle = klines[i + 1];
      
      var analysis = analyzeForBacktest(currentKlines, currentPrice);
      
      // Track equity curve and drawdown
      if (position) {
        var unrealizedPnL = calculateUnrealizedPnL(position, currentPrice);
        var currentEquity = capital + unrealizedPnL;
        equityCurve.push(currentEquity);
        
        if (currentEquity > peakCapital) {
          peakCapital = currentEquity;
        }
        var currentDrawdown = ((peakCapital - currentEquity) / peakCapital) * 100;
        drawdowns.push(currentDrawdown);
      } else {
        equityCurve.push(capital);
        if (capital > peakCapital) {
          peakCapital = capital;
        }
        var currentDrawdown = ((peakCapital - capital) / peakCapital) * 100;
        drawdowns.push(currentDrawdown);
      }
      
      if (position) {
        var exitResult = checkExit(position, nextCandle, capital);
        
        if (exitResult.exit) {
          var exitPrice = applySlippage(exitResult.price, position.type, false);
          var pnlResult = calculatePnL(position, exitPrice, exitResult.isPartial);
          
          var exitFee = pnlResult.exitValue * cfg.tradingFee;
          totalFees += exitFee;
          
          if (exitResult.isPartial) {
            var partialPnl = pnlResult.pnl - exitFee;
            capital += partialPnl;
            
            position.partialExitPrice = exitPrice;
            position.partialPnl = partialPnl;
            position.remainingSize = position.size * (1 - cfg.tp1ClosePercent / 100);
            position.tp1Hit = true;
            position.sl = position.entryPrice;
          } else {
            position.exitPrice = exitPrice;
            position.exitIndex = i + 1;
            position.exitReason = exitResult.reason;
            position.pnl = pnlResult.pnl - exitFee;
            position.pnlPercent = (position.pnl / position.initialMargin) * 100;
            position.fees = position.entryFee + exitFee;
            position.holdingPeriod = i + 1 - position.entryIndex;
            
            capital += position.pnl;
            trades.push(position);
            
            position = null;
          }
        }
      }
      
      if (!position && analysis.signal !== 'neutral') {
        if (!passesStrategyFilter(analysis, cfg.strategy)) {
          continue;
        }
        
        var rawEntryPrice = nextCandle.o;
        var entryPrice = applySlippage(rawEntryPrice, analysis.signal, true);
        var atr = analysis.atr;
        
        if (!atr || atr < rawEntryPrice * 0.001) {
          continue;
        }
        
        var sl, tp1, tp2;
        if (analysis.signal === 'long') {
          sl = entryPrice - atr * cfg.slMultiplier;
          tp1 = entryPrice + atr * cfg.tp1Multiplier;
          tp2 = entryPrice + atr * cfg.tp2Multiplier;
        } else {
          sl = entryPrice + atr * cfg.slMultiplier;
          tp1 = entryPrice - atr * cfg.tp1Multiplier;
          tp2 = entryPrice - atr * cfg.tp2Multiplier;
        }
        
        var riskPerTrade = capital * (cfg.riskPercent / 100);
        var slDistance = Math.abs(entryPrice - sl);
        var slPercent = slDistance / entryPrice;
        
        var positionSize = riskPerTrade / slPercent;
        var margin = positionSize / cfg.leverage;
        
        if (margin > capital * 0.5) {
          margin = capital * 0.5;
          positionSize = margin * cfg.leverage;
        }
        
        var entryFee = positionSize * cfg.tradingFee;
        totalFees += entryFee;
        
        position = {
          id: ++tradeId,
          type: analysis.signal,
          entryPrice: entryPrice,
          entryIndex: i + 1,
          size: positionSize,
          initialMargin: margin,
          leverage: cfg.leverage,
          sl: sl,
          tp1: tp1,
          tp2: tp2,
          tp1Hit: false,
          remainingSize: positionSize,
          confidence: analysis.confidence,
          entryFee: entryFee,
          riskAmount: riskPerTrade
        };
      }
    }
    
    if (position) {
      var lastPrice = klines[klines.length - 1].c;
      var exitPrice = applySlippage(lastPrice, position.type, false);
      var pnlResult = calculatePnL(position, exitPrice, false);
      var exitFee = pnlResult.exitValue * cfg.tradingFee;
      
      position.exitPrice = exitPrice;
      position.exitIndex = klines.length - 1;
      position.exitReason = 'پایان دوره';
      position.pnl = pnlResult.pnl - exitFee;
      position.pnlPercent = (position.pnl / position.initialMargin) * 100;
      position.fees = position.entryFee + exitFee;
      position.holdingPeriod = klines.length - 1 - position.entryIndex;
      
      capital += position.pnl;
      trades.push(position);
    }
    
    return calculateTestStats(trades, capital, cfg.initialCapital, totalFees, equityCurve, drawdowns);
  }

  function calculateUnrealizedPnL(position, currentPrice) {
    var diff = currentPrice - position.entryPrice;
    if (position.type === 'short') diff = -diff;
    var size = position.tp1Hit ? position.remainingSize : position.size;
    return (diff / position.entryPrice) * size;
  }

  function applySlippage(price, positionType, isEntry) {
    var slippageFactor = config.slippage;
    
    if (positionType === 'long') {
      return isEntry ? price * (1 + slippageFactor) : price * (1 - slippageFactor);
    } else {
      return isEntry ? price * (1 - slippageFactor) : price * (1 + slippageFactor);
    }
  }

  function analyzeForBacktest(klines, price) {
    var result = {
      signal: 'neutral',
      confidence: 0,
      atr: 0,
      reasons: []
    };
    
    if (!klines || klines.length < 50) return result;
    
    var closes = klines.map(function(k) { return k.c; });
    
    var rsi = TradingCore.calcRSI(closes, 14);
    var ema21 = TradingCore.calcEMA(closes, 21);
    var ema50 = TradingCore.calcEMA(closes, 50);
    var macd = TradingCore.calcMACD(closes);
    var bb = TradingCore.calcBB(closes, 20, 2);
    var adx = TradingCore.calcADX(klines, 14);
    var atr = TradingCore.calcATR(klines, 14, price);
    
    result.atr = atr;
    result.adx = adx;
    
    var longPts = 0, shortPts = 0;
    
    // RSI Analysis - Enhanced
    if (rsi <= 25) { longPts += 4; result.reasons.push('RSI Oversold'); }
    else if (rsi <= 35) { longPts += 2; result.reasons.push('RSI'); }
    else if (rsi >= 75) { shortPts += 4; result.reasons.push('RSI Overbought'); }
    else if (rsi >= 65) { shortPts += 2; result.reasons.push('RSI'); }
    
    // Trend Analysis
    var trend = 'neutral';
    if (price > ema21 && ema21 > ema50) {
      trend = 'up';
      longPts += 2;
      result.reasons.push('Trend');
    } else if (price < ema21 && ema21 < ema50) {
      trend = 'down';
      shortPts += 2;
      result.reasons.push('Trend');
    }
    result.trend = trend;
    
    // MACD Analysis
    if (macd.histogram > 0 && macd.line > macd.signal) { 
      longPts += 2; 
    } else if (macd.histogram < 0 && macd.line < macd.signal) { 
      shortPts += 2; 
    }
    
    // Bollinger Bands Analysis
    var bbPos = (price - bb.lower) / (bb.upper - bb.lower);
    if (bbPos <= 0.1) { longPts += 3; result.reasons.push('BB'); }
    else if (bbPos <= 0.2) { longPts += 1; }
    else if (bbPos >= 0.9) { shortPts += 3; result.reasons.push('BB'); }
    else if (bbPos >= 0.8) { shortPts += 1; }
    
    // ADX Analysis - Trend Strength
    if (adx.adx >= 25) {
      if (adx.trend === 'strong_up') { longPts += 2; }
      else if (adx.trend === 'strong_down') { shortPts += 2; }
    } else if (adx.adx < 20) {
      // Ranging market - reduce confidence
      longPts = Math.max(0, longPts - 1);
      shortPts = Math.max(0, shortPts - 1);
    }
    
    // Volume confirmation
    var volumeAnalysis = TradingCore.analyzeVolume ? TradingCore.analyzeVolume(klines, klines[klines.length - 1].v) : null;
    if (volumeAnalysis && volumeAnalysis.strength > 0) {
      if (longPts > shortPts) longPts += volumeAnalysis.strength;
      else if (shortPts > longPts) shortPts += volumeAnalysis.strength;
    }
    
    var minScore = 4;
    var minDiff = 2;
    
    if (longPts >= minScore && longPts > shortPts + minDiff) {
      result.signal = 'long';
      result.confidence = Math.min(10, Math.round(longPts / 1.5));
    } else if (shortPts >= minScore && shortPts > longPts + minDiff) {
      result.signal = 'short';
      result.confidence = Math.min(10, Math.round(shortPts / 1.5));
    }
    
    return result;
  }

  function passesStrategyFilter(analysis, strategy) {
    if (strategy === 'conservative') {
      return analysis.confidence >= 6;
    }
    
    if (strategy === 'trend_following') {
      if (!analysis.adx || analysis.adx.adx < 25) return false;
      if (analysis.signal === 'long' && analysis.trend !== 'up') return false;
      if (analysis.signal === 'short' && analysis.trend !== 'down') return false;
    }
    
    return true;
  }

  function checkExit(position, candle, capital) {
    var result = { exit: false, price: 0, reason: '', isPartial: false };
    var size = position.tp1Hit ? position.remainingSize : position.size;
    
    if (position.type === 'long') {
      if (candle.l <= position.sl) {
        result.exit = true;
        result.price = position.sl;
        result.reason = position.tp1Hit ? 'برک‌ایون' : 'استاپ‌لاس';
        return result;
      }
      
      if (!position.tp1Hit && candle.h >= position.tp1) {
        result.exit = true;
        result.price = position.tp1;
        result.reason = 'تارگت ۱';
        result.isPartial = true;
        return result;
      }
      
      if (candle.h >= position.tp2) {
        result.exit = true;
        result.price = position.tp2;
        result.reason = 'تارگت ۲';
        return result;
      }
    } else {
      if (candle.h >= position.sl) {
        result.exit = true;
        result.price = position.sl;
        result.reason = position.tp1Hit ? 'برک‌ایون' : 'استاپ‌لاس';
        return result;
      }
      
      if (!position.tp1Hit && candle.l <= position.tp1) {
        result.exit = true;
        result.price = position.tp1;
        result.reason = 'تارگت ۱';
        result.isPartial = true;
        return result;
      }
      
      if (candle.l <= position.tp2) {
        result.exit = true;
        result.price = position.tp2;
        result.reason = 'تارگت ۲';
        return result;
      }
    }
    
    return result;
  }

  function calculatePnL(position, exitPrice, isPartial) {
    var cfg = config;
    var size = isPartial ? 
      position.size * (cfg.tp1ClosePercent / 100) : 
      (position.tp1Hit ? position.remainingSize : position.size);
    
    var diff = exitPrice - position.entryPrice;
    if (position.type === 'short') diff = -diff;
    
    var pnl = (diff / position.entryPrice) * size;
    
    return {
      pnl: pnl,
      exitValue: size
    };
  }

  function calculateTestStats(trades, finalCapital, initialCapital, totalFees, equityCurve, drawdowns) {
    if (trades.length === 0) {
      return {
        totalTrades: 0,
        winRate: 0,
        profitFactor: 0,
        netReturn: 0,
        maxDrawdown: 0,
        sharpeRatio: 0,
        avgHoldingPeriod: 0,
        avgWin: 0,
        avgLoss: 0,
        largestWin: 0,
        largestLoss: 0,
        consecutiveWins: 0,
        consecutiveLosses: 0
      };
    }
    
    var wins = trades.filter(function(t) { return t.pnl > 0; });
    var losses = trades.filter(function(t) { return t.pnl <= 0; });
    
    var totalWins = wins.reduce(function(sum, t) { return sum + t.pnl; }, 0);
    var totalLosses = Math.abs(losses.reduce(function(sum, t) { return sum + t.pnl; }, 0));
    
    var winRate = (wins.length / trades.length * 100);
    var profitFactor = totalLosses > 0 ? (totalWins / totalLosses) : (totalWins > 0 ? 999 : 0);
    var netReturn = ((finalCapital - initialCapital) / initialCapital * 100);
    
    // Maximum Drawdown
    var maxDrawdown = drawdowns.length > 0 ? Math.max.apply(null, drawdowns) : 0;
    
    // Average Win/Loss
    var avgWin = wins.length > 0 ? (totalWins / wins.length) : 0;
    var avgLoss = losses.length > 0 ? (totalLosses / losses.length) : 0;
    
    // Largest Win/Loss
    var largestWin = wins.length > 0 ? Math.max.apply(null, wins.map(function(t) { return t.pnl; })) : 0;
    var largestLoss = losses.length > 0 ? Math.min.apply(null, losses.map(function(t) { return t.pnl; })) : 0;
    
    // Consecutive Wins/Losses
    var consecutiveWins = 0, consecutiveLosses = 0;
    var currentWinStreak = 0, currentLossStreak = 0;
    
    trades.forEach(function(t) {
      if (t.pnl > 0) {
        currentWinStreak++;
        currentLossStreak = 0;
        if (currentWinStreak > consecutiveWins) consecutiveWins = currentWinStreak;
      } else {
        currentLossStreak++;
        currentWinStreak = 0;
        if (currentLossStreak > consecutiveLosses) consecutiveLosses = currentLossStreak;
      }
    });
    
    // Average Holding Period
    var avgHoldingPeriod = trades.reduce(function(sum, t) { 
      return sum + (t.holdingPeriod || 0); 
    }, 0) / trades.length;
    
    // Sharpe Ratio calculation
    var returns = [];
    for (var i = 1; i < equityCurve.length; i++) {
      var periodReturn = (equityCurve[i] - equityCurve[i-1]) / equityCurve[i-1];
      returns.push(periodReturn);
    }
    
    var avgReturn = returns.length > 0 ? 
      returns.reduce(function(a, b) { return a + b; }, 0) / returns.length : 0;
    var returnStdDev = calculateStdDev(returns, avgReturn);
    
    // Annualized Sharpe (assuming daily returns, ~252 trading days)
    var annualizedReturn = avgReturn * 252;
    var annualizedStdDev = returnStdDev * Math.sqrt(252);
    var sharpeRatio = annualizedStdDev > 0 ? 
      (annualizedReturn - config.riskFreeRate) / annualizedStdDev : 0;
    
    // Sortino Ratio (only downside deviation)
    var negativeReturns = returns.filter(function(r) { return r < 0; });
    var downsideDeviation = calculateStdDev(negativeReturns, 0);
    var sortinoRatio = downsideDeviation > 0 ?
      (annualizedReturn - config.riskFreeRate) / (downsideDeviation * Math.sqrt(252)) : 0;
    
    // Calmar Ratio
    var calmarRatio = maxDrawdown > 0 ? (netReturn / maxDrawdown) : 0;
    
    return {
      totalTrades: trades.length,
      wins: wins.length,
      losses: losses.length,
      winRate: winRate,
      profitFactor: profitFactor,
      netReturn: netReturn,
      finalCapital: finalCapital,
      maxDrawdown: maxDrawdown,
      sharpeRatio: sharpeRatio,
      sortinoRatio: sortinoRatio,
      calmarRatio: calmarRatio,
      avgWin: avgWin,
      avgLoss: avgLoss,
      avgWinPercent: wins.length > 0 ? 
        wins.reduce(function(sum, t) { return sum + t.pnlPercent; }, 0) / wins.length : 0,
      avgLossPercent: losses.length > 0 ?
        losses.reduce(function(sum, t) { return sum + Math.abs(t.pnlPercent); }, 0) / losses.length : 0,
      largestWin: largestWin,
      largestLoss: largestLoss,
      consecutiveWins: consecutiveWins,
      consecutiveLosses: consecutiveLosses,
      avgHoldingPeriod: avgHoldingPeriod,
      equityCurve: equityCurve,
      trades: trades
    };
  }

  // ==================== Walk-Forward Testing - Enhanced ====================
  function runWalkForward(klines, settings) {
    if (!klines || klines.length < 100) {
      return { error: 'داده کافی نیست (حداقل 100 کندل لازم است)' };
    }
    
    var cfg = Object.assign({}, config, settings || {});
    var totalLength = klines.length;
    
    console.log('[Monte Carlo] Starting Walk-Forward with ' + totalLength + ' candles');
    
    // Adaptive period calculation based on data size
    var trainPercent = cfg.trainPercent || 40;
    var testPercent = cfg.testPercent || 12;
    
    // Calculate sizes
    var trainSize = Math.floor(totalLength * (trainPercent / 100));
    var testSize = Math.floor(totalLength * (testPercent / 100));
    
    // Minimum sizes - be more lenient
    trainSize = Math.max(trainSize, 50);
    testSize = Math.max(testSize, 15);
    
    // Very small step for maximum periods with overlap
    var stepSize = Math.max(Math.floor(testSize / 5), 3);
    
    console.log('[Monte Carlo] Train size:', trainSize, 'Test size:', testSize, 'Step:', stepSize);
    
    var periods = [];
    var periodResults = [];
    var maxPeriods = cfg.maxPeriods || 40;
    
    var startIdx = 0;
    var attempts = 0;
    var maxAttempts = 100;
    
    while (startIdx + trainSize + testSize <= totalLength && periods.length < maxPeriods && attempts < maxAttempts) {
      attempts++;
      var trainEnd = startIdx + trainSize;
      var testEnd = Math.min(trainEnd + testSize, totalLength);
      
      var testKlines = klines.slice(trainEnd, testEnd);
      
      // Run backtest on test period with lower requirements
      if (testKlines.length >= 15) {
        var testResult = runBacktest(testKlines, cfg);
        
        // Accept periods even with just 1 trade
        if (!testResult.error && testResult.totalTrades >= 1) {
          periodResults.push(testResult);
          periods.push({
            start: startIdx,
            trainEnd: trainEnd,
            testEnd: testEnd,
            candlesInTest: testKlines.length,
            result: testResult
          });
        }
      }
      
      startIdx += stepSize;
    }
    
    console.log('[Monte Carlo] Found ' + periods.length + ' periods after ' + attempts + ' attempts');
    
    // If still not enough periods, try single-period approach with sliding window
    if (periodResults.length < 3) {
      console.log('[Monte Carlo] Trying sliding window approach');
      var windowSize = Math.floor(totalLength / 5);
      windowSize = Math.max(windowSize, 30);
      
      periods = [];
      periodResults = [];
      
      for (var w = 0; w < totalLength - windowSize && periodResults.length < maxPeriods; w += Math.floor(windowSize / 3)) {
        var windowKlines = klines.slice(w, w + windowSize);
        var windowResult = runBacktest(windowKlines, cfg);
        
        if (!windowResult.error && windowResult.totalTrades >= 1) {
          periodResults.push(windowResult);
          periods.push({
            start: w,
            trainEnd: w,
            testEnd: w + windowSize,
            candlesInTest: windowSize,
            result: windowResult
          });
        }
      }
    }
    
    // Last resort: single full backtest
    if (periodResults.length === 0) {
      console.log('[Monte Carlo] Fallback: single period backtest');
      var fallbackResult = runBacktest(klines, cfg);
      if (fallbackResult && !fallbackResult.error && fallbackResult.totalTrades >= 1) {
        periodResults.push(fallbackResult);
        periods.push({
          start: 0,
          trainEnd: 0,
          testEnd: totalLength,
          candlesInTest: totalLength,
          result: fallbackResult
        });
      } else {
        return { error: 'هیچ معامله‌ای در داده‌های موجود یافت نشد. سیگنال‌های کمی وجود دارد.' };
      }
    }
    
    // Calculate aggregate statistics
    var avgWinRate = periodResults.reduce(function(sum, r) { return sum + r.winRate; }, 0) / periodResults.length;
    var avgProfitFactor = periodResults.reduce(function(sum, r) { return sum + Math.min(r.profitFactor, 10); }, 0) / periodResults.length;
    var avgReturn = periodResults.reduce(function(sum, r) { return sum + r.netReturn; }, 0) / periodResults.length;
    var avgMaxDrawdown = periodResults.reduce(function(sum, r) { return sum + r.maxDrawdown; }, 0) / periodResults.length;
    var avgSharpe = periodResults.reduce(function(sum, r) { return sum + r.sharpeRatio; }, 0) / periodResults.length;
    var avgTrades = periodResults.reduce(function(sum, r) { return sum + r.totalTrades; }, 0) / periodResults.length;
    
    var winRateStdDev = calculateStdDev(periodResults.map(function(r) { return r.winRate; }), avgWinRate);
    var profitFactorStdDev = calculateStdDev(periodResults.map(function(r) { return Math.min(r.profitFactor, 10); }), avgProfitFactor);
    var returnStdDev = calculateStdDev(periodResults.map(function(r) { return r.netReturn; }), avgReturn);
    var drawdownStdDev = calculateStdDev(periodResults.map(function(r) { return r.maxDrawdown; }), avgMaxDrawdown);
    
    // Best and worst periods
    var sortedByReturn = periodResults.slice().sort(function(a, b) { return b.netReturn - a.netReturn; });
    var bestPeriod = sortedByReturn[0];
    var worstPeriod = sortedByReturn[sortedByReturn.length - 1];
    
    // Consistency score
    var profitablePeriods = periodResults.filter(function(r) { return r.netReturn > 0; }).length;
    var consistencyScore = (profitablePeriods / periodResults.length) * 100;
    
    return {
      periods: periods,
      periodResults: periodResults,
      stats: {
        numPeriods: periodResults.length,
        avgWinRate: avgWinRate,
        avgProfitFactor: avgProfitFactor,
        avgReturn: avgReturn,
        avgMaxDrawdown: avgMaxDrawdown,
        avgSharpe: avgSharpe,
        avgTrades: avgTrades,
        winRateStdDev: winRateStdDev,
        profitFactorStdDev: profitFactorStdDev,
        returnStdDev: returnStdDev,
        drawdownStdDev: drawdownStdDev,
        bestPeriodReturn: bestPeriod ? bestPeriod.netReturn : 0,
        worstPeriodReturn: worstPeriod ? worstPeriod.netReturn : 0,
        consistencyScore: consistencyScore,
        profitablePeriods: profitablePeriods
      }
    };
  }

  // ==================== K-Fold Cross-Validation ====================
  function runKFoldValidation(klines, settings) {
    if (!klines || klines.length < 200) {
      return { error: 'داده کافی نیست برای K-Fold' };
    }
    
    var cfg = Object.assign({}, config, settings || {});
    var k = cfg.kFolds || 5;
    var foldSize = Math.floor(klines.length / k);
    var foldResults = [];
    
    for (var i = 0; i < k; i++) {
      // Test fold
      var testStart = i * foldSize;
      var testEnd = (i === k - 1) ? klines.length : (i + 1) * foldSize;
      var testKlines = klines.slice(testStart, testEnd);
      
      // Run backtest on test fold
      var result = runBacktest(testKlines, cfg);
      
      if (!result.error && result.totalTrades > 0) {
        foldResults.push({
          fold: i + 1,
          startIndex: testStart,
          endIndex: testEnd,
          result: result
        });
      }
    }
    
    if (foldResults.length < 3) {
      return { error: 'نتایج K-Fold کافی نیست' };
    }
    
    // Aggregate K-Fold statistics
    var avgWinRate = foldResults.reduce(function(sum, f) { return sum + f.result.winRate; }, 0) / foldResults.length;
    var avgReturn = foldResults.reduce(function(sum, f) { return sum + f.result.netReturn; }, 0) / foldResults.length;
    var avgProfitFactor = foldResults.reduce(function(sum, f) { return sum + Math.min(f.result.profitFactor, 10); }, 0) / foldResults.length;
    
    var winRateVariance = calculateStdDev(foldResults.map(function(f) { return f.result.winRate; }), avgWinRate);
    var returnVariance = calculateStdDev(foldResults.map(function(f) { return f.result.netReturn; }), avgReturn);
    
    return {
      kFolds: k,
      foldResults: foldResults,
      stats: {
        avgWinRate: avgWinRate,
        avgReturn: avgReturn,
        avgProfitFactor: avgProfitFactor,
        winRateVariance: winRateVariance,
        returnVariance: returnVariance,
        robustnessScore: 100 - (winRateVariance + returnVariance) / 2
      }
    };
  }

  function calculateStdDev(values, mean) {
    if (values.length === 0) return 0;
    var variance = values.reduce(function(sum, val) {
      return sum + Math.pow(val - mean, 2);
    }, 0) / values.length;
    return Math.sqrt(variance);
  }

  // ==================== Monte Carlo Simulation - Enhanced ====================
  function runMonteCarlo(walkForwardResults, settings) {
    if (!walkForwardResults || !walkForwardResults.periodResults || walkForwardResults.periodResults.length === 0) {
      return { error: 'نتایج Walk-Forward کافی نیست' };
    }
    
    var cfg = Object.assign({}, config, settings || {});
    var periodResults = walkForwardResults.periodResults;
    
    // Extract statistics from periods
    var returns = periodResults.map(function(r) { return r.netReturn; });
    var winRates = periodResults.map(function(r) { return r.winRate / 100; });
    var drawdowns = periodResults.map(function(r) { return r.maxDrawdown; });
    
    // Calculate distribution parameters
    var meanReturn = returns.reduce(function(sum, r) { return sum + r; }, 0) / returns.length;
    var stdDevReturn = calculateStdDev(returns, meanReturn);
    var meanWinRate = winRates.reduce(function(sum, r) { return sum + r; }, 0) / winRates.length;
    var meanDrawdown = drawdowns.reduce(function(sum, d) { return sum + d; }, 0) / drawdowns.length;
    
    // Separate positive and negative returns for better simulation
    var positiveReturns = returns.filter(function(r) { return r > 0; });
    var negativeReturns = returns.filter(function(r) { return r <= 0; });
    
    var avgPositive = positiveReturns.length > 0 ?
      positiveReturns.reduce(function(sum, r) { return sum + r; }, 0) / positiveReturns.length : meanReturn;
    var avgNegative = negativeReturns.length > 0 ?
      negativeReturns.reduce(function(sum, r) { return sum + r; }, 0) / negativeReturns.length : -Math.abs(meanReturn);
    
    var stdPositive = positiveReturns.length > 1 ? calculateStdDev(positiveReturns, avgPositive) : stdDevReturn;
    var stdNegative = negativeReturns.length > 1 ? calculateStdDev(negativeReturns, avgNegative) : stdDevReturn;
    
    // Run Monte Carlo simulations
    var simulationResults = [];
    var simulationDrawdowns = [];
    var simulationSharpes = [];
    var initialCapital = cfg.initialCapital;
    
    // Apply scenario modifier
    var scenarioMultiplier = 1;
    if (cfg.scenario === 'conservative') {
      scenarioMultiplier = 0.7; // Reduce expected returns
    } else if (cfg.scenario === 'aggressive') {
      scenarioMultiplier = 1.3; // Increase expected returns
    }
    
    for (var sim = 0; sim < cfg.simulations; sim++) {
      var capital = initialCapital;
      var peakCapital = capital;
      var maxDrawdown = 0;
      var periodReturns = [];
      
      // Simulate based on number of periods
      var numPeriods = periodResults.length;
      
      for (var p = 0; p < numPeriods; p++) {
        // Random win/loss based on win rate
        var isWin = Math.random() < meanWinRate;
        
        // Generate return using Box-Muller transform for normal distribution
        var u1 = Math.random();
        var u2 = Math.random();
        var z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        
        var periodReturn;
        if (isWin) {
          periodReturn = avgPositive * scenarioMultiplier + z * stdPositive;
          periodReturn = Math.max(0.1, periodReturn); // Ensure positive
        } else {
          periodReturn = avgNegative * scenarioMultiplier + z * stdNegative;
          periodReturn = Math.min(-0.1, periodReturn); // Ensure negative
        }
        
        periodReturns.push(periodReturn);
        
        // Apply return to capital
        capital = capital * (1 + periodReturn / 100);
        
        // Track drawdown
        if (capital > peakCapital) {
          peakCapital = capital;
        }
        var currentDrawdown = ((peakCapital - capital) / peakCapital) * 100;
        if (currentDrawdown > maxDrawdown) {
          maxDrawdown = currentDrawdown;
        }
      }
      
      var finalReturn = ((capital - initialCapital) / initialCapital) * 100;
      simulationResults.push(finalReturn);
      simulationDrawdowns.push(maxDrawdown);
      
      // Calculate Sharpe for this simulation
      var simAvgReturn = periodReturns.reduce(function(a, b) { return a + b; }, 0) / periodReturns.length;
      var simStdDev = calculateStdDev(periodReturns, simAvgReturn);
      var simSharpe = simStdDev > 0 ? (simAvgReturn / simStdDev) * Math.sqrt(12) : 0; // Annualized
      simulationSharpes.push(simSharpe);
    }
    
    // Sort results for percentile calculation
    simulationResults.sort(function(a, b) { return a - b; });
    simulationDrawdowns.sort(function(a, b) { return a - b; });
    simulationSharpes.sort(function(a, b) { return a - b; });
    
    // Calculate percentiles
    var medianIdx = Math.floor(simulationResults.length / 2);
    var percentile5Idx = Math.floor(simulationResults.length * 0.05);
    var percentile10Idx = Math.floor(simulationResults.length * 0.10);
    var percentile25Idx = Math.floor(simulationResults.length * 0.25);
    var percentile75Idx = Math.floor(simulationResults.length * 0.75);
    var percentile90Idx = Math.floor(simulationResults.length * 0.90);
    var percentile95Idx = Math.floor(simulationResults.length * 0.95);
    
    var medianReturn = simulationResults[medianIdx];
    var worstCase = simulationResults[percentile5Idx];
    var bestCase = simulationResults[percentile95Idx];
    
    // Calculate probability of profit
    var profitableSims = simulationResults.filter(function(r) { return r > 0; }).length;
    var probabilityOfProfit = (profitableSims / simulationResults.length) * 100;
    
    // Calculate probability of specific returns
    var probReturn10Plus = simulationResults.filter(function(r) { return r >= 10; }).length / simulationResults.length * 100;
    var probReturn20Plus = simulationResults.filter(function(r) { return r >= 20; }).length / simulationResults.length * 100;
    var probLoss10Plus = simulationResults.filter(function(r) { return r <= -10; }).length / simulationResults.length * 100;
    
    // Calculate confidence interval
    var confidenceIdx = Math.floor((100 - cfg.confidenceLevel) / 2 / 100 * simulationResults.length);
    var confidenceLower = simulationResults[confidenceIdx];
    var confidenceUpper = simulationResults[simulationResults.length - confidenceIdx - 1];
    
    // Distribution histogram data
    var histogramBins = 20;
    var minReturn = simulationResults[0];
    var maxReturn = simulationResults[simulationResults.length - 1];
    var binWidth = (maxReturn - minReturn) / histogramBins;
    var histogram = [];
    
    for (var b = 0; b < histogramBins; b++) {
      var binStart = minReturn + b * binWidth;
      var binEnd = binStart + binWidth;
      var count = simulationResults.filter(function(r) {
        return r >= binStart && (b === histogramBins - 1 ? r <= binEnd : r < binEnd);
      }).length;
      histogram.push({
        binStart: binStart,
        binEnd: binEnd,
        binMid: (binStart + binEnd) / 2,
        count: count,
        percentage: (count / simulationResults.length) * 100
      });
    }
    
    // Risk of Ruin calculation
    var ruinThreshold = -50; // 50% loss considered ruin
    var ruinProb = simulationResults.filter(function(r) { return r <= ruinThreshold; }).length / simulationResults.length * 100;
    
    // Expected Shortfall (CVaR at 5%)
    var worstReturns = simulationResults.slice(0, percentile5Idx);
    var expectedShortfall = worstReturns.length > 0 ?
      worstReturns.reduce(function(a, b) { return a + b; }, 0) / worstReturns.length : worstCase;
    
    return {
      simulations: cfg.simulations,
      probabilityOfProfit: probabilityOfProfit,
      medianReturn: medianReturn,
      meanReturn: simulationResults.reduce(function(a, b) { return a + b; }, 0) / simulationResults.length,
      bestCase: bestCase,
      worstCase: worstCase,
      probReturn10Plus: probReturn10Plus,
      probReturn20Plus: probReturn20Plus,
      probLoss10Plus: probLoss10Plus,
      expectedShortfall: expectedShortfall,
      riskOfRuin: ruinProb,
      confidenceInterval: {
        lower: confidenceLower,
        upper: confidenceUpper,
        level: cfg.confidenceLevel
      },
      percentiles: {
        p5: simulationResults[percentile5Idx],
        p10: simulationResults[percentile10Idx],
        p25: simulationResults[percentile25Idx],
        p50: medianReturn,
        p75: simulationResults[percentile75Idx],
        p90: simulationResults[percentile90Idx],
        p95: simulationResults[percentile95Idx]
      },
      drawdownStats: {
        median: simulationDrawdowns[medianIdx],
        p95: simulationDrawdowns[percentile95Idx],
        max: simulationDrawdowns[simulationDrawdowns.length - 1]
      },
      sharpeStats: {
        median: simulationSharpes[medianIdx],
        p25: simulationSharpes[percentile25Idx],
        p75: simulationSharpes[percentile75Idx]
      },
      histogram: histogram,
      allResults: simulationResults
    };
  }

  // ==================== Full Test Runner ====================
  function runFullTest(klines, settings) {
    var cfg = Object.assign({}, config, settings || {});
    
    // Step 1: Walk-Forward
    var walkForwardResults = runWalkForward(klines, cfg);
    if (walkForwardResults.error) {
      return { error: walkForwardResults.error };
    }
    
    // Step 2: K-Fold Cross-Validation
    var kFoldResults = runKFoldValidation(klines, cfg);
    
    // Step 3: Monte Carlo
    var monteCarloResults = runMonteCarlo(walkForwardResults, cfg);
    if (monteCarloResults.error) {
      return { error: monteCarloResults.error };
    }
    
    // Step 4: Calculate overall robustness score
    var wfStats = walkForwardResults.stats;
    var mcStats = monteCarloResults;
    
    var robustnessScore = 0;
    
    // Win rate contribution (0-20 points)
    if (wfStats.avgWinRate >= 60) robustnessScore += 20;
    else if (wfStats.avgWinRate >= 55) robustnessScore += 15;
    else if (wfStats.avgWinRate >= 50) robustnessScore += 10;
    else if (wfStats.avgWinRate >= 45) robustnessScore += 5;
    
    // Profit factor contribution (0-20 points)
    if (wfStats.avgProfitFactor >= 2) robustnessScore += 20;
    else if (wfStats.avgProfitFactor >= 1.5) robustnessScore += 15;
    else if (wfStats.avgProfitFactor >= 1.2) robustnessScore += 10;
    else if (wfStats.avgProfitFactor >= 1) robustnessScore += 5;
    
    // Return contribution (0-20 points)
    if (wfStats.avgReturn >= 30) robustnessScore += 20;
    else if (wfStats.avgReturn >= 20) robustnessScore += 15;
    else if (wfStats.avgReturn >= 10) robustnessScore += 10;
    else if (wfStats.avgReturn >= 0) robustnessScore += 5;
    
    // Consistency contribution (0-20 points)
    robustnessScore += Math.floor(wfStats.consistencyScore / 5);
    
    // Monte Carlo probability contribution (0-20 points)
    if (mcStats.probabilityOfProfit >= 70) robustnessScore += 20;
    else if (mcStats.probabilityOfProfit >= 60) robustnessScore += 15;
    else if (mcStats.probabilityOfProfit >= 50) robustnessScore += 10;
    else if (mcStats.probabilityOfProfit >= 40) robustnessScore += 5;
    
    return {
      walkForward: walkForwardResults,
      kFold: kFoldResults,
      monteCarlo: monteCarloResults,
      robustnessScore: Math.min(100, robustnessScore),
      overallVerdict: getOverallVerdict(robustnessScore, wfStats, mcStats)
    };
  }
  
  function getOverallVerdict(score, wfStats, mcStats) {
    if (score >= 80 && wfStats.avgProfitFactor >= 1.5 && mcStats.probabilityOfProfit >= 60) {
      return 'excellent';
    } else if (score >= 60 && wfStats.avgProfitFactor >= 1.2 && mcStats.probabilityOfProfit >= 55) {
      return 'good';
    } else if (score >= 40 && mcStats.probabilityOfProfit >= 50) {
      return 'moderate';
    } else if (score >= 25) {
      return 'risky';
    } else {
      return 'avoid';
    }
  }

  return {
    runBacktest: runBacktest,
    runWalkForward: runWalkForward,
    runKFoldValidation: runKFoldValidation,
    runMonteCarlo: runMonteCarlo,
    runFullTest: runFullTest
  };
})();

// Export
if (typeof window !== 'undefined') {
  window.MonteCarlo = MonteCarlo;
}

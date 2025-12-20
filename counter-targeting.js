/**
 * Counter-Targeting Module - ماژول سیگنال‌دهی معکوس
 * تولید سیگنال SHORT زمانی که سیگنال LONG ضعیف است اما شرایط بازگشت برقرار است
 */

var CounterTargeting = (function() {
  
  /**
   * بررسی فیلتر نقدینگی
   * جلوگیری از شورت‌های پرریسک زمانی که فشار خرید بالا است
   */
  function checkLiquidityFilter(orderBook) {
    if (!orderBook || !orderBook.bids || !orderBook.asks) {
      return { passed: true, reason: 'داده ناکافی' };
    }

    // محاسبه حجم کل خرید و فروش
    var totalBidVolume = orderBook.bids.reduce(function(sum, bid) {
      return sum + (bid.amount || 0);
    }, 0);

    var totalAskVolume = orderBook.asks.reduce(function(sum, ask) {
      return sum + (ask.amount || 0);
    }, 0);

    if (totalAskVolume === 0) {
      return { passed: true, reason: 'حجم فروش صفر' };
    }

    var pressureRatio = totalBidVolume / totalAskVolume;

    // اگر خریداران بیش از 2.5 برابر فروشندگان باشند، شورت پرریسک است
    if (pressureRatio > 2.5) {
      return {
        passed: false,
        reason: 'فشار خرید بالا (نسبت: ' + pressureRatio.toFixed(2) + 'x)',
        ratio: pressureRatio
      };
    }

    return {
      passed: true,
      reason: 'نقدینگی مناسب',
      ratio: pressureRatio
    };
  }

  /**
   * استخراج نزدیک‌ترین مقاومت از دیوارهای نقدینگی
   */
  function findNearestResistance(walls, currentPrice) {
    if (!walls || !walls.asks || walls.asks.length === 0) {
      return null;
    }

    // فیلتر کردن مقاومت‌هایی که بالاتر از قیمت فعلی هستند
    var resistances = walls.asks.filter(function(wall) {
      return wall.price > currentPrice;
    });

    if (resistances.length === 0) {
      return null;
    }

    // پیدا کردن نزدیک‌ترین مقاومت
    var nearest = resistances.reduce(function(min, wall) {
      var minDist = Math.abs(min.price - currentPrice);
      var wallDist = Math.abs(wall.price - currentPrice);
      return wallDist < minDist ? wall : min;
    }, resistances[0]);

    return nearest;
  }

  /**
   * استخراج نزدیک‌ترین حمایت از دیوارهای نقدینگی
   */
  function findNearestSupport(walls, currentPrice) {
    if (!walls || !walls.bids || walls.bids.length === 0) {
      return null;
    }

    // فیلتر کردن حمایت‌هایی که پایین‌تر از قیمت فعلی هستند
    var supports = walls.bids.filter(function(wall) {
      return wall.price < currentPrice;
    });

    if (supports.length === 0) {
      return null;
    }

    // پیدا کردن نزدیک‌ترین حمایت
    var nearest = supports.reduce(function(min, wall) {
      var minDist = Math.abs(min.price - currentPrice);
      var wallDist = Math.abs(wall.price - currentPrice);
      return wallDist < minDist ? wall : min;
    }, supports[0]);

    return nearest;
  }

  /**
   * بررسی شرایط برای تولید سیگنال SHORT معکوس
   * @param {Object} signal - سیگنال اصلی LONG
   * @param {Object} marketData - داده‌های بازار شامل results, orderBook, walls, etc.
   * @returns {Object} نتیجه بررسی با وضعیت و دلایل
   */
  function checkCounterShort(signal, marketData) {
    // بررسی اولیه: فقط برای سیگنال‌های LONG
    if (!signal || signal.type !== 'long') {
      return {
        shouldGenerate: false,
        status: 'NO_ACTION',
        reason: 'سیگنال اصلی LONG نیست'
      };
    }

    // شرط 1: بررسی ضعف سیگنال اصلی
    var confidence = signal.confidence || 0;
    var overallScore = marketData.overallScore || 100;

    var isLongWeak = confidence < 3 || overallScore < 70;

    if (!isLongWeak) {
      return {
        shouldGenerate: false,
        status: 'NO_ACTION',
        reason: 'سیگنال LONG قوی است (Confidence: ' + confidence + ', Score: ' + overallScore + ')'
      };
    }

    // شرط 2: بررسی شرایط تکنیکال برای Reversal
    
    // الف: اشباع خرید
    var stochRSI_K = null;
    if (signal.stochRsi && signal.stochRsi.k !== undefined) {
      stochRSI_K = signal.stochRsi.k;
    } else if (signal.stochRSI && signal.stochRSI.k !== undefined) {
      stochRSI_K = signal.stochRSI.k;
    }

    var rsi = signal.rsi || 50;
    var isOverbought = (stochRSI_K !== null && stochRSI_K >= 90) || rsi > 70;

    if (!isOverbought) {
      return {
        shouldGenerate: false,
        status: 'WAIT',
        reason: 'شرایط اشباع خرید برقرار نیست (RSI: ' + rsi.toFixed(1) + ', StochRSI_K: ' + (stochRSI_K !== null ? stochRSI_K.toFixed(1) : 'N/A') + ')'
      };
    }

    // ب: نزدیکی به مقاومت
    var currentPrice = marketData.currentPrice || signal.entry || 0;
    var walls = marketData.walls || signal.orderBookWalls || null;
    var nearestResistance = findNearestResistance(walls, currentPrice);

    var atResistance = false;
    var resistancePrice = null;
    var resistanceDistance = null;

    // اگر walls موجود نیست، از staticSR استفاده کن
    if (!nearestResistance && signal.staticSR && signal.staticSR.nearestResistance) {
      var staticResistance = signal.staticSR.nearestResistance;
      if (staticResistance.price && currentPrice > 0) {
        resistancePrice = staticResistance.price;
        resistanceDistance = ((resistancePrice - currentPrice) / currentPrice) * 100;
        atResistance = resistanceDistance > 0 && resistanceDistance < 0.5;
      }
    } else if (nearestResistance && currentPrice > 0) {
      resistancePrice = nearestResistance.price;
      resistanceDistance = ((resistancePrice - currentPrice) / currentPrice) * 100;
      // فاصله کمتر از 0.5% = نزدیک به مقاومت
      atResistance = resistanceDistance > 0 && resistanceDistance < 0.5;
    }

    if (!atResistance) {
      return {
        shouldGenerate: false,
        status: 'WAIT',
        reason: 'قیمت به مقاومت نزدیک نیست (فاصله: ' + (resistanceDistance !== null ? resistanceDistance.toFixed(2) + '%' : 'N/A') + ', walls: ' + (walls ? 'موجود' : 'ناموجود') + ')'
      };
    }

    // ج: همگرایی با روند تایم‌فریم بالاتر
    var results = marketData.results || {};
    var trend4H = results['4h'] ? (results['4h'].trend || 'neutral') : 'neutral';
    var trend1D = results['1d'] ? (results['1d'].trend || 'neutral') : 'neutral';

    var trendAlignment = trend4H === 'down' || trend4H === 'strong_down' || 
                         trend1D === 'down' || trend1D === 'strong_down';

    if (!trendAlignment) {
      return {
        shouldGenerate: false,
        status: 'WAIT',
        reason: 'روند تایم‌فریم بالاتر نزولی نیست (4H: ' + trend4H + ', 1D: ' + trend1D + ')'
      };
    }

    // شرط 3: فیلتر نقدینگی
    var orderBook = marketData.orderBook || signal.orderBook || null;
    var liquidityCheck = checkLiquidityFilter(orderBook);

    if (!liquidityCheck.passed) {
      return {
        shouldGenerate: false,
        status: 'RISKY_SHORT_CANCELLED',
        reason: liquidityCheck.reason
      };
    }

    // همه شرایط برقرار است - می‌توان سیگنال SHORT تولید کرد
    return {
      shouldGenerate: true,
      status: 'SHORT_SIGNAL',
      reason: 'همه شرایط برقرار است',
      conditions: {
        weakSignal: true,
        overbought: true,
        atResistance: true,
        trendAlignment: true,
        liquidityOk: true
      },
      resistance: {
        price: resistancePrice,
        distance: resistanceDistance
      }
    };
  }

  /**
   * تولید سیگنال SHORT معکوس با پارامترهای محاسبه شده
   * @param {Object} signal - سیگنال اصلی LONG
   * @param {Object} marketData - داده‌های بازار
   * @param {Object} checkResult - نتیجه بررسی از checkCounterShort
   * @returns {Object} سیگنال SHORT معکوس
   */
  function generateCounterShortSignal(signal, marketData, checkResult) {
    var currentPrice = marketData.currentPrice || signal.entry || 0;
    var atr = marketData.atr || 0;
    var ema21 = signal.ema21 || currentPrice;
    var resistancePrice = checkResult.resistance && checkResult.resistance.price ? checkResult.resistance.price : null;
    
    // اگر resistancePrice موجود نیست، از currentPrice استفاده کن
    if (!resistancePrice || resistancePrice <= 0) {
      resistancePrice = currentPrice * 1.002; // 0.2% بالاتر از قیمت فعلی
    }

    // محاسبه نقطه ورود
    // استفاده از قیمت فعلی برای ورود تهاجمی (می‌توان بعداً لیمیت اوردر روی مقاومت اضافه کرد)
    var entry = currentPrice;

    // محاسبه حد ضرر: ResistanceWalls + (ATR * 1.5)
    var sl = resistancePrice + (atr * 1.5);

    // محاسبه تارگت: TP1 = EMA21
    var tp1 = ema21;

    // TP2 می‌تواند یک سطح حمایت دیگر باشد (مثلاً EMA50)
    var ema50 = signal.ema50 || ema21 * 0.98; // fallback
    var tp2 = ema50;

    // محاسبه اهرم (بر اساس فاصله Entry تا SL)
    var slDistance = Math.abs(sl - entry);
    var leverage = 3; // default
    if (slDistance > 0 && entry > 0) {
      var riskPercent = (slDistance / entry) * 100;
      if (riskPercent < 1) leverage = 5;
      else if (riskPercent < 2) leverage = 4;
      else if (riskPercent < 3) leverage = 3;
      else leverage = 2;
    }

    // دلایل تولید سیگنال معکوس
    var reasons = [
      'سیگنال معکوس (Counter-Targeting)',
      'اشباع خرید (RSI: ' + (signal.rsi || 0).toFixed(1) + ')',
      'نزدیکی به مقاومت (' + (checkResult.resistance.distance || 0).toFixed(2) + '%)',
      'روند تایم‌فریم بالاتر نزولی'
    ];

    return {
      type: 'short',
      entry: entry,
      sl: sl,
      tp1: tp1,
      tp2: tp2,
      leverage: leverage,
      confidence: 6, // اعتماد متوسط برای سیگنال معکوس
      reasons: reasons,
      isCounterSignal: true,
      originalSignal: {
        type: signal.type,
        confidence: signal.confidence
      },
      entryReasons: ['ورود تهاجمی در قیمت فعلی'],
      entryQuality: 'good',
      confluenceScore: 7
    };
  }

  /**
   * بررسی شرایط برای تولید سیگنال LONG معکوس
   * @param {Object} signal - سیگنال اصلی SHORT
   * @param {Object} marketData - داده‌های بازار شامل results, orderBook, walls, etc.
   * @returns {Object} نتیجه بررسی با وضعیت و دلایل
   */
  function checkCounterLong(signal, marketData) {
    // بررسی اولیه: فقط برای سیگنال‌های SHORT
    if (!signal || signal.type !== 'short') {
      return {
        shouldGenerate: false,
        status: 'NO_ACTION',
        reason: 'سیگنال اصلی SHORT نیست'
      };
    }

    // شرط 1: بررسی ضعف سیگنال اصلی
    var confidence = signal.confidence || 0;
    var overallScore = marketData.overallScore || 100;

    var isShortWeak = confidence < 3 || overallScore < 70;

    if (!isShortWeak) {
      return {
        shouldGenerate: false,
        status: 'NO_ACTION',
        reason: 'سیگنال SHORT قوی است (Confidence: ' + confidence + ', Score: ' + overallScore + ')'
      };
    }

    // شرط 2: بررسی شرایط تکنیکال برای Reversal
    
    // الف: اشباع فروش
    var stochRSI_K = null;
    if (signal.stochRsi && signal.stochRsi.k !== undefined) {
      stochRSI_K = signal.stochRsi.k;
    } else if (signal.stochRSI && signal.stochRSI.k !== undefined) {
      stochRSI_K = signal.stochRSI.k;
    }

    var rsi = signal.rsi || 50;
    var isOversold = (stochRSI_K !== null && stochRSI_K <= 10) || rsi < 30;

    if (!isOversold) {
      return {
        shouldGenerate: false,
        status: 'WAIT',
        reason: 'شرایط اشباع فروش برقرار نیست (RSI: ' + rsi.toFixed(1) + ', StochRSI_K: ' + (stochRSI_K !== null ? stochRSI_K.toFixed(1) : 'N/A') + ')'
      };
    }

    // ب: نزدیکی به حمایت
    var currentPrice = marketData.currentPrice || signal.entry || 0;
    var walls = marketData.walls || signal.orderBookWalls || null;
    var nearestSupport = findNearestSupport(walls, currentPrice);

    var atSupport = false;
    var supportPrice = null;
    var supportDistance = null;

    // اگر walls موجود نیست، از staticSR استفاده کن
    if (!nearestSupport && signal.staticSR && signal.staticSR.nearestSupport) {
      var staticSupport = signal.staticSR.nearestSupport;
      if (staticSupport.price && currentPrice > 0) {
        supportPrice = staticSupport.price;
        supportDistance = ((currentPrice - supportPrice) / currentPrice) * 100;
        atSupport = supportDistance > 0 && supportDistance < 0.5;
      }
    } else if (nearestSupport && currentPrice > 0) {
      supportPrice = nearestSupport.price;
      supportDistance = ((currentPrice - supportPrice) / currentPrice) * 100;
      // فاصله کمتر از 0.5% = نزدیک به حمایت
      atSupport = supportDistance > 0 && supportDistance < 0.5;
    }

    if (!atSupport) {
      return {
        shouldGenerate: false,
        status: 'WAIT',
        reason: 'قیمت به حمایت نزدیک نیست (فاصله: ' + (supportDistance !== null ? supportDistance.toFixed(2) + '%' : 'N/A') + ', walls: ' + (walls ? 'موجود' : 'ناموجود') + ')'
      };
    }

    // ج: همگرایی با روند تایم‌فریم بالاتر
    var results = marketData.results || {};
    var trend4H = results['4h'] ? (results['4h'].trend || 'neutral') : 'neutral';
    var trend1D = results['1d'] ? (results['1d'].trend || 'neutral') : 'neutral';

    var trendAlignment = trend4H === 'up' || trend4H === 'strong_up' || 
                         trend1D === 'up' || trend1D === 'strong_up';

    if (!trendAlignment) {
      return {
        shouldGenerate: false,
        status: 'WAIT',
        reason: 'روند تایم‌فریم بالاتر صعودی نیست (4H: ' + trend4H + ', 1D: ' + trend1D + ')'
      };
    }

    // شرط 3: فیلتر نقدینگی (برعکس - برای LONG باید فشار فروش بالا باشد)
    var orderBook = marketData.orderBook || signal.orderBook || null;
    var liquidityCheck = checkLiquidityFilter(orderBook);
    
    // برای LONG، می‌خواهیم فشار فروش بالا باشد (یعنی ask volume بیشتر از bid volume)
    // اما این فیلتر فعلاً فقط برای SHORT طراحی شده، پس برای LONG هم می‌توانیم از همان استفاده کنیم
    // یا می‌توانیم فیلتر را معکوس کنیم
    var askBidRatio = 1;
    if (orderBook && orderBook.bids && orderBook.asks) {
      var totalBidVolume = orderBook.bids.reduce(function(sum, bid) {
        return sum + (bid.amount || 0);
      }, 0);
      var totalAskVolume = orderBook.asks.reduce(function(sum, ask) {
        return sum + (ask.amount || 0);
      }, 0);
      if (totalBidVolume > 0) {
        askBidRatio = totalAskVolume / totalBidVolume;
      }
    }

    // اگر فروشندگان بیش از 2.5 برابر خریداران باشند، LONG پرریسک است
    if (askBidRatio > 2.5) {
      return {
        shouldGenerate: false,
        status: 'RISKY_LONG_CANCELLED',
        reason: 'فشار فروش بالا (نسبت: ' + askBidRatio.toFixed(2) + 'x)'
      };
    }

    // همه شرایط برقرار است - می‌توان سیگنال LONG تولید کرد
    return {
      shouldGenerate: true,
      status: 'LONG_SIGNAL',
      reason: 'همه شرایط برقرار است',
      conditions: {
        weakSignal: true,
        oversold: true,
        atSupport: true,
        trendAlignment: true,
        liquidityOk: true
      },
      support: {
        price: supportPrice,
        distance: supportDistance
      }
    };
  }

  /**
   * تولید سیگنال LONG معکوس با پارامترهای محاسبه شده
   * @param {Object} signal - سیگنال اصلی SHORT
   * @param {Object} marketData - داده‌های بازار
   * @param {Object} checkResult - نتیجه بررسی از checkCounterLong
   * @returns {Object} سیگنال LONG معکوس
   */
  function generateCounterLongSignal(signal, marketData, checkResult) {
    var currentPrice = marketData.currentPrice || signal.entry || 0;
    var atr = marketData.atr || 0;
    var ema21 = signal.ema21 || currentPrice;
    var supportPrice = checkResult.support && checkResult.support.price ? checkResult.support.price : null;
    
    // اگر supportPrice موجود نیست، از currentPrice استفاده کن
    if (!supportPrice || supportPrice <= 0) {
      supportPrice = currentPrice * 0.998; // 0.2% پایین‌تر از قیمت فعلی
    }

    // محاسبه نقطه ورود
    // استفاده از قیمت فعلی برای ورود تهاجمی (می‌توان بعداً لیمیت اوردر روی حمایت اضافه کرد)
    var entry = currentPrice;

    // محاسبه حد ضرر: SupportWalls - (ATR * 1.5)
    var sl = supportPrice - (atr * 1.5);

    // محاسبه تارگت: TP1 = EMA21
    var tp1 = ema21;

    // TP2 می‌تواند یک سطح مقاومت دیگر باشد (مثلاً EMA50)
    var ema50 = signal.ema50 || ema21 * 1.02; // fallback
    var tp2 = ema50;

    // محاسبه اهرم (بر اساس فاصله Entry تا SL)
    var slDistance = Math.abs(entry - sl);
    var leverage = 3; // default
    if (slDistance > 0 && entry > 0) {
      var riskPercent = (slDistance / entry) * 100;
      if (riskPercent < 1) leverage = 5;
      else if (riskPercent < 2) leverage = 4;
      else if (riskPercent < 3) leverage = 3;
      else leverage = 2;
    }

    // دلایل تولید سیگنال معکوس
    var reasons = [
      'سیگنال معکوس (Counter-Targeting)',
      'اشباع فروش (RSI: ' + (signal.rsi || 0).toFixed(1) + ')',
      'نزدیکی به حمایت (' + (checkResult.support.distance || 0).toFixed(2) + '%)',
      'روند تایم‌فریم بالاتر صعودی'
    ];

    return {
      type: 'long',
      entry: entry,
      sl: sl,
      tp1: tp1,
      tp2: tp2,
      leverage: leverage,
      confidence: 6, // اعتماد متوسط برای سیگنال معکوس
      reasons: reasons,
      isCounterSignal: true,
      originalSignal: {
        type: signal.type,
        confidence: signal.confidence
      },
      entryReasons: ['ورود تهاجمی در قیمت فعلی'],
      entryQuality: 'good',
      confluenceScore: 7
    };
  }

  // Public API
  return {
    checkCounterShort: checkCounterShort,
    generateCounterShortSignal: generateCounterShortSignal,
    checkCounterLong: checkCounterLong,
    generateCounterLongSignal: generateCounterLongSignal,
    checkLiquidityFilter: checkLiquidityFilter,
    findNearestResistance: findNearestResistance,
    findNearestSupport: findNearestSupport
  };

})();

// Export to global scope
if (typeof window !== 'undefined') {
  window.CounterTargeting = CounterTargeting;
}
if (typeof globalThis !== 'undefined') {
  globalThis.CounterTargeting = CounterTargeting;
}


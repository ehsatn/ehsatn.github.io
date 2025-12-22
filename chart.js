// Trading Assistant PWA - Chart Module v1.0
// Candlestick Chart with Indicators

var Chart = (function() {
  var canvas, ctx;
  var chartData = {
    klines: [],
    ema21: [],
    ema50: [],
    bb: null,
    signals: []
  };
  
  var config = {
    padding: { top: 30, right: 60, bottom: 40, left: 10 },
    candleWidth: 8,
    candleGap: 2,
    colors: {
      bg: '#0a0f1c',
      grid: '#1a2332',
      text: '#9ca3af',
      bullish: '#10b981',
      bearish: '#ef4444',
      ema21: '#fbbf24',
      ema50: '#3b82f6',
      bbUpper: 'rgba(139, 92, 246, 0.5)',
      bbLower: 'rgba(139, 92, 246, 0.5)',
      bbFill: 'rgba(139, 92, 246, 0.1)',
      volume: 'rgba(100, 116, 139, 0.5)',
      signalLong: '#10b981',
      signalShort: '#ef4444'
    }
  };
  
  var viewState = {
    offset: 0,
    zoom: 1,
    isDragging: false,
    lastX: 0,
    showEMA: true,
    showBB: true,
    showVolume: true
  };

  function init(canvasId) {
    canvas = document.getElementById(canvasId);
    if (!canvas) return false;
    
    ctx = canvas.getContext('2d');
    setupCanvas();
    setupEvents();
    return true;
  }

  function setupCanvas() {
    var container = canvas.parentElement;
    var rect = container.getBoundingClientRect();
    
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  function setupEvents() {
    // Mouse drag for panning
    canvas.addEventListener('mousedown', function(e) {
      viewState.isDragging = true;
      viewState.lastX = e.clientX;
    });
    
    canvas.addEventListener('mousemove', function(e) {
      if (viewState.isDragging) {
        var dx = e.clientX - viewState.lastX;
        viewState.offset += dx / (config.candleWidth + config.candleGap);
        viewState.lastX = e.clientX;
        render();
      }
    });
    
    canvas.addEventListener('mouseup', function() {
      viewState.isDragging = false;
    });
    
    canvas.addEventListener('mouseleave', function() {
      viewState.isDragging = false;
    });
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', function(e) {
      viewState.isDragging = true;
      viewState.lastX = e.touches[0].clientX;
    });
    
    canvas.addEventListener('touchmove', function(e) {
      if (viewState.isDragging) {
        var dx = e.touches[0].clientX - viewState.lastX;
        viewState.offset += dx / (config.candleWidth + config.candleGap);
        viewState.lastX = e.touches[0].clientX;
        render();
        e.preventDefault();
      }
    });
    
    canvas.addEventListener('touchend', function() {
      viewState.isDragging = false;
    });
    
    // Zoom with wheel
    canvas.addEventListener('wheel', function(e) {
      e.preventDefault();
      var zoomDelta = e.deltaY > 0 ? 0.9 : 1.1;
      viewState.zoom = Math.max(0.5, Math.min(3, viewState.zoom * zoomDelta));
      config.candleWidth = Math.round(8 * viewState.zoom);
      render();
    });
    
    // Resize
    window.addEventListener('resize', function() {
      setupCanvas();
      render();
    });
  }

  function setData(klines, indicators) {
    chartData.klines = klines || [];
    
    if (indicators) {
      chartData.ema21 = indicators.ema21 || [];
      chartData.ema50 = indicators.ema50 || [];
      chartData.bb = indicators.bb || null;
      chartData.signals = indicators.signals || [];
    }
    
    // Reset view to show latest data
    viewState.offset = 0;
    
    render();
  }

  function calculateIndicators(klines) {
    if (!klines || klines.length < 50) return;
    
    var closes = klines.map(function(k) { return k.c; });
    
    // Calculate EMA21 for each point
    chartData.ema21 = [];
    chartData.ema50 = [];
    
    for (var i = 20; i < closes.length; i++) {
      var slice = closes.slice(0, i + 1);
      chartData.ema21.push({
        index: i,
        value: TradingCore.calcEMA(slice, 21)
      });
    }
    
    for (var j = 49; j < closes.length; j++) {
      var slice = closes.slice(0, j + 1);
      chartData.ema50.push({
        index: j,
        value: TradingCore.calcEMA(slice, 50)
      });
    }
  }

  function render() {
    if (!ctx || !chartData.klines.length) return;
    
    var width = canvas.width / window.devicePixelRatio;
    var height = canvas.height / window.devicePixelRatio;
    
    // Clear
    ctx.fillStyle = config.colors.bg;
    ctx.fillRect(0, 0, width, height);
    
    // Calculate visible range
    var chartWidth = width - config.padding.left - config.padding.right;
    var chartHeight = height - config.padding.top - config.padding.bottom;
    var volumeHeight = chartHeight * 0.15;
    var priceHeight = chartHeight - volumeHeight - 10;
    
    var visibleCandles = Math.floor(chartWidth / (config.candleWidth + config.candleGap));
    var startIdx = Math.max(0, chartData.klines.length - visibleCandles + Math.floor(viewState.offset));
    var endIdx = Math.min(chartData.klines.length, startIdx + visibleCandles);
    
    var visibleKlines = chartData.klines.slice(startIdx, endIdx);
    if (visibleKlines.length === 0) return;
    
    // Find price range
    var minPrice = Infinity, maxPrice = -Infinity;
    var maxVolume = 0;
    
    visibleKlines.forEach(function(k) {
      minPrice = Math.min(minPrice, k.l);
      maxPrice = Math.max(maxPrice, k.h);
      maxVolume = Math.max(maxVolume, k.v || 0);
    });
    
    var pricePadding = (maxPrice - minPrice) * 0.05;
    minPrice -= pricePadding;
    maxPrice += pricePadding;
    
    var priceRange = maxPrice - minPrice;
    var priceScale = priceHeight / priceRange;
    
    function priceToY(price) {
      return config.padding.top + (maxPrice - price) * priceScale;
    }
    
    function indexToX(idx) {
      var relativeIdx = idx - startIdx;
      return config.padding.left + relativeIdx * (config.candleWidth + config.candleGap) + config.candleWidth / 2;
    }
    
    // Draw grid
    drawGrid(width, height, minPrice, maxPrice, priceToY);
    
    // Draw Bollinger Bands
    if (viewState.showBB && chartData.bb) {
      drawBollingerBands(visibleKlines, startIdx, priceToY, indexToX);
    }
    
    // Draw EMAs
    if (viewState.showEMA) {
      drawEMA(chartData.ema21, startIdx, endIdx, priceToY, indexToX, config.colors.ema21);
      drawEMA(chartData.ema50, startIdx, endIdx, priceToY, indexToX, config.colors.ema50);
    }
    
    // Draw Volume
    if (viewState.showVolume && maxVolume > 0) {
      var volumeY = height - config.padding.bottom - volumeHeight;
      drawVolume(visibleKlines, startIdx, volumeY, volumeHeight, maxVolume, indexToX);
    }
    
    // Draw Candles
    drawCandles(visibleKlines, startIdx, priceToY, indexToX);
    
    // Draw signals
    drawSignals(chartData.signals, startIdx, endIdx, priceToY, indexToX);
    
    // Draw price axis
    drawPriceAxis(width, height, minPrice, maxPrice, priceToY);
    
    // Draw current price line
    if (visibleKlines.length > 0) {
      var currentPrice = visibleKlines[visibleKlines.length - 1].c;
      drawCurrentPriceLine(width, currentPrice, priceToY);
    }
  }

  function drawGrid(width, height, minPrice, maxPrice, priceToY) {
    ctx.strokeStyle = config.colors.grid;
    ctx.lineWidth = 0.5;
    
    // Horizontal grid lines
    var priceStep = (maxPrice - minPrice) / 6;
    for (var i = 0; i <= 6; i++) {
      var price = minPrice + priceStep * i;
      var y = priceToY(price);
      
      ctx.beginPath();
      ctx.moveTo(config.padding.left, y);
      ctx.lineTo(width - config.padding.right, y);
      ctx.stroke();
    }
  }

  function drawCandles(klines, startIdx, priceToY, indexToX) {
    klines.forEach(function(k, i) {
      var x = indexToX(startIdx + i);
      var isBullish = k.c >= k.o;
      
      var color = isBullish ? config.colors.bullish : config.colors.bearish;
      
      // Draw wick
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, priceToY(k.h));
      ctx.lineTo(x, priceToY(k.l));
      ctx.stroke();
      
      // Draw body
      var bodyTop = priceToY(Math.max(k.o, k.c));
      var bodyBottom = priceToY(Math.min(k.o, k.c));
      var bodyHeight = Math.max(1, bodyBottom - bodyTop);
      
      ctx.fillStyle = color;
      ctx.fillRect(
        x - config.candleWidth / 2,
        bodyTop,
        config.candleWidth,
        bodyHeight
      );
    });
  }

  function drawEMA(emaData, startIdx, endIdx, priceToY, indexToX, color) {
    if (!emaData || emaData.length === 0) return;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    
    var started = false;
    emaData.forEach(function(point) {
      if (point.index >= startIdx && point.index < endIdx) {
        var x = indexToX(point.index);
        var y = priceToY(point.value);
        
        if (!started) {
          ctx.moveTo(x, y);
          started = true;
        } else {
          ctx.lineTo(x, y);
        }
      }
    });
    
    ctx.stroke();
  }

  function drawBollingerBands(klines, startIdx, priceToY, indexToX) {
    if (klines.length < 20) return;
    
    var closes = klines.map(function(k) { return k.c; });
    
    // Calculate BB for visible range
    ctx.strokeStyle = config.colors.bbUpper;
    ctx.lineWidth = 1;
    
    var upperPoints = [];
    var lowerPoints = [];
    
    for (var i = 19; i < klines.length; i++) {
      var slice = closes.slice(Math.max(0, i - 19), i + 1);
      var bb = TradingCore.calcBB(slice, 20, 2);
      
      var x = indexToX(startIdx + i);
      upperPoints.push({ x: x, y: priceToY(bb.upper) });
      lowerPoints.push({ x: x, y: priceToY(bb.lower) });
    }
    
    // Draw fill
    if (upperPoints.length > 0) {
      ctx.fillStyle = config.colors.bbFill;
      ctx.beginPath();
      ctx.moveTo(upperPoints[0].x, upperPoints[0].y);
      
      upperPoints.forEach(function(p) { ctx.lineTo(p.x, p.y); });
      
      for (var j = lowerPoints.length - 1; j >= 0; j--) {
        ctx.lineTo(lowerPoints[j].x, lowerPoints[j].y);
      }
      
      ctx.closePath();
      ctx.fill();
      
      // Draw lines
      ctx.strokeStyle = config.colors.bbUpper;
      ctx.beginPath();
      upperPoints.forEach(function(p, idx) {
        if (idx === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
      
      ctx.strokeStyle = config.colors.bbLower;
      ctx.beginPath();
      lowerPoints.forEach(function(p, idx) {
        if (idx === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
    }
  }

  function drawVolume(klines, startIdx, volumeY, volumeHeight, maxVolume, indexToX) {
    klines.forEach(function(k, i) {
      var x = indexToX(startIdx + i);
      var isBullish = k.c >= k.o;
      var barHeight = (k.v / maxVolume) * volumeHeight;
      
      ctx.fillStyle = isBullish ? 
        'rgba(16, 185, 129, 0.4)' : 
        'rgba(239, 68, 68, 0.4)';
      
      ctx.fillRect(
        x - config.candleWidth / 2,
        volumeY + volumeHeight - barHeight,
        config.candleWidth,
        barHeight
      );
    });
  }

  function drawSignals(signals, startIdx, endIdx, priceToY, indexToX) {
    if (!signals || signals.length === 0) return;
    
    signals.forEach(function(signal) {
      if (signal.index >= startIdx && signal.index < endIdx) {
        var x = indexToX(signal.index);
        var y = priceToY(signal.price);
        
        ctx.fillStyle = signal.type === 'long' ? 
          config.colors.signalLong : 
          config.colors.signalShort;
        
        // Draw triangle
        ctx.beginPath();
        if (signal.type === 'long') {
          ctx.moveTo(x, y + 15);
          ctx.lineTo(x - 8, y + 25);
          ctx.lineTo(x + 8, y + 25);
        } else {
          ctx.moveTo(x, y - 15);
          ctx.lineTo(x - 8, y - 25);
          ctx.lineTo(x + 8, y - 25);
        }
        ctx.closePath();
        ctx.fill();
      }
    });
  }

  function drawPriceAxis(width, height, minPrice, maxPrice, priceToY) {
    ctx.fillStyle = config.colors.text;
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';
    
    var priceStep = (maxPrice - minPrice) / 6;
    for (var i = 0; i <= 6; i++) {
      var price = minPrice + priceStep * i;
      var y = priceToY(price);
      
      var priceText = formatChartPrice(price);
      ctx.fillText(priceText, width - config.padding.right + 5, y + 3);
    }
  }

  function drawCurrentPriceLine(width, price, priceToY) {
    var y = priceToY(price);
    
    ctx.strokeStyle = '#00E5B0';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 3]);
    ctx.beginPath();
    ctx.moveTo(config.padding.left, y);
    ctx.lineTo(width - config.padding.right, y);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Price label
    ctx.fillStyle = '#00E5B0';
    ctx.fillRect(width - config.padding.right, y - 10, 55, 20);
    ctx.fillStyle = '#0a0f1c';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(formatChartPrice(price), width - config.padding.right + 3, y + 4);
  }

  function formatChartPrice(price) {
    if (!price || !isFinite(price)) return '--';
    if (price >= 1000) return price.toFixed(0);
    if (price >= 1) return price.toFixed(2);
    return price.toFixed(6);
  }

  function toggleIndicator(indicator) {
    switch(indicator) {
      case 'ema':
        viewState.showEMA = !viewState.showEMA;
        break;
      case 'bb':
        viewState.showBB = !viewState.showBB;
        break;
      case 'volume':
        viewState.showVolume = !viewState.showVolume;
        break;
    }
    render();
  }

  function resetView() {
    viewState.offset = 0;
    viewState.zoom = 1;
    config.candleWidth = 8;
    render();
  }

  function cleanup() {
    // Clear chart data to free memory
    chartData.klines = [];
    chartData.ema21 = [];
    chartData.ema50 = [];
    chartData.bb = null;
    chartData.signals = [];
    
    // Reset view state
    viewState.offset = 0;
    viewState.zoom = 1;
    viewState.isDragging = false;
    viewState.lastX = 0;
    
    // Clear canvas if it exists
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  return {
    init: init,
    setData: setData,
    calculateIndicators: calculateIndicators,
    render: render,
    toggleIndicator: toggleIndicator,
    resetView: resetView,
    cleanup: cleanup,
    getViewState: function() { return viewState; }
  };
})();

// Export
if (typeof window !== 'undefined') {
  window.Chart = Chart;
}

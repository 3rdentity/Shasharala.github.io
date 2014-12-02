//TODO fullscreen fixes
var Engine = {
  fullscreen: function engineFullscreen() {
    var elem = this.canvas;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  },
  timestamp: function engineTimestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
  },
  update: function engineUpdate(step) {
    this.game.update(step);
    // space reserved for stats
  },
  render: function engineRender(dt) {
    this.game.render(dt);
    // space reserved for stats
  },
  run: function engineRun(game) {
    // attach the game to the engine
    this.game = game();
    this.game.cfg = this.game.cfg || {};
    this.game.init();
    // initialization
    var nowStamp,
        dt = 0,
        lastStamp = this.timestamp(),
        slowScale = this.game.cfg.slowScale || 1, // slow motion scaling factor
        step = 1/this.game.cfg.fps || 1/60,
        trueStep = slowScale * step;
    var engineLoop = function engineLoop() {
      nowStamp = this.timestamp();
      dt = dt + Math.min(1, (nowStamp - lastStamp) / 1000);
      while (dt > trueStep) {
        dt = dt - trueStep;
        // call the engine's update function in case something like stats are attached to engine later
        this.update(step);
      }
      // call the engine's render function in case something like stats are attached to engine later
      this.render(dt/slowScale);
      lastStamp = nowStamp;
      requestAnimationFrame(engineLoop.bind(this));
    }
    requestAnimationFrame(engineLoop.bind(this));
  }
};

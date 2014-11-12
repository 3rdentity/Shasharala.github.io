//TODO entity removal should be handled by splice/return to pool and handled in each object if that handling exists, as some objects may handle death differently, ie: slimes spawn smaller slimes on death.
//TODO all objects need a life property, but only killable npc's need a reaction function to decrement life and visually react?
//TODO consider a way to handle inactive objects. second canvas? Only push updates on changes/invalidation?
//TODO double buffer AI? This relates back to double buffering/using a second canvas
//TODO pre-allocate objects to a heap/pool?
//TODO base64 assets?
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



/*
//PROPER RESOURCE LOADING? DON'T FORGET TO POOL
loadResources: function(images, sounds, callback) {
    images    = images || [];
    sounds    = sounds || [];
    var count = images.length + sounds.length;
    var resources = { images: {}, sounds: {} };
    if (count == 0) {
      callback(resources);
    }
    else {

      var done = false;
      var loaded = function() {
        if (!done) {
          done = true; // ensure only called once, either by onload, or by setTimeout
          callback(resources);
        }
      }

      var onload = function() {
        if (--count == 0)
          loaded();
      };

      for(var n = 0 ; n < images.length ; n++) {
        var image = images[n];
        image = is.string(image) ? { id: image, url: image } : image;
        resources.images[image.id] = Engine.createImage(image.url, { onload: onload });
      }

      for(var n = 0 ; n < sounds.length ; n++) {
        var sound  = sounds[n];
        sound = is.string(sound) ? { id: sound, name: sound } : sound;
        resources.sounds[sound.id] = AudioFX(sound.name, sound, onload);
      }

      setTimeout(loaded, 15000); // need a timeout because HTML5 audio canplay event is VERY VERY FLAKEY (especially on slow connections)

    }
  }

};
*/

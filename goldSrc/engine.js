// there appears to be a memleak somewhere in Engine
/*
*########
*#ENGINE#
*########
*/
var Engine = {
  timestamp: function engineTimestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
  },
  loadPools: function engineLoadPools(objs, callback) {
    for (var i = 0; i < objs.length; i++) {
      this.game.obj[this.game.obj.indexOf(objs[i].id)].preAlloc(objs[i].num);
    }
    callback();
  },
  loadRes: function engineLoadRes(imgs, sounds, callback) {
    imgs = imgs || [];
    sounds = sounds || [];
    var len = imgs.length + sounds.length,
        res = { imgs: {}, sounds: {} };
    if (len === 0) {
      callback(res);
    }
    else {
      var done = false,
          loaded = function loadResLoaded() {
            if(!done) {
              done = true;
              callback(res);
            }
          };
    }
    var onload = function loadResOnload() {
      if (--len === 0) loaded();
    };
    for(var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      img = Is.string(img) ? { id: img, url: img } : img;
      res.imgs[img.id] = Engine.createImg(img.url, onload);
    }
    for(var i = 0; i < sounds.length; i++) {
      var sound = sounds[i];
      sound = Is.string(sound) ? { id: sound, name: sound } : sound;
      res.sounds[sound.id] = null; // audio lib needs to be called here
    }
    setTimeout(loaded, 8000); // fallback if any events fire awkwardly
  },
  createImg: function engineCreateImg(url, options) {
    options = options || {};
    var image = document.createElement("img");
    Dom.on("obj", image, "load", options);
    image.src = url;
    return image;
  },
  parseImg: function engineParseImg(img, callback) {
    var cW = img.width,
        cH = img.height,
        canvas = this.render2Canv(cW, cH, function(ctx) { ctx.drawImage(img, 0, 0); }),
        ctx = canvas.getContext('2d'),
        data = ctx.getImageData(0, 0, cW, cH).data,
        helpers = {
          valid: function(cX, cY) { return (cX >= 0) && (cX < cW) && (cY >= 0) && (cY < cH); },
          index: function(cX, cY) { return (cX + (cY * cW)) * 4; }, // imgData is stored as an array of indexes. each index contains one byte of RGBA data. every four indexes relates to one pixel
          pixel: function(cX, cY) { var i = this.index(cX, cY); return this.valid(cX, cY) ? (data[i]<<16)+(data[i+1]<<8)+(data[i+2]) : null; } // using bitwise operators to store pixel's RGB into 32 bits of data
        }
    for(cY = 0 ; cY < cH ; cY++)
      for(cX = 0 ; cX < cW ; cX++)
        callback(cX, cY, helpers.pixel(cX, cY), helpers);
  },
  render2Canv: function engineRender2Canv(w, h, render, elem) {
    var canvas = elem ? document.getElementById(elem) : document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    render(canvas.getContext("2d"));
    return canvas;
  },
  update: function engineUpdate(step) {
    this.game.update(step);
  },
  render: function engineRender(dt) {
    this.game.render(dt);
  },
  init: function engineInit(game) {
    // attach the game to the engine
    this.game = game();
    this.game.cfg = this.game.cfg || {};
    this.game.init();
  },
  run: function engineRun() {
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
        this.update(step);
      }
      this.render(dt/slowScale);
      lastStamp = nowStamp;
      requestAnimationFrame(engineLoop.bind(this));
    }
    requestAnimationFrame(engineLoop.bind(this));
  }
};

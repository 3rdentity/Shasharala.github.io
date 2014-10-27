//TODO entity removal should be handled by splice/return to pool and handled in each object if that handling exists, as some objects may handle death differently, ie: slimes spawn smaller slimes on death.
//TODO all objects need a life property, but only killable npc's need a reaction function to decrement life and visually react?
//TODO consider a way to handle inactive objects. second canvas? Only push updates on changes/invalidation?
//TODO double buffer AI? This relates back to double buffering/using a second canvas
//TODO pre-allocate objects to a heap/pool?
//TODO base64 assets?
//TODO fullscreen fixes
var Game = {
  avatar: undefined,
  pause: false,
  demo: false, // TODO reading about state management before continuing implementing these

  fullscreen: function gameFullscreen() {
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

  timestamp: function gameTimestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
  },

  add: function gameAdd(Name) {
    this.entities.push(new Name());
  },

  entityNameSearch: function gameEntityNameSearch(name) {
    for (var i = this.entities.length - 1; i >= 0; i--) {
      if (this.entities[i].uuid === name) {
        return i;
      }
    }
  },

  update: function gameUpdate(step) {
    // check and respond to any input from player
    Game.avatar.dir = Player.input.arrowKeys;
    // update frames and position

    for (var i = Game.entities.length - 1; i >= 0; i--) {
      var currEntity = Game.entities[i];
      // calculate direction and set velocity accordingly
      if("update" in currEntity) {
        currEntity.update(step);
      }
      else {
        switch (currEntity.dir) {
          case "1 0 0 0":
          case "1 1 0 1":
            currEntity.calcDir = "l";
            currEntity.vel = (currEntity.vel >= currEntity.velMax) ? currEntity.velMax : Math.accelerate(currEntity.vel, currEntity.accel, step);
            break;
          case "0 1 0 0":
          case "1 1 1 0":
            currEntity.calcDir = "u";
            currEntity.vel = (currEntity.vel >= currEntity.velMax) ? currEntity.velMax : Math.accelerate(currEntity.vel, currEntity.accel, step);
            break;
          case "0 0 1 0":
          case "0 1 1 1":
            currEntity.calcDir = "r";
            currEntity.vel = (currEntity.vel >= currEntity.velMax) ? currEntity.velMax : Math.accelerate(currEntity.vel, currEntity.accel, step);
            break;
          case "0 0 0 1":
          case "1 0 1 1":
            currEntity.calcDir = "d";
            currEntity.vel = (currEntity.vel >= currEntity.velMax) ? currEntity.velMax : Math.accelerate(currEntity.vel, currEntity.accel, step);
            break;
          case "1 1 0 0":
            currEntity.calcDir = "ul";
            currEntity.vel = (currEntity.vel >= currEntity.velMax) ? currEntity.velMax : Math.accelerate(currEntity.vel, currEntity.accel, step);
            break;
          case "0 1 1 0":
            currEntity.calcDir = "ur";
            currEntity.vel = (currEntity.vel >= currEntity.velMax) ? currEntity.velMax : Math.accelerate(currEntity.vel, currEntity.accel, step);
            break;
          case "0 0 1 1":
            currEntity.calcDir = "dr";
            currEntity.vel = (currEntity.vel >= currEntity.velMax) ? currEntity.velMax : Math.accelerate(currEntity.vel, currEntity.accel, step);
            break;
          case "1 0 0 1":
            currEntity.calcDir = "dl";
            currEntity.vel = (currEntity.vel >= currEntity.velMax) ? currEntity.velMax : Math.accelerate(currEntity.vel, currEntity.accel, step);
            break;
          case "0 0 0 0":
          case "0 1 0 1":
          case "1 0 1 0":
          case "1 1 1 1":
            currEntity.vel = (currEntity.vel <= 0) ? 0 : Math.accelerate( currEntity.vel, -currEntity.accel, step);
            break;
          default:
            // only objects with no dir should fall here
        }
        // update frames & position
        if (currEntity.vel === 0) {
          currEntity.srcY = currEntity.stills;
          switch (currEntity.calcDir) {
            case "l":
            case "ul":
            case "dl":
              currEntity.frameIndex = 3;
              break;
            case "u":
              currEntity.frameIndex = 2;
              break;
            case "r":
            case "ur":
            case "dr":
              currEntity.frameIndex = 1;
              break;
            case "d":
              currEntity.frameIndex = 0;
              currEntity.destY += currEntity.vel;
              break;
            default:
              // if something is falling in here there is a problem
          }
        }
        else {
          switch (currEntity.calcDir) {
            case "l":
              currEntity.srcY = currEntity.L;
              currEntity.destX -= currEntity.vel;
              break;
            case "u":
              currEntity.srcY = currEntity.U;
              currEntity.destY -= currEntity.vel;
              break;
            case "r":
              currEntity.srcY = currEntity.R;
              currEntity.destX += currEntity.vel;
              break;
              case "d":
              currEntity.srcY = currEntity.D;
              currEntity.destY += currEntity.vel;
              break;
            case "ul":
              if (currEntity.srcY === currEntity.U) {
              }
              else {
                currEntity.srcY = currEntity.L;
              }
              currEntity.destY -= currEntity.vel;
              currEntity.destX -= currEntity.vel;
              break;
            case "dl":
              if (currEntity.srcY === currEntity.D) {
              }
              else {
                currEntity.srcY = currEntity.L;
              }
              currEntity.destY += currEntity.vel;
              currEntity.destX -= currEntity.vel;
              break;
            case "ur":
              if (currEntity.srcY === currEntity.U) {
              }
              else {
                currEntity.srcY = currEntity.R;
              }
              currEntity.destY -= currEntity.vel;
              currEntity.destX += currEntity.vel;
              break;
            case "dr":
              if (currEntity.srcY === currEntity.D) {
              }
              else {
                currEntity.srcY = currEntity.R;
              }
              currEntity.destY += currEntity.vel;
              currEntity.destX += currEntity.vel;
              break;
            default:
              // only objects with no calcDir should fall here
          }
          // check that object has a tickCount
          if ("tickCount" in currEntity) {
            // check that object has a velocity
            if (currEntity.vel) {
              currEntity.tickCount = currEntity.tickCount + currEntity.vel;
            }
            else {
              currEntity.tickCount++;
            }
            if (currEntity.tickCount > currEntity.ticksPerFrame) {
              currEntity.tickCount = 0;
              if (currEntity.frameIndex < currEntity.numberOfFrames - 1) {
                currEntity.frameIndex++;
              }
              else {
                currEntity.frameIndex = 0;
              }
            }
          }
        }
      }
    }
  },

  render: function gameRender(dt) {
    // clear canvas
    Game.context.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
    //check if entity has its own render method. If not then render through default method
    for (var i = Game.entities.length - 1; i >= 0; i--) {
      var currEntity = Game.entities[i];
      if ("render" in currEntity) {
        currEntity.render(dt, Game.context);
      }
      else {
        Game.context.drawImage(
          currEntity.image,
          currEntity.frameIndex * currEntity.width,
          currEntity.srcY || 0,
          currEntity.width,
          currEntity.height,
          currEntity.destX + (currEntity.vel * dt) || currEntity.destX || 0,
          currEntity.destY + (currEntity.vel * dt) || currEntity.destY || 0,
          currEntity.width * currEntity.scale || currEntity.width,
          currEntity.height * currEntity.scale || currEntity.height
        );
      }
    }
  },

  run: function gameRun(options) {
    // initialization
    var nowStamp,
        dt = 0,
        lastStamp = Game.timestamp(),
        slowScale = options.slowScale || 1, // slow motion scaling factor
        step = 1/options.fps,
        trueStep = slowScale * step,
        update = options.update;
        render = options.render;
    this.entities = [];
    this.canvas = document.getElementById("viewport");
    this.context = this.canvas.getContext("2d");
    this.canvas.height = 500;
    this.canvas.width = 500;
    this.context.imageSmoothingEnabled = false;
    // load entities
    Game.add(Link);
    Game.add(TwinJacks); // for testing
    Game.avatar = Game.entities[Game.entityNameSearch("Link0")];

    // gameLoop
    //TODO consider waiting for onload of assets
    //TODO consider loading data that would be in a JSON from a local JS file. This bypasses JSON not having local load & saves a HTTP Header
    var gameLoop = function gameLoop() {
      nowStamp = Game.timestamp();
      dt = dt + Math.min(1, (nowStamp - lastStamp) / 1000);
      while (dt > trueStep) {
        dt = dt - trueStep;
        update(step);
      }
      render(dt/slowScale);
      lastStamp = nowStamp;
      requestAnimationFrame(gameLoop);
    };
    requestAnimationFrame(gameLoop);
  }
};

Game.options = {
  sideScroll: {
    fps: 60,
    slowScale: 1,
    update: undefined,
    render: undefined
  },
  topDown: {
    fps: 60,
    slowScale: 1,
    update: Game.update,
    render: Game.render
  },
  //will isometry work with this engine?
  isometric: {
    fps: 60,
    slowScale: 1,
    update: undefined,
    render: undefined
  },
  //will an fps work with this engine?
  fps: {
    fps: 60,
    slowScale: 1,
    update: undefined,
    render: undefined
  },
  //will hex work with this engine?
  hex: {
    fps: 60,
    slowScale: 1,
    update: undefined,
    render: undefined
  }
}

/*
//PROPER RESOURCE LOADING?
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
        resources.images[image.id] = Game.createImage(image.url, { onload: onload });
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

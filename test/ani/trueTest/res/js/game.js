//entity removal should be handled by splice/return to pool and handled in each object if that handling exists, as some objects may handle death differently, ie: slimes spawn smaller slimes on death.
//all objects need a life property, but only killable npc's need a reaction function to decrement life and visually react?
//add demo possibility. Something like if (object == avatar && demo == true) {ai} else {continue as normal};
//consider a way to handle inactive objects. second canvas? Only push updates on changes/invalidation?
//add a way for sprites to have "idle" frames
//double buffer AI? This relates back to double buffering/using a second canvas
//pre-allocate objects to a heap/pool?
var Game = {
  avatar: undefined,
  end: false,

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

  update: function gameUpdate(dt) {
    // check and respond to any input from player
    Game.avatar.dir = Player.input.arrowKeys;
    // update frames and position

    for (var i = Game.entities.length - 1; i >= 0; i--) {
      var currEntity = Game.entities[i];
      if(currEntity.update) {
        currEntity.update();
      }
      else {
        // calculate direction and set velocity accordingly
        switch (currEntity.dir) {
          case "1 0 0 0":
          case "1 1 0 1":
            currEntity.calcDir = "l";
            currEntity.vel = Physics.vel("+", currEntity.vel, currEntity.velMax, currEntity.accel, dt);
            break;
          case "0 1 0 0":
          case "1 1 1 0":
            currEntity.calcDir = "u";
            currEntity.vel = Physics.vel("+", currEntity.vel, currEntity.velMax, currEntity.accel, dt);
            break;
          case "0 0 1 0":
          case "0 1 1 1":
            currEntity.calcDir = "r";
            currEntity.vel = Physics.vel("+", currEntity.vel, currEntity.velMax, currEntity.accel, dt);
            break;
          case "0 0 0 1":
          case "1 0 1 1":
            currEntity.calcDir = "d";
            currEntity.vel = Physics.vel("+", currEntity.vel, currEntity.velMax, currEntity.accel, dt);
            break;
          case "1 1 0 0":
            currEntity.calcDir = "ul";
            currEntity.vel = Physics.vel("+", currEntity.vel, currEntity.velMax, currEntity.accel, dt);
            break;
          case "0 1 1 0":
            currEntity.calcDir = "ur";
            currEntity.vel = Physics.vel("+", currEntity.vel, currEntity.velMax, currEntity.accel, dt);
            break;
          case "0 0 1 1":
            currEntity.calcDir = "dr";
            currEntity.vel = Physics.vel("+", currEntity.vel, currEntity.velMax, currEntity.accel, dt);
            break;
          case "1 0 0 1":
            currEntity.calcDir = "dl";
            currEntity.vel = Physics.vel("+", currEntity.vel, currEntity.velMax, currEntity.accel, dt);
            break;
          case "0 0 0 0":
          case "0 1 0 1":
          case "1 0 1 0":
          case "1 1 1 1":
            currEntity.vel = Physics.vel("-", currEntity.vel, currEntity.velMax, currEntity.accel, dt);
        }
        // update frames
        if (currEntity.vel === 0) {
          console.log(currEntity.vel);
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
          }
        }
        else {
          switch (currEntity.calcDir) {
            case "l":
              currEntity.srcY = currEntity.L;
              break;
            case "ul":
              if (currEntity.srcY === currEntity.U) {
              }
              else {
                currEntity.srcY = currEntity.L;
              }
              break;
            case "dl":
              if (currEntity.srcY === currEntity.D) {
              }
              else {
                currEntity.srcY = currEntity.L;
              }
              break;
            case "u":
              currEntity.srcY = currEntity.U;
              break;
            case "r":
              currEntity.srcY = currEntity.R;
              break;
            case "ur":
              if (currEntity.srcY === currEntity.U) {
              }
              else {
                currEntity.srcY = currEntity.R;
              }
              break;
            case "dr":
              if (currEntity.srcY === currEntity.D) {
              }
              else {
                currEntity.srcY = currEntity.R;
              }
              break;
            case "d":
              currEntity.srcY = currEntity.D;
              break;
            default:
              currEntity.srcY = 0;
          }
          currEntity.tickCount++;
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
        // update position
        switch (currEntity.calcDir) {
          case "l":
            currEntity.destX = Math.floor(currEntity.destX - (dt * currEntity.vel));
            break;
          case "u":
            currEntity.destY = Math.floor(currEntity.destY - (dt * currEntity.vel));
            break;
          case "r":
            currEntity.destX = Math.floor(currEntity.destX + (dt * currEntity.vel));
            break;
          case "d":
            currEntity.destY = Math.floor(currEntity.destY + (dt * currEntity.vel));
            break;
          case "ul":
            currEntity.destY = Math.floor(currEntity.destY - (dt * currEntity.vel));
            currEntity.destX = Math.floor(currEntity.destX - (dt * currEntity.vel));
            break;
          case "ur":
            currEntity.destY = Math.floor(currEntity.destY - (dt * currEntity.vel));
            currEntity.destX = Math.floor(currEntity.destX + (dt * currEntity.vel));
            break;
          case "dr":
            currEntity.destY = Math.floor(currEntity.destY + (dt * currEntity.vel));
            currEntity.destX = Math.floor(currEntity.destX + (dt * currEntity.vel));
            break;
          case "dl":
            currEntity.destY = Math.floor(currEntity.destY + (dt * currEntity.vel));
            currEntity.destX = Math.floor(currEntity.destX - (dt * currEntity.vel));
        }
      }
    }
  },

  render: function gameRender() {
    // clear canvas
    Game.context.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
    //check if entity has its own render method. If not then render through default method
    for (var i = Game.entities.length - 1; i >= 0; i--) {
      var currEntity = Game.entities[i];
      if (currEntity.render) {
        currEntity.render(Game.context);
      }
      else {
        Game.context.drawImage(
          currEntity.image,
          currEntity.frameIndex * currEntity.width,
          currEntity.srcY || 0,
          currEntity.width,
          currEntity.height,
          currEntity.destX || 0,
          currEntity.destY || 0,
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
        update = options.update,
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

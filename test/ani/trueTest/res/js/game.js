var Game = {};
Game.avatar;
Game.end = false;
Game.fps = 50;

Game.add = function gameAdd(Name) {
  this.entities.push(new Name());
};

Game.entityNameSearch = function gameEntityNameSearch(name) {
  for (var i = 0; i < Game.entities.length; i++) {
    if (this.entities[i].uuid === name) {
      return i;
    }
  }
};

Game.updateFrameDefault = function gameUpdateFrameDefault(option) {
  if (this.stills === this.srcY && !option) {
    return;
  }
  if (option) {
    this.srcY = this.stills;
    switch (option) {
      case "l":
        this.frameIndex = 3;
        break;
      case "u":
        this.frameIndex = 2;
        break;
      case "r":
        this.frameIndex = 1;
        break;
      case "d":
        this.frameIndex = 0;
        break;
    }
  }
  else {
    this.tickCount++;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex++;
      }
      else {
        this.frameIndex = 0;
      }
    }
  }
};

Game.updatePosDefault = function gameUpdatePosDefault(option) {
  switch (option) {
    case "l":
      this.srcY = this.L;
      this.destX -= this.stepSize;
      break;
    case "u":
      this.srcY = this.U;
      this.destY -= this.stepSize;
      break;
    case "r":
      this.srcY = this.R;
      this.destX += this.stepSize;
      break;
    case "d":
      this.srcY = this.D;
      this.destY += this.stepSize;
      break;
  }
}

Game.drawDefault = function gameDrawDefault(context) {
  context.drawImage(
    this.image,
    this.frameIndex * this.width,
    this.srcY || 0,
    this.width,
    this.height,
    this.destX || 0,
    this.destY || 0,
    this.width * this.scale || this.width,
    this.height * this.scale || this.height
  );
};

Game.updateFrame = function gameUpdateFrame() {
  for (var i = 0; i < this.entities.length; i++) {
    this.entities[i].updateFrame();
  }
};

Game.updatePos = function gameUpdatePos(option) {
  for (var i = 0; i < this.entities.length; i++) {
    this.entities[i].updatePos(option);
  }
};

Game.draw = function gameDraw() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  for (var i=0; i < this.entities.length; i++) {
    this.entities[i].draw(this.context);
  }
};

Game.run  = (function firstGameRun() {
  var firstRun = true,
      loops = 0,
      maxLoops = 10,
      skipTicks = 1000 / Game.fps,
      nextGameTick = (new Date).getTime();
  return function gameRun() {
    if (firstRun) {
      firstRun = false;
    }
    else{
      loops = 0;

      while ((new Date).getTime() > nextGameTick && loops < maxLoops) {
        Game.updateFrame();
        Game.updatePos();
        nextGameTick += skipTicks;
        loops++;
      }
      if (loops) {
        Game.draw();
      }
    }
  };
})();

Game.loop = function(cb) {
  var _cb = function gameLoop_cb() {
    cb();
    requestAnimationFrame(_cb);
  };
  _cb();
};

Game.init = function gameInit(cb) {
  this.entities = [];
  this.canvas = document.getElementById("viewport");
  this.context = this.canvas.getContext("2d");
  this.canvas.height = 500;
  this.canvas.width = 500;
  this.context.imageSmoothingEnabled = false;
  // Load entities
  var i = 10;
  while (i--) {
    Game.add(TwinJacks);
  }
  Game.add(Avatar);
  Game.avatar = Game.entities[Game.entityNameSearch("avatar")];
  cb(Game.run);
};

Game.onKeyUp = function gameOnKeyUp(evt) {
  switch (evt.keyCode) {
    case 37:
      Game.avatar.updateFrame("l");
      break;
    case 38:
      Game.avatar.updateFrame("u");
      break;
    case 39:
      Game.avatar.updateFrame("r");
      break;
    case 40:
      Game.avatar.updateFrame("d");
      break;
  }
}

Game.onKeyDown = function gameOnKeyDown(evt) {
  switch (evt.keyCode) {
    case 37:
      Game.avatar.updatePos("l");
      break;
    case 38:
      Game.avatar.updatePos("u");
      break;
    case 39:
      Game.avatar.updatePos("r");
      break;
    case 40:
      Game.avatar.updatePos("d");
      break;
  }
}

document.addEventListener("keydown", Game.onKeyDown);
document.addEventListener("keyup", Game.onKeyUp);

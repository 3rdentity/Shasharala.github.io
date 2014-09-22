var game = {};

game.fps = 60;

game.add = function gameAdd(name) {
  //TODO unique identifiers!?
  this.entities.push(new name);
};

/*game.updatePos?
game.updateFram?*/

game.update = function gameUpdate() {
  console.log("update req");
  /*for (var i = 0; i < this.entities.length; i++) {
    this.entities[i].update
    game.sprite.render/update?
  }*/
};

game.draw = function gameDraw() {
  console.log("draw req");
  /*this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  for (var i=0; i < this.entities.length; i++) {
    this.entities[i].draw(this.context);
  }*/
};

game.run  = (function gameRun() {
  var loops = 0,
      firstRun = true,
      skipTicks = 1000 / game.fps,
      nextGameTick = (new Date).getTime();
  return function drawNUpdate() {
    if (firstRun==0) {
      firstRun = false;
    }
    else{
      loops = 0;

      while ((new Date).getTime() > nextGameTick) {
        game.update();
        nextGameTick += skipTicks;
        loops++;
      }
      if (loops) {
        game.draw();
      }
    }
  };
})();

game.loop = function(cb) {
  var _cb = function gameLoop_cb() {
    cb();
    requestAnimationFrame(_cb);
  };
  _cb();
};

game.init = function gameInit(cb) {
  this.entities = [];
  this.canvas = document.getElementById("viewport");
  this.context = this.canvas.getContext("2d");
  this.canvas.height = 500;
  this.canvas.width = 500;
  //load entities
  var i = 10;
  while (i--) {
    game.add(twinJacks);
  }
  cb(game.run);
};







/*game.sprite = function gameSprite(options) {
  var that = {},
    frameIndex = 0,
    tickCount = 0,
    ticksPerFrame = options.ticksPerFrame || 0,
    numberOfFrames = options.numberOfFrames || 1;

  that.updateFram = function updateFram(o) {
    if (o) {
      that.srcY = that.stills;
      switch (o) {
        case "l":
          frameIndex = 3;
          break;
        case "u":
          frameIndex = 2;
          break;
        case "r":
          frameIndex = 1;
          break;
        case "d":
          frameIndex = 0;
          break;
      }
    }
    else {
      tickCount += 1;
      if (tickCount > ticksPerFrame) {
        tickCount = 0;
        if (frameIndex < numberOfFrames - 1) {
          frameIndex += 1;
        }
        else {
          frameIndex = 0;
        }
      }
    }
  };

  that.updatePos = function updatePos(o) {
    switch (o) {
      case "l":
        that.srcY = that.L;
        that.updateFram();
        that.destX -= that.stepSize;
        break;
      case "u":
        that.srcY = that.U;
        that.updateFram();
        that.destY -= that.stepSize;
        break;
      case "r":
        that.srcY = that.R;
        that.updateFram();
        that.destX += that.stepSize;
        break;
      case "d":
        that.srcY = that.D;
        that.updateFram();
        that.destY += that.stepSize;
        break;
    }
  };

  that.render = function render() {
    game.context.imageSmoothingEnabled = false;
    for (var i=0; i < game.entities.length; i++) {
      game.entities[i].draw(game.context);
    }
    game.context.drawImage(
    that.image,
    frameIndex * that.width,
    that.srcY,
    that.width,
    that.height,
    that.destX,
    that.destY,
    that.width * that.scale,
    that.height * that.scale);
  };

  return that;
}*/



function onKeyUp(evt) {
  switch (evt.keyCode) {
    case 37:
      avatar.updateFram("l");
      break;
    case 38:
      avatar.updateFram("u");
      break;
    case 39:
      avatar.updateFram("r");
      break;
    case 40:
      avatar.updateFram("d");
      break;
  }
}

function onKeyDown(evt) {
  switch (evt.keyCode) {
    case 37:
      avatar.updatePos("l");
      break;
    case 38:
      avatar.updatePos("u");
      break;
    case 39:
      avatar.updatePos("r");
      break;
    case 40:
      avatar.updatePos("d");
      break;
  }
}

document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

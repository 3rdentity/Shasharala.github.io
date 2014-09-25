var Game = {};
Game.avatar;
Game.end = false;
Game.tickRate = 60;

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

Game.updateFrameDefault = function gameUpdateFrameDefault() {
  if (this.velocity === 0) {
    this.srcY = this.stills;
    switch (this.dir) {
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
    }
  }
  else {
    switch (this.dir) {
      case "l":
        this.srcY = this.L;
        break;
      case "u":
        this.srcY = this.U;
        break;
      case "r":
        this.srcY = this.R;
        break;
      case "d":
        this.srcY = this.D;
        break;
      default:
        this.srcY = 0;
    }
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

Game.updatePosDefault = function gameUpdatePosDefault() {
  if (this.velocity !== 0) {
    switch (this.dir) {
      case "l":
        this.destX -= this.velocity;
        break;
      case "u":
        this.destY -= this.velocity;
        break;
      case "r":
        this.destX += this.velocity;
        break;
      case "d":
        this.destY += this.velocity;
    }
  }
};

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

Game.updatePos = function gameUpdatePos() {
  for (var i = 0; i < this.entities.length; i++) {
    this.entities[i].updatePos();
  }
};

Game.draw = function gameDraw() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  for (var i=0; i < this.entities.length; i++) {
    this.entities[i].draw(this.context);
  }
};

Game.loop = function gameLoop() {
  var cb = function gameLoop_cb() {
    updateStats.update();
        Game.updateFrame();
        Game.updatePos();

        renderStats.update();
        Game.draw();
    requestAnimationFrame(cb);
  };
  cb();
};

Game.init = function gameInit(cb) {
  this.entities = [];
  this.canvas = document.getElementById("viewport");
  this.context = this.canvas.getContext("2d");
  this.canvas.height = 500;
  this.canvas.width = 500;
  this.context.imageSmoothingEnabled = false;
  // Load entities
  Game.add(Avatar);
  Game.avatar = Game.entities[Game.entityNameSearch("avatar")];
  cb();
};

Game.onKeyUp = function gameOnKeyUp(evt) {
  switch (evt.keyCode) {
    case 37:
    case 38:
    case 39:
    case 40:
      Game.avatar.velocity = 0;
  }
}

Game.onKeyDown = function gameOnKeyDown(evt) {
  switch (evt.keyCode) {
    case 37:
      Game.avatar.dir = "l";
      Game.avatar.velocity = Game.avatar.velocityDefault;
      break;
    case 38:
      Game.avatar.dir = "u";
      Game.avatar.velocity = Game.avatar.velocityDefault;
      break;
    case 39:
      Game.avatar.dir = "r";
      Game.avatar.velocity = Game.avatar.velocityDefault;
      break;
    case 40:
      Game.avatar.dir = "d";
      Game.avatar.velocity = Game.avatar.velocityDefault;
  }
}

document.addEventListener("keydown", Game.onKeyDown);
document.addEventListener("keyup", Game.onKeyUp);

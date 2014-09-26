var Game = {};
Game.avatar;
Game.end = false;

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

Game.calcDir = function gameCalcDir() {
  switch (this.dir) {
    case "1 0 0 0":
    case "1 1 0 1":
      this.calcDir = "l";
      this.velocity = this.velocityDefault;
      break;
    case "0 1 0 0":
    case "1 1 1 0":
      this.calcDir = "u";
      this.velocity = this.velocityDefault;
      break;
    case "0 0 1 0":
    case "0 1 1 1":
      this.calcDir = "r";
      this.velocity = this.velocityDefault;
      break;
    case "0 0 0 1":
    case "1 0 1 1":
      this.calcDir = "d";
      this.velocity = this.velocityDefault;
      break;
    case "1 1 0 0":
      this.calcDir = "ul";
      this.velocity = this.velocityDefault;
      break;
    case "0 1 1 0":
      this.calcDir = "ur";
      this.velocity = this.velocityDefault;
      break;
    case "0 0 1 1":
      this.calcDir = "dr";
      this.velocity = this.velocityDefault;
      break;
    case "1 0 0 1":
      this.calcDir = "dl";
      this.velocity = this.velocityDefault;
      break;
    case "0 0 0 0":
    case "0 1 0 1":
    case "1 0 1 0":
    case "1 1 1 1":
      this.velocity = 0;
  }
};

Game.updateFrameDefault = function gameUpdateFrameDefault() {
  if (this.velocity === 0) {
    this.srcY = this.stills;
    switch (this.calcDir) {
      case "l":
      case "ul":
      case "dl":
        this.frameIndex = 3;
        break;
      case "u":
        this.frameIndex = 2;
        break;
      case "r":
      case "ur":
      case "dr":
        this.frameIndex = 1;
        break;
      case "d":
        this.frameIndex = 0;
    }
  }
  else {
    switch (this.calcDir) {
      case "l":
        this.srcY = this.L;
        break;
      case "ul":
        if (this.srcY === this.U) {
        }
        else {
          this.srcY = this.L;
        }
        break;
      case "dl":
        if (this.srcY === this.D) {
        }
        else {
          this.srcY = this.L;
        }
        break;
      case "u":
        this.srcY = this.U;
        break;
      case "r":
        this.srcY = this.R;
        break;
      case "ur":
        if (this.srcY === this.U) {
        }
        else {
          this.srcY = this.R;
        }
        break;
      case "dr":
        if (this.srcY === this.D) {
        }
        else {
          this.srcY = this.R;
        }
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
  switch (this.calcDir) {
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
      break;
    case "ul":
      this.destY -= this.velocity;
      this.destX -= this.velocity;
      break;
    case "ur":
      this.destY -= this.velocity;
      this.destX += this.velocity;
      break;
    case "dr":
      this.destY += this.velocity;
      this.destX += this.velocity;
      break;
    case "dl":
      this.destY += this.velocity;
      this.destX -= this.velocity;
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

Game.update = function gameUpdate() {
  // Check and respond to any input from player
  Game.avatar.dir = Player.input.arrowKeys;
  // Update canvas
  this.updateFrame();
  this.updatePos();
}

Game.draw = function gameDraw() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  for (var i=0; i < this.entities.length; i++) {
    this.entities[i].draw(this.context);
  }
};

Game.loop = function gameLoop() {
  var cb = function gameLoopcb() {
    updateStats.update();
    Game.update();

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
  Game.add(TwinJacks);
  Game.add(Link);
  Game.avatar = Game.entities[Game.entityNameSearch("Link0")];
  cb();
};

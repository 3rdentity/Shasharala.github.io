// entity src's
  var avatarImg = new Image(),
      twinJacksImg = new Image();
  twinJacksImg.src = "res/img/twinJacks.png";
  avatarImg.src = "res/img/link.png";

function Avatar() {
  this.uuid = "avatar";
  this.srcY = 100;
  this.destX = 250;
  this.destY = 250;
  this.width = 18;
  this.height = 24;
  this.scale = 2;
  this.image = avatarImg;
  this.L = 0;
  this.U = 50;
  this.R = 25;
  this.D = 75;
  this.stills = 100;
  this.dir = "d";
  this.numberOfFrames = 8;
  this.ticksPerFrame = 2;
  this.frameIndex = 0;
  this.tickCount = 0;
  this.velocity = 0;
  this.velocityDefault = 5;
}

Avatar.prototype.updateFrame = function avatarUpdateFrame(option) {
  Game.updateFrameDefault.bind(this, option)();
};

Avatar.prototype.updatePos = function avatarUpdatePos(option) {
  Game.updatePosDefault.bind(this, option)();
};

Avatar.prototype.draw = function avatarDraw(context) {
  Game.drawDefault.bind(this, context)();
};

function TwinJacks() {
  this.uuid = "TwinJacks" + TwinJacks.quantity++;
  this.srcY = 0;
  this.destX = Math.floor(Math.random() * (500 - 30));
  this.destY = Math.floor(Math.random() * (500 - 30));
  this.width = 81;
  this.height = 28;
  this.scale = 2;
  this.image = twinJacksImg;
  this.numberOfFrames = 2;
  this.ticksPerFrame = 50;
  this.frameIndex = 0;
  this.tickCount = 0;
}

TwinJacks.quantity = 0;

TwinJacks.prototype.updateFrame = function twinJacksUpdateFrame() {
  Game.updateFrameDefault.bind(this)();
};

TwinJacks.prototype.updatePos = function twinJacksUpdatePos(option) {
  // this character does not change position
};

TwinJacks.prototype.draw = function twinJacksDraw(context) {
  Game.drawDefault.bind(this, context)();
};

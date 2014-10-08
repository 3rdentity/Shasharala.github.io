// link
var linkImg = new Image();
linkImg.src = "res/img/link.png";
function Link() {
  this.uuid = "Link" + Link.quantity++;
  this.srcY = 100;
  this.destX = 250;
  this.destY = 250;
  this.width = 18;
  this.height = 24;
  this.scale = 2;
  this.image = linkImg;
  this.L = 0;
  this.U = 50;
  this.R = 25;
  this.D = 75;
  this.stills = 100;
  this.dir = "0 0 0 0";
  this.calcDir = "d";
  this.numberOfFrames = 8;
  this.ticksPerFrame = 2;
  this.frameIndex = 0;
  this.tickCount = 0;
  this.vel = 0;
  this.velMax = 4;
  this.accel = 1;
}
Link.quantity = 0;

// twinJacks
var twinJacksImg = new Image();
twinJacksImg.src = "res/img/twinJacks.png";
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

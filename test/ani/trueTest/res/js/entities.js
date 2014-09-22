// entity src's
  var avatarImg = new Image(),
      twinJacksImg = new Image();
  twinJacksImg.src = "res/img/twinJacks.png";
  avatarImg.src = "res/img/link.png";

function avatar() {
  this.srcY = 0;
  this.destX = 250;
  this.destY = 250;
  this.width = 18;
  this.height = 24;
  this.scale = 2;
  this.image = avatarImg;
  this.L = 0;
  this.U = 51;
  this.R = 26;
  this.D = 76;
  this.stills = 101;
  this.numberOfFrames = 8;
  this.ticksPerFrame = 1;
  this.stepSize = 5;
}

function twinJacks() {
  this.srcY = 0;
  this.destX = Math.floor(Math.random() * (500 - 30));
  this.destY = Math.floor(Math.random() * (500 - 30));
  this.width = 81;
  this.height = 28;
  this.scale = 2;
  this.image = twinJacksImg;
  this.numberOfFrames = 2;
  this.ticksPerFrame = 50;
}

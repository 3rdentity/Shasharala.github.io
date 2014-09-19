(function () {
  var avatar,
      avatarImg,
      canvas;

  function gameLoop () {
    window.requestAnimationFrame(gameLoop);
    avatar.update();
    avatar.render();
  }

  function sprite(options) {
    var that = {},
      frameIndex = 0,
      tickCount = 0,
      ticksPerFrame = options.ticksPerFrame || 0,
      numberOfFrames = options.numberOfFrames || 1;

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    that.update = function update() {
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
    };

    that.render = function render() {
      that.context.clearRect(0, 0, that.width, that.height);
      that.context.drawImage(
      that.image,
      frameIndex * that.width / numberOfFrames,
      0,
      that.width / numberOfFrames,
      that.height,
      0,
      0,
      that.width / numberOfFrames,
      that.height);
    };

    return that;
  }

  canvas = document.getElementById("gameWin");
  canvas.width = 500;
  canvas.height = 500;

  avatarImg = new Image();

  avatar = sprite({
  context: canvas.getContext("2d"),
  width: 234,
  height: 25,
  image: avatarImg,
  numberOfFrames: 10,
  ticksPerFrame: 4
  });

  avatarImg.addEventListener("load", gameLoop);
  avatarImg.src = "res/img/rabbitLink.png";
}());









var sx = 0,
    sy = 0,
    sw = 16,
    sh = 25,
    dx = 100,
    dy = 100,
    dw = 16,
    dh = 25,
    pdx = 0,
    pdy = 0,
    stepSize = 10;
function step(){
  canvas.clearRect(pdx,pdy,dw,dh);
  canvas.drawImage(avatar,sx,sy,sw,sh,dx,dy,dw,dh);
}
function stepL(){
  if(dx<=0){
    pdx = dx;
    pdy = dy;
    sx = 220;
    window.requestAnimationFrame(step);
  }
  else{

    pdx = dx;
    pdy = dy;
    dx -= stepSize;
    sx = 220;
    window.requestAnimationFrame(step);
  }
}
function stepR(){
  if(dx>=280){
    pdx = dx;
    pdy = dy;
    sx = 0;
    window.requestAnimationFrame(step);
  }
  else{
    pdx = dx;
    pdy = dy;
    dx += stepSize;
    sx = 0;
    window.requestAnimationFrame(step);
  }
}
function stepU(){
  if(dy<=0){
    pdx = dx;
    pdy = dy;
    sx = 121;
    window.requestAnimationFrame(step);
  }
  else{
    pdx = dx;
    pdy = dy;
    dy -= stepSize;
    sx = 121;
    window.requestAnimationFrame(step);
  }
}
function stepD(){
  if(dy>=120){
    pdx = dx;
    pdy = dy;
    sx = 48;
    window.requestAnimationFrame(step);
  }
  else{
    pdx = dx;
    pdy = dy;
    dy += stepSize;
    sx = 48;
    window.requestAnimationFrame(step);
  }
}
function onKeyDown(evt){
  if(evt.keyCode==39){
    stepR();
  }
  else if(evt.keyCode==37){
    stepL();
  }
  else if(evt.keyCode==38){
    stepU();
  }
  else if(evt.keyCode==40){
    stepD();
  }
}

document.addEventListener("keydown", onKeyDown);

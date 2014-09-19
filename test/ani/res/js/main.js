var reqAniFram = window.requestAnimationFrame;
var canvas = document.getElementById("gameWin");
var ctx = canvas.getContext("2d");
var sx = 0,
    sy = 0,
    sw = 16,
    sh = 25,
    dx = 100,
    dy = 100,
    dw = 16,
    dh = 25,
    pdx = 0,
    pdy = 0;
var avatar = new Image();
avatar.src = "res/img/rabbitLink.png";
var stepSize = 10;
function step(){
  ctx.clearRect(pdx,pdy,dw,dh);
  ctx.drawImage(avatar,sx,sy,sw,sh,dx,dy,dw,dh);
}
function stepL(){
  if(dx<=0){
    pdx = dx;
    pdy = dy;
    sx = 220;
    reqAniFram(step);
    console.log("You cannot go left any more");
  }
  else{

    pdx = dx;
    pdy = dy;
    dx -= stepSize;
    sx = 220;
    reqAniFram(step);
  }
}
function stepR(){
  if(dx>=280){
    pdx = dx;
    pdy = dy;
    sx = 0;
    reqAniFram(step);
    console.log("You cannot go right any more");
  }
  else{
    pdx = dx;
    pdy = dy;
    dx += stepSize;
    sx = 0;
    reqAniFram(step);
  }
}
function stepU(){
  if(dy<=0){
    pdx = dx;
    pdy = dy;
    sx = 121;
    reqAniFram(step);
    console.log("You cannot go higher");
  }
  else{
    pdx = dx;
    pdy = dy;
    dy -= stepSize;
    sx = 121;
    reqAniFram(step);
  }
}
function stepD(){
  if(dy>=120){
    pdx = dx;
    pdy = dy;
    sx = 48;
    reqAniFram(step);
    console.log("You cannot go lower");
  }
  else{
    pdx = dx;
    pdy = dy;
    dy += stepSize;
    sx = 48;
    reqAniFram(step);
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
//ctx.drawImage(sprites,sx,sy,sw,sh,dx,dy,dw,dh);
avatar.onload = function draw(){
  ctx.drawImage(avatar,sx,sy,sw,sh,dx,dy,dw,dh);
};
document.addEventListener("keydown", onKeyDown, false);

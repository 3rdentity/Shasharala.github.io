var reqAniFram = window.requestAnimationFrame || window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
var canvas = document.getElementById("gameWin");
var ctx = canvas.getContext("2d");
var srcX = 0;
var srcY = 0;
var srcW = 16;
var srcH = 25;
var destX = 100;
var destY = 100;
var destW = 32;
var destH = 50;
var avatar = new Image();
avatar.src = "res/img/rabbitLink.png";
var stepSize = 10;
function step(){
	ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx.drawImage(avatar,srcX,srcY,srcW,srcH,destX,destY,destW,destH);
}
function stepL(){
	if(destX<=0){
		console.log("You cannot go left any more");
	}
	else{
		destX -= stepSize;
		srcX = 220;
		reqAniFram(step);
	}
}
function stepR(){
	if(destX>=950){
		console.log("You cannot go right any more");
	}
	else{
		destX += stepSize;
		srcX = 0;
		reqAniFram(step);
	}
}
function stepU(){
	var currStep = 0;
	if(destY<=0){
		console.log("You cannot go higher");
	}
	else{
		if(currStep=0){
			destY -= stepSize;
			srcX = 121;
			reqAniFram(step);
		}
	}
}
function stepD(){
	if(destY>=650){
		console.log("You cannot go lower");
	}
	else{
		destY += stepSize;
		srcX = 48;
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
//ctx.drawImage(sprites,srcX,srcY,srcW,srcH,destX,destY,destW,destH);
avatar.onload = function draw(){
	ctx.drawImage(avatar,srcX,srcY,srcW,srcH,destX,destY,destW,destH);
};
document.addEventListener("keydown", onKeyDown, false);

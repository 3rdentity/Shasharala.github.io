(function gameEngine() {
  var avatar,
      avatarImg,
      twinJacks,
      twinJacksImg,
      canvas;

  function onKeyUp(evt) {
    //left
    if (evt.keyCode === 37) {
      avatar.updateFram("stop");
    }
    //up
    else if (evt.keyCode === 38) {
      avatar.updateFram("stop");
    }
    //right
    else if (evt.keyCode === 39) {
      avatar.updateFram("stop");
    }
    //down
    else if (evt.keyCode === 40) {
      avatar.updateFram("stop");
    }
  }

  function onKeyDown(evt) {
    //left
    if (evt.keyCode === 37) {
      avatar.updatePos("l");
    }
    //up
    else if (evt.keyCode === 38) {
      avatar.updatePos("u");
    }
    //right
    else if (evt.keyCode === 39) {
      avatar.updatePos("r");
    }
    //down
    else if (evt.keyCode === 40) {
      avatar.updatePos("d");
    }
  }

  function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    twinJacks.updateFram();
    twinJacks.render();
    avatar.render();
  }

  function sprite(options) {
    var that = {},
      frameIndex = 0,
      tickCount = 0,
      ticksPerFrame = options.ticksPerFrame || 0,
      numberOfFrames = options.numberOfFrames || 1;

    that.context = options.context;
    that.srcY = options.srcY || 0;
    that.destX = options.destX || 0;
    that.destY = options.destY || 0;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    that.L = options.L || 0;
    that.U = options.U || 0;
    that.R = options.R || 0;
    that.D = options.D || 0;
    that.stills = options.stills || 0;
    that.stepSize = options.stepSize || 0;

    that.updateFram = function updateFram(o) {
      if (o === "stop") {
        frameIndex = 0;
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
      if (o === "l") {
        that.srcY = that.L;
        that.updateFram();
        that.destX -= that.stepSize;
      }
      else if (o === "u") {
        that.srcY = that.U;
        that.updateFram();
        that.destY -= that.stepSize;
      }
      else if (o === "r") {
        that.srcY = that.R;
        that.updateFram();
        that.destX += that.stepSize;
      }
      else if (o === "d") {
        that.srcY = that.D;
        that.updateFram();
        that.destY += that.stepSize;
      }
    };

    that.render = function render() {
      that.context.drawImage(
      that.image,
      frameIndex * that.width,
      that.srcY,
      that.width,
      that.height,
      that.destX,
      that.destY,
      that.width,
      that.height);
    };

    return that;
  }

  canvas = document.getElementById("gameWin");
  canvas.width = 500;
  canvas.height = 500;

  avatarImg = new Image();
  twinJacksImg = new Image();

  avatar = sprite({
    context: canvas.getContext("2d"),
    srcY: 0,
    destX: 250,
    destY: 250,
    width: 36, //width of sprite
    height: 48, //height of sprite
    image: avatarImg,
    L: 0,
    U: 100,
    R: 50,
    D: 150,
    stills: 200,
    numberOfFrames: 8,
    ticksPerFrame: 1,
    stepSize: 5
  });

  twinJacks = sprite({
    context: canvas.getContext("2d"),
    srcY: 0,
    destX: 100,
    destY: 100,
    width: 162, //width of sprite
    height: 56, //height of sprite
    image: twinJacksImg,
    numberOfFrames: 2,
    ticksPerFrame: 50,
  });
  avatarImg.addEventListener("load", gameLoop);
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
  avatarImg.src = "res/img/link.png";
  twinJacksImg.src = "res/img/twinJacks.png";
}());

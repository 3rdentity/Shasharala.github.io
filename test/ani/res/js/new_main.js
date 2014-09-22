(function gameEngine() {
  var avatar,
      avatarImg,
      twinJacks,
      twinJacksImg,
      canvas;

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
    that.scale = options.scale || 1;
    that.L = options.L || 0;
    that.U = options.U || 0;
    that.R = options.R || 0;
    that.D = options.D || 0;
    that.stills = options.stills || 0;
    that.stepSize = options.stepSize || 0;

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
      that.context.imageSmoothingEnabled = false;
      that.context.drawImage(
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
    width: 18, //width of sprite
    height: 24, //height of sprite
    scale: 2,
    image: avatarImg,
    L: 0,
    U: 51,
    R: 26,
    D: 76,
    stills: 101,
    numberOfFrames: 8,
    ticksPerFrame: 1,
    stepSize: 5
  });

  twinJacks = sprite({
    context: canvas.getContext("2d"),
    srcY: 0,
    destX: 100,
    destY: 100,
    width: 81, //width of sprite
    height: 28, //height of sprite
    scale: 2,
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

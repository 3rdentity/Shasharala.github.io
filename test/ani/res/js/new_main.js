(function gameEngine() {
  var avatar,
      avatarImg,
      twinJacks,
      twinJacksImg,
      canvas;

  function onKeyUp(evt) {
    /*//left
    if (evt.keyCode === 37) {
      avatar.update();
      avatar.srcY = 0;
      avatar.destX -= avatar.stepSize;
    }
    //up
    else if (evt.keyCode === 38) {
      avatar.update();
      avatar.srcY = 100;
      avatar.destY -= avatar.stepSize;
    }
    //right
    else if (evt.keyCode === 39) {
      avatar.update();
      avatar.srcY = 50;
      avatar.destX += avatar.stepSize;
    }
    //down
    else if (evt.keyCode === 40) {
      avatar.update();
      avatar.srcY = 150;
      avatar.destY += avatar.stepSize;
    }*/
  }

  function onKeyDown(evt) {
    //left
    if (evt.keyCode === 37) {
      avatar.srcY = 0;
      avatar.update();
      avatar.destX -= avatar.stepSize;
    }
    //up
    else if (evt.keyCode === 38) {
      avatar.update();
      avatar.srcY = 100;
      avatar.destY -= avatar.stepSize;
    }
    //right
    else if (evt.keyCode === 39) {
      avatar.update();
      avatar.srcY = 50;
      avatar.destX += avatar.stepSize;
    }
    //down
    else if (evt.keyCode === 40) {
      avatar.update();
      avatar.srcY = 150;
      avatar.destY += avatar.stepSize;
    }
  }

  function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    twinJacks.update();
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
    that.stepSize = options.stepSize || 0;

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
    numberOfFrames: 8,
    ticksPerFrame: 2,
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

var Player = {};
Player.input = {
  left: 0,
  up: 0,
  right: 0,
  down: 0,
};
Player.input.arrowKeys = "0 0 0 0";
Player.onKey = function playerOnKey(evt, key, pressed) {
  switch (key) {
    case Key.f:
      Engine.fullscreen();
      evt.preventDefault();
      break;
    case Key.left:
      Player.input.left = pressed;
      Player.input.arrowKeys = Player.input.left+ " " + Player.input.up+ " " + Player.input.right+ " " + Player.input.down;
      evt.preventDefault();
      break;
    case Key.up:
      Player.input.up = pressed;
      Player.input.arrowKeys = Player.input.left+ " " + Player.input.up+ " " + Player.input.right+ " " + Player.input.down;
      evt.preventDefault();
      break;
    case Key.right:
      Player.input.right = pressed;
      Player.input.arrowKeys = Player.input.left+ " " + Player.input.up+ " " + Player.input.right+ " " + Player.input.down;
      evt.preventDefault();
      break;
    case Key.down:
      Player.input.down = pressed;
      Player.input.arrowKeys = Player.input.left+ " " + Player.input.up+ " " + Player.input.right+ " " + Player.input.down;
      evt.preventDefault();
  }
};
document.addEventListener("keydown", function onKeyDown(evt) {Player.onKey(evt, evt.keyCode, 1);});
document.addEventListener("keyup", function onKeyUp(evt) {Player.onKey(evt, evt.keyCode, 0);});
window.onblur = function windowOnBlur() {Engine.pause = true;};


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
  this.ticksPerFrame = 10;
  this.frameIndex = 0;
  this.tickCount = 0;
  this.vel = 0;
  this.velMax = 4;
  this.accel = 100;
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



var TestGame = function testGameInit() {
  var game = {
    cfg: {
      fps: 60,
      width: 500,
      height: 500
    },
    entities: [],
    avatar: undefined,






    add: function engineAdd(Name) {
      this.entities.push(new Name());
    },
    // is this necessary?
    entityNameSearch: function engineEntityNameSearch(name) {
      for (var i = this.entities.length - 1; i >= 0; i--) {
        if (this.entities[i].uuid === name) {
          return i;
        }
      }
    },







    update: function testGameUpdate(step) {
    // check and respond to any input from player
      this.avatar.dir = Player.input.arrowKeys;
      // update frames and position
      for (var i = this.entities.length - 1; i >= 0; i--) {
        var currEntity = this.entities[i];
        // calculate direction and set velocity accordingly
        if("update" in currEntity) {
          currEntity.update(step);
        }
        else {
          switch (currEntity.dir) {
            case "1 0 0 0":
            case "1 1 0 1":
              currEntity.calcDir = "l";
              currEntity.vel = (currEntity.vel >= currEntity.velMax) ? currEntity.velMax : Math.accelerate(currEntity.vel, currEntity.accel, step);
              break;
            case "0 1 0 0":
            case "1 1 1 0":
              currEntity.calcDir = "u";
              currEntity.vel = (currEntity.vel >= currEntity.velMax) ? currEntity.velMax : Math.accelerate(currEntity.vel, currEntity.accel, step);
              break;
            case "0 0 1 0":
            case "0 1 1 1":
              currEntity.calcDir = "r";
              currEntity.vel = (currEntity.vel >= currEntity.velMax) ? currEntity.velMax : Math.accelerate(currEntity.vel, currEntity.accel, step);
              break;
            case "0 0 0 1":
            case "1 0 1 1":
              currEntity.calcDir = "d";
              currEntity.vel = (currEntity.vel >= currEntity.velMax) ? currEntity.velMax : Math.accelerate(currEntity.vel, currEntity.accel, step);
              break;
            case "1 1 0 0":
              currEntity.calcDir = "ul";
              currEntity.vel = (currEntity.vel >= currEntity.velMax) ? currEntity.velMax : Math.accelerate(currEntity.vel, currEntity.accel, step);
              break;
            case "0 1 1 0":
              currEntity.calcDir = "ur";
              currEntity.vel = (currEntity.vel >= currEntity.velMax) ? currEntity.velMax : Math.accelerate(currEntity.vel, currEntity.accel, step);
              break;
            case "0 0 1 1":
              currEntity.calcDir = "dr";
              currEntity.vel = (currEntity.vel >= currEntity.velMax) ? currEntity.velMax : Math.accelerate(currEntity.vel, currEntity.accel, step);
              break;
            case "1 0 0 1":
              currEntity.calcDir = "dl";
              currEntity.vel = (currEntity.vel >= currEntity.velMax) ? currEntity.velMax : Math.accelerate(currEntity.vel, currEntity.accel, step);
              break;
            case "0 0 0 0":
            case "0 1 0 1":
            case "1 0 1 0":
            case "1 1 1 1":
              currEntity.vel = (currEntity.vel <= 0) ? 0 : Math.accelerate( currEntity.vel, -currEntity.accel, step);
              break;
            default:
              // only objects with no dir should fall here
          }
          // update frames & position
          if (currEntity.vel === 0) {
            currEntity.srcY = currEntity.stills;
            switch (currEntity.calcDir) {
              case "l":
              case "ul":
              case "dl":
                currEntity.frameIndex = 3;
                break;
              case "u":
                currEntity.frameIndex = 2;
                break;
              case "r":
              case "ur":
              case "dr":
                currEntity.frameIndex = 1;
                break;
              case "d":
                currEntity.frameIndex = 0;
                currEntity.destY += currEntity.vel;
                break;
              default:
                // if something is falling in here there is a problem
            }
          }
          else {
            switch (currEntity.calcDir) {
              case "l":
                currEntity.srcY = currEntity.L;
                currEntity.destX -= currEntity.vel;
                break;
              case "u":
                currEntity.srcY = currEntity.U;
                currEntity.destY -= currEntity.vel;
                break;
              case "r":
                currEntity.srcY = currEntity.R;
                currEntity.destX += currEntity.vel;
                break;
                case "d":
                currEntity.srcY = currEntity.D;
                currEntity.destY += currEntity.vel;
                break;
              case "ul":
                if (currEntity.srcY === currEntity.U) {
                }
                else {
                  currEntity.srcY = currEntity.L;
                }
                currEntity.destY -= currEntity.vel;
                currEntity.destX -= currEntity.vel;
                break;
              case "dl":
                if (currEntity.srcY === currEntity.D) {
                }
                else {
                  currEntity.srcY = currEntity.L;
                }
                currEntity.destY += currEntity.vel;
                currEntity.destX -= currEntity.vel;
                break;
              case "ur":
                if (currEntity.srcY === currEntity.U) {
                }
                else {
                  currEntity.srcY = currEntity.R;
                }
                currEntity.destY -= currEntity.vel;
                currEntity.destX += currEntity.vel;
                break;
              case "dr":
                if (currEntity.srcY === currEntity.D) {
                }
                else {
                  currEntity.srcY = currEntity.R;
                }
                currEntity.destY += currEntity.vel;
                currEntity.destX += currEntity.vel;
                break;
              default:
                // only objects with no calcDir should fall here
            }
            // check that object has a tickCount
            if ("tickCount" in currEntity) {
              // check that object has a velocity
              if (currEntity.vel) {
                currEntity.tickCount = currEntity.tickCount + currEntity.vel;
              }
              else {
                currEntity.tickCount++;
              }
              if (currEntity.tickCount > currEntity.ticksPerFrame) {
                currEntity.tickCount = 0;
                if (currEntity.frameIndex < currEntity.numberOfFrames - 1) {
                  currEntity.frameIndex++;
                }
                else {
                  currEntity.frameIndex = 0;
                }
              }
            }
          }
        }
      }
    },
    render: function testGameRender(dt) {
    // clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      //check if entity has its own render method. If not then render through default method
      for (var i = this.entities.length - 1; i >= 0; i--) {
        var currEntity = this.entities[i];
        if ("render" in currEntity) {
          currEntity.render(dt, Engine.ctx);
        }
        else {
          this.ctx.drawImage(
            currEntity.image,
            currEntity.frameIndex * currEntity.width,
            currEntity.srcY || 0,
            currEntity.width,
            currEntity.height,
            currEntity.destX + (currEntity.vel * dt) || currEntity.destX || 0,
            currEntity.destY + (currEntity.vel * dt) || currEntity.destY || 0,
            currEntity.width * currEntity.scale || currEntity.width,
            currEntity.height * currEntity.scale || currEntity.height
          );
        }
      }
    }
  }
  // load entities
    game.add(Link);
    game.add(TwinJacks); // for testing
    game.avatar = game.entities[game.entityNameSearch("Link0")];
    return game;
};


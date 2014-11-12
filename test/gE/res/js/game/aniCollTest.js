// A whole new game here to test animation/collision.
// After you test animation/collision to your liking then you might want to work on sounds, double buffering AI/C. rendering, not rendering objects/entities offscreen, and saving.
// Do not forget to clean up all your files at some point. Refactor and make readable.
var aniCollTest = function aniCollTestInit() {
  var game = {
    paused: false,
    cfg: {
      state: {
        events: [
          { name: "ready", from: "booting", to: "playing", action: function readyAction() { /*load game map/level?*/ } },
          { name: "pause", from: "playing", to: "paused", action: function pauseAction() { console.log(game.is); setTimeout(function () { console.log(game.is); }, 10); } },
          { name: "unPause", from: "paused", to: "playing", action: function unPauseAction() { console.log(game.is); setTimeout(function () { console.log(game.is); }, 10); } }
        ]
      },
      keys: [
        { key: Key.p, mode: "up", state: "playing", action: function keyPonUp() { this.pause(); } },
        { key: Key.p, mode: "up", state: "paused", action: function keyPOnUp() { this.unPause(); } },
        { key: Key.left, mode: "down", state: "playing", action: function keyLeftOnDown() { this.player.moveLeft(true); } },
        { key: Key.up, mode: "down", state: "playing", action: function keyUpOnDown() { this.player.moveUp(true); } },
        { key: Key.right, mode: "down", state: "playing", action: function keyRightOnDown() { this.player.moveRight(true); } },
        { key: Key.down, mode: "down", state: "playing", action: function keyDownOnDown() { this.player.moveDown(true); } },
        { key: Key.left, mode: "up", state: "playing", action: function keyDownOnUp() { this.player.moveLeft(false); } },
        { key: Key.up, mode: "up", state: "playing", action: function keyUpOnUp() { this.player.moveUp(false); } },
        { key: Key.right, mode: "up", state: "playing", action: function keyRightOnUp() { this.player.moveRight(false); } },
        { key: Key.down, mode: "up", state: "playing", action: function keyDownOnUp() { this.player.moveDown(false); } }
      ],
      img: function gameCfgImgInit() {
        game.cfg.img.ent = new Image();
        game.cfg.img.ent.src = "res/img/ent.png";
      }
    },
    canvas: function gameCanvasInit() {
      this.canvas = undefined;
      this.canvas = document.getElementById("viewport");
      this.canvas.ctx = this.canvas.getContext("2d");
      this.canvas.width = this.canvas.height = 500;
      this.canvas.ctx.imageSmoothingEnabled = false;
    },
    pool: {
      npc: []
    },
    init: function gameInit() {
      Fsm.init(game, game.cfg.state);
      Key.map(game.cfg.keys, game);
      this.canvas();
      this.cfg.img();
      this.ready();
    },
    render: function gameRender(dt) {
      // clear the canvas
      this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


      /*
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
      */


    },
    update: function gameUpdate(step) {
      // update method here
    },
    player: {
      moving: {},
      dir: Math.randInt(0, 7),
      moveLeft: function playerMoveLeft(on) { this.moving.left = on; this.setDir(); },
      moveUp: function playerMoveUp(on) { this.moving.up = on; this.setDir(); },
      moveRight: function playerMoveRight(on) { this.moving.right = on; this.setDir(); },
      moveDown: function playerMoveDown(on) { this.moving.down = on; this.setDir(); },
      setDir: function playerSetDir() {
        // switch/if statements
      }
    },
    npc: {
      dir: Math.randInt(0, 7)
    }
  };
  return game;
};

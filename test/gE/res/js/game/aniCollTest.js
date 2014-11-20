// A whole new game here to test animation/collision.
// After you test animation/collision to your liking then you might want to work on sounds, double buffering AI/C. rendering, not rendering objects/entities offscreen, and saving.
// Do not forget to clean up all your files at some point. Refactor and make readable.

// a way to handle inactive objects/objects offscreen? Don't push updates/check collision for these obj's. invalidation?
// double buffer?
// base64 assets?
var aniCollTest = function aniCollTestInit() {
  var game = {
    cfg: {
      state: {
        events: [
          { name: "ready", from: "booting", to: "playing", action: function readyAction() { /*load game map/level?*/ } },
          { name: "pause", from: "playing", to: "paused", action: function pauseAction() { /*pause screen here*/ } },
          { name: "unPause", from: "paused", to: "playing", action: function unPauseAction() { /*remove pause screen here*/ } }
        ]
      },
      keys: [
        // fullscreen key? should fullscreen function be here or in engine?
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
      img: {
        init: function gameCfgImgInit() {
          game.cfg.img.ent = new Image();
          game.cfg.img.ent.src = "res/img/ent.png";
          delete this.init;
        }
      }
    },
    canvas: {
      init: function gameCanvasInit() {
        game.canvas = document.getElementById("viewport");
        game.canvas.ctx = game.canvas.getContext("2d");
        game.canvas.width = game.canvas.height = 500;
        game.canvas.ctx.imageSmoothingEnabled = false;
      }
    },
    entities: [],
    init: function gameInit() {
      // promises for proper resource loading? should this be here or in the engine?
      Fsm.init(game, game.cfg.state);
      Key.map(game.cfg.keys, game);
      this.canvas.init();
      this.cfg.img.init();
      this.blocks.preAlloc(10);
      this.blocks.alloc();
      this.player.init();
      this.ready();
      delete this.init;
    },
    update: function gameUpdate(step) {
      this.player.update(step);
      for (var i = this.entities.length - 1; i >= 0; i--) {
        this.entities[i].update(step);
      }
    },
    defRender: function gameDefRender(obj, dt) {
      this.canvas.ctx.drawImage(
            this.cfg.img.ent,
            obj.sX,
            obj.sY,
            obj.w,
            obj.h,
            Math.lerp(obj.dX, obj.vel, dt),
            Math.lerp(obj.dY, obj.vel, dt),
            obj.w * obj.scale || obj.w,
            obj.h * obj.scale || obj.h
          );
    },
    render: function gameRender(dt) {
      this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (var i = this.entities.length - 1; i >= 0; i--) {
        this.entities[i].render ? this.entities[i].render(dt) : this.defRender(this.entities[i], dt);
      }
      this.player.render ? this.player.render(dt) : this.defRender(this.player, dt);
    },
    player: {
      init: function playerInit() {
        this.dir = Math.randChoice(["l", "u", "r", "d"]);
        this.moving = {
          left: false,
          up: false,
          right: false,
          down: false
        };
        this.sX = 1;
        this.sY = 1;
        this.dX = 10;
        this.dY = 10;
        this.w = 18;
        this.h = 24;
        this.scale = 2;
        this.f = 1; // out of five frames
        this.vel = 0;
      },
      update: function playerUpdate(step) {
        this.ani();
        if (!this.coll) {
          // move player
        }
      },
      ani: function playerAni() {
        // standing still
        switch (this.dir) {
          case "l":
            this.sX;
            break;
          case "u":
            this.sX = 1 * this.w;
            break;
          case "r":
            this.sX = 1 *this.w * 2;
            break;
          case "d":
            this.sX = 1 * this.w * 3;
        }
        // walking
        // needs a test for doublePresses. Which key came first? which dir should char face in those cases?
        switch (this.dir) {
          case "l":

        }
      },
      // accel obj on keypress
      moveLeft: function playerMoveLeft(on) { this.moving.left = on; this.setDir(); },
      moveUp: function playerMoveUp(on) { this.moving.up = on; this.setDir(); },
      moveRight: function playerMoveRight(on) { this.moving.right = on; this.setDir(); },
      moveDown: function playerMoveDown(on) { this.moving.down = on; this.setDir(); },
      setDir: function playerSetDir() {
        switch (this.moving.left + "|" + this.moving.up + "|" + this.moving.right + "|" + this.moving.down) {
          case "true|false|false|false":
            this.dir = "l";
            break;
          case "false|true|false|false":
            this.dir = "u";
            break;
          case "false|false|true|false":
            this.dir = "r";
            break;
          case "false|false|false|true":
            this.dir = "d";
            break;
          case "true|true|false|false":
            this.dir = "ul";
            break;
          case "false|true|true|false":
            this.dir = "ur";
            break;
          case "false|false|true|true":
            this.dir = "dr";
            break;
          case "true|false|false|true":
            this.dir = "dl";
        }
      },
      coll: function playerColl() {
        // collision tests here. return a boolean
      }
    },
    blocks: {
      pool: [],
      preAlloc: function blocksPreAlloc(i) {
        for (var n = 0; n < i; n++) {
          this.pool[n] = {
            update: function blocksUpdate() {
              // update function here
            }
          };
        }
      },
      alloc: function blocksAlloc() {
        game.entities.push(this.pool.pop());
      },
      deAlloc: function blockDeAlloc() {
        // deAlloc function to rem obj from entities list goes here
      },
      coll: function blockColl() {
        // collision tests here. return a boolean
      }
    }
  };
  return game;
};

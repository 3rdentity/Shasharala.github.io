// A whole new game here to test animation/collision.
// After you test animation/collision to your liking then you might want to work on sounds, double buffering AI/C. rendering, not rendering objects/entities offscreen, and saving.
// Do not forget to clean up all your files at some point. Refactor and make readable.

// THERE IS A MEMLEAK SOMEWHERE. CHECK CHROME TIMELINE. the way controls are handled is causing a lot of latency
// a way to handle inactive objects/objects offscreen? Don't push updates/check collision for these obj's. invalidation?
// double buffer?
// base64 assets?
// iron out animation/movement issues
var aniCollTest = function aniCollTestInit() {
  var game = {
    cfg: {
      map: {
        scale: 1,
        width: 10, // size in terms of cells
        height: 10, // size in terms of cells
        cell: {
          init: function gameCfgCellInit() {
            this.size = game.cfg.map.scale * 24; // matches avg. of largest sides of obj's aabb
            delete this.init;
          }
        }
      },
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
    // make a canvas function outside of game to handle sizing etc?
    canvas: {
      init: function gameCanvasInit() {
        game.canvas = document.getElementById("viewport");
        game.canvas.ctx = game.canvas.getContext("2d");
        game.canvas.width = game.cfg.map.cell.size * game.cfg.map.width;
        game.canvas.height = game.cfg.map.cell.size * game.cfg.map.height;
        game.canvas.ctx.imageSmoothingEnabled = false;
      }
    },
    init: function gameInit() {
      // promises for proper resource loading? should this be here or in the engine?
      Fsm.init(game, game.cfg.state);
      Key.map(game.cfg.keys, game);
      for (var i = 0; i < 400; i++) { game.map.cells[i] = { occupied: [] }; } // filling game.map.cells with arbitrary data. this is ONLY here for testing
      this.cfg.map.cell.init();
      this.cfg.img.init();
      this.canvas.init();
      this.blocks.preAlloc(10);
      this.blocks.alloc();
      this.player.init();
      this.ready();
      delete this.init;
    },
    map: {
      temp: { // local var's to avoid gc
        cX: null,
        cY: null,
        tX: null,
        tY: null,
        cellOverlap: {
          cells: [],
          cellsGet: function mapTempCellOverlapGet() {
            game.map.setClear(this.cells);
            return this.cells;
          }
        },
        occupied: {
          checked: [],
          checkedGet: function mapTempOccupiedGet() {
            game.map.setClear(this.checked);
            return this.checked;
          }
        }
      },
      cells: [], // need a way to get "occupied" into here on various indexes. pull from levelmap/png or from json? if doing that, will need parsing functions & the like
      entities: [],
      p2c: function mapC2T(n) { return Math.floor(n/game.cfg.map.cell.size); }, // pixel-to-cell conversion
      c2p: function mapT2C(n) { return (n * game.cfg.map.cell.size); }, // cell-to-pixel conversion
      setContains: function mapSetContains(arr, ent) { return arr.indexOf(ent) >= 0; },
      setAdd: function mapSetAdd(arr, ent) { arr.push(ent); },
      setRem: function mapSetRem(arr, ent) { arr.splice(arr.indexOf(ent), 1); },
      setClear: function mapSetClear(arr) { arr.length = 0; },
      setCopy: function mapSetCopy(arr, source) {
        this.setClear(arr);
        for(var n = 0, max = source.length ; n < max ; n++)
        arr.push(source[n]);
      },
      cell: function mapCell(x, y) {
        console.log(x + " " + y);
        console.log(this.p2c(x) + (this.p2c(y) + game.cfg.map.width));
        return this.cells[this.p2c(x) + (this.p2c(y) * game.cfg.map.width)]; // this may not work?
      },
      cellOverlap: function mapCellOverlap(x, y, w, h) {
        var cells = [];
        this.temp.cX = ((x%game.cfg.map.cell.size) + w) > game.cfg.map.cell.size; // assumes all entities are smaller than cells
        this.temp.cY = ((y%game.cfg.map.cell.size) + h) > game.cfg.map.cell.size; // assumes all entities are smaller than cells
        this.setAdd(cells, this.cell(x, y));
        console.log(this.temp.cX + " " + this.temp.cY);
        if (this.temp.cX) this.setAdd(cells, this.cell(x + game.cfg.map.cell.size, y));
        if (this.temp.cY) this.setAdd(cells, this.cell(x, y + game.cfg.map.cell.size));
        if ((this.temp.cX) && (this.temp.cY)) this.setAdd(cells, this.cell(x + game.cfg.map.cell.size, y + game.cfg.map.cell.size));
        console.log(this.cell(x,y + game.cfg.map.cell.size));
        console.log(cells);
        return cells;
      },
      occupied: function mapOccupied(x, y, w, h, ignore) {
        var cells = this.cellOverlap(x, y, w, h),
            checked = this.temp.occupied.checkedGet(); // list of checked entities
        for (var i = 0; i < cells.length; i++) {
          cell = cells[i];
          // wall check here? "if (cell.wall) return true;"
          for (var n = 0; n < cell.occupied.length; n++) {
            ent = cell.occupied[n];
            if ((ent != ignore) && !this.setContains(checked, ent)) {
              this.setAdd(checked, ent);
              if (Math.collBox(x, y, w, h, ent.x, ent.y, ent.w, ent.h)) return ent;
            }
          }
        }
        return false;
      },
      tryMove: function mapTryMove(ent) {
        this.temp.tX = ent.dX + (ent.moving.left ? -ent.vel : ent.moving.right ? ent.vel : 0);
        this.temp.tY = ent.dY + (ent.moving.up ? -ent.vel : ent.moving.down ? ent.vel : 0),
            coll = this.occupied(this.temp.tX, this.temp.tY, ent.w, ent.h, ent);
        if (!coll) this.occupy(this.temp.tX, this.temp.tY, ent);
        return coll;
      },
      occupy: function mapOccupy(x, y, ent) {
        // assume caller took care to avoid collision
        ent.dX = x;
        ent.dY = y;
        var before = ent.cells,
            after = this.cellOverlap(x, y, ent.w, ent.h),
            cell;
        for (var i = 0; before.length; i++) {
          cell = before[i];
          if (!this.setContains(after, cell))
            console.log(before[i]);
            this.setAdd(cell.occupied, ent);
        }
        this.setCopy(before, after);
        return ent;
      }
    },
    update: function gameUpdate(step) {
      this.player.update(step);
      for (var i = this.map.entities.length - 1; i >= 0; i--) {
        this.map.entities[i].update(step);
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
      this.player.render ? this.player.render(dt) : this.defRender(this.player, dt);
      for (var i = this.map.entities.length - 1; i >= 0; i--) {
        this.map.entities[i].render ? this.map.entities[i].render(dt) : this.defRender(this.map.entities[i], dt);
      }
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
        this.scale = game.cfg.map.scale;
        this.w = 18;
        this.h = 24;
        this.sX = 0; // animation seems to be off for one of the frames when moving to the right
        this.sY = 0;
        this.dX = null;
        this.dY = null;
        this.frame = 0; // current animation frame
        this.frameSpeed = 2; // speed at which to step through frames. higher is slower
        this.frameStep = 0; // current step through frames
        this.frameMax = 7; // eight animation frames
        this.vel = 0;
        this.velMax = 5;
        this.accel = 10;
        this.cells = []
        game.map.occupy(10, 10, this);
      },
      update: function playerUpdate(step) {
        this.ani();
        if (this.moving.left || this.moving.up || this.moving.right || this.moving.down) {
          console.log("meep!");
          this.vel = Math.min(Math.accel(this.vel, this.accel, step), this.velMax);
          if (!game.map.tryMove(this)) game.map.occupy; // if game.map.tryMove(this) returns coll as false then occupy space in this.dir in accordance to this.vel
        }
        else {
          this.vel = Math.max(Math.accel(this.vel, -this.accel, step), 0);
        }
      },
      ani: function playerAni(step) {
        // standing still
        if (!this.moving.left && !this.moving.up && !this.moving.right && !this.moving.down) {
          switch (this.dir) {
            case "l":
              this.sX = 0;
              break;
            case "u":
              this.sX = 1 * this.w;
              break;
            case "r":
              this.sX = 2 * this.w;
              break;
            case "d":
              this.sX = 3 * this.w;
          }
        }
        // walking
        else {
          switch (this.dir) {
            case "l":
              this.sX = 4 * this.w + this.frame * this.w;
              break;
            case "u":
              this.sX = 12 * this.w + this.frame * this.w;
              break;
            case "r":
              this.sX = 20 * this.w + this.frame * this.w;
              break;
            case "d":
              this.sX = 28 * this.w + this.frame * this.w;
              break;
            case "ul":
              this.moving.left ? this.sX = 4 * this.w + this.frame * this.w : this.sX = 12 * this.w + this.frame * this.w;
              break;
            case "ur":
              this.moving.right ? this.sX = 20 * this.w + this.frame * this.w : this.sX = 12 * this.w + this.frame * this.w;
              break;
            case "dr":
              this.moving.right ? this.sX = 20 * this.w + this.frame * this.w : this.sX = 28 * this.w + this.frame * this.w;
              break;
            case "dl":
              this.moving.left ? this.sX = 4 * this.w + this.frame * this.w : this.sX = 28 * this.w + this.frame * this.w;
              break;
          }
          this.frameStep++;
          if (this.frameStep > this.frameSpeed) {
            this.frameStep = 0;
            this.frame < this.frameMax ? this.frame++ : this.frame = 0;
          }
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
          case "true|true|false|true":
            this.dir = "l";
            break;
          case "false|true|false|false":
          case "true|true|true|false":
            this.dir = "u";
            break;
          case "false|false|true|false":
          case "false|true|true|true":
            this.dir = "r";
            break;
          case "false|false|false|true":
          case "true|false|true|true":
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
            break;
          case "true|false|true|false":
          case "false|true|false|true":
          case "true|true|true|true":
            // stop motion in these case scenarios
        }
      }
    },
    blocks: {
      init: function blocksInit() {
        this.scale = game.cfg.map.scale;
        this.w = 18;
        this.h = 24;
        this.sX = 0;
        this.sY = 24;
        this.dX = null;
        this.dY = null;
        this.vel = 0;
        this.cells = [],
        this.update = function blocksUpdate() {
          // update function here
        };
        game.map.occupy(100, 100, this);
      },
      pool: [],
      preAlloc: function blocksPreAlloc(i) { // the way this is being allocated isn't great. try this.blah allocation
        for (var n = 0; n < i; n++) {
          this.pool[n] = new this.init();
        }
      },
      alloc: function blocksAlloc() {
        game.map.entities.push(this.pool.pop());
      },
      deAlloc: function blockDeAlloc() {
        // deAlloc function to rem obj from entities list goes here
      }
    }
  };
  return game;
};

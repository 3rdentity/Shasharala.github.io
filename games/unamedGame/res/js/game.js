// z-indexing! this is handled by drawing high z-indexes last
// sliding! currently character collides and can't slide along the edge of things
// need to have pubsub system detect collision and start pushing animation/movement of item&char that is pushing obj.
var game = function gameInit() {
  var game = {
    cells: [], // moved up here temporarily? Needed to be above parseImg();
    cfg: {
      map: {
        scale: 5,
        // size of map needs to be removed from here. size of map should be coming from map img's not from here
        width: 16, // size in terms of cells
        height: 16, // size in terms of cells
        cell: {
          init: function gameCfgCellInit() {
            this.size = game.cfg.map.scale * 16; // matches avg. of largest sides of obj's aabb. there is an issue with collision at the moment. it is detecting cells and stopping movement at that level. need to detect aabb's inside of cells that obj's share
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
        // fullscreen key?
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
        game.canvas.width = game.cfg.map.cell.size * game.cfg.map.width;
        game.canvas.height = game.cfg.map.cell.size * game.cfg.map.height;
        if (game.canvas.ctx.imageSmoothingEnabled) {
            game.canvas.ctx.imageSmoothingEnabled = false;
        } else if (game.canvas.ctx.webkitImageSmoothingEnabled) {
            game.canvas.ctx.webkitImageSmoothingEnabled = false;
        } else if (game.canvas.ctx.mozImageSmoothingEnabled) {
            game.canvas.ctx.mozImageSmoothingEnabled = false;
        }
      }
    },
    // needs fixes. firefox gets fuzzy
    fullscreen: function engineFullscreen() {
      var elem = this.canvas;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    },
    init: function gameInit() {
      // need proper resource loading function here to make sure that 1. game does not go to ready state till all this is loaded and 2. game only actually begins once in ready state
      // breaks in FF. prob. because resources are being loaded asynchronously
      Fsm.init(game, game.cfg.state);
      Key.map(game.cfg.keys, game);
      this.cfg.map.cell.init();
      this.cfg.img.init();
      this.canvas.init();
      this.bob.preAlloc(61);
      this.map.src = Engine.createImg("res/img/lvl0.png", function imgLoad2Map() {
        game.map.setup(game.map.src);
      });
      this.ready();
      delete this.init;
    },
    map: {
      setup: function gameMapSetup(src) {
        var cW = src.width,
            cH = src.height,
            pixels = {
              type: 0xFFFF00,
              subtype: 0x0000FF,
              space: 0x000000,
              player: 0x00FF00,
              bob: 0xFF0000
            };
        function type(pixel, type) { return ((pixel & pixels.type) === type); };
        function subtype(pixel) { return (pixel & pixels.subtype); };
        function isPlayer(pixel) { return type(pixel, pixels.player); };
        function isBob(pixel) { return type(pixel, pixels.bob); };
        Engine.parseImg(src, function pixelTests(cX, cY, pixel) {
          var dX = game.map.c2p(cX),
              dY = game.map.c2p(cY),
              n = cX + (cY * cW);
          game.cells[n] = { occupied: [] };
          // switch should go here when more tests are added
          if (isPlayer(pixel)) game.player.init(dX, dY);
          else if (isBob(pixel)) game.bob.alloc(dX, dY);
        });
      },
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
      entities: [],
      p2c: function mapP2C(n) { return Math.floor(n/game.cfg.map.cell.size); }, // pixel-to-cell conversion
      c2p: function mapC2P(n) { return (n * game.cfg.map.cell.size); }, // cell-to-pixel conversion
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
        return game.cells[this.p2c(x) + (this.p2c(y) * game.cfg.map.width)];
      },
      cellOverlap: function mapCellOverlap(x, y, w, h) {
        var cells = [];
        this.temp.cX = ((x%game.cfg.map.cell.size) + w) > game.cfg.map.cell.size; // assumes all entities are smaller than cells
        this.temp.cY = ((y%game.cfg.map.cell.size) + h) > game.cfg.map.cell.size; // assumes all entities are smaller than cells
        this.setAdd(cells, this.cell(x, y));
        if (this.temp.cX) this.setAdd(cells, this.cell(x + game.cfg.map.cell.size, y));
        if (this.temp.cY) this.setAdd(cells, this.cell(x, y + game.cfg.map.cell.size));
        if ((this.temp.cX) && (this.temp.cY)) this.setAdd(cells, this.cell(x + game.cfg.map.cell.size, y + game.cfg.map.cell.size));
        return cells;
      },
      occupied: function mapOccupied(x, y, w, h, ignore) {
        var cells = this.cellOverlap(x, y, w, h),
            checked = this.temp.occupied.checkedGet();

        for (var i = 0; i < cells.length; i++) {
          cell = cells[i];
          for (var n = 0; n < cell.occupied.length; n++) {
            ent = cell.occupied[n];
            if ((ent != ignore) && !this.setContains(checked, ent)) {
              this.setAdd(checked, ent);
              if (Math.collBox(x, y, w, h, ent.x, ent.y, ent.dW, ent.dH)) return ent;
            }
          }
        }
        return false;
      },
      tryMove: function mapTryMove(ent) {
        this.temp.tX = ent.dX + (ent.moving.left ? -ent.vel : ent.moving.right ? ent.vel : 0);
        this.temp.tY = ent.dY + (ent.moving.up ? -ent.vel : ent.moving.down ? ent.vel : 0),
            coll = this.occupied(this.temp.tX, this.temp.tY, ent.dW, ent.dH, ent);
        if (!coll) this.occupy(ent, this.temp.tX, this.temp.tY);
        return coll;
      },
      occupy: function mapOccupy(ent, x, y) {
        // assume caller took care to avoid collision
        ent.dX = x;
        ent.dY = y;
        var before = ent.cells,
            after = this.cellOverlap(x, y, game.cfg.map.cell.size, game.cfg.map.cell.size),
            c, cell;
        // remove object from previous cells that are no longer occupied
        for(c = 0 ; c < before.length ; c++) {
          cell = before[c];
          if (!this.setContains(after, cell)) this.setRem(cell.occupied, ent);
        }
        // add object to new cells that were not previously occupied
        for(c = 0 ; c < after.length ; c++) {
          cell = after[c];
          if (!this.setContains(before, cell)) this.setAdd(cell.occupied, ent);
        }
        this.setCopy(before, after);
        return ent;
      }
    },
    update: function gameUpdate(step) {
      this.player.update(step);
      for (var i = this.map.entities.length - 1; i >= 0; i--) {
        this.map.entities[i].update(step); // or do nothing?
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
      init: function playerInit(dX, dY) {
        this.dir = Math.randChoice(["l", "u", "r", "d"]);
        this.moving = {
          left: false,
          up: false,
          right: false,
          down: false
        };
        this.scale = game.cfg.map.scale;
        this.w = 16;
        this.h = 30;
        this.sX = 0;
        this.sY = 0;
        this.dW = this.w * this.scale;
        this.dH = this.h * this.scale;
        this.dX = dX;
        this.dY = dY;
        this.frame = 0; // current animation frame
        this.frameSpeed = 5; // speed at which to step through frames. higher is slower. TODO needs to be set to be modified by vel. of char.
        this.frameStep = 0; // current step through frames
        this.frameMax = 3; // four animation frames
        this.vel = 0;
        this.velMax = 5;
        this.accel = 10;
        this.cells = []
        game.map.occupy(this, dX, dY);
      },
      update: function playerUpdate(step) {
        this.ani();
        if (this.moving.left || this.moving.up || this.moving.right || this.moving.down) {
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
              this.sX = 8 * this.w + this.frame * this.w;
              break;
            case "r":
              this.sX = 12 * this.w + this.frame * this.w;
              break;
            case "d":
              this.sX = 16 * this.w + this.frame * this.w;
              break;
            case "ul":
              this.moving.left ? this.sX = 4 * this.w + this.frame * this.w : this.sX = 8 * this.w + this.frame * this.w;
              break;
            case "ur":
              this.moving.right ? this.sX = 12 * this.w + this.frame * this.w : this.sX = 8 * this.w + this.frame * this.w;
              break;
            case "dr":
              this.moving.right ? this.sX = 12 * this.w + this.frame * this.w : this.sX = 16 * this.w + this.frame * this.w;
              break;
            case "dl":
              this.moving.left ? this.sX = 4 * this.w + this.frame * this.w : this.sX = 16 * this.w + this.frame * this.w;
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
    bob: {
      init: function bobInit() {
        this.scale = game.cfg.map.scale;
        this.w = 16;
        this.h = 30;
        this.sX = 0;
        this.sY = 30;
        this.dW = this.w * this.scale;
        this.dH = this.h * this.scale;
        this.dX = null;
        this.dY = null;
        this.vel = 0;
        this.cells = [],
        this.update = function bobUpdate() {
        };
      },
      pool: [],
      preAlloc: function bobPreAlloc(i) {
        for (var n = 0; n < i; n++) {
          this.pool[n] = new this.init();
        }
      },
      alloc: function bobAlloc(dX, dY) {
        game.map.entities.push(this.pool.pop());
        game.map.occupy(game.map.entities[game.map.entities.length - 1], dX, dY);
      },
      deAlloc: function bobDeAlloc() {

      }
    }
  };
  return game;
};

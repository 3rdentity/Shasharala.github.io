var game = function gameInit() {
  var game = {
    cells: [], // moved up here temporarily? Needed to be above parseImg();
    cfg: {
      map: {
        scale: 5,
        width: null, // size in terms of cells
        height: null, // size in terms of cells
        cell: {
          init: function gameCfgCellInit() {
            this.size = game.cfg.map.scale * 14; // matches avg. of largest sides of obj's aabb
            delete this.init;
          }
        }
      },
      state: {
        events: [
          { name: "ready", from: "booting", to: "playing", action: function readyAction() { Engine.run(); } },
          { name: "pause", from: "playing", to: "paused", action: function pauseAction() { /*pause screen here*/ } },
          { name: "unPause", from: "paused", to: "playing", action: function unPauseAction() { /*remove pause screen here*/ } }
        ]
      },
      keys: [
        // fullscreen key?
        { key: Key.p, mode: "up", state: "playing", action: function keyPonUp() { this.pause(); } },
        { key: Key.p, mode: "up", state: "paused", action: function keyPOnUp() { this.unPause(); } },
        { key: Key.space, mode: "down", state: "playing", action: function keySpaceOnDown() { this.player.jump(true); } }
      ],
      imgs: [
        // bg
        { id: "entities", url: "res/img/entities.png" }
      ],
      lvls: [
        { name: "test", url: "res/img/lvls/test.png" }
      ]
    },
    canvas: {
      init: function gameCanvasInit(callback) {
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
        callback();
      }
    },
    init: function gameInit() {
      // loading function for these init/setup funcs?
      Fsm.init(game, game.cfg.state);
      Key.map(game.cfg.keys, game);
      this.cfg.map.cell.init();
      // promises would be nice here but implementing/using a polyfill would be annoying
      Engine.loadPools([ { id: block, num: 30 } ], function loadPoolsFin() {
        Engine.loadRes(game.cfg.imgs, null, function loadResFin(res) {
          game.cfg.imgs = res.imgs;
          game.map.src = Engine.createImg("res/img/lvls/test.png", function imgLoad2Map() {
            game.map.setup(game.map.src); // need level loading func. will activate whenever a level is completed
            game.canvas.init(function canvasInitFin() {
              game.ready();
              delete this.init;
            });
          });
        });
      });
    },
    map: {
      setup: function gameMapSetup(src) {
        game.cfg.map.width = src.width;
        game.cfg.map.height = src.height;
        var pixels = {
              type: 0xFFFF00,
              subtype: 0x0000FF,
              nothing: 0x000000,
              player: 0x00FF00,
              block: 0x800000
            };
        function type(pixel, type) { return ((pixel & pixels.type) === type); };
        function subtype(pixel) { return (pixel & pixels.subtype); };
        function isPlayer(pixel) { return type(pixel, pixels.player); };
        function isBob(pixel) { return type(pixel, pixels.bob); };
        function isBlock(pixel) { return type(pixel, pixels.block); }
        Engine.parseImg(src, function pixelTests(cX, cY, pixel) {
          var dX = game.map.c2p(cX),
              dY = game.map.c2p(cY),
              n = cX + (cY * game.cfg.map.width);
          game.cells[n] = { occupied: [] };
          // switch should go here when more tests are added
          if (isPlayer(pixel)) game.player.init(dX, dY);
          else if (isBlock(pixel)) game.obj[game.obj.indexOf(block)].alloc(dX, dY);
        });
      },
      temp: { // local var's to avoid gc
        x: null,
        y: null,
        cX: null,
        cY: null,
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
      setCopy: function mapSetCopy(arr, src) {
        this.setClear(arr);
        for(var n = 0, max = src.length ; n < max ; n++)
        arr.push(src[n]);
      },
      cell: function mapCell(x, y) {
        return game.cells[this.p2c(x) + (this.p2c(y) * game.cfg.map.width)];
      },
      cellOverlap: function mapCellOverlap(x, y, w, h) {
        var cells = this.temp.cellOverlap.cellsGet();
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
              if (Math.collBox(x, y, w, h, ent.x + ent.cbox.x, ent.y + ent.cbox.y, ent.cbox.w, ent.cbox.h)) return ent;
            }
          }
        }
        return false;
      },
      tryMove: function mapTryMove(ent, dir) {
        console.log(dir);
        this.temp.x = ent.dX + ((dir === "l") ? -ent.vel : (dir === "r") ? ent.vel : 0);
        console.log(this.temp.x);
        this.temp.y = ent.dY + ((dir === "u") ? -ent.vel : (dir === "d") ? ent.vel : 0) + ((ent.yVel >= 0 || ent.yVel <= 0) ? ent.yVel += ent.grav : 0);
        var coll = this.occupied(this.temp.x + ent.cbox.x, this.temp.y + ent.cbox.y, ent.cbox.w, ent.cbox.h, ent);
        console.log(ent.yVel);
        console.log(coll);
        if (!coll) this.occupy(ent, this.temp.x, this.temp.y);
        return !coll; // returns the opposite of collision to reflect tryMove failing/being false if collision is true
      },
      occupy: function mapOccupy(ent, x, y) {
        // assume caller took care to avoid collision
        ent.dX = x;
        ent.dY = y;
        var before = ent.cells,
            after = this.cellOverlap(x, y, game.cfg.map.cell.size, game.cfg.map.cell.size),
            c, cell;
        // optimization
        if ((before.length === after.length) &&
            (before[0] === after[0]) &&
            ((before.length < 2) || (before[1] === after[1])) &&
            ((before.length < 3) || (before[2] === after[2])) &&
            ((before.length < 4) || (before[3] === after[3]))) {
          return;
        }
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
        if(this.map.entities[i].update !== undefined) this.map.entities[i].update(step);
      }
    },
    defRender: function gameDefRender(obj, dt) {
      this.canvas.ctx.drawImage(
            this.cfg.imgs.entities,
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
        this.dir = "r";
        this.moving = {
          left: false,
          up: false,
          right: false,
          down: false
        };
        this.scale = game.cfg.map.scale;
        this.w = 23;
        this.h = 58;
        this.sX = 0;
        this.sY = 0;
        this.dW = this.w * this.scale;
        this.dH = this.h * this.scale;
        this.dX = dX;
        this.dY = dY;
        this.frame = 0; // current animation frame
        this.frameSpeed = 5; // speed at which to step through frames. higher is slower
        this.frameSpeedMin = .5;
        this.frameStep = 0; // current step through frames
        this.frameMax = 1; // two animation frames
        this.vel = 0;
        this.velMax = 5;
        this.accel = 10;
        this.yVel = 0;
        this.grav = 1;
        this.cells = [];
        this.cbox = { x: this.dX - this.dW, y: this.dY, w: this.dW, h: this.dH };
        game.map.occupy(this, dX, dY);
      },
      update: function playerUpdate(step) {
        this.ani();
        this.vel = Math.min(Math.accel(this.vel, this.accel, step), this.velMax);
        //TODO attach frameSpeed to vel
        // cheap jumping physics check
        if (this.yVel >= 12) {
          this.yVel = 0;
          this.jumping = false;
        }
        // attempt to move
        if (this.dir.length > 1) {
          for(var i = 0; i < this.dir.length; i++) {
            game.map.tryMove(this, this.dir.substring(i, i + 1));
          }
        }
        else game.map.tryMove(this, this.dir);
      },
      ani: function playerAni(step) {
        // always walking
        switch (this.dir) {
          case "u":
            this.sX = 0 * this.w + this.frame * this.w;
            break;
          case "r":
            this.sX = 0 * this.w + this.frame * this.w;
            break;
          case "d":
            this.sX = 0 * this.w + this.frame * this.w;
            break;
          // consider using something like this.lastDir to detect what last dir was to affect diagonal movements
            break;
          case "ur":
            this.moving.right ? this.sX = 0 * this.w + this.frame * this.w : this.sX = 0 * this.w + this.frame * this.w;
            break;
          case "dr":
            this.moving.right ? this.sX = 0 * this.w + this.frame * this.w : this.sX = 0 * this.w + this.frame * this.w;
            break;
        }
        this.frameStep++;
        if (this.frameStep > this.frameSpeed) {
          this.frameStep = 0;
          this.frame < this.frameMax ? this.frame++ : this.frame = 0;
        }
      },
      // accel obj on keypress
      jump: function playerJump() {
        if (!this.jumping) {
          this.yVel = -10;
          this.jumping = true;
        }
      }
    },
    obj: [
      block = {
        init: function blockInit() {
          this.scale = game.cfg.map.scale;
          this.w = 15;
          this.h = 15;
          this.sX = 0;
          this.sY = 60;
          this.dW = this.w * this.scale;
          this.dH = this.h * this.scale;
          this.dX = null;
          this.dY = null;
          this.vel = 0;
          this.cells = [];
          this.cbox = { x: this.dX, y: this.dY, w: this.dW, h: this.dH };
        },
        pool: [],
        preAlloc: function blockPreAlloc(i) {
          for (var n = 0; n < i; n++) {
            this.pool[n] = new this.init();
          }
        },
        alloc: function blockAlloc(dX, dY) {
          game.map.entities.push(this.pool.pop());
          game.map.occupy(game.map.entities[game.map.entities.length - 1], dX, dY);
        },
        deAlloc: function blockDeAlloc() {

        }
      }
    ]
  };
  return game;
};

// there appears to be a memleak somewhere in Engine
/*
*########
*#ENGINE#
*########
*/
var Engine = {
  timestamp: function engineTimestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
  },
  loadPools: function engineLoadPools(objs, callback) {
    for (var i = 0; i < objs.length; i++) {
      this.game.obj[this.game.obj.indexOf(objs[i].id)].preAlloc(objs[i].num);
    }
    callback();
  },
  loadRes: function engineLoadRes(imgs, sounds, callback) {
    imgs = imgs || [];
    sounds = sounds || [];
    var len = imgs.length + sounds.length,
        res = { imgs: {}, sounds: {} };
    if (len === 0) {
      callback(res);
    }
    else {
      var done = false,
          loaded = function loadResLoaded() {
            if(!done) {
              done = true;
              callback(res);
            }
          };
    }
    var onload = function loadResOnload() {
      if (--len === 0) loaded();
    };
    for(var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      img = Is.string(img) ? { id: img, url: img } : img;
      res.imgs[img.id] = Engine.createImg(img.url, onload);
    }
    for(var i = 0; i < sounds.length; i++) {
      var sound = sounds[i];
      sound = Is.string(sound) ? { id: sound, name: sound } : sound;
      res.sounds[sound.id] = null; // audio lib needs to be called here
    }
    setTimeout(loaded, 8000); // fallback if any events fire awkwardly
  },
  createImg: function engineCreateImg(url, options) {
    options = options || {};
    var image = document.createElement("img");
    Dom.on("obj", image, "load", options);
    image.src = url;
    return image;
  },
  parseImg: function engineParseImg(img, callback) {
    var cW = img.width,
        cH = img.height,
        canvas = this.render2Canv(cW, cH, function(ctx) { ctx.drawImage(img, 0, 0); }),
        ctx = canvas.getContext('2d'),
        data = ctx.getImageData(0, 0, cW, cH).data,
        helpers = {
          valid: function(cX, cY) { return (cX >= 0) && (cX < cW) && (cY >= 0) && (cY < cH); },
          index: function(cX, cY) { return (cX + (cY * cW)) * 4; }, // imgData is stored as an array of indexes. each index contains one byte of RGBA data. every four indexes relates to one pixel
          pixel: function(cX, cY) { var i = this.index(cX, cY); return this.valid(cX, cY) ? (data[i]<<16)+(data[i+1]<<8)+(data[i+2]) : null; } // using bitwise operators to store pixel's RGB into 32 bits of data
        }
    for(cY = 0 ; cY < cH ; cY++)
      for(cX = 0 ; cX < cW ; cX++)
        callback(cX, cY, helpers.pixel(cX, cY), helpers);
  },
  render2Canv: function engineRender2Canv(w, h, render, elem) {
    var canvas = elem ? document.getElementById(elem) : document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    render(canvas.getContext("2d"));
    return canvas;
  },
  update: function engineUpdate(step) {
    this.game.update(step);
  },
  render: function engineRender(dt) {
    this.game.render(dt);
  },
  init: function engineInit(game) {
    // attach the game to the engine
    this.game = game();
    this.game.cfg = this.game.cfg || {};
    this.game.init();
  },
  run: function engineRun() {
    var nowStamp,
        dt = 0,
        lastStamp = this.timestamp(),
        slowScale = this.game.cfg.slowScale || 1, // slow motion scaling factor
        step = 1/this.game.cfg.fps || 1/60,
        trueStep = slowScale * step;
    var engineLoop = function engineLoop() {
      nowStamp = this.timestamp();
      dt = dt + Math.min(1, (nowStamp - lastStamp) / 1000);
      while (dt > trueStep) {
        dt = dt - trueStep;
        this.update(step);
      }
      this.render(dt/slowScale);
      lastStamp = nowStamp;
      requestAnimationFrame(engineLoop.bind(this));
    }
    requestAnimationFrame(engineLoop.bind(this));
  }
};
/*
*#####
*BASE#
*#####
*/
var Is = {
  "string": function isString(obj) { return (typeof obj === "string"); },
  "number": function isNumber(obj) { return (typeof obj === "number"); },
  "bool": function isBool(obj) { return (typeof obj === "boolean"); },
  "array": function isArrray(obj) { return (obj instanceof Array); },
  "undefined": function isUndefined(obj) { return (typeof obj === "undefined"); },
  "func": function isFunc(obj) { return (typeof obj === "function"); },
  "null": function isNull(obj) { return (obj === null); },
  "notNull": function isNotNull(obj) { return (obj !== null); },
  "invalid": function isInvalid(obj) { return ( Is["null"](obj) ||  Is.undefined(obj)); },
  "valid": function isValid(obj) { return (!Is["null"](obj) && !Is.undefined(obj)); },
  "emptyString": function isEmptyString(obj) { return (Is.string(obj) && (obj.length == 0)); },
  "nonEmptyString": function isNonEmptyString(obj) { return (Is.string(obj) && (obj.length > 0)); },
  "emptyArray": function isEmptyArray(obj) { return (Is.array(obj) && (obj.length == 0)); },
  "nonEmptyArray": function isNonEmptyArray(obj) { return (Is.array(obj) && (obj.length > 0)); },
  "document": function isDocument(obj) { return (obj === document); },
  "window": function isWindow(obj) { return (obj === window); },
  "element": function isElement(obj) { return (obj instanceof HTMLElement); },
  "event": function isEvent(obj) { return (obj instanceof Event); },
  "link": function isLink(obj) { return (Is.element(obj) && (obj.tagName == "A")); }
};

function toBool(obj) {
  if (Is.valid(obj)) return ((obj == 1) || (obj == true) || (obj == "1") || (obj == "y") || (obj == "Y") || (obj.toString().toLowerCase() == "true") || (obj.toString().toLowerCase() == "yes"));
  else return false;
}

function eStop(evt) {
  evt.preventDefault();
  evt.cancelBubble = true;
}
/*
*####
*DOM#
*####
*/
var Dom = {
  type: function domType(obj) {
    return Object.prototype.toString.call(obj);
  },
  searchStr: function domSearchString(str, name) {
    return str.indexOf(name);
  },
  get: function domGet(id) {
    return document.getElementById(id);
  },
  set: function domSet(elem, html) {
    elem.innerHTML = html;
  },
  hasClass: function domHasClass(elem, name) {
    return (' ' + elem.className + ' ').indexOf(' ' + name + ' ') != -1;
  },
  addClass: function domAddClass(elem, name) {
    elem.toggleClassName(name, true);
  },
  remClass: function domRemClass(elem, name) {
    elem.toggleClassName(name, false);
  },
  toggleClass: function domToggleClass(elem, name, on) {
    var classes = elem.className.split(' ');
    var n = classes.indexOf(name);
    on = (typeof on == "undefined") ? (n < 0) : on;
    if (on && (n < 0)) classes.push(name);
    else if (!on && (n >= 0)) classes.splice(n, 1);
    elem.className = classes.join(' ');
  },
  hasAttr: function domHasAttr(elem, attr) {
    return elem.hasAttribute(attr);
  },
  getAttr: function domGetAttr(elem, attr) {
    return elem.getAttribute(attr);
  },
  addAttr: function domAddAttr(elem, attr, val) {
    elem.setAttribute(attr, val);
  },
  remAttr: function domRemAttr(elem, attr) {
    elem.removeAttribute(attr);
  },
  query: function domQuery(selector, context) {
    return (context || document).querySelectorAll(selector);
  },
  on: function domOn(on, elem, type, fn, capture) {
    capture = (typeof capture == "undefined") ? false : capture;
    if(on === "elem") document.getElementById(elem).addEventListener(type, fn, capture);
    else if(on === "obj") elem.addEventListener(type, fn, capture);
  },
  un: function domUn(elem, type, fn, capture) {
    capture = (typeof capture == "undefined") ? false : capture;
    document.getElementById(elem).removeEventListener(type, fn, capture);
  },
  // add "[hidden] {display: none;}" to CSS as a fallback
  hide: function domHide(elem) {
    this.addAttr(elem, "hidden");
  },
  show: function domShow(elem) {
    this.remAttr(elem, "hidden");
  },
  replace: function domReplace(name1, name2) {
    this.hide(name1);
    this.show(name2);
  },
  cancelFade: function domCancelFade(elem) {
    if (elem.fading) delete elem.fading;
  },
  fadeOut: function domFadeOut(elem, time) {
    var fadeTime = 16;
    if (time) fadeTime = time;
    var opacity = 1;
    elem.fading = undefined;
    elem.style.opacity = 1;
    elem.style.filter = "";
    var last = new Date.getTime();
    var tick = function fadeOutTick() {
      opacity -= (new Date.getTime() - last) / 400;
      elem.style.opacity = opacity;
      elem.style.filter = "alpha(opacity=" + (100 * opacity)|0 + ")";
      last = new Date.getTime();
      (opacity > 0 && elem.fading) ? setTimeout(tick, fadeTime) : this.hide(elem);
    };
    tick();
  },
  fadeIn: function domFadeIn(elem, time) {
    var fadeTime = 16;
    if (time) fadeTime = time;
    var opacity = 0;
    elem.fading = undefined;
    elem.style.opacity = 0;
    elem.style.filter = "";
    var last = new Date.getTime();
    var tick = function fadeInTick() {
      opacity += (new Date.getTime() - last) / 400;
      elem.style.opacity = opacity;
      elem.style.filter = "alpha(opacity=" + (100 * opacity)|0 + ")";
      last = new Date.getTime();
      if (opacity < 1 && elem.fading) setTimeout(tick, fadeTime);
    };
    this.show(elem);
    tick();
  },
  replaceFade: function domReplaceFade(elem1, elem2, time1, time2) {
    //fadeIn & fadeOut will handle time1 & time2 if they are not specified
    this.fadeOut(elem1, time1);
    this.fadeIn(elem2, time2);
  },
  // props may be overwrit and modifying extended obj will affect orig obj
  // caveats:
  // - objects from other frames/pages will be copied by reference, because their version of Object will be different
  // - objects with a cyclic structure, will be traversed forever and overflow the JS stack
  extend: function domExtend(dest, source) {
    for (var prop in source)
      dest[prop] = source[prop];
    return dest;
  },
  // deepExtend will extend the object so that props are not overwrit and modifying extended obj won't affect orig obj
  // caveats:
  // - objects from other frames/pages will be copied by reference, because their version of Object will be different
  // - objects with a cyclic structure, will be traversed forever and overflow the JS stack
  deepExtend: function domDeepExtend(dest, source) {
    for (var prop in source) {
      if (source[prop] && source[prop].constructor &&
       source[prop].constructor === Object) {
        dest[prop] = dest[prop] || {};
        domDeepExtend(dest[prop], source[prop]);
      } else {
        dest[prop] = source[prop];
      }
    }
    return dest;
  }
};
/*
*#####
*MATH#
*#####
*/
Math.rand = function mathRand(min, max) {
  return (min + (this.random() * (max - min)));
};
Math.randInt = function mathRandInt(min, max) {
  return Math.round(this.rand(min, max));
};
Math.randChoice = function mathRandChoice(choices) {
  return choices[this.randInt(0, choices.length - 1)];
};
Math.randBool = function mathRandBool() {
  return this.randChoice([true, false]);
};
Math.limit = function mathLimit(x, min, max) {
  return Math.max(min, Math.min(max, x));
};
Math.between = function mathBetween(n, min, max) {
  return ((n >= min) && (n <= max));
};
Math.countdown = function mathCountdown(n, dn) {
  return Math.max(0, n - (dn || 1));
};
Math.accel = function mathAccel(v, accel, dt) {
  return v + (accel * dt);
};
Math.lerp = function mathLerp(n, dn, dt) {
  return n + (dn * dt);
};
// easing functions
Math.easeLerp = function mathEaseLerp(a ,b, percent) {
  return a + (b - a) * percent;
};
Math.easeIn = function mathEaseIn(a, b, percent) {
  return a + (b - a) * Math.pow(percent, 2);
};
Math.easeOut = function mathEaseOut(a, b, percent) {
  return a + (b - a) * (1 - Math.pow(1 - percent, 2));
};
Math.easeInOut = function mathEaseInOut(a,b,percent) {
  return a + (b - a) * ((-Math.cos(percent * Math.PI)/2) + 0.5);
};
Math.collBox = function mathCollBox(x1, y1, w1, h1, x2, y2, w2, h2) {
  return !(((x1 + w1 - 1) < x2) ||
           ((x2 + w2 - 1) < x1) ||
           ((y1 + h1 - 1) < y2) ||
           ((y2 + h2 - 1) < y1));
};
/*
*####
*FSM#
*####
*/
var Fsm = {
  trans: false, // variable to check that Fsm is transitioning between states
  init: function fsmInit(obj, cfg) {
    obj.is = cfg.initial || "booting";
    var onLeaveState = cfg.onLeaveState || function defOnLeaveState() { Fsm.trans = true; },
    onEnterState = cfg.onEnterState || function defOnEnterState(i) { setTimeout( function setTimeoutDefOnEnterState() { obj.is = cfg.events[i].to; Fsm.trans = false; }, 0); }; // setTimeout is used to stop synchronous kepresses & events from occuring
    for (var i = 0; i < cfg.events.length; i++) {
      obj[cfg.events[i].name] = this.compile(obj, cfg, i, onLeaveState, onEnterState);
    }
  },
  compile: function fsmCompile(obj, cfg, i, onLeaveState, onEnterState) {
    var func = function fsmEvent() {
      if (obj.is === cfg.events[i].from && Fsm.trans === false || Is.array(cfg.events[i].from) && cfg.events[i].from.indexOf(obj.is) >= 0 && Fsm.trans === false) {
        onLeaveState();
        cfg.events[i].action();
        onEnterState(i);
      }
    };
    return func;
  }
};
/*
*#######
*PUBSUB#
*#######
*/
var PubSub = function pubSub(obj, cfg) {
  obj.subscribe = function(evt, callback) {
    obj.subscribers = obj.subscribers || {};
    obj.subscribers[evt] = obj.subscribers[evt] || [];
    obj.subscribers[evt].push(callback);
  };
  obj.publish = function(evt) {
    if (obj.subscribers && obj.subscribers[evt]) {
      var subs = obj.subscribers[evt],
          args = [].slice.call(arguments, 1);
      for(var n = 0, max = subs.length; n < max ; n++)
        subs[n].apply(obj, args);
    }
  };
  if (cfg) {
    for(var n = 0, max = cfg.length ; n < max ; n++)
      obj.subscribe(cfg[n].evt, cfg[n].action);
  }
};
/*
*####
*KEY#
*####
*/
var Key = {
  backspace: 8,
  tab: 9,
  return: 13,
  esc: 27,
  space: 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  left: 37, up: 38, right: 39, down: 40,
  insert: 45,
  delete: 46,
  zero: 48, one: 49, two: 50, three: 51, four: 52, five: 53, six: 54, seven: 55, eight: 56, nine: 57,
  a: 65, b: 66, c: 67, d: 68, e: 69, f: 70, g: 71, h: 72, i: 73, j: 74, k: 75, l: 76, m: 77, n: 78, o: 79, p: 80, q: 81, r: 82, s: 83, t: 84, u: 85, v: 86, w: 87, x: 88, y: 89, z: 90,
  tilda: 192,
  map: function keyMap(map, ctx) {
    var onKey = function(evt, mode) {
      for(var i = 0; i < map.length; i++) {
        var k = map[i];
        k.mode = k.mode || "up";
        if(Key.match(k, evt.keyCode, mode, ctx, evt.ctrlKey, evt.shiftKey)) {
          k.action.call(ctx, evt.keyCode, evt.ctrlKey, evt.shiftKey);
          eStop(evt);
        }
      }
    };
    Dom.on("obj", document, "keydown", function onKeyDown(evt) { return onKey(evt, "down"); });
    Dom.on("obj", document, "keyup", function onKeyUp(evt) { return onKey(evt, "up"); });
  },
  match: function keyMatch(map, keyCode, mode, ctx, ctrl, shift) {
    if(map.mode === mode) {
      if(!map.state || !ctx || (map.state === ctx.is) || (Is.array(map.state) && map.state.indexOf(ctx.is) >= 0)) {
        if ((map.key === keyCode) || (Is.array(map.key) && (map.key.indexOf(keyCode) >= 0))) {
          if ((Is.invalid(map.ctrl) || (map.ctrl === ctrl)) && (Is.invalid(map.shift) || (map.shift === shift))) {
            return true;
          }
        }
      }
    }
    return false;
  }
};

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
        width: null, // size in terms of cells
        height: null, // size in terms of cells
        cell: {
          init: function gameCfgCellInit() {
            this.size = game.cfg.map.scale * 14; // matches avg. of largest sides of obj's aabb. there is an issue with collision at the moment. it is detecting cells and stopping movement at that level. need to detect aabb's inside of cells that obj's share
            delete this.init;
          }
        },
        cbox: {
          init: function gameCfgCboxInit() {
            this.full = { x: 0, y: 0, w: game.cfg.map.cell.size, h: game.cfg.map.cell.size };
            this.player = { x: game.cfg.map.cell.size / 4, y: game.cfg.map.cell.size / 4, w: game.cfg.map.cell.size / 2, h: game.cfg.map.cell.size - game.cfg.map.cell.size / 4 };
            this.npc = { x: 1, y: 1, w: game.cfg.map.cell.size - 2, h: game.cfg.map.cell.size - 2 };
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
        { key: Key.left, mode: "down", state: "playing", action: function keyLeftOnDown() { this.player.moveLeft(true); } },
        { key: Key.up, mode: "down", state: "playing", action: function keyUpOnDown() { this.player.moveUp(true); } },
        { key: Key.right, mode: "down", state: "playing", action: function keyRightOnDown() { this.player.moveRight(true); } },
        { key: Key.down, mode: "down", state: "playing", action: function keyDownOnDown() { this.player.moveDown(true); } },
        { key: Key.left, mode: "up", state: "playing", action: function keyDownOnUp() { this.player.moveLeft(false); } },
        { key: Key.up, mode: "up", state: "playing", action: function keyUpOnUp() { this.player.moveUp(false); } },
        { key: Key.right, mode: "up", state: "playing", action: function keyRightOnUp() { this.player.moveRight(false); } },
        { key: Key.down, mode: "up", state: "playing", action: function keyDownOnUp() { this.player.moveDown(false); } }
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
      // loading function for these init/setup funcs?
      Fsm.init(game, game.cfg.state);
      Key.map(game.cfg.keys, game);
      this.cfg.map.cell.init();
      this.cfg.map.cbox.init();
      // promises would be nice here but implementing/using a polyfill would be annoying
      Engine.loadPools([ { id: bob, num: 1 }, { id: block, num: 70 } ], function loadPoolsFin() {
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
              bob: 0xFF0000,
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
          else if (isBob(pixel)) game.obj[game.obj.indexOf(bob)].alloc(dX, dY);
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
        if (!dir) {
          this.temp.x = ent.dX + (ent.moving.left ? -ent.vel : ent.moving.right ? ent.vel : 0);
          this.temp.y = ent.dY + (ent.moving.up ? -ent.vel : ent.moving.down ? ent.vel : 0);
              coll = this.occupied(this.temp.x + ent.cbox.x, this.temp.y + ent.cbox.y, ent.cbox.w, ent.cbox.h, ent);
          if (!coll) this.occupy(ent, this.temp.x, this.temp.y);
          return !coll;
        }
        else { // if the user is moving diagonally
          this.temp.x = ent.dX + ((dir === "l") ? -ent.vel : (dir === "r") ? ent.vel : 0);
          this.temp.y = ent.dY + ((dir === "u") ? -ent.vel : (dir === "d") ? ent.vel : 0);
              coll = this.occupied(this.temp.x + ent.cbox.x, this.temp.y + ent.cbox.y, ent.cbox.w, ent.cbox.h, ent);
          if (!coll) this.occupy(ent, this.temp.x, this.temp.y);
          return !coll; // returns the opposite of collision to reflect tryMove failing/being false if collision is true
        }
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
        this.map.entities[i].update(step); // or do nothing?
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
        this.cells = [];
        this.cbox = { x: this.dW / 4, y: this.dH / 4, w: this.dW / 2, h: this.dH - this.dH / 4 };
        game.map.occupy(this, dX, dY);
      },
      update: function playerUpdate(step) {
        this.ani();
        if (this.moving.left || this.moving.up || this.moving.right || this.moving.down) {
          this.vel = Math.min(Math.accel(this.vel, this.accel, step), this.velMax);
          if (!game.map.tryMove(this) && this.dir.length > 1) {
            for(var i = 0; i < this.dir.length; i++) {
              game.map.tryMove(this, this.dir.substring(i, i + 1));
            }
          }
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
            // consider using something like this.lastDir to detect what last dir was to affect diagonal movements
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
    obj: [
      bob = {
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
          this.cells = [];
          this.cbox = { x: 1, y: 1, w: this.dW - 2, h: this.dH - 2 };
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
      },
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
          this.cbox = { x: 0, y: 0, w: this.dW, h: this.dH };
          this.update = function blockUpdate() {
          };
        },
        pool: [],
        preAlloc: function blockPreAlloc(i) {
          for (var n = 0; n < i; n++) {
            this.pool[n] = new this.init();
          }
        },
        alloc: function bobAlloc(dX, dY) {
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

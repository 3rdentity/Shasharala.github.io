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
  run: function engineRun(game) {
    // attach the game to the engine
    this.game = game();
    this.game.cfg = this.game.cfg || {};
    this.game.init();
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

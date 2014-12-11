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



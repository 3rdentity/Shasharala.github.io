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
    if (on && (n < 0))
      classes.push(name);
    else if (!on && (n >= 0))
      classes.splice(n, 1);
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
  on: function domOn(elem, type, fn, capture) {
    capture = (typeof capture == "undefined") ? false : capture;
    elem.addEventListener(type, fn, capture);
  },
  un: function domUn(elem, type, fn, capture) {
    capture = (typeof capture == "undefined") ? false : capture;
    elem.removeEventListener(type, fn, capture);
  },
  // add "[hidden] {display: none;} to CSS as a fallback
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
  // add "@keyframes domfadeIn {0% {opacity: 0;} 100% {opacity: 1;}}" & "@keyframes domFadeOut {0% {opacity: 1;} 100% {opacity: 0;}}" to CSS
  fadeIn: function domFadeIn(name, time) {
    var fadeTime = "1s"; //default fadeTime
    //if user has set time then fadeTime will be modified to it
    if (time) {
      fadeTime = time + "s";
    }
    setTimeout(function domFadeInSetTimeoutDomShow(){show(name);}, 80);
    name.style.animation = "domFadeIn" + " " + fadeTime + " " + "1 forwards";
  },
  fadeOut: function domFadeOut(name, time) {
    var fadeTime = "1s"; //default fadeTime
    var wait = 30; //default wait is 30 milliseconds
    //if user has set time then fadeTime will be set to it. wait will be set to time in milliseconds
    if (time) {
      fadeTime = time + "s";
      wait = Number(time) * 1000;
    }
      name.style.animation = "domFadeOut" + " " + fadeTime + " " + "1 forwards";
      setTimeout(function domFadeOutSetTimeoutDomHide(){this.hide(name);}, wait); //object will disappear before fadeTime if hide is not delayed
  },
  replaceFade: function domReplaceFade(name1, name2, time1, time2) {
    //fadeIN & fadeOut will handle time1 & time2 if they are not specified
    this.fadeOut(name1, time1);
    this.fadeIn(name2, time2);
  }
};

/*
IMPLEMENT APPROPRIATLY
is = {
  'string':         function(obj) { return (typeof obj === 'string');                 },
  'number':         function(obj) { return (typeof obj === 'number');                 },
  'bool':           function(obj) { return (typeof obj === 'boolean');                },
  'array':          function(obj) { return (obj instanceof Array);                    },
  'undefined':      function(obj) { return (typeof obj === 'undefined');              },
  'func':           function(obj) { return (typeof obj === 'function');               },
  'null':           function(obj) { return (obj === null);                            },
  'notNull':        function(obj) { return (obj !== null);                            },
  'invalid':        function(obj) { return ( is['null'](obj) ||  is.undefined(obj));  },
  'valid':          function(obj) { return (!is['null'](obj) && !is.undefined(obj));  },
  'emptyString':    function(obj) { return (is.string(obj) && (obj.length == 0));     },
  'nonEmptyString': function(obj) { return (is.string(obj) && (obj.length > 0));      },
  'emptyArray':     function(obj) { return (is.array(obj) && (obj.length == 0));      },
  'nonEmptyArray':  function(obj) { return (is.array(obj) && (obj.length > 0));       },
  'document':       function(obj) { return (obj === document);                        },
  'window':         function(obj) { return (obj === window);                          },
  'element':        function(obj) { return (obj instanceof HTMLElement);              },
  'event':          function(obj) { return (obj instanceof Event);                    },
  'link':           function(obj) { return (is.element(obj) && (obj.tagName == 'A')); }
}

to = {
  'bool':   function(obj, def) { if (is.valid(obj)) return ((obj == 1) || (obj == true) || (obj == "1") || (obj == "y") || (obj == "Y") || (obj.toString().toLowerCase() == "true") || (obj.toString().toLowerCase() == 'yes')); else return (is.bool(def) ? def : false); },
  'number': function(obj, def) { if (is.valid(obj)) { var x = parseFloat(obj); if (!isNaN(x)) return x; } return (is.number(def) ? def : 0); },
  'string': function(obj, def) { if (is.valid(obj)) return obj.toString(); return (is.string(def) ? def : ''); }
}
*/

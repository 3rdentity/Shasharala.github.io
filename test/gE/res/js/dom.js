var Dom = {
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
  query: function domQuery(selector, context) {
    return (context || document).querySelectorAll(selector);
  }
};




// consider onclick events/parent/childnode stuffs






//functions that display, fade, and hide objects
function replace(name1, name2) {
  hide(name1);
  show(name2);
}

function replaceF(name1, name2, time1, time2) {
  fadeOut(name1, time1);
  fadeIn(name2, time2);
}

function fadeIn(name, time) {
  var nameStr = name + "";
  var fadeTime = "1s"; //default fadeTime
  //if user has set time then fadeTime will be modified to it
  if (time) {
    fadeTime = time + "s";
  }
  var searchFor = "object";
  if (nameStr.indexOf(searchFor) != -1) {
    setTimeout(function(){show(name);}, 80);
    name.parentNode.style.animation = "invisToVis" + " " + fadeTime + " " + "1 forwards";
    //Safari & Chromium
    name.parentNode.style.WebkitAnimation = "invisToVis" + fadeTime + "1 forwards";
  }
  else {
    setTimeout(function(){show(name);}, 80);
    document.getElementById(name).style.animation = "invisToVis" + " " + fadeTime + " " + "1 forwards";
    //Safari & Chromium
    document.getElementById(name).style.WebkitAnimation = "invisToVis" + " " + fadeTime + " " + "1 forwards";
  }
}

function fadeOut(name, time) {
  var nameStr = name + "";
  var fadeTime = "1s"; //default fadeTime
  var wait = 30; //default wait is 30 milliseconds
  //if user has set time then fadeTime will be set to it. wait will be set to time in milliseconds
  if (time) {
    fadeTime = time + "s";
    wait = Number(time) * 1000;
  }
  var searchFor = "object";
  if (nameStr.indexOf(searchFor) != -1) {
    name.parentNode.style.animation = "visToInvis" + " " + fadeTime + " " + "1 forwards";
    //Safari & Chromium
    name.parentNode.style.WebkitAnimation = "visToInvis" + " " + fadeTime + " " + "1 forwards";
    setTimeout(function(){hide(name);}, wait); //object will disappear before fadeTime if hide is not delayed
  }
  else {
    document.getElementById(name).style.animation = "visToInvis" + " " + fadeTime + " " + "1 forwards";
    //Safari & Chromium
    document.getElementById(name).style.WebkitAnimation = "visToInvis" + " " + fadeTime + " " + "1 forwards";
    setTimeout(function(){hide(name);}, wait); //object will disappear before fadeTime if hide is not delayed
  }
}

function hide(name) {
  var nameStr = name + "";
  var searchFor = "object";
  if (nameStr.indexOf(searchFor) != -1) {
    name.parentNode.setAttribute("hidden", "true");
  }
  else {
    document.getElementById(name).setAttribute("hidden", "true");
  }
}

function show(name) {
  var nameStr = name + "";
  var searchFor = "object";
  if (nameStr.indexOf(searchFor) != -1) {
    name.parentNode.removeAttribute("hidden", "false");
  }
  else {
    document.getElementById(name).removeAttribute("hidden", "false");
  }
}


//function that injects data into an object
function inject(name, content) {
  var nameStr = name + "";
  var searchFor = "object";
  if (nameStr.indexOf(searchFor) != -1) {
    name.innerHTML = content;
  }
  else {
    document.getElementById(name).innerHTML = content;
  }
}

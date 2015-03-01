/*
*#########
*VARIABLES
*#########
*/
var gozillaClick = false;
var newMailRead = false;
var theDate = new Date();
var theYear = "" + theDate.getFullYear();
var theShortYear = theYear.substring(2);
var theMonth = theDate.getMonth() + 1;
var theDay = theDate.getDate();

/*
*#########
*TEMPLATES
*#########
*/
var temp_login = '<div id="titleBar">Welcome to SuperSecureSite<sup>TM</sup></div><form id="dataBox" onsubmit="test()"><p id="prompt">sign in to continue</p><br><input id="username" class="dataEntry" type="text" placeholder="username" autocomplete="off" autofocus required><br><br><input id="password" class="dataEntry" type="text" placeholder="password" autocomplete="off" required><br><br><img id="badLoginFace" src="res/img/incorrFace.png" width="50px" draggable="false"><span id="badLogin">incorrect username<br>or password</span><p id="forgotPass" onclick="startStupid()"><u>forgot password?</u></p></form>';
var temp_stupid = '<div id="titleBar">SuperSecureSite<sup>TM</sup> Authentication</div><form id="dataBox" onsubmit="test()"><p id="prompt">You have forgotten your password.<br>How unfortunate.<br>Please prove that you are a human by answering the following question.</p><div id="req"></div><br><br><input class="dataEntry" id="stupidAns" type="text" placeholder="i do not know" autocomplete="off" autofocus required></form>';
var temp_pwd = '<div id="titleBar">SuperSecureSite<sup>TM</sup> Authentication</div><form id="dataBox" onsubmit="test()"><p id="prompt">Further authentication is required.<br>Create a password following the rules below.</p><div id="req"></div><br><br><br><input id="pwd" class="dataEntry" type="text" placeholder="w0rd5" autocomplete="off" required></form>';
var temp_thanks = '<div id="titleBar">SSS<sup>TM</sup> Password Request</div><form id="dataBox"><p id="prompt">Thank you!<br><br>An e-mail has been sent to the e-mail address last associated with your current IP Address.<br><br>If you have any questions or do not receive an e-mail you must visit your nearest SSS establishment for further assistance.</p></form>';
var temp_expired = '<div id="mainInterface"><div id="titleBar">SSS<sup>TM</sup> Password Reset Expired</div><form id="dataBox" onsubmit="test()"><p id="prompt">It appears that this session has expired.<br><br>We apologize for any inconvenience this has caused you.<br><br>Please <a id="resetLink" onclick="resetGame()">start a new session</a>.<br><br>If you need assistance or have any questions please visit the closest SSS establishment to you.</p></form></div>';
var temp_tempEmails = '';
var temp_email = '<img id="eCount" src="res/img/eCount.png"><span id="emailSys">Gozilla Lightningbird<sup>TM</sup></span><hr>';

/*
*######
*EMAILS
*######
*/
/*+ (((theDay - 1) >= 1) ? (theMonth + "/" + (theDay - 1) + "/" + theShortYear) : ((theMonth - 1) + "/" + (theDay + 1) + "/" + theShortYear)) +*/
var emails = [
    ["IMPORTANT: SSS Password Reset", "SSS", 0, "Dear userNameHere,<br><br>You are receiving this e-mail because someone (Was it you?) requested a password reset from the IP Address associated with this e-mail in our records.<br>If you did not request a password reset then please visit the closest SSS establishment to you immediatly, your account may be vulnerable.<br><br>If you did request a password resest please click <a id='passResetLink' onclick='startExpired()'>here</a>."],
    ["What's Up?", "Robbin", -2, "Helllooo, anyone in there?<br>I haven't heard from you in a while!<br>What are you up to? Do you not like me anymore or something? I know you're busy with your \"projects\" or whatever, but we havn't hung out in ages! What's up with that?<br>Let's go out somewhere. I don't care where. Let's break something, do something, talk, c'mon, anything! I miss you!<br><br>Call me or something, ASAP, pleaasse?"],
    ["Your Assistance is Needed", "Dr. William Hamford", -3, "Good Day,<br><br>My name is Dr William Hamford, a staff in the Private Clients Section of a well-known bank, here in London, England. One of our accounts, with holding balance of £15,000,000 (Fifteen Million Pounds Sterling) has been dormant and last operated three years ago. From my investigations and confirmation, the owner of the said account, a foreigner by the name of Joe Shmoedja died in "+ month2Month(theMonth) + ", " + (theYear - 3) +" in a plane crash in Bristol.<br><br>Since then, nobody has done anything as regards the claiming of this money, as he has no family member that has any knowledge as to the existence of either the account or the funds; and also Information from the National Immigration also states that he was single on entry into the UK.<br>I have decided to find a reliable foreign partner to deal with. I therefore propose to do business with you, standing in as the next of kin of these funds from the deceased and funds released to you after necessary processes have been followed.<br><br>This transaction is totally free of risk and troubles as the fund is legitimate and does not originate from drug, money laundry, terrorism or any other illegal act.<br>On your interest, let me hear from you URGENTLY.<br><br>Best Regards,<br>Dr William Hamford, Financial Analysis and Remittance Manager"],
    ["Ladykiller!!!", "Matthew", -1, "Hey!<br><br>Have you seen <a href='https://www.youtube.com/watch?v=fEW2pdZ0qEE' target='_blank'>this</a> game? It looks amazing!<br>From what I have read about it it seems like it is not only particularly risqu&eacute;, hehe, but it will be very different from traditional visual novels! You know how in most visual novels wooing a specific chracter is done by doing things specifically for the character? Filling them up with charity like a vending machine till their adoration for you falls out? Well, this game ain't gonna take any of that shit from you. Your manipulation will have consequences.<br><br>Sounds exciting, huh?"]
];

var usedEmails = [];

/*
*################
*STUPID QUESTIONS
*################
*/
var stupidQues = [
    ["What is the book number in which Albus Dumbledore of the Harry Potter series dies?", "6", "six"],
    ["", ""]
];

var usedStupidQues = "";

/*
*################
*PASSWORD PUZZLES
*################
*/
var passPuzzles = [
    "",
    ""
];

var usedPassPuzz = "";

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

var states = {
    events: [
        { name: "startUp", from: "booting", to: "login", action: function Action() { /**/ } },
        { name: "startStupid", from: "login", to: "stupidQues", action: function pauseAction() { /*pause screen here*/ } },
        { name: "startPWD", from: "stupidQues", to: "pwdPuzzle", action: function unPauseAction() { /*remove pause screen here*/ } },
        { name: "startEmail", from: "pwdPuzzle", to: "emails", action: function unPauseAction() { /*remove pause screen here*/ } },
        { name: "startExpired", from: "emails", to: "expired", action: function unPauseAction() { /*remove pause screen here*/ } },
        { name: "resetGame", from: "expired", to: "login", action: function unPauseAction() { /*remove pause screen here*/ } }
    ]
}

/*
*#########
*FUNCTIONS
*#########
*/

function startGame() {
    //init FSM
    composeEmails(4);
    //set stupid question
    //set password test
}

function composeEmails(num) {
    for (i = 0; i < num; i++) {

    }
}

//assumes months are counted from 1-12 not 0-11
function month2Month(val) {
    if (val > 0) {
        switch (val) {
            case 1 || "01":
                return "January";
            case 2 || "02":
                return "February";
            case 3 || "03":
                return "March";
            case 4 || "04":
                return "April";
            case 5 || "05":
                return "May";
            case 6 || "06":
                return "June";
            case 7 || "07":
                return "July";
            case 8 || "08":
                return "August";
            case 9 || "09":
                return "September";
            case 10 || "10":
                return "October";
            case 11 || "10":
                return "Novemver";
            case 12 || "12":
                return "December";
        }
    }
    else {
        switch (val) {
            case "January" || "Jan" || "JAN":
                return "01";
            case "Febuary" || "Feb" || "FEB":
                return "02";
            case "March" || "Mar" || "MAR":
                return "03";
            case "April" || "Apr" || "APR":
                return "04";
            case "May" || "May" || "MAY":
                return "05";
            case "June" || "Jun" || "JUNE":
                return "06";
            case "July" || "Jul" || "JUL":
                return "07";
            case "August" || "Aug" || "AUG":
                return "08";
            case "September" || "Sep" || "SEP":
                return "09";
            case "October" || "Oct" || "OCT":
                return "10";
            case "November" || "Nov" || "NOV":
                return "11";
            case "December" || "Dec" || "DEC":
                return "12";
        }
    }
}

// needs to interact with FSM to respond with correct funcs
// IE: first state is the login state. during login user cannot input
//any data and must click "forgot password" to continue
function test(val) {
    var data = document.getElementById("dataEntry").value;
    if(data === "one word") {
        document.getElementById("theFieldset").className = "fieldset_corr";
        document.getElementById("theLegend").className = "legend_corr";
        document.getElementById("theLegend").innerHTML = "CORRECT";
    }
    else {
        document.getElementById("theFieldset").className = "fieldset_incorr";
        document.getElementById("theLegend").className = "legend_incorr";
        document.getElementById("theLegend").innerHTML = "INCORRECT";
    }
    event.preventDefault();
}

function startStupid() {
    document.getElementById("mainInterface").innerHTML = temp_stupid;
}

function startPWD() {
    document.getElementById("mainInterface").innerHTML = temp_pwd;
}

function startEmail() {
    document.getElementById("mainInterface").innerHTML = temp_thanks;
    document.getElementById("prompt").style.padding = "100px 0px 0px 0px";
    setTimeout(function displayEmail() {
        var i = 0;
        document.getElementById('emailContOutline').removeAttribute('hidden');
        var emailSpoolInt = setInterval( function spoolEmail() {
            document.getElementById('emailCont').style.height = (i++) + 'px';
            if (i === 30) {
                clearInterval(emailSpoolInt);
            }
        }, 10);
    }, 1000)
}

function emailSlideUp() {
    if (gozillaClick === false) {
        var i = 0;
        var k = 30;
        gozillaClick = true;
        document.getElementById("emailSys").style.cursor = "default";
        var emailSlideUpInt = setInterval(function emailSlideUpI() {
            document.getElementById("emailContOutline").style.height = (i += 4) + 'px';
            document.getElementById("emailCont").style.height = (k += 4) + 'px';
            if (k > 440) {
                clearInterval(emailSlideUpInt);
            }
        }, 1);
    }
    else {
        //do nothing
    }
}

function emailRead(num) {
    temp_tempEmails = document.getElementById("emailCont").innerHTML;
    switch (num) {
        case 0:
            document.getElementById("emailCont").innerHTML = temp_email + emails[0];
            document.getElementById("eCount").style.width = "0px";
            newMailRead = true;
            break;
        case 1:
            if (newMailRead === true) {
                document.getElementById("emailCont").innerHTML = temp_email + emails[1];
                document.getElementById("eCount").style.width = "0px";
            }
            else {
                document.getElementById("emailCont").innerHTML = temp_email + emails[1];
            }
            break;
        case 2:
            if (newMailRead === true) {
                document.getElementById("emailCont").innerHTML = temp_email + emails[2];
                document.getElementById("eCount").style.width = "0px";
            }
            else {
                document.getElementById("emailCont").innerHTML = temp_email + emails[2];
            }
            break;
        case 3:
            if (newMailRead === true) {
                document.getElementById("emailCont").innerHTML = temp_email + emails[3];
                document.getElementById("eCount").style.width = "0px";
            }
            else {
                document.getElementById("emailCont").innerHTML = temp_email + emails[3];
            }
            break;
    }
}

function emailBack() {
    if (newMailRead === true ) {
        document.getElementById("emailCont").innerHTML = temp_tempEmails;
        document.getElementById("emailNew").style.color = "#914a4a";
        document.getElementById("eCount").style.width = "0px";
    }
    else {
        document.getElementById("emailCont").innerHTML = temp_tempEmails;
    }
}

function startExpired() {
    document.getElementById("emailContOutline").setAttribute("hidden", "true");
    document.getElementById("mainInterface").innerHTML = temp_expired;
    document.getElementById("prompt").style.padding = "100px 0px 0px 0px";
}

function resetGame() {
    gozillaClick = false;
    newMailRead = false;
    usedStupidQues = "";
    usedPassPuzz = "";
    usedEmails = [];
    //startGame();
    // should include a reset mainInterface and a reset emailContent ie: document.getElementById("mainInterface").innerHTML = temp_login; & etc.
}

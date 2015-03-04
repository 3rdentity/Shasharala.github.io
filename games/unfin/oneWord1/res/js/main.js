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
var reSym = /[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/\\]/g;
var reNum = /\d/g
var reUp = /[A-Z]/g;
var reLow = /[a-z]/g;
var reVow = /[aeiou]/gi;
var reCon = /[bcdfghjklmnpqrstvwxz]/gi;

/*
*#########
*TEMPLATES
*#########
*/
var temp_login = '<div id="titleBar">Welcome to SuperSecureSite<sup>TM</sup></div><form id="dataBox" onsubmit="testLogin(event);"><p id="prompt">sign in to continue</p><input class="dataEntry" type="text" placeholder="username" autocomplete="off" autofocus><br><br><input class="dataEntry" type="text" placeholder="password" autocomplete="off"><br><br><input type="submit" value="submit" hidden><img id="badLoginFace" src="res/img/incorrFace.png" width="50px" draggable="false"><span id="badLogin">incorrect username<br>or password</span><p id="forgotPass" onclick="startStupid();"><u>forgot password?</u></p></form>';
var temp_stupid = '';
var temp_pwd = '';
var temp_thanks = '<div id="titleBar">SSS<sup>TM</sup> Password Request</div><form id="dataBox"><p id="prompt">Thank you!<br><br>An e-mail has been sent to the e-mail address last associated with your current IP Address.<br><br>If you have any questions or do not receive an e-mail you must visit your nearest SSS establishment for further assistance.</p></form>';
var temp_expired = '<div id="mainInterface"><div id="titleBar">SSS<sup>TM</sup> Password Reset Expired</div><form id="dataBox"><p id="prompt">It appears that this session has expired.<br><br>We apologize for any inconvenience this has caused you.<br><br>Please <a id="resetLink" onclick="resetGame();">start a new session</a>.<br><br>If you need assistance or have any questions please visit the closest SSS establishment to you.</p></form></div>';
var temp_emailsTable = '<tr class="emailsHeader"><th>Subject</th><th>From</th><th>Date</th></tr>';
var temp_tempEmails = '';

/*
*######
*EMAILS
*######
*/
var emails = [
    ["IMPORTANT: SSS Password Reset", "SSS", 0, "Dear userNameHere,<br><br>You are receiving this e-mail because someone (Was it you?) requested a password reset from the IP Address associated with this e-mail in our records.<br>If you did not request a password reset then please visit the closest SSS establishment to you immediatly, your account may be vulnerable.<br><br>If you did request a password resest please click <a id='passResetLink' onclick='startExpired();'>here</a>."],
    ["What's Up?", "Robbin", -2, "Helllooo, anyone in there?<br>I haven't heard from you in a while!<br>What are you up to? Do you not like me anymore or something? I know you're busy with your \"projects\" or whatever, but we havn't hung out in ages! What's up with that?<br>Let's go out somewhere. I don't care where. Let's break something, do something, talk, c'mon, anything! I miss you!<br><br>Call me or something, ASAP, pleaasse?"],
    ["Your Assistance is Needed", "Dr. William Hamford", -3, "Good Day,<br><br>My name is Dr William Hamford, a staff in the Private Clients Section of a well-known bank, here in London, England. One of our accounts, with holding balance of £15,000,000 (Fifteen Million Pounds Sterling) has been dormant and last operated three years ago. From my investigations and confirmation, the owner of the said account, a foreigner by the name of Joe Shmoedja died in "+ month2Month(theMonth) + ", " + (theYear - 3) +" in a plane crash in Bristol.<br><br>Since then, nobody has done anything as regards the claiming of this money, as he has no family member that has any knowledge as to the existence of either the account or the funds; and also Information from the National Immigration also states that he was single on entry into the UK.<br>I have decided to find a reliable foreign partner to deal with. I therefore propose to do business with you, standing in as the next of kin of these funds from the deceased and funds released to you after necessary processes have been followed.<br><br>This transaction is totally free of risk and troubles as the fund is legitimate and does not originate from drug, money laundry, terrorism or any other illegal act.<br>On your interest, let me hear from you URGENTLY.<br><br>Best Regards,<br>Dr William Hamford, Financial Analysis and Remittance Manager"],
    ["Ladykiller!!!", "Matthew", -1, "Hey!<br><br>Have you seen <a href='https://www.youtube.com/watch?v=fEW2pdZ0qEE' target='_blank'>this</a> game? It looks amazing!<br>From what I have read about it it seems like it is not only particularly risqu&eacute;, hehe, but it will be very different from traditional visual novels! You know how in most visual novels wooing a specific chracter is done by doing things specifically for the character? Filling them up with charity like a vending machine till their adoration for you falls out? Well, this game ain't gonna take any of that shit from you. Your manipulation will have consequences.<br><br>Sounds exciting, huh?"]
];
var usedEmails = "";

/*
*################
*STUPID QUESTIONS
*################
*/
var stupidQues = [
    ["What is the book number in which Albus Dumbledore of the Harry Potter series dies?", "six"],
    ["What is the sum of 'two plus two'?", "four"]
];
var stupidQuesSol = "";

/*
*################
*PASSWORD PUZZLES
*################
*/
var passPuzzles = [
    ["<ul id='pwdList'><li>less than eleven characters</li><li>upper/lowercase letters</li><li>one symbol</li><li>two numbers whose sum is ten</li><li>two vowels</li><li>five consonants</li></ul>", "lt11, upper, lower, 01sym, 10sum, 02vow, 05con"]
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
    return false;
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
*########
*num2Word
*########
*/
var num2Word = {
    reConv: /[\, ]/g,
    thousandsPlus: [
        "",
        "thousand",
        "million",
        "billion",
        "trillion"
    ],
    digits: [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine"
    ],
    teens:[
        "ten",
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fifteen",
        "sixteen",
        "seventeen",
        "eighteen",
        "nineteen"
    ],
    twentyPlus: [
        "twenty",
        "thirty",
        "forty",
        "fifty",
        "sixty",
        "seventy",
        "eighty",
        "ninety"
    ],
    conv: function num2Word(num) {
        num = num.toString();
        num = num.replace(this.reConv,""); //get rid of spaces or commas globally
        if (num != parseFloat(num)) return "NAN"; //make sure num is actually a number
        var x = num.indexOf("."); //holds length of num or length/indexOf a decimal point
        if (x == -1) {
            x = num.length;
        }
        if (x > 15) {
            return "The number you have provided is too large";
        }
        var n = num.split(""); //holds num broken into an array of integers
        var res = ""; //holds the result of our conversion
        var rev = false; //is true if current digit has been reviewed already
        if (x === 1 && Number(n[0]) === 0) { //if input is zero there is no need to do very many tests, just return zero
            res += this.digits[0];
            return res;
        }
        else {
            for (var i = 0; i < x; i++) { //convert until we reach a decimal point or the end of n
                if ((x - i) % 3 === 2) { //if x has a remainder of two it must be a teens number, a twentyPlus number, or a zero
                    if (Number(n[i]) === 1) { //if x has a remainder of two and n starts with "1" then n must be a teens number
                        res += this.teens[Number(n[i + 1])] + " "; //find teens number in array by checking number of next digit in n
                        i++; //move i forward one since the teens array contains numbers that cover two digits and we already checked the next digit in n
                        rev = true;
                    }
                    else if (Number(n[i]) !== 0) { //if n is not zero the it must be a twentyPlus number
                        res += this.twentyPlus[Number(n[i]) - 2] + " "; //find twentyPlus number in array by stepping back two since array starts at twenty with an index of zero
                        rev = true;
                    }
                }
                else if (Number(n[i]) !== 0) { //if n is does not have a remainder of two then it must be either a single digit or a hundreds number
                    res += this.digits[Number(n[i])] +" "; //find digit in array
                    if ((x - i) % 3 === 0) res += "hundred "; //if x has no remained then it is a hundreds number. add the word "hundred" after the digit we just added
                    rev = true;
                }
                if ((x - i) % 3 === 1) { //if x has a remainder of one then it must be a thousandsPlus number
                    if (rev === true) { //if n has already been reviewed and must be a thousandsPlus number because of the above text then we may continue
                        res += this.thousandsPlus[(x - (i + 1)) / 3] + " "; //locate what thousandths place is being referenced by taking the length of num and removing (current index + 1)(to account for the zero index in the thousandsPlus array) from it before dividing it by three
                    }
                    rev = false;
                }
            }
            if (x !== num.length) { //if x is the indexOf a decimal point
                var y = num.length;
                res += "point ";
                for (var i = x + 1; i < y; i++) { //i will start at x and move along till it reaches the end of n
                    res += this.digits[Number(n[i])] + " "; //find digit in array
                }
            }
            return res;
        }
    }
};

/*
    return false;
*#########
*FUNCTIONS
*#########
*/

function startGame() {
    composeEmails(3);
    composeStupidQues();
    composePWD();
}

function composeEmails(num) {
    document.getElementById("emailsTable").innerHTML += '<tr id="emailNew" class="emails" onclick="emailRead(0)"><td>IMPORTANT: SSS Password Reset</td><td>SSS</td><td>' + theMonth + "/" + theDay + "/" + theShortYear + '</td></tr>';
    for (i = 0; i < num; i++) { //compose emails in relation to number requested
        var chosenEmailNum = Math.randInt(1, (emails.length - 1));
        var chosenEmailStr = num2Word.conv(chosenEmailNum);
        while (Dom.searchStr(usedEmails, chosenEmailStr) !== -1) { //while chosen email has been chosen already then
            chosenEmailNum = Math.randInt(1, (emails.length - 1));
            chosenEmailStr = num2Word.conv(chosenEmailNum);
        }
        usedEmails += chosenEmailStr + ", ";
        document.getElementById("emailsTable").innerHTML += '<tr class="emails" onclick="emailRead(' + (chosenEmailNum) + ')"><td>' + (emails[chosenEmailNum][0]) + '</td><td>' + (emails[chosenEmailNum][1]) + '</td><td>' + (((theDay + (emails[chosenEmailNum][2])) >= 1) ? (theMonth + "/" + (theDay + (emails[chosenEmailNum][2])) + "/" + theShortYear) : ((theMonth - 1) + "/" + (theDay - (emails[chosenEmailNum][2])) + "/" + theShortYear)) + '</td></tr>';
    }
}

function composeStupidQues() {
    var currStupidQues = Math.randInt(0, (stupidQues.length - 1));
    temp_stupid = '<div id="titleBar">SuperSecureSite<sup>TM</sup> Authentication</div><form id="dataBox" onsubmit="testStupid(event);"><p id="prompt">You have forgotten your password.<br>How unfortunate.<br>Please prove that you are a human by answering the following question.</p><fieldset id="theFieldset"><legend id="theLegend">INCORRECT</legend><div id="req">' + stupidQues[currStupidQues][0] + '</div></fieldset><input class="dataEntry" id="stupidAns" type="text" placeholder="a lowercase word" autocomplete="off" autofocus required></form>';
    stupidQuesSol = stupidQues[currStupidQues][1];
}

function composePWD() {
    usedPassPuzz = Math.randInt(0, (passPuzzles.length - 1));
    temp_pwd = '<div id="titleBar">SuperSecureSite<sup>TM</sup> Authentication</div><form id="dataBox" onsubmit="testPWD(event);"><p id="prompt">Further authentication is required.<br>Create a password following the rules below.</p><fieldset id="theFieldset"><legend id="theLegend">INCORRECT</legend><div id="req">' + passPuzzles[usedPassPuzz][0] + '</div></fieldset><br><input id="pwd" class="dataEntry" type="password" placeholder="w0rd5" autofocus autocomplete="off" required></form>';
}

//assumes months are not being counted with zero-based numbering
function month2Month(val) {
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

function testLogin(evt) {
    evt.preventDefault();
    document.getElementById("badLoginFace").style.visibility = "visible";
    document.getElementById("badLogin").style.visibility = "visible";
}

function testStupid(evt) {
    evt.preventDefault();
    var data = document.getElementById("stupidAns").value;
    if (data === stupidQuesSol) {
        startPWD();
    }
    else {
        document.getElementById("theFieldset").style.boxShadow = "0px 0px 10px #a32121";
        document.getElementById("theFieldset").style.borderColor = "#a32121";
        document.getElementById("theLegend").style.visibility = "visible";
    }
}

function testPWD(evt) {
    evt.preventDefault();
    var data = document.getElementById("pwd").value;
    if(pwdParse(data)) {
        startEmail();
    }
    else {
        document.getElementById("theFieldset").style.boxShadow = "0px 0px 10px #a32121";
        document.getElementById("theFieldset").style.borderColor = "#a32121";
        document.getElementById("theLegend").style.visibility = "visible";
    }
}

function pwdParse(data) {
    var t = ""; //used to test what rules data passes or does not pass
    if(passPuzzles[usedPassPuzz][1].match(/lt/g)) {
        var x = data.length;
        var v = passPuzzles[usedPassPuzz][1].match(/lt\d\d/g);
        v = Number(v[0].match(/\d\d/g));
        if (x <= v) {
            t = t + "1";
        }
        else {
            t = t+ "0";
        }
    }
    if (passPuzzles[usedPassPuzz][1].match(/upper/g)) {
        var upArr = (data.match(reUp) || []); //array of uppercase characters in data
        if (upArr.length > 0) {
            t = t + "1";
        }
        else {
            t = t + "0";
        }
    }
    if (passPuzzles[usedPassPuzz][1].match(/lower/g)) {
        var lowArr = (data.match(reLow) || []); //array of lowercase characters in data
        if(lowArr.length > 0) {
            t = t + "1";
        }
        else {
            t = t + "0";
        }
    }
    if (passPuzzles[usedPassPuzz][1].match(/sym/g)) {
        var sArr = (data.match(reSym) || []); //array of symbols in data
        var v = passPuzzles[usedPassPuzz][1].match(/\d\dsym/g);
        v = Number(v[0].match(/\d\d/g));
        if (sArr.length === v) {
            t = t + "1";
        }
        else {
            t = t + "0";
        }
    }
    if (passPuzzles[usedPassPuzz][1].match(/vow/g)) {
        var vArr = (data.match(reVow) || []); //array of vowels in data
        var v = passPuzzles[usedPassPuzz][1].match(/\d\dvow/g);
        v = Number(v[0].match(/\d\d/g));
        if (vArr.length === v) {
            t = t + "1";
        }
        else {
            t = t + "0";
        }
    }
    if (passPuzzles[usedPassPuzz][1].match(/con/g)) {
        var cArr = (data.match(reCon) || []); //array of consonants in data
        var v = passPuzzles[usedPassPuzz][1].match(/\d\dcon/g);
        v = Number(v[0].match(/\d\d/g));
        if (cArr.length === v) {
            t = t + "1";
        }
        else {
            t = t + "0";
        }
    }
    if (passPuzzles[usedPassPuzz][1].match(/sum/g)) {
        var nArr = (data.match(reNum) || []); //array of numbers in data in string form
        nArr.forEach(function toNum(element, index, array) { array[index] = Number(element); }); //changes all strings in nArr to numbers
        var sum = nArr.reduce(function dataSum(previousValue, currentValue) { return previousValue + currentValue; }, 0);
        var v = passPuzzles[usedPassPuzz][1].match(/\d\dsum/g);
        v = Number(v[0].match(/\d\d/g));
        if (sum === v) {
            t = t + "1";
        }
        else t = t + "0";
    }
    if (passPuzzles[usedPassPuzz][1].match(/prod/g)) {
        var nArr = (data.match(reNum) || []); //array of numbers in data in string form
        nArr.forEach(function toNum(element, index, array) { array[index] = Number(element); }); //changes all strings in nArr to numbers
        var prod = (nArr.reduce(function dataProd(previousValue, currentValue) { return previousValue * currentValue; }, 1) === 1) ? 0 : nArr.reduce(function dataProd(previousValue, currentValue) { return previousValue * currentValue; }, 1);
        var v = passPuzzles[usedPassPuzz][1].match(/\d\dprod/g);
        v = Number(v[0].match(/\d\d/g));
        if (prod === v) {
            t = t + "1";
        }
        else {
            t = t + "0";
        }
    }
    //final test to continue gameplay or not
    if (t.indexOf(0) === -1) {
        return true;
    }
    else {
        return false;
    }
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
        Dom.show(emailContOutline);
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
    var temp_email = '<img id="eCount" src="res/img/eCount.png"><span id="emailSys">Gozilla Lightningbird<sup>TM</sup></span><hr><div class="emailContent"><img id="backBtn" onclick="emailBack()" src="res/img/back.png">&nbsp;<span class="emailContentHeader"><b>Subject:</b>&nbsp;' + (emails[num][0]) + '&nbsp;<b>From:</b>&nbsp;' + (emails[num][1]) + '&nbsp;<b>Date:</b>&nbsp;' + (((theDay + (emails[num][2])) >= 1) ? (theMonth + "/" + (theDay + (emails[num][2])) + "/" + theShortYear) : ((theMonth + (emails[num][2])) + "/" + (theDay - (emails[num][2])) + "/" + theShortYear)) + '&nbsp;</span><hr>' + (emails[num][3]) + '</div>';
    if (num === 0) {
        document.getElementById("emailCont").innerHTML = temp_email;
        document.getElementById("eCount").style.width = "0px";
        newMailRead = true;
        document.getElementById("emailSys").style.cursor = "default";
    }
    else {
        if (newMailRead === true) {
            document.getElementById("emailCont").innerHTML = temp_email;
            document.getElementById("eCount").style.width = "0px";
            document.getElementById("emailSys").style.cursor = "default";
        }
        else {
            document.getElementById("emailCont").innerHTML = temp_email;
            document.getElementById("emailSys").style.cursor = "default";
        }
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
    Dom.hide(emailContOutline);
    Dom.hide(dataBox);
    Dom.show(loadIMG);
    setTimeout(function loadExpired() {
        Dom.hide(loadIMG);
        Dom.show(dataBox);
        document.getElementById("mainInterface").innerHTML = temp_expired;
        document.getElementById("prompt").style.padding = "100px 0px 0px 0px";
    },1000);
}

function resetEmail() {
    emailBack();
    document.getElementById("emailContOutline").style.height = "0px";
    document.getElementById("emailCont").style.height = "0px";
    document.getElementById("emailsTable").innerHTML = temp_emailsTable;
}

function resetGame() {
    gozillaClick = false;
    newMailRead = false;
    usedEmails = "";
    stupidQuesSol = "";
    usedPassPuzz = "";
    temp_stupid = '';
    temp_pwd = '';
    document.getElementById("mainInterface").innerHTML = temp_login;
    resetEmail();
    startGame();
}

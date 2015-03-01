/*
*#########
*VARIABLES
*#########
*/

var newMailRead = false;
var theDate = new Date();
var theYear = theDate.getFullYear();
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
var temp_expired = '';
var temp_tempEmails = '';
var temp_email = '<img id="eCount" src="res/img/eCount.png"><span id="emailSys">Gozilla Lightningbird<sup>TM</sup></span><hr>';

/*
*######
*EMAILS
*######
*/
var emails = [
    "<div class='emailContent'><img id='backBtn' onclick='emailBack()' src='res/img/back.png'>&nbsp;<span class='emailContentHeader'><b>Subject:</b> \"IMPORTANT: SSS Password Reset\" <b>From:</b> SSS <b>Date:</b> " + theMonth + "/" + theDay + "</span><hr>Dear userNameHere,<br><br>You are receiving this e-mail because someone (Was it you?) requested a password reset from the IP Address associated with this e-mail in our records.<br>If you did not request a password reset then please visit the closest SSS establishment to you immediatly, your account may be vulnerable.<br><br>If you did request a password resest please click <a id='passResetLink' onclick='startExpired()'>here</a>.</div>",
    "<div class='emailContent'><img id='backBtn' onclick='emailBack()' src='res/img/back.png'>&nbsp;<span class='emailContentHeader'><b>Subject:</b> \"What's Up?\" <b>From:</b> Robbin <b>Date:</b> " + theMonth + "/" + (((theDay - 2) >=1) ? (theDay - 2) : 1) + "</span><hr>Helllooo, anyone in there?<br>I haven't heard from you in a while!<br>What are you up to? Do you not like me anymore or something? I know you're busy with your \"projects\" or whatever, but we havn't hung out in ages! What's up with that?<br>Let's go out somewhere. I don't care where. Let's break something, do something, talk, c'mon, anything! I miss you!<br><br>Call me or something, ASAP, pleaasse?</div>",
    "<div class='emailContent'><img id='backBtn' onclick='emailBack()' src='res/img/back.png'>&nbsp;<span class='emailContentHeader'><b>Subject:</b> \"Your Assistance is Needed\" <b>From:</b> Dr. William Hamford <b>Date:</b> " + theMonth + "/" + (((theDay - 3) >= 1) ? (theDay - 3) : 1) + "</span><hr>Good Day,<br><br>My name is Dr William Hamford, a staff in the Private Clients Section of a well-known bank, here in London, England. One of our accounts, with holding balance of £15,000,000 (Fifteen Million Pounds Sterling) has been dormant and last operated three years ago. From my investigations and confirmation, the owner of the said account, a foreigner by the name of Joe Shmoedja died in "+ month2Month(theMonth) + ", " + (theYear - 3) +" in a plane crash in Bristol.<br><br>Since then, nobody has done anything as regards the claiming of this money, as he has no family member that has any knowledge as to the existence of either the account or the funds; and also Information from the National Immigration also states that he was single on entry into the UK.<br>I have decided to find a reliable foreign partner to deal with. I therefore propose to do business with you, standing in as the next of kin of these funds from the deceased and funds released to you after necessary processes have been followed.<br><br>This transaction is totally free of risk and troubles as the fund is legitimate and does not originate from drug, money laundry, terrorism or any other illegal act.<br>On your interest, let me hear from you URGENTLY.<br><br>Best Regards,<br>Dr William Hamford, Financial Analysis and Remittance Manager</div>",
    "<div class='emailContent'><img id='backBtn' onclick='emailBack()' src='res/img/back.png'>&nbsp;<span class='emailContentHeader'><b>Subject:</b> \"LadyKiller!!!\" <b>From:</b> Matthew <b>Date:</b> " + theMonth + "/" + (((theDay - 1) >= 1) ? (theDay - 1) : 1) + "</span><hr>Hey!<br><br>Have you seen <a href='https://www.youtube.com/watch?v=fEW2pdZ0qEE' target='_blank'>this</a> game? It looks amazing!<br>From what I have read about it it seems like it is not only particularly risqu&eacute;, hehe, but it will be very different from traditional visual novels! You know how in most visual novels wooing a specific chracter is done by doing things specifically for the character? Filling them up with charity like a vending machine till their adoration for you falls out? Well, this game ain't gonna take any of that shit from you. Your manipulation will have consequences.<br><br>Sounds exciting, huh?</div>",
];

/*
*################
*STUPID QUESTIONS
*################
*/
var stupidQuestions = [
    ["What is the book number in which Albus Dumbledore of the Harry Potter series dies?", "6", "six"],
    ["", ""]
];

/*
*################
*PASSWORD PUZZLES
*################
*/
var passPuzzles = [
    "",
    ""
];

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
    //set dates on emails
    //set stupid question
    //set password test
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
    setTimeout("function spoolEmail() {/*1. set eCount to a visible size, 20px 2. spool email upwards/make it visible from being invisible 3. make sure that when gozilla lightningbird is clicked it slides upwards by calling slideUp()*/}", 1000)
}

function slideUp() {

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

}

function resetGame() {

}

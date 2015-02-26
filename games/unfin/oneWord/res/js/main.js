/*
*#########
*TEMPLATES
*#########
*/

var temp_login = '<div id="titleBar">Welcome to SuperSecureSite<sup>TM</sup></div><form id="dataBox" onsubmit="test()"><p id="prompt">sign in to continue</p><br><input id="username" class="dataEntry" type="text" placeholder="username" autocomplete="off" autofocus required><br><br><input id="password" class="dataEntry" type="text" placeholder="password" autocomplete="off" required><br><br><img id="badLoginFace" src="res/img/incorrFace.png" width="50px" draggable="false"><span id="badLogin">incorrect username<br>or password</span><p id="forgotPass" onclick="startStupid()"><u>forgot password?</u></p></form>';
var temp_stupid = '<div id="titleBar">SuperSecureSite<sup>TM</sup> Authentication</div><form id="dataBox" onsubmit="test()"><p id="prompt">You have forgotten your password.<br>How unfortunate.<br>Please prove that you are a human by answering the following question.</p><div id="req"></div><br><br><input class="dataEntry" id="stupidAns" type="text" placeholder="i do not know" autocomplete="off" autofocus required></form>';
var temp_pwd = '<div id="titleBar">SuperSecureSite<sup>TM</sup> Authentication</div><form id="dataBox" onsubmit="test()"><p id="prompt">Further authentication is required.<br>Create a password following the rules below.</p><div id="req"></div><br><br><br><input id="pwd" class="dataEntry" type="text" placeholder="w0rd5" autocomplete="off" required></form>';

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
      { name: "login", from: "booting", to: "stupidQues", action: function readyAction() { Engine.run(); } },
      { name: "pause", from: "playing", to: "paused", action: function pauseAction() { /*pause screen here*/ } },
      { name: "unPause", from: "paused", to: "playing", action: function unPauseAction() { /*remove pause screen here*/ } }
    ]
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
    document.body.innerHTML = temp_stupid;
}

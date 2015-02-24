//REQUIREMENTS FOR GAME
//A finite state machine that points at the current level. The current level will point at an array inside an array. The outer array will ce the container for every level in the game.
//The inner arrays will contain the requirements/questions and the corresponding pattern/answer that needs to be passed.
//Upon sucessful completion of a level the finite state machine ticks over to the next level, passing in the next array's information and pattern.
//Each level will have its pattern passed to a testing function that will attempt to match the pattern to the player's input.

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

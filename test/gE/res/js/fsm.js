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
// provide a way to cancel some states before transition is over?
// a way to resume last state before current state. Example, driving car state in relation to controls. When pausing controls change context. When unpausing state needs to return to driving car state NOT playing state or any other state.

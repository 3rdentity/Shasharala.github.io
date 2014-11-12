var Fsm = {
  init: function fsmInit(obj, cfg) {
    obj.is = cfg.initial || "booting";
    var onEnterState = cfg.onEnterState || function defOnEnterState() { /* default onEnterState here */ };
    for (var i = 0; i < cfg.events.length; i++) {
      obj[cfg.events[i].name] = this.compile(obj, cfg, i, onEnterState);
    }
  },
  compile: function fsmCompile(obj, cfg, i, onEnterState) {
    var func = function fsmEvent() {
      if ((obj.is === cfg.events[i].from) || (Is.array(cfg.events[i].from) && cfg.events[i].from.indexOf(obj.is) >= 0)) {
        obj.is = "trans"; // state is transitioning and cannot be changed while transitioning
        cfg.events[i].action();
        onEnterState();
        setTimeout(function () { obj.is = cfg.events[i].to; }, 1);// promises to detect that events have finished executing? this doesn't seem to be an appropriate fix
      }
    };
    return func;
  }
};
// provide a way to cancel some states before transition is over?
// a way to resume last state before current state. Example, driving car state in relation to controls. When pausing controls change context. When unpausing state needs to return to driving car state NOT playing state or any other state.

var Fsm = {
  init: function fsmInit(obj, cfg) {
    obj.is = cfg.initial || "booting";
    if (cfg.onEnterState) var onEnterState = cfg.onEnterState;
    else var onEnterState = function defOnEnterState() { console.log("defOnEnterState"); };
    for (var i = 0; i < cfg.events.length; i++) {
      obj[cfg.events[i].name] = this.event(obj, cfg, i, onEnterState);
    }
  },
  event: function fsmEvent(obj, cfg, i, onEnterState) {
    var func = function () {
      // ADD TEST FOR ARRAY OF FROM'S
      if (obj.is === cfg.events[i].from) {
        cfg.events[i].action();
        obj.is = cfg.events[i].to;
        onEnterState();
      }
      else {
        console.log("has fallen through");
      }
    };
    return func;
  }
};
  // a way to resume last state before current state. Example, driving car state in relation to controls. When pausing controls change context. When unpausing state needs to return to driving car state NOT playing state or any other state.
  // states can be added anytime? or do I want a list of them at the beggining?
  // states need their own personal list of lists they can transition to
  // states will need to affect the engine? Or the engine will affect itself based around current state, changing state when necessary?
  // states can handle events? Does that sound right? When player unlocks puzzle, state is changed? Or does an event happen (in a pubsub system?) to progress game, leaving state untouched?

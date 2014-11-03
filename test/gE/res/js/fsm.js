var Fsm = {
  init: function fsmInit(obj, cfg) {
    obj.fsm = {
      curr: cfg.initial || "booting",
      list: "function to handle cfg and turn it into an array that this.fsm can use",
      event: "function here to handle transition. Needs to check what this.fsm.curr can transition to."
    };
  }
  // a way to resume last state before current state. Example, driving car state in relation to controls. When pausing controls change context. When unpausing state needs to return to driving car state NOT playing state or any other state.
  // states can be added anytime? or do I want a list of them at the beggining?
  // states need their own personal list of lists they can transition to
  // states will need to affect the engine? Or the engine will affect itself based around current state, changing state when necessary?
  // states can handle events? Does that sound right? When player unlocks puzzle, state is changed? Or does an event happen (in a pubsub system?) to progress game, leaving state untouched?
};

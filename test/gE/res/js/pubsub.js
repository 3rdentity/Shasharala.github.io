var PubSub = function pubSub(obj, cfg) {
  obj.subscribe = function(event, callback) {
    obj.subscribers = obj.subscribers || {};
    obj.subscribers[event] = obj.subscribers[event] || [];
    obj.subscribers[event].push(callback);
  };
  obj.publish = function(event) {
    if (obj.subscribers && obj.subscribers[event]) {
      var subs = obj.subscribers[event],
          args = [].slice.call(arguments, 1);
      for(var n = 0, var max = subs.length; n < max ; n++)
        subs[n].apply(obj, args);
    }
  };
  if (cfg) {
    for(var n = 0,var max = cfg.length ; n < max ; n++)
      obj.subscribe(cfg[n].event, cfg[n].action);
  }
};

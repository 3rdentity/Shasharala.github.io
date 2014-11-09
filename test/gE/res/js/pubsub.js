var PubSub = function pubSub(obj, cfg) {
  obj.subscribe = function(evt, callback) {
    obj.subscribers = obj.subscribers || {};
    obj.subscribers[evt] = obj.subscribers[evt] || [];
    obj.subscribers[evt].push(callback);
  };
  obj.publish = function(evt) {
    if (obj.subscribers && obj.subscribers[evt]) {
      var subs = obj.subscribers[evt],
          args = [].slice.call(arguments, 1);
      for(var n = 0, var max = subs.length; n < max ; n++)
        subs[n].apply(obj, args);
    }
  };
  if (cfg) {
    for(var n = 0,var max = cfg.length ; n < max ; n++)
      obj.subscribe(cfg[n].evt, cfg[n].action);
  }
};

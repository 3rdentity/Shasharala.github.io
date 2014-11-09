var Key = {
  backspace: 8,
  tab: 9,
  return: 13,
  esc: 27,
  space: 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  left: 37, up: 38, right: 39, down: 40,
  insert: 45,
  delete: 46,
  zero: 48, one: 49, two: 50, three: 51, four: 52, five: 53, six: 54, seven: 55, eight: 56, nine: 57,
  a: 65, b: 66, c: 67, d: 68, e: 69, f: 70, g: 71, h: 72, i: 73, j: 74, k: 75, l: 76, m: 77, n: 78, o: 79, p: 80, q: 81, r: 82, s: 83, t: 84, u: 85, v: 86, w: 87, x: 88, y: 89, z: 90,
  tilda: 192,
  map: function keyMap(map, ctx) {
    var onKey = function(evt, mode) {
      for(var i = 0; i < map.length; i++) {
        var k = map[i];
        k.mode = k.mode || "up";
        if(Key.match(k, evt.keyCode, mode, ctx, evt.ctrlKey, evt.shiftKey)) {
          k.action.call(ctx, evt.keyCode, evt.ctrlKey, evt.shiftKey);
          eStop(evt);
        }
      }
    };
    document.on("keydown", function onKeyDown(evt) { return onKey(evt, "down"); });
    document.on("keyup", function onKeyUp(evt) { return onKey(evt, "up"); });
  },
  match: function keyMatch(map, keyCode, mode, ctx, ctrl, shift) {
    if(map.mode === mode) {
      if(!map.state || !ctx || (map.state === ctx.is) || (Is.array(map.state) && map.state.indexOf(ctx.is) >= 0)) {
        if ((map.key === keyCode) || (Is.array(map.key) && (map.key.indexOf(keyCode) >= 0))) {
          if ((Is.invalid(map.ctrl) || (map.ctrl === ctrl)) && (Is.invalid(map.shift) || (map.shift === shift))) {
            return true;
          }
        }
      }
    }
    return false;
  }
};

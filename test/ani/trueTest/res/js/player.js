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
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  insert: 45,
  delete: 46,
  zero: 48, one: 49, two: 50, three: 51, four: 52, five: 53, six: 54, seven: 55, eight: 56, nine: 57,
  a: 65, b: 66, c: 67, d: 68, e: 69, f: 70, g: 71, h: 72, i: 73, j: 74, k: 75, l: 76, m: 77, n: 78, o: 79, p: 80, q: 81, r: 82, s: 83, t: 84, u: 85, v: 86, w: 87, x: 88, y: 89, z: 90,
  tilda: 192
};

var Player = {};

Player.input = {
  left: 0,
  up: 0,
  right: 0,
  down: 0,
};

Player.input.arrowKeys = "0 0 0 0";

Player.onKey = function playerOnKey(evt, key, pressed) {
  switch (key) {
    case Key.left:
      Player.input.left = pressed;
      Player.input.arrowKeys = Player.input.left+ " " + Player.input.up+ " " + Player.input.right+ " " + Player.input.down;
      evt.preventDefault();
      break;
    case Key.up:
      Player.input.up = pressed;
      Player.input.arrowKeys = Player.input.left+ " " + Player.input.up+ " " + Player.input.right+ " " + Player.input.down;
      evt.preventDefault();
      break;
    case Key.right:
      Player.input.right = pressed;
      Player.input.arrowKeys = Player.input.left+ " " + Player.input.up+ " " + Player.input.right+ " " + Player.input.down;
      evt.preventDefault();
      break;
    case Key.down:
      Player.input.down = pressed;
      Player.input.arrowKeys = Player.input.left+ " " + Player.input.up+ " " + Player.input.right+ " " + Player.input.down;
      evt.preventDefault();
  }
};

document.addEventListener("keydown", function onKeyDown(evt) {Player.onKey(evt, evt.keyCode, 1);});
document.addEventListener("keyup", function onKeyUp(evt) {Player.onKey(evt, evt.keyCode, 0);});

window.onblur = function windowOnBlur() {
  console.log("Remember to write a blur event");
}

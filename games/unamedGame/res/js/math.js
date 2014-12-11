Math.rand = function mathRand(min, max) {
  return (min + (this.random() * (max - min)));
};
Math.randInt = function mathRandInt(min, max) {
  return Math.round(this.rand(min, max));
};
Math.randChoice = function mathRandChoice(choices) {
  return choices[this.randInt(0, choices.length - 1)];
};
Math.randBool = function mathRandBool() {
  return this.randChoice([true, false]);
};
Math.limit = function mathLimit(x, min, max) {
  return Math.max(min, Math.min(max, x));
};
Math.between = function mathBetween(n, min, max) {
  return ((n >= min) && (n <= max));
};
Math.accel = function mathAccel(v, accel, dt) {
  return v + (accel * dt);
};
Math.lerp = function mathLerp(n, dn, dt) {
  return n + (dn * dt);
};
// easing functions
Math.easeLerp = function mathEaseLerp(a ,b, percent) {
  return a + (b - a) * percent;
};
Math.easeIn = function mathEaseIn(a, b, percent) {
  return a + (b - a) * Math.pow(percent, 2);
};
Math.easeOut = function mathEaseOut(a, b, percent) {
  return a + (b - a) * (1 - Math.pow(1 - percent, 2));
};
Math.easeInOut = function mathEaseInOut(a,b,percent) {
  return a + (b - a) * ((-Math.cos(percent * Math.PI)/2) + 0.5);
};
Math.collBox = function mathCollBox(x1, y1, w1, h1, x2, y2, w2, h2) {
  return !(((x1 + w1 - 1) < x2) ||
           ((x2 + w2 - 1) < x1) ||
           ((y1 + h1 - 1) < y2) ||
           ((y2 + h2 - 1) < y1));
};

Math.velocity = function mathVelocity(op, v, vM, a, step) {
  if (op === "+") {
    v += a * step;
  }
  else if (op === "-") {
    v -= a * step;
  }
  if (v >= vM) {
    return vM;
  }
  if (v <= 0) {
    return 0;
  }
  return v;
};
Math.randomM = function mathRandomM(min, max) {
  return (min + (Math.random() * (max - min)));
};
Math.randomMInt = function mathRandomMInt(min, max) {
  return Math.round(this.random(min, max));
};
Math.randomChoice = function mathRandomChoice(choices) {
  return choices[this.randomInt(0, choices.length-1)];
};
Math.randomBool = function mathRandomBool() {
  return this.randomChoice([true, false]);
};
Math.limit = function mathLimit(x, min, max) {
  return Math.max(min, Math.min(max, x));
};
Math.between = function mathBetween(n, min, max) {
  return ((n >= min) && (n <= max));
};
Math.accelerate = function mathAccelerate(v, accel, dt) {
  return v + (accel * dt);
};
Math.lerp = function mathLerp(n, dn, dt) {
  return n + (dn * dt);
};
// easing functions
Math.easeLerp = function mathEaseLerp(a,b,percent) {
  return a + (b-a)*percent;
};
Math.easeIn = function mathEaseIn(a,b,percent) {
  return a + (b-a)*Math.pow(percent,2);
};
Math.easeOut = function mathEaseOut(a,b,percent) {
  return a + (b-a)*(1-Math.pow(1-percent,2));
};
Math.easeInOut = function mathEaseInOut(a,b,percent) {
  return a + (b-a)*((-Math.cos(percent*Math.PI)/2) + 0.5);
};
// collision
Math.colBox = function mathColBox(box1, box2) {
  return !((box1.right  < box2.left)   ||
           (box1.left   > box2.right)  ||
           (box1.top    > box2.bottom) ||
           (box1.bottom < box2.top));
};
Math.colLineIntercept = function mathColLineIntercept(x1, y1, x2, y2, x3, y3, x4, y4, d) {
  var denom = ((y4-y3) * (x2-x1)) - ((x4-x3) * (y2-y1));
  if (denom != 0) {
    var ua = (((x4-x3) * (y1-y3)) - ((y4-y3) * (x1-x3))) / denom;
    if ((ua >= 0) && (ua <= 1)) {
      var ub = (((x2-x1) * (y1-y3)) - ((y2-y1) * (x1-x3))) / denom;
      if ((ub >= 0) && (ub <= 1)) {
        var x = x1 + (ua * (x2-x1));
        var y = y1 + (ua * (y2-y1));
        return { x: x, y: y, d: d };
      }
    }
  }
  return null;
};
// circle on circle collision and line to circle collision needed.
//polygon collision??

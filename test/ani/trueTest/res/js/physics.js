var Physics = {
  vel: function physicsVel(op, v, vM, a, step) {
    // calculate
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
  }
};

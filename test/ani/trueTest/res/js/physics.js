var Physics = {
  vel: function physicsVel(op, v, vM, a, dt) {
    // calculate
    if (op === "+") {
      var dv = v + a;
      v = Math.max(0, Math.min(vM, v + (dt * dv)));
    }
    else if (op === "-") {
      var dv = v - 1/6; // friction?
      console.log("dv = " + dv);
      v = Math.max(0, Math.min(vM, v + (dt * dv)));
    }
    console.log("before " + v);
    console.log(v);
    return v;
  }
};

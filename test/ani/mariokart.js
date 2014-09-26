function MarioKart() {
  var P = {
    map1: {
      texture: "map_1.png",
      width: 512,
      height: 512,
      collision: [[84, 80, 52, 216], [68, 276, 20, 56], [136, 188, 208, 60], [344, 208, 64, 40], [368, 248, 40, 160], [368, 4, 140, 76], [4, 436, 236, 72]],
      startposition: {
        x: 476,
        y: 356
      },
      aistartpositions: [{
        x: 476 - 18,
        y: 356 - 18
      }, {
        x: 476,
        y: 356 - 24
      }],
      startrotation: 180,
      aipoints: [[467, 273], [459, 208], [317, 128], [160, 50], [64, 53], [44, 111], [38, 272], [50, 351], [106, 349], [215, 300], [278, 305], [337, 417], [405, 451], [462, 414]]
    },
    map2: {
      texture: "map_2.png",
      width: 512,
      height: 512,
      collision: [[120, 116, 8, 228], [124, 100, 20, 20], [140, 88, 16, 16], [152, 84, 48, 8], [196, 72, 16, 12], [208, 68, 96, 8], [296, 68, 8, 28], [304, 88, 56, 8], [352, 96, 8, 196], [356, 288, 12, 36], [364, 320, 16, 16], [376, 332, 16, 16], [388, 344, 16, 16], [400, 356, 16, 16], [412, 368, 12, 24], [412, 244, 32, 8], [476, 244, 32, 8], [204, 0, 100, 36], [196, 4, 8, 24], [124, 340, 16, 16], [136, 352, 16, 16], [148, 364, 16, 16], [160, 376, 16, 16], [172, 388, 12, 12], [180, 396, 12, 12], [280, 284, 8, 224], [268, 272, 16, 16], [256, 260, 16, 16], [248, 252, 12, 12], [240, 244, 12, 12], [232, 236, 12, 12], [224, 228, 12, 12], [216, 220, 12, 12]],
      startposition: {
        x: 70,
        y: 322
      },
      aistartpositions: [{
        x: 70 - 18,
        y: 322 - 18
      }, {
        x: 70,
        y: 322 - 24
      }],
      startrotation: 180,
      aipoints: [[64, 253], [55, 184], [67, 132], [141, 59], [215, 51], [317, 53], [416, 51], [462, 125], [392, 191], [399, 270], [464, 353], [431, 431], [347, 373], [303, 238], [210, 191], [187, 253], [242, 378], [188, 459], [87, 420]]
    }
  };
  var n = ["map1", "map2"];
  var z = 0;
  var AN = 80;
  var AC = 35;
  var R = 4;
  var U = 2;
  var AA = true;
  var AL = true;

  function l(i) {
    if (B) {
      return
    }
    z = i;
    if (I) {
      r()
    }
  }

  function AG(i) {
    if (B) {
      return
    }
    R = i;
    if (I) {
      r()
    }
  }

  function E(i) {
    if (B) {
      return
    }
    U = i;
    if (I) {
      r()
    }
  }
  var AE;
  var u;
  var N;
  var h = ["mario", "luigi", "peach"];
  var p;
  var y = "";
  var k;
  var A;
  var W;

  function a(i) {
    AE = P[i];
    X(AE)
  }

  function X() {
    W = new Image();
    k = AE.width;
    A = AE.height;
    W.onload = s;
    W.src = AE.texture
  }
  var M = 6;
  var C = 6;
  var x = 0;
  var G = [];
  var I = false;
  var B = false;

  function s() {
    r();
    if (AL) {
      Z()
    }
    var AU = {
      x: AE.startposition.x - 18,
      y: AE.startposition.y - 18,
      speed: 0,
      speedinc: 0,
      rotation: AE.startrotation,
      rotincdir: 0,
      rotinc: 0,
      sprite: new AJ("luigi"),
      cpu: true,
      aipoint: 0
    };
    p = {
      x: AE.startposition.x,
      y: AE.startposition.y,
      speed: 0,
      speedinc: 0,
      rotation: AE.startrotation,
      rotincdir: 0,
      rotinc: 0,
      sprite: new AJ(y),
      cpu: false
    };
    G = [];
    G.push(p);
    var AP = 0;
    for (var AS = 0; AS < h.length; AS++) {
      if (h[AS] != y) {
        var AQ = {
          x: AE.aistartpositions[AP].x,
          y: AE.aistartpositions[AP].y,
          speed: 0,
          speedinc: 0,
          rotation: AE.startrotation,
          rotincdir: 0,
          rotinc: 0,
          sprite: new AJ(h[AS]),
          cpu: true,
          aipoint: 0
        };
        G.push(AQ);
        AP++
      }
    }
    m();
    B = true;
    var AR = document.createElement("div");
    var AW = AR.style;
    AW.position = "absolute";
    AW.width = 12 * R + "px";
    AW.height = 12 * R + "px";
    AW.overflow = "hidden";
    AW.top = 4 * R + "px";
    AW.left = 8 * R + "px";
    var AV = document.createElement("img");
    AV.src = "countdown.png";
    AV.style.position = "absolute";
    AV.style.left = "0px";
    AV.height = 12 * R;
    AR.appendChild(AV);
    F.appendChild(AR);
    var AT = 1;
    AR.scrollLeft = 0;
    var AO = function () {
      AR.scrollLeft = AT * 12 * R;
      AT++;
      if (AT < 4) {
        setTimeout(AO, 1000)
      } else {
        setTimeout(function () {
          F.removeChild(AR);
          B = false
        }, 1000);
        AD();
        I = true
      }
    };
    setTimeout(AO, 1000)
  }
  var H;
  var j = false;

  function Z() {
    j = true;
    H = document.createElement("embed");
    H.src = strMap + ".mid";
    H.setAttribute("loop", "true");
    H.setAttribute("autostart", "true");
    H.style.position = "absolute";
    H.style.left = -1000;
    document.body.appendChild(H)
  }

  function e() {
    if (!j) {
      return
    }
    j = false;
    document.body.removeChild(H)
  }
  var D = 0;
  var g = 0;
  var F = document.createElement("div");
  F.tabindex = 1;
  var Q = F.style;
  Q.position = "absolute";
  Q.border = "2px solid black";
  Q.overflow = "hidden";
  document.body.appendChild(F);
  var S = document.createElement("canvas");
  var K = S.getContext("2d");
  var d = S.style;
  d.position = "absolute";
  F.appendChild(S);
  var Y = document.createElement("div");
  Y.style.position = "absolute";
  F.appendChild(Y);
  var L = [];
  var w = 24;
  var o = 32;
  var J = -10;
  var T = 0;
  var AB = 1 / Math.tan(Math.PI * Math.PI / 360);

  function r() {
    D = R / 4;
    g = 1 / R * U;
    L = [];
    Y.innerHTML = "";
    Q.width = AN * R + "px";
    Q.height = AC * R + "px";
    if (u) {
      F.removeChild(u.div)
    }
    if (N) {
      F.removeChild(N.div)
    }
    S.width = AN / g;
    S.height = AC / g;
    d.width = AN * R + R + "px";
    d.left = -(R / 2) + "px";
    d.top = R + "px";
    d.height = AC * R + "px";
    Y.style.width = AN * R + R + "px";
    Y.style.left = -(R / 2) + "px";
    var AP = 0;
    for (var i = 0; i < AC; i += g) {
      var AQ = i + J;
      var AS = w - AQ;
      var AO = (AQ / (AS / o));
      var AU = AB / (AB + AO);
      var AT = Math.floor(AN / AU);
      if (AU > 0 && AT < AF) {
        if (i == 0) {
          AP = AO - 1
        }
        var AR;
        if (z == 1) {
          var AR = document.createElement("canvas");
          AR.width = AT;
          AR.height = 1;
          var AV = AR.style;
          AV.position = "absolute";
          AV.width = (AN * R) + R + "px";
          AV.height = (R * g) + R * 0.5;
          AV.left = (-R / 2) + "px";
          AV.top = Math.round((AC - i) * R) + "px";
          Y.appendChild(AR)
        }
        L.push({
          canvas: AR || null,
          viewy: i,
          mapz: AO,
          scale: AU,
          stripwidth: AT,
          mapzspan: AO - AP
        });
        AP = AO
      }
    }
    u = new q("hills", 360);
    N = new q("trees", 720)
  }
  var t = 90;
  var AF = 256;
  var v = 10;
  var AK = document.createElement("canvas");
  var b = AK.getContext("2d");
  AK.width = AF;
  AK.height = t;

  function AJ(AP) {
    var AQ = new Image();
    AQ.style.position = "absolute";
    AQ.style.left = "0px";
    AQ.src = "sprite_" + AP + (AA ? "_smooth" : "") + ".png";
    var AO = document.createElement("div");
    AO.style.width = 32;
    AO.style.height = 32;
    AO.style.position = "absolute";
    AO.style.overflow = "hidden";
    AO.style.zIndex = 10000;
    AO.style.display = "none";
    AO.appendChild(AQ);
    F.appendChild(AO);
    var i = 0;
    this.draw = function (AS, AV, AU) {
      var AT = true;
      if (AV > AC * R || AV < 6 * R) {
        AT = false
      }
      if (!AT) {
        AO.style.display = "none";
        return
      }
      AO.style.display = "block";
      var AR = 32 * D * AU;
      AO.style.left = AS - AR / 2;
      AO.style.top = AV - AR / 2;
      AQ.style.height = AR;
      AO.style.width = AR;
      AO.style.height = AR;
      AQ.style.left = -(AR * i) + "px"
    };
    this.setState = function (AR) {
      i = AR
    };
    this.div = AO
  }

  function q(AT, AP) {
    var i = document.createElement("div");
    i.style.height = 10 * R;
    i.style.width = AN * R;
    i.style.position = "absolute";
    i.style.overflow = "hidden";
    var AQ = new Image();
    AQ.height = 20;
    AQ.width = AP;
    AQ.style.position = "absolute";
    AQ.style.left = "0px";
    var AO = new Image();
    AO.height = 20;
    AO.width = AP;
    AO.style.position = "absolute";
    AO.style.left = "0px";
    var AS = document.createElement("canvas");
    AS.width = AP;
    AS.height = 20;
    AQ.onload = function () {
      AS.getContext("2d").drawImage(AQ, 0, 0)
    };
    AQ.src = "bg_" + AT + ".png";
    AS.style.width = Math.round(AP / 2 * R + R) + "px";
    AS.style.height = (10 * R) + "px";
    AS.style.position = "absolute";
    AS.style.left = "0px";
    var AR = document.createElement("canvas");
    AR.width = AP;
    AR.height = 20;
    AO.onload = function () {
      AR.getContext("2d").drawImage(AO, 0, 0)
    };
    AO.src = "bg_" + AT + ".png";
    AR.style.width = Math.round(AP / 2 * R) + "px";
    AR.style.height = (10 * R) + "px";
    AR.style.position = "absolute";
    AR.style.left = Math.round(AP * R) + "px";
    i.appendChild(AS);
    i.appendChild(AR);
    F.appendChild(i);
    return {
      draw: function (AX) {
        var AW = -Math.round(AX);
        while (AW < 0) {
          AW += 360
        }
        while (AW > 360) {
          AW -= 360
        }
        var AV = (AP / 2 * R);
        var AY = AV / 360;
        var AZ = AW * AY;
        var AU = -AZ;
        var Aa = -AZ + AV;
        AS.style.left = Math.round(AU);
        AR.style.left = Math.round(Aa)
      },
      div: i
    }
  }

  function m() {
    AK.width = AK.width;
    b.fillStyle = "green";
    b.fillRect(0, 0, AK.width, AK.height);
    b.save();
    b.translate(AF / 2, t - v);
    b.rotate((180 + p.rotation) * Math.PI / 180);
    b.drawImage(W, -p.x, -p.y);
    b.restore();
    S.width = S.width;
    K.fillStyle = "green";
    for (var Aa = 0; Aa < L.length; Aa++) {
      var AU = L[Aa];
      if (z == 0) {
        try {
          K.drawImage(AK, AF / 2 - (AU.stripwidth / 2), ((t - v) - AU.mapz) - 1, AU.stripwidth, AU.mapzspan, 0, (AC - AU.viewy) / g, AN / g, 1)
        } catch (Ae) {}
      }
      if (z == 1) {
        var AQ = Math.max(3, AU.mapzspan);
        AU.canvas.height = AQ;
        AU.canvas.getContext("2d").clearRect(0, 0, AU.stripwidth, 1);
        try {
          AU.canvas.getContext("2d").drawImage(AK, AF / 2 - (AU.stripwidth / 2), ((t - v) - AU.mapz) - 1, AU.stripwidth, AU.mapzspan, 0, 0, AU.stripwidth, AQ)
        } catch (Ae) {}
      }
    }
    var Af = (AN / 2) * R;
    var Ad = (AC - v) * R;
    for (var Aa = 0; Aa < G.length; Aa++) {
      var AY = G[Aa];
      if (AY.cpu) {
        var Ac = -(p.x - AY.x);
        var Ab = -(p.y - AY.y);
        var AR = p.rotation * Math.PI / 180;
        var AT = Ac * Math.cos(AR) - Ab * Math.sin(AR);
        var AS = Ac * Math.sin(AR) + Ab * Math.cos(AR);
        var AW = -w;
        var AX = o + AS;
        var AO = ((AW / AX) * o + w) - J;
        var AZ = -(AT / (AS + o)) * o;
        var AV = p.rotation - AY.rotation;
        while (AV < 0) {
          AV += 360
        }
        while (AV > 360) {
          AV -= 360
        }
        var AP = Math.round(AV / (360 / 22));
        if (AP == 22) {
          AP = 0
        }
        AY.sprite.setState(AP);
        AY.sprite.div.style.zIndex = Math.round(10000 - AS);
        AY.sprite.draw(((AN / 2) + AZ) * R, (AC - AO) * R, AB / (AB + (AS)))
      }
    }
    p.sprite.div.style.zIndex = 10000;
    p.sprite.draw(Af, Ad, 1);
    u.draw(p.rotation);
    N.draw(p.rotation)
  }

  function f(AO, AR) {
    if (AO > k - 5 || AR > A - 5) {
      return false
    }
    if (AO < 4 || AR < 4) {
      return false
    }
    for (var AP = 0; AP < AE.collision.length; AP++) {
      var AQ = AE.collision[AP];
      if (AO > AQ[0] && AO < AQ[0] + AQ[2]) {
        if (AR > AQ[1] && AR < AQ[1] + AQ[3]) {
          return false
        }
      }
    }
    return true
  }

  function V(AS) {
    if (AS.rotincdir) {
      AS.rotinc += 2 * AS.rotincdir
    } else {
      if (AS.rotinc < 0) {
        AS.rotinc = Math.min(0, AS.rotinc + 1)
      }
      if (AS.rotinc > 0) {
        AS.rotinc = Math.max(0, AS.rotinc - 1)
      }
    }
    AS.rotinc = Math.min(AS.rotinc, C);
    AS.rotinc = Math.max(AS.rotinc, -C);
    if (AS.speed) {
      AS.rotation += (AS.speedinc < 0 || (AS.speedinc == 0 && AS.speed < 0)) ? -AS.rotinc : AS.rotinc
    }
    if (AS.rotation < 0) {
      AS.rotation += 360
    }
    if (AS.rotation > 360) {
      AS.rotation -= 360
    }
    if (!AS.cpu) {
      if (AS.rotincdir == 0) {
        AS.sprite.setState(0)
      } else {
        if (AS.rotincdir < 0) {
          if (AS.rotinc == -C && x > 0 && (new Date().getTime() - x) > 800) {
            AS.sprite.setState(26)
          } else {
            AS.sprite.setState(24)
          }
        } else {
          if (AS.rotinc == C && x > 0 && (new Date().getTime() - x) > 800) {
            AS.sprite.setState(27)
          } else {
            AS.sprite.setState(25)
          }
        }
      } if (Math.abs(AS.rotinc) != C) {
        x = 0
      } else {
        if (x == 0) {
          x = new Date().getTime()
        }
      }
    }
    AS.speed += AS.speedinc;
    var AQ = M;
    if (AS.cpu) {
      AQ *= 0.95
    }
    if (AS.speed > AQ) {
      AS.speed = AQ
    }
    if (AS.speed < -AQ / 4) {
      AS.speed = -AQ / 4
    }
    var AO = AS.speed * Math.sin(AS.rotation * Math.PI / 180);
    var AR = AS.speed * Math.cos(AS.rotation * Math.PI / 180);
    var AP = AS.x + AO;
    var i = AS.y + AR;
    if (f(Math.round(AP), Math.round(i))) {
      AS.x = AP;
      AS.y = i
    } else {
      AS.speed *= -1
    }
    AS.speed *= 0.9
  }

  function O(AT) {
    var AO = AE.aipoints[AT.aipoint];
    if (!AT.aipointx) {
      AT.aipointx = AO[0]
    }
    if (!AT.aipointy) {
      AT.aipointy = AO[1]
    }
    var i = AT.aipointx - AT.x;
    var AS = AT.aipointy - AT.y;
    iRotatedX = i * Math.cos(AT.rotation * Math.PI / 180) - AS * Math.sin(AT.rotation * Math.PI / 180);
    iRotatedY = i * Math.sin(AT.rotation * Math.PI / 180) + AS * Math.cos(AT.rotation * Math.PI / 180);
    var AQ = Math.atan2(iRotatedX, iRotatedY) / Math.PI * 180;
    if (Math.abs(AQ) > 10) {
      if (AT.speed == M) {
        AT.speedinc = -0.5
      }
      AT.rotincdir = AQ > 0 ? 1 : -1
    } else {
      AT.rotincdir = 0
    }
    AT.speedinc = 1;
    var AP = Math.sqrt(i * i + AS * AS);
    if (AP < 40) {
      AT.aipoint++;
      if (AT.aipoint >= AE.aipoints.length) {
        AT.aipoint = 0
      }
      var AR = AE.aipoints[AT.aipoint];
      AT.aipointx = AR[0] + (Math.random() - 0.5) * 10;
      AT.aipointy = AR[1] + (Math.random() - 0.5) * 10
    }
  }

  function AD() {
    for (var AO = 0; AO < G.length; AO++) {
      if (G[AO].cpu) {
        O(G[AO])
      }
      V(G[AO])
    }
    setTimeout(AD, 1000 / 15);
    m()
  }
  document.onkeydown = function (i) {
    if (!I) {
      return
    }
    switch (i.keyCode) {
    case 38:
      p.speedinc = 1;
      break;
    case 37:
      p.rotincdir = 1;
      break;
    case 39:
      p.rotincdir = -1;
      break;
    case 40:
      p.speedinc -= 0.2;
      break
    }
  };
  document.onkeyup = function (i) {
    if (!I) {
      return
    }
    switch (i.keyCode) {
    case 38:
      p.speedinc = 0;
      break;
    case 37:
      p.rotincdir = 0;
      break;
    case 39:
      p.rotincdir = 0;
      break;
    case 40:
      p.speedinc = 0;
      break
    }
  };

  function AM() {
    var AP = document.createElement("div");
    var AO = AP.style;
    AO.width = AN * R + "px";
    AO.height = AC * R + "px";
    AO.border = "1px solid black";
    AO.backgroundColor = "black";
    var AR = document.createElement("img");
    AR.src = "title.png";
    AR.style.position = "absolute";
    AR.style.width = (39 * R) + "px";
    AR.style.height = (13 * R) + "px";
    AR.style.left = (AN - 39) / 2 * R + "px";
    AR.style.top = 2 * R + "px";
    AP.appendChild(AR);
    Q.width = AN * R + "px";
    Q.height = AC * R + "px";
    F.appendChild(AP);
    for (var AQ = 0; AQ < h.length; AQ++) {
      var AS = document.createElement("img");
      AS.src = "select_" + h[AQ] + ".png";
      AS.style.width = 12 * R + "px";
      AS.style.height = 12 * R + "px";
      AS.style.position = "absolute";
      AS.style.left = ((AN - 12 * h.length) / 2 + AQ * 12) * R + "px";
      AS.style.top = 18 * R + "px";
      AS.player = h[AQ];
      AS.onclick = function () {
        y = this.player;
        AP.innerHTML = "";
        F.removeChild(AP);
        AH()
      };
      AP.appendChild(AS)
    }
  }

  function AH() {
    var AP = document.createElement("div");
    var AO = AP.style;
    AO.width = AN * R + "px";
    AO.height = AC * R + "px";
    AO.border = "1px solid black";
    AO.backgroundColor = "black";
    Q.width = AN * R + "px";
    Q.height = AC * R + "px";
    F.appendChild(AP);
    var AR = document.createElement("img");
    AR.src = "mushroomcup.png";
    AR.style.position = "absolute";
    AR.style.width = (36 * R) + "px";
    AR.style.height = (6 * R) + "px";
    AR.style.left = (AN - 36) / 2 * R + "px";
    AR.style.top = 6 * R + "px";
    AP.appendChild(AR);
    for (var AQ = 0; AQ < n.length; AQ++) {
      var AS = document.createElement("img");
      AS.src = "select_" + n[AQ] + ".png";
      AS.style.width = 30 * R + "px";
      AS.style.height = 12 * R + "px";
      AS.style.position = "absolute";
      AS.style.left = ((AN - 30 * n.length) / 2 + AQ * 30 + AQ) * R + "px";
      AS.style.top = (14) * R + "px";
      AS.map = n[AQ];
      AS.onclick = function () {
        strMap = this.map;
        AP.innerHTML = "";
        F.removeChild(AP);
        a(strMap)
      };
      AP.appendChild(AS)
    }
  }
  for (var AI = 0; AI < h.length; AI++) {
    var c = new Image();
    c.src = "sprite_" + h[AI] + "_smooth.png"
  }
  AM();
  window.MarioKartControl = {
    setRenderMode: function (i) {
      l(i)
    },
    setQuality: function (i) {
      E(i)
    },
    setScreenScale: function (i) {
      AG(i)
    },
    setMusic: function (i) {
      AL = !!i;
      if (AL && !j && I) {
        Z()
      }
      if (!AL && j) {
        e()
      }
    }
  }
}
window.onload = MarioKart;

/*
*#####
*COLOR
*#####
*/
var Color = {
    hex2RGB: function hex2RGB(h) {
        h = h.toString();
        var r = hex2R(h);
        var g = hex2G(h);
        var b = hex2B(h);
        return r + ", " + g + ", " + b;
        function hex2R(h) {
            return parseInt(cutSym(h).substring(0,2),16);
        }
        function hex2G(h) {
            return parseInt(cutSym(h).substring(2,4),16)
        }
        function hex2B(h) {
            return parseInt(cutSym(h).substring(4,6),16)
        }
        function cutSym(h) {
            return (h.charAt(0) == "#") ? h.substring(1,7) : h;
        }
    },
    rgb2Hex: function rgb2Hex(r, g, b, h) {
        if (h) {
            return "#" + toHex(r) + toHex(g) + toHex(b);
        }
        else {
            return toHex(r) + toHex(g) + toHex(b);
        }
        function toHex(n) {
         n = n.toString(16);
        }
    }
};
/*
*#####
*MATH#
*#####
*/
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
Math.countdown = function mathCountdown(n, dn) {
  return Math.max(0, n - (dn || 1));
};
Math.dist = function mathDist(p1, p2) {
  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
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
//collision functions
Math.collBox = function mathCollBox(x1, y1, w1, h1, x2, y2, w2, h2) {
  return !(((x1 + w1 - 1) < x2) ||
           ((x2 + w2 - 1) < x1) ||
           ((y1 + h1 - 1) < y2) ||
           ((y2 + h2 - 1) < y1));
};
var Matrix = function matrix() {
    //default values
    var canvas = document.getElementById("matrix") || null;
    var width = null;
    var height = null;
    var spacing = 42;
    var numLines = 168;
    var lineColor = Color.hex2RGB("325d5f");
    var lineWidth = 1;
    var animate = true;
    var increase = true;
    this.canvas = function matrixCanvas(c) {
        canvas = document.getElementById(c);
        return this;
    };
    this.size = function matrixSize(w, h) {
        width = w;
        height = h;
        return this;
    };
    this.line = function matrixLine(size, color) {
        lineWidth = size || lineWidth; //mind that a function works best here
        lineColor = color || lineColor; //requires rgba
        return this;
    };
    this.start = function matrixStart() {
        //these variables are declared here so they are not set before modifiers are set
        canvas.width = width || 1920;
        canvas.height = height || 1080;
        var ctx = canvas.getContext("2d");
        addListeners();
        animation();
        function addListeners() {
            window.addEventListener("resize", resize);
        }
        function resize() {
            if (width) {
            }
            else {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        }
        function animation() {
            function run() {
                if (animate) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    updateLines();
                    drawLines();
                    requestAnimationFrame(run);
                }
            };
            requestAnimationFrame(run);
        }
        function updateLines() {
            if (increase) {
                if (lineWidth === 120) {
                    increase = false;
                }
                lineWidth += 0.5;
            }
            else {
                if (lineWidth === 1) {
                    increase = true;
                }
                lineWidth -= 0.5;
            }
        }
        function drawLines() {
            // draw vertical lines
            for (var i = 0; i < canvas.width; i += spacing + canvas.width / numLines) {
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = "rgba(" + lineColor + ", 0.4";
                ctx.stroke();
                ctx.closePath();
                ctx.restore();
            }
            // draw horizontal lines
            for (var i = 0; i < canvas.height; i += spacing + canvas.height / numLines) {
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(canvas.width, i);
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = "rgba(" + lineColor + ", 0.4";
                ctx.stroke();
                ctx.closePath();
                ctx.restore();
            }
        }
        return this;
    };
};

/*
 *######
 *MATRIX
 *######
 */
//relies on tween.js
// tween.js - http://github.com/sole/tween.js - Licensed under the MIT License
'use strict';void 0===Date.now&&(Date.now=function(){return(new Date).valueOf()});
var TWEEN=TWEEN||function(){var a=[];return{REVISION:"14",getAll:function(){return a},removeAll:function(){a=[]},add:function(c){a.push(c)},remove:function(c){c=a.indexOf(c);-1!==c&&a.splice(c,1)},update:function(c){if(0===a.length)return!1;for(var b=0,c=void 0!==c?c:"undefined"!==typeof window&&void 0!==window.performance&&void 0!==window.performance.now?window.performance.now():Date.now();b<a.length;)a[b].update(c)?b++:a.splice(b,1);return!0}}}();
TWEEN.Tween=function(a){var c={},b={},d={},e=1E3,g=0,h=!1,j=!1,q=0,m=null,w=TWEEN.Easing.Linear.None,x=TWEEN.Interpolation.Linear,n=[],r=null,s=!1,t=null,u=null,k=null,v;for(v in a)c[v]=parseFloat(a[v],10);this.to=function(a,c){void 0!==c&&(e=c);b=a;return this};this.start=function(e){TWEEN.add(this);j=!0;s=!1;m=void 0!==e?e:"undefined"!==typeof window&&void 0!==window.performance&&void 0!==window.performance.now?window.performance.now():Date.now();m+=q;for(var f in b){if(b[f]instanceof Array){if(0===
b[f].length)continue;b[f]=[a[f]].concat(b[f])}c[f]=a[f];!1===c[f]instanceof Array&&(c[f]*=1);d[f]=c[f]||0}return this};this.stop=function(){if(!j)return this;TWEEN.remove(this);j=!1;null!==k&&k.call(a);this.stopChainedTweens();return this};this.stopChainedTweens=function(){for(var a=0,b=n.length;a<b;a++)n[a].stop()};this.delay=function(a){q=a;return this};this.repeat=function(a){g=a;return this};this.yoyo=function(a){h=a;return this};this.easing=function(a){w=a;return this};this.interpolation=function(a){x=
a;return this};this.chain=function(){n=arguments;return this};this.onStart=function(a){r=a;return this};this.onUpdate=function(a){t=a;return this};this.onComplete=function(a){u=a;return this};this.onStop=function(a){k=a;return this};this.update=function(p){var f;if(p<m)return!0;!1===s&&(null!==r&&r.call(a),s=!0);var i=(p-m)/e,i=1<i?1:i,j=w(i);for(f in b){var k=c[f]||0,l=b[f];l instanceof Array?a[f]=x(l,j):("string"===typeof l&&(l=k+parseFloat(l,10)),"number"===typeof l&&(a[f]=k+(l-k)*j))}null!==t&&
t.call(a,j);if(1==i)if(0<g){isFinite(g)&&g--;for(f in d)"string"===typeof b[f]&&(d[f]+=parseFloat(b[f],10)),h&&(i=d[f],d[f]=b[f],b[f]=i),c[f]=d[f];m=p+q}else{null!==u&&u.call(a);f=0;for(i=n.length;f<i;f++)n[f].start(p);return!1}return!0}};
TWEEN.Easing={Linear:{None:function(a){return a}},Quadratic:{In:function(a){return a*a},Out:function(a){return a*(2-a)},InOut:function(a){return 1>(a*=2)?0.5*a*a:-0.5*(--a*(a-2)-1)}},Cubic:{In:function(a){return a*a*a},Out:function(a){return--a*a*a+1},InOut:function(a){return 1>(a*=2)?0.5*a*a*a:0.5*((a-=2)*a*a+2)}},Quartic:{In:function(a){return a*a*a*a},Out:function(a){return 1- --a*a*a*a},InOut:function(a){return 1>(a*=2)?0.5*a*a*a*a:-0.5*((a-=2)*a*a*a-2)}},Quintic:{In:function(a){return a*a*a*
a*a},Out:function(a){return--a*a*a*a*a+1},InOut:function(a){return 1>(a*=2)?0.5*a*a*a*a*a:0.5*((a-=2)*a*a*a*a+2)}},Sinusoidal:{In:function(a){return 1-Math.cos(a*Math.PI/2)},Out:function(a){return Math.sin(a*Math.PI/2)},InOut:function(a){return 0.5*(1-Math.cos(Math.PI*a))}},Exponential:{In:function(a){return 0===a?0:Math.pow(1024,a-1)},Out:function(a){return 1===a?1:1-Math.pow(2,-10*a)},InOut:function(a){return 0===a?0:1===a?1:1>(a*=2)?0.5*Math.pow(1024,a-1):0.5*(-Math.pow(2,-10*(a-1))+2)}},Circular:{In:function(a){return 1-
Math.sqrt(1-a*a)},Out:function(a){return Math.sqrt(1- --a*a)},InOut:function(a){return 1>(a*=2)?-0.5*(Math.sqrt(1-a*a)-1):0.5*(Math.sqrt(1-(a-=2)*a)+1)}},Elastic:{In:function(a){var c,b=0.1;if(0===a)return 0;if(1===a)return 1;!b||1>b?(b=1,c=0.1):c=0.4*Math.asin(1/b)/(2*Math.PI);return-(b*Math.pow(2,10*(a-=1))*Math.sin((a-c)*2*Math.PI/0.4))},Out:function(a){var c,b=0.1;if(0===a)return 0;if(1===a)return 1;!b||1>b?(b=1,c=0.1):c=0.4*Math.asin(1/b)/(2*Math.PI);return b*Math.pow(2,-10*a)*Math.sin((a-c)*
2*Math.PI/0.4)+1},InOut:function(a){var c,b=0.1;if(0===a)return 0;if(1===a)return 1;!b||1>b?(b=1,c=0.1):c=0.4*Math.asin(1/b)/(2*Math.PI);return 1>(a*=2)?-0.5*b*Math.pow(2,10*(a-=1))*Math.sin((a-c)*2*Math.PI/0.4):0.5*b*Math.pow(2,-10*(a-=1))*Math.sin((a-c)*2*Math.PI/0.4)+1}},Back:{In:function(a){return a*a*(2.70158*a-1.70158)},Out:function(a){return--a*a*(2.70158*a+1.70158)+1},InOut:function(a){return 1>(a*=2)?0.5*a*a*(3.5949095*a-2.5949095):0.5*((a-=2)*a*(3.5949095*a+2.5949095)+2)}},Bounce:{In:function(a){return 1-
TWEEN.Easing.Bounce.Out(1-a)},Out:function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+0.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375},InOut:function(a){return 0.5>a?0.5*TWEEN.Easing.Bounce.In(2*a):0.5*TWEEN.Easing.Bounce.Out(2*a-1)+0.5}}};
TWEEN.Interpolation={Linear:function(a,c){var b=a.length-1,d=b*c,e=Math.floor(d),g=TWEEN.Interpolation.Utils.Linear;return 0>c?g(a[0],a[1],d):1<c?g(a[b],a[b-1],b-d):g(a[e],a[e+1>b?b:e+1],d-e)},Bezier:function(a,c){var b=0,d=a.length-1,e=Math.pow,g=TWEEN.Interpolation.Utils.Bernstein,h;for(h=0;h<=d;h++)b+=e(1-c,d-h)*e(c,h)*a[h]*g(d,h);return b},CatmullRom:function(a,c){var b=a.length-1,d=b*c,e=Math.floor(d),g=TWEEN.Interpolation.Utils.CatmullRom;return a[0]===a[b]?(0>c&&(e=Math.floor(d=b*(1+c))),g(a[(e-
1+b)%b],a[e],a[(e+1)%b],a[(e+2)%b],d-e)):0>c?a[0]-(g(a[0],a[0],a[1],a[1],-d)-a[0]):1<c?a[b]-(g(a[b],a[b],a[b-1],a[b-1],d-b)-a[b]):g(a[e?e-1:0],a[e],a[b<e+1?b:e+1],a[b<e+2?b:e+2],d-e)},Utils:{Linear:function(a,c,b){return(c-a)*b+a},Bernstein:function(a,c){var b=TWEEN.Interpolation.Utils.Factorial;return b(a)/b(c)/b(a-c)},Factorial:function(){var a=[1];return function(c){var b=1,d;if(a[c])return a[c];for(d=c;1<d;d--)b*=d;return a[c]=b}}(),CatmullRom:function(a,c,b,d,e){var a=0.5*(b-a),d=0.5*(d-c),g=
e*e;return(2*c-2*b+a+d)*e*g+(-3*c+3*b-2*a-d)*g+a*e+c}}};
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
    rgb2Hex: function rgb2Hex(r, g, b, n) {
        if (n) {
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
//borrowed from math.js. www.shasharala.net/goldSrc/math.js
Math.dist = function mathDist(p1, p2) {
  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
};
var Matrix = function matrix() {
    //default values
    var canvas = document.getElementById("matrix") || null;
    var width = null;
    var height = null;
    var spacing = 69;
    var nClosest = 4;
    var lineColor = Color.hex2RGB("FFFFFF");"rgba(255, 255, 255, 0)";
    var lineWidth = 1;
    var pType = "circle";
    var pColor = Color.hex2RGB("FFFFFF");
    var pRad = [
        function pRadCalc() {
            return (2 + Math.random() * 2);
        },
        function pRad2Calc() {
            return (4 + Math.random() * 4);
        }
    ];
    var activesArr = [[4000, 0.3, 0.6], [20000, 0.1, 0.3], [40000, 0.02, 0.1], [0, 0]];
    var points = [];
    var animate = true;
    this.canvas = function matrixCanvas(c) {
        canvas = document.getElementById(c);
        return this;
    };
    this.size = function matrixSize(w, h) {
        width = w;
        height = h;
        return this;
    };
    this.point = function matrixPoint(shape, size, size2, color) {
        pType = shape || "circle";
        pRad[0] = size || pRad[0]; //mind that a function works best here
        pRad[1] = size2 || pRad[1];
        pColor = Color.hex2RGB(color) || pColor;
        return this;
    };
    this.line = function matrixLine(size, color) {
        lineWidth = size || lineWidth; //mind that a function works best here
        lineColor = color || lineColor; //requires rgba
        return this;
    };
    //accepts a multidimensional array of length four and variables three, except the last array which accepts variables two
    //such as: [[4000, 0.3, 0.6], [20000, 0.1, 0.3], [40000, 0.02, 0.1], [0, 0]]
    this.actives = function matrixActives(a) {
        activesArr = a;
        return this;
    };
    this.tween = function matrixTween(/*tweenHere*/) {
        //setTween will set a variable that is set here
        return this;
    };
    this.grid = function matrixGrid(s, n, p) {
        spacing = s || spacing;
        nClosest = n || nClosest;
        //plotting of points = p function
        return this;
    };
    this.start = function matrixStart() {
        //these variables are declared here so they are not set before modifiers are set
        canvas.width = width || 1920;
        canvas.height = height || 1080;
        var ctx = canvas.getContext("2d");
        var target = {
            x: canvas.width / 2,
            y: canvas.height / 3
        };
        //plot points across the largest canvas possible so if resizing happens we have more points to display
        for (var x = 0; x < canvas.width; x = x + canvas.width / spacing) {
            for (var y = 0; y < canvas.height; y = y + canvas.height / spacing) {
                var pX = x + Math.random() * canvas.width / spacing;
                var pY = y + Math.random() * canvas.height / spacing;
                var p = {
                    x: pX,
                    originX: pX,
                    y: pY,
                    originY: pY
                };
                points.push(p);
            }
        }
        //for each point find the closest points
        for (var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for (var j = 0; j < points.length; j++) {
                var p2 = points[j];
                if (!(p1 == p2)) {
                    var placed = false;
                    for (var k = 0; k < nClosest; k++) {
                        if (!placed) {
                            if (closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                    for (var l = 0; l < nClosest; l++) {
                        if (!placed) {
                            if (Math.dist(p1, p2) < Math.dist(p1, closest[l])) {
                                closest[l] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }
        // assign a circle to each point
        for (var i in points) {
            if (pType === "star") {
                points[i].type = new star(points[i], null)
            }
            else {
                points[i].type = new circle(points[i], pRad[0]() || pRad[0]);
            }
        }
        addListeners();
        animation();
        function addListeners() {
            window.addEventListener("mousemove", mouseMove);
            window.addEventListener("scroll", scrollCheck);
            window.addEventListener("resize", resize);
        }
        //if using more than one matrix this may need to be modified to handle mouseOver's seperately
        function mouseMove(e) {
            target.x = e.pageX || (e.client + document.body.scrollLeft + document.documentElement.scrollLeft);
            target.y = e.pageY || (e.client + document.body.scrollTop + document.documentElement.scrollTop);
        }
        function scrollCheck() {
            if (document.body.scrollTop > canvas.height) {
                animate = false;
            }
            else {
                animate = true;
            }
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
            for (var i in points) {
                setTween(points[i]);
            }
            function run() {
                if (animate) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    for (var i in points) {
                        // detect points in range
                        if (Math.abs(Math.dist(target, points[i])) < activesArr[0][0]) {
                            points[i].active = activesArr[0][1];
                            points[i].type.active = activesArr[0][2];
                        }
                        else {
                            if (Math.abs(Math.dist(target, points[i])) < activesArr[1][0]) {
                                points[i].active = activesArr[1][1];
                                points[i].type.active = activesArr[1][2];
                            }
                            else {
                                if (Math.abs(Math.dist(target, points[i])) < activesArr[2][0]) {
                                    points[i].active = activesArr[2][1];
                                    points[i].type.active = activesArr[2][2];
                                }
                                else {
                                    points[i].active = activesArr[3][0];
                                    points[i].type.active = activesArr[3][1];
                                }
                            }
                        }
                        drawLines(points[i]);
                        points[i].type.draw();
                    }
                    TWEEN.update(); //needs to update only tweens from this object
                    requestAnimationFrame(run);
                }
            };
            requestAnimationFrame(run);
        }
        //make this modifiable somehow
        function setTween(p) {
            p.tween = new TWEEN.Tween(p)
            .to({
                x: p.originX - 50 + Math.random() * 100,
                y: p.originY - 50 + Math.random() * 100
            }, 2 * Math.random() * 2000)
            //.easing(TWEEN.Easing.Elastic.InOut)
            .onComplete(function repeatSetTween() {
                setTween(p);
            })
            .start();
        }
        function drawLines(p) {
            if (!p.active) {
                return;
            }
            for (var i in p.closest) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.closest[i].x, p.closest[i].y);
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = "rgba(" + lineColor + ", " + p.active + ")";
                ctx.stroke();
            }
        }
        function circle(pos, rad) {
            var that = this;
            this.pos = pos || null;
            this.rad = rad || null;
            this.draw = function webCircleDraw() {
                if (!this.active) {
                    return;
                }
                ctx.beginPath();
                ctx.arc(that.pos.x, that.pos.y, that.rad, 0, 2 * Math.PI, false);
                ctx.fillStyle = "rgba(" + pColor + ", " + this.active + ")";
                ctx.fill();
            };
        }
        function star(pos, rad, rad2, p) {
            var that = this;
            this.pos = pos || null;
            this.rad = rad || null;
            this.rad2 = rad2 || null;
            this.points = p || null;
            this.draw = function webStarDraw() {
                if (!this.active) {
                    return;
                }
                //star function here
            };
        }
        return this;
    };
    //this actually breaks everything currently
    this.stop = function matrixStop() {
        animate = false;
    }
};

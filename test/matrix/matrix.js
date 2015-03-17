/*
 *######
 *MATRIX
 *######
 */
var Matrix = function matrix(c, w, h, s, n, r) {
    var canvas = document.getElementById(c) || document.getElementById("matrix");
    canvas.width = w || window.innerWidth;
    canvas.height = h || window.innerHeight;
    var spacing = s || 20;
    var nClosest = n || 5;
    var rad = r || function radCalc() {
        return (2 + Math.random() * 2);
    };
    var ctx = canvas.getContext("2d");
    var points = [];
    var target = {
        x: canvas.width / 2,
        y: canvas.height / 3
    };
    var animate = true;
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
        //circleColor needs a modifiable variable
        points[i].circle = new circle(points[i], rad(), "rgba(255,255,255,0.3)");;
    }
    addListeners();
    animation();
    function addListeners() {
        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("scroll", scrollCheck);
        window.addEventListener("resize", resize);
    }
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
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
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
                    if (Math.abs(getDistance(target, points[i])) < 4000) {
                        points[i].active = 0.3;
                        points[i].circle.active = 0.6;
                    } else if (Math.abs(getDistance(target, points[i])) < 20000) {
                        points[i].active = 0.1;
                        points[i].circle.active = 0.3;
                    } else if (Math.abs(getDistance(target, points[i])) < 40000) {
                        points[i].active = 0.02;
                        points[i].circle.active = 0.1;
                    } else {
                        points[i].active = 0.1;
                        points[i].circle.active = 0.1;
                    }
                    drawLines(points[i]);
                    points[i].circle.draw();
                }
                TWEEN.update();
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
            ctx.strokeStyle = "rgba(255, 255, 255, 0)";
            ctx.stroke();
        }
    }
    function circle(pos, rad, color) {
        var that = this;
        this.pos = pos || null;
        this.rad = rad || null;
        this.color = color || null;
        this.draw = function webCircleDraw() {
            if (!this.active) {
                return;
            }
            ctx.beginPath();
            ctx.arc(that.pos.x, that.pos.y, that.rad, 0, 2 * Math.PI, false);
            ctx.fillStyle = "rgba(255, 255, 255," + this.active + ")";
            ctx.fill();
        };
    }
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
};



Math.dist = function mathDist(p1, p2) {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
};

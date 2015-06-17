//incomplete
/*
*######
*SHAPE#
*######
*/
var Shape = {
    circle: function circle(pos, rad) {
        var that = this;
        this.pos = pos || null;
        this.rad = rad || null;
        this.draw = function shapeCircleDraw() {
            if (!this.active) {
                return;
            }
            ctx.save();
            ctx.beginPath();
            ctx.arc(that.pos.x, that.pos.y, that.rad, 0, 2 * Math.PI, false);
            ctx.fillStyle = "rgba(" + pColor + ", " + this.active + ")";
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        };
    },
    heart: function heart(pos, rad) {
        var that = this;
        this.pos = pos || null;
        this.rad = rad || null;
        this.draw = function shapeHeartDraw() {
            ctx.save();
            ctx.beginPath();
            ctx.translate(that.pos.x, that.pos.y);
            ctx.rotate(4); //position heart correctly
            ctx.moveTo(-that.rad, 0);
            ctx.arc(0, 0, that.rad, 0, Math.PI, false); // first/left heart arc
            ctx.lineTo(that.rad, 0); // line to first/left heart arc
            ctx.arc(that.rad, -that.rad, that.rad, Math.PI * 90 / 180, Math.PI * 270 / 180, true);
            ctx.lineTo(that.rad, -that.rad * 2);
            ctx.lineTo(-that.rad, -that.rad * 2);
            ctx.lineTo(-that.rad, 0);
            ctx.fillStyle = "rgba(" + pColor + ", " + this.active + ")";
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        };
    },
    star: function star(pos, rad, inset, p) {
        var that = this;
        this.pos = pos || null;
        this.rad = rad || null;
        this.inset = inset || null;
        this.points = p || null;
        this.draw = function shapeStarDraw() {
            if (!this.active) {
                return;
            }
            ctx.save();
            ctx.beginPath();
            ctx.translate(that.pos.x, that.pos.y);
            ctx.moveTo(0, 0 - that.rad) // moveTo that.pos.x & that.pos.y but on the outer radius/the first point of the star
            for (i = 0; i < that.points; i++) {
                ctx.rotate(Math.PI / that.points);
                ctx.lineTo(0, 0 - (that.rad * that.inset));
                ctx.rotate(Math.PI / that.points);
                ctx.lineTo(0, 0 - that.rad);
            }
            ctx.fillStyle = "rgba(" + pColor + ", " + this.active + ")";
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        };
    }
};
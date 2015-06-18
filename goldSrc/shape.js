/*
*######
*SHAPE#
*######
*/
var Shape = {
    circle: function circle(canvas, pos, rad, color, opacity) {
        if (canvas) {
            pos = pos || { x: canvas.width / 2, y: canvas.height / 2 };
            rad = rad || 4;
            color = color || '222, 222, 222';
            opacity = opacity || '0.8';

            canvas.ctx.save();
            canvas.ctx.beginPath();
            canvas.ctx.arc(pos.x, pos.y, rad, 0, 2 * Math.PI, false);
            canvas.ctx.fillStyle = "rgba(" + color + ", " + opacity + ")";
            canvas.ctx.fill();
            canvas.ctx.closePath();
            canvas.ctx.restore();
        }
    },
    heart: function heart(canvas, pos, rad, color, opacity) {
        if (canvas) {
            pos = pos || { x: canvas.width / 2, y: canvas.height / 2 };
            rad = rad || 4;
            color = color || '222, 222, 222';
            opacity = opacity || '0.8';

            canvas.ctx.save();
            canvas.ctx.beginPath();
            canvas.ctx.translate(pos.x, pos.y);
            canvas.ctx.rotate(4); //position heart correctly
            canvas.ctx.moveTo(-rad, 0);
            canvas.ctx.arc(0, 0, rad, 0, Math.PI, false);
            canvas.ctx.lineTo(rad, 0);
            canvas.ctx.arc(rad, -rad, rad, Math.PI * 90 / 180, Math.PI * 270 / 180, true);
            canvas.ctx.lineTo(rad, -rad * 2);
            canvas.ctx.lineTo(-rad, -rad * 2);
            canvas.ctx.lineTo(-rad, 0);
            canvas.ctx.fillStyle = "rgba(" + color + ", " + opacity + ")";
            canvas.ctx.fill();
            canvas.ctx.closePath();
            canvas.ctx.restore();
        }
    },
    star: function star(canvas, pos, rad, inset, points, color, opacity) {
        if (canvas) {
            pos = pos || { x: canvas.width / 2, y: canvas.height / 2 };
            rad = rad || 4;
            inset = inset || 2;
            points = points || 5;
            color = color || '222, 222, 222';
            opacity = opacity || '0.8';

            canvas.ctx.save();
            canvas.ctx.beginPath();
            canvas.ctx.translate(pos.x, pos.y);
            canvas.ctx.moveTo(0, 0 - rad) // moveTo this.pos.x & this.pos.y but on the outer radius/the first point of the star
            for (i = 0; i < points; i++) {
                canvas.ctx.rotate(Math.PI / points);
                canvas.ctx.lineTo(0, 0 - (rad * inset));
                canvas.ctx.rotate(Math.PI / points);
                canvas.ctx.lineTo(0, 0 - rad);
            }
            canvas.ctx.fillStyle = "rgba(" + color + ", " + active + ")";
            canvas.ctx.fill();
            canvas.ctx.closePath();
            canvas.ctx.restore();
        }
    }
};

/*
*#######
*LOADING
*#######
*/
function loading(size, color) {
    var canvas = document.getElementById('loading') || null;
    canvas ? canvas.ctx = canvas.getContext('2d') : null;
    var circles = 12;
    var size = size || 128;
    var color = color || '242, 242, 242';
    if (!canvas) {
        var canvas = document.createElement('canvas');
        canvas.ctx = canvas.getContext('2d');
        canvas.id = 'loading';
        canvas.width = size;
        canvas.height = size;
        canvas.style.position = 'absolute';
        canvas.style.top = '45%';
        canvas.style.left = '50%';
        canvas.style.marginLeft = '-' + size / 3 + 'px'; // to position correctly on screen
        canvas.style.backgroundColor = 'rgba(1, 1, 1, 0.4)';
        canvas.style.borderRadius = '16px';
        document.body.appendChild(canvas);
    }

    canvas.ctx.translate(size / 2, size / 2);

    function run() {
        canvas.ctx.clearRect(-size / 2, -size / 2, size, size);
        canvas.ctx.rotate(Math.PI * 2 / circles);
        for (var i = 0; i < circles; i++) {
            canvas.ctx.beginPath();
            canvas.ctx.arc(0, size / 4, size / 20, 0, 2 * Math.PI, false);
            canvas.ctx.fillStyle = 'rgba(' + color + ', ' + i / circles + ')';
            canvas.ctx.fill();
            canvas.ctx.closePath();
            canvas.ctx.rotate(Math.PI * 2 / circles);
        }
        requestAnimationFrame(run);
    }
    requestAnimationFrame(run);
};

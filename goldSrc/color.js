/*
*#####
*COLOR
*#####
*/
var Color = {
    hex2RGB: function hex2RGB(h) {
        r = hex2R(h);
        g = hex2G(h);
        b = hex2B(h);
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
            return (h.charAt(0) == "#") ? h.substring(1,7) : h
        }
    },
    rgb2Hex: function rgb2Hex(r, g, b, h) {
        function toHex(n) {
            hexString = "0123456789ABCDEF";
            return String(hexString.substr((n >> 4) & 0x0F,1)) + hexString.substr(n & 0x0F,1);
        }
        if (h) {
            return "#" + toHex(r) + toHex(g) + toHex(b);
        }
        else {
            return "#" + toHex(r) + toHex(g) + toHex(b);
        }
    }
};

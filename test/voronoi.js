(function () {
  var k = null;
  voronoi = function (w) {
    var y = w.map(function () {
        return []
      }),
      z = {
        l: "r",
        r: "l"
      },
      A = {
        A: function (a) {
          var c, b, d, e;
          if (a.d == 1 && a.a >= 0) {
            c = a.k.r;
            b = a.k.l
          } else {
            c = a.k.l;
            b = a.k.r
          } if (a.d == 1) {
            d = c ? c.y : -1E6;
            c = a.b - a.a * d;
            e = b ? b.y : 1E6;
            b = a.b - a.a * e
          } else {
            c = c ? c.x : -1E6;
            d = a.b - a.d * c;
            b = b ? b.x : 1E6;
            e = a.b - a.d * b
          }
          c = [c, d];
          b = [b, e];
          y[a.region.l.index].push(c, b);
          y[a.region.r.index].push(c, b)
        }
      },
      t = {
        c: w.map(function (a, c) {
          return {
            index: c,
            x: a[0],
            y: a[1]
          }
        }).sort(function (a, c) {
          return a.y < c.y ? -1 : a.y > c.y ? 1 : a.x < c.x ? -1 : a.x > c.x ? 1 : 0
        }),
        v: k
      },
      f = {
        c: [],
        m: k,
        n: k,
        D: function () {
          f.m =
            f.o(k, "l");
          f.n = f.o(k, "l");
          f.m.r = f.n;
          f.n.l = f.m;
          f.c.unshift(f.m, f.n)
        },
        o: function (a, c) {
          return {
            g: a,
            h: c,
            u: k,
            l: k,
            r: k
          }
        },
        i: function (a, c) {
          c.l = a;
          c.r = a.r;
          a.r.l = c;
          a.r = c
        },
        F: function (a) {
          var c = f.m;
          do c = c.r; while (c != f.n && n.H(c, a));
          return c = c.l
        },
        j: function (a) {
          a.l.r = a.r;
          a.r.l = a.l;
          a.g = k
        },
        right: function (a) {
          return a.r
        },
        left: function (a) {
          return a.l
        },
        G: function (a) {
          return a.g == k ? t.v : a.g.region[a.h]
        },
        B: function (a) {
          return a.g == k ? t.v : a.g.region[z[a.h]]
        }
      },
      n = {
        z: function (a, c) {
          var b = {
              region: {
                l: a,
                r: c
              },
              k: {
                l: k,
                r: k
              }
            },
            d = c.x - a.x,
            e = c.y -
            a.y,
            h = d > 0 ? d : -d,
            l = e > 0 ? e : -e;
          b.b = a.x * d + a.y * e + (d * d + e * e) * 0.5;
          if (h > l) {
            b.d = 1;
            b.a = e / d;
            b.b /= d
          } else {
            b.a = 1;
            b.d = d / e;
            b.b /= e
          }
          return b
        },
        t: function (a, c) {
          var b = a.g,
            d = c.g;
          if (!b || !d || b.region.r == d.region.r) return k;
          var e = b.d * d.a - b.a * d.d;
          if (Math.abs(e) < 1.0E-10) return k;
          var h = (b.b * d.a - d.b * b.a) / e;
          e = (d.b * b.d - b.b * d.d) / e;
          var l = b.region.r,
            s = d.region.r;
          if (l.y < s.y || l.y == s.y && l.x < s.x) {
            l = a;
            b = b
          } else {
            l = c;
            b = d
          } if ((b = h >= b.region.r.x) && l.h == "l" || !b && l.h == "r") return k;
          return {
            x: h,
            y: e
          }
        },
        H: function (a, c) {
          var b = a.g,
            d = b.region.r,
            e = c.x > d.x;
          if (e && a.h == "l") return 1;
          if (!e && a.h == "r") return 0;
          if (b.d == 1) {
            var h = c.y - d.y,
              l = c.x - d.x,
              s = 0,
              o = 0;
            if (!e && b.a < 0 || e && b.a >= 0) o = s = h >= b.a * l;
            else {
              o = c.x + c.y * b.a > b.b;
              if (b.a < 0) o = !o;
              o || (s = 1)
            } if (!s) {
              d = d.x - b.region.l.x;
              o = b.a * (l * l - h * h) < d * h * (1 + 2 * l / d + b.a * b.a);
              if (b.a < 0) o = !o
            }
          } else {
            l = b.b - b.d * c.x;
            b = c.y - l;
            h = c.x - d.x;
            d = l - d.y;
            o = b * b > h * h + d * d
          }
          return a.h == "l" ? o : !o
        },
        w: function (a, c, b) {
          a.k[c] = b;
          a.k[z[c]] && A.A(a)
        },
        s: function (a, c) {
          var b = a.x - c.x,
            d = a.y - c.y;
          return Math.sqrt(b * b + d * d)
        }
      },
      i = {
        c: [],
        i: function (a, c, b) {
          a.u = c;
          a.p = c.y + b;
          b = 0;
          for (var d =
            i.c, e = d.length; b < e; b++) {
            var h = d[b];
            if (!(a.p > h.p || a.p == h.p && c.x > h.u.x)) break
          }
          d.splice(b, 0, a)
        },
        j: function (a) {
          for (var c = 0, b = i.c, d = b.length; c < d && b[c] != a; ++c);
          b.splice(c, 1)
        },
        empty: function () {
          return i.c.length == 0
        },
        I: function (a) {
          for (var c = 0, b = i.c, d = b.length; c < d; ++c)
            if (b[c] == a) return b[c + 1];
          return k
        },
        min: function () {
          var a = i.c[0];
          return {
            x: a.u.x,
            y: a.p
          }
        },
        C: function () {
          return i.c.shift()
        }
      };
    f.D();
    t.v = t.c.shift();
    for (var p = t.c.shift(), x, g, q, v, B, j, r, m, u;;) {
      i.empty() || (x = i.min());
      if (p && (i.empty() || p.y < x.y || p.y == x.y &&
        p.x < x.x)) {
        g = f.F(p);
        q = f.right(g);
        r = f.B(g);
        u = n.z(r, p);
        j = f.o(u, "l");
        f.i(g, j);
        if (m = n.t(g, j)) {
          i.j(g);
          i.i(g, m, n.s(m, p))
        }
        g = j;
        j = f.o(u, "r");
        f.i(g, j);
        (m = n.t(j, q)) && i.i(j, m, n.s(m, p));
        p = t.c.shift()
      } else if (i.empty()) break;
      else {
        g = i.C();
        v = f.left(g);
        q = f.right(g);
        B = f.right(q);
        r = f.G(g);
        j = f.B(q);
        m = g.u;
        n.w(g.g, g.h, m);
        n.w(q.g, q.h, m);
        f.j(g);
        i.j(q);
        f.j(q);
        g = "l";
        if (r.y > j.y) {
          g = r;
          r = j;
          j = g;
          g = "r"
        }
        u = n.z(r, j);
        j = f.o(u, g);
        f.i(v, j);
        n.w(u, z[g], m);
        if (m = n.t(v, j)) {
          i.j(v);
          i.i(v, m, n.s(m, r))
        }(m = n.t(j, B)) && i.i(j, m, n.s(m, r))
      }
    }
    for (g = f.right(f.m); g !=
      f.n; g = f.right(g)) A.A(g.g);
    return y.map(function (a, c) {
      var b = w[c][0],
        d = w[c][1];
      a.forEach(function (e) {
        e.q = Math.atan2(e[0] - b, e[1] - d)
      });
      return a.sort(function (e, h) {
        return e.q - h.q
      }).filter(function (e, h) {
        return !h || e.q - a[h - 1].q > 1.0E-10
      })
    })
  };
})()

var e = {
  d: (o, r) => {
    for (var n in r) e.o(r, n) && !e.o(o, n) && Object.defineProperty(o, n, {enumerable: !0, get: r[n]})
  }, o: (e, o) => Object.prototype.hasOwnProperty.call(e, o)
}, o = {};
e.d(o, {v: () => r, d: () => n});
const r = (e, o) => (console.log("hi, sumFun!"), e + o), n = (e, o) => e - o;
var t = o.d, a = o.v;
export {t as minsFun, a as sumFun};

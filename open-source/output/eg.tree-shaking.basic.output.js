(() => {
  "use strict";
  var e = {};
  (e => {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
  })(e);
  var o = {
    d: (e, t) => {
      for (var r in t) o.o(t, r) && !o.o(e, r) && Object.defineProperty(e, r, {enumerable: !0, get: t[r]})
    }, o: (e, o) => Object.prototype.hasOwnProperty.call(e, o)
  }, t = {};
  o.d(t, {v: () => r, d: () => l});
  const r = (e, o) => (console.log("hi, sumFun!"), e + o), l = (e, o) => e - o;
  (0, t.v)(1, 2), module.exports = e
})();

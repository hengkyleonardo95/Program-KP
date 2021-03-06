define("../workbox-f058ae6f.js", ["exports"], function(t) {
  "use strict";
  try {
    self["workbox:core:5.1.3"] && _();
  } catch (t) {}
  const e = (t, ...e) => {
    let s = t;
    return e.length > 0 && (s += " :: " + JSON.stringify(e)), s;
  };
  class s extends Error {
    constructor(t, s) {
      super(e(t, s)), (this.name = t), (this.details = s);
    }
  }
  try {
    self["workbox:routing:5.1.3"] && _();
  } catch (t) {}
  const n = t => (t && "object" == typeof t ? t : { handle: t });
  class i {
    constructor(t, e, s = "GET") {
      (this.handler = n(e)), (this.match = t), (this.method = s);
    }
  }
  class r extends i {
    constructor(t, e, s) {
      super(
        ({ url: e }) => {
          const s = t.exec(e.href);
          if (s && (e.origin === location.origin || 0 === s.index))
            return s.slice(1);
        },
        e,
        s
      );
    }
  }
  const a = t =>
    new URL(String(t), location.href).href.replace(
      new RegExp("^" + location.origin),
      ""
    );
  class o {
    constructor() {
      this.t = new Map();
    }
    get routes() {
      return this.t;
    }
    addFetchListener() {
      self.addEventListener("fetch", t => {
        const { request: e } = t,
          s = this.handleRequest({ request: e, event: t });
        s && t.respondWith(s);
      });
    }
    addCacheListener() {
      self.addEventListener("message", t => {
        if (t.data && "CACHE_URLS" === t.data.type) {
          const { payload: e } = t.data,
            s = Promise.all(
              e.urlsToCache.map(t => {
                "string" == typeof t && (t = [t]);
                const e = new Request(...t);
                return this.handleRequest({ request: e });
              })
            );
          t.waitUntil(s),
            t.ports && t.ports[0] && s.then(() => t.ports[0].postMessage(!0));
        }
      });
    }
    handleRequest({ request: t, event: e }) {
      const s = new URL(t.url, location.href);
      if (!s.protocol.startsWith("http")) return;
      const { params: n, route: i } = this.findMatchingRoute({
        url: s,
        request: t,
        event: e
      });
      let r,
        a = i && i.handler;
      if ((!a && this.s && (a = this.s), a)) {
        try {
          r = a.handle({ url: s, request: t, event: e, params: n });
        } catch (t) {
          r = Promise.reject(t);
        }
        return (
          r instanceof Promise &&
            this.i &&
            (r = r.catch(n => this.i.handle({ url: s, request: t, event: e }))),
          r
        );
      }
    }
    findMatchingRoute({ url: t, request: e, event: s }) {
      const n = this.t.get(e.method) || [];
      for (const i of n) {
        let n;
        const r = i.match({ url: t, request: e, event: s });
        if (r)
          return (
            (n = r),
            ((Array.isArray(r) && 0 === r.length) ||
              (r.constructor === Object && 0 === Object.keys(r).length) ||
              "boolean" == typeof r) &&
              (n = void 0),
            { route: i, params: n }
          );
      }
      return {};
    }
    setDefaultHandler(t) {
      this.s = n(t);
    }
    setCatchHandler(t) {
      this.i = n(t);
    }
    registerRoute(t) {
      this.t.has(t.method) || this.t.set(t.method, []),
        this.t.get(t.method).push(t);
    }
    unregisterRoute(t) {
      if (!this.t.has(t.method))
        throw new s("unregister-route-but-not-found-with-method", {
          method: t.method
        });
      const e = this.t.get(t.method).indexOf(t);
      if (!(e > -1)) throw new s("unregister-route-route-not-registered");
      this.t.get(t.method).splice(e, 1);
    }
  }
  let c;
  const h = () => (
    c || ((c = new o()), c.addFetchListener(), c.addCacheListener()), c
  );
  const u = {
      googleAnalytics: "googleAnalytics",
      precache: "precache-v2",
      prefix: "workbox",
      runtime: "runtime",
      suffix: "undefined" != typeof registration ? registration.scope : ""
    },
    l = t => [u.prefix, t, u.suffix].filter(t => t && t.length > 0).join("-"),
    f = t => t || l(u.runtime);
  function w(t) {
    t.then(() => {});
  }
  const p = new Set();
  class d {
    constructor(t, e, { onupgradeneeded: s, onversionchange: n } = {}) {
      (this.o = null),
        (this.h = t),
        (this.u = e),
        (this.l = s),
        (this.p = n || (() => this.close()));
    }
    get db() {
      return this.o;
    }
    async open() {
      if (!this.o)
        return (
          (this.o = await new Promise((t, e) => {
            let s = !1;
            setTimeout(() => {
              (s = !0),
                e(new Error("The open request was blocked and timed out"));
            }, this.OPEN_TIMEOUT);
            const n = indexedDB.open(this.h, this.u);
            (n.onerror = () => e(n.error)),
              (n.onupgradeneeded = t => {
                s
                  ? (n.transaction.abort(), n.result.close())
                  : "function" == typeof this.l && this.l(t);
              }),
              (n.onsuccess = () => {
                const e = n.result;
                s ? e.close() : ((e.onversionchange = this.p.bind(this)), t(e));
              });
          })),
          this
        );
    }
    async getKey(t, e) {
      return (await this.getAllKeys(t, e, 1))[0];
    }
    async getAll(t, e, s) {
      return await this.getAllMatching(t, { query: e, count: s });
    }
    async getAllKeys(t, e, s) {
      return (await this.getAllMatching(t, {
        query: e,
        count: s,
        includeKeys: !0
      })).map(t => t.key);
    }
    async getAllMatching(
      t,
      {
        index: e,
        query: s = null,
        direction: n = "next",
        count: i,
        includeKeys: r = !1
      } = {}
    ) {
      return await this.transaction([t], "readonly", (a, o) => {
        const c = a.objectStore(t),
          h = e ? c.index(e) : c,
          u = [],
          l = h.openCursor(s, n);
        l.onsuccess = () => {
          const t = l.result;
          t
            ? (u.push(r ? t : t.value),
              i && u.length >= i ? o(u) : t.continue())
            : o(u);
        };
      });
    }
    async transaction(t, e, s) {
      return (
        await this.open(),
        await new Promise((n, i) => {
          const r = this.o.transaction(t, e);
          (r.onabort = () => i(r.error)),
            (r.oncomplete = () => n()),
            s(r, t => n(t));
        })
      );
    }
    async m(t, e, s, ...n) {
      return await this.transaction([e], s, (s, i) => {
        const r = s.objectStore(e),
          a = r[t].apply(r, n);
        a.onsuccess = () => i(a.result);
      });
    }
    close() {
      this.o && (this.o.close(), (this.o = null));
    }
  }
  d.prototype.OPEN_TIMEOUT = 2e3;
  const m = {
    readonly: ["get", "count", "getKey", "getAll", "getAllKeys"],
    readwrite: ["add", "put", "clear", "delete"]
  };
  for (const [t, e] of Object.entries(m))
    for (const s of e)
      s in IDBObjectStore.prototype &&
        (d.prototype[s] = async function(e, ...n) {
          return await this.m(s, e, t, ...n);
        });
  try {
    self["workbox:expiration:5.1.3"] && _();
  } catch (t) {}
  const y = t => {
    const e = new URL(t, location.href);
    return (e.hash = ""), e.href;
  };
  class g {
    constructor(t) {
      (this.g = t),
        (this.o = new d("workbox-expiration", 1, {
          onupgradeneeded: t => this.q(t)
        }));
    }
    q(t) {
      const e = t.target.result.createObjectStore("cache-entries", {
        keyPath: "id"
      });
      e.createIndex("cacheName", "cacheName", { unique: !1 }),
        e.createIndex("timestamp", "timestamp", { unique: !1 }),
        (async t => {
          await new Promise((e, s) => {
            const n = indexedDB.deleteDatabase(t);
            (n.onerror = () => {
              s(n.error);
            }),
              (n.onblocked = () => {
                s(new Error("Delete blocked"));
              }),
              (n.onsuccess = () => {
                e();
              });
          });
        })(this.g);
    }
    async setTimestamp(t, e) {
      const s = {
        url: (t = y(t)),
        timestamp: e,
        cacheName: this.g,
        id: this.v(t)
      };
      await this.o.put("cache-entries", s);
    }
    async getTimestamp(t) {
      return (await this.o.get("cache-entries", this.v(t))).timestamp;
    }
    async expireEntries(t, e) {
      const s = await this.o.transaction(
          "cache-entries",
          "readwrite",
          (s, n) => {
            const i = s
                .objectStore("cache-entries")
                .index("timestamp")
                .openCursor(null, "prev"),
              r = [];
            let a = 0;
            i.onsuccess = () => {
              const s = i.result;
              if (s) {
                const n = s.value;
                n.cacheName === this.g &&
                  ((t && n.timestamp < t) || (e && a >= e)
                    ? r.push(s.value)
                    : a++),
                  s.continue();
              } else n(r);
            };
          }
        ),
        n = [];
      for (const t of s)
        await this.o.delete("cache-entries", t.id), n.push(t.url);
      return n;
    }
    v(t) {
      return this.g + "|" + y(t);
    }
  }
  class q {
    constructor(t, e = {}) {
      (this.R = !1),
        (this.N = !1),
        (this.D = e.maxEntries),
        (this._ = e.maxAgeSeconds),
        (this.g = t),
        (this.O = new g(t));
    }
    async expireEntries() {
      if (this.R) return void (this.N = !0);
      this.R = !0;
      const t = this._ ? Date.now() - 1e3 * this._ : 0,
        e = await this.O.expireEntries(t, this.D),
        s = await self.caches.open(this.g);
      for (const t of e) await s.delete(t);
      (this.R = !1), this.N && ((this.N = !1), w(this.expireEntries()));
    }
    async updateTimestamp(t) {
      await this.O.setTimestamp(t, Date.now());
    }
    async isURLExpired(t) {
      if (this._) {
        return (await this.O.getTimestamp(t)) < Date.now() - 1e3 * this._;
      }
      return !1;
    }
    async delete() {
      (this.N = !1), await this.O.expireEntries(1 / 0);
    }
  }
  const v = (t, e) => t.filter(t => e in t),
    R = async ({ request: t, mode: e, plugins: s = [] }) => {
      const n = v(s, "cacheKeyWillBeUsed");
      let i = t;
      for (const t of n)
        (i = await t.cacheKeyWillBeUsed.call(t, { mode: e, request: i })),
          "string" == typeof i && (i = new Request(i));
      return i;
    },
    x = async ({
      cacheName: t,
      request: e,
      event: s,
      matchOptions: n,
      plugins: i = []
    }) => {
      const r = await self.caches.open(t),
        a = await R({ plugins: i, request: e, mode: "read" });
      let o = await r.match(a, n);
      for (const e of i)
        if ("cachedResponseWillBeUsed" in e) {
          const i = e.cachedResponseWillBeUsed;
          o = await i.call(e, {
            cacheName: t,
            event: s,
            matchOptions: n,
            cachedResponse: o,
            request: a
          });
        }
      return o;
    },
    N = async ({
      cacheName: t,
      request: e,
      response: n,
      event: i,
      plugins: r = [],
      matchOptions: o
    }) => {
      const c = await R({ plugins: r, request: e, mode: "write" });
      if (!n) throw new s("cache-put-with-no-response", { url: a(c.url) });
      const h = await (async ({
        request: t,
        response: e,
        event: s,
        plugins: n = []
      }) => {
        let i = e,
          r = !1;
        for (const e of n)
          if ("cacheWillUpdate" in e) {
            r = !0;
            const n = e.cacheWillUpdate;
            if (
              ((i = await n.call(e, { request: t, response: i, event: s })), !i)
            )
              break;
          }
        return r || (i = i && 200 === i.status ? i : void 0), i || null;
      })({ event: i, plugins: r, response: n, request: c });
      if (!h) return;
      const u = await self.caches.open(t),
        l = v(r, "cacheDidUpdate"),
        f =
          l.length > 0
            ? await x({ cacheName: t, matchOptions: o, request: c })
            : null;
      try {
        await u.put(c, h);
      } catch (t) {
        throw ("QuotaExceededError" === t.name &&
          (await (async function() {
            for (const t of p) await t();
          })()),
        t);
      }
      for (const e of l)
        await e.cacheDidUpdate.call(e, {
          cacheName: t,
          event: i,
          oldResponse: f,
          newResponse: h,
          request: c
        });
    },
    b = x,
    D = async ({ request: t, fetchOptions: e, event: n, plugins: i = [] }) => {
      if (
        ("string" == typeof t && (t = new Request(t)),
        n instanceof FetchEvent && n.preloadResponse)
      ) {
        const t = await n.preloadResponse;
        if (t) return t;
      }
      const r = v(i, "fetchDidFail"),
        a = r.length > 0 ? t.clone() : null;
      try {
        for (const e of i)
          if ("requestWillFetch" in e) {
            const s = e.requestWillFetch,
              i = t.clone();
            t = await s.call(e, { request: i, event: n });
          }
      } catch (t) {
        throw new s("plugin-error-request-will-fetch", { thrownError: t });
      }
      const o = t.clone();
      try {
        let s;
        s = "navigate" === t.mode ? await fetch(t) : await fetch(t, e);
        for (const t of i)
          "fetchDidSucceed" in t &&
            (s = await t.fetchDidSucceed.call(t, {
              event: n,
              request: o,
              response: s
            }));
        return s;
      } catch (t) {
        for (const e of r)
          await e.fetchDidFail.call(e, {
            error: t,
            event: n,
            originalRequest: a.clone(),
            request: o.clone()
          });
        throw t;
      }
    };
  try {
    self["workbox:strategies:5.1.3"] && _();
  } catch (t) {}
  const E = {
    cacheWillUpdate: async ({ response: t }) =>
      200 === t.status || 0 === t.status ? t : null
  };
  (t.ExpirationPlugin = class {
    constructor(t = {}) {
      var e;
      (this.cachedResponseWillBeUsed = async ({
        event: t,
        request: e,
        cacheName: s,
        cachedResponse: n
      }) => {
        if (!n) return null;
        const i = this.U(n),
          r = this.P(s);
        w(r.expireEntries());
        const a = r.updateTimestamp(e.url);
        if (t)
          try {
            t.waitUntil(a);
          } catch (t) {}
        return i ? n : null;
      }),
        (this.cacheDidUpdate = async ({ cacheName: t, request: e }) => {
          const s = this.P(t);
          await s.updateTimestamp(e.url), await s.expireEntries();
        }),
        (this.A = t),
        (this._ = t.maxAgeSeconds),
        (this.T = new Map()),
        t.purgeOnQuotaError &&
          ((e = () => this.deleteCacheAndMetadata()), p.add(e));
    }
    P(t) {
      if (t === f()) throw new s("expire-custom-caches-only");
      let e = this.T.get(t);
      return e || ((e = new q(t, this.A)), this.T.set(t, e)), e;
    }
    U(t) {
      if (!this._) return !0;
      const e = this.k(t);
      if (null === e) return !0;
      return e >= Date.now() - 1e3 * this._;
    }
    k(t) {
      if (!t.headers.has("date")) return null;
      const e = t.headers.get("date"),
        s = new Date(e).getTime();
      return isNaN(s) ? null : s;
    }
    async deleteCacheAndMetadata() {
      for (const [t, e] of this.T)
        await self.caches.delete(t), await e.delete();
      this.T = new Map();
    }
  }),
    (t.NetworkFirst = class {
      constructor(t = {}) {
        if (((this.g = f(t.cacheName)), t.plugins)) {
          const e = t.plugins.some(t => !!t.cacheWillUpdate);
          this.L = e ? t.plugins : [E, ...t.plugins];
        } else this.L = [E];
        (this.C = t.networkTimeoutSeconds || 0),
          (this.K = t.fetchOptions),
          (this.j = t.matchOptions);
      }
      async handle({ event: t, request: e }) {
        const n = [];
        "string" == typeof e && (e = new Request(e));
        const i = [];
        let r;
        if (this.C) {
          const { id: s, promise: a } = this.F({
            request: e,
            event: t,
            logs: n
          });
          (r = s), i.push(a);
        }
        const a = this.M({ timeoutId: r, request: e, event: t, logs: n });
        i.push(a);
        let o = await Promise.race(i);
        if ((o || (o = await a), !o))
          throw new s("no-response", { url: e.url });
        return o;
      }
      F({ request: t, logs: e, event: s }) {
        let n;
        return {
          promise: new Promise(e => {
            n = setTimeout(async () => {
              e(await this.S({ request: t, event: s }));
            }, 1e3 * this.C);
          }),
          id: n
        };
      }
      async M({ timeoutId: t, request: e, logs: s, event: n }) {
        let i, r;
        try {
          r = await D({
            request: e,
            event: n,
            fetchOptions: this.K,
            plugins: this.L
          });
        } catch (t) {
          i = t;
        }
        if ((t && clearTimeout(t), i || !r))
          r = await this.S({ request: e, event: n });
        else {
          const t = r.clone(),
            s = N({
              cacheName: this.g,
              request: e,
              response: t,
              event: n,
              plugins: this.L
            });
          if (n)
            try {
              n.waitUntil(s);
            } catch (t) {}
        }
        return r;
      }
      S({ event: t, request: e }) {
        return b({
          cacheName: this.g,
          request: e,
          event: t,
          matchOptions: this.j,
          plugins: this.L
        });
      }
    }),
    (t.registerRoute = function(t, e, n) {
      let a;
      if ("string" == typeof t) {
        const s = new URL(t, location.href);
        a = new i(({ url: t }) => t.href === s.href, e, n);
      } else if (t instanceof RegExp) a = new r(t, e, n);
      else if ("function" == typeof t) a = new i(t, e, n);
      else {
        if (!(t instanceof i))
          throw new s("unsupported-route-type", {
            moduleName: "workbox-routing",
            funcName: "registerRoute",
            paramName: "capture"
          });
        a = t;
      }
      return h().registerRoute(a), a;
    });
});
//# sourceMappingURL=workbox-f058ae6f.js.map

(function() {
        const s = document.createElement("link").relList;
        if (s && s.supports && s.supports("modulepreload"))
            return;
        for (const a of document.querySelectorAll('link[rel="modulepreload"]'))
            r(a);
        new MutationObserver(a => {
                for (const o of a)
                    if (o.type === "childList")
                        for (const l of o.addedNodes)
                            l.tagName === "LINK" && l.rel === "modulepreload" && r(l)
            }
        ).observe(document, {
            childList: !0,
            subtree: !0
        });
        function d(a) {
            const o = {};
            return a.integrity && (o.integrity = a.integrity),
            a.referrerPolicy && (o.referrerPolicy = a.referrerPolicy),
                a.crossOrigin === "use-credentials" ? o.credentials = "include" : a.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin",
                o
        }
        function r(a) {
            if (a.ep)
                return;
            a.ep = !0;
            const o = d(a);
            fetch(a.href, o)
        }
    }
)();
var E = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, L = {
    exports: {}
}, N = L.exports, T;
function P() {
    return T || (T = 1,
        (function(e, s) {
                (function(d, r) {
                        r()
                    }
                )(N, function() {
                    function d(t, n) {
                        return typeof n > "u" ? n = {
                            autoBom: !1
                        } : typeof n != "object" && (console.warn("Deprecated: Expected third argument to be a object"),
                            n = {
                                autoBom: !n
                            }),
                            n.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type) ? new Blob(["\uFEFF", t],{
                                type: t.type
                            }) : t
                    }
                    function r(t, n, u) {
                        var i = new XMLHttpRequest;
                        i.open("GET", t),
                            i.responseType = "blob",
                            i.onload = function() {
                                x(i.response, n, u)
                            }
                            ,
                            i.onerror = function() {
                                console.error("could not download file")
                            }
                            ,
                            i.send()
                    }
                    function a(t) {
                        var n = new XMLHttpRequest;
                        n.open("HEAD", t, !1);
                        try {
                            n.send()
                        } catch {}
                        return 200 <= n.status && 299 >= n.status
                    }
                    function o(t) {
                        try {
                            t.dispatchEvent(new MouseEvent("click"))
                        } catch {
                            var n = document.createEvent("MouseEvents");
                            n.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null),
                                t.dispatchEvent(n)
                        }
                    }
                    var l = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof E == "object" && E.global === E ? E : void 0
                        , w = l.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent)
                        , x = l.saveAs || (typeof window != "object" || window !== l ? function() {}
                            : "download"in HTMLAnchorElement.prototype && !w ? function(t, n, u) {
                                    var i = l.URL || l.webkitURL
                                        , c = document.createElement("a");
                                    n = n || t.name || "download",
                                        c.download = n,
                                        c.rel = "noopener",
                                        typeof t == "string" ? (c.href = t,
                                            c.origin === location.origin ? o(c) : a(c.href) ? r(t, n, u) : o(c, c.target = "_blank")) : (c.href = i.createObjectURL(t),
                                            setTimeout(function() {
                                                i.revokeObjectURL(c.href)
                                            }, 4e4),
                                            setTimeout(function() {
                                                o(c)
                                            }, 0))
                                }
                                : "msSaveOrOpenBlob"in navigator ? function(t, n, u) {
                                        if (n = n || t.name || "download",
                                        typeof t != "string")
                                            navigator.msSaveOrOpenBlob(d(t, u), n);
                                        else if (a(t))
                                            r(t, n, u);
                                        else {
                                            var i = document.createElement("a");
                                            i.href = t,
                                                i.target = "_blank",
                                                setTimeout(function() {
                                                    o(i)
                                                })
                                        }
                                    }
                                    : function(t, n, u, i) {
                                        if (i = i || open("", "_blank"),
                                        i && (i.document.title = i.document.body.innerText = "downloading..."),
                                        typeof t == "string")
                                            return r(t, n, u);
                                        var c = t.type === "application/octet-stream"
                                            , k = /constructor/i.test(l.HTMLElement) || l.safari
                                            , U = /CriOS\/[\d]+/.test(navigator.userAgent);
                                        if ((U || c && k || w) && typeof FileReader < "u") {
                                            var I = new FileReader;
                                            I.onloadend = function() {
                                                var y = I.result;
                                                y = U ? y : y.replace(/^data:[^;]*;/, "data:attachment/file;"),
                                                    i ? i.location.href = y : location = y,
                                                    i = null
                                            }
                                                ,
                                                I.readAsDataURL(t)
                                        } else {
                                            var G = l.URL || l.webkitURL
                                                , F = G.createObjectURL(t);
                                            i ? i.location = F : location.href = F,
                                                i = null,
                                                setTimeout(function() {
                                                    G.revokeObjectURL(F)
                                                }, 4e4)
                                        }
                                    }
                    );
                    l.saveAs = x.saveAs = x,
                        e.exports = x
                })
            }
        )(L)),
        L.exports
}
var M = P();
document.querySelector("#app").innerHTML = `
<div class="sidebar">

  <div class="controls-container">

    <div class="layer-section">
      <div class="layer-header">1. Foreground</div>
      <div class="layer-controls">
        <div class="gallery" id="fgGallery"></div>

        <h3>Color</h3>
        <label>Hue <span id="fg-val-hue" class="value-display">0°</span></label>
        <input type="range" id="fg-hue" min="0" max="360" value="0">

        <label>Saturation <span id="fg-val-sat" class="value-display">100%</span></label>
        <input type="range" id="fg-sat" min="0" max="200" value="100">

        <h3>Details</h3>
        <label>Brightness <span id="fg-val-brit" class="value-display">100%</span></label>
        <input type="range" id="fg-brit" min="0" max="200" value="100">

        <label>Contrast <span id="fg-val-contrast" class="value-display">100%</span></label>
        <input type="range" id="fg-contrast" min="0" max="200" value="100">

        <label>Blur <span id="fg-val-blur" class="value-display">0px</span></label>
        <input type="range" id="fg-blur" min="0" max="20" value="0" step="0.5">
      </div>
    </div>

    <div class="layer-section">
      <div class="layer-header">2. Background</div>
      <div class="layer-controls">
        <div class="gallery" id="bgGallery"></div>

        <h3>Color</h3>
        <label>Hue <span id="bg-val-hue" class="value-display">0°</span></label>
        <input type="range" id="bg-hue" min="0" max="360" value="0">

        <label>Saturation <span id="bg-val-sat" class="value-display">100%</span></label>
        <input type="range" id="bg-sat" min="0" max="200" value="100">

        <h3>Details</h3>
        <label>Brightness <span id="bg-val-brit" class="value-display">100%</span></label>
        <input type="range" id="bg-brit" min="0" max="200" value="100">

        <label>Contrast <span id="bg-val-contrast" class="value-display">100%</span></label>
        <input type="range" id="bg-contrast" min="0" max="200" value="100">

        <label>Blur <span id="bg-val-blur" class="value-display">0px</span></label>
        <input type="range" id="bg-blur" min="0" max="20" value="0" step="0.5">
      </div>
    </div>

  </div>

  <div class="sidebar-footer">
    <div class="button-row">
      <button class="secondary" id="btnUndo" disabled>↶ Undo</button>
      <button class="secondary" id="btnRedo" disabled>↷ Redo</button>
      <button class="warning" id="btnReset">↺ Reset Filters</button>
    </div>
    <button class="zip-btn" id="btnDownload">⬇️ Download Files</button>
  </div>

</div>

<div class="workspace">
  <canvas id="photoCanvas"></canvas>
</div>
`;
const m = document.getElementById("photoCanvas")
    , p = m.getContext("2d")
    , S = {
    hue: 0,
    sat: 100,
    brit: 100,
    contrast: 100,
    blur: 0
}
    , f = {
    ...S
}
    , v = {
    ...S
};
let O = new Image
    , j = new Image
    , $ = !1
    , C = !1
    , b = []
    , g = -1;
const K = [{
    id: "fgGallery",
    src: "/gallery/fgGallery.jpg.png"
}]
    , X = [{
    id: "bgGallery",
    src: "/gallery/bgGallery.jpg.png"
}];
function D(e, s, d, r) {
    const a = document.getElementById(e);
    r.forEach(o => {
            const l = document.createElement("img");
            l.src = o.src,
                l.onclick = () => {
                    a.querySelectorAll("img").forEach(w => w.classList.remove("selected")),
                        l.classList.add("selected"),
                        s.onload = () => {
                            m.width = s.width,
                                m.height = s.height,
                                d ? $ = !0 : C = !0,
                                A(),
                                B()
                        }
                        ,
                        s.src = o.src
                }
                ,
                a.appendChild(l)
        }
    )
}
D("bgGallery", O, !0, X);
D("fgGallery", j, !1, K);
function B() {
    b = b.slice(0, g + 1),
        b.push({
            bg: {
                ...f
            },
            fg: {
                ...v
            }
        }),
        g++,
        q()
}
function Y() {
    g > 0 && H(b[--g])
}
function z() {
    g < b.length - 1 && H(b[++g])
}
function _(e, s) {
    Object.entries({
        hue: "°",
        sat: "%",
        brit: "%",
        contrast: "%",
        blur: "px"
    }).forEach( ([r,a]) => {
            const o = document.getElementById(`${e}-${r}`)
                , l = document.getElementById(`${e}-val-${r}`);
            !o || !l || (o.value = s[r],
                l.textContent = s[r] + a)
        }
    )
}
function H(e) {
    Object.assign(f, e.bg),
        Object.assign(v, e.fg),
        _("bg", f),
        _("fg", v),
        A(),
        q()
}
function J() {
    Object.assign(f, S),
        Object.assign(v, S),
        B(),
        A()
}
function q() {
    btnUndo.disabled = g <= 0,
        btnRedo.disabled = g >= b.length - 1
}
function R(e) {
    return `hue-rotate(${e.hue}deg) saturate(${e.sat}%) brightness(${e.brit}%) contrast(${e.contrast}%) blur(${e.blur}px)`
}
function A() {
    p.clearRect(0, 0, m.width, m.height);
    p.save();

    // BG
    if ($) {
        p.filter = R(f);
        p.drawImage(O, 0, 0);
    }

    // FG (ממורכז)
    if (C) {
        p.filter = R(v);

        const x = (m.width - j.width) / 2;
        const y = (m.height - j.height) / 2;

        p.drawImage(j, x, y);
    }

    p.restore();
    p.filter = "none";
}
function h(e, s, d) {
    const r = document.getElementById(`${e}-${s}`)
        , a = document.getElementById(`${e}-val-${s}`)
        , o = e === "bg" ? f : v;
    r.oninput = l => {
        o[s] = +l.target.value,
            a.textContent = o[s] + d,
            A()
    }
        ,
        r.onchange = B
}
["bg", "fg"].forEach(e => {
        h(e, "hue", "°"),
            h(e, "sat", "%"),
            h(e, "brit", "%"),
            h(e, "contrast", "%"),
            h(e, "blur", "px")
    }
);
function W() {
    const e = document.createElement("canvas");
    e.width = m.width,
        e.height = m.height;
    const s = e.getContext("2d");
    $ && (s.filter = R(f),
        s.drawImage(O, 0, 0)),
    C && (s.filter = R(v),
        s.drawImage(j, 0, 0)),
        s.filter = "none",
        e.toBlob(a => {
                M.saveAs(a, "image.png")
            }
        );
    const d = JSON.stringify({
        bgState: f,
        fgState: v
    }, null, 2)
        , r = new Blob([d],{
        type: "text/plain"
    });
    M.saveAs(r, "report.txt")
}
btnUndo.onclick = Y;
btnRedo.onclick = z;
btnReset.onclick = J;
btnDownload.onclick = W;
B();

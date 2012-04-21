// Three.js - http://github.com/mrdoob/three.js
'use strict';
var THREE = THREE || {
    REVISION: "49dev"
};
var self = self || {};
var window = window || {};
if (!self.Int32Array) self.Int32Array = Array, self.Float32Array = Array;
(function () {
    for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (b) {
        var c = (new Date).getTime(),
            f = Math.max(0, 16 - (c - a)),
            g = window.setTimeout(function () {
                b(c + f)
            }, f);
        a = c + f;
        return g
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (a) {
        clearTimeout(a)
    }
})();
THREE.Clock = function (a) {
    this.autoStart = void 0 !== a ? a : !0;
    this.elapsedTime = this.oldTime = this.startTime = 0;
    this.running = !1
};
THREE.Clock.prototype.start = function () {
    this.oldTime = this.startTime = Date.now();
    this.running = !0
};
THREE.Clock.prototype.stop = function () {
    this.getElapsedTime();
    this.running = !1
};
THREE.Clock.prototype.getElapsedTime = function () {
    return this.elapsedTime += this.getDelta()
};
THREE.Clock.prototype.getDelta = function () {
    var a = 0;
    this.autoStart && !this.running && this.start();
    if (this.running) {
        var b = Date.now(),
            a = 0.001 * (b - this.oldTime);
        this.oldTime = b;
        this.elapsedTime += a
    }
    return a
};
THREE.Color = function (a) {
    void 0 !== a && this.setHex(a);
    return this
};
THREE.Color.prototype = {
    constructor: THREE.Color,
    r: 1,
    g: 1,
    b: 1,
    copy: function (a) {
        this.r = a.r;
        this.g = a.g;
        this.b = a.b;
        return this
    },
    copyGammaToLinear: function (a) {
        this.r = a.r * a.r;
        this.g = a.g * a.g;
        this.b = a.b * a.b;
        return this
    },
    copyLinearToGamma: function (a) {
        this.r = Math.sqrt(a.r);
        this.g = Math.sqrt(a.g);
        this.b = Math.sqrt(a.b);
        return this
    },
    convertGammaToLinear: function () {
        var a = this.r,
            b = this.g,
            c = this.b;
        this.r = a * a;
        this.g = b * b;
        this.b = c * c;
        return this
    },
    convertLinearToGamma: function () {
        this.r = Math.sqrt(this.r);
        this.g = Math.sqrt(this.g);
        this.b = Math.sqrt(this.b);
        return this
    },
    setRGB: function (a, b, c) {
        this.r = a;
        this.g = b;
        this.b = c;
        return this
    },
    setHSV: function (a, b, c) {
        var d, e, f;
        if (0 === c) this.r = this.g = this.b = 0;
        else switch (d = Math.floor(6 * a), e = 6 * a - d, a = c * (1 - b), f = c * (1 - b * e), b = c * (1 - b * (1 - e)), d) {
        case 1:
            this.r = f;
            this.g = c;
            this.b = a;
            break;
        case 2:
            this.r = a;
            this.g = c;
            this.b = b;
            break;
        case 3:
            this.r = a;
            this.g = f;
            this.b = c;
            break;
        case 4:
            this.r = b;
            this.g = a;
            this.b = c;
            break;
        case 5:
            this.r = c;
            this.g = a;
            this.b = f;
            break;
        case 6:
        case 0:
            this.r = c, this.g = b, this.b = a
        }
        return this
    },
    setHex: function (a) {
        a = Math.floor(a);
        this.r = (a >> 16 & 255) / 255;
        this.g = (a >> 8 & 255) / 255;
        this.b = (a & 255) / 255;
        return this
    },
    lerpSelf: function (a, b) {
        this.r += (a.r - this.r) * b;
        this.g += (a.g - this.g) * b;
        this.b += (a.b - this.b) * b;
        return this
    },
    getHex: function () {
        return Math.floor(255 * this.r) << 16 ^ Math.floor(255 * this.g) << 8 ^ Math.floor(255 * this.b)
    },
    getContextStyle: function () {
        return "rgb(" + Math.floor(255 * this.r) + "," + Math.floor(255 * this.g) + "," + Math.floor(255 * this.b) + ")"
    },
    clone: function () {
        return (new THREE.Color).setRGB(this.r, this.g, this.b)
    }
};
THREE.Vector2 = function (a, b) {
    this.x = a || 0;
    this.y = b || 0
};
THREE.Vector2.prototype = {
    constructor: THREE.Vector2,
    set: function (a, b) {
        this.x = a;
        this.y = b;
        return this
    },
    copy: function (a) {
        this.x = a.x;
        this.y = a.y;
        return this
    },
    add: function (a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        return this
    },
    addSelf: function (a) {
        this.x += a.x;
        this.y += a.y;
        return this
    },
    sub: function (a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        return this
    },
    subSelf: function (a) {
        this.x -= a.x;
        this.y -= a.y;
        return this
    },
    multiplyScalar: function (a) {
        this.x *= a;
        this.y *= a;
        return this
    },
    divideScalar: function (a) {
        a ? (this.x /= a, this.y /= a) : this.set(0, 0);
        return this
    },
    negate: function () {
        return this.multiplyScalar(-1)
    },
    dot: function (a) {
        return this.x * a.x + this.y * a.y
    },
    lengthSq: function () {
        return this.x * this.x + this.y * this.y
    },
    length: function () {
        return Math.sqrt(this.lengthSq())
    },
    normalize: function () {
        return this.divideScalar(this.length())
    },
    distanceTo: function (a) {
        return Math.sqrt(this.distanceToSquared(a))
    },
    distanceToSquared: function (a) {
        var b = this.x - a.x,
            a = this.y - a.y;
        return b * b + a * a
    },
    setLength: function (a) {
        return this.normalize().multiplyScalar(a)
    },
    lerpSelf: function (a, b) {
        this.x += (a.x - this.x) * b;
        this.y += (a.y - this.y) * b;
        return this
    },
    equals: function (a) {
        return a.x === this.x && a.y === this.y
    },
    isZero: function () {
        return 1.0E-4 > this.lengthSq()
    },
    clone: function () {
        return new THREE.Vector2(this.x, this.y)
    }
};
THREE.Vector3 = function (a, b, c) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0
};
THREE.Vector3.prototype = {
    constructor: THREE.Vector3,
    set: function (a, b, c) {
        this.x = a;
        this.y = b;
        this.z = c;
        return this
    },
    setX: function (a) {
        this.x = a;
        return this
    },
    setY: function (a) {
        this.y = a;
        return this
    },
    setZ: function (a) {
        this.z = a;
        return this
    },
    copy: function (a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        return this
    },
    add: function (a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        return this
    },
    addSelf: function (a) {
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
        return this
    },
    addScalar: function (a) {
        this.x += a;
        this.y += a;
        this.z += a;
        return this
    },
    sub: function (a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        return this
    },
    subSelf: function (a) {
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
        return this
    },
    multiply: function (a, b) {
        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;
        return this
    },
    multiplySelf: function (a) {
        this.x *= a.x;
        this.y *= a.y;
        this.z *= a.z;
        return this
    },
    multiplyScalar: function (a) {
        this.x *= a;
        this.y *= a;
        this.z *= a;
        return this
    },
    divideSelf: function (a) {
        this.x /= a.x;
        this.y /= a.y;
        this.z /= a.z;
        return this
    },
    divideScalar: function (a) {
        a ? (this.x /= a, this.y /= a, this.z /= a) : this.z = this.y = this.x = 0;
        return this
    },
    negate: function () {
        return this.multiplyScalar(-1)
    },
    dot: function (a) {
        return this.x * a.x + this.y * a.y + this.z * a.z
    },
    lengthSq: function () {
        return this.x * this.x + this.y * this.y + this.z * this.z
    },
    length: function () {
        return Math.sqrt(this.lengthSq())
    },
    lengthManhattan: function () {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
    },
    normalize: function () {
        return this.divideScalar(this.length())
    },
    setLength: function (a) {
        return this.normalize().multiplyScalar(a)
    },
    lerpSelf: function (a, b) {
        this.x += (a.x - this.x) * b;
        this.y += (a.y - this.y) * b;
        this.z += (a.z - this.z) * b;
        return this
    },
    cross: function (a, b) {
        this.x = a.y * b.z - a.z * b.y;
        this.y = a.z * b.x - a.x * b.z;
        this.z = a.x * b.y - a.y * b.x;
        return this
    },
    crossSelf: function (a) {
        var b = this.x,
            c = this.y,
            d = this.z;
        this.x = c * a.z - d * a.y;
        this.y = d * a.x - b * a.z;
        this.z = b * a.y - c * a.x;
        return this
    },
    distanceTo: function (a) {
        return Math.sqrt(this.distanceToSquared(a))
    },
    distanceToSquared: function (a) {
        return (new THREE.Vector3).sub(this, a).lengthSq()
    },
    getPositionFromMatrix: function (a) {
        this.x = a.n14;
        this.y = a.n24;
        this.z = a.n34;
        return this
    },
    getRotationFromMatrix: function (a, b) {
        var c = b ? b.x : 1,
            d = b ? b.y : 1,
            e = b ? b.z : 1,
            f = a.n11 / c,
            g = a.n12 / d,
            c = a.n21 / c,
            d = a.n22 / d,
            h = a.n23 / e,
            l = a.n33 / e;
        this.y = Math.asin(a.n13 / e);
        e = Math.cos(this.y);
        1.0E-5 < Math.abs(e) ? (this.x = Math.atan2(-h / e, l / e), this.z = Math.atan2(-g / e, f / e)) : (this.x = 0, this.z = Math.atan2(c, d));
        return this
    },
    getScaleFromMatrix: function (a) {
        var b = this.set(a.n11, a.n21, a.n31).length(),
            c = this.set(a.n12, a.n22, a.n32).length(),
            a = this.set(a.n13, a.n23, a.n33).length();
        this.x = b;
        this.y = c;
        this.z = a
    },
    equals: function (a) {
        return a.x === this.x && a.y === this.y && a.z === this.z
    },
    isZero: function () {
        return 1.0E-4 > this.lengthSq()
    },
    clone: function () {
        return new THREE.Vector3(this.x, this.y, this.z)
    }
};
THREE.Vector4 = function (a, b, c, d) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0;
    this.w = void 0 !== d ? d : 1
};
THREE.Vector4.prototype = {
    constructor: THREE.Vector4,
    set: function (a, b, c, d) {
        this.x = a;
        this.y = b;
        this.z = c;
        this.w = d;
        return this
    },
    copy: function (a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        this.w = void 0 !== a.w ? a.w : 1;
        return this
    },
    add: function (a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        this.w = a.w + b.w;
        return this
    },
    addSelf: function (a) {
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
        this.w += a.w;
        return this
    },
    sub: function (a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        this.w = a.w - b.w;
        return this
    },
    subSelf: function (a) {
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
        this.w -= a.w;
        return this
    },
    multiplyScalar: function (a) {
        this.x *= a;
        this.y *= a;
        this.z *= a;
        this.w *= a;
        return this
    },
    divideScalar: function (a) {
        a ? (this.x /= a, this.y /= a, this.z /= a, this.w /= a) : (this.z = this.y = this.x = 0, this.w = 1);
        return this
    },
    negate: function () {
        return this.multiplyScalar(-1)
    },
    dot: function (a) {
        return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w
    },
    lengthSq: function () {
        return this.dot(this)
    },
    length: function () {
        return Math.sqrt(this.lengthSq())
    },
    normalize: function () {
        return this.divideScalar(this.length())
    },
    setLength: function (a) {
        return this.normalize().multiplyScalar(a)
    },
    lerpSelf: function (a, b) {
        this.x += (a.x - this.x) * b;
        this.y += (a.y - this.y) * b;
        this.z += (a.z - this.z) * b;
        this.w += (a.w - this.w) * b;
        return this
    },
    clone: function () {
        return new THREE.Vector4(this.x, this.y, this.z, this.w)
    }
};
THREE.Frustum = function () {
    this.planes = [new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4]
};
THREE.Frustum.prototype.setFromMatrix = function (a) {
    var b, c = this.planes;
    c[0].set(a.n41 - a.n11, a.n42 - a.n12, a.n43 - a.n13, a.n44 - a.n14);
    c[1].set(a.n41 + a.n11, a.n42 + a.n12, a.n43 + a.n13, a.n44 + a.n14);
    c[2].set(a.n41 + a.n21, a.n42 + a.n22, a.n43 + a.n23, a.n44 + a.n24);
    c[3].set(a.n41 - a.n21, a.n42 - a.n22, a.n43 - a.n23, a.n44 - a.n24);
    c[4].set(a.n41 - a.n31, a.n42 - a.n32, a.n43 - a.n33, a.n44 - a.n34);
    c[5].set(a.n41 + a.n31, a.n42 + a.n32, a.n43 + a.n33, a.n44 + a.n34);
    for (a = 0; 6 > a; a++) b = c[a], b.divideScalar(Math.sqrt(b.x * b.x + b.y * b.y + b.z * b.z))
};
THREE.Frustum.prototype.contains = function (a) {
    for (var b = this.planes, c = a.matrixWorld, d = THREE.Frustum.__v1.set(c.getColumnX().length(), c.getColumnY().length(), c.getColumnZ().length()), d = -a.geometry.boundingSphere.radius * Math.max(d.x, Math.max(d.y, d.z)), e = 0; 6 > e; e++) if (a = b[e].x * c.n14 + b[e].y * c.n24 + b[e].z * c.n34 + b[e].w, a <= d) return !1;
    return !0
};
THREE.Frustum.__v1 = new THREE.Vector3;
THREE.Ray = function (a, b) {
    function c(a, b, c) {
        r.sub(c, a);
        s = r.dot(b);
        u = n.add(a, q.copy(b).multiplyScalar(s));
        return v = c.distanceTo(u)
    }
    function d(a, b, c, d) {
        r.sub(d, b);
        n.sub(c, b);
        q.sub(a, b);
        t = r.dot(r);
        w = r.dot(n);
        z = r.dot(q);
        F = n.dot(n);
        C = n.dot(q);
        G = 1 / (t * F - w * w);
        K = (F * z - w * C) * G;
        N = (t * C - w * z) * G;
        return 0 <= K && 0 <= N && 1 > K + N
    }
    this.origin = a || new THREE.Vector3;
    this.direction = b || new THREE.Vector3;
    var e = 1.0E-4;
    this.setPrecision = function (a) {
        e = a
    };
    var f = new THREE.Vector3,
        g = new THREE.Vector3,
        h = new THREE.Vector3,
        l = new THREE.Vector3,
        j = new THREE.Vector3,
        k = new THREE.Vector3,
        p = new THREE.Vector3,
        m = new THREE.Vector3,
        o = new THREE.Vector3;
    this.intersectObject = function (a) {
        var b, n = [];
        if (a instanceof THREE.Particle) {
            var r = c(this.origin, this.direction, a.matrixWorld.getPosition());
            if (r > a.scale.x) return [];
            b = {
                distance: r,
                point: a.position,
                face: null,
                object: a
            };
            n.push(b)
        } else if (a instanceof THREE.Mesh) {
            var r = c(this.origin, this.direction, a.matrixWorld.getPosition()),
                q = THREE.Frustum.__v1.set(a.matrixWorld.getColumnX().length(), a.matrixWorld.getColumnY().length(), a.matrixWorld.getColumnZ().length());
            if (r > a.geometry.boundingSphere.radius * Math.max(q.x, Math.max(q.y, q.z))) return n;
            var s, i, t = a.geometry,
                v = t.vertices,
                A;
            a.matrixRotationWorld.extractRotation(a.matrixWorld);
            for (r = 0, q = t.faces.length; r < q; r++) if (b = t.faces[r], j.copy(this.origin), k.copy(this.direction), A = a.matrixWorld, p = A.multiplyVector3(p.copy(b.centroid)).subSelf(j), m = a.matrixRotationWorld.multiplyVector3(m.copy(b.normal)), s = k.dot(m), !(Math.abs(s) < e) && (i = m.dot(p) / s, !(0 > i) && (a.doubleSided || (a.flipSided ? 0 < s : 0 > s)))) if (o.add(j, k.multiplyScalar(i)), b instanceof THREE.Face3) f = A.multiplyVector3(f.copy(v[b.a].position)), g = A.multiplyVector3(g.copy(v[b.b].position)), h = A.multiplyVector3(h.copy(v[b.c].position)), d(o, f, g, h) && (b = {
                distance: j.distanceTo(o),
                point: o.clone(),
                face: b,
                object: a
            }, n.push(b));
            else if (b instanceof THREE.Face4 && (f = A.multiplyVector3(f.copy(v[b.a].position)), g = A.multiplyVector3(g.copy(v[b.b].position)), h = A.multiplyVector3(h.copy(v[b.c].position)), l = A.multiplyVector3(l.copy(v[b.d].position)), d(o, f, g, l) || d(o, g, h, l))) b = {
                distance: j.distanceTo(o),
                point: o.clone(),
                face: b,
                object: a
            }, n.push(b)
        }
        return n
    };
    this.intersectObjects = function (a) {
        for (var b = [], c = 0, d = a.length; c < d; c++) Array.prototype.push.apply(b, this.intersectObject(a[c]));
        b.sort(function (a, b) {
            return a.distance - b.distance
        });
        return b
    };
    var r = new THREE.Vector3,
        n = new THREE.Vector3,
        q = new THREE.Vector3,
        s, u, v, t, w, z, F, C, G, K, N
};
THREE.Rectangle = function () {
    function a() {
        f = d - b;
        g = e - c
    }
    var b, c, d, e, f, g, h = !0;
    this.getX = function () {
        return b
    };
    this.getY = function () {
        return c
    };
    this.getWidth = function () {
        return f
    };
    this.getHeight = function () {
        return g
    };
    this.getLeft = function () {
        return b
    };
    this.getTop = function () {
        return c
    };
    this.getRight = function () {
        return d
    };
    this.getBottom = function () {
        return e
    };
    this.set = function (f, g, k, p) {
        h = !1;
        b = f;
        c = g;
        d = k;
        e = p;
        a()
    };
    this.addPoint = function (f, g) {
        h ? (h = !1, b = f, c = g, d = f, e = g) : (b = b < f ? b : f, c = c < g ? c : g, d = d > f ? d : f, e = e > g ? e : g);
        a()
    };
    this.add3Points = function (f, g, k, p, m, o) {
        h ? (h = !1, b = f < k ? f < m ? f : m : k < m ? k : m, c = g < p ? g < o ? g : o : p < o ? p : o, d = f > k ? f > m ? f : m : k > m ? k : m, e = g > p ? g > o ? g : o : p > o ? p : o) : (b = f < k ? f < m ? f < b ? f : b : m < b ? m : b : k < m ? k < b ? k : b : m < b ? m : b, c = g < p ? g < o ? g < c ? g : c : o < c ? o : c : p < o ? p < c ? p : c : o < c ? o : c, d = f > k ? f > m ? f > d ? f : d : m > d ? m : d : k > m ? k > d ? k : d : m > d ? m : d, e = g > p ? g > o ? g > e ? g : e : o > e ? o : e : p > o ? p > e ? p : e : o > e ? o : e);
        a()
    };
    this.addRectangle = function (f) {
        h ? (h = !1, b = f.getLeft(), c = f.getTop(), d = f.getRight(), e = f.getBottom()) : (b = b < f.getLeft() ? b : f.getLeft(), c = c < f.getTop() ? c : f.getTop(), d = d > f.getRight() ? d : f.getRight(), e = e > f.getBottom() ? e : f.getBottom());
        a()
    };
    this.inflate = function (f) {
        b -= f;
        c -= f;
        d += f;
        e += f;
        a()
    };
    this.minSelf = function (f) {
        b = b > f.getLeft() ? b : f.getLeft();
        c = c > f.getTop() ? c : f.getTop();
        d = d < f.getRight() ? d : f.getRight();
        e = e < f.getBottom() ? e : f.getBottom();
        a()
    };
    this.intersects = function (a) {
        return d < a.getLeft() || b > a.getRight() || e < a.getTop() || c > a.getBottom() ? !1 : !0
    };
    this.empty = function () {
        h = !0;
        e = d = c = b = 0;
        a()
    };
    this.isEmpty = function () {
        return h
    }
};
THREE.Math = {
    clamp: function (a, b, c) {
        return a < b ? b : a > c ? c : a
    },
    clampBottom: function (a, b) {
        return a < b ? b : a
    },
    mapLinear: function (a, b, c, d, e) {
        return d + (a - b) * (e - d) / (c - b)
    },
    random16: function () {
        return (65280 * Math.random() + 255 * Math.random()) / 65535
    },
    randInt: function (a, b) {
        return a + Math.floor(Math.random() * (b - a + 1))
    },
    randFloat: function (a, b) {
        return a + Math.random() * (b - a)
    },
    randFloatSpread: function (a) {
        return a * (0.5 - Math.random())
    },
    sign: function (a) {
        return 0 > a ? -1 : 0 < a ? 1 : 0
    }
};
THREE.Matrix3 = function () {
    this.m = []
};
THREE.Matrix3.prototype = {
    constructor: THREE.Matrix3,
    getInverse: function (a) {
        var b = a.n33 * a.n22 - a.n32 * a.n23,
            c = -a.n33 * a.n21 + a.n31 * a.n23,
            d = a.n32 * a.n21 - a.n31 * a.n22,
            e = -a.n33 * a.n12 + a.n32 * a.n13,
            f = a.n33 * a.n11 - a.n31 * a.n13,
            g = -a.n32 * a.n11 + a.n31 * a.n12,
            h = a.n23 * a.n12 - a.n22 * a.n13,
            l = -a.n23 * a.n11 + a.n21 * a.n13,
            j = a.n22 * a.n11 - a.n21 * a.n12,
            a = a.n11 * b + a.n21 * e + a.n31 * h;
        0 === a && console.warn("Matrix3.getInverse(): determinant == 0");
        var a = 1 / a,
            k = this.m;
        k[0] = a * b;
        k[1] = a * c;
        k[2] = a * d;
        k[3] = a * e;
        k[4] = a * f;
        k[5] = a * g;
        k[6] = a * h;
        k[7] = a * l;
        k[8] = a * j;
        return this
    },
    transposeIntoArray: function (a) {
        var b = this.m;
        a[0] = b[0];
        a[1] = b[3];
        a[2] = b[6];
        a[3] = b[1];
        a[4] = b[4];
        a[5] = b[7];
        a[6] = b[2];
        a[7] = b[5];
        a[8] = b[8];
        return this
    }
};
THREE.Matrix4 = function (a, b, c, d, e, f, g, h, l, j, k, p, m, o, r, n) {
    this.set(void 0 !== a ? a : 1, b || 0, c || 0, d || 0, e || 0, void 0 !== f ? f : 1, g || 0, h || 0, l || 0, j || 0, void 0 !== k ? k : 1, p || 0, m || 0, o || 0, r || 0, void 0 !== n ? n : 1)
};
THREE.Matrix4.prototype = {
    constructor: THREE.Matrix4,
    set: function (a, b, c, d, e, f, g, h, l, j, k, p, m, o, r, n) {
        this.n11 = a;
        this.n12 = b;
        this.n13 = c;
        this.n14 = d;
        this.n21 = e;
        this.n22 = f;
        this.n23 = g;
        this.n24 = h;
        this.n31 = l;
        this.n32 = j;
        this.n33 = k;
        this.n34 = p;
        this.n41 = m;
        this.n42 = o;
        this.n43 = r;
        this.n44 = n;
        return this
    },
    identity: function () {
        this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this
    },
    copy: function (a) {
        this.set(a.n11, a.n12, a.n13, a.n14, a.n21, a.n22, a.n23, a.n24, a.n31, a.n32, a.n33, a.n34, a.n41, a.n42, a.n43, a.n44);
        return this
    },
    lookAt: function (a, b, c) {
        var d = THREE.Matrix4.__v1,
            e = THREE.Matrix4.__v2,
            f = THREE.Matrix4.__v3;
        f.sub(a, b).normalize();
        if (0 === f.length()) f.z = 1;
        d.cross(c, f).normalize();
        0 === d.length() && (f.x += 1.0E-4, d.cross(c, f).normalize());
        e.cross(f, d);
        this.n11 = d.x;
        this.n12 = e.x;
        this.n13 = f.x;
        this.n21 = d.y;
        this.n22 = e.y;
        this.n23 = f.y;
        this.n31 = d.z;
        this.n32 = e.z;
        this.n33 = f.z;
        return this
    },
    multiply: function (a, b) {
        var c = a.n11,
            d = a.n12,
            e = a.n13,
            f = a.n14,
            g = a.n21,
            h = a.n22,
            l = a.n23,
            j = a.n24,
            k = a.n31,
            p = a.n32,
            m = a.n33,
            o = a.n34,
            r = a.n41,
            n = a.n42,
            q = a.n43,
            s = a.n44,
            u = b.n11,
            v = b.n12,
            t = b.n13,
            w = b.n14,
            z = b.n21,
            F = b.n22,
            C = b.n23,
            G = b.n24,
            K = b.n31,
            N = b.n32,
            P = b.n33,
            T = b.n34,
            O = b.n41,
            J = b.n42,
            I = b.n43,
            D = b.n44;
        this.n11 = c * u + d * z + e * K + f * O;
        this.n12 = c * v + d * F + e * N + f * J;
        this.n13 = c * t + d * C + e * P + f * I;
        this.n14 = c * w + d * G + e * T + f * D;
        this.n21 = g * u + h * z + l * K + j * O;
        this.n22 = g * v + h * F + l * N + j * J;
        this.n23 = g * t + h * C + l * P + j * I;
        this.n24 = g * w + h * G + l * T + j * D;
        this.n31 = k * u + p * z + m * K + o * O;
        this.n32 = k * v + p * F + m * N + o * J;
        this.n33 = k * t + p * C + m * P + o * I;
        this.n34 = k * w + p * G + m * T + o * D;
        this.n41 = r * u + n * z + q * K + s * O;
        this.n42 = r * v + n * F + q * N + s * J;
        this.n43 = r * t + n * C + q * P + s * I;
        this.n44 = r * w + n * G + q * T + s * D;
        return this
    },
    multiplySelf: function (a) {
        return this.multiply(this, a)
    },
    multiplyToArray: function (a, b, c) {
        this.multiply(a, b);
        c[0] = this.n11;
        c[1] = this.n21;
        c[2] = this.n31;
        c[3] = this.n41;
        c[4] = this.n12;
        c[5] = this.n22;
        c[6] = this.n32;
        c[7] = this.n42;
        c[8] = this.n13;
        c[9] = this.n23;
        c[10] = this.n33;
        c[11] = this.n43;
        c[12] = this.n14;
        c[13] = this.n24;
        c[14] = this.n34;
        c[15] = this.n44;
        return this
    },
    multiplyScalar: function (a) {
        this.n11 *= a;
        this.n12 *= a;
        this.n13 *= a;
        this.n14 *= a;
        this.n21 *= a;
        this.n22 *= a;
        this.n23 *= a;
        this.n24 *= a;
        this.n31 *= a;
        this.n32 *= a;
        this.n33 *= a;
        this.n34 *= a;
        this.n41 *= a;
        this.n42 *= a;
        this.n43 *= a;
        this.n44 *= a;
        return this
    },
    multiplyVector3: function (a) {
        var b = a.x,
            c = a.y,
            d = a.z,
            e = 1 / (this.n41 * b + this.n42 * c + this.n43 * d + this.n44);
        a.x = (this.n11 * b + this.n12 * c + this.n13 * d + this.n14) * e;
        a.y = (this.n21 * b + this.n22 * c + this.n23 * d + this.n24) * e;
        a.z = (this.n31 * b + this.n32 * c + this.n33 * d + this.n34) * e;
        return a
    },
    multiplyVector4: function (a) {
        var b = a.x,
            c = a.y,
            d = a.z,
            e = a.w;
        a.x = this.n11 * b + this.n12 * c + this.n13 * d + this.n14 * e;
        a.y = this.n21 * b + this.n22 * c + this.n23 * d + this.n24 * e;
        a.z = this.n31 * b + this.n32 * c + this.n33 * d + this.n34 * e;
        a.w = this.n41 * b + this.n42 * c + this.n43 * d + this.n44 * e;
        return a
    },
    rotateAxis: function (a) {
        var b = a.x,
            c = a.y,
            d = a.z;
        a.x = b * this.n11 + c * this.n12 + d * this.n13;
        a.y = b * this.n21 + c * this.n22 + d * this.n23;
        a.z = b * this.n31 + c * this.n32 + d * this.n33;
        a.normalize();
        return a
    },
    crossVector: function (a) {
        var b = new THREE.Vector4;
        b.x = this.n11 * a.x + this.n12 * a.y + this.n13 * a.z + this.n14 * a.w;
        b.y = this.n21 * a.x + this.n22 * a.y + this.n23 * a.z + this.n24 * a.w;
        b.z = this.n31 * a.x + this.n32 * a.y + this.n33 * a.z + this.n34 * a.w;
        b.w = a.w ? this.n41 * a.x + this.n42 * a.y + this.n43 * a.z + this.n44 * a.w : 1;
        return b
    },
    determinant: function () {
        var a = this.n11,
            b = this.n12,
            c = this.n13,
            d = this.n14,
            e = this.n21,
            f = this.n22,
            g = this.n23,
            h = this.n24,
            l = this.n31,
            j = this.n32,
            k = this.n33,
            p = this.n34,
            m = this.n41,
            o = this.n42,
            r = this.n43,
            n = this.n44;
        return d * g * j * m - c * h * j * m - d * f * k * m + b * h * k * m + c * f * p * m - b * g * p * m - d * g * l * o + c * h * l * o + d * e * k * o - a * h * k * o - c * e * p * o + a * g * p * o + d * f * l * r - b * h * l * r - d * e * j * r + a * h * j * r + b * e * p * r - a * f * p * r - c * f * l * n + b * g * l * n + c * e * j * n - a * g * j * n - b * e * k * n + a * f * k * n
    },
    transpose: function () {
        var a;
        a = this.n21;
        this.n21 = this.n12;
        this.n12 = a;
        a = this.n31;
        this.n31 = this.n13;
        this.n13 = a;
        a = this.n32;
        this.n32 = this.n23;
        this.n23 = a;
        a = this.n41;
        this.n41 = this.n14;
        this.n14 = a;
        a = this.n42;
        this.n42 = this.n24;
        this.n24 = a;
        a = this.n43;
        this.n43 = this.n34;
        this.n34 = a;
        return this
    },
    flattenToArray: function (a) {
        a[0] = this.n11;
        a[1] = this.n21;
        a[2] = this.n31;
        a[3] = this.n41;
        a[4] = this.n12;
        a[5] = this.n22;
        a[6] = this.n32;
        a[7] = this.n42;
        a[8] = this.n13;
        a[9] = this.n23;
        a[10] = this.n33;
        a[11] = this.n43;
        a[12] = this.n14;
        a[13] = this.n24;
        a[14] = this.n34;
        a[15] = this.n44;
        return a
    },
    flattenToArrayOffset: function (a, b) {
        a[b] = this.n11;
        a[b + 1] = this.n21;
        a[b + 2] = this.n31;
        a[b + 3] = this.n41;
        a[b + 4] = this.n12;
        a[b + 5] = this.n22;
        a[b + 6] = this.n32;
        a[b + 7] = this.n42;
        a[b + 8] = this.n13;
        a[b + 9] = this.n23;
        a[b + 10] = this.n33;
        a[b + 11] = this.n43;
        a[b + 12] = this.n14;
        a[b + 13] = this.n24;
        a[b + 14] = this.n34;
        a[b + 15] = this.n44;
        return a
    },
    getPosition: function () {
        return THREE.Matrix4.__v1.set(this.n14, this.n24, this.n34)
    },
    setPosition: function (a) {
        this.n14 = a.x;
        this.n24 = a.y;
        this.n34 = a.z;
        return this
    },
    getColumnX: function () {
        return THREE.Matrix4.__v1.set(this.n11, this.n21, this.n31)
    },
    getColumnY: function () {
        return THREE.Matrix4.__v1.set(this.n12, this.n22, this.n32)
    },
    getColumnZ: function () {
        return THREE.Matrix4.__v1.set(this.n13, this.n23, this.n33)
    },
    getInverse: function (a) {
        var b = a.n11,
            c = a.n12,
            d = a.n13,
            e = a.n14,
            f = a.n21,
            g = a.n22,
            h = a.n23,
            l = a.n24,
            j = a.n31,
            k = a.n32,
            p = a.n33,
            m = a.n34,
            o = a.n41,
            r = a.n42,
            n = a.n43,
            q = a.n44;
        this.n11 = h * m * r - l * p * r + l * k * n - g * m * n - h * k * q + g * p * q;
        this.n12 = e * p * r - d * m * r - e * k * n + c * m * n + d * k * q - c * p * q;
        this.n13 = d * l * r - e * h * r + e * g * n - c * l * n - d * g * q + c * h * q;
        this.n14 = e * h * k - d * l * k - e * g * p + c * l * p + d * g * m - c * h * m;
        this.n21 = l * p * o - h * m * o - l * j * n + f * m * n + h * j * q - f * p * q;
        this.n22 = d * m * o - e * p * o + e * j * n - b * m * n - d * j * q + b * p * q;
        this.n23 = e * h * o - d * l * o - e * f * n + b * l * n + d * f * q - b * h * q;
        this.n24 = d * l * j - e * h * j + e * f * p - b * l * p - d * f * m + b * h * m;
        this.n31 = g * m * o - l * k * o + l * j * r - f * m * r - g * j * q + f * k * q;
        this.n32 = e * k * o - c * m * o - e * j * r + b * m * r + c * j * q - b * k * q;
        this.n33 = c * l * o - e * g * o + e * f * r - b * l * r - c * f * q + b * g * q;
        this.n34 = e * g * j - c * l * j - e * f * k + b * l * k + c * f * m - b * g * m;
        this.n41 = h * k * o - g * p * o - h * j * r + f * p * r + g * j * n - f * k * n;
        this.n42 = c * p * o - d * k * o + d * j * r - b * p * r - c * j * n + b * k * n;
        this.n43 = d * g * o - c * h * o - d * f * r + b * h * r + c * f * n - b * g * n;
        this.n44 = c * h * j - d * g * j + d * f * k - b * h * k - c * f * p + b * g * p;
        this.multiplyScalar(1 / a.determinant());
        return this
    },
    setRotationFromEuler: function (a, b) {
        var c = a.x,
            d = a.y,
            e = a.z,
            f = Math.cos(c),
            c = Math.sin(c),
            g = Math.cos(d),
            d = Math.sin(d),
            h = Math.cos(e),
            e = Math.sin(e);
        switch (b) {
        case "YXZ":
            var l = g * h,
                j = g * e,
                k = d * h,
                p = d * e;
            this.n11 = l + p * c;
            this.n12 = k * c - j;
            this.n13 = f * d;
            this.n21 = f * e;
            this.n22 = f * h;
            this.n23 = -c;
            this.n31 = j * c - k;
            this.n32 = p + l * c;
            this.n33 = f * g;
            break;
        case "ZXY":
            l = g * h;
            j = g * e;
            k = d * h;
            p = d * e;
            this.n11 = l - p * c;
            this.n12 = -f * e;
            this.n13 = k + j * c;
            this.n21 = j + k * c;
            this.n22 = f * h;
            this.n23 = p - l * c;
            this.n31 = -f * d;
            this.n32 = c;
            this.n33 = f * g;
            break;
        case "ZYX":
            l = f * h;
            j = f * e;
            k = c * h;
            p = c * e;
            this.n11 = g * h;
            this.n12 = k * d - j;
            this.n13 = l * d + p;
            this.n21 = g * e;
            this.n22 = p * d + l;
            this.n23 = j * d - k;
            this.n31 = -d;
            this.n32 = c * g;
            this.n33 = f * g;
            break;
        case "YZX":
            l = f * g;
            j = f * d;
            k = c * g;
            p = c * d;
            this.n11 = g * h;
            this.n12 = p - l * e;
            this.n13 = k * e + j;
            this.n21 = e;
            this.n22 = f * h;
            this.n23 = -c * h;
            this.n31 = -d * h;
            this.n32 = j * e + k;
            this.n33 = l - p * e;
            break;
        case "XZY":
            l = f * g;
            j = f * d;
            k = c * g;
            p = c * d;
            this.n11 = g * h;
            this.n12 = -e;
            this.n13 = d * h;
            this.n21 = l * e + p;
            this.n22 = f * h;
            this.n23 = j * e - k;
            this.n31 = k * e - j;
            this.n32 = c * h;
            this.n33 = p * e + l;
            break;
        default:
            l = f * h, j = f * e, k = c * h, p = c * e, this.n11 = g * h, this.n12 = -g * e, this.n13 = d, this.n21 = j + k * d, this.n22 = l - p * d, this.n23 = -c * g, this.n31 = p - l * d, this.n32 = k + j * d, this.n33 = f * g
        }
        return this
    },
    setRotationFromQuaternion: function (a) {
        var b = a.x,
            c = a.y,
            d = a.z,
            e = a.w,
            f = b + b,
            g = c + c,
            h = d + d,
            a = b * f,
            l = b * g,
            b = b * h,
            j = c * g,
            c = c * h,
            d = d * h,
            f = e * f,
            g = e * g,
            e = e * h;
        this.n11 = 1 - (j + d);
        this.n12 = l - e;
        this.n13 = b + g;
        this.n21 = l + e;
        this.n22 = 1 - (a + d);
        this.n23 = c - f;
        this.n31 = b - g;
        this.n32 = c + f;
        this.n33 = 1 - (a + j);
        return this
    },
    compose: function (a, b, c) {
        var d = THREE.Matrix4.__m1,
            e = THREE.Matrix4.__m2;
        d.identity();
        d.setRotationFromQuaternion(b);
        e.makeScale(c.x, c.y, c.z);
        this.multiply(d, e);
        this.n14 = a.x;
        this.n24 = a.y;
        this.n34 = a.z;
        return this
    },
    decompose: function (a, b, c) {
        var d = THREE.Matrix4.__v1,
            e = THREE.Matrix4.__v2,
            f = THREE.Matrix4.__v3;
        d.set(this.n11, this.n21, this.n31);
        e.set(this.n12, this.n22, this.n32);
        f.set(this.n13, this.n23, this.n33);
        a = a instanceof THREE.Vector3 ? a : new THREE.Vector3;
        b = b instanceof THREE.Quaternion ? b : new THREE.Quaternion;
        c = c instanceof THREE.Vector3 ? c : new THREE.Vector3;
        c.x = d.length();
        c.y = e.length();
        c.z = f.length();
        a.x = this.n14;
        a.y = this.n24;
        a.z = this.n34;
        d = THREE.Matrix4.__m1;
        d.copy(this);
        d.n11 /= c.x;
        d.n21 /= c.x;
        d.n31 /= c.x;
        d.n12 /= c.y;
        d.n22 /= c.y;
        d.n32 /= c.y;
        d.n13 /= c.z;
        d.n23 /= c.z;
        d.n33 /= c.z;
        b.setFromRotationMatrix(d);
        return [a, b, c]
    },
    extractPosition: function (a) {
        this.n14 = a.n14;
        this.n24 = a.n24;
        this.n34 = a.n34;
        return this
    },
    extractRotation: function (a) {
        var b = THREE.Matrix4.__v1,
            c = 1 / b.set(a.n11, a.n21, a.n31).length(),
            d = 1 / b.set(a.n12, a.n22, a.n32).length(),
            b = 1 / b.set(a.n13, a.n23, a.n33).length();
        this.n11 = a.n11 * c;
        this.n21 = a.n21 * c;
        this.n31 = a.n31 * c;
        this.n12 = a.n12 * d;
        this.n22 = a.n22 * d;
        this.n32 = a.n32 * d;
        this.n13 = a.n13 * b;
        this.n23 = a.n23 * b;
        this.n33 = a.n33 * b;
        return this
    },
    translate: function (a) {
        var b = a.x,
            c = a.y,
            a = a.z;
        this.n14 = this.n11 * b + this.n12 * c + this.n13 * a + this.n14;
        this.n24 = this.n21 * b + this.n22 * c + this.n23 * a + this.n24;
        this.n34 = this.n31 * b + this.n32 * c + this.n33 * a + this.n34;
        this.n44 = this.n41 * b + this.n42 * c + this.n43 * a + this.n44;
        return this
    },
    rotateX: function (a) {
        var b = this.n12,
            c = this.n22,
            d = this.n32,
            e = this.n42,
            f = this.n13,
            g = this.n23,
            h = this.n33,
            l = this.n43,
            j = Math.cos(a),
            a = Math.sin(a);
        this.n12 = j * b + a * f;
        this.n22 = j * c + a * g;
        this.n32 = j * d + a * h;
        this.n42 = j * e + a * l;
        this.n13 = j * f - a * b;
        this.n23 = j * g - a * c;
        this.n33 = j * h - a * d;
        this.n43 = j * l - a * e;
        return this
    },
    rotateY: function (a) {
        var b = this.n11,
            c = this.n21,
            d = this.n31,
            e = this.n41,
            f = this.n13,
            g = this.n23,
            h = this.n33,
            l = this.n43,
            j = Math.cos(a),
            a = Math.sin(a);
        this.n11 = j * b - a * f;
        this.n21 = j * c - a * g;
        this.n31 = j * d - a * h;
        this.n41 = j * e - a * l;
        this.n13 = j * f + a * b;
        this.n23 = j * g + a * c;
        this.n33 = j * h + a * d;
        this.n43 = j * l + a * e;
        return this
    },
    rotateZ: function (a) {
        var b = this.n11,
            c = this.n21,
            d = this.n31,
            e = this.n41,
            f = this.n12,
            g = this.n22,
            h = this.n32,
            l = this.n42,
            j = Math.cos(a),
            a = Math.sin(a);
        this.n11 = j * b + a * f;
        this.n21 = j * c + a * g;
        this.n31 = j * d + a * h;
        this.n41 = j * e + a * l;
        this.n12 = j * f - a * b;
        this.n22 = j * g - a * c;
        this.n32 = j * h - a * d;
        this.n42 = j * l - a * e;
        return this
    },
    rotateByAxis: function (a, b) {
        if (1 === a.x && 0 === a.y && 0 === a.z) return this.rotateX(b);
        if (0 === a.x && 1 === a.y && 0 === a.z) return this.rotateY(b);
        if (0 === a.x && 0 === a.y && 1 === a.z) return this.rotateZ(b);
        var c = a.x,
            d = a.y,
            e = a.z,
            f = Math.sqrt(c * c + d * d + e * e),
            c = c / f,
            d = d / f,
            e = e / f,
            f = c * c,
            g = d * d,
            h = e * e,
            l = Math.cos(b),
            j = Math.sin(b),
            k = 1 - l,
            p = c * d * k,
            m = c * e * k,
            k = d * e * k,
            c = c * j,
            o = d * j,
            j = e * j,
            e = f + (1 - f) * l,
            f = p + j,
            d = m - o,
            p = p - j,
            g = g + (1 - g) * l,
            j = k + c,
            m = m + o,
            k = k - c,
            h = h + (1 - h) * l,
            l = this.n11,
            c = this.n21,
            o = this.n31,
            r = this.n41,
            n = this.n12,
            q = this.n22,
            s = this.n32,
            u = this.n42,
            v = this.n13,
            t = this.n23,
            w = this.n33,
            z = this.n43;
        this.n11 = e * l + f * n + d * v;
        this.n21 = e * c + f * q + d * t;
        this.n31 = e * o + f * s + d * w;
        this.n41 = e * r + f * u + d * z;
        this.n12 = p * l + g * n + j * v;
        this.n22 = p * c + g * q + j * t;
        this.n32 = p * o + g * s + j * w;
        this.n42 = p * r + g * u + j * z;
        this.n13 = m * l + k * n + h * v;
        this.n23 = m * c + k * q + h * t;
        this.n33 = m * o + k * s + h * w;
        this.n43 = m * r + k * u + h * z;
        return this
    },
    scale: function (a) {
        var b = a.x,
            c = a.y,
            a = a.z;
        this.n11 *= b;
        this.n12 *= c;
        this.n13 *= a;
        this.n21 *= b;
        this.n22 *= c;
        this.n23 *= a;
        this.n31 *= b;
        this.n32 *= c;
        this.n33 *= a;
        this.n41 *= b;
        this.n42 *= c;
        this.n43 *= a;
        return this
    },
    makeTranslation: function (a, b, c) {
        this.set(1, 0, 0, a, 0, 1, 0, b, 0, 0, 1, c, 0, 0, 0, 1);
        return this
    },
    makeRotationX: function (a) {
        var b = Math.cos(a),
            a = Math.sin(a);
        this.set(1, 0, 0, 0, 0, b, -a, 0, 0, a, b, 0, 0, 0, 0, 1);
        return this
    },
    makeRotationY: function (a) {
        var b = Math.cos(a),
            a = Math.sin(a);
        this.set(b, 0, a, 0, 0, 1, 0, 0, -a, 0, b, 0, 0, 0, 0, 1);
        return this
    },
    makeRotationZ: function (a) {
        var b = Math.cos(a),
            a = Math.sin(a);
        this.set(b, -a, 0, 0, a, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this
    },
    makeRotationAxis: function (a, b) {
        var c = Math.cos(b),
            d = Math.sin(b),
            e = 1 - c,
            f = a.x,
            g = a.y,
            h = a.z,
            l = e * f,
            j = e * g;
        this.set(l * f + c, l * g - d * h, l * h + d * g, 0, l * g + d * h, j * g + c, j * h - d * f, 0, l * h - d * g, j * h + d * f, e * h * h + c, 0, 0, 0, 0, 1);
        return this
    },
    makeScale: function (a, b, c) {
        this.set(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1);
        return this
    },
    makeFrustum: function (a, b, c, d, e, f) {
        this.n11 = 2 * e / (b - a);
        this.n12 = 0;
        this.n13 = (b + a) / (b - a);
        this.n21 = this.n14 = 0;
        this.n22 = 2 * e / (d - c);
        this.n23 = (d + c) / (d - c);
        this.n32 = this.n31 = this.n24 = 0;
        this.n33 = -(f + e) / (f - e);
        this.n34 = -2 * f * e / (f - e);
        this.n42 = this.n41 = 0;
        this.n43 = -1;
        this.n44 = 0;
        return this
    },
    makePerspective: function (a, b, c, d) {
        var a = c * Math.tan(a * Math.PI / 360),
            e = -a;
        return this.makeFrustum(e * b, a * b, e, a, c, d)
    },
    makeOrthographic: function (a, b, c, d, e, f) {
        var g = b - a,
            h = c - d,
            l = f - e;
        this.n11 = 2 / g;
        this.n13 = this.n12 = 0;
        this.n14 = -((b + a) / g);
        this.n21 = 0;
        this.n22 = 2 / h;
        this.n23 = 0;
        this.n24 = -((c + d) / h);
        this.n32 = this.n31 = 0;
        this.n33 = -2 / l;
        this.n34 = -((f + e) / l);
        this.n43 = this.n42 = this.n41 = 0;
        this.n44 = 1;
        return this
    },
    clone: function () {
        return new THREE.Matrix4(this.n11, this.n12, this.n13, this.n14, this.n21, this.n22, this.n23, this.n24, this.n31, this.n32, this.n33, this.n34, this.n41, this.n42, this.n43, this.n44)
    }
};
THREE.Matrix4.__v1 = new THREE.Vector3;
THREE.Matrix4.__v2 = new THREE.Vector3;
THREE.Matrix4.__v3 = new THREE.Vector3;
THREE.Matrix4.__m1 = new THREE.Matrix4;
THREE.Matrix4.__m2 = new THREE.Matrix4;
THREE.Object3D = function () {
    this.id = THREE.Object3DCount++;
    this.name = "";
    this.parent = void 0;
    this.children = [];
    this.up = new THREE.Vector3(0, 1, 0);
    this.position = new THREE.Vector3;
    this.rotation = new THREE.Vector3;
    this.eulerOrder = "XYZ";
    this.scale = new THREE.Vector3(1, 1, 1);
    this.flipSided = this.doubleSided = !1;
    this.renderDepth = null;
    this.rotationAutoUpdate = !0;
    this.matrix = new THREE.Matrix4;
    this.matrixWorld = new THREE.Matrix4;
    this.matrixRotationWorld = new THREE.Matrix4;
    this.matrixWorldNeedsUpdate = this.matrixAutoUpdate = !0;
    this.quaternion = new THREE.Quaternion;
    this.useQuaternion = !1;
    this.boundRadius = 0;
    this.boundRadiusScale = 1;
    this.visible = !0;
    this.receiveShadow = this.castShadow = !1;
    this.frustumCulled = !0;
    this._vector = new THREE.Vector3
};
THREE.Object3D.prototype = {
    constructor: THREE.Object3D,
    applyMatrix: function (a) {
        this.matrix.multiply(a, this.matrix);
        this.scale.getScaleFromMatrix(this.matrix);
        this.rotation.getRotationFromMatrix(this.matrix, this.scale);
        this.position.getPositionFromMatrix(this.matrix)
    },
    translate: function (a, b) {
        this.matrix.rotateAxis(b);
        this.position.addSelf(b.multiplyScalar(a))
    },
    translateX: function (a) {
        this.translate(a, this._vector.set(1, 0, 0))
    },
    translateY: function (a) {
        this.translate(a, this._vector.set(0, 1, 0))
    },
    translateZ: function (a) {
        this.translate(a, this._vector.set(0, 0, 1))
    },
    lookAt: function (a) {
        this.matrix.lookAt(a, this.position, this.up);
        this.rotationAutoUpdate && this.rotation.getRotationFromMatrix(this.matrix)
    },
    add: function (a) {
        if (a === this) console.warn("THREE.Object3D.add: An object can't be added as a child of itself.");
        else if (-1 === this.children.indexOf(a)) {
            void 0 !== a.parent && a.parent.remove(a);
            a.parent = this;
            this.children.push(a);
            for (var b = this; void 0 !== b.parent;) b = b.parent;
            void 0 !== b && b instanceof THREE.Scene && b.__addObject(a)
        }
    },
    remove: function (a) {
        var b = this.children.indexOf(a);
        if (-1 !== b) {
            a.parent = void 0;
            this.children.splice(b, 1);
            for (b = this; void 0 !== b.parent;) b = b.parent;
            void 0 !== b && b instanceof THREE.Scene && b.__removeObject(a)
        }
    },
    getChildByName: function (a, b) {
        var c, d, e;
        for (c = 0, d = this.children.length; c < d; c++) {
            e = this.children[c];
            if (e.name === a || b && (e = e.getChildByName(a, b), void 0 !== e)) return e
        }
    },
    updateMatrix: function () {
        this.matrix.setPosition(this.position);
        this.useQuaternion ? this.matrix.setRotationFromQuaternion(this.quaternion) : this.matrix.setRotationFromEuler(this.rotation, this.eulerOrder);
        if (1 !== this.scale.x || 1 !== this.scale.y || 1 !== this.scale.z) this.matrix.scale(this.scale), this.boundRadiusScale = Math.max(this.scale.x, Math.max(this.scale.y, this.scale.z));
        this.matrixWorldNeedsUpdate = !0
    },
    updateMatrixWorld: function (a) {
        this.matrixAutoUpdate && this.updateMatrix();
        if (this.matrixWorldNeedsUpdate || a) this.parent ? this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, a = !0;
        for (var b = 0, c = this.children.length; b < c; b++) this.children[b].updateMatrixWorld(a)
    }
};
THREE.Object3DCount = 0;
THREE.Projector = function () {
    function a() {
        var a = g[f] = g[f] || new THREE.RenderableObject;
        f++;
        return a
    }
    function b() {
        var a = j[l] = j[l] || new THREE.RenderableVertex;
        l++;
        return a
    }
    function c(a, b) {
        return b.z - a.z
    }
    function d(a, b) {
        var c = 0,
            d = 1,
            e = a.z + a.w,
            f = b.z + b.w,
            g = -a.z + a.w,
            h = -b.z + b.w;
        if (0 <= e && 0 <= f && 0 <= g && 0 <= h) return !0;
        if (0 > e && 0 > f || 0 > g && 0 > h) return !1;
        0 > e ? c = Math.max(c, e / (e - f)) : 0 > f && (d = Math.min(d, e / (e - f)));
        0 > g ? c = Math.max(c, g / (g - h)) : 0 > h && (d = Math.min(d, g / (g - h)));
        if (d < c) return !1;
        a.lerpSelf(b, c);
        b.lerpSelf(a, 1 - d);
        return !0
    }
    var e, f, g = [],
        h, l, j = [],
        k, p, m = [],
        o, r = [],
        n, q, s = [],
        u, v, t = [],
        w = {
            objects: [],
            sprites: [],
            lights: [],
            elements: []
        },
        z = new THREE.Vector3,
        F = new THREE.Vector4,
        C = new THREE.Matrix4,
        G = new THREE.Matrix4,
        K = new THREE.Frustum,
        N = new THREE.Vector4,
        P = new THREE.Vector4;
    this.projectVector = function (a, b) {
        b.matrixWorldInverse.getInverse(b.matrixWorld);
        C.multiply(b.projectionMatrix, b.matrixWorldInverse);
        C.multiplyVector3(a);
        return a
    };
    this.unprojectVector = function (a, b) {
        b.projectionMatrixInverse.getInverse(b.projectionMatrix);
        C.multiply(b.matrixWorld, b.projectionMatrixInverse);
        C.multiplyVector3(a);
        return a
    };
    this.pickingRay = function (a, b) {
        var c;
        a.z = -1;
        c = new THREE.Vector3(a.x, a.y, 1);
        this.unprojectVector(a, b);
        this.unprojectVector(c, b);
        c.subSelf(a).normalize();
        return new THREE.Ray(a, c)
    };
    this.projectGraph = function (b, d) {
        f = 0;
        w.objects.length = 0;
        w.sprites.length = 0;
        w.lights.length = 0;
        var g = function (b) {
                if (!1 !== b.visible) {
                    (b instanceof THREE.Mesh || b instanceof THREE.Line) && (!1 === b.frustumCulled || K.contains(b)) ? (z.copy(b.matrixWorld.getPosition()), C.multiplyVector3(z), e = a(), e.object = b, e.z = z.z, w.objects.push(e)) : b instanceof THREE.Sprite || b instanceof THREE.Particle ? (z.copy(b.matrixWorld.getPosition()), C.multiplyVector3(z), e = a(), e.object = b, e.z = z.z, w.sprites.push(e)) : b instanceof THREE.Light && w.lights.push(b);
                    for (var c = 0, d = b.children.length; c < d; c++) g(b.children[c])
                }
            };
        g(b);
        d && w.objects.sort(c);
        return w
    };
    this.projectScene = function (a, e, f) {
        var g = e.near,
            D = e.far,
            i = !1,
            z, B, A, V, E, aa, ea, ia, R, $, ba, Z, ja, Ga, oa;
        v = q = o = p = 0;
        w.elements.length = 0;
        void 0 === e.parent && (console.warn("DEPRECATED: Camera hasn't been added to a Scene. Adding it..."), a.add(e));
        a.updateMatrixWorld();
        e.matrixWorldInverse.getInverse(e.matrixWorld);
        C.multiply(e.projectionMatrix, e.matrixWorldInverse);
        K.setFromMatrix(C);
        w = this.projectGraph(a, !1);
        for (a = 0, z = w.objects.length; a < z; a++) if (R = w.objects[a].object, $ = R.matrixWorld, l = 0, R instanceof THREE.Mesh) {
            ba = R.geometry;
            Z = R.geometry.materials;
            V = ba.vertices;
            ja = ba.faces;
            Ga = ba.faceVertexUvs;
            ba = R.matrixRotationWorld.extractRotation($);
            for (B = 0, A = V.length; B < A; B++) h = b(), h.positionWorld.copy(V[B].position), $.multiplyVector3(h.positionWorld), h.positionScreen.copy(h.positionWorld), C.multiplyVector4(h.positionScreen), h.positionScreen.x /= h.positionScreen.w, h.positionScreen.y /= h.positionScreen.w, h.visible = h.positionScreen.z > g && h.positionScreen.z < D;
            for (V = 0, B = ja.length; V < B; V++) {
                A = ja[V];
                if (A instanceof THREE.Face3) if (E = j[A.a], aa = j[A.b], ea = j[A.c], E.visible && aa.visible && ea.visible) if (i = 0 > (ea.positionScreen.x - E.positionScreen.x) * (aa.positionScreen.y - E.positionScreen.y) - (ea.positionScreen.y - E.positionScreen.y) * (aa.positionScreen.x - E.positionScreen.x), R.doubleSided || i != R.flipSided) ia = m[p] = m[p] || new THREE.RenderableFace3, p++, k = ia, k.v1.copy(E), k.v2.copy(aa), k.v3.copy(ea);
                else continue;
                else continue;
                else if (A instanceof THREE.Face4) if (E = j[A.a], aa = j[A.b], ea = j[A.c], ia = j[A.d], E.visible && aa.visible && ea.visible && ia.visible) if (i = 0 > (ia.positionScreen.x - E.positionScreen.x) * (aa.positionScreen.y - E.positionScreen.y) - (ia.positionScreen.y - E.positionScreen.y) * (aa.positionScreen.x - E.positionScreen.x) || 0 > (aa.positionScreen.x - ea.positionScreen.x) * (ia.positionScreen.y - ea.positionScreen.y) - (aa.positionScreen.y - ea.positionScreen.y) * (ia.positionScreen.x - ea.positionScreen.x), R.doubleSided || i != R.flipSided) oa = r[o] = r[o] || new THREE.RenderableFace4, o++, k = oa, k.v1.copy(E), k.v2.copy(aa), k.v3.copy(ea), k.v4.copy(ia);
                else continue;
                else continue;
                k.normalWorld.copy(A.normal);
                !i && (R.flipSided || R.doubleSided) && k.normalWorld.negate();
                ba.multiplyVector3(k.normalWorld);
                k.centroidWorld.copy(A.centroid);
                $.multiplyVector3(k.centroidWorld);
                k.centroidScreen.copy(k.centroidWorld);
                C.multiplyVector3(k.centroidScreen);
                ea = A.vertexNormals;
                for (E = 0, aa = ea.length; E < aa; E++) ia = k.vertexNormalsWorld[E], ia.copy(ea[E]), !i && (R.flipSided || R.doubleSided) && ia.negate(), ba.multiplyVector3(ia);
                for (E = 0, aa = Ga.length; E < aa; E++) if (oa = Ga[E][V]) for (ea = 0, ia = oa.length; ea < ia; ea++) k.uvs[E][ea] = oa[ea];
                k.material = R.material;
                k.faceMaterial = null !== A.materialIndex ? Z[A.materialIndex] : null;
                k.z = k.centroidScreen.z;
                w.elements.push(k)
            }
        } else if (R instanceof THREE.Line) {
            G.multiply(C, $);
            V = R.geometry.vertices;
            E = b();
            E.positionScreen.copy(V[0].position);
            G.multiplyVector4(E.positionScreen);
            $ = R.type === THREE.LinePieces ? 2 : 1;
            for (B = 1, A = V.length; B < A; B++) if (E = b(), E.positionScreen.copy(V[B].position), G.multiplyVector4(E.positionScreen), !(0 < (B + 1) % $) && (aa = j[l - 2], N.copy(E.positionScreen), P.copy(aa.positionScreen), d(N, P))) N.multiplyScalar(1 / N.w), P.multiplyScalar(1 / P.w), Z = s[q] = s[q] || new THREE.RenderableLine, q++, n = Z, n.v1.positionScreen.copy(N), n.v2.positionScreen.copy(P), n.z = Math.max(N.z, P.z), n.material = R.material, w.elements.push(n)
        }
        for (a = 0, z = w.sprites.length; a < z; a++) if (R = w.sprites[a].object, $ = R.matrixWorld, R instanceof THREE.Particle && (F.set($.n14, $.n24, $.n34, 1), C.multiplyVector4(F), F.z /= F.w, 0 < F.z && 1 > F.z)) g = t[v] = t[v] || new THREE.RenderableParticle, v++, u = g, u.x = F.x / F.w, u.y = F.y / F.w, u.z = F.z, u.rotation = R.rotation.z, u.scale.x = R.scale.x * Math.abs(u.x - (F.x + e.projectionMatrix.n11) / (F.w + e.projectionMatrix.n14)), u.scale.y = R.scale.y * Math.abs(u.y - (F.y + e.projectionMatrix.n22) / (F.w + e.projectionMatrix.n24)), u.material = R.material, w.elements.push(u);
        f && w.elements.sort(c);
        return w
    }
};
THREE.Quaternion = function (a, b, c, d) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0;
    this.w = void 0 !== d ? d : 1
};
THREE.Quaternion.prototype = {
    constructor: THREE.Quaternion,
    set: function (a, b, c, d) {
        this.x = a;
        this.y = b;
        this.z = c;
        this.w = d;
        return this
    },
    copy: function (a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        this.w = a.w;
        return this
    },
    setFromEuler: function (a) {
        var b = Math.PI / 360,
            c = a.x * b,
            d = a.y * b,
            e = a.z * b,
            a = Math.cos(d),
            d = Math.sin(d),
            b = Math.cos(-e),
            e = Math.sin(-e),
            f = Math.cos(c),
            c = Math.sin(c),
            g = a * b,
            h = d * e;
        this.w = g * f - h * c;
        this.x = g * c + h * f;
        this.y = d * b * f + a * e * c;
        this.z = a * e * f - d * b * c;
        return this
    },
    setFromAxisAngle: function (a, b) {
        var c = b / 2,
            d = Math.sin(c);
        this.x = a.x * d;
        this.y = a.y * d;
        this.z = a.z * d;
        this.w = Math.cos(c);
        return this
    },
    setFromRotationMatrix: function (a) {
        var b = Math.pow(a.determinant(), 1 / 3);
        this.w = Math.sqrt(Math.max(0, b + a.n11 + a.n22 + a.n33)) / 2;
        this.x = Math.sqrt(Math.max(0, b + a.n11 - a.n22 - a.n33)) / 2;
        this.y = Math.sqrt(Math.max(0, b - a.n11 + a.n22 - a.n33)) / 2;
        this.z = Math.sqrt(Math.max(0, b - a.n11 - a.n22 + a.n33)) / 2;
        this.x = 0 > a.n32 - a.n23 ? -Math.abs(this.x) : Math.abs(this.x);
        this.y = 0 > a.n13 - a.n31 ? -Math.abs(this.y) : Math.abs(this.y);
        this.z = 0 > a.n21 - a.n12 ? -Math.abs(this.z) : Math.abs(this.z);
        this.normalize();
        return this
    },
    calculateW: function () {
        this.w = -Math.sqrt(Math.abs(1 - this.x * this.x - this.y * this.y - this.z * this.z));
        return this
    },
    inverse: function () {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;
        return this
    },
    length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    },
    normalize: function () {
        var a = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        0 === a ? this.w = this.z = this.y = this.x = 0 : (a = 1 / a, this.x *= a, this.y *= a, this.z *= a, this.w *= a);
        return this
    },
    multiply: function (a, b) {
        this.x = a.x * b.w + a.y * b.z - a.z * b.y + a.w * b.x;
        this.y = -a.x * b.z + a.y * b.w + a.z * b.x + a.w * b.y;
        this.z = a.x * b.y - a.y * b.x + a.z * b.w + a.w * b.z;
        this.w = -a.x * b.x - a.y * b.y - a.z * b.z + a.w * b.w;
        return this
    },
    multiplySelf: function (a) {
        var b = this.x,
            c = this.y,
            d = this.z,
            e = this.w,
            f = a.x,
            g = a.y,
            h = a.z,
            a = a.w;
        this.x = b * a + e * f + c * h - d * g;
        this.y = c * a + e * g + d * f - b * h;
        this.z = d * a + e * h + b * g - c * f;
        this.w = e * a - b * f - c * g - d * h;
        return this
    },
    multiplyVector3: function (a, b) {
        b || (b = a);
        var c = a.x,
            d = a.y,
            e = a.z,
            f = this.x,
            g = this.y,
            h = this.z,
            l = this.w,
            j = l * c + g * e - h * d,
            k = l * d + h * c - f * e,
            p = l * e + f * d - g * c,
            c = -f * c - g * d - h * e;
        b.x = j * l + c * -f + k * -h - p * -g;
        b.y = k * l + c * -g + p * -f - j * -h;
        b.z = p * l + c * -h + j * -g - k * -f;
        return b
    },
    clone: function () {
        return new THREE.Quaternion(this.x, this.y, this.z, this.w)
    }
};
THREE.Quaternion.slerp = function (a, b, c, d) {
    var e = a.w * b.w + a.x * b.x + a.y * b.y + a.z * b.z;
    0 > e ? (c.w = -b.w, c.x = -b.x, c.y = -b.y, c.z = -b.z, e = -e) : c.copy(b);
    if (1 <= Math.abs(e)) return c.w = a.w, c.x = a.x, c.y = a.y, c.z = a.z, c;
    var f = Math.acos(e),
        e = Math.sqrt(1 - e * e);
    if (0.001 > Math.abs(e)) return c.w = 0.5 * (a.w + b.w), c.x = 0.5 * (a.x + b.x), c.y = 0.5 * (a.y + b.y), c.z = 0.5 * (a.z + b.z), c;
    b = Math.sin((1 - d) * f) / e;
    d = Math.sin(d * f) / e;
    c.w = a.w * b + c.w * d;
    c.x = a.x * b + c.x * d;
    c.y = a.y * b + c.y * d;
    c.z = a.z * b + c.z * d;
    return c
};
THREE.Vertex = function (a) {
    this.position = a || new THREE.Vector3
};
THREE.Vertex.prototype = {
    constructor: THREE.Vertex,
    clone: function () {
        return new THREE.Vertex(this.position.clone())
    }
};
THREE.Face3 = function (a, b, c, d, e, f) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.normal = d instanceof THREE.Vector3 ? d : new THREE.Vector3;
    this.vertexNormals = d instanceof Array ? d : [];
    this.color = e instanceof THREE.Color ? e : new THREE.Color;
    this.vertexColors = e instanceof Array ? e : [];
    this.vertexTangents = [];
    this.materialIndex = f;
    this.centroid = new THREE.Vector3
};
THREE.Face3.prototype = {
    constructor: THREE.Face3,
    clone: function () {
        var a = new THREE.Face3(this.a, this.b, this.c);
        a.normal.copy(this.normal);
        a.color.copy(this.color);
        a.centroid.copy(this.centroid);
        a.materialIndex = this.materialIndex;
        var b, c;
        for (b = 0, c = this.vertexNormals.length; b < c; b++) a.vertexNormals[b] = this.vertexNormals[b].clone();
        for (b = 0, c = this.vertexColors.length; b < c; b++) a.vertexColors[b] = this.vertexColors[b].clone();
        for (b = 0, c = this.vertexTangents.length; b < c; b++) a.vertexTangents[b] = this.vertexTangents[b].clone();
        return a
    }
};
THREE.Face4 = function (a, b, c, d, e, f, g) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.normal = e instanceof THREE.Vector3 ? e : new THREE.Vector3;
    this.vertexNormals = e instanceof Array ? e : [];
    this.color = f instanceof THREE.Color ? f : new THREE.Color;
    this.vertexColors = f instanceof Array ? f : [];
    this.vertexTangents = [];
    this.materialIndex = g;
    this.centroid = new THREE.Vector3
};
THREE.Face4.prototype = {
    constructor: THREE.Face4,
    clone: function () {
        var a = new THREE.Face4(this.a, this.b, this.c, this.d);
        a.normal.copy(this.normal);
        a.color.copy(this.color);
        a.centroid.copy(this.centroid);
        a.materialIndex = this.materialIndex;
        var b, c;
        for (b = 0, c = this.vertexNormals.length; b < c; b++) a.vertexNormals[b] = this.vertexNormals[b].clone();
        for (b = 0, c = this.vertexColors.length; b < c; b++) a.vertexColors[b] = this.vertexColors[b].clone();
        for (b = 0, c = this.vertexTangents.length; b < c; b++) a.vertexTangents[b] = this.vertexTangents[b].clone();
        return a
    }
};
THREE.UV = function (a, b) {
    this.u = a || 0;
    this.v = b || 0
};
THREE.UV.prototype = {
    constructor: THREE.UV,
    set: function (a, b) {
        this.u = a;
        this.v = b;
        return this
    },
    copy: function (a) {
        this.u = a.u;
        this.v = a.v;
        return this
    },
    lerpSelf: function (a, b) {
        this.u += (a.u - this.u) * b;
        this.v += (a.v - this.v) * b;
        return this
    },
    clone: function () {
        return new THREE.UV(this.u, this.v)
    }
};
THREE.Geometry = function () {
    this.id = THREE.GeometryCount++;
    this.vertices = [];
    this.colors = [];
    this.materials = [];
    this.faces = [];
    this.faceUvs = [
        []
    ];
    this.faceVertexUvs = [
        []
    ];
    this.morphTargets = [];
    this.morphColors = [];
    this.morphNormals = [];
    this.skinWeights = [];
    this.skinIndices = [];
    this.boundingSphere = this.boundingBox = null;
    this.dynamic = this.hasTangents = !1
};
THREE.Geometry.prototype = {
    constructor: THREE.Geometry,
    applyMatrix: function (a) {
        var b = new THREE.Matrix4;
        b.extractRotation(a);
        for (var c = 0, d = this.vertices.length; c < d; c++) a.multiplyVector3(this.vertices[c].position);
        c = 0;
        for (d = this.faces.length; c < d; c++) {
            var e = this.faces[c];
            b.multiplyVector3(e.normal);
            for (var f = 0, g = e.vertexNormals.length; f < g; f++) b.multiplyVector3(e.vertexNormals[f]);
            a.multiplyVector3(e.centroid)
        }
    },
    computeCentroids: function () {
        var a, b, c;
        for (a = 0, b = this.faces.length; a < b; a++) c = this.faces[a], c.centroid.set(0, 0, 0), c instanceof THREE.Face3 ? (c.centroid.addSelf(this.vertices[c.a].position), c.centroid.addSelf(this.vertices[c.b].position), c.centroid.addSelf(this.vertices[c.c].position), c.centroid.divideScalar(3)) : c instanceof THREE.Face4 && (c.centroid.addSelf(this.vertices[c.a].position), c.centroid.addSelf(this.vertices[c.b].position), c.centroid.addSelf(this.vertices[c.c].position), c.centroid.addSelf(this.vertices[c.d].position), c.centroid.divideScalar(4))
    },
    computeFaceNormals: function () {
        var a, b, c, d, e, f, g = new THREE.Vector3,
            h = new THREE.Vector3;
        for (a = 0, b = this.faces.length; a < b; a++) c = this.faces[a], d = this.vertices[c.a], e = this.vertices[c.b], f = this.vertices[c.c], g.sub(f.position, e.position), h.sub(d.position, e.position), g.crossSelf(h), g.isZero() || g.normalize(), c.normal.copy(g)
    },
    computeVertexNormals: function () {
        var a, b, c, d;
        if (void 0 === this.__tmpVertices) {
            d = this.__tmpVertices = Array(this.vertices.length);
            for (a = 0, b = this.vertices.length; a < b; a++) d[a] = new THREE.Vector3;
            for (a = 0, b = this.faces.length; a < b; a++) if (c = this.faces[a], c instanceof
            THREE.Face3) c.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
            else if (c instanceof THREE.Face4) c.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3]
        } else {
            d = this.__tmpVertices;
            for (a = 0, b = this.vertices.length; a < b; a++) d[a].set(0, 0, 0)
        }
        for (a = 0, b = this.faces.length; a < b; a++) c = this.faces[a], c instanceof THREE.Face3 ? (d[c.a].addSelf(c.normal), d[c.b].addSelf(c.normal), d[c.c].addSelf(c.normal)) : c instanceof THREE.Face4 && (d[c.a].addSelf(c.normal), d[c.b].addSelf(c.normal), d[c.c].addSelf(c.normal), d[c.d].addSelf(c.normal));
        for (a = 0, b = this.vertices.length; a < b; a++) d[a].normalize();
        for (a = 0, b = this.faces.length; a < b; a++) c = this.faces[a], c instanceof THREE.Face3 ? (c.vertexNormals[0].copy(d[c.a]), c.vertexNormals[1].copy(d[c.b]), c.vertexNormals[2].copy(d[c.c])) : c instanceof THREE.Face4 && (c.vertexNormals[0].copy(d[c.a]), c.vertexNormals[1].copy(d[c.b]), c.vertexNormals[2].copy(d[c.c]), c.vertexNormals[3].copy(d[c.d]))
    },
    computeMorphNormals: function () {
        var a, b, c, d, e;
        for (c = 0, d = this.faces.length; c < d; c++) {
            e = this.faces[c];
            e.__originalFaceNormal ? e.__originalFaceNormal.copy(e.normal) : e.__originalFaceNormal = e.normal.clone();
            if (!e.__originalVertexNormals) e.__originalVertexNormals = [];
            for (a = 0, b = e.vertexNormals.length; a < b; a++) e.__originalVertexNormals[a] ? e.__originalVertexNormals[a].copy(e.vertexNormals[a]) : e.__originalVertexNormals[a] = e.vertexNormals[a].clone()
        }
        var f = new THREE.Geometry;
        f.faces = this.faces;
        for (a = 0, b = this.morphTargets.length; a < b; a++) {
            if (!this.morphNormals[a]) {
                this.morphNormals[a] = {};
                this.morphNormals[a].faceNormals = [];
                this.morphNormals[a].vertexNormals = [];
                var g = this.morphNormals[a].faceNormals,
                    h = this.morphNormals[a].vertexNormals,
                    l, j;
                for (c = 0, d = this.faces.length; c < d; c++) e = this.faces[c], l = new THREE.Vector3, j = e instanceof THREE.Face3 ? {
                    a: new THREE.Vector3,
                    b: new THREE.Vector3,
                    c: new THREE.Vector3
                } : {
                    a: new THREE.Vector3,
                    b: new THREE.Vector3,
                    c: new THREE.Vector3,
                    d: new THREE.Vector3
                }, g.push(l), h.push(j)
            }
            g = this.morphNormals[a];
            f.vertices = this.morphTargets[a].vertices;
            f.computeFaceNormals();
            f.computeVertexNormals();
            for (c = 0, d = this.faces.length; c < d; c++) e = this.faces[c], l = g.faceNormals[c], j = g.vertexNormals[c], l.copy(e.normal), e instanceof THREE.Face3 ? (j.a.copy(e.vertexNormals[0]), j.b.copy(e.vertexNormals[1]), j.c.copy(e.vertexNormals[2])) : (j.a.copy(e.vertexNormals[0]), j.b.copy(e.vertexNormals[1]), j.c.copy(e.vertexNormals[2]), j.d.copy(e.vertexNormals[3]))
        }
        for (c = 0, d = this.faces.length; c < d; c++) e = this.faces[c], e.normal = e.__originalFaceNormal, e.vertexNormals = e.__originalVertexNormals
    },
    computeTangents: function () {
        function a(a, b, c, d, e, f, E) {
            h = a.vertices[b].position;
            l = a.vertices[c].position;
            j = a.vertices[d].position;
            k = g[e];
            p = g[f];
            m = g[E];
            o = l.x - h.x;
            r = j.x - h.x;
            n = l.y - h.y;
            q = j.y - h.y;
            s = l.z - h.z;
            u = j.z - h.z;
            v = p.u - k.u;
            t = m.u - k.u;
            w = p.v - k.v;
            z = m.v - k.v;
            F = 1 / (v * z - t * w);
            N.set((z * o - w * r) * F, (z * n - w * q) * F, (z * s - w * u) * F);
            P.set((v * r - t * o) * F, (v * q - t * n) * F, (v * u - t * s) * F);
            G[b].addSelf(N);
            G[c].addSelf(N);
            G[d].addSelf(N);
            K[b].addSelf(P);
            K[c].addSelf(P);
            K[d].addSelf(P)
        }
        var b, c, d, e, f, g, h, l, j, k, p, m, o, r, n, q, s, u, v, t, w, z, F, C, G = [],
            K = [],
            N = new THREE.Vector3,
            P = new THREE.Vector3,
            T = new THREE.Vector3,
            O = new THREE.Vector3,
            J = new THREE.Vector3;
        for (b = 0, c = this.vertices.length; b < c; b++) G[b] = new THREE.Vector3, K[b] = new THREE.Vector3;
        for (b = 0, c = this.faces.length; b < c; b++) f = this.faces[b], g = this.faceVertexUvs[0][b], f instanceof THREE.Face3 ? a(this, f.a, f.b, f.c, 0, 1, 2) : f instanceof THREE.Face4 && (a(this, f.a, f.b, f.d, 0, 1, 3), a(this, f.b, f.c, f.d, 1, 2, 3));
        var I = ["a", "b", "c", "d"];
        for (b = 0, c = this.faces.length; b < c; b++) {
            f = this.faces[b];
            for (d = 0; d < f.vertexNormals.length; d++) J.copy(f.vertexNormals[d]), e = f[I[d]], C = G[e], T.copy(C), T.subSelf(J.multiplyScalar(J.dot(C))).normalize(), O.cross(f.vertexNormals[d], C), e = O.dot(K[e]), e = 0 > e ? -1 : 1, f.vertexTangents[d] = new THREE.Vector4(T.x, T.y, T.z, e)
        }
        this.hasTangents = !0
    },
    computeBoundingBox: function () {
        if (!this.boundingBox) this.boundingBox = {
            min: new THREE.Vector3,
            max: new THREE.Vector3
        };
        if (0 < this.vertices.length) {
            var a;
            a = this.vertices[0].position;
            this.boundingBox.min.copy(a);
            this.boundingBox.max.copy(a);
            for (var b = this.boundingBox.min, c = this.boundingBox.max, d = 1, e = this.vertices.length; d < e; d++) {
                a = this.vertices[d].position;
                if (a.x < b.x) b.x = a.x;
                else if (a.x > c.x) c.x = a.x;
                if (a.y < b.y) b.y = a.y;
                else if (a.y > c.y) c.y = a.y;
                if (a.z < b.z) b.z = a.z;
                else if (a.z > c.z) c.z = a.z
            }
        } else this.boundingBox.min.set(0, 0, 0), this.boundingBox.max.set(0, 0, 0)
    },
    computeBoundingSphere: function () {
        if (!this.boundingSphere) this.boundingSphere = {
            radius: 0
        };
        for (var a, b = 0, c = 0, d = this.vertices.length; c < d; c++) a = this.vertices[c].position.length(), a > b && (b = a);
        this.boundingSphere.radius = b
    },
    mergeVertices: function () {
        var a = {},
            b = [],
            c = [],
            d, e = Math.pow(10, 4),
            f, g;
        for (f = 0, g = this.vertices.length; f < g; f++) d = this.vertices[f].position, d = [Math.round(d.x * e), Math.round(d.y * e), Math.round(d.z * e)].join("_"), void 0 === a[d] ? (a[d] = f, b.push(this.vertices[f]), c[f] = b.length - 1) : c[f] = c[a[d]];
        for (f = 0, g = this.faces.length; f < g; f++) if (a = this.faces[f], a instanceof THREE.Face3) a.a = c[a.a], a.b = c[a.b], a.c = c[a.c];
        else if (a instanceof THREE.Face4) a.a = c[a.a], a.b = c[a.b], a.c = c[a.c], a.d = c[a.d];
        this.vertices = b
    }
};
THREE.GeometryCount = 0;
THREE.Spline = function (a) {
    function b(a, b, c, d, e, f, g) {
        a = 0.5 * (c - a);
        d = 0.5 * (d - b);
        return (2 * (b - c) + a + d) * g + (-3 * (b - c) - 2 * a - d) * f + a * e + b
    }
    this.points = a;
    var c = [],
        d = {
            x: 0,
            y: 0,
            z: 0
        },
        e, f, g, h, l, j, k, p, m;
    this.initFromArray = function (a) {
        this.points = [];
        for (var b = 0; b < a.length; b++) this.points[b] = {
            x: a[b][0],
            y: a[b][1],
            z: a[b][2]
        }
    };
    this.getPoint = function (a) {
        e = (this.points.length - 1) * a;
        f = Math.floor(e);
        g = e - f;
        c[0] = 0 === f ? f : f - 1;
        c[1] = f;
        c[2] = f > this.points.length - 2 ? this.points.length - 1 : f + 1;
        c[3] = f > this.points.length - 3 ? this.points.length - 1 : f + 2;
        j = this.points[c[0]];
        k = this.points[c[1]];
        p = this.points[c[2]];
        m = this.points[c[3]];
        h = g * g;
        l = g * h;
        d.x = b(j.x, k.x, p.x, m.x, g, h, l);
        d.y = b(j.y, k.y, p.y, m.y, g, h, l);
        d.z = b(j.z, k.z, p.z, m.z, g, h, l);
        return d
    };
    this.getControlPointsArray = function () {
        var a, b, c = this.points.length,
            d = [];
        for (a = 0; a < c; a++) b = this.points[a], d[a] = [b.x, b.y, b.z];
        return d
    };
    this.getLength = function (a) {
        var b, c, d, e = b = b = 0,
            f = new THREE.Vector3,
            g = new THREE.Vector3,
            h = [],
            l = 0;
        h[0] = 0;
        a || (a = 100);
        c = this.points.length * a;
        f.copy(this.points[0]);
        for (a = 1; a < c; a++) b = a / c, d = this.getPoint(b), g.copy(d), l += g.distanceTo(f), f.copy(d), b *= this.points.length - 1, b = Math.floor(b), b != e && (h[b] = l, e = b);
        h[h.length] = l;
        return {
            chunks: h,
            total: l
        }
    };
    this.reparametrizeByArcLength = function (a) {
        var b, c, d, e, f, g, h = [],
            l = new THREE.Vector3,
            j = this.getLength();
        h.push(l.copy(this.points[0]).clone());
        for (b = 1; b < this.points.length; b++) {
            c = j.chunks[b] - j.chunks[b - 1];
            g = Math.ceil(a * c / j.total);
            e = (b - 1) / (this.points.length - 1);
            f = b / (this.points.length - 1);
            for (c = 1; c < g - 1; c++) d = e + c * (1 / g) * (f - e), d = this.getPoint(d), h.push(l.copy(d).clone());
            h.push(l.copy(this.points[b]).clone())
        }
        this.points = h
    }
};
THREE.Camera = function () {
    THREE.Object3D.call(this);
    this.matrixWorldInverse = new THREE.Matrix4;
    this.projectionMatrix = new THREE.Matrix4;
    this.projectionMatrixInverse = new THREE.Matrix4
};
THREE.Camera.prototype = new THREE.Object3D;
THREE.Camera.prototype.constructor = THREE.Camera;
THREE.Camera.prototype.lookAt = function (a) {
    this.matrix.lookAt(this.position, a, this.up);
    this.rotationAutoUpdate && this.rotation.getRotationFromMatrix(this.matrix)
};
THREE.OrthographicCamera = function (a, b, c, d, e, f) {
    THREE.Camera.call(this);
    this.left = a;
    this.right = b;
    this.top = c;
    this.bottom = d;
    this.near = void 0 !== e ? e : 0.1;
    this.far = void 0 !== f ? f : 2E3;
    this.updateProjectionMatrix()
};
THREE.OrthographicCamera.prototype = new THREE.Camera;
THREE.OrthographicCamera.prototype.constructor = THREE.OrthographicCamera;
THREE.OrthographicCamera.prototype.updateProjectionMatrix = function () {
    this.projectionMatrix.makeOrthographic(this.left, this.right, this.top, this.bottom, this.near, this.far)
};
THREE.PerspectiveCamera = function (a, b, c, d) {
    THREE.Camera.call(this);
    this.fov = void 0 !== a ? a : 50;
    this.aspect = void 0 !== b ? b : 1;
    this.near = void 0 !== c ? c : 0.1;
    this.far = void 0 !== d ? d : 2E3;
    this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype = new THREE.Camera;
THREE.PerspectiveCamera.prototype.constructor = THREE.PerspectiveCamera;
THREE.PerspectiveCamera.prototype.setLens = function (a, b) {
    this.fov = 2 * Math.atan((void 0 !== b ? b : 24) / (2 * a)) * (180 / Math.PI);
    this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype.setViewOffset = function (a, b, c, d, e, f) {
    this.fullWidth = a;
    this.fullHeight = b;
    this.x = c;
    this.y = d;
    this.width = e;
    this.height = f;
    this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function () {
    if (this.fullWidth) {
        var a = this.fullWidth / this.fullHeight,
            b = Math.tan(this.fov * Math.PI / 360) * this.near,
            c = -b,
            d = a * c,
            a = Math.abs(a * b - d),
            c = Math.abs(b - c);
        this.projectionMatrix.makeFrustum(d + this.x * a / this.fullWidth, d + (this.x + this.width) * a / this.fullWidth, b - (this.y + this.height) * c / this.fullHeight, b - this.y * c / this.fullHeight, this.near, this.far)
    } else this.projectionMatrix.makePerspective(this.fov, this.aspect, this.near, this.far)
};
THREE.Light = function (a) {
    THREE.Object3D.call(this);
    this.color = new THREE.Color(a)
};
THREE.Light.prototype = new THREE.Object3D;
THREE.Light.prototype.constructor = THREE.Light;
THREE.Light.prototype.supr = THREE.Object3D.prototype;
THREE.AmbientLight = function (a) {
    THREE.Light.call(this, a)
};
THREE.AmbientLight.prototype = new THREE.Light;
THREE.AmbientLight.prototype.constructor = THREE.AmbientLight;
THREE.DirectionalLight = function (a, b, c) {
    THREE.Light.call(this, a);
    this.position = new THREE.Vector3(0, 1, 0);
    this.target = new THREE.Object3D;
    this.intensity = void 0 !== b ? b : 1;
    this.distance = void 0 !== c ? c : 0;
    this.onlyShadow = this.castShadow = !1;
    this.shadowCameraNear = 50;
    this.shadowCameraFar = 5E3;
    this.shadowCameraLeft = -500;
    this.shadowCameraTop = this.shadowCameraRight = 500;
    this.shadowCameraBottom = -500;
    this.shadowCameraVisible = !1;
    this.shadowBias = 0;
    this.shadowDarkness = 0.5;
    this.shadowMapHeight = this.shadowMapWidth = 512;
    this.shadowCascade = !1;
    this.shadowCascadeOffset = new THREE.Vector3(0, 0, -1E3);
    this.shadowCascadeCount = 2;
    this.shadowCascadeBias = [0, 0, 0];
    this.shadowCascadeWidth = [512, 512, 512];
    this.shadowCascadeHeight = [512, 512, 512];
    this.shadowCascadeNearZ = [-1, 0.99, 0.998];
    this.shadowCascadeFarZ = [0.99, 0.998, 1];
    this.shadowCascadeArray = [];
    this.shadowMatrix = this.shadowCamera = this.shadowMapSize = this.shadowMap = null
};
THREE.DirectionalLight.prototype = new THREE.Light;
THREE.DirectionalLight.prototype.constructor = THREE.DirectionalLight;
THREE.PointLight = function (a, b, c) {
    THREE.Light.call(this, a);
    this.position = new THREE.Vector3(0, 0, 0);
    this.intensity = void 0 !== b ? b : 1;
    this.distance = void 0 !== c ? c : 0
};
THREE.PointLight.prototype = new THREE.Light;
THREE.PointLight.prototype.constructor = THREE.PointLight;
THREE.SpotLight = function (a, b, c) {
    THREE.Light.call(this, a);
    this.position = new THREE.Vector3(0, 1, 0);
    this.target = new THREE.Object3D;
    this.intensity = void 0 !== b ? b : 1;
    this.distance = void 0 !== c ? c : 0;
    this.onlyShadow = this.castShadow = !1;
    this.shadowCameraNear = 50;
    this.shadowCameraFar = 5E3;
    this.shadowCameraFov = 50;
    this.shadowCameraVisible = !1;
    this.shadowBias = 0;
    this.shadowDarkness = 0.5;
    this.shadowMapHeight = this.shadowMapWidth = 512;
    this.shadowMatrix = this.shadowCamera = this.shadowMapSize = this.shadowMap = null
};
THREE.SpotLight.prototype = new THREE.Light;
THREE.SpotLight.prototype.constructor = THREE.SpotLight;
THREE.Material = function (a) {
    a = a || {};
    this.id = THREE.MaterialCount++;
    this.name = "";
    this.opacity = void 0 !== a.opacity ? a.opacity : 1;
    this.transparent = void 0 !== a.transparent ? a.transparent : !1;
    this.blending = void 0 !== a.blending ? a.blending : THREE.NormalBlending;
    this.blendSrc = void 0 !== a.blendSrc ? a.blendSrc : THREE.SrcAlphaFactor;
    this.blendDst = void 0 !== a.blendDst ? a.blendDst : THREE.OneMinusSrcAlphaFactor;
    this.blendEquation = void 0 !== a.blendEquation ? a.blendEquation : THREE.AddEquation;
    this.depthTest = void 0 !== a.depthTest ? a.depthTest : !0;
    this.depthWrite = void 0 !== a.depthWrite ? a.depthWrite : !0;
    this.polygonOffset = void 0 !== a.polygonOffset ? a.polygonOffset : !1;
    this.polygonOffsetFactor = void 0 !== a.polygonOffsetFactor ? a.polygonOffsetFactor : 0;
    this.polygonOffsetUnits = void 0 !== a.polygonOffsetUnits ? a.polygonOffsetUnits : 0;
    this.alphaTest = void 0 !== a.alphaTest ? a.alphaTest : 0;
    this.overdraw = void 0 !== a.overdraw ? a.overdraw : !1;
    this.needsUpdate = !0
};
THREE.MaterialCount = 0;
THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;
THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;
THREE.NoBlending = 0;
THREE.NormalBlending = 1;
THREE.AdditiveBlending = 2;
THREE.SubtractiveBlending = 3;
THREE.MultiplyBlending = 4;
THREE.AdditiveAlphaBlending = 5;
THREE.CustomBlending = 6;
THREE.AddEquation = 100;
THREE.SubtractEquation = 101;
THREE.ReverseSubtractEquation = 102;
THREE.ZeroFactor = 200;
THREE.OneFactor = 201;
THREE.SrcColorFactor = 202;
THREE.OneMinusSrcColorFactor = 203;
THREE.SrcAlphaFactor = 204;
THREE.OneMinusSrcAlphaFactor = 205;
THREE.DstAlphaFactor = 206;
THREE.OneMinusDstAlphaFactor = 207;
THREE.DstColorFactor = 208;
THREE.OneMinusDstColorFactor = 209;
THREE.SrcAlphaSaturateFactor = 210;
THREE.LineBasicMaterial = function (a) {
    THREE.Material.call(this, a);
    a = a || {};
    this.color = void 0 !== a.color ? new THREE.Color(a.color) : new THREE.Color(16777215);
    this.linewidth = void 0 !== a.linewidth ? a.linewidth : 1;
    this.linecap = void 0 !== a.linecap ? a.linecap : "round";
    this.linejoin = void 0 !== a.linejoin ? a.linejoin : "round";
    this.vertexColors = a.vertexColors ? a.vertexColors : !1;
    this.fog = void 0 !== a.fog ? a.fog : !0
};
THREE.LineBasicMaterial.prototype = new THREE.Material;
THREE.LineBasicMaterial.prototype.constructor = THREE.LineBasicMaterial;
THREE.MeshBasicMaterial = function (a) {
    THREE.Material.call(this, a);
    a = a || {};
    this.color = void 0 !== a.color ? new THREE.Color(a.color) : new THREE.Color(16777215);
    this.map = void 0 !== a.map ? a.map : null;
    this.lightMap = void 0 !== a.lightMap ? a.lightMap : null;
    this.envMap = void 0 !== a.envMap ? a.envMap : null;
    this.combine = void 0 !== a.combine ? a.combine : THREE.MultiplyOperation;
    this.reflectivity = void 0 !== a.reflectivity ? a.reflectivity : 1;
    this.refractionRatio = void 0 !== a.refractionRatio ? a.refractionRatio : 0.98;
    this.fog = void 0 !== a.fog ? a.fog : !0;
    this.shading = void 0 !== a.shading ? a.shading : THREE.SmoothShading;
    this.wireframe = void 0 !== a.wireframe ? a.wireframe : !1;
    this.wireframeLinewidth = void 0 !== a.wireframeLinewidth ? a.wireframeLinewidth : 1;
    this.wireframeLinecap = void 0 !== a.wireframeLinecap ? a.wireframeLinecap : "round";
    this.wireframeLinejoin = void 0 !== a.wireframeLinejoin ? a.wireframeLinejoin : "round";
    this.vertexColors = void 0 !== a.vertexColors ? a.vertexColors : THREE.NoColors;
    this.skinning = void 0 !== a.skinning ? a.skinning : !1;
    this.morphTargets = void 0 !== a.morphTargets ? a.morphTargets : !1
};
THREE.MeshBasicMaterial.prototype = new THREE.Material;
THREE.MeshBasicMaterial.prototype.constructor = THREE.MeshBasicMaterial;
THREE.MeshLambertMaterial = function (a) {
    THREE.Material.call(this, a);
    a = a || {};
    this.color = void 0 !== a.color ? new THREE.Color(a.color) : new THREE.Color(16777215);
    this.ambient = void 0 !== a.ambient ? new THREE.Color(a.ambient) : new THREE.Color(16777215);
    this.emissive = void 0 !== a.emissive ? new THREE.Color(a.emissive) : new THREE.Color(0);
    this.wrapAround = void 0 !== a.wrapAround ? a.wrapAround : !1;
    this.wrapRGB = new THREE.Vector3(1, 1, 1);
    this.map = void 0 !== a.map ? a.map : null;
    this.lightMap = void 0 !== a.lightMap ? a.lightMap : null;
    this.envMap = void 0 !== a.envMap ? a.envMap : null;
    this.combine = void 0 !== a.combine ? a.combine : THREE.MultiplyOperation;
    this.reflectivity = void 0 !== a.reflectivity ? a.reflectivity : 1;
    this.refractionRatio = void 0 !== a.refractionRatio ? a.refractionRatio : 0.98;
    this.fog = void 0 !== a.fog ? a.fog : !0;
    this.shading = void 0 !== a.shading ? a.shading : THREE.SmoothShading;
    this.wireframe = void 0 !== a.wireframe ? a.wireframe : !1;
    this.wireframeLinewidth = void 0 !== a.wireframeLinewidth ? a.wireframeLinewidth : 1;
    this.wireframeLinecap = void 0 !== a.wireframeLinecap ? a.wireframeLinecap : "round";
    this.wireframeLinejoin = void 0 !== a.wireframeLinejoin ? a.wireframeLinejoin : "round";
    this.vertexColors = void 0 !== a.vertexColors ? a.vertexColors : THREE.NoColors;
    this.skinning = void 0 !== a.skinning ? a.skinning : !1;
    this.morphTargets = void 0 !== a.morphTargets ? a.morphTargets : !1;
    this.morphNormals = void 0 !== a.morphNormals ? a.morphNormals : !1
};
THREE.MeshLambertMaterial.prototype = new THREE.Material;
THREE.MeshLambertMaterial.prototype.constructor = THREE.MeshLambertMaterial;
THREE.MeshPhongMaterial = function (a) {
    THREE.Material.call(this, a);
    a = a || {};
    this.color = void 0 !== a.color ? new THREE.Color(a.color) : new THREE.Color(16777215);
    this.ambient = void 0 !== a.ambient ? new THREE.Color(a.ambient) : new THREE.Color(16777215);
    this.emissive = void 0 !== a.emissive ? new THREE.Color(a.emissive) : new THREE.Color(0);
    this.specular = void 0 !== a.specular ? new THREE.Color(a.specular) : new THREE.Color(1118481);
    this.shininess = void 0 !== a.shininess ? a.shininess : 30;
    this.metal = void 0 !== a.metal ? a.metal : !1;
    this.perPixel = void 0 !== a.perPixel ? a.perPixel : !1;
    this.wrapAround = void 0 !== a.wrapAround ? a.wrapAround : !1;
    this.wrapRGB = new THREE.Vector3(1, 1, 1);
    this.map = void 0 !== a.map ? a.map : null;
    this.lightMap = void 0 !== a.lightMap ? a.lightMap : null;
    this.envMap = void 0 !== a.envMap ? a.envMap : null;
    this.combine = void 0 !== a.combine ? a.combine : THREE.MultiplyOperation;
    this.reflectivity = void 0 !== a.reflectivity ? a.reflectivity : 1;
    this.refractionRatio = void 0 !== a.refractionRatio ? a.refractionRatio : 0.98;
    this.fog = void 0 !== a.fog ? a.fog : !0;
    this.shading = void 0 !== a.shading ? a.shading : THREE.SmoothShading;
    this.wireframe = void 0 !== a.wireframe ? a.wireframe : !1;
    this.wireframeLinewidth = void 0 !== a.wireframeLinewidth ? a.wireframeLinewidth : 1;
    this.wireframeLinecap = void 0 !== a.wireframeLinecap ? a.wireframeLinecap : "round";
    this.wireframeLinejoin = void 0 !== a.wireframeLinejoin ? a.wireframeLinejoin : "round";
    this.vertexColors = void 0 !== a.vertexColors ? a.vertexColors : THREE.NoColors;
    this.skinning = void 0 !== a.skinning ? a.skinning : !1;
    this.morphTargets = void 0 !== a.morphTargets ? a.morphTargets : !1;
    this.morphNormals = void 0 !== a.morphNormals ? a.morphNormals : !1
};
THREE.MeshPhongMaterial.prototype = new THREE.Material;
THREE.MeshPhongMaterial.prototype.constructor = THREE.MeshPhongMaterial;
THREE.MeshDepthMaterial = function (a) {
    THREE.Material.call(this, a);
    a = a || {};
    this.shading = void 0 !== a.shading ? a.shading : THREE.SmoothShading;
    this.wireframe = void 0 !== a.wireframe ? a.wireframe : !1;
    this.wireframeLinewidth = void 0 !== a.wireframeLinewidth ? a.wireframeLinewidth : 1
};
THREE.MeshDepthMaterial.prototype = new THREE.Material;
THREE.MeshDepthMaterial.prototype.constructor = THREE.MeshDepthMaterial;
THREE.MeshNormalMaterial = function (a) {
    THREE.Material.call(this, a);
    a = a || {};
    this.shading = a.shading ? a.shading : THREE.FlatShading;
    this.wireframe = a.wireframe ? a.wireframe : !1;
    this.wireframeLinewidth = a.wireframeLinewidth ? a.wireframeLinewidth : 1
};
THREE.MeshNormalMaterial.prototype = new THREE.Material;
THREE.MeshNormalMaterial.prototype.constructor = THREE.MeshNormalMaterial;
THREE.MeshFaceMaterial = function () {};
THREE.ParticleBasicMaterial = function (a) {
    THREE.Material.call(this, a);
    a = a || {};
    this.color = void 0 !== a.color ? new THREE.Color(a.color) : new THREE.Color(16777215);
    this.map = void 0 !== a.map ? a.map : null;
    this.size = void 0 !== a.size ? a.size : 1;
    this.sizeAttenuation = void 0 !== a.sizeAttenuation ? a.sizeAttenuation : !0;
    this.vertexColors = void 0 !== a.vertexColors ? a.vertexColors : !1;
    this.fog = void 0 !== a.fog ? a.fog : !0
};
THREE.ParticleBasicMaterial.prototype = new THREE.Material;
THREE.ParticleBasicMaterial.prototype.constructor = THREE.ParticleBasicMaterial;
THREE.ParticleCanvasMaterial = function (a) {
    THREE.Material.call(this, a);
    a = a || {};
    this.color = void 0 !== a.color ? new THREE.Color(a.color) : new THREE.Color(16777215);
    this.program = void 0 !== a.program ? a.program : function () {}
};
THREE.ParticleCanvasMaterial.prototype = new THREE.Material;
THREE.ParticleCanvasMaterial.prototype.constructor = THREE.ParticleCanvasMaterial;
THREE.ParticleDOMMaterial = function (a) {
    THREE.Material.call(this);
    this.domElement = a
};
THREE.ShaderMaterial = function (a) {
    THREE.Material.call(this, a);
    a = a || {};
    this.fragmentShader = void 0 !== a.fragmentShader ? a.fragmentShader : "void main() {}";
    this.vertexShader = void 0 !== a.vertexShader ? a.vertexShader : "void main() {}";
    this.uniforms = void 0 !== a.uniforms ? a.uniforms : {};
    this.attributes = a.attributes;
    this.shading = void 0 !== a.shading ? a.shading : THREE.SmoothShading;
    this.wireframe = void 0 !== a.wireframe ? a.wireframe : !1;
    this.wireframeLinewidth = void 0 !== a.wireframeLinewidth ? a.wireframeLinewidth : 1;
    this.fog = void 0 !== a.fog ? a.fog : !1;
    this.lights = void 0 !== a.lights ? a.lights : !1;
    this.vertexColors = void 0 !== a.vertexColors ? a.vertexColors : THREE.NoColors;
    this.skinning = void 0 !== a.skinning ? a.skinning : !1;
    this.morphTargets = void 0 !== a.morphTargets ? a.morphTargets : !1;
    this.morphNormals = void 0 !== a.morphNormals ? a.morphNormals : !1
};
THREE.ShaderMaterial.prototype = new THREE.Material;
THREE.ShaderMaterial.prototype.constructor = THREE.ShaderMaterial;
THREE.Texture = function (a, b, c, d, e, f, g, h) {
    this.id = THREE.TextureCount++;
    this.image = a;
    this.mapping = void 0 !== b ? b : new THREE.UVMapping;
    this.wrapS = void 0 !== c ? c : THREE.ClampToEdgeWrapping;
    this.wrapT = void 0 !== d ? d : THREE.ClampToEdgeWrapping;
    this.magFilter = void 0 !== e ? e : THREE.LinearFilter;
    this.minFilter = void 0 !== f ? f : THREE.LinearMipMapLinearFilter;
    this.format = void 0 !== g ? g : THREE.RGBAFormat;
    this.type = void 0 !== h ? h : THREE.UnsignedByteType;
    this.offset = new THREE.Vector2(0, 0);
    this.repeat = new THREE.Vector2(1, 1);
    this.generateMipmaps = !0;
    this.needsUpdate = this.premultiplyAlpha = !1;
    this.onUpdate = null
};
THREE.Texture.prototype = {
    constructor: THREE.Texture,
    clone: function () {
        var a = new THREE.Texture(this.image, this.mapping, this.wrapS, this.wrapT, this.magFilter, this.minFilter, this.format, this.type);
        a.offset.copy(this.offset);
        a.repeat.copy(this.repeat);
        return a
    }
};
THREE.TextureCount = 0;
THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;
THREE.UVMapping = function () {};
THREE.CubeReflectionMapping = function () {};
THREE.CubeRefractionMapping = function () {};
THREE.SphericalReflectionMapping = function () {};
THREE.SphericalRefractionMapping = function () {};
THREE.RepeatWrapping = 0;
THREE.ClampToEdgeWrapping = 1;
THREE.MirroredRepeatWrapping = 2;
THREE.NearestFilter = 3;
THREE.NearestMipMapNearestFilter = 4;
THREE.NearestMipMapLinearFilter = 5;
THREE.LinearFilter = 6;
THREE.LinearMipMapNearestFilter = 7;
THREE.LinearMipMapLinearFilter = 8;
THREE.ByteType = 9;
THREE.UnsignedByteType = 10;
THREE.ShortType = 11;
THREE.UnsignedShortType = 12;
THREE.IntType = 13;
THREE.UnsignedIntType = 14;
THREE.FloatType = 15;
THREE.AlphaFormat = 16;
THREE.RGBFormat = 17;
THREE.RGBAFormat = 18;
THREE.LuminanceFormat = 19;
THREE.LuminanceAlphaFormat = 20;
THREE.DataTexture = function (a, b, c, d, e, f, g, h, l, j) {
    THREE.Texture.call(this, null, f, g, h, l, j, d, e);
    this.image = {
        data: a,
        width: b,
        height: c
    }
};
THREE.DataTexture.prototype = new THREE.Texture;
THREE.DataTexture.prototype.constructor = THREE.DataTexture;
THREE.DataTexture.prototype.clone = function () {
    var a = new THREE.DataTexture(this.image.data, this.image.width, this.image.height, this.format, this.type, this.mapping, this.wrapS, this.wrapT, this.magFilter, this.minFilter);
    a.offset.copy(this.offset);
    a.repeat.copy(this.repeat);
    return a
};
THREE.Particle = function (a) {
    THREE.Object3D.call(this);
    this.material = a
};
THREE.Particle.prototype = new THREE.Object3D;
THREE.Particle.prototype.constructor = THREE.Particle;
THREE.ParticleSystem = function (a, b) {
    THREE.Object3D.call(this);
    this.geometry = a;
    this.material = void 0 !== b ? b : new THREE.ParticleBasicMaterial({
        color: 16777215 * Math.random()
    });
    this.sortParticles = !1;
    if (this.geometry) this.geometry.boundingSphere || this.geometry.computeBoundingSphere(), this.boundRadius = a.boundingSphere.radius;
    this.frustumCulled = !1
};
THREE.ParticleSystem.prototype = new THREE.Object3D;
THREE.ParticleSystem.prototype.constructor = THREE.ParticleSystem;
THREE.Line = function (a, b, c) {
    THREE.Object3D.call(this);
    this.geometry = a;
    this.material = void 0 !== b ? b : new THREE.LineBasicMaterial({
        color: 16777215 * Math.random()
    });
    this.type = void 0 !== c ? c : THREE.LineStrip;
    this.geometry && (this.geometry.boundingSphere || this.geometry.computeBoundingSphere())
};
THREE.LineStrip = 0;
THREE.LinePieces = 1;
THREE.Line.prototype = new THREE.Object3D;
THREE.Line.prototype.constructor = THREE.Line;
THREE.Mesh = function (a, b) {
    THREE.Object3D.call(this);
    this.geometry = a;
    this.material = void 0 !== b ? b : new THREE.MeshBasicMaterial({
        color: 16777215 * Math.random(),
        wireframe: !0
    });
    if (this.geometry && (this.geometry.boundingSphere || this.geometry.computeBoundingSphere(), this.boundRadius = a.boundingSphere.radius, this.geometry.morphTargets.length)) {
        this.morphTargetBase = -1;
        this.morphTargetForcedOrder = [];
        this.morphTargetInfluences = [];
        this.morphTargetDictionary = {};
        for (var c = 0; c < this.geometry.morphTargets.length; c++) this.morphTargetInfluences.push(0), this.morphTargetDictionary[this.geometry.morphTargets[c].name] = c
    }
};
THREE.Mesh.prototype = new THREE.Object3D;
THREE.Mesh.prototype.constructor = THREE.Mesh;
THREE.Mesh.prototype.supr = THREE.Object3D.prototype;
THREE.Mesh.prototype.getMorphTargetIndexByName = function (a) {
    if (void 0 !== this.morphTargetDictionary[a]) return this.morphTargetDictionary[a];
    console.log("THREE.Mesh.getMorphTargetIndexByName: morph target " + a + " does not exist. Returning 0.");
    return 0
};
THREE.Bone = function (a) {
    THREE.Object3D.call(this);
    this.skin = a;
    this.skinMatrix = new THREE.Matrix4
};
THREE.Bone.prototype = new THREE.Object3D;
THREE.Bone.prototype.constructor = THREE.Bone;
THREE.Bone.prototype.supr = THREE.Object3D.prototype;
THREE.Bone.prototype.update = function (a, b) {
    this.matrixAutoUpdate && (b |= this.updateMatrix());
    if (b || this.matrixWorldNeedsUpdate) a ? this.skinMatrix.multiply(a, this.matrix) : this.skinMatrix.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, b = !0;
    var c, d = this.children.length;
    for (c = 0; c < d; c++) this.children[c].update(this.skinMatrix, b)
};
THREE.SkinnedMesh = function (a, b) {
    THREE.Mesh.call(this, a, b);
    this.identityMatrix = new THREE.Matrix4;
    this.bones = [];
    this.boneMatrices = [];
    var c, d, e, f, g, h;
    if (void 0 !== this.geometry.bones) {
        for (c = 0; c < this.geometry.bones.length; c++) e = this.geometry.bones[c], f = e.pos, g = e.rotq, h = e.scl, d = this.addBone(), d.name = e.name, d.position.set(f[0], f[1], f[2]), d.quaternion.set(g[0], g[1], g[2], g[3]), d.useQuaternion = !0, void 0 !== h ? d.scale.set(h[0], h[1], h[2]) : d.scale.set(1, 1, 1);
        for (c = 0; c < this.bones.length; c++) e = this.geometry.bones[c], d = this.bones[c], -1 === e.parent ? this.add(d) : this.bones[e.parent].add(d);
        this.boneMatrices = new Float32Array(16 * this.bones.length);
        this.pose()
    }
};
THREE.SkinnedMesh.prototype = new THREE.Mesh;
THREE.SkinnedMesh.prototype.constructor = THREE.SkinnedMesh;
THREE.SkinnedMesh.prototype.addBone = function (a) {
    void 0 === a && (a = new THREE.Bone(this));
    this.bones.push(a);
    return a
};
THREE.SkinnedMesh.prototype.updateMatrixWorld = function (a) {
    this.matrixAutoUpdate && this.updateMatrix();
    if (this.matrixWorldNeedsUpdate || a) this.parent ? this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1;
    for (var a = 0, b = this.children.length; a < b; a++) {
        var c = this.children[a];
        c instanceof THREE.Bone ? c.update(this.identityMatrix, !1) : c.updateMatrixWorld(!0)
    }
    for (var b = this.bones.length, c = this.bones, d = this.boneMatrices, a = 0; a < b; a++) c[a].skinMatrix.flattenToArrayOffset(d, 16 * a)
};
THREE.SkinnedMesh.prototype.pose = function () {
    this.updateMatrixWorld(!0);
    for (var a, b = [], c = 0; c < this.bones.length; c++) {
        a = this.bones[c];
        var d = new THREE.Matrix4;
        d.getInverse(a.skinMatrix);
        b.push(d);
        a.skinMatrix.flattenToArrayOffset(this.boneMatrices, 16 * c)
    }
    if (void 0 === this.geometry.skinVerticesA) {
        this.geometry.skinVerticesA = [];
        this.geometry.skinVerticesB = [];
        for (a = 0; a < this.geometry.skinIndices.length; a++) {
            var c = this.geometry.vertices[a].position,
                e = this.geometry.skinIndices[a].x,
                f = this.geometry.skinIndices[a].y,
                d = new THREE.Vector3(c.x, c.y, c.z);
            this.geometry.skinVerticesA.push(b[e].multiplyVector3(d));
            d = new THREE.Vector3(c.x, c.y, c.z);
            this.geometry.skinVerticesB.push(b[f].multiplyVector3(d));
            1 !== this.geometry.skinWeights[a].x + this.geometry.skinWeights[a].y && (c = 0.5 * (1 - (this.geometry.skinWeights[a].x + this.geometry.skinWeights[a].y)), this.geometry.skinWeights[a].x += c, this.geometry.skinWeights[a].y += c)
        }
    }
};
THREE.MorphAnimMesh = function (a, b) {
    THREE.Mesh.call(this, a, b);
    this.duration = 1E3;
    this.mirroredLoop = !1;
    this.currentKeyframe = this.lastKeyframe = this.time = 0;
    this.direction = 1;
    this.directionBackwards = !1;
    this.setFrameRange(0, this.geometry.morphTargets.length - 1)
};
THREE.MorphAnimMesh.prototype = new THREE.Mesh;
THREE.MorphAnimMesh.prototype.constructor = THREE.MorphAnimMesh;
THREE.MorphAnimMesh.prototype.setFrameRange = function (a, b) {
    this.startKeyframe = a;
    this.endKeyframe = b;
    this.length = this.endKeyframe - this.startKeyframe + 1
};
THREE.MorphAnimMesh.prototype.setDirectionForward = function () {
    this.direction = 1;
    this.directionBackwards = !1
};
THREE.MorphAnimMesh.prototype.setDirectionBackward = function () {
    this.direction = -1;
    this.directionBackwards = !0
};
THREE.MorphAnimMesh.prototype.parseAnimations = function () {
    var a = this.geometry;
    if (!a.animations) a.animations = {};
    for (var b, c = a.animations, d = /([a-z]+)(\d+)/, e = 0, f = a.morphTargets.length; e < f; e++) {
        var g = a.morphTargets[e].name.match(d);
        if (g && 1 < g.length) {
            g = g[1];
            c[g] || (c[g] = {
                start: Infinity,
                end: -Infinity
            });
            var h = c[g];
            if (e < h.start) h.start = e;
            if (e > h.end) h.end = e;
            b || (b = g)
        }
    }
    a.firstAnimation = b
};
THREE.MorphAnimMesh.prototype.setAnimationLabel = function (a, b, c) {
    if (!this.geometry.animations) this.geometry.animations = {};
    this.geometry.animations[a] = {
        start: b,
        end: c
    }
};
THREE.MorphAnimMesh.prototype.playAnimation = function (a, b) {
    var c = this.geometry.animations[a];
    c ? (this.setFrameRange(c.start, c.end), this.duration = 1E3 * ((c.end - c.start) / b), this.time = 0) : console.warn("animation[" + a + "] undefined")
};
THREE.MorphAnimMesh.prototype.updateAnimation = function (a) {
    var b = this.duration / this.length;
    this.time += this.direction * a;
    if (this.mirroredLoop) {
        if (this.time > this.duration || 0 > this.time) {
            this.direction *= -1;
            if (this.time > this.duration) this.time = this.duration, this.directionBackwards = !0;
            if (0 > this.time) this.time = 0, this.directionBackwards = !1
        }
    } else this.time %= this.duration, 0 > this.time && (this.time += this.duration);
    a = this.startKeyframe + THREE.Math.clamp(Math.floor(this.time / b), 0, this.length - 1);
    if (a !== this.currentKeyframe) this.morphTargetInfluences[this.lastKeyframe] = 0, this.morphTargetInfluences[this.currentKeyframe] = 1, this.morphTargetInfluences[a] = 0, this.lastKeyframe = this.currentKeyframe, this.currentKeyframe = a;
    b = this.time % b / b;
    this.directionBackwards && (b = 1 - b);
    this.morphTargetInfluences[this.currentKeyframe] = b;
    this.morphTargetInfluences[this.lastKeyframe] = 1 - b
};
THREE.Ribbon = function (a, b) {
    THREE.Object3D.call(this);
    this.geometry = a;
    this.material = b
};
THREE.Ribbon.prototype = new THREE.Object3D;
THREE.Ribbon.prototype.constructor = THREE.Ribbon;
THREE.LOD = function () {
    THREE.Object3D.call(this);
    this.LODs = []
};
THREE.LOD.prototype = new THREE.Object3D;
THREE.LOD.prototype.constructor = THREE.LOD;
THREE.LOD.prototype.supr = THREE.Object3D.prototype;
THREE.LOD.prototype.addLevel = function (a, b) {
    void 0 === b && (b = 0);
    for (var b = Math.abs(b), c = 0; c < this.LODs.length && !(b < this.LODs[c].visibleAtDistance); c++);
    this.LODs.splice(c, 0, {
        visibleAtDistance: b,
        object3D: a
    });
    this.add(a)
};
THREE.LOD.prototype.update = function (a) {
    if (1 < this.LODs.length) {
        a.matrixWorldInverse.getInverse(a.matrixWorld);
        a = a.matrixWorldInverse;
        a = -(a.n31 * this.matrixWorld.n14 + a.n32 * this.matrixWorld.n24 + a.n33 * this.matrixWorld.n34 + a.n34);
        this.LODs[0].object3D.visible = !0;
        for (var b = 1; b < this.LODs.length; b++) if (a >= this.LODs[b].visibleAtDistance) this.LODs[b - 1].object3D.visible = !1, this.LODs[b].object3D.visible = !0;
        else break;
        for (; b < this.LODs.length; b++) this.LODs[b].object3D.visible = !1
    }
};
THREE.Sprite = function (a) {
    THREE.Object3D.call(this);
    this.color = void 0 !== a.color ? new THREE.Color(a.color) : new THREE.Color(16777215);
    this.map = void 0 !== a.map ? a.map : new THREE.Texture;
    this.blending = void 0 !== a.blending ? a.blending : THREE.NormalBlending;
    this.blendSrc = void 0 !== a.blendSrc ? a.blendSrc : THREE.SrcAlphaFactor;
    this.blendDst = void 0 !== a.blendDst ? a.blendDst : THREE.OneMinusSrcAlphaFactor;
    this.blendEquation = void 0 !== a.blendEquation ? a.blendEquation : THREE.AddEquation;
    this.useScreenCoordinates = void 0 !== a.useScreenCoordinates ? a.useScreenCoordinates : !0;
    this.mergeWith3D = void 0 !== a.mergeWith3D ? a.mergeWith3D : !this.useScreenCoordinates;
    this.affectedByDistance = void 0 !== a.affectedByDistance ? a.affectedByDistance : !this.useScreenCoordinates;
    this.scaleByViewport = void 0 !== a.scaleByViewport ? a.scaleByViewport : !this.affectedByDistance;
    this.alignment = a.alignment instanceof THREE.Vector2 ? a.alignment : THREE.SpriteAlignment.center;
    this.rotation3d = this.rotation;
    this.rotation = 0;
    this.opacity = 1;
    this.uvOffset = new THREE.Vector2(0, 0);
    this.uvScale = new THREE.Vector2(1, 1)
};
THREE.Sprite.prototype = new THREE.Object3D;
THREE.Sprite.prototype.constructor = THREE.Sprite;
THREE.Sprite.prototype.updateMatrix = function () {
    this.matrix.setPosition(this.position);
    this.rotation3d.set(0, 0, this.rotation);
    this.matrix.setRotationFromEuler(this.rotation3d);
    if (1 !== this.scale.x || 1 !== this.scale.y) this.matrix.scale(this.scale), this.boundRadiusScale = Math.max(this.scale.x, this.scale.y);
    this.matrixWorldNeedsUpdate = !0
};
THREE.SpriteAlignment = {};
THREE.SpriteAlignment.topLeft = new THREE.Vector2(1, -1);
THREE.SpriteAlignment.topCenter = new THREE.Vector2(0, -1);
THREE.SpriteAlignment.topRight = new THREE.Vector2(-1, -1);
THREE.SpriteAlignment.centerLeft = new THREE.Vector2(1, 0);
THREE.SpriteAlignment.center = new THREE.Vector2(0, 0);
THREE.SpriteAlignment.centerRight = new THREE.Vector2(-1, 0);
THREE.SpriteAlignment.bottomLeft = new THREE.Vector2(1, 1);
THREE.SpriteAlignment.bottomCenter = new THREE.Vector2(0, 1);
THREE.SpriteAlignment.bottomRight = new THREE.Vector2(-1, 1);
THREE.Scene = function () {
    THREE.Object3D.call(this);
    this.overrideMaterial = this.fog = null;
    this.matrixAutoUpdate = !1;
    this.__objects = [];
    this.__lights = [];
    this.__objectsAdded = [];
    this.__objectsRemoved = []
};
THREE.Scene.prototype = new THREE.Object3D;
THREE.Scene.prototype.constructor = THREE.Scene;
THREE.Scene.prototype.__addObject = function (a) {
    if (a instanceof THREE.Light) - 1 === this.__lights.indexOf(a) && this.__lights.push(a);
    else if (!(a instanceof THREE.Camera || a instanceof THREE.Bone) && -1 === this.__objects.indexOf(a)) {
        this.__objects.push(a);
        this.__objectsAdded.push(a);
        var b = this.__objectsRemoved.indexOf(a); - 1 !== b && this.__objectsRemoved.splice(b, 1)
    }
    for (b = 0; b < a.children.length; b++) this.__addObject(a.children[b])
};
THREE.Scene.prototype.__removeObject = function (a) {
    if (a instanceof THREE.Light) {
        var b = this.__lights.indexOf(a); - 1 !== b && this.__lights.splice(b, 1)
    } else a instanceof THREE.Camera || (b = this.__objects.indexOf(a), -1 !== b && (this.__objects.splice(b, 1), this.__objectsRemoved.push(a), b = this.__objectsAdded.indexOf(a), -1 !== b && this.__objectsAdded.splice(b, 1)));
    for (b = 0; b < a.children.length; b++) this.__removeObject(a.children[b])
};
THREE.Fog = function (a, b, c) {
    this.color = new THREE.Color(a);
    this.near = void 0 !== b ? b : 1;
    this.far = void 0 !== c ? c : 1E3
};
THREE.FogExp2 = function (a, b) {
    this.color = new THREE.Color(a);
    this.density = void 0 !== b ? b : 2.5E-4
};
THREE.DOMRenderer = function () {
    var a, b, c, d, e, f, g, h = new THREE.Projector;
    g = function (a) {
        for (var b = document.documentElement, c = 0; c < a.length; c++) if ("string" === typeof b.style[a[c]]) return a[c];
        return null
    }(["transform", "MozTransform", "WebkitTransform", "msTransform", "OTransform"]);
    this.domElement = document.createElement("div");
    this.setSize = function (a, b) {
        c = a;
        d = b;
        e = c / 2;
        f = d / 2
    };
    this.render = function (c, d) {
        var k, p, m, o, r, n;
        a = h.projectScene(c, d);
        b = a.elements;
        for (k = 0, p = b.length; k < p; k++) if (m = b[k], m instanceof THREE.RenderableParticle && m.material instanceof THREE.ParticleDOMMaterial) o = m.material.domElement, r = m.x * e + e - (o.offsetWidth >> 1), n = m.y * f + f - (o.offsetHeight >> 1), o.style.left = r + "px", o.style.top = n + "px", o.style.zIndex = Math.abs(Math.floor((1 - m.z) * d.far / d.near)), g && (o.style[g] = "scale(" + m.scale.x * e + "," + m.scale.y * f + ")")
    }
};
THREE.CanvasRenderer = function (a) {
    function b(a) {
        if (u != a) n.globalAlpha = u = a
    }
    function c(a) {
        if (v != a) {
            switch (a) {
            case THREE.NormalBlending:
                n.globalCompositeOperation = "source-over";
                break;
            case THREE.AdditiveBlending:
                n.globalCompositeOperation = "lighter";
                break;
            case THREE.SubtractiveBlending:
                n.globalCompositeOperation = "darker"
            }
            v = a
        }
    }
    function d(a) {
        if (t != a) n.strokeStyle = t = a
    }
    function e(a) {
        if (w != a) n.fillStyle = w = a
    }
    var a = a || {},
        f = this,
        g, h, l, j = new THREE.Projector,
        k = void 0 !== a.canvas ? a.canvas : document.createElement("canvas"),
        p, m, o, r, n = k.getContext("2d"),
        q = new THREE.Color(0),
        s = 0,
        u = 1,
        v = 0,
        t = null,
        w = null,
        z = null,
        F = null,
        C = null,
        G, K, N, P, T = new THREE.RenderableVertex,
        O = new THREE.RenderableVertex,
        J, I, D, i, S, B, A, V, E, aa, ea, ia, R = new THREE.Color,
        $ = new THREE.Color,
        ba = new THREE.Color,
        Z = new THREE.Color,
        ja = new THREE.Color,
        Ga = [],
        oa = [],
        Ka, Ua, Da, pa, $a, ab, kb, db, hb, nb, Wa = new THREE.Rectangle,
        qa = new THREE.Rectangle,
        va = new THREE.Rectangle,
        Ea = !1,
        ga = new THREE.Color,
        Xa = new THREE.Color,
        La = new THREE.Color,
        ra = new THREE.Vector3,
        ca, Q, sa, Ra, pc, Cc, a = 16;
    ca = document.createElement("canvas");
    ca.width = ca.height = 2;
    Q = ca.getContext("2d");
    Q.fillStyle = "rgba(0,0,0,1)";
    Q.fillRect(0, 0, 2, 2);
    sa = Q.getImageData(0, 0, 2, 2);
    Ra = sa.data;
    pc = document.createElement("canvas");
    pc.width = pc.height = a;
    Cc = pc.getContext("2d");
    Cc.translate(-a / 2, -a / 2);
    Cc.scale(a, a);
    a--;
    this.domElement = k;
    this.sortElements = this.sortObjects = this.autoClear = !0;
    this.info = {
        render: {
            vertices: 0,
            faces: 0
        }
    };
    this.setSize = function (a, b) {
        p = a;
        m = b;
        o = Math.floor(p / 2);
        r = Math.floor(m / 2);
        k.width = p;
        k.height = m;
        Wa.set(-o, -r, o, r);
        qa.set(-o, -r, o, r);
        u = 1;
        v = 0;
        C = F = z = w = t = null
    };
    this.setClearColor = function (a, b) {
        q.copy(a);
        s = void 0 !== b ? b : 1;
        qa.set(-o, -r, o, r)
    };
    this.setClearColorHex = function (a, b) {
        q.setHex(a);
        s = void 0 !== b ? b : 1;
        qa.set(-o, -r, o, r)
    };
    this.clear = function () {
        n.setTransform(1, 0, 0, -1, o, r);
        qa.isEmpty() || (qa.minSelf(Wa), qa.inflate(2), 1 > s && n.clearRect(Math.floor(qa.getX()), Math.floor(qa.getY()), Math.floor(qa.getWidth()), Math.floor(qa.getHeight())), 0 < s && (c(THREE.NormalBlending), b(1), e("rgba(" + Math.floor(255 * q.r) + "," + Math.floor(255 * q.g) + "," + Math.floor(255 * q.b) + "," + s + ")"), n.fillRect(Math.floor(qa.getX()), Math.floor(qa.getY()), Math.floor(qa.getWidth()), Math.floor(qa.getHeight()))), qa.empty())
    };
    this.render = function (a, k) {
        function m(a) {
            var b, c, d, e;
            ga.setRGB(0, 0, 0);
            Xa.setRGB(0, 0, 0);
            La.setRGB(0, 0, 0);
            for (b = 0, c = a.length; b < c; b++) d = a[b], e = d.color, d instanceof THREE.AmbientLight ? (ga.r += e.r, ga.g += e.g, ga.b += e.b) : d instanceof THREE.DirectionalLight ? (Xa.r += e.r, Xa.g += e.g, Xa.b += e.b) : d instanceof THREE.PointLight && (La.r += e.r, La.g += e.g, La.b += e.b)
        }

        function p(a, b, c, d) {
            var e, f, g, ca, h, i;
            for (e = 0, f = a.length; e < f; e++) g = a[e], ca = g.color, g instanceof THREE.DirectionalLight ? (h = g.matrixWorld.getPosition(), i = c.dot(h), 0 >= i || (i *= g.intensity, d.r += ca.r * i, d.g += ca.g * i, d.b += ca.b * i)) : g instanceof THREE.PointLight && (h = g.matrixWorld.getPosition(), i = c.dot(ra.sub(h, b).normalize()), 0 >= i || (i *= 0 == g.distance ? 1 : 1 - Math.min(b.distanceTo(h) / g.distance, 1), 0 != i && (i *= g.intensity, d.r += ca.r * i, d.g += ca.g * i, d.b += ca.b * i)))
        }
        function q(a, f, g) {
            b(g.opacity);
            c(g.blending);
            var ca, h, i, l, Q, k;
            if (g instanceof THREE.ParticleBasicMaterial) {
                if (g.map) l = g.map.image, Q = l.width >> 1, k = l.height >> 1, g = f.scale.x * o, i = f.scale.y * r, ca = g * Q, h = i * k, va.set(a.x - ca, a.y - h, a.x + ca, a.y + h), Wa.intersects(va) && (n.save(), n.translate(a.x, a.y), n.rotate(-f.rotation), n.scale(g, -i), n.translate(-Q, -k), n.drawImage(l, 0, 0), n.restore())
            } else g instanceof THREE.ParticleCanvasMaterial && (ca = f.scale.x * o, h = f.scale.y * r, va.set(a.x - ca, a.y - h, a.x + ca, a.y + h), Wa.intersects(va) && (d(g.color.getContextStyle()), e(g.color.getContextStyle()), n.save(), n.translate(a.x, a.y), n.rotate(-f.rotation), n.scale(ca, h), g.program(n), n.restore()))
        }
        function s(a, e, f, g) {
            b(g.opacity);
            c(g.blending);
            n.beginPath();
            n.moveTo(a.positionScreen.x, a.positionScreen.y);
            n.lineTo(e.positionScreen.x, e.positionScreen.y);
            n.closePath();
            if (g instanceof THREE.LineBasicMaterial) {
                a = g.linewidth;
                if (z != a) n.lineWidth = z = a;
                a = g.linecap;
                if (F != a) n.lineCap = F = a;
                a = g.linejoin;
                if (C != a) n.lineJoin = C = a;
                d(g.color.getContextStyle());
                n.stroke();
                va.inflate(2 * g.linewidth)
            }
        }
        function t(a, d, e, g, ca, h, Q, j) {
            f.info.render.vertices += 3;
            f.info.render.faces++;
            b(j.opacity);
            c(j.blending);
            J = a.positionScreen.x;
            I = a.positionScreen.y;
            D = d.positionScreen.x;
            i = d.positionScreen.y;
            S = e.positionScreen.x;
            B = e.positionScreen.y;
            u(J, I, D, i, S, B);
            if (j instanceof THREE.MeshBasicMaterial) if (j.map) j.map.mapping instanceof THREE.UVMapping && (pa = Q.uvs[0], Tc(J, I, D, i, S, B, pa[g].u, pa[g].v, pa[ca].u, pa[ca].v, pa[h].u, pa[h].v, j.map));
            else if (j.envMap) {
                if (j.envMap.mapping instanceof THREE.SphericalReflectionMapping) a = k.matrixWorldInverse, ra.copy(Q.vertexNormalsWorld[g]), $a = 0.5 * (ra.x * a.n11 + ra.y * a.n12 + ra.z * a.n13) + 0.5, ab = 0.5 * -(ra.x * a.n21 + ra.y * a.n22 + ra.z * a.n23) + 0.5, ra.copy(Q.vertexNormalsWorld[ca]), kb = 0.5 * (ra.x * a.n11 + ra.y * a.n12 + ra.z * a.n13) + 0.5, db = 0.5 * -(ra.x * a.n21 + ra.y * a.n22 + ra.z * a.n23) + 0.5, ra.copy(Q.vertexNormalsWorld[h]), hb = 0.5 * (ra.x * a.n11 + ra.y * a.n12 + ra.z * a.n13) + 0.5, nb = 0.5 * -(ra.x * a.n21 + ra.y * a.n22 + ra.z * a.n23) + 0.5, Tc(J, I, D, i, S, B, $a, ab, kb, db, hb, nb, j.envMap)
            } else j.wireframe ? Mb(j.color, j.wireframeLinewidth, j.wireframeLinecap, j.wireframeLinejoin) : Gb(j.color);
            else if (j instanceof THREE.MeshLambertMaterial) j.map && !j.wireframe && (j.map.mapping instanceof THREE.UVMapping && (pa = Q.uvs[0], Tc(J, I, D, i, S, B, pa[g].u, pa[g].v, pa[ca].u, pa[ca].v, pa[h].u, pa[h].v, j.map)), c(THREE.SubtractiveBlending)), Ea ? !j.wireframe && j.shading == THREE.SmoothShading && 3 == Q.vertexNormalsWorld.length ? ($.r = ba.r = Z.r = ga.r, $.g = ba.g = Z.g = ga.g, $.b = ba.b = Z.b = ga.b, p(l, Q.v1.positionWorld, Q.vertexNormalsWorld[0], $), p(l, Q.v2.positionWorld, Q.vertexNormalsWorld[1], ba), p(l, Q.v3.positionWorld, Q.vertexNormalsWorld[2], Z), $.r = Math.max(0, Math.min(j.color.r * $.r, 1)), $.g = Math.max(0, Math.min(j.color.g * $.g, 1)), $.b = Math.max(0, Math.min(j.color.b * $.b, 1)), ba.r = Math.max(0, Math.min(j.color.r * ba.r, 1)), ba.g = Math.max(0, Math.min(j.color.g * ba.g, 1)), ba.b = Math.max(0, Math.min(j.color.b * ba.b, 1)), Z.r = Math.max(0, Math.min(j.color.r * Z.r, 1)), Z.g = Math.max(0, Math.min(j.color.g * Z.g, 1)), Z.b = Math.max(0, Math.min(j.color.b * Z.b, 1)), ja.r = 0.5 * (ba.r + Z.r), ja.g = 0.5 * (ba.g + Z.g), ja.b = 0.5 * (ba.b + Z.b), Da = Dc($, ba, Z, ja), gc(J, I, D, i, S, B, 0, 0, 1, 0, 0, 1, Da)) : (R.r = ga.r, R.g = ga.g, R.b = ga.b, p(l, Q.centroidWorld, Q.normalWorld, R), R.r = Math.max(0, Math.min(j.color.r * R.r, 1)), R.g = Math.max(0, Math.min(j.color.g * R.g, 1)), R.b = Math.max(0, Math.min(j.color.b * R.b, 1)), j.wireframe ? Mb(R, j.wireframeLinewidth, j.wireframeLinecap, j.wireframeLinejoin) : Gb(R)) : j.wireframe ? Mb(j.color, j.wireframeLinewidth, j.wireframeLinecap, j.wireframeLinejoin) : Gb(j.color);
            else if (j instanceof THREE.MeshDepthMaterial) Ka = k.near, Ua = k.far, $.r = $.g = $.b = 1 - ac(a.positionScreen.z, Ka, Ua), ba.r = ba.g = ba.b = 1 - ac(d.positionScreen.z, Ka, Ua), Z.r = Z.g = Z.b = 1 - ac(e.positionScreen.z, Ka, Ua), ja.r = 0.5 * (ba.r + Z.r), ja.g = 0.5 * (ba.g + Z.g), ja.b = 0.5 * (ba.b + Z.b), Da = Dc($, ba, Z, ja), gc(J, I, D, i, S, B, 0, 0, 1, 0, 0, 1, Da);
            else if (j instanceof THREE.MeshNormalMaterial) R.r = hc(Q.normalWorld.x), R.g = hc(Q.normalWorld.y), R.b = hc(Q.normalWorld.z), j.wireframe ? Mb(R, j.wireframeLinewidth, j.wireframeLinecap, j.wireframeLinejoin) : Gb(R)
        }
        function v(a, d, e, g, ca, h, j, Q, sa) {
            f.info.render.vertices += 4;
            f.info.render.faces++;
            b(Q.opacity);
            c(Q.blending);
            if (Q.map || Q.envMap) t(a, d, g, 0, 1, 3, j, Q, sa), t(ca, e, h, 1, 2, 3, j, Q, sa);
            else if (J = a.positionScreen.x, I = a.positionScreen.y, D = d.positionScreen.x, i = d.positionScreen.y, S = e.positionScreen.x, B = e.positionScreen.y, A = g.positionScreen.x, V = g.positionScreen.y, E = ca.positionScreen.x, aa = ca.positionScreen.y, ea = h.positionScreen.x, ia = h.positionScreen.y, Q instanceof THREE.MeshBasicMaterial) w(J, I, D, i, S, B, A, V), Q.wireframe ? Mb(Q.color, Q.wireframeLinewidth, Q.wireframeLinecap, Q.wireframeLinejoin) : Gb(Q.color);
            else if (Q instanceof THREE.MeshLambertMaterial) Ea ? !Q.wireframe && Q.shading == THREE.SmoothShading && 4 == j.vertexNormalsWorld.length ? ($.r = ba.r = Z.r = ja.r = ga.r, $.g = ba.g = Z.g = ja.g = ga.g, $.b = ba.b = Z.b = ja.b = ga.b, p(l, j.v1.positionWorld, j.vertexNormalsWorld[0], $), p(l, j.v2.positionWorld, j.vertexNormalsWorld[1], ba), p(l, j.v4.positionWorld, j.vertexNormalsWorld[3], Z), p(l, j.v3.positionWorld, j.vertexNormalsWorld[2], ja), $.r = Math.max(0, Math.min(Q.color.r * $.r, 1)), $.g = Math.max(0, Math.min(Q.color.g * $.g, 1)), $.b = Math.max(0, Math.min(Q.color.b * $.b, 1)), ba.r = Math.max(0, Math.min(Q.color.r * ba.r, 1)), ba.g = Math.max(0, Math.min(Q.color.g * ba.g, 1)), ba.b = Math.max(0, Math.min(Q.color.b * ba.b, 1)), Z.r = Math.max(0, Math.min(Q.color.r * Z.r, 1)), Z.g = Math.max(0, Math.min(Q.color.g * Z.g, 1)), Z.b = Math.max(0, Math.min(Q.color.b * Z.b, 1)), ja.r = Math.max(0, Math.min(Q.color.r * ja.r, 1)), ja.g = Math.max(0, Math.min(Q.color.g * ja.g, 1)), ja.b = Math.max(0, Math.min(Q.color.b * ja.b, 1)), Da = Dc($, ba, Z, ja), u(J, I, D, i, A, V), gc(J, I, D, i, A, V, 0, 0, 1, 0, 0, 1, Da), u(E, aa, S, B, ea, ia), gc(E, aa, S, B, ea, ia, 1, 0, 1, 1, 0, 1, Da)) : (R.r = ga.r, R.g = ga.g, R.b = ga.b, p(l, j.centroidWorld, j.normalWorld, R), R.r = Math.max(0, Math.min(Q.color.r * R.r, 1)), R.g = Math.max(0, Math.min(Q.color.g * R.g, 1)), R.b = Math.max(0, Math.min(Q.color.b * R.b, 1)), w(J, I, D, i, S, B, A, V), Q.wireframe ? Mb(R, Q.wireframeLinewidth, Q.wireframeLinecap, Q.wireframeLinejoin) : Gb(R)) : (w(J, I, D, i, S, B, A, V), Q.wireframe ? Mb(Q.color, Q.wireframeLinewidth, Q.wireframeLinecap, Q.wireframeLinejoin) : Gb(Q.color));
            else if (Q instanceof THREE.MeshNormalMaterial) R.r = hc(j.normalWorld.x), R.g = hc(j.normalWorld.y), R.b = hc(j.normalWorld.z), w(J, I, D, i, S, B, A, V), Q.wireframe ? Mb(R, Q.wireframeLinewidth, Q.wireframeLinecap, Q.wireframeLinejoin) : Gb(R);
            else if (Q instanceof THREE.MeshDepthMaterial) Ka = k.near, Ua = k.far, $.r = $.g = $.b = 1 - ac(a.positionScreen.z, Ka, Ua), ba.r = ba.g = ba.b = 1 - ac(d.positionScreen.z, Ka, Ua), Z.r = Z.g = Z.b = 1 - ac(g.positionScreen.z, Ka, Ua), ja.r = ja.g = ja.b = 1 - ac(e.positionScreen.z, Ka, Ua), Da = Dc($, ba, Z, ja), u(J, I, D, i, A, V), gc(J, I, D, i, A, V, 0, 0, 1, 0, 0, 1, Da), u(E, aa, S, B, ea, ia), gc(E, aa, S, B, ea, ia, 1, 0, 1, 1, 0, 1, Da)
        }
        function u(a, b, c, d, e, f) {
            n.beginPath();
            n.moveTo(a, b);
            n.lineTo(c, d);
            n.lineTo(e, f);
            n.lineTo(a, b);
            n.closePath()
        }
        function w(a, b, c, d, e, f, g, ca) {
            n.beginPath();
            n.moveTo(a, b);
            n.lineTo(c, d);
            n.lineTo(e, f);
            n.lineTo(g, ca);
            n.lineTo(a, b);
            n.closePath()
        }
        function Mb(a, b, c, e) {
            if (z != b) n.lineWidth = z = b;
            if (F != c) n.lineCap = F = c;
            if (C != e) n.lineJoin = C = e;
            d(a.getContextStyle());
            n.stroke();
            va.inflate(2 * b)
        }
        function Gb(a) {
            e(a.getContextStyle());
            n.fill()
        }
        function Tc(a, b, c, d, f, g, ca, h, i, Q, j, l, k) {
            if (0 != k.image.width) {
                if (!0 == k.needsUpdate || void 0 == Ga[k.id]) {
                    var sa = k.wrapS == THREE.RepeatWrapping,
                        Ra = k.wrapT == THREE.RepeatWrapping;
                    Ga[k.id] = n.createPattern(k.image, sa && Ra ? "repeat" : sa && !Ra ? "repeat-x" : !sa && Ra ? "repeat-y" : "no-repeat");
                    k.needsUpdate = !1
                }
                e(Ga[k.id]);
                var sa = k.offset.x / k.repeat.x,
                    Ra = k.offset.y / k.repeat.y,
                    m = k.image.width * k.repeat.x,
                    o = k.image.height * k.repeat.y,
                    ca = (ca + sa) * m,
                    h = (h + Ra) * o,
                    c = c - a,
                    d = d - b,
                    f = f - a,
                    g = g - b,
                    i = (i + sa) * m - ca,
                    Q = (Q + Ra) * o - h,
                    j = (j + sa) * m - ca,
                    l = (l + Ra) * o - h,
                    sa = i * l - j * Q;
                if (0 == sa) {
                    if (void 0 === oa[k.id]) b = document.createElement("canvas"), b.width = k.image.width, b.height = k.image.height, b = b.getContext("2d"), b.drawImage(k.image, 0, 0), oa[k.id] = b.getImageData(0, 0, k.image.width, k.image.height).data;
                    b = oa[k.id];
                    ca = 4 * (Math.floor(ca) + Math.floor(h) * k.image.width);
                    R.setRGB(b[ca] / 255, b[ca + 1] / 255, b[ca + 2] / 255);
                    Gb(R)
                } else sa = 1 / sa, k = (l * c - Q * f) * sa, Q = (l * d - Q * g) * sa, c = (i * f - j * c) * sa, d = (i * g - j * d) * sa, a = a - k * ca - c * h, ca = b - Q * ca - d * h, n.save(), n.transform(k, Q, c, d, a, ca), n.fill(), n.restore()
            }
        }
        function gc(a, b, c, d, e, f, g, ca, h, i, Q, j, l) {
            var k, sa;
            k = l.width - 1;
            sa = l.height - 1;
            g *= k;
            ca *= sa;
            c -= a;
            d -= b;
            e -= a;
            f -= b;
            h = h * k - g;
            i = i * sa - ca;
            Q = Q * k - g;
            j = j * sa - ca;
            sa = 1 / (h * j - Q * i);
            k = (j * c - i * e) * sa;
            i = (j * d - i * f) * sa;
            c = (h * e - Q * c) * sa;
            d = (h * f - Q * d) * sa;
            a = a - k * g - c * ca;
            b = b - i * g - d * ca;
            n.save();
            n.transform(k, i, c, d, a, b);
            n.clip();
            n.drawImage(l, 0, 0);
            n.restore()
        }
        function Dc(a, b, c, d) {
            var e = ~~ (255 * a.r),
                f = ~~ (255 * a.g),
                a = ~~ (255 * a.b),
                g = ~~ (255 * b.r),
                h = ~~ (255 * b.g),
                b = ~~ (255 * b.b),
                i = ~~ (255 * c.r),
                j = ~~ (255 * c.g),
                c = ~~ (255 * c.b),
                l = ~~ (255 * d.r),
                k = ~~ (255 * d.g),
                d = ~~ (255 * d.b);
            Ra[0] = 0 > e ? 0 : 255 < e ? 255 : e;
            Ra[1] = 0 > f ? 0 : 255 < f ? 255 : f;
            Ra[2] = 0 > a ? 0 : 255 < a ? 255 : a;
            Ra[4] = 0 > g ? 0 : 255 < g ? 255 : g;
            Ra[5] = 0 > h ? 0 : 255 < h ? 255 : h;
            Ra[6] = 0 > b ? 0 : 255 < b ? 255 : b;
            Ra[8] = 0 > i ? 0 : 255 < i ? 255 : i;
            Ra[9] = 0 > j ? 0 : 255 < j ? 255 : j;
            Ra[10] = 0 > c ? 0 : 255 < c ? 255 : c;
            Ra[12] = 0 > l ? 0 : 255 < l ? 255 : l;
            Ra[13] = 0 > k ? 0 : 255 < k ? 255 : k;
            Ra[14] = 0 > d ? 0 : 255 < d ? 255 : d;
            Q.putImageData(sa, 0, 0);
            Cc.drawImage(ca, 0, 0);
            return pc
        }
        function ac(a, b, c) {
            a = (a - b) / (c - b);
            return a * a * (3 - 2 * a)
        }
        function hc(a) {
            a = 0.5 * (a + 1);
            return 0 > a ? 0 : 1 < a ? 1 : a
        }
        function Nb(a, b) {
            var c = b.x - a.x,
                d = b.y - a.y,
                e = c * c + d * d;
            0 != e && (e = 1 / Math.sqrt(e), c *= e, d *= e, b.x += c, b.y += d, a.x -= c, a.y -= d)
        }
        var Ec, cd, Sa, lb;
        this.autoClear ? this.clear() : n.setTransform(1, 0, 0, -1, o, r);
        f.info.render.vertices = 0;
        f.info.render.faces = 0;
        g = j.projectScene(a, k, this.sortElements);
        h = g.elements;
        l = g.lights;
        (Ea = 0 < l.length) && m(l);
        for (Ec = 0, cd = h.length; Ec < cd; Ec++) if (Sa = h[Ec], lb = Sa.material, lb = lb instanceof THREE.MeshFaceMaterial ? Sa.faceMaterial : lb, !(null == lb || 0 == lb.opacity)) {
            va.empty();
            if (Sa instanceof THREE.RenderableParticle) G = Sa, G.x *= o, G.y *= r, q(G, Sa, lb, a);
            else if (Sa instanceof THREE.RenderableLine) G = Sa.v1, K = Sa.v2, G.positionScreen.x *= o, G.positionScreen.y *= r, K.positionScreen.x *= o, K.positionScreen.y *= r, va.addPoint(G.positionScreen.x, G.positionScreen.y), va.addPoint(K.positionScreen.x, K.positionScreen.y), Wa.intersects(va) && s(G, K, Sa, lb, a);
            else if (Sa instanceof THREE.RenderableFace3) G = Sa.v1, K = Sa.v2, N = Sa.v3, G.positionScreen.x *= o, G.positionScreen.y *= r, K.positionScreen.x *= o, K.positionScreen.y *= r, N.positionScreen.x *= o, N.positionScreen.y *= r, lb.overdraw && (Nb(G.positionScreen, K.positionScreen), Nb(K.positionScreen, N.positionScreen), Nb(N.positionScreen, G.positionScreen)), va.add3Points(G.positionScreen.x, G.positionScreen.y, K.positionScreen.x, K.positionScreen.y, N.positionScreen.x, N.positionScreen.y), Wa.intersects(va) && t(G, K, N, 0, 1, 2, Sa, lb, a);
            else if (Sa instanceof THREE.RenderableFace4) G = Sa.v1, K = Sa.v2, N = Sa.v3, P = Sa.v4, G.positionScreen.x *= o, G.positionScreen.y *= r, K.positionScreen.x *= o, K.positionScreen.y *= r, N.positionScreen.x *= o, N.positionScreen.y *= r, P.positionScreen.x *= o, P.positionScreen.y *= r, T.positionScreen.copy(K.positionScreen), O.positionScreen.copy(P.positionScreen), lb.overdraw && (Nb(G.positionScreen, K.positionScreen), Nb(K.positionScreen, P.positionScreen), Nb(P.positionScreen, G.positionScreen), Nb(N.positionScreen, T.positionScreen), Nb(N.positionScreen, O.positionScreen)), va.addPoint(G.positionScreen.x, G.positionScreen.y), va.addPoint(K.positionScreen.x, K.positionScreen.y), va.addPoint(N.positionScreen.x, N.positionScreen.y), va.addPoint(P.positionScreen.x, P.positionScreen.y), Wa.intersects(va) && v(G, K, N, P, T, O, Sa, lb, a);
            qa.addRectangle(va)
        }
        n.setTransform(1, 0, 0, 1, 0, 0)
    }
};
THREE.SVGRenderer = function () {
    function a(a, b, c, d) {
        var e, f, g, h, j, l;
        for (e = 0, f = a.length; e < f; e++) g = a[e], h = g.color, g instanceof THREE.DirectionalLight ? (j = g.matrixWorld.getPosition(), l = c.dot(j), 0 >= l || (l *= g.intensity, d.r += h.r * l, d.g += h.g * l, d.b += h.b * l)) : g instanceof THREE.PointLight && (j = g.matrixWorld.getPosition(), l = c.dot(G.sub(j, b).normalize()), 0 >= l || (l *= 0 == g.distance ? 1 : 1 - Math.min(b.distanceTo(j) / g.distance, 1), 0 != l && (l *= g.intensity, d.r += h.r * l, d.g += h.g * l, d.b += h.b * l)))
    }
    function b(a) {
        null == K[a] && (K[a] = document.createElementNS("http://www.w3.org/2000/svg", "path"), 0 == J && K[a].setAttribute("shape-rendering", "crispEdges"));
        return K[a]
    }
    function c(a) {
        a = 0.5 * (a + 1);
        return 0 > a ? 0 : 1 < a ? 1 : a
    }
    var d = this,
        e, f, g, h = new THREE.Projector,
        l = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
        j, k, p, m, o, r, n, q, s = new THREE.Rectangle,
        u = new THREE.Rectangle,
        v = !1,
        t = new THREE.Color,
        w = new THREE.Color,
        z = new THREE.Color,
        F = new THREE.Color,
        C, G = new THREE.Vector3,
        K = [],
        N = [],
        P, T, O, J = 1;
    this.domElement = l;
    this.sortElements = this.sortObjects = this.autoClear = !0;
    this.info = {
        render: {
            vertices: 0,
            faces: 0
        }
    };
    this.setQuality = function (a) {
        switch (a) {
        case "high":
            J = 1;
            break;
        case "low":
            J = 0
        }
    };
    this.setSize = function (a, b) {
        j = a;
        k = b;
        p = j / 2;
        m = k / 2;
        l.setAttribute("viewBox", -p + " " + -m + " " + j + " " + k);
        l.setAttribute("width", j);
        l.setAttribute("height", k);
        s.set(-p, -m, p, m)
    };
    this.clear = function () {
        for (; 0 < l.childNodes.length;) l.removeChild(l.childNodes[0])
    };
    this.render = function (j, k) {
        var i, G, B, A;
        this.autoClear && this.clear();
        d.info.render.vertices = 0;
        d.info.render.faces = 0;
        e = h.projectScene(j, k, this.sortElements);
        f = e.elements;
        g = e.lights;
        O = T = 0;
        if (v = 0 < g.length) {
            w.setRGB(0, 0, 0);
            z.setRGB(0, 0, 0);
            F.setRGB(0, 0, 0);
            for (i = 0, G = g.length; i < G; i++) A = g[i], B = A.color, A instanceof THREE.AmbientLight ? (w.r += B.r, w.g += B.g, w.b += B.b) : A instanceof THREE.DirectionalLight ? (z.r += B.r, z.g += B.g, z.b += B.b) : A instanceof THREE.PointLight && (F.r += B.r, F.g += B.g, F.b += B.b)
        }
        for (i = 0, G = f.length; i < G; i++) if (B = f[i], A = B.material, A = A instanceof THREE.MeshFaceMaterial ? B.faceMaterial : A, !(null == A || 0 == A.opacity)) if (u.empty(), B instanceof THREE.RenderableParticle) o = B, o.x *= p, o.y *= -m;
        else if (B instanceof THREE.RenderableLine) {
            if (o = B.v1, r = B.v2, o.positionScreen.x *= p, o.positionScreen.y *= -m, r.positionScreen.x *= p, r.positionScreen.y *= -m, u.addPoint(o.positionScreen.x, o.positionScreen.y), u.addPoint(r.positionScreen.x, r.positionScreen.y), s.intersects(u)) {
                B = o;
                var V = r,
                    E = O++;
                null == N[E] && (N[E] = document.createElementNS("http://www.w3.org/2000/svg", "line"), 0 == J && N[E].setAttribute("shape-rendering", "crispEdges"));
                P = N[E];
                P.setAttribute("x1", B.positionScreen.x);
                P.setAttribute("y1", B.positionScreen.y);
                P.setAttribute("x2", V.positionScreen.x);
                P.setAttribute("y2", V.positionScreen.y);
                A instanceof THREE.LineBasicMaterial && (P.setAttribute("style", "fill: none; stroke: " + A.color.getContextStyle() + "; stroke-width: " + A.linewidth + "; stroke-opacity: " + A.opacity + "; stroke-linecap: " + A.linecap + "; stroke-linejoin: " + A.linejoin), l.appendChild(P))
            }
        } else if (B instanceof THREE.RenderableFace3) {
            if (o = B.v1, r = B.v2, n = B.v3, o.positionScreen.x *= p, o.positionScreen.y *= -m, r.positionScreen.x *= p, r.positionScreen.y *= -m, n.positionScreen.x *= p, n.positionScreen.y *= -m, u.addPoint(o.positionScreen.x, o.positionScreen.y), u.addPoint(r.positionScreen.x, r.positionScreen.y), u.addPoint(n.positionScreen.x, n.positionScreen.y), s.intersects(u)) {
                var V = o,
                    E = r,
                    K = n;
                d.info.render.vertices += 3;
                d.info.render.faces++;
                P = b(T++);
                P.setAttribute("d", "M " + V.positionScreen.x + " " + V.positionScreen.y + " L " + E.positionScreen.x + " " + E.positionScreen.y + " L " + K.positionScreen.x + "," + K.positionScreen.y + "z");
                A instanceof THREE.MeshBasicMaterial ? t.copy(A.color) : A instanceof THREE.MeshLambertMaterial ? v ? (t.r = w.r, t.g = w.g, t.b = w.b, a(g, B.centroidWorld, B.normalWorld, t), t.r = Math.max(0, Math.min(A.color.r * t.r, 1)), t.g = Math.max(0, Math.min(A.color.g * t.g, 1)), t.b = Math.max(0, Math.min(A.color.b * t.b, 1))) : t.copy(A.color) : A instanceof THREE.MeshDepthMaterial ? (C = 1 - A.__2near / (A.__farPlusNear - B.z * A.__farMinusNear), t.setRGB(C, C, C)) : A instanceof THREE.MeshNormalMaterial && t.setRGB(c(B.normalWorld.x), c(B.normalWorld.y), c(B.normalWorld.z));
                A.wireframe ? P.setAttribute("style", "fill: none; stroke: " + t.getContextStyle() + "; stroke-width: " + A.wireframeLinewidth + "; stroke-opacity: " + A.opacity + "; stroke-linecap: " + A.wireframeLinecap + "; stroke-linejoin: " + A.wireframeLinejoin) : P.setAttribute("style", "fill: " + t.getContextStyle() + "; fill-opacity: " + A.opacity);
                l.appendChild(P)
            }
        } else if (B instanceof THREE.RenderableFace4 && (o = B.v1, r = B.v2, n = B.v3, q = B.v4, o.positionScreen.x *= p, o.positionScreen.y *= -m, r.positionScreen.x *= p, r.positionScreen.y *= -m, n.positionScreen.x *= p, n.positionScreen.y *= -m, q.positionScreen.x *= p, q.positionScreen.y *= -m, u.addPoint(o.positionScreen.x, o.positionScreen.y), u.addPoint(r.positionScreen.x, r.positionScreen.y), u.addPoint(n.positionScreen.x, n.positionScreen.y), u.addPoint(q.positionScreen.x, q.positionScreen.y), s.intersects(u))) {
            var V = o,
                E = r,
                K = n,
                ea = q;
            d.info.render.vertices += 4;
            d.info.render.faces++;
            P = b(T++);
            P.setAttribute("d", "M " + V.positionScreen.x + " " + V.positionScreen.y + " L " + E.positionScreen.x + " " + E.positionScreen.y + " L " + K.positionScreen.x + "," + K.positionScreen.y + " L " + ea.positionScreen.x + "," + ea.positionScreen.y + "z");
            A instanceof THREE.MeshBasicMaterial ? t.copy(A.color) : A instanceof THREE.MeshLambertMaterial ? v ? (t.r = w.r, t.g = w.g, t.b = w.b, a(g, B.centroidWorld, B.normalWorld, t), t.r = Math.max(0, Math.min(A.color.r * t.r, 1)), t.g = Math.max(0, Math.min(A.color.g * t.g, 1)), t.b = Math.max(0, Math.min(A.color.b * t.b, 1))) : t.copy(A.color) : A instanceof THREE.MeshDepthMaterial ? (C = 1 - A.__2near / (A.__farPlusNear - B.z * A.__farMinusNear), t.setRGB(C, C, C)) : A instanceof THREE.MeshNormalMaterial && t.setRGB(c(B.normalWorld.x), c(B.normalWorld.y), c(B.normalWorld.z));
            A.wireframe ? P.setAttribute("style", "fill: none; stroke: " + t.getContextStyle() + "; stroke-width: " + A.wireframeLinewidth + "; stroke-opacity: " + A.opacity + "; stroke-linecap: " + A.wireframeLinecap + "; stroke-linejoin: " + A.wireframeLinejoin) : P.setAttribute("style", "fill: " + t.getContextStyle() + "; fill-opacity: " + A.opacity);
            l.appendChild(P)
        }
    }
};
THREE.ShaderChunk = {
    fog_pars_fragment: "#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",
    fog_fragment: "#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
    envmap_pars_fragment: "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform float flipEnvMap;\nuniform int combine;\n#endif",
    envmap_fragment: "#ifdef USE_ENVMAP\n#ifdef DOUBLE_SIDED\nfloat flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\nvec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * vReflect.x, vReflect.yz ) );\n#else\nvec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * vReflect.x, vReflect.yz ) );\n#endif\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\nif ( combine == 1 ) {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, reflectivity );\n} else {\ngl_FragColor.xyz = gl_FragColor.xyz * cubeColor.xyz;\n}\n#endif",
    envmap_pars_vertex: "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
    envmap_vertex: "#ifdef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = mat3( objectMatrix[ 0 ].xyz, objectMatrix[ 1 ].xyz, objectMatrix[ 2 ].xyz ) * normal;\nif ( useRefract ) {\nvReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );\n} else {\nvReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );\n}\n#endif",
    map_particle_pars_fragment: "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
    map_particle_fragment: "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, gl_PointCoord );\n#endif",
    map_pars_vertex: "#ifdef USE_MAP\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\n#endif",
    map_pars_fragment: "#ifdef USE_MAP\nvarying vec2 vUv;\nuniform sampler2D map;\n#endif",
    map_vertex: "#ifdef USE_MAP\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",
    map_fragment: "#ifdef USE_MAP\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( map, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( map, vUv );\n#endif\n#endif",
    lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",
    lightmap_pars_vertex: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",
    lightmap_fragment: "#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",
    lightmap_vertex: "#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",
    lights_lambert_pars_vertex: "uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif",
    lights_lambert_vertex: "vLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\nvLightBack = vec3( 0.0 );\n#endif\ntransformedNormal = normalize( transformedNormal );\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, dirVector );\nvec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\ndirectionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\ndirectionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n#ifdef DOUBLE_SIDED\nvLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n#endif\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\npointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\npointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef DOUBLE_SIDED\nvLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;\n#endif\n}\n#endif\nvLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n#ifdef DOUBLE_SIDED\nvLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\n#endif",
    lights_phong_pars_vertex: "#if MAX_POINT_LIGHTS > 0\n#ifndef PHONG_PER_PIXEL\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif",
    lights_phong_vertex: "#if MAX_POINT_LIGHTS > 0\n#ifndef PHONG_PER_PIXEL\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#endif",
    lights_phong_pars_fragment: "uniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#else\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
    lights_phong_fragment: "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#ifdef DOUBLE_SIDED\nnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n#endif\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse  = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vPointLight[ i ].xyz );\nfloat lDistance = vPointLight[ i ].w;\n#endif\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dotProduct, 0.0 );\n#endif\npointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\nvec3 pointHalfVector = normalize( lVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = max( pow( pointDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n#else\npointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;\n#endif\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse  = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, dirVector );\n#ifdef WRAP_AROUND\nfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n#endif\ndirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = max( pow( dirDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n#endif",
    color_pars_fragment: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_fragment: "#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",
    color_pars_vertex: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_vertex: "#ifdef USE_COLOR\n#ifdef GAMMA_INPUT\nvColor = color * color;\n#else\nvColor = color;\n#endif\n#endif",
    skinning_pars_vertex: "#ifdef USE_SKINNING\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\n#endif",
    skinning_vertex: "#ifdef USE_SKINNING\ngl_Position  = ( boneGlobalMatrices[ int( skinIndex.x ) ] * skinVertexA ) * skinWeight.x;\ngl_Position += ( boneGlobalMatrices[ int( skinIndex.y ) ] * skinVertexB ) * skinWeight.y;\ngl_Position  = projectionMatrix * modelViewMatrix * gl_Position;\n#endif",
    morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n#ifndef USE_MORPHNORMALS\nuniform float morphTargetInfluences[ 8 ];\n#else\nuniform float morphTargetInfluences[ 4 ];\n#endif\n#endif",
    morphtarget_vertex: "#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n#ifndef USE_MORPHNORMALS\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n#endif\nmorphed += position;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( morphed, 1.0 );\n#endif",
    default_vertex: "#ifndef USE_MORPHTARGETS\n#ifndef USE_SKINNING\ngl_Position = projectionMatrix * mvPosition;\n#endif\n#endif",
    morphnormal_vertex: "#ifdef USE_MORPHNORMALS\nvec3 morphedNormal = vec3( 0.0 );\nmorphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\nmorphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\nmorphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\nmorphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\nmorphedNormal += normal;\nvec3 transformedNormal = normalMatrix * morphedNormal;\n#else\nvec3 transformedNormal = normalMatrix * normal;\n#endif",
    shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\nuniform sampler2D shadowMap[ MAX_SHADOWS ];\nuniform vec2 shadowMapSize[ MAX_SHADOWS ];\nuniform float shadowDarkness[ MAX_SHADOWS ];\nuniform float shadowBias[ MAX_SHADOWS ];\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nfloat unpackDepth( const in vec4 rgba_depth ) {\nconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\nfloat depth = dot( rgba_depth, bit_shift );\nreturn depth;\n}\n#endif",
    shadowmap_fragment: "#ifdef USE_SHADOWMAP\n#ifdef SHADOWMAP_DEBUG\nvec3 frustumColors[3];\nfrustumColors[0] = vec3( 1.0, 0.5, 0.0 );\nfrustumColors[1] = vec3( 0.0, 1.0, 0.8 );\nfrustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n#endif\n#ifdef SHADOWMAP_CASCADE\nint inFrustumCount = 0;\n#endif\nfloat fDepth;\nvec3 shadowColor = vec3( 1.0 );\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\nbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\nbool inFrustum = all( inFrustumVec );\n#ifdef SHADOWMAP_CASCADE\ninFrustumCount += int( inFrustum );\nbvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n#else\nbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n#endif\nbool frustumTest = all( frustumTestVec );\nif ( frustumTest ) {\nshadowCoord.z += shadowBias[ i ];\n#ifdef SHADOWMAP_SOFT\nfloat shadow = 0.0;\nconst float shadowDelta = 1.0 / 9.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.25 * xPixelOffset;\nfloat dy0 = -1.25 * yPixelOffset;\nfloat dx1 = 1.25 * xPixelOffset;\nfloat dy1 = 1.25 * yPixelOffset;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#else\nvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\nfloat fDepth = unpackDepth( rgbaDepth );\nif ( fDepth < shadowCoord.z )\nshadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n#endif\n}\n#ifdef SHADOWMAP_DEBUG\n#ifdef SHADOWMAP_CASCADE\nif ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];\n#else\nif ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];\n#endif\n#endif\n}\n#ifdef GAMMA_OUTPUT\nshadowColor *= shadowColor;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n#endif",
    shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n#endif",
    shadowmap_vertex: "#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\n#ifdef USE_MORPHTARGETS\nvShadowCoord[ i ] = shadowMatrix[ i ] * objectMatrix * vec4( morphed, 1.0 );\n#else\nvShadowCoord[ i ] = shadowMatrix[ i ] * objectMatrix * vec4( position, 1.0 );\n#endif\n}\n#endif",
    alphatest_fragment: "#ifdef ALPHATEST\nif ( gl_FragColor.a < ALPHATEST ) discard;\n#endif",
    linear_to_gamma_fragment: "#ifdef GAMMA_OUTPUT\ngl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n#endif"
};
THREE.UniformsUtils = {
    merge: function (a) {
        var b, c, d, e = {};
        for (b = 0; b < a.length; b++) for (c in d = this.clone(a[b]), d) e[c] = d[c];
        return e
    },
    clone: function (a) {
        var b, c, d, e = {};
        for (b in a) for (c in e[b] = {}, a[b]) d = a[b][c], e[b][c] = d instanceof THREE.Color || d instanceof THREE.Vector2 || d instanceof THREE.Vector3 || d instanceof THREE.Vector4 || d instanceof THREE.Matrix4 || d instanceof THREE.Texture ? d.clone() : d instanceof Array ? d.slice() : d;
        return e
    }
};
THREE.UniformsLib = {
    common: {
        diffuse: {
            type: "c",
            value: new THREE.Color(15658734)
        },
        opacity: {
            type: "f",
            value: 1
        },
        map: {
            type: "t",
            value: 0,
            texture: null
        },
        offsetRepeat: {
            type: "v4",
            value: new THREE.Vector4(0, 0, 1, 1)
        },
        lightMap: {
            type: "t",
            value: 2,
            texture: null
        },
        envMap: {
            type: "t",
            value: 1,
            texture: null
        },
        flipEnvMap: {
            type: "f",
            value: -1
        },
        useRefract: {
            type: "i",
            value: 0
        },
        reflectivity: {
            type: "f",
            value: 1
        },
        refractionRatio: {
            type: "f",
            value: 0.98
        },
        combine: {
            type: "i",
            value: 0
        },
        morphTargetInfluences: {
            type: "f",
            value: 0
        }
    },
    fog: {
        fogDensity: {
            type: "f",
            value: 2.5E-4
        },
        fogNear: {
            type: "f",
            value: 1
        },
        fogFar: {
            type: "f",
            value: 2E3
        },
        fogColor: {
            type: "c",
            value: new THREE.Color(16777215)
        }
    },
    lights: {
        ambientLightColor: {
            type: "fv",
            value: []
        },
        directionalLightDirection: {
            type: "fv",
            value: []
        },
        directionalLightColor: {
            type: "fv",
            value: []
        },
        pointLightColor: {
            type: "fv",
            value: []
        },
        pointLightPosition: {
            type: "fv",
            value: []
        },
        pointLightDistance: {
            type: "fv1",
            value: []
        }
    },
    particle: {
        psColor: {
            type: "c",
            value: new THREE.Color(15658734)
        },
        opacity: {
            type: "f",
            value: 1
        },
        size: {
            type: "f",
            value: 1
        },
        scale: {
            type: "f",
            value: 1
        },
        map: {
            type: "t",
            value: 0,
            texture: null
        },
        fogDensity: {
            type: "f",
            value: 2.5E-4
        },
        fogNear: {
            type: "f",
            value: 1
        },
        fogFar: {
            type: "f",
            value: 2E3
        },
        fogColor: {
            type: "c",
            value: new THREE.Color(16777215)
        }
    },
    shadowmap: {
        shadowMap: {
            type: "tv",
            value: 6,
            texture: []
        },
        shadowMapSize: {
            type: "v2v",
            value: []
        },
        shadowBias: {
            type: "fv1",
            value: []
        },
        shadowDarkness: {
            type: "fv1",
            value: []
        },
        shadowMatrix: {
            type: "m4v",
            value: []
        }
    }
};
THREE.ShaderLib = {
    depth: {
        uniforms: {
            mNear: {
                type: "f",
                value: 1
            },
            mFar: {
                type: "f",
                value: 2E3
            },
            opacity: {
                type: "f",
                value: 1
            }
        },
        vertexShader: "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
        fragmentShader: "uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}"
    },
    normal: {
        uniforms: {
            opacity: {
                type: "f",
                value: 1
            }
        },
        vertexShader: "varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalMatrix * normal;\ngl_Position = projectionMatrix * mvPosition;\n}",
        fragmentShader: "uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}"
    },
    basic: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.shadowmap]),
        vertexShader: [THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( diffuse, opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
    },
    lambert: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap,
        {
            ambient: {
                type: "c",
                value: new THREE.Color(16777215)
            },
            emissive: {
                type: "c",
                value: new THREE.Color(0)
            },
            wrapRGB: {
                type: "v3",
                value: new THREE.Vector3(1, 1, 1)
            }
        }]),
        vertexShader: ["varying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_lambert_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.lights_lambert_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, "#ifdef DOUBLE_SIDED\nif ( gl_FrontFacing )\ngl_FragColor.xyz *= vLightFront;\nelse\ngl_FragColor.xyz *= vLightBack;\n#else\ngl_FragColor.xyz *= vLightFront;\n#endif", THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
    },
    phong: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap,
        {
            ambient: {
                type: "c",
                value: new THREE.Color(16777215)
            },
            emissive: {
                type: "c",
                value: new THREE.Color(0)
            },
            specular: {
                type: "c",
                value: new THREE.Color(1118481)
            },
            shininess: {
                type: "f",
                value: 30
            },
            wrapRGB: {
                type: "v3",
                value: new THREE.Vector3(1, 1, 1)
            }
        }]),
        vertexShader: ["varying vec3 vViewPosition;\nvarying vec3 vNormal;", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_phong_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, "#ifndef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\n#endif\nvViewPosition = -mvPosition.xyz;", THREE.ShaderChunk.morphnormal_vertex, "vNormal = transformedNormal;", THREE.ShaderChunk.lights_phong_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.lights_phong_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.lights_phong_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
    },
    particle_basic: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.particle, THREE.UniformsLib.shadowmap]),
        vertexShader: ["uniform float size;\nuniform float scale;", THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;", THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 psColor;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_particle_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( psColor, opacity );", THREE.ShaderChunk.map_particle_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
    },
    depthRGBA: {
        uniforms: {},
        vertexShader: [THREE.ShaderChunk.morphtarget_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, "}"].join("\n"),
        fragmentShader: "vec4 pack_depth( const in float depth ) {\nconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\nconst vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\nvec4 res = fract( depth * bit_shift );\nres -= res.xxyz * bit_mask;\nreturn res;\n}\nvoid main() {\ngl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n}"
    }
};
THREE.WebGLRenderer = function (a) {
    function b(a, b) {
        var c = a.vertices.length,
            d = b.material;
        if (d.attributes) {
            if (void 0 === a.__webglCustomAttributesList) a.__webglCustomAttributesList = [];
            for (var e in d.attributes) {
                var f = d.attributes[e];
                if (!f.__webglInitialized || f.createUniqueBuffers) {
                    f.__webglInitialized = !0;
                    var g = 1;
                    "v2" === f.type ? g = 2 : "v3" === f.type ? g = 3 : "v4" === f.type ? g = 4 : "c" === f.type && (g = 3);
                    f.size = g;
                    f.array = new Float32Array(c * g);
                    f.buffer = i.createBuffer();
                    f.buffer.belongsToAttribute = e;
                    f.needsUpdate = !0
                }
                a.__webglCustomAttributesList.push(f)
            }
        }
    }

    function c(a, b) {
        if (a.material && !(a.material instanceof THREE.MeshFaceMaterial)) return a.material;
        if (0 <= b.materialIndex) return a.geometry.materials[b.materialIndex]
    }
    function d(a) {
        return a instanceof THREE.MeshBasicMaterial && !a.envMap || a instanceof THREE.MeshDepthMaterial ? !1 : a && void 0 !== a.shading && a.shading === THREE.SmoothShading ? THREE.SmoothShading : THREE.FlatShading
    }
    function e(a) {
        return a.map || a.lightMap || a instanceof THREE.ShaderMaterial ? !0 : !1
    }
    function f(a, b, c) {
        var d, e, f, g, h = a.vertices;
        g = h.length;
        var j = a.colors,
            l = j.length,
            k = a.__vertexArray,
            n = a.__colorArray,
            m = a.__sortArray,
            o = a.__dirtyVertices,
            p = a.__dirtyColors,
            r = a.__webglCustomAttributesList;
        if (c.sortParticles) {
            va.copy(qa);
            va.multiplySelf(c.matrixWorld);
            for (d = 0; d < g; d++) e = h[d].position, Ea.copy(e), va.multiplyVector3(Ea), m[d] = [Ea.z, d];
            m.sort(function (a, b) {
                return b[0] - a[0]
            });
            for (d = 0; d < g; d++) e = h[m[d][1]].position, f = 3 * d, k[f] = e.x, k[f + 1] = e.y, k[f + 2] = e.z;
            for (d = 0; d < l; d++) f = 3 * d, e = j[m[d][1]], n[f] = e.r, n[f + 1] = e.g, n[f + 2] = e.b;
            if (r) for (j = 0, l = r.length; j < l; j++) if (h = r[j], void 0 === h.boundTo || "vertices" === h.boundTo) if (f = 0, e = h.value.length, 1 === h.size) for (d = 0; d < e; d++) g = m[d][1], h.array[d] = h.value[g];
            else if (2 === h.size) for (d = 0; d < e; d++) g = m[d][1], g = h.value[g], h.array[f] = g.x, h.array[f + 1] = g.y, f += 2;
            else if (3 === h.size) if ("c" === h.type) for (d = 0; d < e; d++) g = m[d][1], g = h.value[g], h.array[f] = g.r, h.array[f + 1] = g.g, h.array[f + 2] = g.b, f += 3;
            else for (d = 0; d < e; d++) g = m[d][1], g = h.value[g], h.array[f] = g.x, h.array[f + 1] = g.y, h.array[f + 2] = g.z, f += 3;
            else if (4 === h.size) for (d = 0; d < e; d++) g = m[d][1], g = h.value[g], h.array[f] = g.x, h.array[f + 1] = g.y, h.array[f + 2] = g.z, h.array[f + 3] = g.w, f += 4
        } else {
            if (o) for (d = 0; d < g; d++) e = h[d].position, f = 3 * d, k[f] = e.x, k[f + 1] = e.y, k[f + 2] = e.z;
            if (p) for (d = 0; d < l; d++) e = j[d], f = 3 * d, n[f] = e.r, n[f + 1] = e.g, n[f + 2] = e.b;
            if (r) for (j = 0, l = r.length; j < l; j++) if (h = r[j], h.needsUpdate && (void 0 === h.boundTo || "vertices" === h.boundTo)) if (e = h.value.length, f = 0, 1 === h.size) for (d = 0; d < e; d++) h.array[d] = h.value[d];
            else if (2 === h.size) for (d = 0; d < e; d++) g = h.value[d], h.array[f] = g.x, h.array[f + 1] = g.y, f += 2;
            else if (3 === h.size) if ("c" === h.type) for (d = 0; d < e; d++) g = h.value[d], h.array[f] = g.r, h.array[f + 1] = g.g, h.array[f + 2] = g.b, f += 3;
            else for (d = 0; d < e; d++) g = h.value[d], h.array[f] = g.x, h.array[f + 1] = g.y, h.array[f + 2] = g.z, f += 3;
            else if (4 === h.size) for (d = 0; d < e; d++) g = h.value[d], h.array[f] = g.x, h.array[f + 1] = g.y, h.array[f + 2] = g.z, h.array[f + 3] = g.w, f += 4
        }
        if (o || c.sortParticles) i.bindBuffer(i.ARRAY_BUFFER, a.__webglVertexBuffer), i.bufferData(i.ARRAY_BUFFER, k, b);
        if (p || c.sortParticles) i.bindBuffer(i.ARRAY_BUFFER, a.__webglColorBuffer), i.bufferData(i.ARRAY_BUFFER, n, b);
        if (r) for (j = 0, l = r.length; j < l; j++) if (h = r[j], h.needsUpdate || c.sortParticles) i.bindBuffer(i.ARRAY_BUFFER, h.buffer), i.bufferData(i.ARRAY_BUFFER, h.array, b)
    }
    function g(a, b) {
        return b.z - a.z
    }
    function h(a, b, c) {
        if (a.length) for (var d = 0, e = a.length; d < e; d++) aa = B = null, V = E = oa = Ga = $ = -1, a[d].render(b, c, hb, nb), aa = B = null, V = E = oa = Ga = $ = -1
    }
    function l(a, b, c, d, e, f, g, h) {
        var i, j, l, k;
        b ? (j = a.length - 1, k = b = -1) : (j = 0, b = a.length, k = 1);
        for (var n = j; n !== b; n += k) if (i = a[n], i.render) {
            j = i.object;
            l = i.buffer;
            if (h) i = h;
            else {
                i = i[c];
                if (!i) continue;
                g && D.setBlending(i.blending, i.blendEquation, i.blendSrc, i.blendDst);
                D.setDepthTest(i.depthTest);
                D.setDepthWrite(i.depthWrite);
                s(i.polygonOffset, i.polygonOffsetFactor, i.polygonOffsetUnits)
            }
            D.setObjectFaces(j);
            l instanceof THREE.BufferGeometry ? D.renderBufferDirect(d, e, f, i, l, j) : D.renderBuffer(d, e, f, i, l, j)
        }
    }
    function j(a, b, c, d, e, f, g) {
        for (var h, i, j = 0, l = a.length; j < l; j++) if (h = a[j], i = h.object, i.visible) {
            if (g) h = g;
            else {
                h = h[b];
                if (!h) continue;
                f && D.setBlending(h.blending, h.blendEquation, h.blendSrc, h.blendDst);
                D.setDepthTest(h.depthTest);
                D.setDepthWrite(h.depthWrite);
                s(h.polygonOffset, h.polygonOffsetFactor, h.polygonOffsetUnits)
            }
            D.renderImmediateObject(c, d, e, h, i)
        }
    }
    function k(a, b, c) {
        a.push({
            buffer: b,
            object: c,
            opaque: null,
            transparent: null
        })
    }
    function p(a) {
        for (var b in a.attributes) if (a.attributes[b].needsUpdate) return !0;
        return !1
    }
    function m(a) {
        for (var b in a.attributes) a.attributes[b].needsUpdate = !1
    }
    function o(a, b) {
        for (var c = a.length - 1; 0 <= c; c--) a[c].object === b && a.splice(c, 1)
    }
    function r(a, b) {
        for (var c = a.length - 1; 0 <= c; c--) a[c] === b && a.splice(c, 1)
    }
    function n(a, b, c, d, e) {
        if (!d.program || d.needsUpdate) D.initMaterial(d, b, c, e), d.needsUpdate = !1;
        if (d.morphTargets && !e.__webglMorphTargetInfluences) {
            e.__webglMorphTargetInfluences = new Float32Array(D.maxMorphTargets);
            for (var f = 0, g = D.maxMorphTargets; f < g; f++) e.__webglMorphTargetInfluences[f] = 0
        }
        var h = !1,
            f = d.program,
            g = f.uniforms,
            j = d.uniforms;
        f !== B && (i.useProgram(f), B = f, h = !0);
        if (d.id !== V) V = d.id, h = !0;
        if (h || a !== aa) i.uniformMatrix4fv(g.projectionMatrix, !1, a._projectionMatrixArray), a !== aa && (aa = a);
        if (h) {
            if (c && d.fog) if (j.fogColor.value = c.color, c instanceof THREE.Fog) j.fogNear.value = c.near, j.fogFar.value = c.far;
            else if (c instanceof THREE.FogExp2) j.fogDensity.value = c.density;
            if (d instanceof THREE.MeshPhongMaterial || d instanceof THREE.MeshLambertMaterial || d.lights) {
                var l, k = 0,
                    n = 0,
                    m = 0,
                    o, p, r, q = Xa,
                    s = q.directional.colors,
                    t = q.directional.positions,
                    A = q.point.colors,
                    u = q.point.positions,
                    E = q.point.distances,
                    w = 0,
                    C = 0,
                    G = r = 0;
                for (c = 0, h = b.length; c < h; c++) if (l = b[c], !l.onlyShadow) if (o = l.color, p = l.intensity, r = l.distance, l instanceof
                THREE.AmbientLight) D.gammaInput ? (k += o.r * o.r, n += o.g * o.g, m += o.b * o.b) : (k += o.r, n += o.g, m += o.b);
                else if (l instanceof THREE.DirectionalLight) r = 3 * w, D.gammaInput ? (s[r] = o.r * o.r * p * p, s[r + 1] = o.g * o.g * p * p, s[r + 2] = o.b * o.b * p * p) : (s[r] = o.r * p, s[r + 1] = o.g * p, s[r + 2] = o.b * p), ga.copy(l.matrixWorld.getPosition()), ga.subSelf(l.target.matrixWorld.getPosition()), ga.normalize(), t[r] = ga.x, t[r + 1] = ga.y, t[r + 2] = ga.z, w += 1;
                else if (l instanceof THREE.PointLight || l instanceof THREE.SpotLight) G = 3 * C, D.gammaInput ? (A[G] = o.r * o.r * p * p, A[G + 1] = o.g * o.g * p * p, A[G + 2] = o.b * o.b * p * p) : (A[G] = o.r * p, A[G + 1] = o.g * p, A[G + 2] = o.b * p), l = l.matrixWorld.getPosition(), u[G] = l.x, u[G + 1] = l.y, u[G + 2] = l.z, E[C] = r, C += 1;
                for (c = 3 * w, h = s.length; c < h; c++) s[c] = 0;
                for (c = 3 * C, h = A.length; c < h; c++) A[c] = 0;
                q.point.length = C;
                q.directional.length = w;
                q.ambient[0] = k;
                q.ambient[1] = n;
                q.ambient[2] = m;
                c = Xa;
                j.ambientLightColor.value = c.ambient;
                j.directionalLightColor.value = c.directional.colors;
                j.directionalLightDirection.value = c.directional.positions;
                j.pointLightColor.value = c.point.colors;
                j.pointLightPosition.value = c.point.positions;
                j.pointLightDistance.value = c.point.distances
            }
            if (d instanceof THREE.MeshBasicMaterial || d instanceof THREE.MeshLambertMaterial || d instanceof THREE.MeshPhongMaterial) j.opacity.value = d.opacity, D.gammaInput ? j.diffuse.value.copyGammaToLinear(d.color) : j.diffuse.value = d.color, (j.map.texture = d.map) && j.offsetRepeat.value.set(d.map.offset.x, d.map.offset.y, d.map.repeat.x, d.map.repeat.y), j.lightMap.texture = d.lightMap, j.envMap.texture = d.envMap, j.flipEnvMap.value = d.envMap instanceof THREE.WebGLRenderTargetCube ? 1 : -1, j.reflectivity.value = d.reflectivity, j.refractionRatio.value = d.refractionRatio, j.combine.value = d.combine, j.useRefract.value = d.envMap && d.envMap.mapping instanceof THREE.CubeRefractionMapping;
            if (d instanceof THREE.LineBasicMaterial) j.diffuse.value = d.color, j.opacity.value = d.opacity;
            else if (d instanceof THREE.ParticleBasicMaterial) j.psColor.value = d.color, j.opacity.value = d.opacity, j.size.value = d.size, j.scale.value = F.height / 2, j.map.texture = d.map;
            else if (d instanceof THREE.MeshPhongMaterial) j.shininess.value = d.shininess, D.gammaInput ? (j.ambient.value.copyGammaToLinear(d.ambient), j.emissive.value.copyGammaToLinear(d.emissive), j.specular.value.copyGammaToLinear(d.specular)) : (j.ambient.value = d.ambient, j.emissive.value = d.emissive, j.specular.value = d.specular), d.wrapAround && j.wrapRGB.value.copy(d.wrapRGB);
            else if (d instanceof THREE.MeshLambertMaterial) D.gammaInput ? (j.ambient.value.copyGammaToLinear(d.ambient), j.emissive.value.copyGammaToLinear(d.emissive)) : (j.ambient.value = d.ambient, j.emissive.value = d.emissive), d.wrapAround && j.wrapRGB.value.copy(d.wrapRGB);
            else if (d instanceof THREE.MeshDepthMaterial) j.mNear.value = a.near, j.mFar.value = a.far, j.opacity.value = d.opacity;
            else if (d instanceof THREE.MeshNormalMaterial) j.opacity.value = d.opacity;
            if (e.receiveShadow && !d._shadowPass && j.shadowMatrix) {
                h = c = 0;
                for (k = b.length; h < k; h++) if (n = b[h], n.castShadow && (n instanceof THREE.SpotLight || n instanceof THREE.DirectionalLight && !n.shadowCascade)) j.shadowMap.texture[c] = n.shadowMap, j.shadowMapSize.value[c] = n.shadowMapSize, j.shadowMatrix.value[c] = n.shadowMatrix, j.shadowDarkness.value[c] = n.shadowDarkness, j.shadowBias.value[c] = n.shadowBias, c++
            }
            b = d.uniformsList;
            for (j = 0, c = b.length; j < c; j++) if (n = f.uniforms[b[j][1]]) if (h = b[j][0], m = h.type, k = h.value, "i" === m) i.uniform1i(n, k);
            else if ("f" === m) i.uniform1f(n, k);
            else if ("v2" === m) i.uniform2f(n, k.x, k.y);
            else if ("v3" === m) i.uniform3f(n, k.x, k.y, k.z);
            else if ("v4" === m) i.uniform4f(n, k.x, k.y, k.z, k.w);
            else if ("c" === m) i.uniform3f(n, k.r, k.g, k.b);
            else if ("fv1" === m) i.uniform1fv(n, k);
            else if ("fv" === m) i.uniform3fv(n, k);
            else if ("v2v" === m) {
                if (!h._array) h._array = new Float32Array(2 * k.length);
                for (m = 0, q = k.length; m < q; m++) s = 2 * m, h._array[s] = k[m].x, h._array[s + 1] = k[m].y;
                i.uniform2fv(n, h._array)
            } else if ("v3v" === m) {
                if (!h._array) h._array = new Float32Array(3 * k.length);
                for (m = 0, q = k.length; m < q; m++) s = 3 * m, h._array[s] = k[m].x, h._array[s + 1] = k[m].y, h._array[s + 2] = k[m].z;
                i.uniform3fv(n, h._array)
            } else if ("v4v" == m) {
                if (!h._array) h._array = new Float32Array(4 * k.length);
                for (m = 0, q = k.length; m < q; m++) s = 4 * m, h._array[s] = k[m].x, h._array[s + 1] = k[m].y, h._array[s + 2] = k[m].z, h._array[s + 3] = k[m].w;
                i.uniform4fv(n, h._array)
            } else if ("m4" === m) {
                if (!h._array) h._array = new Float32Array(16);
                k.flattenToArray(h._array);
                i.uniformMatrix4fv(n, !1, h._array)
            } else if ("m4v" === m) {
                if (!h._array) h._array = new Float32Array(16 * k.length);
                for (m = 0, q = k.length; m < q; m++) k[m].flattenToArrayOffset(h._array, 16 * m);
                i.uniformMatrix4fv(n, !1, h._array)
            } else if ("t" === m) {
                if (i.uniform1i(n, k), n = h.texture) if (n.image instanceof Array && 6 === n.image.length) {
                    if (h = n, 6 === h.image.length) if (h.needsUpdate) {
                        if (!h.image.__webglTextureCube) h.image.__webglTextureCube = i.createTexture();
                        i.activeTexture(i.TEXTURE0 + k);
                        i.bindTexture(i.TEXTURE_CUBE_MAP, h.image.__webglTextureCube);
                        k = [];
                        for (n = 0; 6 > n; n++) {
                            m = k;
                            q = n;
                            if (D.autoScaleCubemaps) {
                                if (s = h.image[n], A = ra, !(s.width <= A && s.height <= A)) u = Math.max(s.width, s.height), t = Math.floor(s.width * A / u), A = Math.floor(s.height * A / u), u = document.createElement("canvas"), u.width = t, u.height = A, u.getContext("2d").drawImage(s, 0, 0, s.width, s.height, 0, 0, t, A), s = u
                            } else s = h.image[n];
                            m[q] = s
                        }
                        n = k[0];
                        m = 0 === (n.width & n.width - 1) && 0 === (n.height & n.height - 1);
                        q = z(h.format);
                        s = z(h.type);
                        v(i.TEXTURE_CUBE_MAP, h, m);
                        for (n = 0; 6 > n; n++) i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + n, 0, q, q, s, k[n]);
                        h.generateMipmaps && m && i.generateMipmap(i.TEXTURE_CUBE_MAP);
                        h.needsUpdate = !1;
                        if (h.onUpdate) h.onUpdate()
                    } else i.activeTexture(i.TEXTURE0 + k), i.bindTexture(i.TEXTURE_CUBE_MAP, h.image.__webglTextureCube)
                } else n instanceof THREE.WebGLRenderTargetCube ? (h = n, i.activeTexture(i.TEXTURE0 + k), i.bindTexture(i.TEXTURE_CUBE_MAP, h.__webglTexture)) : D.setTexture(n, k)
            } else if ("tv" === m) {
                if (!h._array) {
                    h._array = [];
                    for (m = 0, q = h.texture.length; m < q; m++) h._array[m] = k + m
                }
                i.uniform1iv(n, h._array);
                for (m = 0, q = h.texture.length; m < q; m++)(n = h.texture[m]) && D.setTexture(n, h._array[m])
            }
            if ((d instanceof THREE.ShaderMaterial || d instanceof THREE.MeshPhongMaterial || d.envMap) && null !== g.cameraPosition) b = a.matrixWorld.getPosition(), i.uniform3f(g.cameraPosition, b.x, b.y, b.z);
            (d instanceof THREE.MeshPhongMaterial || d instanceof THREE.MeshLambertMaterial || d instanceof THREE.ShaderMaterial || d.skinning) && null !== g.viewMatrix && i.uniformMatrix4fv(g.viewMatrix, !1, a._viewMatrixArray);
            d.skinning && i.uniformMatrix4fv(g.boneGlobalMatrices, !1, e.boneMatrices)
        }
        i.uniformMatrix4fv(g.modelViewMatrix, !1, e._modelViewMatrixArray);
        g.normalMatrix && i.uniformMatrix3fv(g.normalMatrix, !1, e._normalMatrixArray);
        (d instanceof THREE.ShaderMaterial || d.envMap || d.skinning || e.receiveShadow) && null !== g.objectMatrix && i.uniformMatrix4fv(g.objectMatrix, !1, e._objectMatrixArray);
        return f
    }
    function q(a, b) {
        a._modelViewMatrix.multiplyToArray(b.matrixWorldInverse, a.matrixWorld, a._modelViewMatrixArray);
        a._normalMatrix.getInverse(a._modelViewMatrix);
        a._normalMatrix.transposeIntoArray(a._normalMatrixArray)
    }
    function s(a, b, c) {
        Ka !== a && (a ? i.enable(i.POLYGON_OFFSET_FILL) : i.disable(i.POLYGON_OFFSET_FILL), Ka = a);
        if (a && (Ua !== b || Da !== c)) i.polygonOffset(b, c), Ua = b, Da = c
    }
    function u(a, b) {
        var c;
        "fragment" === a ? c = i.createShader(i.FRAGMENT_SHADER) : "vertex" === a && (c = i.createShader(i.VERTEX_SHADER));
        i.shaderSource(c, b);
        i.compileShader(c);
        return !i.getShaderParameter(c, i.COMPILE_STATUS) ? (console.error(i.getShaderInfoLog(c)), console.error(b), null) : c
    }
    function v(a, b, c) {
        c ? (i.texParameteri(a, i.TEXTURE_WRAP_S, z(b.wrapS)), i.texParameteri(a, i.TEXTURE_WRAP_T, z(b.wrapT)), i.texParameteri(a, i.TEXTURE_MAG_FILTER, z(b.magFilter)), i.texParameteri(a, i.TEXTURE_MIN_FILTER, z(b.minFilter))) : (i.texParameteri(a, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(a, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE), i.texParameteri(a, i.TEXTURE_MAG_FILTER, w(b.magFilter)), i.texParameteri(a, i.TEXTURE_MIN_FILTER, w(b.minFilter)))
    }
    function t(a, b) {
        i.bindRenderbuffer(i.RENDERBUFFER, a);
        b.depthBuffer && !b.stencilBuffer ? (i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_COMPONENT16, b.width, b.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.RENDERBUFFER, a)) : b.depthBuffer && b.stencilBuffer ? (i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_STENCIL, b.width, b.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.RENDERBUFFER, a)) : i.renderbufferStorage(i.RENDERBUFFER, i.RGBA4, b.width, b.height)
    }
    function w(a) {
        switch (a) {
        case THREE.NearestFilter:
        case THREE.NearestMipMapNearestFilter:
        case THREE.NearestMipMapLinearFilter:
            return i.NEAREST;
        default:
            return i.LINEAR
        }
    }
    function z(a) {
        switch (a) {
        case THREE.RepeatWrapping:
            return i.REPEAT;
        case THREE.ClampToEdgeWrapping:
            return i.CLAMP_TO_EDGE;
        case THREE.MirroredRepeatWrapping:
            return i.MIRRORED_REPEAT;
        case THREE.NearestFilter:
            return i.NEAREST;
        case THREE.NearestMipMapNearestFilter:
            return i.NEAREST_MIPMAP_NEAREST;
        case THREE.NearestMipMapLinearFilter:
            return i.NEAREST_MIPMAP_LINEAR;
        case THREE.LinearFilter:
            return i.LINEAR;
        case THREE.LinearMipMapNearestFilter:
            return i.LINEAR_MIPMAP_NEAREST;
        case THREE.LinearMipMapLinearFilter:
            return i.LINEAR_MIPMAP_LINEAR;
        case THREE.ByteType:
            return i.BYTE;
        case THREE.UnsignedByteType:
            return i.UNSIGNED_BYTE;
        case THREE.ShortType:
            return i.SHORT;
        case THREE.UnsignedShortType:
            return i.UNSIGNED_SHORT;
        case THREE.IntType:
            return i.INT;
        case THREE.UnsignedIntType:
            return i.UNSIGNED_INT;
        case THREE.FloatType:
            return i.FLOAT;
        case THREE.AlphaFormat:
            return i.ALPHA;
        case THREE.RGBFormat:
            return i.RGB;
        case THREE.RGBAFormat:
            return i.RGBA;
        case THREE.LuminanceFormat:
            return i.LUMINANCE;
        case THREE.LuminanceAlphaFormat:
            return i.LUMINANCE_ALPHA;
        case THREE.AddEquation:
            return i.FUNC_ADD;
        case THREE.SubtractEquation:
            return i.FUNC_SUBTRACT;
        case THREE.ReverseSubtractEquation:
            return i.FUNC_REVERSE_SUBTRACT;
        case THREE.ZeroFactor:
            return i.ZERO;
        case THREE.OneFactor:
            return i.ONE;
        case THREE.SrcColorFactor:
            return i.SRC_COLOR;
        case THREE.OneMinusSrcColorFactor:
            return i.ONE_MINUS_SRC_COLOR;
        case THREE.SrcAlphaFactor:
            return i.SRC_ALPHA;
        case THREE.OneMinusSrcAlphaFactor:
            return i.ONE_MINUS_SRC_ALPHA;
        case THREE.DstAlphaFactor:
            return i.DST_ALPHA;
        case THREE.OneMinusDstAlphaFactor:
            return i.ONE_MINUS_DST_ALPHA;
        case THREE.DstColorFactor:
            return i.DST_COLOR;
        case THREE.OneMinusDstColorFactor:
            return i.ONE_MINUS_DST_COLOR;
        case THREE.SrcAlphaSaturateFactor:
            return i.SRC_ALPHA_SATURATE
        }
        return 0
    }
    var a = a || {},
        F = void 0 !== a.canvas ? a.canvas : document.createElement("canvas"),
        C = void 0 !== a.precision ? a.precision : "highp",
        G = void 0 !== a.alpha ? a.alpha : !0,
        K = void 0 !== a.premultipliedAlpha ? a.premultipliedAlpha : !0,
        N = void 0 !== a.antialias ? a.antialias : !1,
        P = void 0 !== a.stencil ? a.stencil : !0,
        T = void 0 !== a.preserveDrawingBuffer ? a.preserveDrawingBuffer : !1,
        O = void 0 !== a.clearColor ? new THREE.Color(a.clearColor) : new THREE.Color(0),
        J = void 0 !== a.clearAlpha ? a.clearAlpha : 0,
        I = void 0 !== a.maxLights ? a.maxLights : 4;
    this.domElement = F;
    this.context = null;
    this.autoUpdateScene = this.autoUpdateObjects = this.sortObjects = this.autoClearStencil = this.autoClearDepth = this.autoClearColor = this.autoClear = !0;
    this.shadowMapEnabled = this.physicallyBasedShading = this.gammaOutput = this.gammaInput = !1;
    this.shadowMapCullFrontFaces = this.shadowMapSoft = this.shadowMapAutoUpdate = !0;
    this.shadowMapCascade = this.shadowMapDebug = !1;
    this.maxMorphTargets = 8;
    this.maxMorphNormals = 4;
    this.autoScaleCubemaps = !0;
    this.renderPluginsPre = [];
    this.renderPluginsPost = [];
    this.info = {
        memory: {
            programs: 0,
            geometries: 0,
            textures: 0
        },
        render: {
            calls: 0,
            vertices: 0,
            faces: 0,
            points: 0
        }
    };
    var D = this,
        i, S = [],
        B = null,
        A = null,
        V = -1,
        E = null,
        aa = null,
        ea = 0,
        ia = null,
        R = null,
        $ = null,
        ba = null,
        Z = null,
        ja = null,
        Ga = null,
        oa = null,
        Ka = null,
        Ua = null,
        Da = null,
        pa = null,
        $a = 0,
        ab = 0,
        kb = 0,
        db = 0,
        hb = 0,
        nb = 0,
        Wa = new THREE.Frustum,
        qa = new THREE.Matrix4,
        va = new THREE.Matrix4,
        Ea = new THREE.Vector4,
        ga = new THREE.Vector3,
        Xa = {
            ambient: [0, 0, 0],
            directional: {
                length: 0,
                colors: [],
                positions: []
            },
            point: {
                length: 0,
                colors: [],
                positions: [],
                distances: []
            }
        };
    i = function () {
        var a;
        try {
            if (!(a = F.getContext("experimental-webgl", {
                alpha: G,
                premultipliedAlpha: K,
                antialias: N,
                stencil: P,
                preserveDrawingBuffer: T
            }))) throw "Error creating WebGL context.";
            console.log(navigator.userAgent + " | " + a.getParameter(a.VERSION) + " | " + a.getParameter(a.VENDOR) + " | " + a.getParameter(a.RENDERER) + " | " + a.getParameter(a.SHADING_LANGUAGE_VERSION))
        } catch (b) {
            console.error(b)
        }
        return a
    }();
    i.clearColor(0, 0, 0, 1);
    i.clearDepth(1);
    i.clearStencil(0);
    i.enable(i.DEPTH_TEST);
    i.depthFunc(i.LEQUAL);
    i.frontFace(i.CCW);
    i.cullFace(i.BACK);
    i.enable(i.CULL_FACE);
    i.enable(i.BLEND);
    i.blendEquation(i.FUNC_ADD);
    i.blendFunc(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA);
    i.clearColor(O.r, O.g, O.b, J);
    this.context = i;
    var La = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
    i.getParameter(i.MAX_TEXTURE_SIZE);
    var ra = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE);
    this.getContext = function () {
        return i
    };
    this.supportsVertexTextures = function () {
        return 0 < La
    };
    this.setSize = function (a, b) {
        F.width = a;
        F.height = b;
        this.setViewport(0, 0, F.width, F.height)
    };
    this.setViewport = function (a, b, c, d) {
        $a = a;
        ab = b;
        kb = c;
        db = d;
        i.viewport($a, ab, kb, db)
    };
    this.setScissor = function (a, b, c, d) {
        i.scissor(a, b, c, d)
    };
    this.enableScissorTest = function (a) {
        a ? i.enable(i.SCISSOR_TEST) : i.disable(i.SCISSOR_TEST)
    };
    this.setClearColorHex = function (a, b) {
        O.setHex(a);
        J = b;
        i.clearColor(O.r, O.g, O.b, J)
    };
    this.setClearColor = function (a, b) {
        O.copy(a);
        J = b;
        i.clearColor(O.r, O.g, O.b, J)
    };
    this.getClearColor = function () {
        return O
    };
    this.getClearAlpha = function () {
        return J
    };
    this.clear = function (a, b, c) {
        var d = 0;
        if (void 0 === a || a) d |= i.COLOR_BUFFER_BIT;
        if (void 0 === b || b) d |= i.DEPTH_BUFFER_BIT;
        if (void 0 === c || c) d |= i.STENCIL_BUFFER_BIT;
        i.clear(d)
    };
    this.clearTarget = function (a, b, c, d) {
        this.setRenderTarget(a);
        this.clear(b, c, d)
    };
    this.addPostPlugin = function (a) {
        a.init(this);
        this.renderPluginsPost.push(a)
    };
    this.addPrePlugin = function (a) {
        a.init(this);
        this.renderPluginsPre.push(a)
    };
    this.deallocateObject = function (a) {
        if (a.__webglInit) if (a.__webglInit = !1, delete a._modelViewMatrix, delete a._normalMatrix, delete a._normalMatrixArray, delete a._modelViewMatrixArray, delete a._objectMatrixArray, a instanceof THREE.Mesh) for (var b in a.geometry.geometryGroups) {
            var c = a.geometry.geometryGroups[b];
            i.deleteBuffer(c.__webglVertexBuffer);
            i.deleteBuffer(c.__webglNormalBuffer);
            i.deleteBuffer(c.__webglTangentBuffer);
            i.deleteBuffer(c.__webglColorBuffer);
            i.deleteBuffer(c.__webglUVBuffer);
            i.deleteBuffer(c.__webglUV2Buffer);
            i.deleteBuffer(c.__webglSkinVertexABuffer);
            i.deleteBuffer(c.__webglSkinVertexBBuffer);
            i.deleteBuffer(c.__webglSkinIndicesBuffer);
            i.deleteBuffer(c.__webglSkinWeightsBuffer);
            i.deleteBuffer(c.__webglFaceBuffer);
            i.deleteBuffer(c.__webglLineBuffer);
            var d = void 0,
                e = void 0;
            if (c.numMorphTargets) for (d = 0, e = c.numMorphTargets; d < e; d++) i.deleteBuffer(c.__webglMorphTargetsBuffers[d]);
            if (c.numMorphNormals) for (d = 0, e = c.numMorphNormals; d < e; d++) i.deleteBuffer(c.__webglMorphNormalsBuffers[d]);
            if (c.__webglCustomAttributesList) for (d in d = void 0, c.__webglCustomAttributesList) i.deleteBuffer(c.__webglCustomAttributesList[d].buffer);
            D.info.memory.geometries--
        } else if (a instanceof THREE.Ribbon) a = a.geometry, i.deleteBuffer(a.__webglVertexBuffer), i.deleteBuffer(a.__webglColorBuffer), D.info.memory.geometries--;
        else if (a instanceof THREE.Line) a = a.geometry, i.deleteBuffer(a.__webglVertexBuffer), i.deleteBuffer(a.__webglColorBuffer), D.info.memory.geometries--;
        else if (a instanceof THREE.ParticleSystem) a = a.geometry, i.deleteBuffer(a.__webglVertexBuffer), i.deleteBuffer(a.__webglColorBuffer), D.info.memory.geometries--
    };
    this.deallocateTexture = function (a) {
        if (a.__webglInit) a.__webglInit = !1, i.deleteTexture(a.__webglTexture), D.info.memory.textures--
    };
    this.deallocateRenderTarget = function (a) {
        if (a && a.__webglTexture) if (i.deleteTexture(a.__webglTexture), a instanceof THREE.WebGLRenderTargetCube) for (var b = 0; 6 > b; b++) i.deleteFramebuffer(a.__webglFramebuffer[b]), i.deleteRenderbuffer(a.__webglRenderbuffer[b]);
        else i.deleteFramebuffer(a.__webglFramebuffer), i.deleteRenderbuffer(a.__webglRenderbuffer)
    };
    this.updateShadowMap = function (a, b) {
        B = null;
        V = E = oa = Ga = $ = -1;
        this.shadowMapPlugin.update(a, b)
    };
    this.renderBufferImmediate = function (a, b, c) {
        if (!a.__webglVertexBuffer) a.__webglVertexBuffer = i.createBuffer();
        if (!a.__webglNormalBuffer) a.__webglNormalBuffer = i.createBuffer();
        a.hasPos && (i.bindBuffer(i.ARRAY_BUFFER, a.__webglVertexBuffer), i.bufferData(i.ARRAY_BUFFER, a.positionArray, i.DYNAMIC_DRAW), i.enableVertexAttribArray(b.attributes.position), i.vertexAttribPointer(b.attributes.position, 3, i.FLOAT, !1, 0, 0));
        if (a.hasNormal) {
            i.bindBuffer(i.ARRAY_BUFFER, a.__webglNormalBuffer);
            if (c === THREE.FlatShading) {
                var d, e, f, g, h, j, k, l, n, m, o = 3 * a.count;
                for (m = 0; m < o; m += 9) c = a.normalArray, d = c[m], e = c[m + 1], f = c[m + 2], g = c[m + 3], j = c[m + 4], l = c[m + 5], h = c[m + 6], k = c[m + 7], n = c[m + 8], d = (d + g + h) / 3, e = (e + j + k) / 3, f = (f + l + n) / 3, c[m] = d, c[m + 1] = e, c[m + 2] = f, c[m + 3] = d, c[m + 4] = e, c[m + 5] = f, c[m + 6] = d, c[m + 7] = e, c[m + 8] = f
            }
            i.bufferData(i.ARRAY_BUFFER, a.normalArray, i.DYNAMIC_DRAW);
            i.enableVertexAttribArray(b.attributes.normal);
            i.vertexAttribPointer(b.attributes.normal, 3, i.FLOAT, !1, 0, 0)
        }
        i.drawArrays(i.TRIANGLES, 0, a.count);
        a.count = 0
    };
    this.renderBufferDirect = function (a, b, c, d, e, f) {
        if (0 !== d.opacity && (c = n(a, b, c, d, f), a = c.attributes, b = !1, d = 16777215 * e.id + 2 * c.id + (d.wireframe ? 1 : 0), d !== E && (E = d, b = !0), f instanceof THREE.Mesh)) {
            f = e.offsets;
            d = 0;
            for (c = f.length; d < c; ++d) b && (i.bindBuffer(i.ARRAY_BUFFER, e.vertexPositionBuffer), i.vertexAttribPointer(a.position, e.vertexPositionBuffer.itemSize, i.FLOAT, !1, 0, 12 * f[d].index), 0 <= a.normal && e.vertexNormalBuffer && (i.bindBuffer(i.ARRAY_BUFFER, e.vertexNormalBuffer), i.vertexAttribPointer(a.normal, e.vertexNormalBuffer.itemSize, i.FLOAT, !1, 0, 12 * f[d].index)), 0 <= a.uv && e.vertexUvBuffer && (e.vertexUvBuffer ? (i.bindBuffer(i.ARRAY_BUFFER, e.vertexUvBuffer), i.vertexAttribPointer(a.uv, e.vertexUvBuffer.itemSize, i.FLOAT, !1, 0, 8 * f[d].index), i.enableVertexAttribArray(a.uv)) : i.disableVertexAttribArray(a.uv)), 0 <= a.color && e.vertexColorBuffer && (i.bindBuffer(i.ARRAY_BUFFER, e.vertexColorBuffer), i.vertexAttribPointer(a.color, e.vertexColorBuffer.itemSize, i.FLOAT, !1, 0, 16 * f[d].index)), i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.vertexIndexBuffer)), i.drawElements(i.TRIANGLES, f[d].count, i.UNSIGNED_SHORT, 2 * f[d].start), D.info.render.calls++, D.info.render.vertices += f[d].count, D.info.render.faces += f[d].count / 3
        }
    };
    this.renderBuffer = function (a, b, c, d, e, f) {
        if (0 !== d.opacity) {
            var g, h, c = n(a, b, c, d, f),
                b = c.attributes,
                a = !1,
                c = 16777215 * e.id + 2 * c.id + (d.wireframe ? 1 : 0);
            c !== E && (E = c, a = !0);
            if (!d.morphTargets && 0 <= b.position) a && (i.bindBuffer(i.ARRAY_BUFFER, e.__webglVertexBuffer), i.vertexAttribPointer(b.position, 3, i.FLOAT, !1, 0, 0));
            else if (f.morphTargetBase) {
                c = d.program.attributes; - 1 !== f.morphTargetBase ? (i.bindBuffer(i.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[f.morphTargetBase]), i.vertexAttribPointer(c.position, 3, i.FLOAT, !1, 0, 0)) : 0 <= c.position && (i.bindBuffer(i.ARRAY_BUFFER, e.__webglVertexBuffer), i.vertexAttribPointer(c.position, 3, i.FLOAT, !1, 0, 0));
                if (f.morphTargetForcedOrder.length) {
                    g = 0;
                    var j = f.morphTargetForcedOrder;
                    for (h = f.morphTargetInfluences; g < d.numSupportedMorphTargets && g < j.length;) i.bindBuffer(i.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[j[g]]), i.vertexAttribPointer(c["morphTarget" + g], 3, i.FLOAT, !1, 0, 0), d.morphNormals && (i.bindBuffer(i.ARRAY_BUFFER, e.__webglMorphNormalsBuffers[j[g]]), i.vertexAttribPointer(c["morphNormal" + g], 3, i.FLOAT, !1, 0, 0)), f.__webglMorphTargetInfluences[g] = h[j[g]], g++
                } else {
                    var j = [],
                        k = -1,
                        l = 0;
                    h = f.morphTargetInfluences;
                    var m, o = h.length;
                    g = 0;
                    for (-1 !== f.morphTargetBase && (j[f.morphTargetBase] = !0); g < d.numSupportedMorphTargets;) {
                        for (m = 0; m < o; m++)!j[m] && h[m] > k && (l = m, k = h[l]);
                        i.bindBuffer(i.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[l]);
                        i.vertexAttribPointer(c["morphTarget" + g], 3, i.FLOAT, !1, 0, 0);
                        d.morphNormals && (i.bindBuffer(i.ARRAY_BUFFER, e.__webglMorphNormalsBuffers[l]), i.vertexAttribPointer(c["morphNormal" + g], 3, i.FLOAT, !1, 0, 0));
                        f.__webglMorphTargetInfluences[g] = k;
                        j[l] = 1;
                        k = -1;
                        g++
                    }
                }
                null !== d.program.uniforms.morphTargetInfluences && i.uniform1fv(d.program.uniforms.morphTargetInfluences, f.__webglMorphTargetInfluences)
            }
            if (a) {
                if (e.__webglCustomAttributesList) for (g = 0, h = e.__webglCustomAttributesList.length; g < h; g++) c = e.__webglCustomAttributesList[g], 0 <= b[c.buffer.belongsToAttribute] && (i.bindBuffer(i.ARRAY_BUFFER, c.buffer), i.vertexAttribPointer(b[c.buffer.belongsToAttribute], c.size, i.FLOAT, !1, 0, 0));
                0 <= b.color && (i.bindBuffer(i.ARRAY_BUFFER, e.__webglColorBuffer), i.vertexAttribPointer(b.color, 3, i.FLOAT, !1, 0, 0));
                0 <= b.normal && (i.bindBuffer(i.ARRAY_BUFFER, e.__webglNormalBuffer), i.vertexAttribPointer(b.normal, 3, i.FLOAT, !1, 0, 0));
                0 <= b.tangent && (i.bindBuffer(i.ARRAY_BUFFER, e.__webglTangentBuffer), i.vertexAttribPointer(b.tangent, 4, i.FLOAT, !1, 0, 0));
                0 <= b.uv && (e.__webglUVBuffer ? (i.bindBuffer(i.ARRAY_BUFFER, e.__webglUVBuffer), i.vertexAttribPointer(b.uv, 2, i.FLOAT, !1, 0, 0), i.enableVertexAttribArray(b.uv)) : i.disableVertexAttribArray(b.uv));
                0 <= b.uv2 && (e.__webglUV2Buffer ? (i.bindBuffer(i.ARRAY_BUFFER, e.__webglUV2Buffer), i.vertexAttribPointer(b.uv2, 2, i.FLOAT, !1, 0, 0), i.enableVertexAttribArray(b.uv2)) : i.disableVertexAttribArray(b.uv2));
                d.skinning && 0 <= b.skinVertexA && 0 <= b.skinVertexB && 0 <= b.skinIndex && 0 <= b.skinWeight && (i.bindBuffer(i.ARRAY_BUFFER, e.__webglSkinVertexABuffer), i.vertexAttribPointer(b.skinVertexA, 4, i.FLOAT, !1, 0, 0), i.bindBuffer(i.ARRAY_BUFFER, e.__webglSkinVertexBBuffer), i.vertexAttribPointer(b.skinVertexB, 4, i.FLOAT, !1, 0, 0), i.bindBuffer(i.ARRAY_BUFFER, e.__webglSkinIndicesBuffer), i.vertexAttribPointer(b.skinIndex, 4, i.FLOAT, !1, 0, 0), i.bindBuffer(i.ARRAY_BUFFER, e.__webglSkinWeightsBuffer), i.vertexAttribPointer(b.skinWeight, 4, i.FLOAT, !1, 0, 0))
            }
            f instanceof THREE.Mesh ? (d.wireframe ? (d = d.wireframeLinewidth, d !== pa && (i.lineWidth(d), pa = d), a && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.__webglLineBuffer), i.drawElements(i.LINES, e.__webglLineCount, i.UNSIGNED_SHORT, 0)) : (a && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.__webglFaceBuffer), i.drawElements(i.TRIANGLES, e.__webglFaceCount, i.UNSIGNED_SHORT, 0)), D.info.render.calls++, D.info.render.vertices += e.__webglFaceCount, D.info.render.faces += e.__webglFaceCount / 3) : f instanceof THREE.Line ? (f = f.type === THREE.LineStrip ? i.LINE_STRIP : i.LINES, d = d.linewidth, d !== pa && (i.lineWidth(d), pa = d), i.drawArrays(f, 0, e.__webglLineCount), D.info.render.calls++) : f instanceof THREE.ParticleSystem ? (i.drawArrays(i.POINTS, 0, e.__webglParticleCount), D.info.render.calls++, D.info.render.points += e.__webglParticleCount) : f instanceof THREE.Ribbon && (i.drawArrays(i.TRIANGLE_STRIP, 0, e.__webglVertexCount), D.info.render.calls++)
        }
    };
    this.render = function (a, b, c, d) {
        var e, f, k, m, n = a.__lights,
            o = a.fog;
        V = -1;
        void 0 === b.parent && (console.warn("DEPRECATED: Camera hasn't been added to a Scene. Adding it..."), a.add(b));
        this.autoUpdateScene && a.updateMatrixWorld();
        if (!b._viewMatrixArray) b._viewMatrixArray = new Float32Array(16);
        if (!b._projectionMatrixArray) b._projectionMatrixArray = new Float32Array(16);
        b.matrixWorldInverse.getInverse(b.matrixWorld);
        b.matrixWorldInverse.flattenToArray(b._viewMatrixArray);
        b.projectionMatrix.flattenToArray(b._projectionMatrixArray);
        qa.multiply(b.projectionMatrix, b.matrixWorldInverse);
        Wa.setFromMatrix(qa);
        this.autoUpdateObjects && this.initWebGLObjects(a);
        h(this.renderPluginsPre, a, b);
        D.info.render.calls = 0;
        D.info.render.vertices = 0;
        D.info.render.faces = 0;
        D.info.render.points = 0;
        this.setRenderTarget(c);
        (this.autoClear || d) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil);
        m = a.__webglObjects;
        for (d = 0, e = m.length; d < e; d++) if (f = m[d], k = f.object, f.render = !1, k.visible && (!(k instanceof THREE.Mesh || k instanceof THREE.ParticleSystem) || !k.frustumCulled || Wa.contains(k))) {
            k.matrixWorld.flattenToArray(k._objectMatrixArray);
            q(k, b);
            var p = f,
                r = p.object,
                t = p.buffer,
                A = void 0,
                A = A = void 0,
                A = r.material;
            if (A instanceof THREE.MeshFaceMaterial) {
                if (A = t.materialIndex, 0 <= A) A = r.geometry.materials[A], A.transparent ? (p.transparent = A, p.opaque = null) : (p.opaque = A, p.transparent = null)
            } else if (A) A.transparent ? (p.transparent = A, p.opaque = null) : (p.opaque = A, p.transparent = null);
            f.render = !0;
            if (this.sortObjects) k.renderDepth ? f.z = k.renderDepth : (Ea.copy(k.matrixWorld.getPosition()), qa.multiplyVector3(Ea), f.z = Ea.z)
        }
        this.sortObjects && m.sort(g);
        m = a.__webglObjectsImmediate;
        for (d = 0, e = m.length; d < e; d++) if (f = m[d], k = f.object, k.visible) k.matrixAutoUpdate && k.matrixWorld.flattenToArray(k._objectMatrixArray), q(k, b), k = f.object.material, k.transparent ? (f.transparent = k, f.opaque = null) : (f.opaque = k, f.transparent = null);
        a.overrideMaterial ? (d = a.overrideMaterial, this.setBlending(d.blending, d.blendEquation, d.blendSrc, d.blendDst), this.setDepthTest(d.depthTest), this.setDepthWrite(d.depthWrite), s(d.polygonOffset, d.polygonOffsetFactor, d.polygonOffsetUnits), l(a.__webglObjects, !1, "", b, n, o, !0, d), j(a.__webglObjectsImmediate, "", b, n, o, !1, d)) : (this.setBlending(THREE.NormalBlending), l(a.__webglObjects, !0, "opaque", b, n, o, !1), j(a.__webglObjectsImmediate, "opaque", b, n, o, !1), l(a.__webglObjects, !1, "transparent", b, n, o, !0), j(a.__webglObjectsImmediate, "transparent", b, n, o, !0));
        h(this.renderPluginsPost, a, b);
        c && c.generateMipmaps && c.minFilter !== THREE.NearestFilter && c.minFilter !== THREE.LinearFilter && (c instanceof THREE.WebGLRenderTargetCube ? (i.bindTexture(i.TEXTURE_CUBE_MAP, c.__webglTexture), i.generateMipmap(i.TEXTURE_CUBE_MAP), i.bindTexture(i.TEXTURE_CUBE_MAP, null)) : (i.bindTexture(i.TEXTURE_2D, c.__webglTexture), i.generateMipmap(i.TEXTURE_2D), i.bindTexture(i.TEXTURE_2D, null)));
        this.setDepthTest(!0);
        this.setDepthWrite(!0)
    };
    this.renderImmediateObject = function (a, b, c, d, e) {
        var f = n(a, b, c, d, e);
        E = -1;
        D.setObjectFaces(e);
        e.immediateRenderCallback ? e.immediateRenderCallback(f, i, Wa) : e.render(function (a) {
            D.renderBufferImmediate(a, f, d.shading)
        })
    };
    this.initWebGLObjects = function (a) {
        if (!a.__webglObjects) a.__webglObjects = [], a.__webglObjectsImmediate = [], a.__webglSprites = [], a.__webglFlares = [];
        for (; a.__objectsAdded.length;) {
            var g = a.__objectsAdded[0],
                h = a,
                j = void 0,
                l = void 0,
                n = void 0;
            if (!g.__webglInit) if (g.__webglInit = !0, g._modelViewMatrix = new THREE.Matrix4, g._normalMatrix = new THREE.Matrix3, g._normalMatrixArray = new Float32Array(9), g._modelViewMatrixArray = new Float32Array(16), g._objectMatrixArray = new Float32Array(16), g.matrixWorld.flattenToArray(g._objectMatrixArray), g instanceof THREE.Mesh) {
                if (l = g.geometry, l instanceof THREE.Geometry) {
                    if (void 0 === l.geometryGroups) {
                        var q = l,
                            s = void 0,
                            t = void 0,
                            A = void 0,
                            u = void 0,
                            v = void 0,
                            E = void 0,
                            w = void 0,
                            B = {},
                            C = q.morphTargets.length,
                            G = q.morphNormals.length;
                        q.geometryGroups = {};
                        for (s = 0, t = q.faces.length; s < t; s++) A = q.faces[s], u = A.materialIndex, E = void 0 !== u ? u : -1, void 0 === B[E] && (B[E] = {
                            hash: E,
                            counter: 0
                        }), w = B[E].hash + "_" + B[E].counter, void 0 === q.geometryGroups[w] && (q.geometryGroups[w] = {
                            faces3: [],
                            faces4: [],
                            materialIndex: u,
                            vertices: 0,
                            numMorphTargets: C,
                            numMorphNormals: G
                        }), v = A instanceof THREE.Face3 ? 3 : 4, 65535 < q.geometryGroups[w].vertices + v && (B[E].counter += 1, w = B[E].hash + "_" + B[E].counter, void 0 === q.geometryGroups[w] && (q.geometryGroups[w] = {
                            faces3: [],
                            faces4: [],
                            materialIndex: u,
                            vertices: 0,
                            numMorphTargets: C,
                            numMorphNormals: G
                        })), A instanceof THREE.Face3 ? q.geometryGroups[w].faces3.push(s) : q.geometryGroups[w].faces4.push(s), q.geometryGroups[w].vertices += v;
                        q.geometryGroupsList = [];
                        var V = void 0;
                        for (V in q.geometryGroups) q.geometryGroups[V].id = ea++, q.geometryGroupsList.push(q.geometryGroups[V])
                    }
                    for (j in l.geometryGroups) if (n = l.geometryGroups[j], !n.__webglVertexBuffer) {
                        var z = n;
                        z.__webglVertexBuffer = i.createBuffer();
                        z.__webglNormalBuffer = i.createBuffer();
                        z.__webglTangentBuffer = i.createBuffer();
                        z.__webglColorBuffer = i.createBuffer();
                        z.__webglUVBuffer = i.createBuffer();
                        z.__webglUV2Buffer = i.createBuffer();
                        z.__webglSkinVertexABuffer = i.createBuffer();
                        z.__webglSkinVertexBBuffer = i.createBuffer();
                        z.__webglSkinIndicesBuffer = i.createBuffer();
                        z.__webglSkinWeightsBuffer = i.createBuffer();
                        z.__webglFaceBuffer = i.createBuffer();
                        z.__webglLineBuffer = i.createBuffer();
                        var F = void 0,
                            J = void 0;
                        if (z.numMorphTargets) {
                            z.__webglMorphTargetsBuffers = [];
                            for (F = 0, J = z.numMorphTargets; F < J; F++) z.__webglMorphTargetsBuffers.push(i.createBuffer())
                        }
                        if (z.numMorphNormals) {
                            z.__webglMorphNormalsBuffers = [];
                            for (F = 0, J = z.numMorphNormals; F < J; F++) z.__webglMorphNormalsBuffers.push(i.createBuffer())
                        }
                        D.info.memory.geometries++;
                        var I = n,
                            $ = g,
                            K = $.geometry,
                            R = I.faces3,
                            O = I.faces4,
                            aa = 3 * R.length + 4 * O.length,
                            N = 1 * R.length + 2 * O.length,
                            Z = 3 * R.length + 4 * O.length,
                            P = c($, I),
                            ba = e(P),
                            S = d(P),
                            ja = P.vertexColors ? P.vertexColors : !1;
                        I.__vertexArray = new Float32Array(3 * aa);
                        if (S) I.__normalArray = new Float32Array(3 * aa);
                        if (K.hasTangents) I.__tangentArray = new Float32Array(4 * aa);
                        if (ja) I.__colorArray = new Float32Array(3 * aa);
                        if (ba) {
                            if (0 < K.faceUvs.length || 0 < K.faceVertexUvs.length) I.__uvArray = new Float32Array(2 * aa);
                            if (1 < K.faceUvs.length || 1 < K.faceVertexUvs.length) I.__uv2Array = new Float32Array(2 * aa)
                        }
                        if ($.geometry.skinWeights.length && $.geometry.skinIndices.length) I.__skinVertexAArray = new Float32Array(4 * aa), I.__skinVertexBArray = new Float32Array(4 * aa), I.__skinIndexArray = new Float32Array(4 * aa), I.__skinWeightArray = new Float32Array(4 * aa);
                        I.__faceArray = new Uint16Array(3 * N);
                        I.__lineArray = new Uint16Array(2 * Z);
                        var T = void 0,
                            ia = void 0;
                        if (I.numMorphTargets) {
                            I.__morphTargetsArrays = [];
                            for (T = 0, ia = I.numMorphTargets; T < ia; T++) I.__morphTargetsArrays.push(new Float32Array(3 * aa))
                        }
                        if (I.numMorphNormals) {
                            I.__morphNormalsArrays = [];
                            for (T = 0, ia = I.numMorphNormals; T < ia; T++) I.__morphNormalsArrays.push(new Float32Array(3 * aa))
                        }
                        I.__webglFaceCount = 3 * N;
                        I.__webglLineCount = 2 * Z;
                        if (P.attributes) {
                            if (void 0 === I.__webglCustomAttributesList) I.__webglCustomAttributesList = [];
                            var Ga = void 0;
                            for (Ga in P.attributes) {
                                var Ka = P.attributes[Ga],
                                    oa = {},
                                    ga;
                                for (ga in Ka) oa[ga] = Ka[ga];
                                if (!oa.__webglInitialized || oa.createUniqueBuffers) {
                                    oa.__webglInitialized = !0;
                                    var Da = 1;
                                    "v2" === oa.type ? Da = 2 : "v3" === oa.type ? Da = 3 : "v4" === oa.type ? Da = 4 : "c" === oa.type && (Da = 3);
                                    oa.size = Da;
                                    oa.array = new Float32Array(aa * Da);
                                    oa.buffer = i.createBuffer();
                                    oa.buffer.belongsToAttribute = Ga;
                                    Ka.needsUpdate = !0;
                                    oa.__original = Ka
                                }
                                I.__webglCustomAttributesList.push(oa)
                            }
                        }
                        I.__inittedArrays = !0;
                        l.__dirtyVertices = !0;
                        l.__dirtyMorphTargets = !0;
                        l.__dirtyElements = !0;
                        l.__dirtyUvs = !0;
                        l.__dirtyNormals = !0;
                        l.__dirtyTangents = !0;
                        l.__dirtyColors = !0
                    }
                }
            } else if (g instanceof THREE.Ribbon) {
                if (l = g.geometry, !l.__webglVertexBuffer) {
                    var Ua = l;
                    Ua.__webglVertexBuffer = i.createBuffer();
                    Ua.__webglColorBuffer = i.createBuffer();
                    D.info.memory.geometries++;
                    var pa = l,
                        ra = pa.vertices.length;
                    pa.__vertexArray = new Float32Array(3 * ra);
                    pa.__colorArray = new Float32Array(3 * ra);
                    pa.__webglVertexCount = ra;
                    l.__dirtyVertices = !0;
                    l.__dirtyColors = !0
                }
            } else if (g instanceof THREE.Line) {
                if (l = g.geometry, !l.__webglVertexBuffer) {
                    var va = l;
                    va.__webglVertexBuffer = i.createBuffer();
                    va.__webglColorBuffer = i.createBuffer();
                    D.info.memory.geometries++;
                    var qa = l,
                        $a = g,
                        La = qa.vertices.length;
                    qa.__vertexArray = new Float32Array(3 * La);
                    qa.__colorArray = new Float32Array(3 * La);
                    qa.__webglLineCount = La;
                    b(qa, $a);
                    l.__dirtyVertices = !0;
                    l.__dirtyColors = !0
                }
            } else if (g instanceof THREE.ParticleSystem && (l = g.geometry, !l.__webglVertexBuffer)) {
                var Xa = l;
                Xa.__webglVertexBuffer = i.createBuffer();
                Xa.__webglColorBuffer = i.createBuffer();
                D.info.geometries++;
                var ab = l,
                    kb = g,
                    Wa = ab.vertices.length;
                ab.__vertexArray = new Float32Array(3 * Wa);
                ab.__colorArray = new Float32Array(3 * Wa);
                ab.__sortArray = [];
                ab.__webglParticleCount = Wa;
                b(ab, kb);
                l.__dirtyVertices = !0;
                l.__dirtyColors = !0
            }
            if (!g.__webglActive) {
                if (g instanceof THREE.Mesh) if (l = g.geometry, l instanceof THREE.BufferGeometry) k(h.__webglObjects, l, g);
                else for (j in l.geometryGroups) n = l.geometryGroups[j], k(h.__webglObjects, n, g);
                else g instanceof THREE.Ribbon || g instanceof THREE.Line || g instanceof THREE.ParticleSystem ? (l = g.geometry, k(h.__webglObjects, l, g)) : g instanceof THREE.ImmediateRenderObject || g.immediateRenderCallback ? h.__webglObjectsImmediate.push({
                    object: g,
                    opaque: null,
                    transparent: null
                }) : g instanceof THREE.Sprite ? h.__webglSprites.push(g) : g instanceof THREE.LensFlare && h.__webglFlares.push(g);
                g.__webglActive = !0
            }
            a.__objectsAdded.splice(0, 1)
        }
        for (; a.__objectsRemoved.length;) {
            var Ea = a.__objectsRemoved[0],
                db = a;
            Ea instanceof THREE.Mesh || Ea instanceof THREE.ParticleSystem || Ea instanceof THREE.Ribbon || Ea instanceof THREE.Line ? o(db.__webglObjects, Ea) : Ea instanceof THREE.Sprite ? r(db.__webglSprites, Ea) : Ea instanceof THREE.LensFlare ? r(db.__webglFlares, Ea) : (Ea instanceof THREE.ImmediateRenderObject || Ea.immediateRenderCallback) && o(db.__webglObjectsImmediate, Ea);
            Ea.__webglActive = !1;
            a.__objectsRemoved.splice(0, 1)
        }
        for (var hb = 0, nb = a.__webglObjects.length; hb < nb; hb++) {
            var ob = a.__webglObjects[hb].object,
                ka = ob.geometry,
                qc = void 0,
                ic = void 0,
                bb = void 0;
            if (ob instanceof THREE.Mesh) if (ka instanceof THREE.BufferGeometry) ka.__dirtyVertices = !1, ka.__dirtyElements = !1, ka.__dirtyUvs = !1, ka.__dirtyNormals = !1, ka.__dirtyColors = !1;
            else {
                for (var Uc = 0, od = ka.geometryGroupsList.length; Uc < od; Uc++) if (qc = ka.geometryGroupsList[Uc], bb = c(ob, qc), ic = bb.attributes && p(bb), ka.__dirtyVertices || ka.__dirtyMorphTargets || ka.__dirtyElements || ka.__dirtyUvs || ka.__dirtyNormals || ka.__dirtyColors || ka.__dirtyTangents || ic) {
                    var fa = qc,
                        pd = ob,
                        eb = i.DYNAMIC_DRAW,
                        qd = !ka.dynamic,
                        bc = bb;
                    if (fa.__inittedArrays) {
                        var dd = d(bc),
                            Vc = bc.vertexColors ? bc.vertexColors : !1,
                            ed = e(bc),
                            Fc = dd === THREE.SmoothShading,
                            H = void 0,
                            U = void 0,
                            mb = void 0,
                            M = void 0,
                            jc = void 0,
                            Ob = void 0,
                            pb = void 0,
                            Gc = void 0,
                            Hb = void 0,
                            kc = void 0,
                            lc = void 0,
                            W = void 0,
                            X = void 0,
                            Y = void 0,
                            ta = void 0,
                            qb = void 0,
                            rb = void 0,
                            sb = void 0,
                            rc = void 0,
                            tb = void 0,
                            ub = void 0,
                            vb = void 0,
                            sc = void 0,
                            wb = void 0,
                            xb = void 0,
                            yb = void 0,
                            tc = void 0,
                            zb = void 0,
                            Ab = void 0,
                            Bb = void 0,
                            uc = void 0,
                            Cb = void 0,
                            Db = void 0,
                            Eb = void 0,
                            vc = void 0,
                            Pb = void 0,
                            Qb = void 0,
                            Rb = void 0,
                            Hc = void 0,
                            Sb = void 0,
                            Tb = void 0,
                            Ub = void 0,
                            Ic = void 0,
                            la = void 0,
                            fd = void 0,
                            Vb = void 0,
                            mc = void 0,
                            nc = void 0,
                            Oa = void 0,
                            gd = void 0,
                            Ma = void 0,
                            Na = void 0,
                            Wb = void 0,
                            Ib = void 0,
                            Fa = 0,
                            Ja = 0,
                            Jb = 0,
                            Kb = 0,
                            ib = 0,
                            Va = 0,
                            ua = 0,
                            Ya = 0,
                            Ha = 0,
                            L = 0,
                            da = 0,
                            y = 0,
                            fb = void 0,
                            Pa = fa.__vertexArray,
                            wc = fa.__uvArray,
                            xc = fa.__uv2Array,
                            jb = fa.__normalArray,
                            xa = fa.__tangentArray,
                            Qa = fa.__colorArray,
                            ya = fa.__skinVertexAArray,
                            za = fa.__skinVertexBArray,
                            Aa = fa.__skinIndexArray,
                            Ba = fa.__skinWeightArray,
                            Wc = fa.__morphTargetsArrays,
                            Xc = fa.__morphNormalsArrays,
                            Yc = fa.__webglCustomAttributesList,
                            x = void 0,
                            Fb = fa.__faceArray,
                            gb = fa.__lineArray,
                            Za = pd.geometry,
                            rd = Za.__dirtyElements,
                            hd = Za.__dirtyUvs,
                            sd = Za.__dirtyNormals,
                            td = Za.__dirtyTangents,
                            ud = Za.__dirtyColors,
                            vd = Za.__dirtyMorphTargets,
                            cc = Za.vertices,
                            ma = fa.faces3,
                            na = fa.faces4,
                            Ia = Za.faces,
                            Zc = Za.faceVertexUvs[0],
                            $c = Za.faceVertexUvs[1],
                            dc = Za.skinVerticesA,
                            ec = Za.skinVerticesB,
                            fc = Za.skinIndices,
                            Xb = Za.skinWeights,
                            Yb = Za.morphTargets,
                            Jc = Za.morphNormals;
                        if (Za.__dirtyVertices) {
                            for (H = 0, U = ma.length; H < U; H++) M = Ia[ma[H]], W = cc[M.a].position, X = cc[M.b].position, Y = cc[M.c].position, Pa[Ja] = W.x, Pa[Ja + 1] = W.y, Pa[Ja + 2] = W.z, Pa[Ja + 3] = X.x, Pa[Ja + 4] = X.y, Pa[Ja + 5] = X.z, Pa[Ja + 6] = Y.x, Pa[Ja + 7] = Y.y, Pa[Ja + 8] = Y.z, Ja += 9;
                            for (H = 0, U = na.length; H < U; H++) M = Ia[na[H]], W = cc[M.a].position, X = cc[M.b].position, Y = cc[M.c].position, ta = cc[M.d].position, Pa[Ja] = W.x, Pa[Ja + 1] = W.y, Pa[Ja + 2] = W.z, Pa[Ja + 3] = X.x, Pa[Ja + 4] = X.y, Pa[Ja + 5] = X.z, Pa[Ja + 6] = Y.x, Pa[Ja + 7] = Y.y, Pa[Ja + 8] = Y.z, Pa[Ja + 9] = ta.x, Pa[Ja + 10] = ta.y, Pa[Ja + 11] = ta.z, Ja += 12;
                            i.bindBuffer(i.ARRAY_BUFFER, fa.__webglVertexBuffer);
                            i.bufferData(i.ARRAY_BUFFER, Pa, eb)
                        }
                        if (vd) for (Oa = 0, gd = Yb.length; Oa < gd; Oa++) {
                            da = 0;
                            for (H = 0, U = ma.length; H < U; H++) {
                                Wb = ma[H];
                                M = Ia[Wb];
                                W = Yb[Oa].vertices[M.a].position;
                                X = Yb[Oa].vertices[M.b].position;
                                Y = Yb[Oa].vertices[M.c].position;
                                Ma = Wc[Oa];
                                Ma[da] = W.x;
                                Ma[da + 1] = W.y;
                                Ma[da + 2] = W.z;
                                Ma[da + 3] = X.x;
                                Ma[da + 4] = X.y;
                                Ma[da + 5] = X.z;
                                Ma[da + 6] = Y.x;
                                Ma[da + 7] = Y.y;
                                Ma[da + 8] = Y.z;
                                if (bc.morphNormals) Fc ? (Ib = Jc[Oa].vertexNormals[Wb], tb = Ib.a, ub = Ib.b, vb = Ib.c) : vb = ub = tb = Jc[Oa].faceNormals[Wb], Na = Xc[Oa], Na[da] = tb.x, Na[da + 1] = tb.y, Na[da + 2] = tb.z, Na[da + 3] = ub.x, Na[da + 4] = ub.y, Na[da + 5] = ub.z, Na[da + 6] = vb.x, Na[da + 7] = vb.y, Na[da + 8] = vb.z;
                                da += 9
                            }
                            for (H = 0, U = na.length; H < U; H++) {
                                Wb = na[H];
                                M = Ia[Wb];
                                W = Yb[Oa].vertices[M.a].position;
                                X = Yb[Oa].vertices[M.b].position;
                                Y = Yb[Oa].vertices[M.c].position;
                                ta = Yb[Oa].vertices[M.d].position;
                                Ma = Wc[Oa];
                                Ma[da] = W.x;
                                Ma[da + 1] = W.y;
                                Ma[da + 2] = W.z;
                                Ma[da + 3] = X.x;
                                Ma[da + 4] = X.y;
                                Ma[da + 5] = X.z;
                                Ma[da + 6] = Y.x;
                                Ma[da + 7] = Y.y;
                                Ma[da + 8] = Y.z;
                                Ma[da + 9] = ta.x;
                                Ma[da + 10] = ta.y;
                                Ma[da + 11] = ta.z;
                                if (bc.morphNormals) Fc ? (Ib = Jc[Oa].vertexNormals[Wb], tb = Ib.a, ub = Ib.b, vb = Ib.c, sc = Ib.d) : sc = vb = ub = tb = Jc[Oa].faceNormals[Wb], Na = Xc[Oa], Na[da] = tb.x, Na[da + 1] = tb.y, Na[da + 2] = tb.z, Na[da + 3] = ub.x, Na[da + 4] = ub.y, Na[da + 5] = ub.z, Na[da + 6] = vb.x, Na[da + 7] = vb.y, Na[da + 8] = vb.z, Na[da + 9] = sc.x, Na[da + 10] = sc.y, Na[da + 11] = sc.z;
                                da += 12
                            }
                            i.bindBuffer(i.ARRAY_BUFFER, fa.__webglMorphTargetsBuffers[Oa]);
                            i.bufferData(i.ARRAY_BUFFER, Wc[Oa], eb);
                            bc.morphNormals && (i.bindBuffer(i.ARRAY_BUFFER, fa.__webglMorphNormalsBuffers[Oa]), i.bufferData(i.ARRAY_BUFFER, Xc[Oa], eb))
                        }
                        if (Xb.length) {
                            for (H = 0, U = ma.length; H < U; H++) M = Ia[ma[H]], zb = Xb[M.a], Ab = Xb[M.b], Bb = Xb[M.c], Ba[L] = zb.x, Ba[L + 1] = zb.y, Ba[L + 2] = zb.z, Ba[L + 3] = zb.w, Ba[L + 4] = Ab.x, Ba[L + 5] = Ab.y, Ba[L + 6] = Ab.z, Ba[L + 7] = Ab.w, Ba[L + 8] = Bb.x, Ba[L + 9] = Bb.y, Ba[L + 10] = Bb.z, Ba[L + 11] = Bb.w, Cb = fc[M.a], Db = fc[M.b], Eb = fc[M.c], Aa[L] = Cb.x, Aa[L + 1] = Cb.y, Aa[L + 2] = Cb.z, Aa[L + 3] = Cb.w, Aa[L + 4] = Db.x, Aa[L + 5] = Db.y, Aa[L + 6] = Db.z, Aa[L + 7] = Db.w, Aa[L + 8] = Eb.x, Aa[L + 9] = Eb.y, Aa[L + 10] = Eb.z, Aa[L + 11] = Eb.w, Pb = dc[M.a], Qb = dc[M.b], Rb = dc[M.c], ya[L] = Pb.x, ya[L + 1] = Pb.y, ya[L + 2] = Pb.z, ya[L + 3] = 1, ya[L + 4] = Qb.x, ya[L + 5] = Qb.y, ya[L + 6] = Qb.z, ya[L + 7] = 1, ya[L + 8] = Rb.x, ya[L + 9] = Rb.y, ya[L + 10] = Rb.z, ya[L + 11] = 1, Sb = ec[M.a], Tb = ec[M.b], Ub = ec[M.c], za[L] = Sb.x, za[L + 1] = Sb.y, za[L + 2] = Sb.z, za[L + 3] = 1, za[L + 4] = Tb.x, za[L + 5] = Tb.y, za[L + 6] = Tb.z, za[L + 7] = 1, za[L + 8] = Ub.x, za[L + 9] = Ub.y, za[L + 10] = Ub.z, za[L + 11] = 1, L += 12;
                            for (H = 0, U = na.length; H < U; H++) M = Ia[na[H]], zb = Xb[M.a], Ab = Xb[M.b], Bb = Xb[M.c], uc = Xb[M.d], Ba[L] = zb.x, Ba[L + 1] = zb.y, Ba[L + 2] = zb.z, Ba[L + 3] = zb.w, Ba[L + 4] = Ab.x, Ba[L + 5] = Ab.y, Ba[L + 6] = Ab.z, Ba[L + 7] = Ab.w, Ba[L + 8] = Bb.x, Ba[L + 9] = Bb.y, Ba[L + 10] = Bb.z, Ba[L + 11] = Bb.w, Ba[L + 12] = uc.x, Ba[L + 13] = uc.y, Ba[L + 14] = uc.z, Ba[L + 15] = uc.w, Cb = fc[M.a], Db = fc[M.b], Eb = fc[M.c], vc = fc[M.d], Aa[L] = Cb.x, Aa[L + 1] = Cb.y, Aa[L + 2] = Cb.z, Aa[L + 3] = Cb.w, Aa[L + 4] = Db.x, Aa[L + 5] = Db.y, Aa[L + 6] = Db.z, Aa[L + 7] = Db.w, Aa[L + 8] = Eb.x, Aa[L + 9] = Eb.y, Aa[L + 10] = Eb.z, Aa[L + 11] = Eb.w, Aa[L + 12] = vc.x, Aa[L + 13] = vc.y, Aa[L + 14] = vc.z, Aa[L + 15] = vc.w, Pb = dc[M.a], Qb = dc[M.b], Rb = dc[M.c], Hc = dc[M.d], ya[L] = Pb.x, ya[L + 1] = Pb.y, ya[L + 2] = Pb.z, ya[L + 3] = 1, ya[L + 4] = Qb.x, ya[L + 5] = Qb.y, ya[L + 6] = Qb.z, ya[L + 7] = 1, ya[L + 8] = Rb.x, ya[L + 9] = Rb.y, ya[L + 10] = Rb.z, ya[L + 11] = 1, ya[L + 12] = Hc.x, ya[L + 13] = Hc.y, ya[L + 14] = Hc.z, ya[L + 15] = 1, Sb = ec[M.a], Tb = ec[M.b], Ub = ec[M.c], Ic = ec[M.d], za[L] = Sb.x, za[L + 1] = Sb.y, za[L + 2] = Sb.z, za[L + 3] = 1, za[L + 4] = Tb.x, za[L + 5] = Tb.y, za[L + 6] = Tb.z, za[L + 7] = 1, za[L + 8] = Ub.x, za[L + 9] = Ub.y, za[L + 10] = Ub.z, za[L + 11] = 1, za[L + 12] = Ic.x, za[L + 13] = Ic.y, za[L + 14] = Ic.z, za[L + 15] = 1, L += 16;
                            0 < L && (i.bindBuffer(i.ARRAY_BUFFER, fa.__webglSkinVertexABuffer), i.bufferData(i.ARRAY_BUFFER, ya, eb), i.bindBuffer(i.ARRAY_BUFFER, fa.__webglSkinVertexBBuffer), i.bufferData(i.ARRAY_BUFFER, za, eb), i.bindBuffer(i.ARRAY_BUFFER, fa.__webglSkinIndicesBuffer), i.bufferData(i.ARRAY_BUFFER, Aa, eb), i.bindBuffer(i.ARRAY_BUFFER, fa.__webglSkinWeightsBuffer), i.bufferData(i.ARRAY_BUFFER, Ba, eb))
                        }
                        if (ud && Vc) {
                            for (H = 0, U = ma.length; H < U; H++) M = Ia[ma[H]], pb = M.vertexColors, Gc = M.color, 3 === pb.length && Vc === THREE.VertexColors ? (wb = pb[0], xb = pb[1], yb = pb[2]) : yb = xb = wb = Gc, Qa[Ha] = wb.r, Qa[Ha + 1] = wb.g, Qa[Ha + 2] = wb.b, Qa[Ha + 3] = xb.r, Qa[Ha + 4] = xb.g, Qa[Ha + 5] = xb.b, Qa[Ha + 6] = yb.r, Qa[Ha + 7] = yb.g, Qa[Ha + 8] = yb.b, Ha += 9;
                            for (H = 0, U = na.length; H < U; H++) M = Ia[na[H]], pb = M.vertexColors, Gc = M.color, 4 === pb.length && Vc === THREE.VertexColors ? (wb = pb[0], xb = pb[1], yb = pb[2], tc = pb[3]) : tc = yb = xb = wb = Gc, Qa[Ha] = wb.r, Qa[Ha + 1] = wb.g, Qa[Ha + 2] = wb.b, Qa[Ha + 3] = xb.r, Qa[Ha + 4] = xb.g, Qa[Ha + 5] = xb.b, Qa[Ha + 6] = yb.r, Qa[Ha + 7] = yb.g, Qa[Ha + 8] = yb.b, Qa[Ha + 9] = tc.r, Qa[Ha + 10] = tc.g, Qa[Ha + 11] = tc.b, Ha += 12;
                            0 < Ha && (i.bindBuffer(i.ARRAY_BUFFER, fa.__webglColorBuffer), i.bufferData(i.ARRAY_BUFFER, Qa, eb))
                        }
                        if (td && Za.hasTangents) {
                            for (H = 0, U = ma.length; H < U; H++) M = Ia[ma[H]], Hb = M.vertexTangents, qb = Hb[0], rb = Hb[1], sb = Hb[2], xa[ua] = qb.x, xa[ua + 1] = qb.y, xa[ua + 2] = qb.z, xa[ua + 3] = qb.w, xa[ua + 4] = rb.x, xa[ua + 5] = rb.y, xa[ua + 6] = rb.z, xa[ua + 7] = rb.w, xa[ua + 8] = sb.x, xa[ua + 9] = sb.y, xa[ua + 10] = sb.z, xa[ua + 11] = sb.w, ua += 12;
                            for (H = 0, U = na.length; H < U; H++) M = Ia[na[H]], Hb = M.vertexTangents, qb = Hb[0], rb = Hb[1], sb = Hb[2], rc = Hb[3], xa[ua] = qb.x, xa[ua + 1] = qb.y, xa[ua + 2] = qb.z, xa[ua + 3] = qb.w, xa[ua + 4] = rb.x, xa[ua + 5] = rb.y, xa[ua + 6] = rb.z, xa[ua + 7] = rb.w, xa[ua + 8] = sb.x, xa[ua + 9] = sb.y, xa[ua + 10] = sb.z, xa[ua + 11] = sb.w, xa[ua + 12] = rc.x, xa[ua + 13] = rc.y, xa[ua + 14] = rc.z, xa[ua + 15] = rc.w, ua += 16;
                            i.bindBuffer(i.ARRAY_BUFFER, fa.__webglTangentBuffer);
                            i.bufferData(i.ARRAY_BUFFER, xa, eb)
                        }
                        if (sd && dd) {
                            for (H = 0, U = ma.length; H < U; H++) if (M = Ia[ma[H]], jc = M.vertexNormals, Ob = M.normal, 3 === jc.length && Fc) for (la = 0; 3 > la; la++) Vb = jc[la], jb[Va] = Vb.x, jb[Va + 1] = Vb.y, jb[Va + 2] = Vb.z, Va += 3;
                            else for (la = 0; 3 > la; la++) jb[Va] = Ob.x, jb[Va + 1] = Ob.y, jb[Va + 2] = Ob.z, Va += 3;
                            for (H = 0, U = na.length; H < U; H++) if (M = Ia[na[H]], jc = M.vertexNormals, Ob = M.normal, 4 === jc.length && Fc) for (la = 0; 4 > la; la++) Vb = jc[la], jb[Va] = Vb.x, jb[Va + 1] = Vb.y, jb[Va + 2] = Vb.z, Va += 3;
                            else for (la = 0; 4 > la; la++) jb[Va] = Ob.x, jb[Va + 1] = Ob.y, jb[Va + 2] = Ob.z, Va += 3;
                            i.bindBuffer(i.ARRAY_BUFFER, fa.__webglNormalBuffer);
                            i.bufferData(i.ARRAY_BUFFER, jb, eb)
                        }
                        if (hd && Zc && ed) {
                            for (H = 0, U = ma.length; H < U; H++) if (mb = ma[H], M = Ia[mb], kc = Zc[mb], void 0 !== kc) for (la = 0; 3 > la; la++) mc = kc[la], wc[Jb] = mc.u, wc[Jb + 1] = mc.v, Jb += 2;
                            for (H = 0, U = na.length; H < U; H++) if (mb = na[H], M = Ia[mb], kc = Zc[mb], void 0 !== kc) for (la = 0; 4 > la; la++) mc = kc[la], wc[Jb] = mc.u, wc[Jb + 1] = mc.v, Jb += 2;
                            0 < Jb && (i.bindBuffer(i.ARRAY_BUFFER, fa.__webglUVBuffer), i.bufferData(i.ARRAY_BUFFER, wc, eb))
                        }
                        if (hd && $c && ed) {
                            for (H = 0, U = ma.length; H < U; H++) if (mb = ma[H], M = Ia[mb], lc = $c[mb], void 0 !== lc) for (la = 0; 3 > la; la++) nc = lc[la], xc[Kb] = nc.u, xc[Kb + 1] = nc.v, Kb += 2;
                            for (H = 0, U = na.length; H < U; H++) if (mb = na[H], M = Ia[mb], lc = $c[mb], void 0 !== lc) for (la = 0; 4 > la; la++) nc = lc[la], xc[Kb] = nc.u, xc[Kb + 1] = nc.v, Kb += 2;
                            0 < Kb && (i.bindBuffer(i.ARRAY_BUFFER, fa.__webglUV2Buffer), i.bufferData(i.ARRAY_BUFFER, xc, eb))
                        }
                        if (rd) {
                            for (H = 0, U = ma.length; H < U; H++) M = Ia[ma[H]], Fb[ib] = Fa, Fb[ib + 1] = Fa + 1, Fb[ib + 2] = Fa + 2, ib += 3, gb[Ya] = Fa, gb[Ya + 1] = Fa + 1, gb[Ya + 2] = Fa, gb[Ya + 3] = Fa + 2, gb[Ya + 4] = Fa + 1, gb[Ya + 5] = Fa + 2, Ya += 6, Fa += 3;
                            for (H = 0, U = na.length; H < U; H++) M = Ia[na[H]], Fb[ib] = Fa, Fb[ib + 1] = Fa + 1, Fb[ib + 2] = Fa + 3, Fb[ib + 3] = Fa + 1, Fb[ib + 4] = Fa + 2, Fb[ib + 5] = Fa + 3, ib += 6, gb[Ya] = Fa, gb[Ya + 1] = Fa + 1, gb[Ya + 2] = Fa, gb[Ya + 3] = Fa + 3, gb[Ya + 4] = Fa + 1, gb[Ya + 5] = Fa + 2, gb[Ya + 6] = Fa + 2, gb[Ya + 7] = Fa + 3, Ya += 8, Fa += 4;
                            i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, fa.__webglFaceBuffer);
                            i.bufferData(i.ELEMENT_ARRAY_BUFFER, Fb, eb);
                            i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, fa.__webglLineBuffer);
                            i.bufferData(i.ELEMENT_ARRAY_BUFFER, gb, eb)
                        }
                        if (Yc) for (la = 0, fd = Yc.length; la < fd; la++) if (x = Yc[la], x.__original.needsUpdate) {
                            y = 0;
                            if (1 === x.size) if (void 0 === x.boundTo || "vertices" === x.boundTo) {
                                for (H = 0, U = ma.length; H < U; H++) M = Ia[ma[H]], x.array[y] = x.value[M.a], x.array[y + 1] = x.value[M.b], x.array[y + 2] = x.value[M.c], y += 3;
                                for (H = 0, U = na.length; H < U; H++) M = Ia[na[H]], x.array[y] = x.value[M.a], x.array[y + 1] = x.value[M.b], x.array[y + 2] = x.value[M.c], x.array[y + 3] = x.value[M.d], y += 4
                            } else {
                                if ("faces" === x.boundTo) {
                                    for (H = 0, U = ma.length; H < U; H++) fb = x.value[ma[H]], x.array[y] = fb, x.array[y + 1] = fb, x.array[y + 2] = fb, y += 3;
                                    for (H = 0, U = na.length; H < U; H++) fb = x.value[na[H]], x.array[y] = fb, x.array[y + 1] = fb, x.array[y + 2] = fb, x.array[y + 3] = fb, y += 4
                                }
                            } else if (2 === x.size) if (void 0 === x.boundTo || "vertices" === x.boundTo) {
                                for (H = 0, U = ma.length; H < U; H++) M = Ia[ma[H]], W = x.value[M.a], X = x.value[M.b], Y = x.value[M.c], x.array[y] = W.x, x.array[y + 1] = W.y, x.array[y + 2] = X.x, x.array[y + 3] = X.y, x.array[y + 4] = Y.x, x.array[y + 5] = Y.y, y += 6;
                                for (H = 0, U = na.length; H < U; H++) M = Ia[na[H]], W = x.value[M.a], X = x.value[M.b], Y = x.value[M.c], ta = x.value[M.d], x.array[y] = W.x, x.array[y + 1] = W.y, x.array[y + 2] = X.x, x.array[y + 3] = X.y, x.array[y + 4] = Y.x, x.array[y + 5] = Y.y, x.array[y + 6] = ta.x, x.array[y + 7] = ta.y, y += 8
                            } else {
                                if ("faces" === x.boundTo) {
                                    for (H = 0, U = ma.length; H < U; H++) Y = X = W = fb = x.value[ma[H]], x.array[y] = W.x, x.array[y + 1] = W.y, x.array[y + 2] = X.x, x.array[y + 3] = X.y, x.array[y + 4] = Y.x, x.array[y + 5] = Y.y, y += 6;
                                    for (H = 0, U = na.length; H < U; H++) ta = Y = X = W = fb = x.value[na[H]], x.array[y] = W.x, x.array[y + 1] = W.y, x.array[y + 2] = X.x, x.array[y + 3] = X.y, x.array[y + 4] = Y.x, x.array[y + 5] = Y.y, x.array[y + 6] = ta.x, x.array[y + 7] = ta.y, y += 8
                                }
                            } else if (3 === x.size) {
                                var ha;
                                ha = "c" === x.type ? ["r", "g", "b"] : ["x", "y", "z"];
                                if (void 0 === x.boundTo || "vertices" === x.boundTo) {
                                    for (H = 0, U = ma.length; H < U; H++) M = Ia[ma[H]], W = x.value[M.a], X = x.value[M.b], Y = x.value[M.c], x.array[y] = W[ha[0]], x.array[y + 1] = W[ha[1]], x.array[y + 2] = W[ha[2]], x.array[y + 3] = X[ha[0]], x.array[y + 4] = X[ha[1]], x.array[y + 5] = X[ha[2]], x.array[y + 6] = Y[ha[0]], x.array[y + 7] = Y[ha[1]], x.array[y + 8] = Y[ha[2]], y += 9;
                                    for (H = 0, U = na.length; H < U; H++) M = Ia[na[H]], W = x.value[M.a], X = x.value[M.b], Y = x.value[M.c], ta = x.value[M.d], x.array[y] = W[ha[0]], x.array[y + 1] = W[ha[1]], x.array[y + 2] = W[ha[2]], x.array[y + 3] = X[ha[0]], x.array[y + 4] = X[ha[1]], x.array[y + 5] = X[ha[2]], x.array[y + 6] = Y[ha[0]], x.array[y + 7] = Y[ha[1]], x.array[y + 8] = Y[ha[2]], x.array[y + 9] = ta[ha[0]], x.array[y + 10] = ta[ha[1]], x.array[y + 11] = ta[ha[2]], y += 12
                                } else if ("faces" === x.boundTo) {
                                    for (H = 0, U = ma.length; H < U; H++) Y = X = W = fb = x.value[ma[H]], x.array[y] = W[ha[0]], x.array[y + 1] = W[ha[1]], x.array[y + 2] = W[ha[2]], x.array[y + 3] = X[ha[0]], x.array[y + 4] = X[ha[1]], x.array[y + 5] = X[ha[2]], x.array[y + 6] = Y[ha[0]], x.array[y + 7] = Y[ha[1]], x.array[y + 8] = Y[ha[2]], y += 9;
                                    for (H = 0, U = na.length; H < U; H++) ta = Y = X = W = fb = x.value[na[H]], x.array[y] = W[ha[0]], x.array[y + 1] = W[ha[1]], x.array[y + 2] = W[ha[2]], x.array[y + 3] = X[ha[0]], x.array[y + 4] = X[ha[1]], x.array[y + 5] = X[ha[2]], x.array[y + 6] = Y[ha[0]], x.array[y + 7] = Y[ha[1]], x.array[y + 8] = Y[ha[2]], x.array[y + 9] = ta[ha[0]], x.array[y + 10] = ta[ha[1]], x.array[y + 11] = ta[ha[2]], y += 12
                                }
                            } else if (4 === x.size) if (void 0 === x.boundTo || "vertices" === x.boundTo) {
                                for (H = 0, U = ma.length; H < U; H++) M = Ia[ma[H]], W = x.value[M.a], X = x.value[M.b], Y = x.value[M.c], x.array[y] = W.x, x.array[y + 1] = W.y, x.array[y + 2] = W.z, x.array[y + 3] = W.w, x.array[y + 4] = X.x, x.array[y + 5] = X.y, x.array[y + 6] = X.z, x.array[y + 7] = X.w, x.array[y + 8] = Y.x, x.array[y + 9] = Y.y, x.array[y + 10] = Y.z, x.array[y + 11] = Y.w, y += 12;
                                for (H = 0, U = na.length; H < U; H++) M = Ia[na[H]], W = x.value[M.a], X = x.value[M.b], Y = x.value[M.c], ta = x.value[M.d], x.array[y] = W.x, x.array[y + 1] = W.y, x.array[y + 2] = W.z, x.array[y + 3] = W.w, x.array[y + 4] = X.x, x.array[y + 5] = X.y, x.array[y + 6] = X.z, x.array[y + 7] = X.w, x.array[y + 8] = Y.x, x.array[y + 9] = Y.y, x.array[y + 10] = Y.z, x.array[y + 11] = Y.w, x.array[y + 12] = ta.x, x.array[y + 13] = ta.y, x.array[y + 14] = ta.z, x.array[y + 15] = ta.w, y += 16
                            } else if ("faces" === x.boundTo) {
                                for (H = 0, U = ma.length; H < U; H++) Y = X = W = fb = x.value[ma[H]], x.array[y] = W.x, x.array[y + 1] = W.y, x.array[y + 2] = W.z, x.array[y + 3] = W.w, x.array[y + 4] = X.x, x.array[y + 5] = X.y, x.array[y + 6] = X.z, x.array[y + 7] = X.w, x.array[y + 8] = Y.x, x.array[y + 9] = Y.y, x.array[y + 10] = Y.z, x.array[y + 11] = Y.w, y += 12;
                                for (H = 0, U = na.length; H < U; H++) ta = Y = X = W = fb = x.value[na[H]], x.array[y] = W.x, x.array[y + 1] = W.y, x.array[y + 2] = W.z, x.array[y + 3] = W.w, x.array[y + 4] = X.x, x.array[y + 5] = X.y, x.array[y + 6] = X.z, x.array[y + 7] = X.w, x.array[y + 8] = Y.x, x.array[y + 9] = Y.y, x.array[y + 10] = Y.z, x.array[y + 11] = Y.w, x.array[y + 12] = ta.x, x.array[y + 13] = ta.y, x.array[y + 14] = ta.z, x.array[y + 15] = ta.w, y += 16
                            }
                            i.bindBuffer(i.ARRAY_BUFFER, x.buffer);
                            i.bufferData(i.ARRAY_BUFFER, x.array, eb)
                        }
                        qd && (delete fa.__inittedArrays, delete fa.__colorArray, delete fa.__normalArray, delete fa.__tangentArray, delete fa.__uvArray, delete fa.__uv2Array, delete fa.__faceArray, delete fa.__vertexArray, delete fa.__lineArray, delete fa.__skinVertexAArray, delete fa.__skinVertexBArray, delete fa.__skinIndexArray, delete fa.__skinWeightArray)
                    }
                }
                ka.__dirtyVertices = !1;
                ka.__dirtyMorphTargets = !1;
                ka.__dirtyElements = !1;
                ka.__dirtyUvs = !1;
                ka.__dirtyNormals = !1;
                ka.__dirtyColors = !1;
                ka.__dirtyTangents = !1;
                bb.attributes && m(bb)
            } else if (ob instanceof THREE.Ribbon) {
                if (ka.__dirtyVertices || ka.__dirtyColors) {
                    var Zb = ka,
                        id = i.DYNAMIC_DRAW,
                        yc = void 0,
                        zc = void 0,
                        Kc = void 0,
                        $b = void 0,
                        Lc = void 0,
                        jd = Zb.vertices,
                        kd = Zb.colors,
                        wd = jd.length,
                        xd = kd.length,
                        Mc = Zb.__vertexArray,
                        Nc = Zb.__colorArray,
                        yd = Zb.__dirtyColors;
                    if (Zb.__dirtyVertices) {
                        for (yc = 0; yc < wd; yc++) Kc = jd[yc].position, $b = 3 * yc, Mc[$b] = Kc.x, Mc[$b + 1] = Kc.y, Mc[$b + 2] = Kc.z;
                        i.bindBuffer(i.ARRAY_BUFFER, Zb.__webglVertexBuffer);
                        i.bufferData(i.ARRAY_BUFFER, Mc, id)
                    }
                    if (yd) {
                        for (zc = 0; zc < xd; zc++) Lc = kd[zc], $b = 3 * zc, Nc[$b] = Lc.r, Nc[$b + 1] = Lc.g, Nc[$b + 2] = Lc.b;
                        i.bindBuffer(i.ARRAY_BUFFER, Zb.__webglColorBuffer);
                        i.bufferData(i.ARRAY_BUFFER, Nc, id)
                    }
                }
                ka.__dirtyVertices = !1;
                ka.__dirtyColors = !1
            } else if (ob instanceof THREE.Line) {
                bb = c(ob, qc);
                ic = bb.attributes && p(bb);
                if (ka.__dirtyVertices || ka.__dirtyColors || ic) {
                    var Lb = ka,
                        ad = i.DYNAMIC_DRAW,
                        Ac = void 0,
                        Bc = void 0,
                        Oc = void 0,
                        Ca = void 0,
                        Pc = void 0,
                        ld = Lb.vertices,
                        md = Lb.colors,
                        zd = ld.length,
                        Ad = md.length,
                        Qc = Lb.__vertexArray,
                        Rc = Lb.__colorArray,
                        Bd = Lb.__dirtyColors,
                        bd = Lb.__webglCustomAttributesList,
                        Sc = void 0,
                        nd = void 0,
                        Ta = void 0,
                        oc = void 0,
                        cb = void 0,
                        wa = void 0;
                    if (Lb.__dirtyVertices) {
                        for (Ac = 0; Ac < zd; Ac++) Oc = ld[Ac].position, Ca = 3 * Ac, Qc[Ca] = Oc.x, Qc[Ca + 1] = Oc.y, Qc[Ca + 2] = Oc.z;
                        i.bindBuffer(i.ARRAY_BUFFER, Lb.__webglVertexBuffer);
                        i.bufferData(i.ARRAY_BUFFER, Qc, ad)
                    }
                    if (Bd) {
                        for (Bc = 0; Bc < Ad; Bc++) Pc = md[Bc], Ca = 3 * Bc, Rc[Ca] = Pc.r, Rc[Ca + 1] = Pc.g, Rc[Ca + 2] = Pc.b;
                        i.bindBuffer(i.ARRAY_BUFFER, Lb.__webglColorBuffer);
                        i.bufferData(i.ARRAY_BUFFER, Rc, ad)
                    }
                    if (bd) for (Sc = 0, nd = bd.length; Sc < nd; Sc++) if (wa = bd[Sc], wa.needsUpdate && (void 0 === wa.boundTo || "vertices" === wa.boundTo)) {
                        Ca = 0;
                        oc = wa.value.length;
                        if (1 === wa.size) for (Ta = 0; Ta < oc; Ta++) wa.array[Ta] = wa.value[Ta];
                        else if (2 === wa.size) for (Ta = 0; Ta < oc; Ta++) cb = wa.value[Ta], wa.array[Ca] = cb.x, wa.array[Ca + 1] = cb.y, Ca += 2;
                        else if (3 === wa.size) if ("c" === wa.type) for (Ta = 0; Ta < oc; Ta++) cb = wa.value[Ta], wa.array[Ca] = cb.r, wa.array[Ca + 1] = cb.g, wa.array[Ca + 2] = cb.b, Ca += 3;
                        else for (Ta = 0; Ta < oc; Ta++) cb = wa.value[Ta], wa.array[Ca] = cb.x, wa.array[Ca + 1] = cb.y, wa.array[Ca + 2] = cb.z, Ca += 3;
                        else if (4 === wa.size) for (Ta = 0; Ta < oc; Ta++) cb = wa.value[Ta], wa.array[Ca] = cb.x, wa.array[Ca + 1] = cb.y, wa.array[Ca + 2] = cb.z, wa.array[Ca + 3] = cb.w, Ca += 4;
                        i.bindBuffer(i.ARRAY_BUFFER, wa.buffer);
                        i.bufferData(i.ARRAY_BUFFER, wa.array, ad)
                    }
                }
                ka.__dirtyVertices = !1;
                ka.__dirtyColors = !1;
                bb.attributes && m(bb)
            } else if (ob instanceof THREE.ParticleSystem) bb = c(ob, qc), ic = bb.attributes && p(bb), (ka.__dirtyVertices || ka.__dirtyColors || ob.sortParticles || ic) && f(ka, i.DYNAMIC_DRAW, ob), ka.__dirtyVertices = !1, ka.__dirtyColors = !1, bb.attributes && m(bb)
        }
    };
    this.initMaterial = function (a, b, c, d) {
        var e, f, g, h, j;
        a instanceof THREE.MeshDepthMaterial ? j = "depth" : a instanceof THREE.MeshNormalMaterial ? j = "normal" : a instanceof
        THREE.MeshBasicMaterial ? j = "basic" : a instanceof THREE.MeshLambertMaterial ? j = "lambert" : a instanceof THREE.MeshPhongMaterial ? j = "phong" : a instanceof THREE.LineBasicMaterial ? j = "basic" : a instanceof THREE.ParticleBasicMaterial && (j = "particle_basic");
        if (j) {
            var l = THREE.ShaderLib[j];
            a.uniforms = THREE.UniformsUtils.clone(l.uniforms);
            a.vertexShader = l.vertexShader;
            a.fragmentShader = l.fragmentShader
        }
        var k, m;
        f = l = 0;
        for (k = 0, m = b.length; k < m; k++) e = b[k], e.onlyShadow || (e instanceof THREE.DirectionalLight && f++, e instanceof
        THREE.PointLight && l++, e instanceof THREE.SpotLight && l++);
        l + f <= I ? k = f : (k = Math.ceil(I * f / (l + f)), l = I - k);
        e = k;
        f = l;
        var n = 0;
        for (l = 0, k = b.length; l < k; l++) m = b[l], m.castShadow && (m instanceof THREE.SpotLight && n++, m instanceof THREE.DirectionalLight && !m.shadowCascade && n++);
        var o = 50;
        if (void 0 !== d && d instanceof THREE.SkinnedMesh) o = d.bones.length;
        var p;
        a: {
            k = a.fragmentShader;
            m = a.vertexShader;
            var l = a.uniforms,
                b = a.attributes,
                c = {
                    map: !! a.map,
                    envMap: !! a.envMap,
                    lightMap: !! a.lightMap,
                    vertexColors: a.vertexColors,
                    fog: c,
                    useFog: a.fog,
                    sizeAttenuation: a.sizeAttenuation,
                    skinning: a.skinning,
                    morphTargets: a.morphTargets,
                    morphNormals: a.morphNormals,
                    maxMorphTargets: this.maxMorphTargets,
                    maxMorphNormals: this.maxMorphNormals,
                    maxDirLights: e,
                    maxPointLights: f,
                    maxBones: o,
                    shadowMapEnabled: this.shadowMapEnabled && d.receiveShadow,
                    shadowMapSoft: this.shadowMapSoft,
                    shadowMapDebug: this.shadowMapDebug,
                    shadowMapCascade: this.shadowMapCascade,
                    maxShadows: n,
                    alphaTest: a.alphaTest,
                    metal: a.metal,
                    perPixel: a.perPixel,
                    wrapAround: a.wrapAround,
                    doubleSided: d && d.doubleSided
                },
                r, d = [];
            j ? d.push(j) : (d.push(k), d.push(m));
            for (r in c) d.push(r), d.push(c[r]);
            j = d.join();
            for (r = 0, d = S.length; r < d; r++) if (S[r].code === j) {
                p = S[r].program;
                break a
            }
            r = i.createProgram();
            d = ["precision " + C + " float;", 0 < La ? "#define VERTEX_TEXTURES" : "", D.gammaInput ? "#define GAMMA_INPUT" : "", D.gammaOutput ? "#define GAMMA_OUTPUT" : "", D.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "", "#define MAX_DIR_LIGHTS " + c.maxDirLights, "#define MAX_POINT_LIGHTS " + c.maxPointLights, "#define MAX_SHADOWS " + c.maxShadows, "#define MAX_BONES " + c.maxBones, c.map ? "#define USE_MAP" : "", c.envMap ? "#define USE_ENVMAP" : "", c.lightMap ? "#define USE_LIGHTMAP" : "", c.vertexColors ? "#define USE_COLOR" : "", c.skinning ? "#define USE_SKINNING" : "", c.morphTargets ? "#define USE_MORPHTARGETS" : "", c.morphNormals ? "#define USE_MORPHNORMALS" : "", c.perPixel ? "#define PHONG_PER_PIXEL" : "", c.wrapAround ? "#define WRAP_AROUND" : "", c.doubleSided ? "#define DOUBLE_SIDED" : "", c.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", c.shadowMapSoft ? "#define SHADOWMAP_SOFT" : "", c.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", c.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", c.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", "uniform mat4 objectMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\n#ifdef USE_MORPHNORMALS\nattribute vec3 morphNormal0;\nattribute vec3 morphNormal1;\nattribute vec3 morphNormal2;\nattribute vec3 morphNormal3;\n#else\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinVertexA;\nattribute vec4 skinVertexB;\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n"].join("\n");
            e = ["precision " + C + " float;", "#define MAX_DIR_LIGHTS " + c.maxDirLights, "#define MAX_POINT_LIGHTS " + c.maxPointLights, "#define MAX_SHADOWS " + c.maxShadows, c.alphaTest ? "#define ALPHATEST " + c.alphaTest : "", D.gammaInput ? "#define GAMMA_INPUT" : "", D.gammaOutput ? "#define GAMMA_OUTPUT" : "", D.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "", c.useFog && c.fog ? "#define USE_FOG" : "", c.useFog && c.fog instanceof THREE.FogExp2 ? "#define FOG_EXP2" : "", c.map ? "#define USE_MAP" : "", c.envMap ? "#define USE_ENVMAP" : "", c.lightMap ? "#define USE_LIGHTMAP" : "", c.vertexColors ? "#define USE_COLOR" : "", c.metal ? "#define METAL" : "", c.perPixel ? "#define PHONG_PER_PIXEL" : "", c.wrapAround ? "#define WRAP_AROUND" : "", c.doubleSided ? "#define DOUBLE_SIDED" : "", c.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", c.shadowMapSoft ? "#define SHADOWMAP_SOFT" : "", c.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", c.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"].join("\n");
            i.attachShader(r, u("fragment", e + k));
            i.attachShader(r, u("vertex", d + m));
            i.linkProgram(r);
            i.getProgramParameter(r, i.LINK_STATUS) || console.error("Could not initialise shader\nVALIDATE_STATUS: " + i.getProgramParameter(r, i.VALIDATE_STATUS) + ", gl error [" + i.getError() + "]");
            r.uniforms = {};
            r.attributes = {};
            var q, d = "viewMatrix,modelViewMatrix,projectionMatrix,normalMatrix,objectMatrix,cameraPosition,boneGlobalMatrices,morphTargetInfluences".split(",");
            for (q in l) d.push(q);
            q = d;
            for (d = 0, l = q.length; d < l; d++) k = q[d], r.uniforms[k] = i.getUniformLocation(r, k);
            d = "position,normal,uv,uv2,tangent,color,skinVertexA,skinVertexB,skinIndex,skinWeight".split(",");
            for (q = 0; q < c.maxMorphTargets; q++) d.push("morphTarget" + q);
            for (q = 0; q < c.maxMorphNormals; q++) d.push("morphNormal" + q);
            for (p in b) d.push(p);
            p = d;
            for (q = 0, b = p.length; q < b; q++) c = p[q], r.attributes[c] = i.getAttribLocation(r, c);
            r.id = S.length;
            S.push({
                program: r,
                code: j
            });
            D.info.memory.programs = S.length;
            p = r
        }
        a.program = p;
        p = a.program.attributes;
        0 <= p.position && i.enableVertexAttribArray(p.position);
        0 <= p.color && i.enableVertexAttribArray(p.color);
        0 <= p.normal && i.enableVertexAttribArray(p.normal);
        0 <= p.tangent && i.enableVertexAttribArray(p.tangent);
        a.skinning && 0 <= p.skinVertexA && 0 <= p.skinVertexB && 0 <= p.skinIndex && 0 <= p.skinWeight && (i.enableVertexAttribArray(p.skinVertexA), i.enableVertexAttribArray(p.skinVertexB), i.enableVertexAttribArray(p.skinIndex), i.enableVertexAttribArray(p.skinWeight));
        if (a.attributes) for (h in a.attributes) void 0 !== p[h] && 0 <= p[h] && i.enableVertexAttribArray(p[h]);
        if (a.morphTargets) {
            a.numSupportedMorphTargets = 0;
            r = "morphTarget";
            for (h = 0; h < this.maxMorphTargets; h++) q = r + h, 0 <= p[q] && (i.enableVertexAttribArray(p[q]), a.numSupportedMorphTargets++)
        }
        if (a.morphNormals) {
            a.numSupportedMorphNormals = 0;
            r = "morphNormal";
            for (h = 0; h < this.maxMorphNormals; h++) q = r + h, 0 <= p[q] && (i.enableVertexAttribArray(p[q]), a.numSupportedMorphNormals++)
        }
        a.uniformsList = [];
        for (g in a.uniforms) a.uniformsList.push([a.uniforms[g], g])
    };
    this.setFaceCulling = function (a, b) {
        a ? (!b || "ccw" === b ? i.frontFace(i.CCW) : i.frontFace(i.CW), "back" === a ? i.cullFace(i.BACK) : "front" === a ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK), i.enable(i.CULL_FACE)) : i.disable(i.CULL_FACE)
    };
    this.setObjectFaces = function (a) {
        if (ia !== a.doubleSided) a.doubleSided ? i.disable(i.CULL_FACE) : i.enable(i.CULL_FACE), ia = a.doubleSided;
        if (R !== a.flipSided) a.flipSided ? i.frontFace(i.CW) : i.frontFace(i.CCW), R = a.flipSided
    };
    this.setDepthTest = function (a) {
        Ga !== a && (a ? i.enable(i.DEPTH_TEST) : i.disable(i.DEPTH_TEST), Ga = a)
    };
    this.setDepthWrite = function (a) {
        oa !== a && (i.depthMask(a), oa = a)
    };
    this.setBlending = function (a, b, c, d) {
        if (a !== $) {
            switch (a) {
            case THREE.NoBlending:
                i.disable(i.BLEND);
                break;
            case THREE.AdditiveBlending:
                i.enable(i.BLEND);
                i.blendEquation(i.FUNC_ADD);
                i.blendFunc(i.SRC_ALPHA, i.ONE);
                break;
            case THREE.SubtractiveBlending:
                i.enable(i.BLEND);
                i.blendEquation(i.FUNC_ADD);
                i.blendFunc(i.ZERO, i.ONE_MINUS_SRC_COLOR);
                break;
            case THREE.MultiplyBlending:
                i.enable(i.BLEND);
                i.blendEquation(i.FUNC_ADD);
                i.blendFunc(i.ZERO, i.SRC_COLOR);
                break;
            case THREE.CustomBlending:
                i.enable(i.BLEND);
                break;
            default:
                i.enable(i.BLEND), i.blendEquationSeparate(i.FUNC_ADD, i.FUNC_ADD), i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA)
            }
            $ = a
        }
        if (a === THREE.CustomBlending) {
            if (b !== ba && (i.blendEquation(z(b)), ba = b), c !== Z || d !== ja) i.blendFunc(z(c), z(d)), Z = c, ja = d
        } else ja = Z = ba = null
    };
    this.setTexture = function (a, b) {
        if (a.needsUpdate) {
            if (!a.__webglInit) a.__webglInit = !0, a.__webglTexture = i.createTexture(), D.info.memory.textures++;
            i.activeTexture(i.TEXTURE0 + b);
            i.bindTexture(i.TEXTURE_2D, a.__webglTexture);
            i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, a.premultiplyAlpha);
            var c = a.image,
                d = 0 === (c.width & c.width - 1) && 0 === (c.height & c.height - 1),
                e = z(a.format),
                f = z(a.type);
            v(i.TEXTURE_2D, a, d);
            a instanceof THREE.DataTexture ? i.texImage2D(i.TEXTURE_2D, 0, e, c.width, c.height, 0, e, f, c.data) : i.texImage2D(i.TEXTURE_2D, 0, e, e, f, a.image);
            a.generateMipmaps && d && i.generateMipmap(i.TEXTURE_2D);
            a.needsUpdate = !1;
            if (a.onUpdate) a.onUpdate()
        } else i.activeTexture(i.TEXTURE0 + b), i.bindTexture(i.TEXTURE_2D, a.__webglTexture)
    };
    this.setRenderTarget = function (a) {
        var b = a instanceof THREE.WebGLRenderTargetCube;
        if (a && !a.__webglFramebuffer) {
            if (void 0 === a.depthBuffer) a.depthBuffer = !0;
            if (void 0 === a.stencilBuffer) a.stencilBuffer = !0;
            a.__webglTexture = i.createTexture();
            var c = 0 === (a.width & a.width - 1) && 0 === (a.height & a.height - 1),
                d = z(a.format),
                e = z(a.type);
            if (b) {
                a.__webglFramebuffer = [];
                a.__webglRenderbuffer = [];
                i.bindTexture(i.TEXTURE_CUBE_MAP, a.__webglTexture);
                v(i.TEXTURE_CUBE_MAP, a, c);
                for (var f = 0; 6 > f; f++) {
                    a.__webglFramebuffer[f] = i.createFramebuffer();
                    a.__webglRenderbuffer[f] = i.createRenderbuffer();
                    i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + f, 0, d, a.width, a.height, 0, d, e, null);
                    var g = a,
                        h = i.TEXTURE_CUBE_MAP_POSITIVE_X + f;
                    i.bindFramebuffer(i.FRAMEBUFFER, a.__webglFramebuffer[f]);
                    i.framebufferTexture2D(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0, h, g.__webglTexture, 0);
                    t(a.__webglRenderbuffer[f], a)
                }
                c && i.generateMipmap(i.TEXTURE_CUBE_MAP)
            } else a.__webglFramebuffer = i.createFramebuffer(), a.__webglRenderbuffer = i.createRenderbuffer(), i.bindTexture(i.TEXTURE_2D, a.__webglTexture), v(i.TEXTURE_2D, a, c), i.texImage2D(i.TEXTURE_2D, 0, d, a.width, a.height, 0, d, e, null), d = i.TEXTURE_2D, i.bindFramebuffer(i.FRAMEBUFFER, a.__webglFramebuffer), i.framebufferTexture2D(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0, d, a.__webglTexture, 0), t(a.__webglRenderbuffer, a), c && i.generateMipmap(i.TEXTURE_2D);
            b ? i.bindTexture(i.TEXTURE_CUBE_MAP, null) : i.bindTexture(i.TEXTURE_2D, null);
            i.bindRenderbuffer(i.RENDERBUFFER, null);
            i.bindFramebuffer(i.FRAMEBUFFER, null)
        }
        a ? (b = b ? a.__webglFramebuffer[a.activeCubeFace] : a.__webglFramebuffer, c = a.width, a = a.height, e = d = 0) : (b = null, c = kb, a = db, d = $a, e = ab);
        b !== A && (i.bindFramebuffer(i.FRAMEBUFFER, b), i.viewport(d, e, c, a), A = b);
        hb = c;
        nb = a
    };
    this.shadowMapPlugin = new THREE.ShadowMapPlugin;
    this.addPrePlugin(this.shadowMapPlugin);
    this.addPostPlugin(new THREE.SpritePlugin);
    this.addPostPlugin(new THREE.LensFlarePlugin)
};
THREE.WebGLRenderTarget = function (a, b, c) {
    this.width = a;
    this.height = b;
    c = c || {};
    this.wrapS = void 0 !== c.wrapS ? c.wrapS : THREE.ClampToEdgeWrapping;
    this.wrapT = void 0 !== c.wrapT ? c.wrapT : THREE.ClampToEdgeWrapping;
    this.magFilter = void 0 !== c.magFilter ? c.magFilter : THREE.LinearFilter;
    this.minFilter = void 0 !== c.minFilter ? c.minFilter : THREE.LinearMipMapLinearFilter;
    this.offset = new THREE.Vector2(0, 0);
    this.repeat = new THREE.Vector2(1, 1);
    this.format = void 0 !== c.format ? c.format : THREE.RGBAFormat;
    this.type = void 0 !== c.type ? c.type : THREE.UnsignedByteType;
    this.depthBuffer = void 0 !== c.depthBuffer ? c.depthBuffer : !0;
    this.stencilBuffer = void 0 !== c.stencilBuffer ? c.stencilBuffer : !0;
    this.generateMipmaps = !0
};
THREE.WebGLRenderTarget.prototype.clone = function () {
    var a = new THREE.WebGLRenderTarget(this.width, this.height);
    a.wrapS = this.wrapS;
    a.wrapT = this.wrapT;
    a.magFilter = this.magFilter;
    a.minFilter = this.minFilter;
    a.offset.copy(this.offset);
    a.repeat.copy(this.repeat);
    a.format = this.format;
    a.type = this.type;
    a.depthBuffer = this.depthBuffer;
    a.stencilBuffer = this.stencilBuffer;
    return a
};
THREE.WebGLRenderTargetCube = function (a, b, c) {
    THREE.WebGLRenderTarget.call(this, a, b, c);
    this.activeCubeFace = 0
};
THREE.WebGLRenderTargetCube.prototype = new THREE.WebGLRenderTarget;
THREE.WebGLRenderTargetCube.prototype.constructor = THREE.WebGLRenderTargetCube;
THREE.RenderableVertex = function () {
    this.positionWorld = new THREE.Vector3;
    this.positionScreen = new THREE.Vector4;
    this.visible = !0
};
THREE.RenderableVertex.prototype.copy = function (a) {
    this.positionWorld.copy(a.positionWorld);
    this.positionScreen.copy(a.positionScreen)
};
THREE.RenderableFace3 = function () {
    this.v1 = new THREE.RenderableVertex;
    this.v2 = new THREE.RenderableVertex;
    this.v3 = new THREE.RenderableVertex;
    this.centroidWorld = new THREE.Vector3;
    this.centroidScreen = new THREE.Vector3;
    this.normalWorld = new THREE.Vector3;
    this.vertexNormalsWorld = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
    this.faceMaterial = this.material = null;
    this.uvs = [
        []
    ];
    this.z = null
};
THREE.RenderableFace4 = function () {
    this.v1 = new THREE.RenderableVertex;
    this.v2 = new THREE.RenderableVertex;
    this.v3 = new THREE.RenderableVertex;
    this.v4 = new THREE.RenderableVertex;
    this.centroidWorld = new THREE.Vector3;
    this.centroidScreen = new THREE.Vector3;
    this.normalWorld = new THREE.Vector3;
    this.vertexNormalsWorld = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
    this.faceMaterial = this.material = null;
    this.uvs = [
        []
    ];
    this.z = null
};
THREE.RenderableObject = function () {
    this.z = this.object = null
};
THREE.RenderableParticle = function () {
    this.rotation = this.z = this.y = this.x = null;
    this.scale = new THREE.Vector2;
    this.material = null
};
THREE.RenderableLine = function () {
    this.z = null;
    this.v1 = new THREE.RenderableVertex;
    this.v2 = new THREE.RenderableVertex;
    this.material = null
};
THREE.ColorUtils = {
    adjustHSV: function (a, b, c, d) {
        var e = THREE.ColorUtils.__hsv;
        THREE.ColorUtils.rgbToHsv(a, e);
        e.h = THREE.Math.clamp(e.h + b, 0, 1);
        e.s = THREE.Math.clamp(e.s + c, 0, 1);
        e.v = THREE.Math.clamp(e.v + d, 0, 1);
        a.setHSV(e.h, e.s, e.v)
    },
    rgbToHsv: function (a, b) {
        var c = a.r,
            d = a.g,
            e = a.b,
            f = Math.max(Math.max(c, d), e),
            g = Math.min(Math.min(c, d), e);
        if (g === f) g = c = 0;
        else {
            var h = f - g,
                g = h / f,
                c = (c === f ? (d - e) / h : d === f ? 2 + (e - c) / h : 4 + (c - d) / h) / 6;
            0 > c && (c += 1);
            1 < c && (c -= 1)
        }
        void 0 === b && (b = {
            h: 0,
            s: 0,
            v: 0
        });
        b.h = c;
        b.s = g;
        b.v = f;
        return b
    }
};
THREE.ColorUtils.__hsv = {
    h: 0,
    s: 0,
    v: 0
};
THREE.GeometryUtils = {
    merge: function (a, b) {
        for (var c, d, e = a.vertices.length, f = b instanceof THREE.Mesh ? b.geometry : b, g = a.vertices, h = f.vertices, l = a.faces, j = f.faces, k = a.faceVertexUvs[0], p = f.faceVertexUvs[0], m = {}, o = 0; o < a.materials.length; o++) m[a.materials[o].id] = o;
        if (b instanceof THREE.Mesh) b.matrixAutoUpdate && b.updateMatrix(), c = b.matrix, d = new THREE.Matrix4, d.extractRotation(c, b.scale);
        for (var o = 0, r = h.length; o < r; o++) {
            var n = h[o].clone();
            c && c.multiplyVector3(n.position);
            g.push(n)
        }
        for (o = 0, r = j.length; o < r; o++) {
            var g = j[o],
                q, s, u = g.vertexNormals,
                v = g.vertexColors;
            g instanceof THREE.Face3 ? q = new THREE.Face3(g.a + e, g.b + e, g.c + e) : g instanceof THREE.Face4 && (q = new THREE.Face4(g.a + e, g.b + e, g.c + e, g.d + e));
            q.normal.copy(g.normal);
            d && d.multiplyVector3(q.normal);
            h = 0;
            for (n = u.length; h < n; h++) s = u[h].clone(), d && d.multiplyVector3(s), q.vertexNormals.push(s);
            q.color.copy(g.color);
            h = 0;
            for (n = v.length; h < n; h++) s = v[h], q.vertexColors.push(s.clone());
            if (void 0 !== g.materialIndex) {
                h = f.materials[g.materialIndex];
                n = h.id;
                v = m[n];
                if (void 0 === v) v = a.materials.length, m[n] = v, a.materials.push(h);
                q.materialIndex = v
            }
            q.centroid.copy(g.centroid);
            c && c.multiplyVector3(q.centroid);
            l.push(q)
        }
        for (o = 0, r = p.length; o < r; o++) {
            c = p[o];
            d = [];
            h = 0;
            for (n = c.length; h < n; h++) d.push(new THREE.UV(c[h].u, c[h].v));
            k.push(d)
        }
    },
    clone: function (a) {
        var b = new THREE.Geometry,
            c, d = a.vertices,
            e = a.faces,
            f = a.faceVertexUvs[0];
        if (a.materials) b.materials = a.materials.slice();
        for (a = 0, c = d.length; a < c; a++) b.vertices.push(d[a].clone());
        for (a = 0, c = e.length; a < c; a++) b.faces.push(e[a].clone());
        for (a = 0, c = f.length; a < c; a++) {
            for (var d = f[a], e = [], g = 0, h = d.length; g < h; g++) e.push(new THREE.UV(d[g].u, d[g].v));
            b.faceVertexUvs[0].push(e)
        }
        return b
    },
    randomPointInTriangle: function (a, b, c) {
        var d, e, f, g = new THREE.Vector3,
            h = THREE.GeometryUtils.__v1;
        d = THREE.GeometryUtils.random();
        e = THREE.GeometryUtils.random();
        1 < d + e && (d = 1 - d, e = 1 - e);
        f = 1 - d - e;
        g.copy(a);
        g.multiplyScalar(d);
        h.copy(b);
        h.multiplyScalar(e);
        g.addSelf(h);
        h.copy(c);
        h.multiplyScalar(f);
        g.addSelf(h);
        return g
    },
    randomPointInFace: function (a, b, c) {
        var d, e, f;
        if (a instanceof THREE.Face3) return d = b.vertices[a.a].position, e = b.vertices[a.b].position, f = b.vertices[a.c].position, THREE.GeometryUtils.randomPointInTriangle(d, e, f);
        if (a instanceof THREE.Face4) {
            d = b.vertices[a.a].position;
            e = b.vertices[a.b].position;
            f = b.vertices[a.c].position;
            var b = b.vertices[a.d].position,
                g;
            c ? a._area1 && a._area2 ? (c = a._area1, g = a._area2) : (c = THREE.GeometryUtils.triangleArea(d, e, b), g = THREE.GeometryUtils.triangleArea(e, f, b), a._area1 = c, a._area2 = g) : (c = THREE.GeometryUtils.triangleArea(d, e, b), g = THREE.GeometryUtils.triangleArea(e, f, b));
            return THREE.GeometryUtils.random() * (c + g) < c ? THREE.GeometryUtils.randomPointInTriangle(d, e, b) : THREE.GeometryUtils.randomPointInTriangle(e, f, b)
        }
    },
    randomPointsInGeometry: function (a, b) {
        function c(a) {
            function b(c, d) {
                if (d < c) return c;
                var e = c + Math.floor((d - c) / 2);
                return j[e] > a ? b(c, e - 1) : j[e] < a ? b(e + 1, d) : e
            }
            return b(0, j.length - 1)
        }
        var d, e, f = a.faces,
            g = a.vertices,
            h = f.length,
            l = 0,
            j = [],
            k, p, m, o;
        for (e = 0; e < h; e++) {
            d = f[e];
            if (d instanceof THREE.Face3) k = g[d.a].position, p = g[d.b].position, m = g[d.c].position, d._area = THREE.GeometryUtils.triangleArea(k, p, m);
            else if (d instanceof
            THREE.Face4) k = g[d.a].position, p = g[d.b].position, m = g[d.c].position, o = g[d.d].position, d._area1 = THREE.GeometryUtils.triangleArea(k, p, o), d._area2 = THREE.GeometryUtils.triangleArea(p, m, o), d._area = d._area1 + d._area2;
            l += d._area;
            j[e] = l
        }
        d = [];
        for (e = 0; e < b; e++) g = THREE.GeometryUtils.random() * l, g = c(g), d[e] = THREE.GeometryUtils.randomPointInFace(f[g], a, !0);
        return d
    },
    triangleArea: function (a, b, c) {
        var d, e = THREE.GeometryUtils.__v1;
        e.sub(a, b);
        d = e.length();
        e.sub(a, c);
        a = e.length();
        e.sub(b, c);
        c = e.length();
        b = 0.5 * (d + a + c);
        return Math.sqrt(b * (b - d) * (b - a) * (b - c))
    },
    center: function (a) {
        a.computeBoundingBox();
        var b = a.boundingBox,
            c = new THREE.Vector3;
        c.add(b.min, b.max);
        c.multiplyScalar(-0.5);
        a.applyMatrix((new THREE.Matrix4).makeTranslation(c.x, c.y, c.z));
        a.computeBoundingBox();
        return c
    },
    normalizeUVs: function (a) {
        for (var a = a.faceVertexUvs[0], b = 0, c = a.length; b < c; b++) for (var d = a[b], e = 0, f = d.length; e < f; e++) 1 !== d[e].u && (d[e].u -= Math.floor(d[e].u)), 1 !== d[e].v && (d[e].v -= Math.floor(d[e].v))
    },
    triangulateQuads: function (a) {
        var b, c, d, e, f = [],
            g = [],
            h = [];
        for (b = 0, c = a.faceUvs.length; b < c; b++) g[b] = [];
        for (b = 0, c = a.faceVertexUvs.length; b < c; b++) h[b] = [];
        for (b = 0, c = a.faces.length; b < c; b++) if (d = a.faces[b], d instanceof THREE.Face4) {
            e = d.a;
            var l = d.b,
                j = d.c,
                k = d.d,
                p = new THREE.Face3,
                m = new THREE.Face3;
            p.color.copy(d.color);
            m.color.copy(d.color);
            p.materialIndex = d.materialIndex;
            m.materialIndex = d.materialIndex;
            p.a = e;
            p.b = l;
            p.c = k;
            m.a = l;
            m.b = j;
            m.c = k;
            4 === d.vertexColors.length && (p.vertexColors[0] = d.vertexColors[0].clone(), p.vertexColors[1] = d.vertexColors[1].clone(), p.vertexColors[2] = d.vertexColors[3].clone(), m.vertexColors[0] = d.vertexColors[1].clone(), m.vertexColors[1] = d.vertexColors[2].clone(), m.vertexColors[2] = d.vertexColors[3].clone());
            f.push(p, m);
            for (d = 0, e = a.faceVertexUvs.length; d < e; d++) a.faceVertexUvs[d].length && (p = a.faceVertexUvs[d][b], l = p[1], j = p[2], k = p[3], p = [p[0].clone(), l.clone(), k.clone()], l = [l.clone(), j.clone(), k.clone()], h[d].push(p, l));
            for (d = 0, e = a.faceUvs.length; d < e; d++) a.faceUvs[d].length && (l = a.faceUvs[d][b], g[d].push(l, l))
        } else {
            f.push(d);
            for (d = 0, e = a.faceUvs.length; d < e; d++) g[d].push(a.faceUvs[d]);
            for (d = 0, e = a.faceVertexUvs.length; d < e; d++) h[d].push(a.faceVertexUvs[d])
        }
        a.faces = f;
        a.faceUvs = g;
        a.faceVertexUvs = h;
        a.computeCentroids();
        a.computeFaceNormals();
        a.computeVertexNormals();
        a.hasTangents && a.computeTangents()
    },
    explode: function (a) {
        for (var b = [], c = 0, d = a.faces.length; c < d; c++) {
            var e = b.length,
                f = a.faces[c];
            if (f instanceof THREE.Face4) {
                var g = f.a,
                    h = f.b,
                    l = f.c,
                    g = a.vertices[g],
                    h = a.vertices[h],
                    l = a.vertices[l],
                    j = a.vertices[f.d];
                b.push(g.clone());
                b.push(h.clone());
                b.push(l.clone());
                b.push(j.clone());
                f.a = e;
                f.b = e + 1;
                f.c = e + 2;
                f.d = e + 3
            } else g = f.a, h = f.b, l = f.c, g = a.vertices[g], h = a.vertices[h], l = a.vertices[l], b.push(g.clone()), b.push(h.clone()), b.push(l.clone()), f.a = e, f.b = e + 1, f.c = e + 2
        }
        a.vertices = b;
        delete a.__tmpVertices
    },
    tessellate: function (a, b) {
        var c, d, e, f, g, h, l, j, k, p, m, o, r, n, q, s, u, v, t, w = [],
            z = [];
        for (c = 0, d = a.faceVertexUvs.length; c < d; c++) z[c] = [];
        for (c = 0, d = a.faces.length; c < d; c++) if (e = a.faces[c], e instanceof THREE.Face3) if (f = e.a, g = e.b, h = e.c, j = a.vertices[f], k = a.vertices[g], p = a.vertices[h], o = j.position.distanceTo(k.position), r = k.position.distanceTo(p.position), m = j.position.distanceTo(p.position), o > b || r > b || m > b) {
            l = a.vertices.length;
            v = e.clone();
            t = e.clone();
            o >= r && o >= m ? (j = j.clone(), j.position.lerpSelf(k.position, 0.5), v.a = f, v.b = l, v.c = h, t.a = l, t.b = g, t.c = h, 3 === e.vertexNormals.length && (f = e.vertexNormals[0].clone(), f.lerpSelf(e.vertexNormals[1], 0.5), v.vertexNormals[1].copy(f), t.vertexNormals[0].copy(f)), 3 === e.vertexColors.length && (f = e.vertexColors[0].clone(), f.lerpSelf(e.vertexColors[1], 0.5), v.vertexColors[1].copy(f), t.vertexColors[0].copy(f)), e = 0) : r >= o && r >= m ? (j = k.clone(), j.position.lerpSelf(p.position, 0.5), v.a = f, v.b = g, v.c = l, t.a = l, t.b = h, t.c = f, 3 === e.vertexNormals.length && (f = e.vertexNormals[1].clone(), f.lerpSelf(e.vertexNormals[2], 0.5), v.vertexNormals[2].copy(f), t.vertexNormals[0].copy(f), t.vertexNormals[1].copy(e.vertexNormals[2]), t.vertexNormals[2].copy(e.vertexNormals[0])), 3 === e.vertexColors.length && (f = e.vertexColors[1].clone(), f.lerpSelf(e.vertexColors[2], 0.5), v.vertexColors[2].copy(f), t.vertexColors[0].copy(f), t.vertexColors[1].copy(e.vertexColors[2]), t.vertexColors[2].copy(e.vertexColors[0])), e = 1) : (j = j.clone(), j.position.lerpSelf(p.position, 0.5), v.a = f, v.b = g, v.c = l, t.a = l, t.b = g, t.c = h, 3 === e.vertexNormals.length && (f = e.vertexNormals[0].clone(), f.lerpSelf(e.vertexNormals[2], 0.5), v.vertexNormals[2].copy(f), t.vertexNormals[0].copy(f)), 3 === e.vertexColors.length && (f = e.vertexColors[0].clone(), f.lerpSelf(e.vertexColors[2], 0.5), v.vertexColors[2].copy(f), t.vertexColors[0].copy(f)), e = 2);
            w.push(v, t);
            a.vertices.push(j);
            for (f = 0, g = a.faceVertexUvs.length; f < g; f++) a.faceVertexUvs[f].length && (j = a.faceVertexUvs[f][c], t = j[0], h = j[1], v = j[2], 0 === e ? (k = t.clone(), k.lerpSelf(h, 0.5), j = [t.clone(), k.clone(), v.clone()], h = [k.clone(), h.clone(), v.clone()]) : 1 === e ? (k = h.clone(), k.lerpSelf(v, 0.5), j = [t.clone(), h.clone(), k.clone()], h = [k.clone(), v.clone(), t.clone()]) : (k = t.clone(), k.lerpSelf(v, 0.5), j = [t.clone(), h.clone(), k.clone()], h = [k.clone(), h.clone(), v.clone()]), z[f].push(j, h))
        } else {
            w.push(e);
            for (f = 0, g = a.faceVertexUvs.length; f < g; f++) z[f].push(a.faceVertexUvs[f])
        } else if (f = e.a, g = e.b, h = e.c, l = e.d, j = a.vertices[f], k = a.vertices[g], p = a.vertices[h], m = a.vertices[l], o = j.position.distanceTo(k.position), r = k.position.distanceTo(p.position), n = p.position.distanceTo(m.position), q = j.position.distanceTo(m.position), o > b || r > b || n > b || q > b) {
            s = a.vertices.length;
            u = a.vertices.length + 1;
            v = e.clone();
            t = e.clone();
            o >= r && o >= n && o >= q || n >= r && n >= o && n >= q ? (o = j.clone(), o.position.lerpSelf(k.position, 0.5), k = p.clone(), k.position.lerpSelf(m.position, 0.5), v.a = f, v.b = s, v.c = u, v.d = l, t.a = s, t.b = g, t.c = h, t.d = u, 4 === e.vertexNormals.length && (f = e.vertexNormals[0].clone(), f.lerpSelf(e.vertexNormals[1], 0.5), g = e.vertexNormals[2].clone(), g.lerpSelf(e.vertexNormals[3], 0.5), v.vertexNormals[1].copy(f), v.vertexNormals[2].copy(g), t.vertexNormals[0].copy(f), t.vertexNormals[3].copy(g)), 4 === e.vertexColors.length && (f = e.vertexColors[0].clone(), f.lerpSelf(e.vertexColors[1], 0.5), g = e.vertexColors[2].clone(), g.lerpSelf(e.vertexColors[3], 0.5), v.vertexColors[1].copy(f), v.vertexColors[2].copy(g), t.vertexColors[0].copy(f), t.vertexColors[3].copy(g)), e = 0) : (o = k.clone(), o.position.lerpSelf(p.position, 0.5), k = m.clone(), k.position.lerpSelf(j.position, 0.5), v.a = f, v.b = g, v.c = s, v.d = u, t.a = u, t.b = s, t.c = h, t.d = l, 4 === e.vertexNormals.length && (f = e.vertexNormals[1].clone(), f.lerpSelf(e.vertexNormals[2], 0.5), g = e.vertexNormals[3].clone(), g.lerpSelf(e.vertexNormals[0], 0.5), v.vertexNormals[2].copy(f), v.vertexNormals[3].copy(g), t.vertexNormals[0].copy(g), t.vertexNormals[1].copy(f)), 4 === e.vertexColors.length && (f = e.vertexColors[1].clone(), f.lerpSelf(e.vertexColors[2], 0.5), g = e.vertexColors[3].clone(), g.lerpSelf(e.vertexColors[0], 0.5), v.vertexColors[2].copy(f), v.vertexColors[3].copy(g), t.vertexColors[0].copy(g), t.vertexColors[1].copy(f)), e = 1);
            w.push(v, t);
            a.vertices.push(o, k);
            for (f = 0, g = a.faceVertexUvs.length; f < g; f++) a.faceVertexUvs[f].length && (j = a.faceVertexUvs[f][c], t = j[0], h = j[1], v = j[2], j = j[3], 0 === e ? (k = t.clone(), k.lerpSelf(h, 0.5), p = v.clone(), p.lerpSelf(j, 0.5), t = [t.clone(), k.clone(), p.clone(), j.clone()], h = [k.clone(), h.clone(), v.clone(), p.clone()]) : (k = h.clone(), k.lerpSelf(v, 0.5), p = j.clone(), p.lerpSelf(t, 0.5), t = [t.clone(), h.clone(), k.clone(), p.clone()], h = [p.clone(), k.clone(), v.clone(), j.clone()]), z[f].push(t, h))
        } else {
            w.push(e);
            for (f = 0, g = a.faceVertexUvs.length; f < g; f++) z[f].push(a.faceVertexUvs[f])
        }
        a.faces = w;
        a.faceVertexUvs = z
    }
};
THREE.GeometryUtils.random = THREE.Math.random16;
THREE.GeometryUtils.__v1 = new THREE.Vector3;
THREE.ImageUtils = {
    crossOrigin: "anonymous",
    loadTexture: function (a, b, c) {
        var d = new Image,
            e = new THREE.Texture(d, b);
        d.onload = function () {
            e.needsUpdate = !0;
            c && c(this)
        };
        d.crossOrigin = this.crossOrigin;
        d.src = a;
        return e
    },
    loadTextureCube: function (a, b, c) {
        var d, e = [],
            f = new THREE.Texture(e, b);
        e.loadCount = 0;
        for (b = 0, d = a.length; b < d; ++b) e[b] = new Image, e[b].onload = function () {
            e.loadCount += 1;
            if (6 === e.loadCount) f.needsUpdate = !0;
            c && c(this)
        }, e[b].crossOrigin = this.crossOrigin, e[b].src = a[b];
        return f
    },
    getNormalMap: function (a, b) {
        var c = function (a) {
                var b = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
                return [a[0] / b, a[1] / b, a[2] / b]
            },
            b = b | 1,
            d = a.width,
            e = a.height,
            f = document.createElement("canvas");
        f.width = d;
        f.height = e;
        var g = f.getContext("2d");
        g.drawImage(a, 0, 0);
        for (var h = g.getImageData(0, 0, d, e).data, l = g.createImageData(d, e), j = l.data, k = 0; k < d; k++) for (var p = 1; p < e; p++) {
            var m = 0 > p - 1 ? e - 1 : p - 1,
                o = (p + 1) % e,
                r = 0 > k - 1 ? d - 1 : k - 1,
                n = (k + 1) % d,
                q = [],
                s = [0, 0, h[4 * (p * d + k)] / 255 * b];
            q.push([-1, 0, h[4 * (p * d + r)] / 255 * b]);
            q.push([-1, -1, h[4 * (m * d + r)] / 255 * b]);
            q.push([0, -1, h[4 * (m * d + k)] / 255 * b]);
            q.push([1, -1, h[4 * (m * d + n)] / 255 * b]);
            q.push([1, 0, h[4 * (p * d + n)] / 255 * b]);
            q.push([1, 1, h[4 * (o * d + n)] / 255 * b]);
            q.push([0, 1, h[4 * (o * d + k)] / 255 * b]);
            q.push([-1, 1, h[4 * (o * d + r)] / 255 * b]);
            m = [];
            r = q.length;
            for (o = 0; o < r; o++) {
                var n = q[o],
                    u = q[(o + 1) % r],
                    n = [n[0] - s[0], n[1] - s[1], n[2] - s[2]],
                    u = [u[0] - s[0], u[1] - s[1], u[2] - s[2]];
                m.push(c([n[1] * u[2] - n[2] * u[1], n[2] * u[0] - n[0] * u[2], n[0] * u[1] - n[1] * u[0]]))
            }
            q = [0, 0, 0];
            for (o = 0; o < m.length; o++) q[0] += m[o][0], q[1] += m[o][1], q[2] += m[o][2];
            q[0] /= m.length;
            q[1] /= m.length;
            q[2] /= m.length;
            s = 4 * (p * d + k);
            j[s] = 255 * ((q[0] + 1) / 2) | 0;
            j[s + 1] = 255 * (q[1] + 0.5) | 0;
            j[s + 2] = 255 * q[2] | 0;
            j[s + 3] = 255
        }
        g.putImageData(l, 0, 0);
        return f
    },
    generateDataTexture: function (a, b, c) {
        for (var d = a * b, e = new Uint8Array(3 * d), f = Math.floor(255 * c.r), g = Math.floor(255 * c.g), c = Math.floor(255 * c.b), h = 0; h < d; h++) e[3 * h] = f, e[3 * h + 1] = g, e[3 * h + 2] = c;
        a = new THREE.DataTexture(e, a, b, THREE.RGBFormat);
        a.needsUpdate = !0;
        return a
    }
};
THREE.SceneUtils = {
    showHierarchy: function (a, b) {
        THREE.SceneUtils.traverseHierarchy(a, function (a) {
            a.visible = b
        })
    },
    traverseHierarchy: function (a, b) {
        var c, d, e = a.children.length;
        for (d = 0; d < e; d++) c = a.children[d], b(c), THREE.SceneUtils.traverseHierarchy(c, b)
    },
    createMultiMaterialObject: function (a, b) {
        var c, d = b.length,
            e = new THREE.Object3D;
        for (c = 0; c < d; c++) {
            var f = new THREE.Mesh(a, b[c]);
            e.add(f)
        }
        return e
    },
    cloneObject: function (a) {
        var b;
        a instanceof THREE.MorphAnimMesh ? (b = new THREE.MorphAnimMesh(a.geometry, a.material), b.duration = a.duration, b.mirroredLoop = a.mirroredLoop, b.time = a.time, b.lastKeyframe = a.lastKeyframe, b.currentKeyframe = a.currentKeyframe, b.direction = a.direction, b.directionBackwards = a.directionBackwards) : a instanceof THREE.SkinnedMesh ? b = new THREE.SkinnedMesh(a.geometry, a.material) : a instanceof THREE.Mesh ? b = new THREE.Mesh(a.geometry, a.material) : a instanceof THREE.Line ? b = new THREE.Line(a.geometry, a.material, a.type) : a instanceof THREE.Ribbon ? b = new THREE.Ribbon(a.geometry, a.material) : a instanceof THREE.ParticleSystem ? (b = new THREE.ParticleSystem(a.geometry, a.material), b.sortParticles = a.sortParticles) : a instanceof THREE.Particle ? b = new THREE.Particle(a.material) : a instanceof THREE.Sprite ? (b = new THREE.Sprite({}), b.color.copy(a.color), b.map = a.map, b.blending = a.blending, b.useScreenCoordinates = a.useScreenCoordinates, b.mergeWith3D = a.mergeWith3D, b.affectedByDistance = a.affectedByDistance, b.scaleByViewport = a.scaleByViewport, b.alignment = a.alignment, b.rotation3d.copy(a.rotation3d), b.rotation = a.rotation, b.opacity = a.opacity, b.uvOffset.copy(a.uvOffset), b.uvScale.copy(a.uvScale)) : a instanceof THREE.LOD ? b = new THREE.LOD : a instanceof THREE.MarchingCubes ? (b = new THREE.MarchingCubes(a.resolution, a.material), b.field.set(a.field), b.isolation = a.isolation) : a instanceof THREE.Object3D && (b = new THREE.Object3D);
        b.name = a.name;
        b.parent = a.parent;
        b.up.copy(a.up);
        b.position.copy(a.position);
        b.rotation instanceof THREE.Vector3 && b.rotation.copy(a.rotation);
        b.eulerOrder = a.eulerOrder;
        b.scale.copy(a.scale);
        b.dynamic = a.dynamic;
        b.doubleSided = a.doubleSided;
        b.flipSided = a.flipSided;
        b.renderDepth = a.renderDepth;
        b.rotationAutoUpdate = a.rotationAutoUpdate;
        b.matrix.copy(a.matrix);
        b.matrixWorld.copy(a.matrixWorld);
        b.matrixRotationWorld.copy(a.matrixRotationWorld);
        b.matrixAutoUpdate = a.matrixAutoUpdate;
        b.matrixWorldNeedsUpdate = a.matrixWorldNeedsUpdate;
        b.quaternion.copy(a.quaternion);
        b.useQuaternion = a.useQuaternion;
        b.boundRadius = a.boundRadius;
        b.boundRadiusScale = a.boundRadiusScale;
        b.visible = a.visible;
        b.castShadow = a.castShadow;
        b.receiveShadow = a.receiveShadow;
        b.frustumCulled = a.frustumCulled;
        for (var c = 0; c < a.children.length; c++) {
            var d = THREE.SceneUtils.cloneObject(a.children[c]);
            b.children[c] = d;
            d.parent = b
        }
        if (a instanceof THREE.LOD) for (c = 0; c < a.LODs.length; c++) b.LODs[c] = {
            visibleAtDistance: a.LODs[c].visibleAtDistance,
            object3D: b.children[c]
        };
        return b
    },
    detach: function (a, b, c) {
        a.applyMatrix(b.matrixWorld);
        b.remove(a);
        c.add(a)
    },
    attach: function (a, b, c) {
        var d = new THREE.Matrix4;
        d.getInverse(c.matrixWorld);
        a.applyMatrix(d);
        b.remove(a);
        c.add(a)
    }
};
if (THREE.WebGLRenderer) THREE.ShaderUtils = {
    lib: {
        fresnel: {
            uniforms: {
                mRefractionRatio: {
                    type: "f",
                    value: 1.02
                },
                mFresnelBias: {
                    type: "f",
                    value: 0.1
                },
                mFresnelPower: {
                    type: "f",
                    value: 2
                },
                mFresnelScale: {
                    type: "f",
                    value: 1
                },
                tCube: {
                    type: "t",
                    value: 1,
                    texture: null
                }
            },
            fragmentShader: "uniform samplerCube tCube;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\nvec4 refractedColor = vec4( 1.0, 1.0, 1.0, 1.0 );\nrefractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;\nrefractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;\nrefractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;\nrefractedColor.a = 1.0;\ngl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );\n}",
            vertexShader: "uniform float mRefractionRatio;\nuniform float mFresnelBias;\nuniform float mFresnelScale;\nuniform float mFresnelPower;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = normalize ( mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal );\nvec3 I = mPosition.xyz - cameraPosition;\nvReflect = reflect( I, nWorld );\nvRefract[0] = refract( normalize( I ), nWorld, mRefractionRatio );\nvRefract[1] = refract( normalize( I ), nWorld, mRefractionRatio * 0.99 );\nvRefract[2] = refract( normalize( I ), nWorld, mRefractionRatio * 0.98 );\nvReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), nWorld ), mFresnelPower );\ngl_Position = projectionMatrix * mvPosition;\n}"
        },
        normal: {
            uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap,
            {
                enableAO: {
                    type: "i",
                    value: 0
                },
                enableDiffuse: {
                    type: "i",
                    value: 0
                },
                enableSpecular: {
                    type: "i",
                    value: 0
                },
                enableReflection: {
                    type: "i",
                    value: 0
                },
                tDiffuse: {
                    type: "t",
                    value: 0,
                    texture: null
                },
                tCube: {
                    type: "t",
                    value: 1,
                    texture: null
                },
                tNormal: {
                    type: "t",
                    value: 2,
                    texture: null
                },
                tSpecular: {
                    type: "t",
                    value: 3,
                    texture: null
                },
                tAO: {
                    type: "t",
                    value: 4,
                    texture: null
                },
                tDisplacement: {
                    type: "t",
                    value: 5,
                    texture: null
                },
                uNormalScale: {
                    type: "f",
                    value: 1
                },
                uDisplacementBias: {
                    type: "f",
                    value: 0
                },
                uDisplacementScale: {
                    type: "f",
                    value: 1
                },
                uDiffuseColor: {
                    type: "c",
                    value: new THREE.Color(16777215)
                },
                uSpecularColor: {
                    type: "c",
                    value: new THREE.Color(1118481)
                },
                uAmbientColor: {
                    type: "c",
                    value: new THREE.Color(16777215)
                },
                uShininess: {
                    type: "f",
                    value: 30
                },
                uOpacity: {
                    type: "f",
                    value: 1
                },
                uReflectivity: {
                    type: "f",
                    value: 0.5
                },
                uOffset: {
                    type: "v2",
                    value: new THREE.Vector2(0, 0)
                },
                uRepeat: {
                    type: "v2",
                    value: new THREE.Vector2(1, 1)
                },
                wrapRGB: {
                    type: "v3",
                    value: new THREE.Vector3(1, 1, 1)
                }
            }]),
            fragmentShader: ["uniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform float uOpacity;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform bool enableReflection;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform samplerCube tCube;\nuniform float uNormalScale;\nuniform float uReflectivity;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vViewPosition;", THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3( 1.0 ), uOpacity );\nvec3 specularTex = vec3( 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse ) {\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( tDiffuse, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );\n#endif\n}\nif( enableAO ) {\n#ifdef GAMMA_INPUT\nvec4 aoColor = texture2D( tAO, vUv );\naoColor.xyz *= aoColor.xyz;\ngl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;\n#endif\n}\nif( enableSpecular )\nspecularTex = texture2D( tSpecular, vUv ).xyz;\nmat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );\nvec3 finalNormal = tsb * normalTex;\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec3 pointVector = normalize( vPointLight[ i ].xyz );\nfloat pointDistance = vPointLight[ i ].w;\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\n#endif\npointDiffuse += pointDistance * pointLightColor[ i ] * uDiffuseColor * pointDiffuseWeight;\nvec3 pointHalfVector = normalize( pointVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( pointVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;\n#else\npointSpecular += pointDistance * pointLightColor[ i ] * uSpecularColor * pointSpecularWeight * pointDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\n#ifdef WRAP_AROUND\nfloat directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );\nfloat directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\n#endif\ndirDiffuse += directionalLightColor[ i ] * uDiffuseColor * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += directionalLightColor[ i ] * uSpecularColor * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor) + totalSpecular;\nif ( enableReflection ) {\nvec3 wPos = cameraPosition - vViewPosition;\nvec3 vReflect = reflect( normalize( wPos ), normal );\nvec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * uReflectivity );\n}", THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n"),
            vertexShader: ["attribute vec4 tangent;\nuniform vec2 uOffset;\nuniform vec2 uRepeat;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\nvarying vec3 vViewPosition;", THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvViewPosition = -mvPosition.xyz;\nvNormal = normalMatrix * normal;\nvTangent = normalMatrix * tangent.xyz;\nvBinormal = cross( vNormal, vTangent ) * tangent.w;\nvUv = uv * uRepeat + uOffset;\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#ifdef VERTEX_TEXTURES\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\nvec4 displacedPosition = vec4( normalize( vNormal.xyz ) * df, 0.0 ) + mvPosition;\ngl_Position = projectionMatrix * displacedPosition;\n#else\ngl_Position = projectionMatrix * mvPosition;\n#endif", THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n")
        },
        cube: {
            uniforms: {
                tCube: {
                    type: "t",
                    value: 1,
                    texture: null
                },
                tFlip: {
                    type: "f",
                    value: -1
                }
            },
            vertexShader: "varying vec3 vViewPosition;\nvoid main() {\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvViewPosition = cameraPosition - mPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
            fragmentShader: "uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vViewPosition;\nvoid main() {\nvec3 wPos = cameraPosition - vViewPosition;\ngl_FragColor = textureCube( tCube, vec3( tFlip * wPos.x, wPos.yz ) );\n}"
        }
    }
};
THREE.BufferGeometry = function () {
    this.id = THREE.GeometryCount++;
    this.vertexColorArray = this.vertexUvArray = this.vertexNormalArray = this.vertexPositionArray = this.vertexIndexArray = this.vertexColorBuffer = this.vertexUvBuffer = this.vertexNormalBuffer = this.vertexPositionBuffer = this.vertexIndexBuffer = null;
    this.dynamic = !1;
    this.boundingSphere = this.boundingBox = null;
    this.morphTargets = []
};
THREE.BufferGeometry.prototype = {
    constructor: THREE.BufferGeometry,
    computeBoundingBox: function () {},
    computeBoundingSphere: function () {}
};
THREE.Curve = function () {};
THREE.Curve.prototype.getPoint = function () {
    console.log("Warning, getPoint() not implemented!");
    return null
};
THREE.Curve.prototype.getPointAt = function (a) {
    return this.getPoint(this.getUtoTmapping(a))
};
THREE.Curve.prototype.getPoints = function (a) {
    a || (a = 5);
    var b, c = [];
    for (b = 0; b <= a; b++) c.push(this.getPoint(b / a));
    return c
};
THREE.Curve.prototype.getSpacedPoints = function (a) {
    a || (a = 5);
    var b, c = [];
    for (b = 0; b <= a; b++) c.push(this.getPointAt(b / a));
    return c
};
THREE.Curve.prototype.getLength = function () {
    var a = this.getLengths();
    return a[a.length - 1]
};
THREE.Curve.prototype.getLengths = function (a) {
    a || (a = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200);
    if (this.cacheArcLengths && this.cacheArcLengths.length == a + 1 && !this.needsUpdate) return this.cacheArcLengths;
    this.needsUpdate = !1;
    var b = [],
        c, d = this.getPoint(0),
        e, f = 0;
    b.push(0);
    for (e = 1; e <= a; e++) c = this.getPoint(e / a), f += c.distanceTo(d), b.push(f), d = c;
    return this.cacheArcLengths = b
};
THREE.Curve.prototype.updateArcLengths = function () {
    this.needsUpdate = !0;
    this.getLengths()
};
THREE.Curve.prototype.getUtoTmapping = function (a, b) {
    var c = this.getLengths(),
        d = 0,
        e = c.length,
        f;
    f = b ? b : a * c[e - 1];
    for (var g = 0, h = e - 1, l; g <= h;) if (d = Math.floor(g + (h - g) / 2), l = c[d] - f, 0 > l) g = d + 1;
    else if (0 < l) h = d - 1;
    else {
        h = d;
        break
    }
    d = h;
    if (c[d] == f) return d / (e - 1);
    g = c[d];
    return c = (d + (f - g) / (c[d + 1] - g)) / (e - 1)
};
THREE.Curve.prototype.getNormalVector = function (a) {
    a = this.getTangent(a);
    return new THREE.Vector2(-a.y, a.x)
};
THREE.Curve.prototype.getTangent = function (a) {
    var b = a - 1.0E-4,
        a = a + 1.0E-4;
    0 > b && (b = 0);
    1 < a && (a = 1);
    b = this.getPoint(b);
    return this.getPoint(a).clone().subSelf(b).normalize()
};
THREE.Curve.prototype.getTangentAt = function (a) {
    return this.getTangent(this.getUtoTmapping(a))
};
THREE.LineCurve = function (a, b) {
    a instanceof THREE.Vector2 ? (this.v1 = a, this.v2 = b) : THREE.LineCurve.oldConstructor.apply(this, arguments)
};
THREE.LineCurve.oldConstructor = function (a, b, c, d) {
    this.constructor(new THREE.Vector2(a, b), new THREE.Vector2(c, d))
};
THREE.LineCurve.prototype = new THREE.Curve;
THREE.LineCurve.prototype.constructor = THREE.LineCurve;
THREE.LineCurve.prototype.getPoint = function (a) {
    var b = new THREE.Vector2;
    b.sub(this.v2, this.v1);
    b.multiplyScalar(a).addSelf(this.v1);
    return b
};
THREE.LineCurve.prototype.getPointAt = function (a) {
    return this.getPoint(a)
};
THREE.LineCurve.prototype.getTangent = function () {
    var a = new THREE.Vector2;
    a.sub(this.v2, this.v1);
    a.normalize();
    return a
};
THREE.QuadraticBezierCurve = function (a, b, c) {
    if (!(b instanceof THREE.Vector2)) var d = Array.prototype.slice.call(arguments),
        a = new THREE.Vector2(d[0], d[1]),
        b = new THREE.Vector2(d[2], d[3]),
        c = new THREE.Vector2(d[4], d[5]);
    this.v0 = a;
    this.v1 = b;
    this.v2 = c
};
THREE.QuadraticBezierCurve.prototype = new THREE.Curve;
THREE.QuadraticBezierCurve.prototype.constructor = THREE.QuadraticBezierCurve;
THREE.QuadraticBezierCurve.prototype.getPoint = function (a) {
    var b;
    b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x);
    a = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y);
    return new THREE.Vector2(b, a)
};
THREE.QuadraticBezierCurve.prototype.getTangent = function (a) {
    var b;
    b = THREE.Curve.Utils.tangentQuadraticBezier(a, this.v0.x, this.v1.x, this.v2.x);
    a = THREE.Curve.Utils.tangentQuadraticBezier(a, this.v0.y, this.v1.y, this.v2.y);
    b = new THREE.Vector2(b, a);
    b.normalize();
    return b
};
THREE.CubicBezierCurve = function (a, b, c, d) {
    if (!(b instanceof THREE.Vector2)) var e = Array.prototype.slice.call(arguments),
        a = new THREE.Vector2(e[0], e[1]),
        b = new THREE.Vector2(e[2], e[3]),
        c = new THREE.Vector2(e[4], e[5]),
        d = new THREE.Vector2(e[6], e[7]);
    this.v0 = a;
    this.v1 = b;
    this.v2 = c;
    this.v3 = d
};
THREE.CubicBezierCurve.prototype = new THREE.Curve;
THREE.CubicBezierCurve.prototype.constructor = THREE.CubicBezierCurve;
THREE.CubicBezierCurve.prototype.getPoint = function (a) {
    var b;
    b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
    a = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
    return new THREE.Vector2(b, a)
};
THREE.CubicBezierCurve.prototype.getTangent = function (a) {
    var b;
    b = THREE.Curve.Utils.tangentCubicBezier(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
    a = THREE.Curve.Utils.tangentCubicBezier(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
    b = new THREE.Vector2(b, a);
    b.normalize();
    return b
};
THREE.SplineCurve = function (a) {
    this.points = void 0 == a ? [] : a
};
THREE.SplineCurve.prototype = new THREE.Curve;
THREE.SplineCurve.prototype.constructor = THREE.SplineCurve;
THREE.SplineCurve.prototype.getPoint = function (a) {
    var b = new THREE.Vector2,
        c = [],
        d = this.points,
        e;
    e = (d.length - 1) * a;
    a = Math.floor(e);
    e -= a;
    c[0] = 0 == a ? a : a - 1;
    c[1] = a;
    c[2] = a > d.length - 2 ? d.length - 1 : a + 1;
    c[3] = a > d.length - 3 ? d.length - 1 : a + 2;
    b.x = THREE.Curve.Utils.interpolate(d[c[0]].x, d[c[1]].x, d[c[2]].x, d[c[3]].x, e);
    b.y = THREE.Curve.Utils.interpolate(d[c[0]].y, d[c[1]].y, d[c[2]].y, d[c[3]].y, e);
    return b
};
THREE.ArcCurve = function (a, b, c, d, e, f) {
    this.aX = a;
    this.aY = b;
    this.aRadius = c;
    this.aStartAngle = d;
    this.aEndAngle = e;
    this.aClockwise = f
};
THREE.ArcCurve.prototype = new THREE.Curve;
THREE.ArcCurve.prototype.constructor = THREE.ArcCurve;
THREE.ArcCurve.prototype.getPoint = function (a) {
    var b = this.aEndAngle - this.aStartAngle;
    this.aClockwise || (a = 1 - a);
    b = this.aStartAngle + a * b;
    a = this.aX + this.aRadius * Math.cos(b);
    b = this.aY + this.aRadius * Math.sin(b);
    return new THREE.Vector2(a, b)
};
THREE.Curve.Utils = {
    tangentQuadraticBezier: function (a, b, c, d) {
        return 2 * (1 - a) * (c - b) + 2 * a * (d - c)
    },
    tangentCubicBezier: function (a, b, c, d, e) {
        return -3 * b * (1 - a) * (1 - a) + 3 * c * (1 - a) * (1 - a) - 6 * a * c * (1 - a) + 6 * a * d * (1 - a) - 3 * a * a * d + 3 * a * a * e
    },
    tangentSpline: function (a) {
        return 6 * a * a - 6 * a + (3 * a * a - 4 * a + 1) + (-6 * a * a + 6 * a) + (3 * a * a - 2 * a)
    },
    interpolate: function (a, b, c, d, e) {
        var a = 0.5 * (c - a),
            d = 0.5 * (d - b),
            f = e * e;
        return (2 * b - 2 * c + a + d) * e * f + (-3 * b + 3 * c - 2 * a - d) * f + a * e + b
    }
};
THREE.Curve.create = function (a, b) {
    a.prototype = new THREE.Curve;
    a.prototype.constructor = a;
    a.prototype.getPoint = b;
    return a
};
THREE.LineCurve3 = THREE.Curve.create(function (a, b) {
    this.v1 = a;
    this.v2 = b
}, function (a) {
    var b = new THREE.Vector3;
    b.sub(this.v2, this.v1);
    b.multiplyScalar(a);
    b.addSelf(this.v1);
    return b
});
THREE.QuadraticBezierCurve3 = THREE.Curve.create(function (a, b, c) {
    this.v0 = a;
    this.v1 = b;
    this.v2 = c
}, function (a) {
    var b, c;
    b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x);
    c = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y);
    a = THREE.Shape.Utils.b2(a, this.v0.z, this.v1.z, this.v2.z);
    return new THREE.Vector3(b, c, a)
});
THREE.CubicBezierCurve3 = THREE.Curve.create(function (a, b, c, d) {
    this.v0 = a;
    this.v1 = b;
    this.v2 = c;
    this.v3 = d
}, function (a) {
    var b, c;
    b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
    c = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
    a = THREE.Shape.Utils.b3(a, this.v0.z, this.v1.z, this.v2.z, this.v3.z);
    return new THREE.Vector3(b, c, a)
});
THREE.SplineCurve3 = THREE.Curve.create(function (a) {
    this.points = void 0 == a ? [] : a
}, function (a) {
    var b = new THREE.Vector3,
        c = [],
        d = this.points,
        e, a = (d.length - 1) * a;
    e = Math.floor(a);
    a -= e;
    c[0] = 0 == e ? e : e - 1;
    c[1] = e;
    c[2] = e > d.length - 2 ? d.length - 1 : e + 1;
    c[3] = e > d.length - 3 ? d.length - 1 : e + 2;
    e = d[c[0]];
    var f = d[c[1]],
        g = d[c[2]],
        c = d[c[3]];
    b.x = THREE.Curve.Utils.interpolate(e.x, f.x, g.x, c.x, a);
    b.y = THREE.Curve.Utils.interpolate(e.y, f.y, g.y, c.y, a);
    b.z = THREE.Curve.Utils.interpolate(e.z, f.z, g.z, c.z, a);
    return b
});
THREE.ClosedSplineCurve3 = THREE.Curve.create(function (a) {
    this.points = void 0 == a ? [] : a
}, function (a) {
    var b = new THREE.Vector3,
        c = [],
        d = this.points,
        e;
    e = (d.length - 0) * a;
    a = Math.floor(e);
    e -= a;
    a += 0 < a ? 0 : (Math.floor(Math.abs(a) / d.length) + 1) * d.length;
    c[0] = (a - 1) % d.length;
    c[1] = a % d.length;
    c[2] = (a + 1) % d.length;
    c[3] = (a + 2) % d.length;
    b.x = THREE.Curve.Utils.interpolate(d[c[0]].x, d[c[1]].x, d[c[2]].x, d[c[3]].x, e);
    b.y = THREE.Curve.Utils.interpolate(d[c[0]].y, d[c[1]].y, d[c[2]].y, d[c[3]].y, e);
    b.z = THREE.Curve.Utils.interpolate(d[c[0]].z, d[c[1]].z, d[c[2]].z, d[c[3]].z, e);
    return b
});
THREE.CurvePath = function () {
    this.curves = [];
    this.bends = [];
    this.autoClose = !1
};
THREE.CurvePath.prototype = new THREE.Curve;
THREE.CurvePath.prototype.constructor = THREE.CurvePath;
THREE.CurvePath.prototype.add = function (a) {
    this.curves.push(a)
};
THREE.CurvePath.prototype.checkConnection = function () {};
THREE.CurvePath.prototype.closePath = function () {
    var a = this.curves[0].getPoint(0),
        b = this.curves[this.curves.length - 1].getPoint(1);
    a.equals(b) || this.curves.push(new THREE.LineCurve(b, a))
};
THREE.CurvePath.prototype.getPoint = function (a) {
    for (var b = a * this.getLength(), c = this.getCurveLengths(), a = 0; a < c.length;) {
        if (c[a] >= b) return b = c[a] - b, a = this.curves[a], b = 1 - b / a.getLength(), a.getPointAt(b);
        a++
    }
    return null
};
THREE.CurvePath.prototype.getLength = function () {
    var a = this.getCurveLengths();
    return a[a.length - 1]
};
THREE.CurvePath.prototype.getCurveLengths = function () {
    if (this.cacheLengths && this.cacheLengths.length == this.curves.length) return this.cacheLengths;
    var a = [],
        b = 0,
        c, d = this.curves.length;
    for (c = 0; c < d; c++) b += this.curves[c].getLength(), a.push(b);
    return this.cacheLengths = a
};
THREE.CurvePath.prototype.getBoundingBox = function () {
    var a = this.getPoints(),
        b, c, d, e;
    b = c = Number.NEGATIVE_INFINITY;
    d = e = Number.POSITIVE_INFINITY;
    var f, g, h, l;
    l = new THREE.Vector2;
    for (g = 0, h = a.length; g < h; g++) {
        f = a[g];
        if (f.x > b) b = f.x;
        else if (f.x < d) d = f.x;
        if (f.y > c) c = f.y;
        else if (f.y < c) e = f.y;
        l.addSelf(f.x, f.y)
    }
    return {
        minX: d,
        minY: e,
        maxX: b,
        maxY: c,
        centroid: l.divideScalar(h)
    }
};
THREE.CurvePath.prototype.createPointsGeometry = function (a) {
    return this.createGeometry(this.getPoints(a, !0))
};
THREE.CurvePath.prototype.createSpacedPointsGeometry = function (a) {
    return this.createGeometry(this.getSpacedPoints(a, !0))
};
THREE.CurvePath.prototype.createGeometry = function (a) {
    for (var b = new THREE.Geometry, c = 0; c < a.length; c++) b.vertices.push(new THREE.Vertex(new THREE.Vector3(a[c].x, a[c].y, 0)));
    return b
};
THREE.CurvePath.prototype.addWrapPath = function (a) {
    this.bends.push(a)
};
THREE.CurvePath.prototype.getTransformedPoints = function (a, b) {
    var c = this.getPoints(a),
        d, e;
    if (!b) b = this.bends;
    for (d = 0, e = b.length; d < e; d++) c = this.getWrapPoints(c, b[d]);
    return c
};
THREE.CurvePath.prototype.getTransformedSpacedPoints = function (a, b) {
    var c = this.getSpacedPoints(a),
        d, e;
    if (!b) b = this.bends;
    for (d = 0, e = b.length; d < e; d++) c = this.getWrapPoints(c, b[d]);
    return c
};
THREE.CurvePath.prototype.getWrapPoints = function (a, b) {
    var c = this.getBoundingBox(),
        d, e, f, g, h, l;
    for (d = 0, e = a.length; d < e; d++) f = a[d], g = f.x, h = f.y, l = g / c.maxX, l = b.getUtoTmapping(l, g), g = b.getPoint(l), h = b.getNormalVector(l).multiplyScalar(h), f.x = g.x + h.x, f.y = g.y + h.y;
    return a
};
THREE.EventTarget = function () {
    var a = {};
    this.addEventListener = function (b, c) {
        void 0 == a[b] && (a[b] = []); - 1 === a[b].indexOf(c) && a[b].push(c)
    };
    this.dispatchEvent = function (b) {
        for (var c in a[b.type]) a[b.type][c](b)
    };
    this.removeEventListener = function (b, c) {
        var d = a[b].indexOf(c); - 1 !== d && a[b].splice(d, 1)
    }
};
THREE.Gyroscope = function () {
    THREE.Object3D.call(this)
};
THREE.Gyroscope.prototype = new THREE.Object3D;
THREE.Gyroscope.prototype.constructor = THREE.Gyroscope;
THREE.Gyroscope.prototype.updateMatrixWorld = function (a) {
    this.matrixAutoUpdate && this.updateMatrix();
    if (this.matrixWorldNeedsUpdate || a) this.parent ? (this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix), this.matrixWorld.decompose(this.translationWorld, this.rotationWorld, this.scaleWorld), this.matrix.decompose(this.translationObject, this.rotationObject, this.scaleObject), this.matrixWorld.compose(this.translationWorld, this.rotationObject, this.scaleWorld)) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, a = !0;
    for (var b = 0, c = this.children.length; b < c; b++) this.children[b].updateMatrixWorld(a)
};
THREE.Gyroscope.prototype.translationWorld = new THREE.Vector3;
THREE.Gyroscope.prototype.translationObject = new THREE.Vector3;
THREE.Gyroscope.prototype.rotationWorld = new THREE.Quaternion;
THREE.Gyroscope.prototype.rotationObject = new THREE.Quaternion;
THREE.Gyroscope.prototype.scaleWorld = new THREE.Vector3;
THREE.Gyroscope.prototype.scaleObject = new THREE.Vector3;
THREE.Path = function (a) {
    THREE.CurvePath.call(this);
    this.actions = [];
    a && this.fromPoints(a)
};
THREE.Path.prototype = new THREE.CurvePath;
THREE.Path.prototype.constructor = THREE.Path;
THREE.PathActions = {
    MOVE_TO: "moveTo",
    LINE_TO: "lineTo",
    QUADRATIC_CURVE_TO: "quadraticCurveTo",
    BEZIER_CURVE_TO: "bezierCurveTo",
    CSPLINE_THRU: "splineThru",
    ARC: "arc"
};
THREE.Path.prototype.fromPoints = function (a) {
    this.moveTo(a[0].x, a[0].y);
    for (var b = 1, c = a.length; b < c; b++) this.lineTo(a[b].x, a[b].y)
};
THREE.Path.prototype.moveTo = function (a, b) {
    var c = Array.prototype.slice.call(arguments);
    this.actions.push({
        action: THREE.PathActions.MOVE_TO,
        args: c
    })
};
THREE.Path.prototype.lineTo = function (a, b) {
    var c = Array.prototype.slice.call(arguments),
        d = this.actions[this.actions.length - 1].args;
    this.curves.push(new THREE.LineCurve(new THREE.Vector2(d[d.length - 2], d[d.length - 1]), new THREE.Vector2(a, b)));
    this.actions.push({
        action: THREE.PathActions.LINE_TO,
        args: c
    })
};
THREE.Path.prototype.quadraticCurveTo = function (a, b, c, d) {
    var e = Array.prototype.slice.call(arguments),
        f = this.actions[this.actions.length - 1].args;
    this.curves.push(new THREE.QuadraticBezierCurve(new THREE.Vector2(f[f.length - 2], f[f.length - 1]), new THREE.Vector2(a, b), new THREE.Vector2(c, d)));
    this.actions.push({
        action: THREE.PathActions.QUADRATIC_CURVE_TO,
        args: e
    })
};
THREE.Path.prototype.bezierCurveTo = function (a, b, c, d, e, f) {
    var g = Array.prototype.slice.call(arguments),
        h = this.actions[this.actions.length - 1].args;
    this.curves.push(new THREE.CubicBezierCurve(new THREE.Vector2(h[h.length - 2], h[h.length - 1]), new THREE.Vector2(a, b), new THREE.Vector2(c, d), new THREE.Vector2(e, f)));
    this.actions.push({
        action: THREE.PathActions.BEZIER_CURVE_TO,
        args: g
    })
};
THREE.Path.prototype.splineThru = function (a) {
    var b = Array.prototype.slice.call(arguments),
        c = this.actions[this.actions.length - 1].args,
        c = [new THREE.Vector2(c[c.length - 2], c[c.length - 1])];
    Array.prototype.push.apply(c, a);
    this.curves.push(new THREE.SplineCurve(c));
    this.actions.push({
        action: THREE.PathActions.CSPLINE_THRU,
        args: b
    })
};
THREE.Path.prototype.arc = function (a, b, c, d, e, f) {
    var g = Array.prototype.slice.call(arguments),
        h = this.actions[this.actions.length - 1],
        h = new THREE.ArcCurve(h.x + a, h.y + b, c, d, e, f);
    this.curves.push(h);
    h = h.getPoint(f ? 1 : 0);
    g.push(h.x);
    g.push(h.y);
    this.actions.push({
        action: THREE.PathActions.ARC,
        args: g
    })
};
THREE.Path.prototype.absarc = function (a, b, c, d, e, f) {
    var g = Array.prototype.slice.call(arguments),
        h = new THREE.ArcCurve(a, b, c, d, e, f);
    this.curves.push(h);
    h = h.getPoint(f ? 1 : 0);
    g.push(h.x);
    g.push(h.y);
    this.actions.push({
        action: THREE.PathActions.ARC,
        args: g
    })
};
THREE.Path.prototype.getSpacedPoints = function (a) {
    a || (a = 40);
    for (var b = [], c = 0; c < a; c++) b.push(this.getPoint(c / a));
    return b
};
THREE.Path.prototype.getPoints = function (a, b) {
    if (this.useSpacedPoints) return console.log("tata"), this.getSpacedPoints(a, b);
    var a = a || 12,
        c = [],
        d, e, f, g, h, l, j, k, p, m, o, r, n;
    for (d = 0, e = this.actions.length; d < e; d++) switch (f = this.actions[d], g = f.action, f = f.args, g) {
    case THREE.PathActions.MOVE_TO:
        c.push(new THREE.Vector2(f[0], f[1]));
        break;
    case THREE.PathActions.LINE_TO:
        c.push(new THREE.Vector2(f[0], f[1]));
        break;
    case THREE.PathActions.QUADRATIC_CURVE_TO:
        h = f[2];
        l = f[3];
        p = f[0];
        m = f[1];
        0 < c.length ? (g = c[c.length - 1], o = g.x, r = g.y) : (g = this.actions[d - 1].args, o = g[g.length - 2], r = g[g.length - 1]);
        for (f = 1; f <= a; f++) n = f / a, g = THREE.Shape.Utils.b2(n, o, p, h), n = THREE.Shape.Utils.b2(n, r, m, l), c.push(new THREE.Vector2(g, n));
        break;
    case THREE.PathActions.BEZIER_CURVE_TO:
        h = f[4];
        l = f[5];
        p = f[0];
        m = f[1];
        j = f[2];
        k = f[3];
        0 < c.length ? (g = c[c.length - 1], o = g.x, r = g.y) : (g = this.actions[d - 1].args, o = g[g.length - 2], r = g[g.length - 1]);
        for (f = 1; f <= a; f++) n = f / a, g = THREE.Shape.Utils.b3(n, o, p, j, h), n = THREE.Shape.Utils.b3(n, r, m, k, l), c.push(new THREE.Vector2(g, n));
        break;
    case THREE.PathActions.CSPLINE_THRU:
        g = this.actions[d - 1].args;
        n = [new THREE.Vector2(g[g.length - 2], g[g.length - 1])];
        g = a * f[0].length;
        n = n.concat(f[0]);
        n = new THREE.SplineCurve(n);
        for (f = 1; f <= g; f++) c.push(n.getPointAt(f / g));
        break;
    case THREE.PathActions.ARC:
        h = f[0];
        l = f[1];
        j = f[2];
        p = f[3];
        m = !! f[5];
        k = f[4] - p;
        o = 2 * a;
        for (f = 1; f <= o; f++) n = f / o, m || (n = 1 - n), n = p + n * k, g = h + j * Math.cos(n), n = l + j * Math.sin(n), c.push(new THREE.Vector2(g, n))
    }
    d = c[c.length - 1];
    1.0E-10 > Math.abs(d.x - c[0].x) && 1.0E-10 > Math.abs(d.y - c[0].y) && c.splice(c.length - 1, 1);
    b && c.push(c[0]);
    return c
};
THREE.Path.prototype.transform = function (a, b) {
    this.getBoundingBox();
    return this.getWrapPoints(this.getPoints(b), a)
};
THREE.Path.prototype.nltransform = function (a, b, c, d, e, f) {
    var g = this.getPoints(),
        h, l, j, k, p;
    for (h = 0, l = g.length; h < l; h++) j = g[h], k = j.x, p = j.y, j.x = a * k + b * p + c, j.y = d * p + e * k + f;
    return g
};
THREE.Path.prototype.debug = function (a) {
    var b = this.getBoundingBox();
    a || (a = document.createElement("canvas"), a.setAttribute("width", b.maxX + 100), a.setAttribute("height", b.maxY + 100), document.body.appendChild(a));
    b = a.getContext("2d");
    b.fillStyle = "white";
    b.fillRect(0, 0, a.width, a.height);
    b.strokeStyle = "black";
    b.beginPath();
    var c, d, e;
    for (a = 0, c = this.actions.length; a < c; a++) d = this.actions[a], e = d.args, d = d.action, d != THREE.PathActions.CSPLINE_THRU && b[d].apply(b, e);
    b.stroke();
    b.closePath();
    b.strokeStyle = "red";
    d = this.getPoints();
    for (a = 0, c = d.length; a < c; a++) e = d[a], b.beginPath(), b.arc(e.x, e.y, 1.5, 0, 2 * Math.PI, !1), b.stroke(), b.closePath()
};
THREE.Path.prototype.toShapes = function () {
    var a, b, c, d, e = [],
        f = new THREE.Path;
    for (a = 0, b = this.actions.length; a < b; a++) c = this.actions[a], d = c.args, c = c.action, c == THREE.PathActions.MOVE_TO && 0 != f.actions.length && (e.push(f), f = new THREE.Path), f[c].apply(f, d);
    0 != f.actions.length && e.push(f);
    if (0 == e.length) return [];
    var g;
    d = [];
    a = !THREE.Shape.Utils.isClockWise(e[0].getPoints());
    if (1 == e.length) return f = e[0], g = new THREE.Shape, g.actions = f.actions, g.curves = f.curves, d.push(g), d;
    if (a) {
        g = new THREE.Shape;
        for (a = 0, b = e.length; a < b; a++) f = e[a], THREE.Shape.Utils.isClockWise(f.getPoints()) ? (g.actions = f.actions, g.curves = f.curves, d.push(g), g = new THREE.Shape) : g.holes.push(f)
    } else {
        for (a = 0, b = e.length; a < b; a++) f = e[a], THREE.Shape.Utils.isClockWise(f.getPoints()) ? (g && d.push(g), g = new THREE.Shape, g.actions = f.actions, g.curves = f.curves) : g.holes.push(f);
        d.push(g)
    }
    return d
};
THREE.Shape = function () {
    THREE.Path.apply(this, arguments);
    this.holes = []
};
THREE.Shape.prototype = new THREE.Path;
THREE.Shape.prototype.constructor = THREE.Path;
THREE.Shape.prototype.extrude = function (a) {
    return new THREE.ExtrudeGeometry(this, a)
};
THREE.Shape.prototype.getPointsHoles = function (a) {
    var b, c = this.holes.length,
        d = [];
    for (b = 0; b < c; b++) d[b] = this.holes[b].getTransformedPoints(a, this.bends);
    return d
};
THREE.Shape.prototype.getSpacedPointsHoles = function (a) {
    var b, c = this.holes.length,
        d = [];
    for (b = 0; b < c; b++) d[b] = this.holes[b].getTransformedSpacedPoints(a, this.bends);
    return d
};
THREE.Shape.prototype.extractAllPoints = function (a) {
    return {
        shape: this.getTransformedPoints(a),
        holes: this.getPointsHoles(a)
    }
};
THREE.Shape.prototype.extractPoints = function (a) {
    return this.useSpacedPoints ? this.extractAllSpacedPoints(a) : this.extractAllPoints(a)
};
THREE.Shape.prototype.extractAllSpacedPoints = function (a) {
    return {
        shape: this.getTransformedSpacedPoints(a),
        holes: this.getSpacedPointsHoles(a)
    }
};
THREE.Shape.Utils = {
    removeHoles: function (a, b) {
        var c = a.concat(),
            d = c.concat(),
            e, f, g, h, l, j, k, p, m, o, r = [];
        for (l = 0; l < b.length; l++) {
            j = b[l];
            Array.prototype.push.apply(d, j);
            f = Number.POSITIVE_INFINITY;
            for (e = 0; e < j.length; e++) {
                m = j[e];
                o = [];
                for (p = 0; p < c.length; p++) k = c[p], k = m.distanceToSquared(k), o.push(k), k < f && (f = k, g = e, h = p)
            }
            e = 0 <= h - 1 ? h - 1 : c.length - 1;
            f = 0 <= g - 1 ? g - 1 : j.length - 1;
            var n = [j[g], c[h], c[e]];
            p = THREE.FontUtils.Triangulate.area(n);
            var q = [j[g], j[f], c[h]];
            m = THREE.FontUtils.Triangulate.area(q);
            o = h;
            k = g;
            h += 1;
            g += -1;
            0 > h && (h += c.length);
            h %= c.length;
            0 > g && (g += j.length);
            g %= j.length;
            e = 0 <= h - 1 ? h - 1 : c.length - 1;
            f = 0 <= g - 1 ? g - 1 : j.length - 1;
            n = [j[g], c[h], c[e]];
            n = THREE.FontUtils.Triangulate.area(n);
            q = [j[g], j[f], c[h]];
            q = THREE.FontUtils.Triangulate.area(q);
            p + m > n + q && (h = o, g = k, 0 > h && (h += c.length), h %= c.length, 0 > g && (g += j.length), g %= j.length, e = 0 <= h - 1 ? h - 1 : c.length - 1, f = 0 <= g - 1 ? g - 1 : j.length - 1);
            p = c.slice(0, h);
            m = c.slice(h);
            o = j.slice(g);
            k = j.slice(0, g);
            f = [j[g], j[f], c[h]];
            r.push([j[g], c[h], c[e]]);
            r.push(f);
            c = p.concat(o).concat(k).concat(m)
        }
        return {
            shape: c,
            isolatedPts: r,
            allpoints: d
        }
    },
    triangulateShape: function (a, b) {
        var c = THREE.Shape.Utils.removeHoles(a, b),
            d = c.allpoints,
            e = c.isolatedPts,
            c = THREE.FontUtils.Triangulate(c.shape, !1),
            f, g, h, l, j = {};
        for (f = 0, g = d.length; f < g; f++) l = d[f].x + ":" + d[f].y, void 0 !== j[l] && console.log("Duplicate point", l), j[l] = f;
        for (f = 0, g = c.length; f < g; f++) {
            h = c[f];
            for (d = 0; 3 > d; d++) l = h[d].x + ":" + h[d].y, l = j[l], void 0 !== l && (h[d] = l)
        }
        for (f = 0, g = e.length; f < g; f++) {
            h = e[f];
            for (d = 0; 3 > d; d++) l = h[d].x + ":" + h[d].y, l = j[l], void 0 !== l && (h[d] = l)
        }
        return c.concat(e)
    },
    isClockWise: function (a) {
        return 0 > THREE.FontUtils.Triangulate.area(a)
    },
    b2p0: function (a, b) {
        var c = 1 - a;
        return c * c * b
    },
    b2p1: function (a, b) {
        return 2 * (1 - a) * a * b
    },
    b2p2: function (a, b) {
        return a * a * b
    },
    b2: function (a, b, c, d) {
        return this.b2p0(a, b) + this.b2p1(a, c) + this.b2p2(a, d)
    },
    b3p0: function (a, b) {
        var c = 1 - a;
        return c * c * c * b
    },
    b3p1: function (a, b) {
        var c = 1 - a;
        return 3 * c * c * a * b
    },
    b3p2: function (a, b) {
        return 3 * (1 - a) * a * a * b
    },
    b3p3: function (a, b) {
        return a * a * a * b
    },
    b3: function (a, b, c, d, e) {
        return this.b3p0(a, b) + this.b3p1(a, c) + this.b3p2(a, d) + this.b3p3(a, e)
    }
};
THREE.TextPath = function (a, b) {
    THREE.Path.call(this);
    this.parameters = b || {};
    this.set(a)
};
THREE.TextPath.prototype.set = function (a, b) {
    b = b || this.parameters;
    this.text = a;
    var c = void 0 !== b.curveSegments ? b.curveSegments : 4,
        d = void 0 !== b.font ? b.font : "helvetiker",
        e = void 0 !== b.weight ? b.weight : "normal",
        f = void 0 !== b.style ? b.style : "normal";
    THREE.FontUtils.size = void 0 !== b.size ? b.size : 100;
    THREE.FontUtils.divisions = c;
    THREE.FontUtils.face = d;
    THREE.FontUtils.weight = e;
    THREE.FontUtils.style = f
};
THREE.TextPath.prototype.toShapes = function () {
    for (var a = THREE.FontUtils.drawText(this.text).paths, b = [], c = 0, d = a.length; c < d; c++) Array.prototype.push.apply(b, a[c].toShapes());
    return b
};
THREE.AnimationHandler = function () {
    var a = [],
        b = {},
        c = {
            update: function (b) {
                for (var c = 0; c < a.length; c++) a[c].update(b)
            },
            addToUpdate: function (b) {
                -1 === a.indexOf(b) && a.push(b)
            },
            removeFromUpdate: function (b) {
                b = a.indexOf(b); - 1 !== b && a.splice(b, 1)
            },
            add: function (a) {
                void 0 !== b[a.name] && console.log("THREE.AnimationHandler.add: Warning! " + a.name + " already exists in library. Overwriting.");
                b[a.name] = a;
                if (!0 !== a.initialized) {
                    for (var c = 0; c < a.hierarchy.length; c++) {
                        for (var d = 0; d < a.hierarchy[c].keys.length; d++) {
                            if (0 > a.hierarchy[c].keys[d].time) a.hierarchy[c].keys[d].time = 0;
                            if (void 0 !== a.hierarchy[c].keys[d].rot && !(a.hierarchy[c].keys[d].rot instanceof THREE.Quaternion)) {
                                var h = a.hierarchy[c].keys[d].rot;
                                a.hierarchy[c].keys[d].rot = new THREE.Quaternion(h[0], h[1], h[2], h[3])
                            }
                        }
                        if (a.hierarchy[c].keys.length && void 0 !== a.hierarchy[c].keys[0].morphTargets) {
                            h = {};
                            for (d = 0; d < a.hierarchy[c].keys.length; d++) for (var l = 0; l < a.hierarchy[c].keys[d].morphTargets.length; l++) {
                                var j = a.hierarchy[c].keys[d].morphTargets[l];
                                h[j] = -1
                            }
                            a.hierarchy[c].usedMorphTargets = h;
                            for (d = 0; d < a.hierarchy[c].keys.length; d++) {
                                var k = {};
                                for (j in h) {
                                    for (l = 0; l < a.hierarchy[c].keys[d].morphTargets.length; l++) if (a.hierarchy[c].keys[d].morphTargets[l] === j) {
                                        k[j] = a.hierarchy[c].keys[d].morphTargetsInfluences[l];
                                        break
                                    }
                                    l === a.hierarchy[c].keys[d].morphTargets.length && (k[j] = 0)
                                }
                                a.hierarchy[c].keys[d].morphTargetsInfluences = k
                            }
                        }
                        for (d = 1; d < a.hierarchy[c].keys.length; d++) a.hierarchy[c].keys[d].time === a.hierarchy[c].keys[d - 1].time && (a.hierarchy[c].keys.splice(d, 1), d--);
                        for (d = 0; d < a.hierarchy[c].keys.length; d++) a.hierarchy[c].keys[d].index = d
                    }
                    d = parseInt(a.length * a.fps, 10);
                    a.JIT = {};
                    a.JIT.hierarchy = [];
                    for (c = 0; c < a.hierarchy.length; c++) a.JIT.hierarchy.push(Array(d));
                    a.initialized = !0
                }
            },
            get: function (a) {
                if ("string" === typeof a) {
                    if (b[a]) return b[a];
                    console.log("THREE.AnimationHandler.get: Couldn't find animation " + a);
                    return null
                }
            },
            parse: function (a) {
                var b = [];
                if (a instanceof THREE.SkinnedMesh) for (var c = 0; c < a.bones.length; c++) b.push(a.bones[c]);
                else d(a, b);
                return b
            }
        },
        d = function (a, b) {
            b.push(a);
            for (var c = 0; c < a.children.length; c++) d(a.children[c], b)
        };
    c.LINEAR = 0;
    c.CATMULLROM = 1;
    c.CATMULLROM_FORWARD = 2;
    return c
}();
THREE.Animation = function (a, b, c, d) {
    this.root = a;
    this.data = THREE.AnimationHandler.get(b);
    this.hierarchy = THREE.AnimationHandler.parse(a);
    this.currentTime = 0;
    this.timeScale = 1;
    this.isPlaying = !1;
    this.loop = this.isPaused = !0;
    this.interpolationType = void 0 !== c ? c : THREE.AnimationHandler.LINEAR;
    this.JITCompile = void 0 !== d ? d : !0;
    this.points = [];
    this.target = new THREE.Vector3
};
THREE.Animation.prototype.play = function (a, b) {
    if (!this.isPlaying) {
        this.isPlaying = !0;
        this.loop = void 0 !== a ? a : !0;
        this.currentTime = void 0 !== b ? b : 0;
        var c, d = this.hierarchy.length,
            e;
        for (c = 0; c < d; c++) {
            e = this.hierarchy[c];
            if (this.interpolationType !== THREE.AnimationHandler.CATMULLROM_FORWARD) e.useQuaternion = !0;
            e.matrixAutoUpdate = !0;
            if (void 0 === e.animationCache) e.animationCache = {}, e.animationCache.prevKey = {
                pos: 0,
                rot: 0,
                scl: 0
            }, e.animationCache.nextKey = {
                pos: 0,
                rot: 0,
                scl: 0
            }, e.animationCache.originalMatrix = e instanceof
            THREE.Bone ? e.skinMatrix : e.matrix;
            var f = e.animationCache.prevKey;
            e = e.animationCache.nextKey;
            f.pos = this.data.hierarchy[c].keys[0];
            f.rot = this.data.hierarchy[c].keys[0];
            f.scl = this.data.hierarchy[c].keys[0];
            e.pos = this.getNextKeyWith("pos", c, 1);
            e.rot = this.getNextKeyWith("rot", c, 1);
            e.scl = this.getNextKeyWith("scl", c, 1)
        }
        this.update(0)
    }
    this.isPaused = !1;
    THREE.AnimationHandler.addToUpdate(this)
};
THREE.Animation.prototype.pause = function () {
    this.isPaused ? THREE.AnimationHandler.addToUpdate(this) : THREE.AnimationHandler.removeFromUpdate(this);
    this.isPaused = !this.isPaused
};
THREE.Animation.prototype.stop = function () {
    this.isPaused = this.isPlaying = !1;
    THREE.AnimationHandler.removeFromUpdate(this);
    for (var a = 0; a < this.hierarchy.length; a++) if (void 0 !== this.hierarchy[a].animationCache) this.hierarchy[a] instanceof THREE.Bone ? this.hierarchy[a].skinMatrix = this.hierarchy[a].animationCache.originalMatrix : this.hierarchy[a].matrix = this.hierarchy[a].animationCache.originalMatrix, delete this.hierarchy[a].animationCache
};
THREE.Animation.prototype.update = function (a) {
    if (this.isPlaying) {
        var b = ["pos", "rot", "scl"],
            c, d, e, f, g, h, l, j, k = this.data.JIT.hierarchy,
            p, m;
        m = this.currentTime += a * this.timeScale;
        p = this.currentTime %= this.data.length;
        j = parseInt(Math.min(p * this.data.fps, this.data.length * this.data.fps), 10);
        for (var o = 0, r = this.hierarchy.length; o < r; o++) if (a = this.hierarchy[o], l = a.animationCache, this.JITCompile && void 0 !== k[o][j]) a instanceof THREE.Bone ? (a.skinMatrix = k[o][j], a.matrixAutoUpdate = !1, a.matrixWorldNeedsUpdate = !1) : (a.matrix = k[o][j], a.matrixAutoUpdate = !1, a.matrixWorldNeedsUpdate = !0);
        else {
            if (this.JITCompile) a instanceof THREE.Bone ? a.skinMatrix = a.animationCache.originalMatrix : a.matrix = a.animationCache.originalMatrix;
            for (var n = 0; 3 > n; n++) {
                c = b[n];
                g = l.prevKey[c];
                h = l.nextKey[c];
                if (h.time <= m) {
                    if (p < m) if (this.loop) {
                        g = this.data.hierarchy[o].keys[0];
                        for (h = this.getNextKeyWith(c, o, 1); h.time < p;) g = h, h = this.getNextKeyWith(c, o, h.index + 1)
                    } else {
                        this.stop();
                        return
                    } else {
                        do g = h, h = this.getNextKeyWith(c, o, h.index + 1);
                        while (h.time < p)
                    }
                    l.prevKey[c] = g;
                    l.nextKey[c] = h
                }
                a.matrixAutoUpdate = !0;
                a.matrixWorldNeedsUpdate = !0;
                d = (p - g.time) / (h.time - g.time);
                e = g[c];
                f = h[c];
                if (0 > d || 1 < d) console.log("THREE.Animation.update: Warning! Scale out of bounds:" + d + " on bone " + o), d = 0 > d ? 0 : 1;
                if ("pos" === c) if (c = a.position, this.interpolationType === THREE.AnimationHandler.LINEAR) c.x = e[0] + (f[0] - e[0]) * d, c.y = e[1] + (f[1] - e[1]) * d, c.z = e[2] + (f[2] - e[2]) * d;
                else {
                    if (this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD) if (this.points[0] = this.getPrevKeyWith("pos", o, g.index - 1).pos, this.points[1] = e, this.points[2] = f, this.points[3] = this.getNextKeyWith("pos", o, h.index + 1).pos, d = 0.33 * d + 0.33, e = this.interpolateCatmullRom(this.points, d), c.x = e[0], c.y = e[1], c.z = e[2], this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD) d = this.interpolateCatmullRom(this.points, 1.01 * d), this.target.set(d[0], d[1], d[2]), this.target.subSelf(c), this.target.y = 0, this.target.normalize(), d = Math.atan2(this.target.x, this.target.z), a.rotation.set(0, d, 0)
                } else if ("rot" === c) THREE.Quaternion.slerp(e, f, a.quaternion, d);
                else if ("scl" === c) c = a.scale, c.x = e[0] + (f[0] - e[0]) * d, c.y = e[1] + (f[1] - e[1]) * d, c.z = e[2] + (f[2] - e[2]) * d
            }
        }
        if (this.JITCompile && void 0 === k[0][j]) {
            this.hierarchy[0].updateMatrixWorld(!0);
            for (o = 0; o < this.hierarchy.length; o++) k[o][j] = this.hierarchy[o] instanceof THREE.Bone ? this.hierarchy[o].skinMatrix.clone() : this.hierarchy[o].matrix.clone()
        }
    }
};
THREE.Animation.prototype.interpolateCatmullRom = function (a, b) {
    var c = [],
        d = [],
        e, f, g, h, l, j;
    e = (a.length - 1) * b;
    f = Math.floor(e);
    e -= f;
    c[0] = 0 === f ? f : f - 1;
    c[1] = f;
    c[2] = f > a.length - 2 ? f : f + 1;
    c[3] = f > a.length - 3 ? f : f + 2;
    f = a[c[0]];
    h = a[c[1]];
    l = a[c[2]];
    j = a[c[3]];
    c = e * e;
    g = e * c;
    d[0] = this.interpolate(f[0], h[0], l[0], j[0], e, c, g);
    d[1] = this.interpolate(f[1], h[1], l[1], j[1], e, c, g);
    d[2] = this.interpolate(f[2], h[2], l[2], j[2], e, c, g);
    return d
};
THREE.Animation.prototype.interpolate = function (a, b, c, d, e, f, g) {
    a = 0.5 * (c - a);
    d = 0.5 * (d - b);
    return (2 * (b - c) + a + d) * g + (-3 * (b - c) - 2 * a - d) * f + a * e + b
};
THREE.Animation.prototype.getNextKeyWith = function (a, b, c) {
    for (var d = this.data.hierarchy[b].keys, c = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? c < d.length - 1 ? c : d.length - 1 : c % d.length; c < d.length; c++) if (void 0 !== d[c][a]) return d[c];
    return this.data.hierarchy[b].keys[0]
};
THREE.Animation.prototype.getPrevKeyWith = function (a, b, c) {
    for (var d = this.data.hierarchy[b].keys, c = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? 0 < c ? c : 0 : 0 <= c ? c : c + d.length; 0 <= c; c--) if (void 0 !== d[c][a]) return d[c];
    return this.data.hierarchy[b].keys[d.length - 1]
};
THREE.KeyFrameAnimation = function (a, b, c) {
    this.root = a;
    this.data = THREE.AnimationHandler.get(b);
    this.hierarchy = THREE.AnimationHandler.parse(a);
    this.currentTime = 0;
    this.timeScale = 0.001;
    this.isPlaying = !1;
    this.loop = this.isPaused = !0;
    this.JITCompile = void 0 !== c ? c : !0;
    a = 0;
    for (b = this.hierarchy.length; a < b; a++) {
        var c = this.data.hierarchy[a].sids,
            d = this.hierarchy[a];
        if (this.data.hierarchy[a].keys.length && c) {
            for (var e = 0; e < c.length; e++) {
                var f = c[e],
                    g = this.getNextKeyWith(f, a, 0);
                g && g.apply(f)
            }
            d.matrixAutoUpdate = !1;
            this.data.hierarchy[a].node.updateMatrix();
            d.matrixWorldNeedsUpdate = !0
        }
    }
};
THREE.KeyFrameAnimation.prototype.play = function (a, b) {
    if (!this.isPlaying) {
        this.isPlaying = !0;
        this.loop = void 0 !== a ? a : !0;
        this.currentTime = void 0 !== b ? b : 0;
        this.startTimeMs = b;
        this.startTime = 1E7;
        this.endTime = -this.startTime;
        var c, d = this.hierarchy.length,
            e, f;
        for (c = 0; c < d; c++) {
            e = this.hierarchy[c];
            f = this.data.hierarchy[c];
            e.useQuaternion = !0;
            if (void 0 === f.animationCache) f.animationCache = {}, f.animationCache.prevKey = null, f.animationCache.nextKey = null, f.animationCache.originalMatrix = e instanceof THREE.Bone ? e.skinMatrix : e.matrix;
            e = this.data.hierarchy[c].keys;
            if (e.length) f.animationCache.prevKey = e[0], f.animationCache.nextKey = e[1], this.startTime = Math.min(e[0].time, this.startTime), this.endTime = Math.max(e[e.length - 1].time, this.endTime)
        }
        this.update(0)
    }
    this.isPaused = !1;
    THREE.AnimationHandler.addToUpdate(this)
};
THREE.KeyFrameAnimation.prototype.pause = function () {
    this.isPaused ? THREE.AnimationHandler.addToUpdate(this) : THREE.AnimationHandler.removeFromUpdate(this);
    this.isPaused = !this.isPaused
};
THREE.KeyFrameAnimation.prototype.stop = function () {
    this.isPaused = this.isPlaying = !1;
    THREE.AnimationHandler.removeFromUpdate(this);
    for (var a = 0; a < this.data.hierarchy.length; a++) {
        var b = this.hierarchy[a],
            c = this.data.hierarchy[a];
        if (void 0 !== c.animationCache) {
            var d = c.animationCache.originalMatrix;
            b instanceof THREE.Bone ? (d.copy(b.skinMatrix), b.skinMatrix = d) : (d.copy(b.matrix), b.matrix = d);
            delete c.animationCache
        }
    }
};
THREE.KeyFrameAnimation.prototype.update = function (a) {
    if (this.isPlaying) {
        var b, c, d, e, f = this.data.JIT.hierarchy,
            g, h, l;
        h = this.currentTime += a * this.timeScale;
        g = this.currentTime %= this.data.length;
        if (g < this.startTimeMs) g = this.currentTime = this.startTimeMs + g;
        e = parseInt(Math.min(g * this.data.fps, this.data.length * this.data.fps), 10);
        if ((l = g < h) && !this.loop) {
            for (var a = 0, j = this.hierarchy.length; a < j; a++) {
                var k = this.data.hierarchy[a].keys,
                    f = this.data.hierarchy[a].sids;
                d = k.length - 1;
                e = this.hierarchy[a];
                if (k.length) {
                    for (k = 0; k < f.length; k++) g = f[k], (h = this.getPrevKeyWith(g, a, d)) && h.apply(g);
                    this.data.hierarchy[a].node.updateMatrix();
                    e.matrixWorldNeedsUpdate = !0
                }
            }
            this.stop()
        } else if (!(g < this.startTime)) {
            a = 0;
            for (j = this.hierarchy.length; a < j; a++) {
                d = this.hierarchy[a];
                b = this.data.hierarchy[a];
                var k = b.keys,
                    p = b.animationCache;
                if (this.JITCompile && void 0 !== f[a][e]) d instanceof THREE.Bone ? (d.skinMatrix = f[a][e], d.matrixWorldNeedsUpdate = !1) : (d.matrix = f[a][e], d.matrixWorldNeedsUpdate = !0);
                else if (k.length) {
                    if (this.JITCompile && p) d instanceof
                    THREE.Bone ? d.skinMatrix = p.originalMatrix : d.matrix = p.originalMatrix;
                    b = p.prevKey;
                    c = p.nextKey;
                    if (b && c) {
                        if (c.time <= h) {
                            if (l && this.loop) {
                                b = k[0];
                                for (c = k[1]; c.time < g;) b = c, c = k[b.index + 1]
                            } else if (!l) for (var m = k.length - 1; c.time < g && c.index !== m;) b = c, c = k[b.index + 1];
                            p.prevKey = b;
                            p.nextKey = c
                        }
                        c.time >= g ? b.interpolate(c, g) : b.interpolate(c, c.time)
                    }
                    this.data.hierarchy[a].node.updateMatrix();
                    d.matrixWorldNeedsUpdate = !0
                }
            }
            if (this.JITCompile && void 0 === f[0][e]) {
                this.hierarchy[0].updateMatrixWorld(!0);
                for (a = 0; a < this.hierarchy.length; a++) f[a][e] = this.hierarchy[a] instanceof THREE.Bone ? this.hierarchy[a].skinMatrix.clone() : this.hierarchy[a].matrix.clone()
            }
        }
    }
};
THREE.KeyFrameAnimation.prototype.getNextKeyWith = function (a, b, c) {
    b = this.data.hierarchy[b].keys;
    for (c %= b.length; c < b.length; c++) if (b[c].hasTarget(a)) return b[c];
    return b[0]
};
THREE.KeyFrameAnimation.prototype.getPrevKeyWith = function (a, b, c) {
    b = this.data.hierarchy[b].keys;
    for (c = 0 <= c ? c : c + b.length; 0 <= c; c--) if (b[c].hasTarget(a)) return b[c];
    return b[b.length - 1]
};
THREE.CubeCamera = function (a, b, c) {
    this.position = new THREE.Vector3;
    var d = new THREE.PerspectiveCamera(90, 1, a, b),
        e = new THREE.PerspectiveCamera(90, 1, a, b),
        f = new THREE.PerspectiveCamera(90, 1, a, b),
        g = new THREE.PerspectiveCamera(90, 1, a, b),
        h = new THREE.PerspectiveCamera(90, 1, a, b),
        l = new THREE.PerspectiveCamera(90, 1, a, b);
    d.position = this.position;
    d.up.set(0, -1, 0);
    d.lookAt(new THREE.Vector3(1, 0, 0));
    e.position = this.position;
    e.up.set(0, -1, 0);
    e.lookAt(new THREE.Vector3(-1, 0, 0));
    f.position = this.position;
    f.up.set(0, 0, 1);
    f.lookAt(new THREE.Vector3(0, 1, 0));
    g.position = this.position;
    g.up.set(0, 0, -1);
    g.lookAt(new THREE.Vector3(0, -1, 0));
    h.position = this.position;
    h.up.set(0, -1, 0);
    h.lookAt(new THREE.Vector3(0, 0, 1));
    l.position = this.position;
    l.up.set(0, -1, 0);
    l.lookAt(new THREE.Vector3(0, 0, -1));
    this.renderTarget = new THREE.WebGLRenderTargetCube(c, c, {
        format: THREE.RGBFormat,
        magFilter: THREE.LinearFilter,
        minFilter: THREE.LinearFilter
    });
    this.updateCubeMap = function (a, b) {
        var c = this.renderTarget,
            m = c.generateMipmaps;
        c.generateMipmaps = !1;
        c.activeCubeFace = 0;
        a.render(b, d, c);
        c.activeCubeFace = 1;
        a.render(b, e, c);
        c.activeCubeFace = 2;
        a.render(b, f, c);
        c.activeCubeFace = 3;
        a.render(b, g, c);
        c.activeCubeFace = 4;
        a.render(b, h, c);
        c.generateMipmaps = m;
        c.activeCubeFace = 5;
        a.render(b, l, c)
    }
};
THREE.CombinedCamera = function (a, b, c, d, e, f, g) {
    THREE.Camera.call(this);
    this.fov = c;
    this.left = -a / 2;
    this.right = a / 2;
    this.top = b / 2;
    this.bottom = -b / 2;
    this.cameraO = new THREE.OrthographicCamera(a / -2, a / 2, b / 2, b / -2, f, g);
    this.cameraP = new THREE.PerspectiveCamera(c, a / b, d, e);
    this.zoom = 1;
    this.toPerspective()
};
THREE.CombinedCamera.prototype = new THREE.Camera;
THREE.CombinedCamera.prototype.constructor = THREE.CoolCamera;
THREE.CombinedCamera.prototype.toPerspective = function () {
    this.near = this.cameraP.near;
    this.far = this.cameraP.far;
    this.cameraP.fov = this.fov / this.zoom;
    this.cameraP.updateProjectionMatrix();
    this.projectionMatrix = this.cameraP.projectionMatrix;
    this.inPersepectiveMode = !0;
    this.inOrthographicMode = !1
};
THREE.CombinedCamera.prototype.toOrthographic = function () {
    var a = this.cameraP.aspect,
        b = (this.cameraP.near + this.cameraP.far) / 2,
        b = Math.tan(this.fov / 2) * b,
        a = 2 * b * a / 2,
        b = b / this.zoom,
        a = a / this.zoom;
    this.cameraO.left = -a;
    this.cameraO.right = a;
    this.cameraO.top = b;
    this.cameraO.bottom = -b;
    this.cameraO.updateProjectionMatrix();
    this.near = this.cameraO.near;
    this.far = this.cameraO.far;
    this.projectionMatrix = this.cameraO.projectionMatrix;
    this.inPersepectiveMode = !1;
    this.inOrthographicMode = !0
};
THREE.CombinedCamera.prototype.setFov = function (a) {
    this.fov = a;
    this.inPersepectiveMode ? this.toPerspective() : this.toOrthographic()
};
THREE.CombinedCamera.prototype.setLens = function (a, b) {
    var c = 2 * Math.atan((void 0 !== b ? b : 24) / (2 * a)) * (180 / Math.PI);
    this.setFov(c);
    return c
};
THREE.CombinedCamera.prototype.setZoom = function (a) {
    this.zoom = a;
    this.inPersepectiveMode ? this.toPerspective() : this.toOrthographic()
};
THREE.CombinedCamera.prototype.toFrontView = function () {
    this.rotation.x = 0;
    this.rotation.y = 0;
    this.rotation.z = 0;
    this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toBackView = function () {
    this.rotation.x = 0;
    this.rotation.y = Math.PI;
    this.rotation.z = 0;
    this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toLeftView = function () {
    this.rotation.x = 0;
    this.rotation.y = -Math.PI / 2;
    this.rotation.z = 0;
    this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toRightView = function () {
    this.rotation.x = 0;
    this.rotation.y = Math.PI / 2;
    this.rotation.z = 0;
    this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toTopView = function () {
    this.rotation.x = -Math.PI / 2;
    this.rotation.y = 0;
    this.rotation.z = 0;
    this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toBottomView = function () {
    this.rotation.x = Math.PI / 2;
    this.rotation.y = 0;
    this.rotation.z = 0;
    this.rotationAutoUpdate = !1
};
THREE.FirstPersonControls = function (a, b) {
    function c(a, b) {
        return function () {
            b.apply(a, arguments)
        }
    }
    this.object = a;
    this.target = new THREE.Vector3(0, 0, 0);
    this.domElement = void 0 !== b ? b : document;
    this.movementSpeed = 1;
    this.lookSpeed = 0.005;
    this.noFly = !1;
    this.lookVertical = !0;
    this.autoForward = !1;
    this.activeLook = !0;
    this.heightSpeed = !1;
    this.heightCoef = 1;
    this.heightMin = 0;
    this.constrainVertical = !1;
    this.verticalMin = 0;
    this.verticalMax = Math.PI;
    this.theta = this.phi = this.lon = this.lat = this.mouseY = this.mouseX = this.autoSpeedFactor = 0;
    this.mouseDragOn = this.freeze = this.moveRight = this.moveLeft = this.moveBackward = this.moveForward = !1;
    this.domElement === document ? (this.viewHalfX = window.innerWidth / 2, this.viewHalfY = window.innerHeight / 2) : (this.viewHalfX = this.domElement.offsetWidth / 2, this.viewHalfY = this.domElement.offsetHeight / 2, this.domElement.setAttribute("tabindex", -1));
    this.onMouseDown = function (a) {
        this.domElement !== document && this.domElement.focus();
        a.preventDefault();
        a.stopPropagation();
        if (this.activeLook) switch (a.button) {
        case 0:
            this.moveForward = !0;
            break;
        case 2:
            this.moveBackward = !0
        }
        this.mouseDragOn = !0
    };
    this.onMouseUp = function (a) {
        a.preventDefault();
        a.stopPropagation();
        if (this.activeLook) switch (a.button) {
        case 0:
            this.moveForward = !1;
            break;
        case 2:
            this.moveBackward = !1
        }
        this.mouseDragOn = !1
    };
    this.onMouseMove = function (a) {
        this.domElement === document ? (this.mouseX = a.pageX - this.viewHalfX, this.mouseY = a.pageY - this.viewHalfY) : (this.mouseX = a.pageX - this.domElement.offsetLeft - this.viewHalfX, this.mouseY = a.pageY - this.domElement.offsetTop - this.viewHalfY)
    };
    this.onKeyDown = function (a) {
        switch (a.keyCode) {
        case 38:
        case 87:
            this.moveForward = !0;
            break;
        case 37:
        case 65:
            this.moveLeft = !0;
            break;
        case 40:
        case 83:
            this.moveBackward = !0;
            break;
        case 39:
        case 68:
            this.moveRight = !0;
            break;
        case 82:
            this.moveUp = !0;
            break;
        case 70:
            this.moveDown = !0;
            break;
        case 81:
            this.freeze = !this.freeze
        }
    };
    this.onKeyUp = function (a) {
        switch (a.keyCode) {
        case 38:
        case 87:
            this.moveForward = !1;
            break;
        case 37:
        case 65:
            this.moveLeft = !1;
            break;
        case 40:
        case 83:
            this.moveBackward = !1;
            break;
        case 39:
        case 68:
            this.moveRight = !1;
            break;
        case 82:
            this.moveUp = !1;
            break;
        case 70:
            this.moveDown = !1
        }
    };
    this.update = function (a) {
        var b = 0;
        if (!this.freeze) {
            this.heightSpeed ? (b = THREE.Math.clamp(this.object.position.y, this.heightMin, this.heightMax) - this.heightMin, this.autoSpeedFactor = a * b * this.heightCoef) : this.autoSpeedFactor = 0;
            b = a * this.movementSpeed;
            (this.moveForward || this.autoForward && !this.moveBackward) && this.object.translateZ(-(b + this.autoSpeedFactor));
            this.moveBackward && this.object.translateZ(b);
            this.moveLeft && this.object.translateX(-b);
            this.moveRight && this.object.translateX(b);
            this.moveUp && this.object.translateY(b);
            this.moveDown && this.object.translateY(-b);
            a *= this.lookSpeed;
            this.activeLook || (a = 0);
            this.lon += this.mouseX * a;
            this.lookVertical && (this.lat -= this.mouseY * a);
            this.lat = Math.max(-85, Math.min(85, this.lat));
            this.phi = (90 - this.lat) * Math.PI / 180;
            this.theta = this.lon * Math.PI / 180;
            var b = this.target,
                c = this.object.position;
            b.x = c.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
            b.y = c.y + 100 * Math.cos(this.phi);
            b.z = c.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);
            b = 1;
            this.constrainVertical && (b = Math.PI / (this.verticalMax - this.verticalMin));
            this.lon += this.mouseX * a;
            this.lookVertical && (this.lat -= this.mouseY * a * b);
            this.lat = Math.max(-85, Math.min(85, this.lat));
            this.phi = (90 - this.lat) * Math.PI / 180;
            this.theta = this.lon * Math.PI / 180;
            if (this.constrainVertical) this.phi = THREE.Math.mapLinear(this.phi, 0, Math.PI, this.verticalMin, this.verticalMax);
            b = this.target;
            c = this.object.position;
            b.x = c.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
            b.y = c.y + 100 * Math.cos(this.phi);
            b.z = c.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);
            this.object.lookAt(b)
        }
    };
    this.domElement.addEventListener("contextmenu", function (a) {
        a.preventDefault()
    }, !1);
    this.domElement.addEventListener("mousemove", c(this, this.onMouseMove), !1);
    this.domElement.addEventListener("mousedown", c(this, this.onMouseDown), !1);
    this.domElement.addEventListener("mouseup", c(this, this.onMouseUp), !1);
    this.domElement.addEventListener("keydown", c(this, this.onKeyDown), !1);
    this.domElement.addEventListener("keyup", c(this, this.onKeyUp), !1)
};
THREE.PathControls = function (a, b) {
    function c(a) {
        return 1 > (a *= 2) ? 0.5 * a * a : -0.5 * (--a * (a - 2) - 1)
    }
    function d(a, b) {
        return function () {
            b.apply(a, arguments)
        }
    }
    function e(a, b, c, d) {
        var e = {
            name: c,
            fps: 0.6,
            length: d,
            hierarchy: []
        },
            f, g = b.getControlPointsArray(),
            h = b.getLength(),
            q = g.length,
            s = 0;
        f = q - 1;
        b = {
            parent: -1,
            keys: []
        };
        b.keys[0] = {
            time: 0,
            pos: g[0],
            rot: [0, 0, 0, 1],
            scl: [1, 1, 1]
        };
        b.keys[f] = {
            time: d,
            pos: g[f],
            rot: [0, 0, 0, 1],
            scl: [1, 1, 1]
        };
        for (f = 1; f < q - 1; f++) s = d * h.chunks[f] / h.total, b.keys[f] = {
            time: s,
            pos: g[f]
        };
        e.hierarchy[0] = b;
        THREE.AnimationHandler.add(e);
        return new THREE.Animation(a, c, THREE.AnimationHandler.CATMULLROM_FORWARD, !1)
    }
    function f(a, b) {
        var c, d, e = new THREE.Geometry;
        for (c = 0; c < a.points.length * b; c++) d = c / (a.points.length * b), d = a.getPoint(d), e.vertices[c] = new THREE.Vertex(new THREE.Vector3(d.x, d.y, d.z));
        return e
    }
    this.object = a;
    this.domElement = void 0 !== b ? b : document;
    this.id = "PathControls" + THREE.PathControlsIdCounter++;
    this.duration = 1E4;
    this.waypoints = [];
    this.useConstantSpeed = !0;
    this.resamplingCoef = 50;
    this.debugPath = new THREE.Object3D;
    this.debugDummy = new THREE.Object3D;
    this.animationParent = new THREE.Object3D;
    this.lookSpeed = 0.005;
    this.lookHorizontal = this.lookVertical = !0;
    this.verticalAngleMap = {
        srcRange: [0, 2 * Math.PI],
        dstRange: [0, 2 * Math.PI]
    };
    this.horizontalAngleMap = {
        srcRange: [0, 2 * Math.PI],
        dstRange: [0, 2 * Math.PI]
    };
    this.target = new THREE.Object3D;
    this.theta = this.phi = this.lon = this.lat = this.mouseY = this.mouseX = 0;
    this.domElement === document ? (this.viewHalfX = window.innerWidth / 2, this.viewHalfY = window.innerHeight / 2) : (this.viewHalfX = this.domElement.offsetWidth / 2, this.viewHalfY = this.domElement.offsetHeight / 2, this.domElement.setAttribute("tabindex", -1));
    var g = 2 * Math.PI,
        h = Math.PI / 180;
    this.update = function (a) {
        var b;
        this.lookHorizontal && (this.lon += this.mouseX * this.lookSpeed * a);
        this.lookVertical && (this.lat -= this.mouseY * this.lookSpeed * a);
        this.lon = Math.max(0, Math.min(360, this.lon));
        this.lat = Math.max(-85, Math.min(85, this.lat));
        this.phi = (90 - this.lat) * h;
        this.theta = this.lon * h;
        a = this.phi % g;
        this.phi = 0 <= a ? a : a + g;
        b = this.verticalAngleMap.srcRange;
        a = this.verticalAngleMap.dstRange;
        b = THREE.Math.mapLinear(this.phi, b[0], b[1], a[0], a[1]);
        var d = a[1] - a[0];
        this.phi = c((b - a[0]) / d) * d + a[0];
        b = this.horizontalAngleMap.srcRange;
        a = this.horizontalAngleMap.dstRange;
        b = THREE.Math.mapLinear(this.theta, b[0], b[1], a[0], a[1]);
        d = a[1] - a[0];
        this.theta = c((b - a[0]) / d) * d + a[0];
        a = this.target.position;
        a.x = 100 * Math.sin(this.phi) * Math.cos(this.theta);
        a.y = 100 * Math.cos(this.phi);
        a.z = 100 * Math.sin(this.phi) * Math.sin(this.theta);
        this.object.lookAt(this.target.position)
    };
    this.onMouseMove = function (a) {
        this.domElement === document ? (this.mouseX = a.pageX - this.viewHalfX, this.mouseY = a.pageY - this.viewHalfY) : (this.mouseX = a.pageX - this.domElement.offsetLeft - this.viewHalfX, this.mouseY = a.pageY - this.domElement.offsetTop - this.viewHalfY)
    };
    this.init = function () {
        this.spline = new THREE.Spline;
        this.spline.initFromArray(this.waypoints);
        this.useConstantSpeed && this.spline.reparametrizeByArcLength(this.resamplingCoef);
        if (this.createDebugDummy) {
            var a = new THREE.MeshLambertMaterial({
                color: 30719
            }),
                b = new THREE.MeshLambertMaterial({
                    color: 65280
                }),
                c = new THREE.CubeGeometry(10, 10, 20),
                g = new THREE.CubeGeometry(2, 2, 10);
            this.animationParent = new THREE.Mesh(c, a);
            a = new THREE.Mesh(g, b);
            a.position.set(0, 10, 0);
            this.animation = e(this.animationParent, this.spline, this.id, this.duration);
            this.animationParent.add(this.object);
            this.animationParent.add(this.target);
            this.animationParent.add(a)
        } else this.animation = e(this.animationParent, this.spline, this.id, this.duration), this.animationParent.add(this.target), this.animationParent.add(this.object);
        if (this.createDebugPath) {
            var a = this.debugPath,
                b = this.spline,
                g = f(b, 10),
                c = f(b, 10),
                h = new THREE.LineBasicMaterial({
                    color: 16711680,
                    linewidth: 3
                }),
                g = new THREE.Line(g, h),
                c = new THREE.ParticleSystem(c, new THREE.ParticleBasicMaterial({
                    color: 16755200,
                    size: 3
                }));
            g.scale.set(1, 1, 1);
            a.add(g);
            c.scale.set(1, 1, 1);
            a.add(c);
            for (var g = new THREE.SphereGeometry(1, 16, 8), h = new THREE.MeshBasicMaterial({
                color: 65280
            }), o = 0; o < b.points.length; o++) c = new THREE.Mesh(g, h), c.position.copy(b.points[o]), a.add(c)
        }
        this.domElement.addEventListener("mousemove", d(this, this.onMouseMove), !1)
    }
};
THREE.PathControlsIdCounter = 0;
THREE.FlyControls = function (a, b) {
    function c(a, b) {
        return function () {
            b.apply(a, arguments)
        }
    }
    this.object = a;
    this.domElement = void 0 !== b ? b : document;
    b && this.domElement.setAttribute("tabindex", -1);
    this.movementSpeed = 1;
    this.rollSpeed = 0.005;
    this.autoForward = this.dragToLook = !1;
    this.object.useQuaternion = !0;
    this.tmpQuaternion = new THREE.Quaternion;
    this.mouseStatus = 0;
    this.moveState = {
        up: 0,
        down: 0,
        left: 0,
        right: 0,
        forward: 0,
        back: 0,
        pitchUp: 0,
        pitchDown: 0,
        yawLeft: 0,
        yawRight: 0,
        rollLeft: 0,
        rollRight: 0
    };
    this.moveVector = new THREE.Vector3(0, 0, 0);
    this.rotationVector = new THREE.Vector3(0, 0, 0);
    this.handleEvent = function (a) {
        if ("function" == typeof this[a.type]) this[a.type](a)
    };
    this.keydown = function (a) {
        if (!a.altKey) {
            switch (a.keyCode) {
            case 16:
                this.movementSpeedMultiplier = 0.1;
                break;
            case 87:
                this.moveState.forward = 1;
                break;
            case 83:
                this.moveState.back = 1;
                break;
            case 65:
                this.moveState.left = 1;
                break;
            case 68:
                this.moveState.right = 1;
                break;
            case 82:
                this.moveState.up = 1;
                break;
            case 70:
                this.moveState.down = 1;
                break;
            case 38:
                this.moveState.pitchUp = 1;
                break;
            case 40:
                this.moveState.pitchDown = 1;
                break;
            case 37:
                this.moveState.yawLeft = 1;
                break;
            case 39:
                this.moveState.yawRight = 1;
                break;
            case 81:
                this.moveState.rollLeft = 1;
                break;
            case 69:
                this.moveState.rollRight = 1
            }
            this.updateMovementVector();
            this.updateRotationVector()
        }
    };
    this.keyup = function (a) {
        switch (a.keyCode) {
        case 16:
            this.movementSpeedMultiplier = 1;
            break;
        case 87:
            this.moveState.forward = 0;
            break;
        case 83:
            this.moveState.back = 0;
            break;
        case 65:
            this.moveState.left = 0;
            break;
        case 68:
            this.moveState.right = 0;
            break;
        case 82:
            this.moveState.up = 0;
            break;
        case 70:
            this.moveState.down = 0;
            break;
        case 38:
            this.moveState.pitchUp = 0;
            break;
        case 40:
            this.moveState.pitchDown = 0;
            break;
        case 37:
            this.moveState.yawLeft = 0;
            break;
        case 39:
            this.moveState.yawRight = 0;
            break;
        case 81:
            this.moveState.rollLeft = 0;
            break;
        case 69:
            this.moveState.rollRight = 0
        }
        this.updateMovementVector();
        this.updateRotationVector()
    };
    this.mousedown = function (a) {
        this.domElement !== document && this.domElement.focus();
        a.preventDefault();
        a.stopPropagation();
        if (this.dragToLook) this.mouseStatus++;
        else switch (a.button) {
        case 0:
            this.object.moveForward = !0;
            break;
        case 2:
            this.object.moveBackward = !0
        }
    };
    this.mousemove = function (a) {
        if (!this.dragToLook || 0 < this.mouseStatus) {
            var b = this.getContainerDimensions(),
                c = b.size[0] / 2,
                g = b.size[1] / 2;
            this.moveState.yawLeft = -(a.pageX - b.offset[0] - c) / c;
            this.moveState.pitchDown = (a.pageY - b.offset[1] - g) / g;
            this.updateRotationVector()
        }
    };
    this.mouseup = function (a) {
        a.preventDefault();
        a.stopPropagation();
        if (this.dragToLook) this.mouseStatus--, this.moveState.yawLeft = this.moveState.pitchDown = 0;
        else switch (a.button) {
        case 0:
            this.moveForward = !1;
            break;
        case 2:
            this.moveBackward = !1
        }
        this.updateRotationVector()
    };
    this.update = function (a) {
        var b = a * this.movementSpeed,
            a = a * this.rollSpeed;
        this.object.translateX(this.moveVector.x * b);
        this.object.translateY(this.moveVector.y * b);
        this.object.translateZ(this.moveVector.z * b);
        this.tmpQuaternion.set(this.rotationVector.x * a, this.rotationVector.y * a, this.rotationVector.z * a, 1).normalize();
        this.object.quaternion.multiplySelf(this.tmpQuaternion);
        this.object.matrix.setPosition(this.object.position);
        this.object.matrix.setRotationFromQuaternion(this.object.quaternion);
        this.object.matrixWorldNeedsUpdate = !0
    };
    this.updateMovementVector = function () {
        var a = this.moveState.forward || this.autoForward && !this.moveState.back ? 1 : 0;
        this.moveVector.x = -this.moveState.left + this.moveState.right;
        this.moveVector.y = -this.moveState.down + this.moveState.up;
        this.moveVector.z = -a + this.moveState.back
    };
    this.updateRotationVector = function () {
        this.rotationVector.x = -this.moveState.pitchDown + this.moveState.pitchUp;
        this.rotationVector.y = -this.moveState.yawRight + this.moveState.yawLeft;
        this.rotationVector.z = -this.moveState.rollRight + this.moveState.rollLeft
    };
    this.getContainerDimensions = function () {
        return this.domElement != document ? {
            size: [this.domElement.offsetWidth, this.domElement.offsetHeight],
            offset: [this.domElement.offsetLeft, this.domElement.offsetTop]
        } : {
            size: [window.innerWidth, window.innerHeight],
            offset: [0, 0]
        }
    };
    this.domElement.addEventListener("mousemove", c(this, this.mousemove), !1);
    this.domElement.addEventListener("mousedown", c(this, this.mousedown), !1);
    this.domElement.addEventListener("mouseup", c(this, this.mouseup), !1);
    this.domElement.addEventListener("keydown", c(this, this.keydown), !1);
    this.domElement.addEventListener("keyup", c(this, this.keyup), !1);
    this.updateMovementVector();
    this.updateRotationVector()
};
THREE.RollControls = function (a, b) {
    this.object = a;
    this.domElement = void 0 !== b ? b : document;
    this.mouseLook = !0;
    this.autoForward = !1;
    this.rollSpeed = this.movementSpeed = this.lookSpeed = 1;
    this.constrainVertical = [-0.9, 0.9];
    this.object.matrixAutoUpdate = !1;
    this.forward = new THREE.Vector3(0, 0, 1);
    this.roll = 0;
    var c = new THREE.Vector3,
        d = new THREE.Vector3,
        e = new THREE.Vector3,
        f = new THREE.Matrix4,
        g = !1,
        h = 1,
        l = 0,
        j = 0,
        k = 0,
        p = 0,
        m = 0,
        o = window.innerWidth / 2,
        r = window.innerHeight / 2;
    this.update = function (a) {
        if (this.mouseLook) {
            var b = a * this.lookSpeed;
            this.rotateHorizontally(b * p);
            this.rotateVertically(b * m)
        }
        b = a * this.movementSpeed;
        this.object.translateZ(-b * (0 < l || this.autoForward && !(0 > l) ? 1 : l));
        this.object.translateX(b * j);
        this.object.translateY(b * k);
        g && (this.roll += this.rollSpeed * a * h);
        if (this.forward.y > this.constrainVertical[1]) this.forward.y = this.constrainVertical[1], this.forward.normalize();
        else if (this.forward.y < this.constrainVertical[0]) this.forward.y = this.constrainVertical[0], this.forward.normalize();
        e.copy(this.forward);
        d.set(0, 1, 0);
        c.cross(d, e).normalize();
        d.cross(e, c).normalize();
        this.object.matrix.n11 = c.x;
        this.object.matrix.n12 = d.x;
        this.object.matrix.n13 = e.x;
        this.object.matrix.n21 = c.y;
        this.object.matrix.n22 = d.y;
        this.object.matrix.n23 = e.y;
        this.object.matrix.n31 = c.z;
        this.object.matrix.n32 = d.z;
        this.object.matrix.n33 = e.z;
        f.identity();
        f.n11 = Math.cos(this.roll);
        f.n12 = -Math.sin(this.roll);
        f.n21 = Math.sin(this.roll);
        f.n22 = Math.cos(this.roll);
        this.object.matrix.multiplySelf(f);
        this.object.matrixWorldNeedsUpdate = !0;
        this.object.matrix.n14 = this.object.position.x;
        this.object.matrix.n24 = this.object.position.y;
        this.object.matrix.n34 = this.object.position.z
    };
    this.translateX = function (a) {
        this.object.position.x += this.object.matrix.n11 * a;
        this.object.position.y += this.object.matrix.n21 * a;
        this.object.position.z += this.object.matrix.n31 * a
    };
    this.translateY = function (a) {
        this.object.position.x += this.object.matrix.n12 * a;
        this.object.position.y += this.object.matrix.n22 * a;
        this.object.position.z += this.object.matrix.n32 * a
    };
    this.translateZ = function (a) {
        this.object.position.x -= this.object.matrix.n13 * a;
        this.object.position.y -= this.object.matrix.n23 * a;
        this.object.position.z -= this.object.matrix.n33 * a
    };
    this.rotateHorizontally = function (a) {
        c.set(this.object.matrix.n11, this.object.matrix.n21, this.object.matrix.n31);
        c.multiplyScalar(a);
        this.forward.subSelf(c);
        this.forward.normalize()
    };
    this.rotateVertically = function (a) {
        d.set(this.object.matrix.n12, this.object.matrix.n22, this.object.matrix.n32);
        d.multiplyScalar(a);
        this.forward.addSelf(d);
        this.forward.normalize()
    };
    this.domElement.addEventListener("contextmenu", function (a) {
        a.preventDefault()
    }, !1);
    this.domElement.addEventListener("mousemove", function (a) {
        p = (a.clientX - o) / window.innerWidth;
        m = (a.clientY - r) / window.innerHeight
    }, !1);
    this.domElement.addEventListener("mousedown", function (a) {
        a.preventDefault();
        a.stopPropagation();
        switch (a.button) {
        case 0:
            l = 1;
            break;
        case 2:
            l = -1
        }
    }, !1);
    this.domElement.addEventListener("mouseup", function (a) {
        a.preventDefault();
        a.stopPropagation();
        switch (a.button) {
        case 0:
            l = 0;
            break;
        case 2:
            l = 0
        }
    }, !1);
    this.domElement.addEventListener("keydown", function (a) {
        switch (a.keyCode) {
        case 38:
        case 87:
            l = 1;
            break;
        case 37:
        case 65:
            j = -1;
            break;
        case 40:
        case 83:
            l = -1;
            break;
        case 39:
        case 68:
            j = 1;
            break;
        case 81:
            g = !0;
            h = 1;
            break;
        case 69:
            g = !0;
            h = -1;
            break;
        case 82:
            k = 1;
            break;
        case 70:
            k = -1
        }
    }, !1);
    this.domElement.addEventListener("keyup", function (a) {
        switch (a.keyCode) {
        case 38:
        case 87:
            l = 0;
            break;
        case 37:
        case 65:
            j = 0;
            break;
        case 40:
        case 83:
            l = 0;
            break;
        case 39:
        case 68:
            j = 0;
            break;
        case 81:
            g = !1;
            break;
        case 69:
            g = !1;
            break;
        case 82:
            k = 0;
            break;
        case 70:
            k = 0
        }
    }, !1)
};
THREE.TrackballControls = function (a, b) {
    THREE.EventTarget.call(this);
    var c = this;
    this.object = a;
    this.domElement = void 0 !== b ? b : document;
    this.enabled = !0;
    this.screen = {
        width: window.innerWidth,
        height: window.innerHeight,
        offsetLeft: 0,
        offsetTop: 0
    };
    this.radius = (this.screen.width + this.screen.height) / 4;
    this.rotateSpeed = 1;
    this.zoomSpeed = 1.2;
    this.panSpeed = 0.3;
    this.staticMoving = this.noPan = this.noZoom = this.noRotate = !1;
    this.dynamicDampingFactor = 0.2;
    this.minDistance = 0;
    this.maxDistance = Infinity;
    this.keys = [65, 83, 68];
    this.target = new THREE.Vector3;
    var d = new THREE.Vector3,
        e = !1,
        f = -1,
        g = new THREE.Vector3,
        h = new THREE.Vector3,
        l = new THREE.Vector3,
        j = new THREE.Vector2,
        k = new THREE.Vector2,
        p = new THREE.Vector2,
        m = new THREE.Vector2,
        o = {
            type: "change"
        };
    this.handleEvent = function (a) {
        if ("function" == typeof this[a.type]) this[a.type](a)
    };
    this.getMouseOnScreen = function (a, b) {
        return new THREE.Vector2(0.5 * ((a - c.screen.offsetLeft) / c.radius), 0.5 * ((b - c.screen.offsetTop) / c.radius))
    };
    this.getMouseProjectionOnBall = function (a, b) {
        var d = new THREE.Vector3((a - 0.5 * c.screen.width - c.screen.offsetLeft) / c.radius, (0.5 * c.screen.height + c.screen.offsetTop - b) / c.radius, 0),
            e = d.length();
        1 < e ? d.normalize() : d.z = Math.sqrt(1 - e * e);
        g.copy(c.object.position).subSelf(c.target);
        e = c.object.up.clone().setLength(d.y);
        e.addSelf(c.object.up.clone().crossSelf(g).setLength(d.x));
        e.addSelf(g.setLength(d.z));
        return e
    };
    this.rotateCamera = function () {
        var a = Math.acos(h.dot(l) / h.length() / l.length());
        if (a) {
            var b = (new THREE.Vector3).cross(h, l).normalize(),
                d = new THREE.Quaternion,
                a = a * c.rotateSpeed;
            d.setFromAxisAngle(b, -a);
            d.multiplyVector3(g);
            d.multiplyVector3(c.object.up);
            d.multiplyVector3(l);
            c.staticMoving ? h = l : (d.setFromAxisAngle(b, a * (c.dynamicDampingFactor - 1)), d.multiplyVector3(h))
        }
    };
    this.zoomCamera = function () {
        var a = 1 + (k.y - j.y) * c.zoomSpeed;
        1 !== a && 0 < a && (g.multiplyScalar(a), c.staticMoving ? j = k : j.y += (k.y - j.y) * this.dynamicDampingFactor)
    };
    this.panCamera = function () {
        var a = m.clone().subSelf(p);
        if (a.lengthSq()) {
            a.multiplyScalar(g.length() * c.panSpeed);
            var b = g.clone().crossSelf(c.object.up).setLength(a.x);
            b.addSelf(c.object.up.clone().setLength(a.y));
            c.object.position.addSelf(b);
            c.target.addSelf(b);
            c.staticMoving ? p = m : p.addSelf(a.sub(m, p).multiplyScalar(c.dynamicDampingFactor))
        }
    };
    this.checkDistances = function () {
        if (!c.noZoom || !c.noPan) c.object.position.lengthSq() > c.maxDistance * c.maxDistance && c.object.position.setLength(c.maxDistance), g.lengthSq() < c.minDistance * c.minDistance && c.object.position.add(c.target, g.setLength(c.minDistance))
    };
    this.update = function () {
        g.copy(c.object.position).subSelf(c.target);
        c.noRotate || c.rotateCamera();
        c.noZoom || c.zoomCamera();
        c.noPan || c.panCamera();
        c.object.position.add(c.target, g);
        c.checkDistances();
        c.object.lookAt(c.target);
        0 < d.distanceTo(c.object.position) && (c.dispatchEvent(o), d.copy(c.object.position))
    };
    this.domElement.addEventListener("contextmenu", function (a) {
        a.preventDefault()
    }, !1);
    this.domElement.addEventListener("mousemove", function (a) {
        c.enabled && (e && (h = l = c.getMouseProjectionOnBall(a.clientX, a.clientY), j = k = c.getMouseOnScreen(a.clientX, a.clientY), p = m = c.getMouseOnScreen(a.clientX, a.clientY), e = !1), -1 !== f && (0 === f && !c.noRotate ? l = c.getMouseProjectionOnBall(a.clientX, a.clientY) : 1 === f && !c.noZoom ? k = c.getMouseOnScreen(a.clientX, a.clientY) : 2 === f && !c.noPan && (m = c.getMouseOnScreen(a.clientX, a.clientY))))
    }, !1);
    this.domElement.addEventListener("mousedown", function (a) {
        if (c.enabled && (a.preventDefault(), a.stopPropagation(), -1 === f)) f = a.button, 0 === f && !c.noRotate ? h = l = c.getMouseProjectionOnBall(a.clientX, a.clientY) : 1 === f && !c.noZoom ? j = k = c.getMouseOnScreen(a.clientX, a.clientY) : this.noPan || (p = m = c.getMouseOnScreen(a.clientX, a.clientY))
    }, !1);
    this.domElement.addEventListener("mouseup", function (a) {
        c.enabled && (a.preventDefault(), a.stopPropagation(), f = -1)
    }, !1);
    window.addEventListener("keydown", function (a) {
        c.enabled && -1 === f && (a.keyCode === c.keys[0] && !c.noRotate ? f = 0 : a.keyCode === c.keys[1] && !c.noZoom ? f = 1 : a.keyCode === c.keys[2] && !c.noPan && (f = 2), -1 !== f && (e = !0))
    }, !1);
    window.addEventListener("keyup", function () {
        c.enabled && -1 !== f && (f = -1)
    }, !1)
};
THREE.CubeGeometry = function (a, b, c, d, e, f, g, h) {
    function l(a, b, c, g, h, k, l, m) {
        var n, o = d || 1,
            p = e || 1,
            r = h / 2,
            q = k / 2,
            s = j.vertices.length;
        if ("x" === a && "y" === b || "y" === a && "x" === b) n = "z";
        else if ("x" === a && "z" === b || "z" === a && "x" === b) n = "y", p = f || 1;
        else if ("z" === a && "y" === b || "y" === a && "z" === b) n = "x", o = f || 1;
        var i = o + 1,
            u = p + 1,
            v = h / o,
            A = k / p,
            V = new THREE.Vector3;
        V[n] = 0 < l ? 1 : -1;
        for (h = 0; h < u; h++) for (k = 0; k < i; k++) {
            var E = new THREE.Vector3;
            E[a] = (k * v - r) * c;
            E[b] = (h * A - q) * g;
            E[n] = l;
            j.vertices.push(new THREE.Vertex(E))
        }
        for (h = 0; h < p; h++) for (k = 0; k < o; k++) a = new THREE.Face4(k + i * h + s, k + i * (h + 1) + s, k + 1 + i * (h + 1) + s, k + 1 + i * h + s), a.normal.copy(V), a.vertexNormals.push(V.clone(), V.clone(), V.clone(), V.clone()), a.materialIndex = m, j.faces.push(a), j.faceVertexUvs[0].push([new THREE.UV(k / o, h / p), new THREE.UV(k / o, (h + 1) / p), new THREE.UV((k + 1) / o, (h + 1) / p), new THREE.UV((k + 1) / o, h / p)])
    }
    THREE.Geometry.call(this);
    var j = this,
        k = a / 2,
        p = b / 2,
        m = c / 2,
        o, r, n, q, s, u;
    if (void 0 !== g) {
        if (g instanceof Array) this.materials = g;
        else {
            this.materials = [];
            for (o = 0; 6 > o; o++) this.materials.push(g)
        }
        o = 0;
        q = 1;
        r = 2;
        s = 3;
        n = 4;
        u = 5
    } else this.materials = [];
    this.sides = {
        px: !0,
        nx: !0,
        py: !0,
        ny: !0,
        pz: !0,
        nz: !0
    };
    if (void 0 != h) for (var v in h) void 0 !== this.sides[v] && (this.sides[v] = h[v]);
    this.sides.px && l("z", "y", -1, -1, c, b, k, o);
    this.sides.nx && l("z", "y", 1, -1, c, b, -k, q);
    this.sides.py && l("x", "z", 1, 1, a, c, p, r);
    this.sides.ny && l("x", "z", 1, -1, a, c, -p, s);
    this.sides.pz && l("x", "y", 1, -1, a, b, m, n);
    this.sides.nz && l("x", "y", -1, -1, a, b, -m, u);
    this.computeCentroids();
    this.mergeVertices()
};
THREE.CubeGeometry.prototype = new THREE.Geometry;
THREE.CubeGeometry.prototype.constructor = THREE.CubeGeometry;
THREE.CylinderGeometry = function (a, b, c, d, e, f) {
    THREE.Geometry.call(this);
    var a = void 0 !== a ? a : 20,
        b = void 0 !== b ? b : 20,
        c = void 0 !== c ? c : 100,
        g = c / 2,
        d = d || 8,
        e = e || 1,
        h, l, j = [],
        k = [];
    for (l = 0; l <= e; l++) {
        var p = [],
            m = [],
            o = l / e,
            r = o * (b - a) + a;
        for (h = 0; h <= d; h++) {
            var n = h / d,
                q = r * Math.sin(2 * n * Math.PI),
                s = -o * c + g,
                u = r * Math.cos(2 * n * Math.PI);
            this.vertices.push(new THREE.Vertex(new THREE.Vector3(q, s, u)));
            p.push(this.vertices.length - 1);
            m.push(new THREE.UV(n, o))
        }
        j.push(p);
        k.push(m)
    }
    for (l = 0; l < e; l++) for (h = 0; h < d; h++) {
        var c = j[l][h],
            p = j[l + 1][h],
            m = j[l + 1][h + 1],
            o = j[l][h + 1],
            r = this.vertices[c].position.clone().setY(0).normalize(),
            n = this.vertices[p].position.clone().setY(0).normalize(),
            q = this.vertices[m].position.clone().setY(0).normalize(),
            s = this.vertices[o].position.clone().setY(0).normalize(),
            u = k[l][h].clone(),
            v = k[l + 1][h].clone(),
            t = k[l + 1][h + 1].clone(),
            w = k[l][h + 1].clone();
        this.faces.push(new THREE.Face4(c, p, m, o, [r, n, q, s]));
        this.faceVertexUvs[0].push([u, v, t, w])
    }
    if (!f && 0 < a) {
        this.vertices.push(new THREE.Vertex(new THREE.Vector3(0, g, 0)));
        for (h = 0; h < d; h++) c = j[0][h], p = j[0][h + 1], m = this.vertices.length - 1, r = new THREE.Vector3(0, 1, 0), n = new THREE.Vector3(0, 1, 0), q = new THREE.Vector3(0, 1, 0), u = k[0][h].clone(), v = k[0][h + 1].clone(), t = new THREE.UV(v.u, 0), this.faces.push(new THREE.Face3(c, p, m, [r, n, q])), this.faceVertexUvs[0].push([u, v, t])
    }
    if (!f && 0 < b) {
        this.vertices.push(new THREE.Vertex(new THREE.Vector3(0, -g, 0)));
        for (h = 0; h < d; h++) c = j[l][h + 1], p = j[l][h], m = this.vertices.length - 1, r = new THREE.Vector3(0, -1, 0), n = new THREE.Vector3(0, -1, 0), q = new THREE.Vector3(0, -1, 0), u = k[l][h + 1].clone(), v = k[l][h].clone(), t = new THREE.UV(v.u, 1), this.faces.push(new THREE.Face3(c, p, m, [r, n, q])), this.faceVertexUvs[0].push([u, v, t])
    }
    this.computeCentroids();
    this.computeFaceNormals()
};
THREE.CylinderGeometry.prototype = new THREE.Geometry;
THREE.CylinderGeometry.prototype.constructor = THREE.CylinderGeometry;
THREE.ExtrudeGeometry = function (a, b) {
    if ("undefined" !== typeof a) THREE.Geometry.call(this), a = a instanceof Array ? a : [a], this.shapebb = a[a.length - 1].getBoundingBox(), this.addShapeList(a, b), this.computeCentroids(), this.computeFaceNormals()
};
THREE.ExtrudeGeometry.prototype = new THREE.Geometry;
THREE.ExtrudeGeometry.prototype.constructor = THREE.ExtrudeGeometry;
THREE.ExtrudeGeometry.prototype.addShapeList = function (a, b) {
    for (var c = a.length, d = 0; d < c; d++) this.addShape(a[d], b)
};
THREE.ExtrudeGeometry.prototype.addShape = function (a, b) {
    function c(a, b, c) {
        b || console.log("die");
        return b.clone().multiplyScalar(c).addSelf(a)
    }
    function d(a, b, c) {
        var d = THREE.ExtrudeGeometry.__v1,
            e = THREE.ExtrudeGeometry.__v2,
            f = THREE.ExtrudeGeometry.__v3,
            g = THREE.ExtrudeGeometry.__v4,
            h = THREE.ExtrudeGeometry.__v5,
            i = THREE.ExtrudeGeometry.__v6;
        d.set(a.x - b.x, a.y - b.y);
        e.set(a.x - c.x, a.y - c.y);
        d = d.normalize();
        e = e.normalize();
        f.set(-d.y, d.x);
        g.set(e.y, -e.x);
        h.copy(a).addSelf(f);
        i.copy(a).addSelf(g);
        if (h.equals(i)) return g.clone();
        h.copy(b).addSelf(f);
        i.copy(c).addSelf(g);
        f = d.dot(g);
        g = i.subSelf(h).dot(g);
        0 === f && (console.log("Either infinite or no solutions!"), 0 === g ? console.log("Its finite solutions.") : console.log("Too bad, no solutions."));
        g /= f;
        return 0 > g ? (b = Math.atan2(b.y - a.y, b.x - a.x), a = Math.atan2(c.y - a.y, c.x - a.x), b > a && (a += 2 * Math.PI), c = (b + a) / 2, a = -Math.cos(c), c = -Math.sin(c), new THREE.Vector2(a, c)) : d.multiplyScalar(g).addSelf(h).subSelf(a).clone()
    }
    function e(c, d) {
        var e, f;
        for (E = c.length; 0 <= --E;) {
            e = E;
            f = E - 1;
            0 > f && (f = c.length - 1);
            for (var g = 0, h = m + 2 * k, g = 0; g < h; g++) {
                var i = B * g,
                    j = B * (g + 1),
                    l = d + e + i,
                    i = d + f + i,
                    n = d + f + j,
                    j = d + e + j,
                    o = c,
                    p = g,
                    r = h,
                    l = l + N,
                    i = i + N,
                    n = n + N,
                    j = j + N;
                K.faces.push(new THREE.Face4(l, i, n, j, null, null, u));
                l = R.generateSideWallUV(K, a, o, b, l, i, n, j, p, r);
                K.faceVertexUvs[0].push(l)
            }
        }
    }
    function f(a, b, c) {
        K.vertices.push(new THREE.Vertex(new THREE.Vector3(a, b, c)))
    }
    function g(c, d, e, f) {
        c += N;
        d += N;
        e += N;
        K.faces.push(new THREE.Face3(c, d, e, null, null, s));
        c = f ? R.generateBottomUV(K, a, b, c, d, e) : R.generateTopUV(K, a, b, c, d, e);
        K.faceVertexUvs[0].push(c)
    }
    var h = void 0 !== b.amount ? b.amount : 100,
        l = void 0 !== b.bevelThickness ? b.bevelThickness : 6,
        j = void 0 !== b.bevelSize ? b.bevelSize : l - 2,
        k = void 0 !== b.bevelSegments ? b.bevelSegments : 3,
        p = void 0 !== b.bevelEnabled ? b.bevelEnabled : !0,
        m = void 0 !== b.steps ? b.steps : 1,
        o = b.bendPath,
        r = b.extrudePath,
        n, q = !1,
        s = b.material,
        u = b.extrudeMaterial,
        v, t, w, z;
    r && (n = r.getSpacedPoints(m), q = !0, p = !1, v = new THREE.TubeGeometry(r, m, 1, 1, !1, !1), t = new THREE.Vector3, w = new THREE.Vector3, z = new THREE.Vector3);
    p || (j = l = k = 0);
    var F, C, G, K = this,
        N = this.vertices.length;
    o && a.addWrapPath(o);
    var r = a.extractPoints(),
        o = r.shape,
        P = r.holes;
    if (r = !THREE.Shape.Utils.isClockWise(o)) {
        o = o.reverse();
        for (C = 0, G = P.length; C < G; C++) F = P[C], THREE.Shape.Utils.isClockWise(F) && (P[C] = F.reverse());
        r = !1
    }
    var T = THREE.Shape.Utils.triangulateShape(o, P),
        O = o;
    for (C = 0, G = P.length; C < G; C++) F = P[C], o = o.concat(F);
    var J, I, D, i, S, B = o.length,
        A, V = T.length,
        r = [],
        E = 0;
    D = O.length;
    J = D - 1;
    for (I = E + 1; E < D; E++, J++, I++) J === D && (J = 0), I === D && (I = 0), r[E] = d(O[E], O[J], O[I]);
    var aa = [],
        ea, ia = r.concat();
    for (C = 0, G = P.length; C < G; C++) {
        F = P[C];
        ea = [];
        for (E = 0, D = F.length, J = D - 1, I = E + 1; E < D; E++, J++, I++) J === D && (J = 0), I === D && (I = 0), ea[E] = d(F[E], F[J], F[I]);
        aa.push(ea);
        ia = ia.concat(ea)
    }
    for (J = 0; J < k; J++) {
        D = J / k;
        i = l * (1 - D);
        I = j * Math.sin(D * Math.PI / 2);
        for (E = 0, D = O.length; E < D; E++) S = c(O[E], r[E], I), f(S.x, S.y, -i);
        for (C = 0, G = P.length; C < G; C++) {
            F = P[C];
            ea = aa[C];
            for (E = 0, D = F.length; E < D; E++) S = c(F[E], ea[E], I), f(S.x, S.y, -i)
        }
    }
    I = j;
    for (E = 0; E < B; E++) S = p ? c(o[E], ia[E], I) : o[E], q ? (w.copy(v.normals[0]).multiplyScalar(S.x), t.copy(v.binormals[0]).multiplyScalar(S.y), z.copy(n[0]).addSelf(w).addSelf(t), f(z.x, z.y, z.z)) : f(S.x, S.y, 0);
    for (D = 1; D <= m; D++) for (E = 0; E < B; E++) S = p ? c(o[E], ia[E], I) : o[E], q ? (w.copy(v.normals[D]).multiplyScalar(S.x), t.copy(v.binormals[D]).multiplyScalar(S.y), z.copy(n[D]).addSelf(w).addSelf(t), f(z.x, z.y, z.z)) : f(S.x, S.y, h / m * D);
    for (J = k - 1; 0 <= J; J--) {
        D = J / k;
        i = l * (1 - D);
        I = j * Math.sin(D * Math.PI / 2);
        for (E = 0, D = O.length; E < D; E++) S = c(O[E], r[E], I), f(S.x, S.y, h + i);
        for (C = 0, G = P.length; C < G; C++) {
            F = P[C];
            ea = aa[C];
            for (E = 0, D = F.length; E < D; E++) S = c(F[E], ea[E], I), q ? f(S.x, S.y + n[m - 1].y, n[m - 1].x + i) : f(S.x, S.y, h + i)
        }
    }
    var R = THREE.ExtrudeGeometry.WorldUVGenerator;
    (function () {
        if (p) {
            var a;
            a = 0 * B;
            for (E = 0; E < V; E++) A = T[E], g(A[2] + a, A[1] + a, A[0] + a, !0);
            a = m + 2 * k;
            a *= B;
            for (E = 0; E < V; E++) A = T[E], g(A[0] + a, A[1] + a, A[2] + a, !1)
        } else {
            for (E = 0; E < V; E++) A = T[E], g(A[2], A[1], A[0], !0);
            for (E = 0; E < V; E++) A = T[E], g(A[0] + B * m, A[1] + B * m, A[2] + B * m, !1)
        }
    })();
    (function () {
        var a = 0;
        e(O, a);
        a += O.length;
        for (C = 0, G = P.length; C < G; C++) F = P[C], e(F, a), a += F.length
    })()
};
THREE.ExtrudeGeometry.WorldUVGenerator = {
    generateTopUV: function (a, b, c, d, e, f) {
        b = a.vertices[e].position.x;
        e = a.vertices[e].position.y;
        c = a.vertices[f].position.x;
        f = a.vertices[f].position.y;
        return [new THREE.UV(a.vertices[d].position.x, 1 - a.vertices[d].position.y), new THREE.UV(b, 1 - e), new THREE.UV(c, 1 - f)]
    },
    generateBottomUV: function (a, b, c, d, e, f) {
        return this.generateTopUV(a, b, c, d, e, f)
    },
    generateSideWallUV: function (a, b, c, d, e, f, g, h) {
        var b = a.vertices[e].position.x,
            c = a.vertices[e].position.y,
            e = a.vertices[e].position.z,
            d = a.vertices[f].position.x,
            l = a.vertices[f].position.y,
            f = a.vertices[f].position.z,
            j = a.vertices[g].position.x,
            k = a.vertices[g].position.y,
            g = a.vertices[g].position.z,
            p = a.vertices[h].position.x,
            m = a.vertices[h].position.y,
            a = a.vertices[h].position.z;
        return 0.01 > Math.abs(c - l) ? [new THREE.UV(b, e), new THREE.UV(d, f), new THREE.UV(j, g), new THREE.UV(p, a)] : [new THREE.UV(c, e), new THREE.UV(l, f), new THREE.UV(k, g), new THREE.UV(m, a)]
    }
};
THREE.ExtrudeGeometry.__v1 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v2 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v3 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v4 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v5 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v6 = new THREE.Vector2;
THREE.LatheGeometry = function (a, b, c) {
    THREE.Geometry.call(this);
    this.steps = b || 12;
    this.angle = c || 2 * Math.PI;
    for (var b = this.angle / this.steps, c = [], d = [], e = [], f = [], g = (new THREE.Matrix4).makeRotationZ(b), h = 0; h < a.length; h++) this.vertices.push(new THREE.Vertex(a[h])), c[h] = a[h].clone(), d[h] = this.vertices.length - 1;
    for (var l = 0; l <= this.angle + 0.001; l += b) {
        for (h = 0; h < c.length; h++) l < this.angle ? (c[h] = g.multiplyVector3(c[h].clone()), this.vertices.push(new THREE.Vertex(c[h])), e[h] = this.vertices.length - 1) : e = f;
        0 == l && (f = d);
        for (h = 0; h < d.length - 1; h++) this.faces.push(new THREE.Face4(e[h], e[h + 1], d[h + 1], d[h])), this.faceVertexUvs[0].push([new THREE.UV(1 - l / this.angle, h / a.length), new THREE.UV(1 - l / this.angle, (h + 1) / a.length), new THREE.UV(1 - (l - b) / this.angle, (h + 1) / a.length), new THREE.UV(1 - (l - b) / this.angle, h / a.length)]);
        d = e;
        e = []
    }
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals()
};
THREE.LatheGeometry.prototype = new THREE.Geometry;
THREE.LatheGeometry.prototype.constructor = THREE.LatheGeometry;
THREE.PlaneGeometry = function (a, b, c, d) {
    THREE.Geometry.call(this);
    for (var e = a / 2, f = b / 2, c = c || 1, d = d || 1, g = c + 1, h = d + 1, l = a / c, j = b / d, k = new THREE.Vector3(0, 1, 0), a = 0; a < h; a++) for (b = 0; b < g; b++) this.vertices.push(new THREE.Vertex(new THREE.Vector3(b * l - e, 0, a * j - f)));
    for (a = 0; a < d; a++) for (b = 0; b < c; b++) e = new THREE.Face4(b + g * a, b + g * (a + 1), b + 1 + g * (a + 1), b + 1 + g * a), e.normal.copy(k), e.vertexNormals.push(k.clone(), k.clone(), k.clone(), k.clone()), this.faces.push(e), this.faceVertexUvs[0].push([new THREE.UV(b / c, a / d), new THREE.UV(b / c, (a + 1) / d), new THREE.UV((b + 1) / c, (a + 1) / d), new THREE.UV((b + 1) / c, a / d)]);
    this.computeCentroids()
};
THREE.PlaneGeometry.prototype = new THREE.Geometry;
THREE.PlaneGeometry.prototype.constructor = THREE.PlaneGeometry;
THREE.SphereGeometry = function (a, b, c, d, e, f, g) {
    THREE.Geometry.call(this);
    var a = a || 50,
        d = void 0 !== d ? d : 0,
        e = void 0 !== e ? e : 2 * Math.PI,
        f = void 0 !== f ? f : 0,
        g = void 0 !== g ? g : Math.PI,
        b = Math.max(3, Math.floor(b) || 8),
        c = Math.max(2, Math.floor(c) || 6),
        h, l, j = [],
        k = [];
    for (l = 0; l <= c; l++) {
        var p = [],
            m = [];
        for (h = 0; h <= b; h++) {
            var o = h / b,
                r = l / c,
                n = -a * Math.cos(d + o * e) * Math.sin(f + r * g),
                q = a * Math.cos(f + r * g),
                s = a * Math.sin(d + o * e) * Math.sin(f + r * g);
            this.vertices.push(new THREE.Vertex(new THREE.Vector3(n, q, s)));
            p.push(this.vertices.length - 1);
            m.push(new THREE.UV(o, r))
        }
        j.push(p);
        k.push(m)
    }
    for (l = 0; l < c; l++) for (h = 0; h < b; h++) {
        var d = j[l][h + 1],
            e = j[l][h],
            f = j[l + 1][h],
            g = j[l + 1][h + 1],
            p = this.vertices[d].position.clone().normalize(),
            m = this.vertices[e].position.clone().normalize(),
            o = this.vertices[f].position.clone().normalize(),
            r = this.vertices[g].position.clone().normalize(),
            n = k[l][h + 1].clone(),
            q = k[l][h].clone(),
            s = k[l + 1][h].clone(),
            u = k[l + 1][h + 1].clone();
        Math.abs(this.vertices[d].position.y) == a ? (this.faces.push(new THREE.Face3(d, f, g, [p, o, r])), this.faceVertexUvs[0].push([n, s, u])) : Math.abs(this.vertices[f].position.y) == a ? (this.faces.push(new THREE.Face3(d, e, f, [p, m, o])), this.faceVertexUvs[0].push([n, q, s])) : (this.faces.push(new THREE.Face4(d, e, f, g, [p, m, o, r])), this.faceVertexUvs[0].push([n, q, s, u]))
    }
    this.computeCentroids();
    this.computeFaceNormals();
    this.boundingSphere = {
        radius: a
    }
};
THREE.SphereGeometry.prototype = new THREE.Geometry;
THREE.SphereGeometry.prototype.constructor = THREE.SphereGeometry;
THREE.TextGeometry = function (a, b) {
    var c = (new THREE.TextPath(a, b)).toShapes();
    b.amount = void 0 !== b.height ? b.height : 50;
    if (void 0 === b.bevelThickness) b.bevelThickness = 10;
    if (void 0 === b.bevelSize) b.bevelSize = 8;
    if (void 0 === b.bevelEnabled) b.bevelEnabled = !1;
    if (b.bend) {
        var d = c[c.length - 1].getBoundingBox().maxX;
        b.bendPath = new THREE.QuadraticBezierCurve(new THREE.Vector2(0, 0), new THREE.Vector2(d / 2, 120), new THREE.Vector2(d, 0))
    }
    THREE.ExtrudeGeometry.call(this, c, b)
};
THREE.TextGeometry.prototype = new THREE.ExtrudeGeometry;
THREE.TextGeometry.prototype.constructor = THREE.TextGeometry;
THREE.FontUtils = {
    faces: {},
    face: "helvetiker",
    weight: "normal",
    style: "normal",
    size: 150,
    divisions: 10,
    getFace: function () {
        return this.faces[this.face][this.weight][this.style]
    },
    loadFace: function (a) {
        var b = a.familyName.toLowerCase();
        this.faces[b] = this.faces[b] || {};
        this.faces[b][a.cssFontWeight] = this.faces[b][a.cssFontWeight] || {};
        this.faces[b][a.cssFontWeight][a.cssFontStyle] = a;
        return this.faces[b][a.cssFontWeight][a.cssFontStyle] = a
    },
    drawText: function (a) {
        for (var b = this.getFace(), c = this.size / b.resolution, d = 0, e = ("" + a).split(""), f = e.length, g = [], a = 0; a < f; a++) {
            var h = new THREE.Path,
                h = this.extractGlyphPoints(e[a], b, c, d, h),
                d = d + h.offset;
            g.push(h.path)
        }
        return {
            paths: g,
            offset: d / 2
        }
    },
    extractGlyphPoints: function (a, b, c, d, e) {
        var f = [],
            g, h, l, j, k, p, m, o, r, n, q, s = b.glyphs[a] || b.glyphs["?"];
        if (s) {
            if (s.o) {
                b = s._cachedOutline || (s._cachedOutline = s.o.split(" "));
                j = b.length;
                for (a = 0; a < j;) switch (l = b[a++], l) {
                case "m":
                    l = b[a++] * c + d;
                    k = b[a++] * c;
                    f.push(new THREE.Vector2(l, k));
                    e.moveTo(l, k);
                    break;
                case "l":
                    l = b[a++] * c + d;
                    k = b[a++] * c;
                    f.push(new THREE.Vector2(l, k));
                    e.lineTo(l, k);
                    break;
                case "q":
                    l = b[a++] * c + d;
                    k = b[a++] * c;
                    o = b[a++] * c + d;
                    r = b[a++] * c;
                    e.quadraticCurveTo(o, r, l, k);
                    if (g = f[f.length - 1]) {
                        p = g.x;
                        m = g.y;
                        for (g = 1, h = this.divisions; g <= h; g++) {
                            var u = g / h,
                                v = THREE.Shape.Utils.b2(u, p, o, l),
                                u = THREE.Shape.Utils.b2(u, m, r, k);
                            f.push(new THREE.Vector2(v, u))
                        }
                    }
                    break;
                case "b":
                    if (l = b[a++] * c + d, k = b[a++] * c, o = b[a++] * c + d, r = b[a++] * -c, n = b[a++] * c + d, q = b[a++] * -c, e.bezierCurveTo(l, k, o, r, n, q), g = f[f.length - 1]) {
                        p = g.x;
                        m = g.y;
                        for (g = 1, h = this.divisions; g <= h; g++) u = g / h, v = THREE.Shape.Utils.b3(u, p, o, n, l), u = THREE.Shape.Utils.b3(u, m, r, q, k), f.push(new THREE.Vector2(v, u))
                    }
                }
            }
            return {
                offset: s.ha * c,
                points: f,
                path: e
            }
        }
    }
};
(function (a) {
    var b = function (a) {
            for (var b = a.length, e = 0, f = b - 1, g = 0; g < b; f = g++) e += a[f].x * a[g].y - a[g].x * a[f].y;
            return 0.5 * e
        };
    a.Triangulate = function (a, d) {
        var e = a.length;
        if (3 > e) return null;
        var f = [],
            g = [],
            h = [],
            l, j, k;
        if (0 < b(a)) for (j = 0; j < e; j++) g[j] = j;
        else for (j = 0; j < e; j++) g[j] = e - 1 - j;
        var p = 2 * e;
        for (j = e - 1; 2 < e;) {
            if (0 >= p--) {
                console.log("Warning, unable to triangulate polygon!");
                break
            }
            l = j;
            e <= l && (l = 0);
            j = l + 1;
            e <= j && (j = 0);
            k = j + 1;
            e <= k && (k = 0);
            var m;
            a: {
                m = a;
                var o = l,
                    r = j,
                    n = k,
                    q = e,
                    s = g,
                    u = void 0,
                    v = void 0,
                    t = void 0,
                    w = void 0,
                    z = void 0,
                    F = void 0,
                    C = void 0,
                    G = void 0,
                    K = void 0,
                    v = m[s[o]].x,
                    t = m[s[o]].y,
                    w = m[s[r]].x,
                    z = m[s[r]].y,
                    F = m[s[n]].x,
                    C = m[s[n]].y;
                if (1.0E-10 > (w - v) * (C - t) - (z - t) * (F - v)) m = !1;
                else {
                    for (u = 0; u < q; u++) if (!(u == o || u == r || u == n)) {
                        var G = m[s[u]].x,
                            K = m[s[u]].y,
                            N = void 0,
                            P = void 0,
                            T = void 0,
                            O = void 0,
                            J = void 0,
                            I = void 0,
                            D = void 0,
                            i = void 0,
                            S = void 0,
                            B = void 0,
                            A = void 0,
                            V = void 0,
                            N = T = J = void 0,
                            N = F - w,
                            P = C - z,
                            T = v - F,
                            O = t - C,
                            J = w - v,
                            I = z - t,
                            D = G - v,
                            i = K - t,
                            S = G - w,
                            B = K - z,
                            A = G - F,
                            V = K - C,
                            N = N * B - P * S,
                            J = J * i - I * D,
                            T = T * V - O * A;
                        if (0 <= N && 0 <= T && 0 <= J) {
                            m = !1;
                            break a
                        }
                    }
                    m = !0
                }
            }
            if (m) {
                f.push([a[g[l]], a[g[j]], a[g[k]]]);
                h.push([g[l], g[j], g[k]]);
                for (l = j, k = j + 1; k < e; l++, k++) g[l] = g[k];
                e--;
                p = 2 * e
            }
        }
        return d ? h : f
    };
    a.Triangulate.area = b;
    return a
})(THREE.FontUtils);
self._typeface_js = {
    faces: THREE.FontUtils.faces,
    loadFace: THREE.FontUtils.loadFace
};
THREE.TorusGeometry = function (a, b, c, d, e) {
    THREE.Geometry.call(this);
    this.radius = a || 100;
    this.tube = b || 40;
    this.segmentsR = c || 8;
    this.segmentsT = d || 6;
    this.arc = e || 2 * Math.PI;
    e = new THREE.Vector3;
    a = [];
    b = [];
    for (c = 0; c <= this.segmentsR; c++) for (d = 0; d <= this.segmentsT; d++) {
        var f = d / this.segmentsT * this.arc,
            g = 2 * c / this.segmentsR * Math.PI;
        e.x = this.radius * Math.cos(f);
        e.y = this.radius * Math.sin(f);
        var h = new THREE.Vector3;
        h.x = (this.radius + this.tube * Math.cos(g)) * Math.cos(f);
        h.y = (this.radius + this.tube * Math.cos(g)) * Math.sin(f);
        h.z = this.tube * Math.sin(g);
        this.vertices.push(new THREE.Vertex(h));
        a.push(new THREE.UV(d / this.segmentsT, 1 - c / this.segmentsR));
        b.push(h.clone().subSelf(e).normalize())
    }
    for (c = 1; c <= this.segmentsR; c++) for (d = 1; d <= this.segmentsT; d++) {
        var e = (this.segmentsT + 1) * c + d - 1,
            f = (this.segmentsT + 1) * (c - 1) + d - 1,
            g = (this.segmentsT + 1) * (c - 1) + d,
            h = (this.segmentsT + 1) * c + d,
            l = new THREE.Face4(e, f, g, h, [b[e], b[f], b[g], b[h]]);
        l.normal.addSelf(b[e]);
        l.normal.addSelf(b[f]);
        l.normal.addSelf(b[g]);
        l.normal.addSelf(b[h]);
        l.normal.normalize();
        this.faces.push(l);
        this.faceVertexUvs[0].push([a[e].clone(), a[f].clone(), a[g].clone(), a[h].clone()])
    }
    this.computeCentroids()
};
THREE.TorusGeometry.prototype = new THREE.Geometry;
THREE.TorusGeometry.prototype.constructor = THREE.TorusGeometry;
THREE.TorusKnotGeometry = function (a, b, c, d, e, f, g) {
    function h(a, b, c, d, e, f) {
        var g = Math.cos(a);
        Math.cos(b);
        b = Math.sin(a);
        a *= c / d;
        c = Math.cos(a);
        g *= 0.5 * e * (2 + c);
        b = 0.5 * e * (2 + c) * b;
        e = 0.5 * f * e * Math.sin(a);
        return new THREE.Vector3(g, b, e)
    }
    THREE.Geometry.call(this);
    this.radius = a || 200;
    this.tube = b || 40;
    this.segmentsR = c || 64;
    this.segmentsT = d || 8;
    this.p = e || 2;
    this.q = f || 3;
    this.heightScale = g || 1;
    this.grid = Array(this.segmentsR);
    c = new THREE.Vector3;
    d = new THREE.Vector3;
    e = new THREE.Vector3;
    for (a = 0; a < this.segmentsR; ++a) {
        this.grid[a] = Array(this.segmentsT);
        for (b = 0; b < this.segmentsT; ++b) {
            var l = 2 * (a / this.segmentsR) * this.p * Math.PI,
                g = 2 * (b / this.segmentsT) * Math.PI,
                f = h(l, g, this.q, this.p, this.radius, this.heightScale),
                l = h(l + 0.01, g, this.q, this.p, this.radius, this.heightScale);
            c.sub(l, f);
            d.add(l, f);
            e.cross(c, d);
            d.cross(e, c);
            e.normalize();
            d.normalize();
            l = -this.tube * Math.cos(g);
            g = this.tube * Math.sin(g);
            f.x += l * d.x + g * e.x;
            f.y += l * d.y + g * e.y;
            f.z += l * d.z + g * e.z;
            this.grid[a][b] = this.vertices.push(new THREE.Vertex(new THREE.Vector3(f.x, f.y, f.z))) - 1
        }
    }
    for (a = 0; a < this.segmentsR; ++a) for (b = 0; b < this.segmentsT; ++b) {
        var e = (a + 1) % this.segmentsR,
            f = (b + 1) % this.segmentsT,
            c = this.grid[a][b],
            d = this.grid[e][b],
            e = this.grid[e][f],
            f = this.grid[a][f],
            g = new THREE.UV(a / this.segmentsR, b / this.segmentsT),
            l = new THREE.UV((a + 1) / this.segmentsR, b / this.segmentsT),
            j = new THREE.UV((a + 1) / this.segmentsR, (b + 1) / this.segmentsT),
            k = new THREE.UV(a / this.segmentsR, (b + 1) / this.segmentsT);
        this.faces.push(new THREE.Face4(c, d, e, f));
        this.faceVertexUvs[0].push([g, l, j, k])
    }
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals()
};
THREE.TorusKnotGeometry.prototype = new THREE.Geometry;
THREE.TorusKnotGeometry.prototype.constructor = THREE.TorusKnotGeometry;
THREE.TubeGeometry = function (a, b, c, d, e, f) {
    THREE.Geometry.call(this);
    this.path = a;
    this.segments = b || 64;
    this.radius = c || 1;
    this.segmentsRadius = d || 8;
    this.closed = e || !1;
    if (f) this.debug = new THREE.Object3D;
    this.grid = [];
    var b = new THREE.Vector3,
        g = new THREE.Vector3,
        h = new THREE.Vector3,
        b = new THREE.Vector3,
        g = new THREE.Matrix4,
        d = [],
        f = [],
        l = [],
        j = this.segments + 1,
        k, p, m, o;
    this.tangents = d;
    this.normals = f;
    this.binormals = l;
    for (a = 0; a < j; a++) h = a / (j - 1), d[a] = this.path.getTangentAt(h), d[a].normalize();
    f[0] = new THREE.Vector3;
    l[0] = new THREE.Vector3;
    a = Number.MAX_VALUE;
    h = Math.abs(d[0].x);
    k = Math.abs(d[0].y);
    p = Math.abs(d[0].z);
    h <= a && (a = h, b.set(1, 0, 0));
    k <= a && (a = k, b.set(0, 1, 0));
    p <= a && b.set(0, 0, 1);
    f[0].cross(d[0], b);
    l[0].cross(d[0], f[0]);
    for (a = 1; a < j; a++) f[a] = f[a - 1].clone(), l[a] = l[a - 1].clone(), b.cross(d[a - 1], d[a]), 1.0E-4 < b.length() && (b.normalize(), h = Math.acos(d[a - 1].dot(d[a])), g.makeRotationAxis(b, h).multiplyVector3(f[a])), l[a].cross(d[a], f[a]);
    if (this.closed) {
        h = Math.acos(f[0].dot(f[j - 1]));
        h /= j - 1;
        0 < d[0].dot(b.cross(f[0], f[j - 1])) && (h = -h);
        for (a = 1; a < j; a++) g.makeRotationAxis(d[a], h * a).multiplyVector3(f[a]), l[a].cross(d[a], f[a])
    }
    for (a = 0; a < j; a++) {
        this.grid[a] = [];
        h = a / (j - 1);
        k = this.path.getPointAt(h);
        b = d[a];
        g = f[a];
        h = l[a];
        this.debug && (this.debug.add(new THREE.ArrowHelper(b, k, c, 255)), this.debug.add(new THREE.ArrowHelper(g, k, c, 16711680)), this.debug.add(new THREE.ArrowHelper(h, k, c, 65280)));
        for (b = 0; b < this.segmentsRadius; b++) m = 2 * (b / this.segmentsRadius) * Math.PI, p = -this.radius * Math.cos(m), m = this.radius * Math.sin(m), o = (new THREE.Vector3).copy(k), o.x += p * g.x + m * h.x, o.y += p * g.y + m * h.y, o.z += p * g.z + m * h.z, this.grid[a][b] = this.vertices.push(new THREE.Vertex(new THREE.Vector3(o.x, o.y, o.z))) - 1
    }
    for (a = 0; a < this.segments; a++) for (b = 0; b < this.segmentsRadius; b++) f = e ? (a + 1) % this.segments : a + 1, l = (b + 1) % this.segmentsRadius, c = this.grid[a][b], d = this.grid[f][b], f = this.grid[f][l], l = this.grid[a][l], j = new THREE.UV(a / this.segments, b / this.segmentsRadius), g = new THREE.UV((a + 1) / this.segments, b / this.segmentsRadius), h = new THREE.UV((a + 1) / this.segments, (b + 1) / this.segmentsRadius), k = new THREE.UV(a / this.segments, (b + 1) / this.segmentsRadius), this.faces.push(new THREE.Face4(c, d, f, l)), this.faceVertexUvs[0].push([j, g, h, k]);
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals()
};
THREE.TubeGeometry.prototype = new THREE.Geometry;
THREE.TubeGeometry.prototype.constructor = THREE.TubeGeometry;
THREE.PolyhedronGeometry = function (a, b, c, d) {
    function e(a) {
        var b = new THREE.Vertex(a.normalize());
        b.index = l.vertices.push(b) - 1;
        var c = Math.atan2(a.z, -a.x) / 2 / Math.PI + 0.5,
            a = Math.atan2(-a.y, Math.sqrt(a.x * a.x + a.z * a.z)) / Math.PI + 0.5;
        b.uv = new THREE.UV(c, a);
        return b
    }
    function f(a, b, c, d) {
        1 > d ? (d = new THREE.Face3(a.index, b.index, c.index, [a.position.clone(), b.position.clone(), c.position.clone()]), d.centroid.addSelf(a.position).addSelf(b.position).addSelf(c.position).divideScalar(3), d.normal = d.centroid.clone().normalize(), l.faces.push(d), d = Math.atan2(d.centroid.z, -d.centroid.x), l.faceVertexUvs[0].push([h(a.uv, a.position, d), h(b.uv, b.position, d), h(c.uv, c.position, d)])) : (d -= 1, f(a, g(a, b), g(a, c), d), f(g(a, b), b, g(b, c), d), f(g(a, c), g(b, c), c, d), f(g(a, b), g(b, c), g(a, c), d))
    }
    function g(a, b) {
        p[a.index] || (p[a.index] = []);
        p[b.index] || (p[b.index] = []);
        var c = p[a.index][b.index];
        void 0 === c && (p[a.index][b.index] = p[b.index][a.index] = c = e((new THREE.Vector3).add(a.position, b.position).divideScalar(2)));
        return c
    }
    function h(a, b, c) {
        0 > c && 1 === a.u && (a = new THREE.UV(a.u - 1, a.v));
        0 === b.x && 0 === b.z && (a = new THREE.UV(c / 2 / Math.PI + 0.5, a.v));
        return a
    }
    THREE.Geometry.call(this);
    for (var c = c || 1, d = d || 0, l = this, j = 0, k = a.length; j < k; j++) e(new THREE.Vector3(a[j][0], a[j][1], a[j][2]));
    for (var p = [], a = this.vertices, j = 0, k = b.length; j < k; j++) f(a[b[j][0]], a[b[j][1]], a[b[j][2]], d);
    this.mergeVertices();
    j = 0;
    for (k = this.vertices.length; j < k; j++) this.vertices[j].position.multiplyScalar(c);
    this.computeCentroids();
    this.boundingSphere = {
        radius: c
    }
};
THREE.PolyhedronGeometry.prototype = new THREE.Geometry;
THREE.PolyhedronGeometry.prototype.constructor = THREE.PolyhedronGeometry;
THREE.IcosahedronGeometry = function (a, b) {
    var c = (1 + Math.sqrt(5)) / 2;
    THREE.PolyhedronGeometry.call(this, [
        [-1, c, 0],
        [1, c, 0],
        [-1, -c, 0],
        [1, -c, 0],
        [0, -1, c],
        [0, 1, c],
        [0, -1, -c],
        [0, 1, -c],
        [c, 0, -1],
        [c, 0, 1],
        [-c, 0, -1],
        [-c, 0, 1]
    ], [
        [0, 11, 5],
        [0, 5, 1],
        [0, 1, 7],
        [0, 7, 10],
        [0, 10, 11],
        [1, 5, 9],
        [5, 11, 4],
        [11, 10, 2],
        [10, 7, 6],
        [7, 1, 8],
        [3, 9, 4],
        [3, 4, 2],
        [3, 2, 6],
        [3, 6, 8],
        [3, 8, 9],
        [4, 9, 5],
        [2, 4, 11],
        [6, 2, 10],
        [8, 6, 7],
        [9, 8, 1]
    ], a, b)
};
THREE.IcosahedronGeometry.prototype = new THREE.Geometry;
THREE.IcosahedronGeometry.prototype.constructor = THREE.IcosahedronGeometry;
THREE.OctahedronGeometry = function (a, b) {
    THREE.PolyhedronGeometry.call(this, [
        [1, 0, 0],
        [-1, 0, 0],
        [0, 1, 0],
        [0, -1, 0],
        [0, 0, 1],
        [0, 0, -1]
    ], [
        [0, 2, 4],
        [0, 4, 3],
        [0, 3, 5],
        [0, 5, 2],
        [1, 2, 5],
        [1, 5, 3],
        [1, 3, 4],
        [1, 4, 2]
    ], a, b)
};
THREE.OctahedronGeometry.prototype = new THREE.Geometry;
THREE.OctahedronGeometry.prototype.constructor = THREE.OctahedronGeometry;
THREE.TetrahedronGeometry = function (a, b) {
    THREE.PolyhedronGeometry.call(this, [
        [1, 1, 1],
        [-1, -1, 1],
        [-1, 1, -1],
        [1, -1, -1]
    ], [
        [2, 1, 0],
        [0, 3, 2],
        [1, 3, 0],
        [2, 3, 1]
    ], a, b)
};
THREE.TetrahedronGeometry.prototype = new THREE.Geometry;
THREE.TetrahedronGeometry.prototype.constructor = THREE.TetrahedronGeometry;
THREE.AxisHelper = function () {
    THREE.Object3D.call(this);
    var a = new THREE.Geometry;
    a.vertices.push(new THREE.Vertex);
    a.vertices.push(new THREE.Vertex(new THREE.Vector3(0, 100, 0)));
    var b = new THREE.CylinderGeometry(0, 5, 25, 5, 1),
        c;
    c = new THREE.Line(a, new THREE.LineBasicMaterial({
        color: 16711680
    }));
    c.rotation.z = -Math.PI / 2;
    this.add(c);
    c = new THREE.Mesh(b, new THREE.MeshBasicMaterial({
        color: 16711680
    }));
    c.position.x = 100;
    c.rotation.z = -Math.PI / 2;
    this.add(c);
    c = new THREE.Line(a, new THREE.LineBasicMaterial({
        color: 65280
    }));
    this.add(c);
    c = new THREE.Mesh(b, new THREE.MeshBasicMaterial({
        color: 65280
    }));
    c.position.y = 100;
    this.add(c);
    c = new THREE.Line(a, new THREE.LineBasicMaterial({
        color: 255
    }));
    c.rotation.x = Math.PI / 2;
    this.add(c);
    c = new THREE.Mesh(b, new THREE.MeshBasicMaterial({
        color: 255
    }));
    c.position.z = 100;
    c.rotation.x = Math.PI / 2;
    this.add(c)
};
THREE.AxisHelper.prototype = new THREE.Object3D;
THREE.AxisHelper.prototype.constructor = THREE.AxisHelper;
THREE.ArrowHelper = function (a, b, c, d) {
    THREE.Object3D.call(this);
    void 0 === d && (d = 16776960);
    void 0 === c && (c = 20);
    var e = new THREE.Geometry;
    e.vertices.push(new THREE.Vertex(new THREE.Vector3(0, 0, 0)));
    e.vertices.push(new THREE.Vertex(new THREE.Vector3(0, 1, 0)));
    this.line = new THREE.Line(e, new THREE.LineBasicMaterial({
        color: d
    }));
    this.add(this.line);
    e = new THREE.CylinderGeometry(0, 0.05, 0.25, 5, 1);
    this.cone = new THREE.Mesh(e, new THREE.MeshBasicMaterial({
        color: d
    }));
    this.cone.position.set(0, 1, 0);
    this.add(this.cone);
    if (b instanceof THREE.Vector3) this.position = b;
    this.setDirection(a);
    this.setLength(c)
};
THREE.ArrowHelper.prototype = new THREE.Object3D;
THREE.ArrowHelper.prototype.constructor = THREE.ArrowHelper;
THREE.ArrowHelper.prototype.setDirection = function (a) {
    var b = (new THREE.Vector3(0, 1, 0)).crossSelf(a),
        a = Math.acos((new THREE.Vector3(0, 1, 0)).dot(a.clone().normalize()));
    this.matrix = (new THREE.Matrix4).makeRotationAxis(b.normalize(), a);
    this.rotation.getRotationFromMatrix(this.matrix, this.scale)
};
THREE.ArrowHelper.prototype.setLength = function (a) {
    this.scale.set(a, a, a)
};
THREE.ArrowHelper.prototype.setColor = function (a) {
    this.line.material.color.setHex(a);
    this.cone.material.color.setHex(a)
};
THREE.CameraHelper = function (a) {
    function b(a, b, d) {
        c(a, d);
        c(b, d)
    }
    function c(a, b) {
        d.lineGeometry.vertices.push(new THREE.Vertex(new THREE.Vector3));
        d.lineGeometry.colors.push(new THREE.Color(b));
        void 0 === d.pointMap[a] && (d.pointMap[a] = []);
        d.pointMap[a].push(d.lineGeometry.vertices.length - 1)
    }
    THREE.Object3D.call(this);
    var d = this;
    this.lineGeometry = new THREE.Geometry;
    this.lineMaterial = new THREE.LineBasicMaterial({
        color: 16777215,
        vertexColors: THREE.FaceColors
    });
    this.pointMap = {};
    b("n1", "n2", 16755200);
    b("n2", "n4", 16755200);
    b("n4", "n3", 16755200);
    b("n3", "n1", 16755200);
    b("f1", "f2", 16755200);
    b("f2", "f4", 16755200);
    b("f4", "f3", 16755200);
    b("f3", "f1", 16755200);
    b("n1", "f1", 16755200);
    b("n2", "f2", 16755200);
    b("n3", "f3", 16755200);
    b("n4", "f4", 16755200);
    b("p", "n1", 16711680);
    b("p", "n2", 16711680);
    b("p", "n3", 16711680);
    b("p", "n4", 16711680);
    b("u1", "u2", 43775);
    b("u2", "u3", 43775);
    b("u3", "u1", 43775);
    b("c", "t", 16777215);
    b("p", "c", 3355443);
    b("cn1", "cn2", 3355443);
    b("cn3", "cn4", 3355443);
    b("cf1", "cf2", 3355443);
    b("cf3", "cf4", 3355443);
    this.camera = a;
    this.update(a);
    this.lines = new THREE.Line(this.lineGeometry, this.lineMaterial, THREE.LinePieces);
    this.add(this.lines)
};
THREE.CameraHelper.prototype = new THREE.Object3D;
THREE.CameraHelper.prototype.constructor = THREE.CameraHelper;
THREE.CameraHelper.prototype.update = function () {
    function a(a, d, e, f) {
        THREE.CameraHelper.__v.set(d, e, f);
        THREE.CameraHelper.__projector.unprojectVector(THREE.CameraHelper.__v, THREE.CameraHelper.__c);
        a = b.pointMap[a];
        if (void 0 !== a) {
            d = 0;
            for (e = a.length; d < e; d++) b.lineGeometry.vertices[a[d]].position.copy(THREE.CameraHelper.__v)
        }
    }
    var b = this;
    THREE.CameraHelper.__c.projectionMatrix.copy(this.camera.projectionMatrix);
    a("c", 0, 0, -1);
    a("t", 0, 0, 1);
    a("n1", -1, -1, -1);
    a("n2", 1, -1, -1);
    a("n3", -1, 1, -1);
    a("n4", 1, 1, -1);
    a("f1", -1, -1, 1);
    a("f2", 1, -1, 1);
    a("f3", -1, 1, 1);
    a("f4", 1, 1, 1);
    a("u1", 0.7, 1.1, -1);
    a("u2", -0.7, 1.1, -1);
    a("u3", 0, 2, -1);
    a("cf1", -1, 0, 1);
    a("cf2", 1, 0, 1);
    a("cf3", 0, -1, 1);
    a("cf4", 0, 1, 1);
    a("cn1", -1, 0, -1);
    a("cn2", 1, 0, -1);
    a("cn3", 0, -1, -1);
    a("cn4", 0, 1, -1);
    this.lineGeometry.__dirtyVertices = !0
};
THREE.CameraHelper.__projector = new THREE.Projector;
THREE.CameraHelper.__v = new THREE.Vector3;
THREE.CameraHelper.__c = new THREE.Camera;
THREE.SubdivisionModifier = function (a) {
    this.subdivisions = void 0 === a ? 1 : a;
    this.useOldVertexColors = !1;
    this.supportUVs = !0
};
THREE.SubdivisionModifier.prototype.constructor = THREE.SubdivisionModifier;
THREE.SubdivisionModifier.prototype.modify = function (a) {
    for (var b = this.subdivisions; 0 < b--;) this.smooth(a)
};
THREE.SubdivisionModifier.prototype.smooth = function (a) {
    function b(a, b, c, d, h, j) {
        var k = new THREE.Face4(a, b, c, d, null, h.color, h.material);
        if (g.useOldVertexColors) {
            k.vertexColors = [];
            for (var l, n, o, p = 0; 4 > p; p++) {
                o = j[p];
                l = new THREE.Color;
                l.setRGB(0, 0, 0);
                for (var r = 0; r < o.length; r++) n = h.vertexColors[o[r] - 1], l.r += n.r, l.g += n.g, l.b += n.b;
                l.r /= o.length;
                l.g /= o.length;
                l.b /= o.length;
                k.vertexColors[p] = l
            }
        }
        e.push(k);
        (!g.supportUVs || 0 != m.length) && f.push([m[a], m[b], m[c], m[d]])
    }
    function c(a, b) {
        return Math.min(a, b) + "_" + Math.max(a, b)
    }
    var d = [],
        e = [],
        f = [],
        g = this,
        h = a.vertices,
        d = a.faces,
        l = h.concat(),
        j = [],
        k = {},
        p = {},
        m = [],
        o, r, n, q, s, u = a.faceVertexUvs[0];
    for (o = 0, r = u.length; o < r; o++) for (n = 0, q = u[o].length; n < q; n++) s = d[o]["abcd".charAt(n)], m[s] || (m[s] = u[o][n]);
    var v;
    for (o = 0, r = d.length; o < r; o++) if (s = d[o], j.push(s.centroid), l.push(new THREE.Vertex(s.centroid)), g.supportUVs && 0 != m.length) {
        v = new THREE.UV;
        if (s instanceof THREE.Face3) v.u = m[s.a].u + m[s.b].u + m[s.c].u, v.v = m[s.a].v + m[s.b].v + m[s.c].v, v.u /= 3, v.v /= 3;
        else if (s instanceof THREE.Face4) v.u = m[s.a].u + m[s.b].u + m[s.c].u + m[s.d].u, v.v = m[s.a].v + m[s.b].v + m[s.c].v + m[s.d].v, v.u /= 4, v.v /= 4;
        m.push(v)
    }
    r = function (a) {
        function b(a, c, d) {
            void 0 === a[c] && (a[c] = []);
            a[c].push(d)
        }
        var d, e, f, g, h = {};
        for (d = 0, e = a.faces.length; d < e; d++) f = a.faces[d], f instanceof THREE.Face3 ? (g = c(f.a, f.b), b(h, g, d), g = c(f.b, f.c), b(h, g, d), g = c(f.c, f.a), b(h, g, d)) : f instanceof THREE.Face4 && (g = c(f.a, f.b), b(h, g, d), g = c(f.b, f.c), b(h, g, d), g = c(f.c, f.d), b(h, g, d), g = c(f.d, f.a), b(h, g, d));
        return h
    }(a);
    var t = 0,
        u = h.length,
        w, z, F = {},
        C = {},
        G = function (a, b) {
            void 0 === F[a] && (F[a] = []);
            F[a].push(b)
        },
        K = function (a, b) {
            void 0 === C[a] && (C[a] = {});
            C[a][b] = null
        };
    for (o in r) {
        v = r[o];
        w = o.split("_");
        z = w[0];
        w = w[1];
        G(z, [z, w]);
        G(w, [z, w]);
        for (n = 0, q = v.length; n < q; n++) s = v[n], K(z, s, o), K(w, s, o);
        2 > v.length && (p[o] = !0)
    }
    for (o in r) if (v = r[o], s = v[0], v = v[1], w = o.split("_"), z = w[0], w = w[1], q = new THREE.Vector3, p[o] ? (q.addSelf(h[z].position), q.addSelf(h[w].position), q.multiplyScalar(0.5)) : (q.addSelf(j[s]), q.addSelf(j[v]), q.addSelf(h[z].position), q.addSelf(h[w].position), q.multiplyScalar(0.25)), k[o] = u + d.length + t, l.push(new THREE.Vertex(q)), t++, g.supportUVs && 0 != m.length) v = new THREE.UV, v.u = m[z].u + m[w].u, v.v = m[z].v + m[w].v, v.u /= 2, v.v /= 2, m.push(v);
    var N, P;
    w = ["123", "12", "2", "23"];
    q = ["123", "23", "3", "31"];
    var G = ["123", "31", "1", "12"],
        K = ["1234", "12", "2", "23"],
        T = ["1234", "23", "3", "34"],
        O = ["1234", "34", "4", "41"],
        J = ["1234", "41", "1", "12"];
    for (o = 0, r = j.length; o < r; o++) s = d[o], v = u + o, s instanceof THREE.Face3 ? (t = c(s.a, s.b), z = c(s.b, s.c), N = c(s.c, s.a), b(v, k[t], s.b, k[z], s, w), b(v, k[z], s.c, k[N], s, q), b(v, k[N], s.a, k[t], s, G)) : s instanceof THREE.Face4 ? (t = c(s.a, s.b), z = c(s.b, s.c), N = c(s.c, s.d), P = c(s.d, s.a), b(v, k[t], s.b, k[z], s, K), b(v, k[z], s.c, k[N], s, T), b(v, k[N], s.d, k[P], s, O), b(v, k[P], s.a, k[t], s, J)) : console.log("face should be a face!", s);
    d = l;
    l = new THREE.Vector3;
    k = new THREE.Vector3;
    for (o = 0, r = h.length; o < r; o++) if (void 0 !== F[o]) {
        l.set(0, 0, 0);
        k.set(0, 0, 0);
        s = new THREE.Vector3(0, 0, 0);
        v = 0;
        for (n in C[o]) l.addSelf(j[n]), v++;
        t = 0;
        u = F[o].length;
        for (n = 0; n < u; n++) p[c(F[o][n][0], F[o][n][1])] && t++;
        if (2 != t) {
            l.divideScalar(v);
            for (n = 0; n < u; n++) v = F[o][n], v = h[v[0]].position.clone().addSelf(h[v[1]].position).divideScalar(2), k.addSelf(v);
            k.divideScalar(u);
            s.addSelf(h[o].position);
            s.multiplyScalar(u - 3);
            s.addSelf(l);
            s.addSelf(k.multiplyScalar(2));
            s.divideScalar(u);
            d[o].position = s
        }
    }
    a.vertices = d;
    a.faces = e;
    a.faceVertexUvs[0] = f;
    delete a.__tmpVertices;
    a.computeCentroids();
    a.computeFaceNormals();
    a.computeVertexNormals()
};
THREE.Loader = function (a) {
    this.statusDomElement = (this.showStatus = a) ? THREE.Loader.prototype.addStatusElement() : null;
    this.onLoadStart = function () {};
    this.onLoadProgress = function () {};
    this.onLoadComplete = function () {}
};
THREE.Loader.prototype = {
    constructor: THREE.Loader,
    crossOrigin: "anonymous",
    addStatusElement: function () {
        var a = document.createElement("div");
        a.style.position = "absolute";
        a.style.right = "0px";
        a.style.top = "0px";
        a.style.fontSize = "0.8em";
        a.style.textAlign = "left";
        a.style.background = "rgba(0,0,0,0.25)";
        a.style.color = "#fff";
        a.style.width = "120px";
        a.style.padding = "0.5em 0.5em 0.5em 0.5em";
        a.style.zIndex = 1E3;
        a.innerHTML = "Loading ...";
        return a
    },
    updateProgress: function (a) {
        var b = "Loaded ",
            b = a.total ? b + ((100 * a.loaded / a.total).toFixed(0) + "%") : b + ((a.loaded / 1E3).toFixed(2) + " KB");
        this.statusDomElement.innerHTML = b
    },
    extractUrlBase: function (a) {
        a = a.split("/");
        a.pop();
        return (1 > a.length ? "." : a.join("/")) + "/"
    },
    initMaterials: function (a, b, c) {
        a.materials = [];
        for (var d = 0; d < b.length; ++d) a.materials[d] = THREE.Loader.prototype.createMaterial(b[d], c)
    },
    hasNormals: function (a) {
        var b, c, d = a.materials.length;
        for (c = 0; c < d; c++) if (b = a.materials[c], b instanceof THREE.ShaderMaterial) return !0;
        return !1
    },
    createMaterial: function (a, b) {
        function c(a) {
            a = Math.log(a) / Math.LN2;
            return Math.floor(a) == a
        }
        function d(a) {
            a = Math.log(a) / Math.LN2;
            return Math.pow(2, Math.round(a))
        }
        function e(a, b) {
            var e = new Image;
            e.onload = function () {
                if (!c(this.width) || !c(this.height)) {
                    var b = d(this.width),
                        e = d(this.height);
                    a.image.width = b;
                    a.image.height = e;
                    a.image.getContext("2d").drawImage(this, 0, 0, b, e)
                } else a.image = this;
                a.needsUpdate = !0
            };
            e.crossOrigin = h.crossOrigin;
            e.src = b
        }
        function f(a, c, d, f, g, h) {
            var j = document.createElement("canvas");
            a[c] = new THREE.Texture(j);
            a[c].sourceFile = d;
            if (f) {
                a[c].repeat.set(f[0], f[1]);
                if (1 != f[0]) a[c].wrapS = THREE.RepeatWrapping;
                if (1 != f[1]) a[c].wrapT = THREE.RepeatWrapping
            }
            g && a[c].offset.set(g[0], g[1]);
            if (h) {
                f = {
                    repeat: THREE.RepeatWrapping,
                    mirror: THREE.MirroredRepeatWrapping
                };
                if (void 0 !== f[h[0]]) a[c].wrapS = f[h[0]];
                if (void 0 !== f[h[1]]) a[c].wrapT = f[h[1]]
            }
            e(a[c], b + "/" + d)
        }
        function g(a) {
            return (255 * a[0] << 16) + (255 * a[1] << 8) + 255 * a[2]
        }
        var h = this,
            l = "MeshLambertMaterial",
            j = {
                color: 15658734,
                opacity: 1,
                map: null,
                lightMap: null,
                normalMap: null,
                wireframe: a.wireframe
            };
        if (a.shading) {
            var k = a.shading.toLowerCase();
            "phong" === k ? l = "MeshPhongMaterial" : "basic" === k && (l = "MeshBasicMaterial")
        }
        if (void 0 !== a.blending && void 0 !== THREE[a.blending]) j.blending = THREE[a.blending];
        if (void 0 !== a.transparent || 1 > a.opacity) j.transparent = a.transparent;
        if (void 0 !== a.depthTest) j.depthTest = a.depthTest;
        if (void 0 !== a.depthWrite) j.depthWrite = a.depthWrite;
        if (void 0 !== a.vertexColors) if ("face" == a.vertexColors) j.vertexColors = THREE.FaceColors;
        else if (a.vertexColors) j.vertexColors = THREE.VertexColors;
        if (a.colorDiffuse) j.color = g(a.colorDiffuse);
        else if (a.DbgColor) j.color = a.DbgColor;
        if (a.colorSpecular) j.specular = g(a.colorSpecular);
        if (a.colorAmbient) j.ambient = g(a.colorAmbient);
        if (a.transparency) j.opacity = a.transparency;
        if (a.specularCoef) j.shininess = a.specularCoef;
        a.mapDiffuse && b && f(j, "map", a.mapDiffuse, a.mapDiffuseRepeat, a.mapDiffuseOffset, a.mapDiffuseWrap);
        a.mapLight && b && f(j, "lightMap", a.mapLight, a.mapLightRepeat, a.mapLightOffset, a.mapLightWrap);
        a.mapNormal && b && f(j, "normalMap", a.mapNormal, a.mapNormalRepeat, a.mapNormalOffset, a.mapNormalWrap);
        a.mapSpecular && b && f(j, "specularMap", a.mapSpecular, a.mapSpecularRepeat, a.mapSpecularOffset, a.mapSpecularWrap);
        if (a.mapNormal) {
            l = THREE.ShaderUtils.lib.normal;
            k = THREE.UniformsUtils.clone(l.uniforms);
            k.tNormal.texture = j.normalMap;
            if (a.mapNormalFactor) k.uNormalScale.value = a.mapNormalFactor;
            if (j.map) k.tDiffuse.texture = j.map, k.enableDiffuse.value = !0;
            if (j.specularMap) k.tSpecular.texture = j.specularMap, k.enableSpecular.value = !0;
            if (j.lightMap) k.tAO.texture = j.lightMap, k.enableAO.value = !0;
            k.uDiffuseColor.value.setHex(j.color);
            k.uSpecularColor.value.setHex(j.specular);
            k.uAmbientColor.value.setHex(j.ambient);
            k.uShininess.value = j.shininess;
            if (void 0 !== j.opacity) k.uOpacity.value = j.opacity;
            j = new THREE.ShaderMaterial({
                fragmentShader: l.fragmentShader,
                vertexShader: l.vertexShader,
                uniforms: k,
                lights: !0,
                fog: !0
            })
        } else j = new THREE[l](j);
        if (void 0 !== a.DbgName) j.name = a.DbgName;
        return j
    }
};
THREE.BinaryLoader = function (a) {
    THREE.Loader.call(this, a)
};
THREE.BinaryLoader.prototype = new THREE.Loader;
THREE.BinaryLoader.prototype.constructor = THREE.BinaryLoader;
THREE.BinaryLoader.prototype.supr = THREE.Loader.prototype;
THREE.BinaryLoader.prototype.load = function (a, b, c, d) {
    var c = c ? c : this.extractUrlBase(a),
        d = d ? d : this.extractUrlBase(a),
        e = this.showProgress ? THREE.Loader.prototype.updateProgress : null;
    this.onLoadStart();
    this.loadAjaxJSON(this, a, b, c, d, e)
};
THREE.BinaryLoader.prototype.loadAjaxJSON = function (a, b, c, d, e, f) {
    var g = new XMLHttpRequest;
    g.onreadystatechange = function () {
        if (4 == g.readyState) if (200 == g.status || 0 == g.status) {
            var h = JSON.parse(g.responseText);
            a.loadAjaxBuffers(h, c, e, d, f)
        } else console.error("THREE.BinaryLoader: Couldn't load [" + b + "] [" + g.status + "]")
    };
    g.open("GET", b, !0);
    g.overrideMimeType && g.overrideMimeType("text/plain; charset=x-user-defined");
    g.setRequestHeader("Content-Type", "text/plain");
    g.send(null)
};
THREE.BinaryLoader.prototype.loadAjaxBuffers = function (a, b, c, d, e) {
    var f = new XMLHttpRequest,
        g = c + "/" + a.buffers,
        h = 0;
    f.onreadystatechange = function () {
        4 == f.readyState ? 200 == f.status || 0 == f.status ? THREE.BinaryLoader.prototype.createBinModel(f.response, b, d, a.materials) : console.error("THREE.BinaryLoader: Couldn't load [" + g + "] [" + f.status + "]") : 3 == f.readyState ? e && (0 == h && (h = f.getResponseHeader("Content-Length")), e({
            total: h,
            loaded: f.responseText.length
        })) : 2 == f.readyState && (h = f.getResponseHeader("Content-Length"))
    };
    f.open("GET", g, !0);
    f.responseType = "arraybuffer";
    f.send(null)
};
THREE.BinaryLoader.prototype.createBinModel = function (a, b, c, d) {
    var e = function (b) {
            var c, e, l, j, k, p, m, o, r, n, q, s, u, v, t;

            function w(a) {
                return a % 4 ? 4 - a % 4 : 0
            }
            function z(a, b) {
                return (new Uint8Array(a, b, 1))[0]
            }
            function F(a, b) {
                return (new Uint32Array(a, b, 1))[0]
            }
            function C(b, c) {
                var d, e, f, g, h, i, j, k, l = new Uint32Array(a, c, 3 * b);
                for (d = 0; d < b; d++) {
                    e = l[3 * d];
                    f = l[3 * d + 1];
                    g = l[3 * d + 2];
                    h = D[2 * e];
                    e = D[2 * e + 1];
                    i = D[2 * f];
                    j = D[2 * f + 1];
                    f = D[2 * g];
                    k = D[2 * g + 1];
                    g = O.faceVertexUvs[0];
                    var m = [];
                    m.push(new THREE.UV(h, e));
                    m.push(new THREE.UV(i, j));
                    m.push(new THREE.UV(f, k));
                    g.push(m)
                }
            }
            function G(b, c) {
                var d, e, f, g, h, i, j, k, l, m, n = new Uint32Array(a, c, 4 * b);
                for (d = 0; d < b; d++) {
                    e = n[4 * d];
                    f = n[4 * d + 1];
                    g = n[4 * d + 2];
                    h = n[4 * d + 3];
                    i = D[2 * e];
                    e = D[2 * e + 1];
                    j = D[2 * f];
                    l = D[2 * f + 1];
                    k = D[2 * g];
                    m = D[2 * g + 1];
                    g = D[2 * h];
                    f = D[2 * h + 1];
                    h = O.faceVertexUvs[0];
                    var o = [];
                    o.push(new THREE.UV(i, e));
                    o.push(new THREE.UV(j, l));
                    o.push(new THREE.UV(k, m));
                    o.push(new THREE.UV(g, f));
                    h.push(o)
                }
            }
            function K(b, c, d) {
                for (var e, f, g, h, c = new Uint32Array(a, c, 3 * b), i = new Uint16Array(a, d, b), d = 0; d < b; d++) e = c[3 * d], f = c[3 * d + 1], g = c[3 * d + 2], h = i[d], O.faces.push(new THREE.Face3(e, f, g, null, null, h))
            }
            function N(b, c, d) {
                for (var e, f, g, h, i, c = new Uint32Array(a, c, 4 * b), j = new Uint16Array(a, d, b), d = 0; d < b; d++) e = c[4 * d], f = c[4 * d + 1], g = c[4 * d + 2], h = c[4 * d + 3], i = j[d], O.faces.push(new THREE.Face4(e, f, g, h, null, null, i))
            }
            function P(b, c, d, e) {
                for (var f, g, h, i, j, k, l, c = new Uint32Array(a, c, 3 * b), d = new Uint32Array(a, d, 3 * b), m = new Uint16Array(a, e, b), e = 0; e < b; e++) {
                    f = c[3 * e];
                    g = c[3 * e + 1];
                    h = c[3 * e + 2];
                    j = d[3 * e];
                    k = d[3 * e + 1];
                    l = d[3 * e + 2];
                    i = m[e];
                    var n = I[3 * k],
                        o = I[3 * k + 1];
                    k = I[3 * k + 2];
                    var p = I[3 * l],
                        r = I[3 * l + 1];
                    l = I[3 * l + 2];
                    O.faces.push(new THREE.Face3(f, g, h, [new THREE.Vector3(I[3 * j], I[3 * j + 1], I[3 * j + 2]), new THREE.Vector3(n, o, k), new THREE.Vector3(p, r, l)], null, i))
                }
            }
            function T(b, c, d, e) {
                for (var f, g, h, i, j, k, l, m, n, c = new Uint32Array(a, c, 4 * b), d = new Uint32Array(a, d, 4 * b), o = new Uint16Array(a, e, b), e = 0; e < b; e++) {
                    f = c[4 * e];
                    g = c[4 * e + 1];
                    h = c[4 * e + 2];
                    i = c[4 * e + 3];
                    k = d[4 * e];
                    l = d[4 * e + 1];
                    m = d[4 * e + 2];
                    n = d[4 * e + 3];
                    j = o[e];
                    var p = I[3 * l],
                        r = I[3 * l + 1];
                    l = I[3 * l + 2];
                    var q = I[3 * m],
                        s = I[3 * m + 1];
                    m = I[3 * m + 2];
                    var t = I[3 * n],
                        u = I[3 * n + 1];
                    n = I[3 * n + 2];
                    O.faces.push(new THREE.Face4(f, g, h, i, [new THREE.Vector3(I[3 * k], I[3 * k + 1], I[3 * k + 2]), new THREE.Vector3(p, r, l), new THREE.Vector3(q, s, m), new THREE.Vector3(t, u, n)], null, j))
                }
            }
            var O = this,
                J = 0,
                I = [],
                D = [],
                i, S, B;
            THREE.Geometry.call(this);
            THREE.Loader.prototype.initMaterials(O, d, b);
            (function (a, b, c) {
                for (var a = new Uint8Array(a, b, c), d = "", e = 0; e < c; e++) d += String.fromCharCode(a[b + e]);
                return d
            })(a, J, 12);
            c = z(a, J + 12);
            z(a, J + 13);
            z(a, J + 14);
            z(a, J + 15);
            e = z(a, J + 16);
            l = z(a, J + 17);
            j = z(a, J + 18);
            k = z(a, J + 19);
            p = F(a, J + 20);
            m = F(a, J + 20 + 4);
            o = F(a, J + 20 + 8);
            b = F(a, J + 20 + 12);
            r = F(a, J + 20 + 16);
            n = F(a, J + 20 + 20);
            q = F(a, J + 20 + 24);
            s = F(a, J + 20 + 28);
            u = F(a, J + 20 + 32);
            v = F(a, J + 20 + 36);
            t = F(a, J + 20 + 40);
            J += c;
            c = 3 * e + k;
            B = 4 * e + k;
            i = b * c;
            S = r * (c + 3 * l);
            e = n * (c + 3 * j);
            k = q * (c + 3 * l + 3 * j);
            c = s * B;
            l = u * (B + 4 * l);
            j = v * (B + 4 * j);
            J +=
            function (b) {
                var b = new Float32Array(a, b, 3 * p),
                    c, d, e, f;
                for (c = 0; c < p; c++) d = b[3 * c], e = b[3 * c + 1], f = b[3 * c + 2], O.vertices.push(new THREE.Vertex(new THREE.Vector3(d, e, f)));
                return 3 * p * Float32Array.BYTES_PER_ELEMENT
            }(J);
            J +=
            function (b) {
                if (m) {
                    var b = new Int8Array(a, b, 3 * m),
                        c, d, e, f;
                    for (c = 0; c < m; c++) d = b[3 * c], e = b[3 * c + 1], f = b[3 * c + 2], I.push(d / 127, e / 127, f / 127)
                }
                return 3 * m * Int8Array.BYTES_PER_ELEMENT
            }(J);
            J += w(3 * m);
            J +=
            function (b) {
                if (o) {
                    var b = new Float32Array(a, b, 2 * o),
                        c, d, e;
                    for (c = 0; c < o; c++) d = b[2 * c], e = b[2 * c + 1], D.push(d, e)
                }
                return 2 * o * Float32Array.BYTES_PER_ELEMENT
            }(J);
            i = J + i + w(2 * b);
            S = i + S + w(2 * r);
            e = S + e + w(2 * n);
            k = e + k + w(2 * q);
            c = k + c + w(2 * s);
            l = c + l + w(2 * u);
            j = l + j + w(2 * v);
            (function (a) {
                if (n) {
                    var b = a + 3 * n * Uint32Array.BYTES_PER_ELEMENT;
                    K(n, a, b + 3 * n * Uint32Array.BYTES_PER_ELEMENT);
                    C(n, b)
                }
            })(S);
            (function (a) {
                if (q) {
                    var b = a + 3 * q * Uint32Array.BYTES_PER_ELEMENT,
                        c = b + 3 * q * Uint32Array.BYTES_PER_ELEMENT;
                    P(q, a, b, c + 3 * q * Uint32Array.BYTES_PER_ELEMENT);
                    C(q, c)
                }
            })(e);
            (function (a) {
                if (v) {
                    var b = a + 4 * v * Uint32Array.BYTES_PER_ELEMENT;
                    N(v, a, b + 4 * v * Uint32Array.BYTES_PER_ELEMENT);
                    G(v, b)
                }
            })(l);
            (function (a) {
                if (t) {
                    var b = a + 4 * t * Uint32Array.BYTES_PER_ELEMENT,
                        c = b + 4 * t * Uint32Array.BYTES_PER_ELEMENT;
                    T(t, a, b, c + 4 * t * Uint32Array.BYTES_PER_ELEMENT);
                    G(t, c)
                }
            })(j);
            b && K(b, J, J + 3 * b * Uint32Array.BYTES_PER_ELEMENT);
            (function (a) {
                if (r) {
                    var b = a + 3 * r * Uint32Array.BYTES_PER_ELEMENT;
                    P(r, a, b, b + 3 * r * Uint32Array.BYTES_PER_ELEMENT)
                }
            })(i);
            s && N(s, k, k + 4 * s * Uint32Array.BYTES_PER_ELEMENT);
            (function (a) {
                if (u) {
                    var b = a + 4 * u * Uint32Array.BYTES_PER_ELEMENT;
                    T(u, a, b, b + 4 * u * Uint32Array.BYTES_PER_ELEMENT)
                }
            })(c);
            this.computeCentroids();
            this.computeFaceNormals();
            THREE.Loader.prototype.hasNormals(this) && this.computeTangents()
        };
    e.prototype = new THREE.Geometry;
    e.prototype.constructor = e;
    b(new e(c))
};
THREE.ColladaLoader = function () {
    function a(a, d, e) {
        Z = a;
        d = d || oa;
        void 0 !== e && (a = e.split("/"), a.pop(), Wa = (1 > a.length ? "." : a.join("/")) + "/");
        if ((a = Z.evaluate("//dae:asset", Z, V, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext()) && a.childNodes) for (e = 0; e < a.childNodes.length; e++) {
            var i = a.childNodes[e];
            switch (i.nodeName) {
            case "unit":
                (i = i.getAttribute("meter")) && parseFloat(i);
                break;
            case "up_axis":
                Xa = i.textContent.charAt(0)
            }
        }
        if (!ga.convertUpAxis || Xa === ga.upAxis) La = null;
        else switch (Xa) {
        case "X":
            La = "Y" === ga.upAxis ? "XtoY" : "XtoZ";
            break;
        case "Y":
            La = "X" === ga.upAxis ? "YtoX" : "YtoZ";
            break;
        case "Z":
            La = "X" === ga.upAxis ? "ZtoX" : "ZtoY"
        }
        Ua = b("//dae:library_images/dae:image", g, "image");
        ab = b("//dae:library_materials/dae:material", G, "material");
        kb = b("//dae:library_effects/dae:effect", O, "effect");
        $a = b("//dae:library_geometries/dae:geometry", q, "geometry");
        db = b(".//dae:library_cameras/dae:camera", B, "camera");
        pa = b("//dae:library_controllers/dae:controller", h, "controller");
        Da = b("//dae:library_animations/dae:animation", I, "animation");
        nb = b(".//dae:library_visual_scenes/dae:visual_scene", k, "visual_scene");
        qa = [];
        va = [];
        (a = Z.evaluate(".//dae:scene/dae:instance_visual_scene", Z, V, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext()) ? (a = a.getAttribute("url").replace(/^#/, ""), Ga = nb[0 < a.length ? a : "visual_scene0"]) : Ga = null;
        ja = new THREE.Object3D;
        for (a = 0; a < Ga.nodes.length; a++) ja.add(f(Ga.nodes[a]));
        hb = [];
        c(ja);
        a = {
            scene: ja,
            morphs: qa,
            skins: va,
            animations: hb,
            dae: {
                images: Ua,
                materials: ab,
                cameras: db,
                effects: kb,
                geometries: $a,
                controllers: pa,
                animations: Da,
                visualScenes: nb,
                scene: Ga
            }
        };
        d && d(a);
        return a
    }
    function b(a, b, c) {
        for (var a = Z.evaluate(a, Z, V, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null), d = {}, e = a.iterateNext(), f = 0; e;) {
            e = (new b).parse(e);
            if (!e.id || 0 == e.id.length) e.id = c + f++;
            d[e.id] = e;
            e = a.iterateNext()
        }
        return d
    }
    function c(a) {
        var b = Ga.getChildById(a.name, !0),
            d = null;
        if (b && b.keys) {
            d = {
                fps: 60,
                hierarchy: [{
                    node: b,
                    keys: b.keys,
                    sids: b.sids
                }],
                node: a,
                name: "animation_" + a.name,
                length: 0
            };
            hb.push(d);
            for (var e = 0, f = b.keys.length; e < f; e++) d.length = Math.max(d.length, b.keys[e].time)
        } else d = {
            hierarchy: [{
                keys: [],
                sids: []
            }]
        };
        e = 0;
        for (f = a.children.length; e < f; e++) for (var b = 0, g = c(a.children[e]).hierarchy.length; b < g; b++) d.hierarchy.push({
            keys: [],
            sids: []
        });
        return d
    }
    function d(a, b, c, e) {
        a.world = a.world || new THREE.Matrix4;
        a.world.copy(a.matrix);
        if (a.channels && a.channels.length) {
            var f = a.channels[0].sampler.output[c];
            f instanceof THREE.Matrix4 && a.world.copy(f)
        }
        e && a.world.multiply(e, a.world);
        b.push(a);
        for (e = 0; e < a.nodes.length; e++) d(a.nodes[e], b, c, a.world)
    }
    function e(a, b, c) {
        var e, f = pa[b.url];
        if (!f || !f.skin) console.log("ColladaLoader: Could not find skin controller.");
        else if (!b.skeleton || !b.skeleton.length) console.log("ColladaLoader: Could not find the skeleton for the skin. ");
        else {
            var c = 1E6,
                g = -c,
                h = 0;
            for (e in Da) for (var i = Da[e], j = 0; j < i.sampler.length; j++) {
                var k = i.sampler[j];
                k.create();
                c = Math.min(c, k.startTime);
                g = Math.max(g, k.endTime);
                h = Math.max(h, k.input.length)
            }
            e = h;
            for (var b = Ga.getChildById(b.skeleton[0], !0) || Ga.getChildBySid(b.skeleton[0], !0), l, m, g = new THREE.Vector3, n, j = 0; j < a.vertices.length; j++) f.skin.bindShapeMatrix.multiplyVector3(a.vertices[j].position);
            for (c = 0; c < e; c++) {
                h = [];
                i = [];
                for (j = 0; j < a.vertices.length; j++) i.push(new THREE.Vertex(new THREE.Vector3));
                d(b, h, c);
                j = h;
                k = f.skin;
                for (m = 0; m < j.length; m++) if (l = j[m], n = -1, "JOINT" == l.type) {
                    for (var o = 0; o < k.joints.length; o++) if (l.sid == k.joints[o]) {
                        n = o;
                        break
                    }
                    if (0 <= n) {
                        o = k.invBindMatrices[n];
                        l.invBindMatrix = o;
                        l.skinningMatrix = new THREE.Matrix4;
                        l.skinningMatrix.multiply(l.world, o);
                        l.weights = [];
                        for (o = 0; o < k.weights.length; o++) for (var p = 0; p < k.weights[o].length; p++) {
                            var r = k.weights[o][p];
                            r.joint == n && l.weights.push(r)
                        }
                    } else throw "ColladaLoader: Could not find joint '" + l.sid + "'.";
                }
                for (j = 0; j < h.length; j++) if ("JOINT" == h[j].type) for (k = 0; k < h[j].weights.length; k++) l = h[j].weights[k], m = l.index, l = l.weight, n = a.vertices[m], m = i[m], g.x = n.position.x, g.y = n.position.y, g.z = n.position.z, h[j].skinningMatrix.multiplyVector3(g), m.position.x += g.x * l, m.position.y += g.y * l, m.position.z += g.z * l;
                a.morphTargets.push({
                    name: "target_" + c,
                    vertices: i
                })
            }
        }
    }
    function f(a) {
        var b = new THREE.Object3D,
            c, d, g, h;
        for (g = 0; g < a.controllers.length; g++) {
            var j = pa[a.controllers[g].url];
            switch (j.type) {
            case "skin":
                if ($a[j.skin.source]) {
                    var i = new n;
                    i.url = j.skin.source;
                    i.instance_material = a.controllers[g].instance_material;
                    a.geometries.push(i);
                    c = a.controllers[g]
                } else if (pa[j.skin.source] && (d = j = pa[j.skin.source], j.morph && $a[j.morph.source])) i = new n, i.url = j.morph.source, i.instance_material = a.controllers[g].instance_material, a.geometries.push(i);
                break;
            case "morph":
                if ($a[j.morph.source]) i = new n, i.url = j.morph.source, i.instance_material = a.controllers[g].instance_material, a.geometries.push(i), d = a.controllers[g];
                console.log("ColladaLoader: Morph-controller partially supported.")
            }
        }
        for (g = 0; g < a.geometries.length; g++) {
            var j = a.geometries[g],
                i = j.instance_material,
                j = $a[j.url],
                l = {},
                k = [],
                m = 0,
                p;
            if (j && j.mesh && j.mesh.primitives) {
                if (0 == b.name.length) b.name = j.id;
                if (i) for (h = 0; h < i.length; h++) {
                    p = i[h];
                    var r = ab[p.target],
                        q = kb[r.instance_effect.url].shader;
                    q.material.opacity = !q.material.opacity ? 1 : q.material.opacity;
                    l[p.symbol] = m;
                    k.push(q.material);
                    p = q.material;
                    p.name = null == r.name || "" === r.name ? r.id : r.name;
                    m++
                }
                i = p || new THREE.MeshLambertMaterial({
                    color: 14540253,
                    shading: THREE.FlatShading
                });
                j = j.mesh.geometry3js;
                if (1 < m) {
                    i = new THREE.MeshFaceMaterial;
                    j.materials = k;
                    for (h = 0; h < j.faces.length; h++) k = j.faces[h], k.materialIndex = l[k.daeMaterial]
                }
                if (void 0 !== c) e(j, c), i.morphTargets = !0, i = new THREE.SkinnedMesh(j, i), i.skeleton = c.skeleton, i.skinController = pa[c.url], i.skinInstanceController = c, i.name = "skin_" + va.length, va.push(i);
                else if (void 0 !== d) {
                    h = j;
                    l = d instanceof o ? pa[d.url] : d;
                    if (!l || !l.morph) console.log("could not find morph controller!");
                    else {
                        l = l.morph;
                        for (k = 0; k < l.targets.length; k++) if (m = $a[l.targets[k]], m.mesh && m.mesh.primitives && m.mesh.primitives.length) m = m.mesh.primitives[0].geometry, m.vertices.length === h.vertices.length && h.morphTargets.push({
                            name: "target_1",
                            vertices: m.vertices
                        });
                        h.morphTargets.push({
                            name: "target_Z",
                            vertices: h.vertices
                        })
                    }
                    i.morphTargets = !0;
                    i = new THREE.Mesh(j, i);
                    i.name = "morph_" + qa.length;
                    qa.push(i)
                } else i = new THREE.Mesh(j, i);
                1 < a.geometries.length ? b.add(i) : b = i
            }
        }
        for (g = 0; g < a.cameras.length; g++) b = db[a.cameras[g].url], b = new THREE.PerspectiveCamera(b.fov, b.aspect_ratio, b.znear, b.zfar);
        b.name = a.id || "";
        b.matrix = a.matrix;
        g = a.matrix.decompose();
        b.position = g[0];
        b.quaternion = g[1];
        b.useQuaternion = !0;
        b.scale = g[2];
        ga.centerGeometry && b.geometry && (g = THREE.GeometryUtils.center(b.geometry), b.quaternion.multiplyVector3(g.multiplySelf(b.scale)), b.position.subSelf(g));
        for (g = 0; g < a.nodes.length; g++) b.add(f(a.nodes[g], a));
        return b
    }
    function g() {
        this.init_from = this.id = ""
    }
    function h() {
        this.type = this.name = this.id = "";
        this.morph = this.skin = null
    }
    function l() {
        this.weights = this.targets = this.source = this.method = null
    }
    function j() {
        this.source = "";
        this.bindShapeMatrix = null;
        this.invBindMatrices = [];
        this.joints = [];
        this.weights = []
    }
    function k() {
        this.name = this.id = "";
        this.nodes = [];
        this.scene = new THREE.Object3D
    }
    function p() {
        this.sid = this.name = this.id = "";
        this.nodes = [];
        this.controllers = [];
        this.transforms = [];
        this.geometries = [];
        this.channels = [];
        this.matrix = new THREE.Matrix4
    }
    function m() {
        this.type = this.sid = "";
        this.data = [];
        this.obj = null
    }
    function o() {
        this.url = "";
        this.skeleton = [];
        this.instance_material = []
    }
    function r() {
        this.target = this.symbol = ""
    }
    function n() {
        this.url = "";
        this.instance_material = []
    }
    function q() {
        this.id = "";
        this.mesh = null
    }
    function s(a) {
        this.geometry = a.id;
        this.primitives = [];
        this.geometry3js = this.vertices = null
    }
    function u() {
        this.material = "";
        this.count = 0;
        this.inputs = [];
        this.vcount = null;
        this.p = [];
        this.geometry = new THREE.Geometry
    }
    function v() {
        u.call(this);
        this.vcount = []
    }
    function t() {
        u.call(this);
        this.vcount = 3
    }
    function w() {
        this.source = "";
        this.stride = this.count = 0;
        this.params = []
    }
    function z() {
        this.input = {}
    }
    function F() {
        this.semantic = "";
        this.offset = 0;
        this.source = "";
        this.set = 0
    }
    function C(a) {
        this.id = a;
        this.type = null
    }
    function G() {
        this.name = this.id = "";
        this.instance_effect = null
    }
    function K() {
        this.color = new THREE.Color(0);
        this.color.setRGB(Math.random(), Math.random(), Math.random());
        this.color.a = 1;
        this.texOpts = this.texcoord = this.texture = null
    }
    function N(a, b) {
        this.type = a;
        this.effect = b;
        this.material = null
    }
    function P(a) {
        this.effect = a;
        this.format = this.init_from = null
    }
    function T(a) {
        this.effect = a;
        this.mipfilter = this.magfilter = this.minfilter = this.wrap_t = this.wrap_s = this.source = null
    }
    function O() {
        this.name = this.id = "";
        this.sampler = this.surface = this.shader = null
    }
    function J() {
        this.url = ""
    }
    function I() {
        this.name = this.id = "";
        this.source = {};
        this.sampler = [];
        this.channel = []
    }
    function D(a) {
        this.animation = a;
        this.target = this.source = "";
        this.member = this.arrIndices = this.arrSyntax = this.dotSyntax = this.sid = this.fullSid = null
    }
    function i(a) {
        this.id = "";
        this.animation = a;
        this.inputs = [];
        this.endTime = this.startTime = this.interpolation = this.strideOut = this.output = this.input = null;
        this.duration = 0
    }
    function S(a) {
        this.targets = [];
        this.time = a
    }
    function B() {
        this.technique = this.name = this.id = ""
    }
    function A() {
        this.url = ""
    }
    function V(a) {
        return "dae" == a ? "http://www.collada.org/2005/11/COLLADASchema" : null
    }
    function E(a) {
        for (var a = ea(a), b = [], c = 0, d = a.length; c < d; c++) b.push(parseFloat(a[c]));
        return b
    }
    function aa(a) {
        for (var a = ea(a), b = [], c = 0, d = a.length; c < d; c++) b.push(parseInt(a[c], 10));
        return b
    }
    function ea(a) {
        return 0 < a.length ? a.replace(/^\s+/, "").replace(/\s+$/, "").split(/\s+/) : []
    }
    function ia(a, b, c) {
        return a.hasAttribute(b) ? parseInt(a.getAttribute(b), 10) : c
    }
    function R(a, b) {
        if (ga.convertUpAxis && Xa !== ga.upAxis) switch (La) {
        case "XtoY":
            var c = a[0];
            a[0] = b * a[1];
            a[1] = c;
            break;
        case "XtoZ":
            c = a[2];
            a[2] = a[1];
            a[1] = a[0];
            a[0] = c;
            break;
        case "YtoX":
            c = a[0];
            a[0] = a[1];
            a[1] = b * c;
            break;
        case "YtoZ":
            c = a[1];
            a[1] = b * a[2];
            a[2] = c;
            break;
        case "ZtoX":
            c = a[0];
            a[0] = a[1];
            a[1] = a[2];
            a[2] = c;
            break;
        case "ZtoY":
            c = a[1], a[1] = a[2], a[2] = b * c
        }
    }
    function $(a, b) {
        var c = [a[b], a[b + 1], a[b + 2]];
        R(c, -1);
        return new THREE.Vector3(c[0], c[1], c[2])
    }
    function ba(a) {
        if (ga.convertUpAxis) {
            var b = [a[0], a[4], a[8]];
            R(b, -1);
            a[0] = b[0];
            a[4] = b[1];
            a[8] = b[2];
            b = [a[1], a[5], a[9]];
            R(b, -1);
            a[1] = b[0];
            a[5] = b[1];
            a[9] = b[2];
            b = [a[2], a[6], a[10]];
            R(b, -1);
            a[2] = b[0];
            a[6] = b[1];
            a[10] = b[2];
            b = [a[0], a[1], a[2]];
            R(b, -1);
            a[0] = b[0];
            a[1] = b[1];
            a[2] = b[2];
            b = [a[4], a[5], a[6]];
            R(b, -1);
            a[4] = b[0];
            a[5] = b[1];
            a[6] = b[2];
            b = [a[8], a[9], a[10]];
            R(b, -1);
            a[8] = b[0];
            a[9] = b[1];
            a[10] = b[2];
            b = [a[3], a[7], a[11]];
            R(b, -1);
            a[3] = b[0];
            a[7] = b[1];
            a[11] = b[2]
        }
        return new THREE.Matrix4(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15])
    }
    var Z = null,
        ja = null,
        Ga, oa = null,
        Ka = {},
        Ua = {},
        Da = {},
        pa = {},
        $a = {},
        ab = {},
        kb = {},
        db = {},
        hb, nb, Wa, qa, va, Ea = THREE.SmoothShading,
        ga = {
            centerGeometry: !1,
            convertUpAxis: !1,
            subdivideFaces: !0,
            upAxis: "Y"
        },
        Xa = "Y",
        La = null,
        ra = Math.PI / 180;
    g.prototype.parse = function (a) {
        this.id = a.getAttribute("id");
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if ("init_from" == c.nodeName) this.init_from = c.textContent
        }
        return this
    };
    h.prototype.parse = function (a) {
        this.id = a.getAttribute("id");
        this.name = a.getAttribute("name");
        this.type = "none";
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            switch (c.nodeName) {
            case "skin":
                this.skin = (new j).parse(c);
                this.type = c.nodeName;
                break;
            case "morph":
                this.morph = (new l).parse(c), this.type = c.nodeName
            }
        }
        return this
    };
    l.prototype.parse = function (a) {
        var b = {},
            c = [],
            d;
        this.method = a.getAttribute("method");
        this.source = a.getAttribute("source").replace(/^#/, "");
        for (d = 0; d < a.childNodes.length; d++) {
            var e = a.childNodes[d];
            if (1 == e.nodeType) switch (e.nodeName) {
            case "source":
                e = (new C).parse(e);
                b[e.id] = e;
                break;
            case "targets":
                c = this.parseInputs(e);
                break;
            default:
                console.log(e.nodeName)
            }
        }
        for (d = 0; d < c.length; d++) switch (a = c[d], e = b[a.source], a.semantic) {
        case "MORPH_TARGET":
            this.targets = e.read();
            break;
        case "MORPH_WEIGHT":
            this.weights = e.read()
        }
        return this
    };
    l.prototype.parseInputs = function (a) {
        for (var b = [], c = 0; c < a.childNodes.length; c++) {
            var d = a.childNodes[c];
            if (1 == d.nodeType) switch (d.nodeName) {
            case "input":
                b.push((new F).parse(d))
            }
        }
        return b
    };
    j.prototype.parse = function (a) {
        var b = {},
            c, d;
        this.source = a.getAttribute("source").replace(/^#/, "");
        this.invBindMatrices = [];
        this.joints = [];
        this.weights = [];
        for (var e = 0; e < a.childNodes.length; e++) {
            var f = a.childNodes[e];
            if (1 == f.nodeType) switch (f.nodeName) {
            case "bind_shape_matrix":
                f = E(f.textContent);
                this.bindShapeMatrix = ba(f);
                break;
            case "source":
                f = (new C).parse(f);
                b[f.id] = f;
                break;
            case "joints":
                c = f;
                break;
            case "vertex_weights":
                d = f;
                break;
            default:
                console.log(f.nodeName)
            }
        }
        this.parseJoints(c, b);
        this.parseWeights(d, b);
        return this
    };
    j.prototype.parseJoints = function (a, b) {
        for (var c = 0; c < a.childNodes.length; c++) {
            var d = a.childNodes[c];
            if (1 == d.nodeType) switch (d.nodeName) {
            case "input":
                var d = (new F).parse(d),
                    e = b[d.source];
                if ("JOINT" == d.semantic) this.joints = e.read();
                else if ("INV_BIND_MATRIX" == d.semantic) this.invBindMatrices = e.read()
            }
        }
    };
    j.prototype.parseWeights = function (a, b) {
        for (var c, d, e = [], f = 0; f < a.childNodes.length; f++) {
            var g = a.childNodes[f];
            if (1 == g.nodeType) switch (g.nodeName) {
            case "input":
                e.push((new F).parse(g));
                break;
            case "v":
                c = aa(g.textContent);
                break;
            case "vcount":
                d = aa(g.textContent)
            }
        }
        for (f = g = 0; f < d.length; f++) {
            for (var h = d[f], i = [], j = 0; j < h; j++) {
                for (var l = {}, k = 0; k < e.length; k++) {
                    var m = e[k],
                        n = c[g + m.offset];
                    switch (m.semantic) {
                    case "JOINT":
                        l.joint = n;
                        break;
                    case "WEIGHT":
                        l.weight = b[m.source].data[n]
                    }
                }
                i.push(l);
                g += e.length
            }
            for (j = 0; j < i.length; j++) i[j].index = f;
            this.weights.push(i)
        }
    };
    k.prototype.getChildById = function (a, b) {
        for (var c = 0; c < this.nodes.length; c++) {
            var d = this.nodes[c].getChildById(a, b);
            if (d) return d
        }
        return null
    };
    k.prototype.getChildBySid = function (a, b) {
        for (var c = 0; c < this.nodes.length; c++) {
            var d = this.nodes[c].getChildBySid(a, b);
            if (d) return d
        }
        return null
    };
    k.prototype.parse = function (a) {
        this.id = a.getAttribute("id");
        this.name = a.getAttribute("name");
        this.nodes = [];
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType) switch (c.nodeName) {
            case "node":
                this.nodes.push((new p).parse(c))
            }
        }
        return this
    };
    p.prototype.getChannelForTransform = function (a) {
        for (var b = 0; b < this.channels.length; b++) {
            var c = this.channels[b],
                d = c.target.split("/");
            d.shift();
            var e = d.shift(),
                f = 0 <= e.indexOf("."),
                g = 0 <= e.indexOf("("),
                h;
            if (f) d = e.split("."), e = d.shift(), d.shift();
            else if (g) {
                h = e.split("(");
                e = h.shift();
                for (d = 0; d < h.length; d++) h[d] = parseInt(h[d].replace(/\)/, ""))
            }
            if (e == a) return c.info = {
                sid: e,
                dotSyntax: f,
                arrSyntax: g,
                arrIndices: h
            }, c
        }
        return null
    };
    p.prototype.getChildById = function (a, b) {
        if (this.id == a) return this;
        if (b) for (var c = 0; c < this.nodes.length; c++) {
            var d = this.nodes[c].getChildById(a, b);
            if (d) return d
        }
        return null
    };
    p.prototype.getChildBySid = function (a, b) {
        if (this.sid == a) return this;
        if (b) for (var c = 0; c < this.nodes.length; c++) {
            var d = this.nodes[c].getChildBySid(a, b);
            if (d) return d
        }
        return null
    };
    p.prototype.getTransformBySid = function (a) {
        for (var b = 0; b < this.transforms.length; b++) if (this.transforms[b].sid == a) return this.transforms[b];
        return null
    };
    p.prototype.parse = function (a) {
        var b;
        this.id = a.getAttribute("id");
        this.sid = a.getAttribute("sid");
        this.name = a.getAttribute("name");
        this.type = a.getAttribute("type");
        this.type = "JOINT" == this.type ? this.type : "NODE";
        this.nodes = [];
        this.transforms = [];
        this.geometries = [];
        this.cameras = [];
        this.controllers = [];
        this.matrix = new THREE.Matrix4;
        for (var c = 0; c < a.childNodes.length; c++) if (b = a.childNodes[c], 1 == b.nodeType) switch (b.nodeName) {
        case "node":
            this.nodes.push((new p).parse(b));
            break;
        case "instance_camera":
            this.cameras.push((new A).parse(b));
            break;
        case "instance_controller":
            this.controllers.push((new o).parse(b));
            break;
        case "instance_geometry":
            this.geometries.push((new n).parse(b));
            break;
        case "instance_light":
            break;
        case "instance_node":
            b = b.getAttribute("url").replace(/^#/, "");
            (b = Z.evaluate(".//dae:library_nodes//dae:node[@id='" + b + "']", Z, V, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext()) && this.nodes.push((new p).parse(b));
            break;
        case "rotate":
        case "translate":
        case "scale":
        case "matrix":
        case "lookat":
        case "skew":
            this.transforms.push((new m).parse(b));
            break;
        case "extra":
            break;
        default:
            console.log(b.nodeName)
        }
        a = [];
        c = 1E6;
        b = -1E6;
        for (var d in Da) for (var e = Da[d], f = 0; f < e.channel.length; f++) {
            var g = e.channel[f],
                h = e.sampler[f];
            d = g.target.split("/")[0];
            if (d == this.id) h.create(), g.sampler = h, c = Math.min(c, h.startTime), b = Math.max(b, h.endTime), a.push(g)
        }
        if (a.length) this.startTime = c, this.endTime = b;
        if ((this.channels = a) && this.channels.length) {
            d = [];
            a = [];
            c = 0;
            for (e = this.channels.length; c < e; c++) {
                b = this.channels[c];
                f = b.fullSid;
                g = b.member;
                if (ga.convertUpAxis) switch (g) {
                case "X":
                    switch (La) {
                    case "XtoY":
                    case "XtoZ":
                    case "YtoX":
                        g = "Y";
                        break;
                    case "ZtoX":
                        g = "Z"
                    }
                    break;
                case "Y":
                    switch (La) {
                    case "XtoY":
                    case "YtoX":
                    case "ZtoX":
                        g = "X";
                        break;
                    case "XtoZ":
                    case "YtoZ":
                    case "ZtoY":
                        g = "Z"
                    }
                    break;
                case "Z":
                    switch (La) {
                    case "XtoZ":
                        g = "X";
                        break;
                    case "YtoZ":
                    case "ZtoX":
                    case "ZtoY":
                        g = "Y"
                    }
                }
                var h = b.sampler,
                    i = h.input,
                    j = this.getTransformBySid(b.sid);
                if (j) {
                    -1 === a.indexOf(f) && a.push(f);
                    b = 0;
                    for (var l = i.length; b < l; b++) {
                        var k = i[b],
                            r = h.getData(j.type, b),
                            q;
                        q = null;
                        for (var s = 0, t = d.length; s < t && null == q; s++) {
                            var u = d[s];
                            if (u.time === k) q = u;
                            else if (u.time > k) break
                        }
                        if (!q) {
                            q = new S(k);
                            s = -1;
                            t = 0;
                            for (u = d.length; t < u && -1 == s; t++) d[t].time >= k && (s = t);
                            k = s;
                            d.splice(-1 == k ? d.length : k, 0, q)
                        }
                        q.addTarget(f, j, g, r)
                    }
                } else console.log('Could not find transform "' + b.sid + '" in node ' + this.id)
            }
            for (c = 0; c < a.length; c++) {
                e = a[c];
                for (b = 0; b < d.length; b++) if (q = d[b], !q.hasTarget(e)) {
                    h = d;
                    f = q;
                    j = b;
                    g = e;
                    i = void 0;
                    a: {
                        i = j ? j - 1 : 0;
                        for (i = 0 <= i ? i : i + h.length; 0 <= i; i--) if (l = h[i], l.hasTarget(g)) {
                            i = l;
                            break a
                        }
                        i = null
                    }
                    l = void 0;
                    a: {
                        for (j += 1; j < h.length; j++) if (l = h[j], l.hasTarget(g)) break a;
                        l = null
                    }
                    if (i && l) {
                        h = (f.time - i.time) / (l.time - i.time);
                        i = i.getTarget(g);
                        j = l.getTarget(g).data;
                        l = i.data;
                        r = void 0;
                        if (l.length) {
                            r = [];
                            for (k = 0; k < l.length; ++k) r[k] = l[k] + (j[k] - l[k]) * h
                        } else r = l + (j - l) * h;
                        f.addTarget(g, i.transform, i.member, r)
                    }
                }
            }
            this.keys = d;
            this.sids = a
        }
        this.updateMatrix();
        return this
    };
    p.prototype.updateMatrix = function () {
        this.matrix.identity();
        for (var a = 0; a < this.transforms.length; a++) this.transforms[a].apply(this.matrix)
    };
    m.prototype.parse = function (a) {
        this.sid = a.getAttribute("sid");
        this.type = a.nodeName;
        this.data = E(a.textContent);
        this.convert();
        return this
    };
    m.prototype.convert = function () {
        switch (this.type) {
        case "matrix":
            this.obj = ba(this.data);
            break;
        case "rotate":
            this.angle = this.data[3] * ra;
        case "translate":
            R(this.data, -1);
            this.obj = new THREE.Vector3(this.data[0], this.data[1], this.data[2]);
            break;
        case "scale":
            R(this.data, 1);
            this.obj = new THREE.Vector3(this.data[0], this.data[1], this.data[2]);
            break;
        default:
            console.log("Can not convert Transform of type " + this.type)
        }
    };
    m.prototype.apply = function (a) {
        switch (this.type) {
        case "matrix":
            a.multiplySelf(this.obj);
            break;
        case "translate":
            a.translate(this.obj);
            break;
        case "rotate":
            a.rotateByAxis(this.obj, this.angle);
            break;
        case "scale":
            a.scale(this.obj)
        }
    };
    m.prototype.update = function (a, b) {
        switch (this.type) {
        case "matrix":
            console.log("Currently not handling matrix transform updates");
            break;
        case "translate":
        case "scale":
            switch (b) {
            case "X":
                this.obj.x = a;
                break;
            case "Y":
                this.obj.y = a;
                break;
            case "Z":
                this.obj.z = a;
                break;
            default:
                this.obj.x = a[0], this.obj.y = a[1], this.obj.z = a[2]
            }
            break;
        case "rotate":
            switch (b) {
            case "X":
                this.obj.x = a;
                break;
            case "Y":
                this.obj.y = a;
                break;
            case "Z":
                this.obj.z = a;
                break;
            case "ANGLE":
                this.angle = a * ra;
                break;
            default:
                this.obj.x = a[0], this.obj.y = a[1], this.obj.z = a[2], this.angle = a[3] * ra
            }
        }
    };
    o.prototype.parse = function (a) {
        this.url = a.getAttribute("url").replace(/^#/, "");
        this.skeleton = [];
        this.instance_material = [];
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType) switch (c.nodeName) {
            case "skeleton":
                this.skeleton.push(c.textContent.replace(/^#/, ""));
                break;
            case "bind_material":
                if (c = Z.evaluate(".//dae:instance_material", c, V, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)) for (var d = c.iterateNext(); d;) this.instance_material.push((new r).parse(d)), d = c.iterateNext()
            }
        }
        return this
    };
    r.prototype.parse = function (a) {
        this.symbol = a.getAttribute("symbol");
        this.target = a.getAttribute("target").replace(/^#/, "");
        return this
    };
    n.prototype.parse = function (a) {
        this.url = a.getAttribute("url").replace(/^#/, "");
        this.instance_material = [];
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType && "bind_material" == c.nodeName) {
                if (a = Z.evaluate(".//dae:instance_material", c, V, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)) for (b = a.iterateNext(); b;) this.instance_material.push((new r).parse(b)), b = a.iterateNext();
                break
            }
        }
        return this
    };
    q.prototype.parse = function (a) {
        this.id = a.getAttribute("id");
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            switch (c.nodeName) {
            case "mesh":
                this.mesh = (new s(this)).parse(c)
            }
        }
        return this
    };
    s.prototype.parse = function (a) {
        this.primitives = [];
        var b;
        for (b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            switch (c.nodeName) {
            case "source":
                var d = c.getAttribute("id");
                void 0 == Ka[d] && (Ka[d] = (new C(d)).parse(c));
                break;
            case "vertices":
                this.vertices = (new z).parse(c);
                break;
            case "triangles":
                this.primitives.push((new t).parse(c));
                break;
            case "polygons":
                this.primitives.push((new u).parse(c));
                break;
            case "polylist":
                this.primitives.push((new v).parse(c))
            }
        }
        this.geometry3js = new THREE.Geometry;
        a = Ka[this.vertices.input.POSITION.source].data;
        for (b = 0; b < a.length; b += 3) this.geometry3js.vertices.push(new THREE.Vertex($(a, b)));
        for (b = 0; b < this.primitives.length; b++) a = this.primitives[b], a.setVertices(this.vertices), this.handlePrimitive(a, this.geometry3js);
        this.geometry3js.computeCentroids();
        this.geometry3js.computeFaceNormals();
        this.geometry3js.calcNormals && (this.geometry3js.computeVertexNormals(), delete this.geometry3js.calcNormals);
        this.geometry3js.computeBoundingBox();
        return this
    };
    s.prototype.handlePrimitive = function (a, b) {
        var c, d, e = a.p,
            f = a.inputs,
            g, h, i, j, l = 0,
            k = 3,
            m = 0,
            n = [];
        for (c = 0; c < f.length; c++) switch (g = f[c], k = g.offset + 1, m = m < k ? k : m, g.semantic) {
        case "TEXCOORD":
            n.push(g.set)
        }
        for (var o = 0; o < e.length; ++o) for (var p = e[o], r = 0; r < p.length;) {
            var q = [],
                s = [],
                t = {},
                u = [],
                k = a.vcount ? a.vcount.length ? a.vcount[l++] : a.vcount : p.length / m;
            for (c = 0; c < k; c++) for (d = 0; d < f.length; d++) switch (g = f[d], j = Ka[g.source], h = p[r + c * m + g.offset], i = j.accessor.params.length, i *= h, g.semantic) {
            case "VERTEX":
                q.push(h);
                break;
            case "NORMAL":
                s.push($(j.data, i));
                break;
            case "TEXCOORD":
                void 0 === t[g.set] && (t[g.set] = []);
                t[g.set].push(new THREE.UV(j.data[i], 1 - j.data[i + 1]));
                break;
            case "COLOR":
                u.push((new THREE.Color).setRGB(j.data[i], j.data[i + 1], j.data[i + 2]))
            }
            d = null;
            c = [];
            if (0 == s.length) if (g = this.vertices.input.NORMAL) {
                j = Ka[g.source];
                i = j.accessor.params.length;
                g = 0;
                for (h = q.length; g < h; g++) s.push($(j.data, q[g] * i))
            } else b.calcNormals = !0;
            if (3 === k) c.push(new THREE.Face3(q[0], q[1], q[2], s, u.length ? u : new THREE.Color));
            else if (4 === k) c.push(new THREE.Face4(q[0], q[1], q[2], q[3], s, u.length ? u : new THREE.Color));
            else if (4 < k && ga.subdivideFaces) {
                u = u.length ? u : new THREE.Color;
                for (d = 1; d < k - 1;) c.push(new THREE.Face3(q[0], q[d], q[d + 1], [s[0], s[d++], s[d]], u))
            }
            if (c.length) {
                g = 0;
                for (h = c.length; g < h; g++) {
                    d = c[g];
                    d.daeMaterial = a.material;
                    b.faces.push(d);
                    for (d = 0; d < n.length; d++) q = t[n[d]], q = 4 < k ? [q[0], q[g + 1], q[g + 2]] : 4 === k ? [q[0], q[1], q[2], q[3]] : [q[0], q[1], q[2]], b.faceVertexUvs[d] || (b.faceVertexUvs[d] = []), b.faceVertexUvs[d].push(q)
                }
            } else console.log("dropped face with vcount " + k + " for geometry with id: " + b.id);
            r += m * k
        }
    };
    u.prototype.setVertices = function (a) {
        for (var b = 0; b < this.inputs.length; b++) if (this.inputs[b].source == a.id) this.inputs[b].source = a.input.POSITION.source
    };
    u.prototype.parse = function (a) {
        this.material = a.getAttribute("material");
        this.count = ia(a, "count", 0);
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            switch (c.nodeName) {
            case "input":
                this.inputs.push((new F).parse(a.childNodes[b]));
                break;
            case "vcount":
                this.vcount = aa(c.textContent);
                break;
            case "p":
                this.p.push(aa(c.textContent));
                break;
            case "ph":
                console.warn("polygon holes not yet supported!")
            }
        }
        return this
    };
    v.prototype = new u;
    v.prototype.constructor = v;
    t.prototype = new u;
    t.prototype.constructor = t;
    w.prototype.parse = function (a) {
        this.params = [];
        this.source = a.getAttribute("source");
        this.count = ia(a, "count", 0);
        this.stride = ia(a, "stride", 0);
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if ("param" == c.nodeName) {
                var d = {};
                d.name = c.getAttribute("name");
                d.type = c.getAttribute("type");
                this.params.push(d)
            }
        }
        return this
    };
    z.prototype.parse = function (a) {
        this.id = a.getAttribute("id");
        for (var b = 0; b < a.childNodes.length; b++) if ("input" == a.childNodes[b].nodeName) {
            var c = (new F).parse(a.childNodes[b]);
            this.input[c.semantic] = c
        }
        return this
    };
    F.prototype.parse = function (a) {
        this.semantic = a.getAttribute("semantic");
        this.source = a.getAttribute("source").replace(/^#/, "");
        this.set = ia(a, "set", -1);
        this.offset = ia(a, "offset", 0);
        if ("TEXCOORD" == this.semantic && 0 > this.set) this.set = 0;
        return this
    };
    C.prototype.parse = function (a) {
        this.id = a.getAttribute("id");
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            switch (c.nodeName) {
            case "bool_array":
                for (var d = ea(c.textContent), e = [], f = 0, g = d.length; f < g; f++) e.push("true" == d[f] || "1" == d[f] ? !0 : !1);
                this.data = e;
                this.type = c.nodeName;
                break;
            case "float_array":
                this.data = E(c.textContent);
                this.type = c.nodeName;
                break;
            case "int_array":
                this.data = aa(c.textContent);
                this.type = c.nodeName;
                break;
            case "IDREF_array":
            case "Name_array":
                this.data = ea(c.textContent);
                this.type = c.nodeName;
                break;
            case "technique_common":
                for (d = 0; d < c.childNodes.length; d++) if ("accessor" == c.childNodes[d].nodeName) {
                    this.accessor = (new w).parse(c.childNodes[d]);
                    break
                }
            }
        }
        return this
    };
    C.prototype.read = function () {
        var a = [],
            b = this.accessor.params[0];
        switch (b.type) {
        case "IDREF":
        case "Name":
        case "name":
        case "float":
            return this.data;
        case "float4x4":
            for (b = 0; b < this.data.length; b += 16) {
                var c = this.data.slice(b, b + 16),
                    c = ba(c);
                a.push(c)
            }
            break;
        default:
            console.log("ColladaLoader: Source: Read dont know how to read " + b.type + ".")
        }
        return a
    };
    G.prototype.parse = function (a) {
        this.id = a.getAttribute("id");
        this.name = a.getAttribute("name");
        for (var b = 0; b < a.childNodes.length; b++) if ("instance_effect" == a.childNodes[b].nodeName) {
            this.instance_effect = (new J).parse(a.childNodes[b]);
            break
        }
        return this
    };
    K.prototype.isColor = function () {
        return null == this.texture
    };
    K.prototype.isTexture = function () {
        return null != this.texture
    };
    K.prototype.parse = function (a) {
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType) switch (c.nodeName) {
            case "color":
                c = E(c.textContent);
                this.color = new THREE.Color(0);
                this.color.setRGB(c[0], c[1], c[2]);
                this.color.a = c[3];
                break;
            case "texture":
                this.texture = c.getAttribute("texture"), this.texcoord = c.getAttribute("texcoord"), this.texOpts = {
                    offsetU: 0,
                    offsetV: 0,
                    repeatU: 1,
                    repeatV: 1,
                    wrapU: 1,
                    wrapV: 1
                }, this.parseTexture(c)
            }
        }
        return this
    };
    K.prototype.parseTexture = function (a) {
        if (!a.childNodes) return this;
        a.childNodes[1] && "extra" === a.childNodes[1].nodeName && (a = a.childNodes[1], a.childNodes[1] && "technique" === a.childNodes[1].nodeName && (a = a.childNodes[1]));
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            switch (c.nodeName) {
            case "offsetU":
            case "offsetV":
            case "repeatU":
            case "repeatV":
                this.texOpts[c.nodeName] = parseFloat(c.textContent);
                break;
            case "wrapU":
            case "wrapV":
                this.texOpts[c.nodeName] = parseInt(c.textContent);
                break;
            default:
                this.texOpts[c.nodeName] = c.textContent
            }
        }
        return this
    };
    N.prototype.parse = function (a) {
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType) switch (c.nodeName) {
            case "ambient":
            case "emission":
            case "diffuse":
            case "specular":
            case "transparent":
                this[c.nodeName] = (new K).parse(c);
                break;
            case "shininess":
            case "reflectivity":
            case "transparency":
                var d;
                d = Z.evaluate(".//dae:float", c, V, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
                for (var e = d.iterateNext(), f = []; e;) f.push(e), e = d.iterateNext();
                d = f;
                0 < d.length && (this[c.nodeName] = parseFloat(d[0].textContent))
            }
        }
        this.create();
        return this
    };
    N.prototype.create = function () {
        var a = {},
            b = void 0 !== this.transparency && 1 > this.transparency,
            c;
        for (c in this) switch (c) {
        case "ambient":
        case "emission":
        case "diffuse":
        case "specular":
            var d = this[c];
            if (d instanceof K) if (d.isTexture()) {
                if (this.effect.sampler && this.effect.surface && this.effect.sampler.source == this.effect.surface.sid) {
                    var e = Ua[this.effect.surface.init_from];
                    if (e) e = THREE.ImageUtils.loadTexture(Wa + e.init_from), e.wrapS = d.texOpts.wrapU ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping, e.wrapT = d.texOpts.wrapV ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping, e.offset.x = d.texOpts.offsetU, e.offset.y = d.texOpts.offsetV, e.repeat.x = d.texOpts.repeatU, e.repeat.y = d.texOpts.repeatV, a.map = e
                }
            } else if ("diffuse" == c || !b) a[c] = d.color.getHex();
            break;
        case "shininess":
        case "reflectivity":
            a[c] = this[c];
            break;
        case "transparency":
            if (b) a.transparent = !0, a.opacity = this[c], b = !0
        }
        a.shading = Ea;
        switch (this.type) {
        case "constant":
            a.color = a.emission;
            this.material = new THREE.MeshBasicMaterial(a);
            break;
        case "phong":
        case "blinn":
            a.color = a.diffuse;
            this.material = new THREE.MeshPhongMaterial(a);
            break;
        default:
            a.color = a.diffuse, this.material = new THREE.MeshLambertMaterial(a)
        }
        return this.material
    };
    P.prototype.parse = function (a) {
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType) switch (c.nodeName) {
            case "init_from":
                this.init_from = c.textContent;
                break;
            case "format":
                this.format = c.textContent;
                break;
            default:
                console.log("unhandled Surface prop: " + c.nodeName)
            }
        }
        return this
    };
    T.prototype.parse = function (a) {
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType) switch (c.nodeName) {
            case "source":
                this.source = c.textContent;
                break;
            case "minfilter":
                this.minfilter = c.textContent;
                break;
            case "magfilter":
                this.magfilter = c.textContent;
                break;
            case "mipfilter":
                this.mipfilter = c.textContent;
                break;
            case "wrap_s":
                this.wrap_s = c.textContent;
                break;
            case "wrap_t":
                this.wrap_t = c.textContent;
                break;
            default:
                console.log("unhandled Sampler2D prop: " + c.nodeName)
            }
        }
        return this
    };
    O.prototype.create = function () {
        if (null == this.shader) return null
    };
    O.prototype.parse = function (a) {
        this.id = a.getAttribute("id");
        this.name = a.getAttribute("name");
        this.shader = null;
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType) switch (c.nodeName) {
            case "profile_COMMON":
                this.parseTechnique(this.parseProfileCOMMON(c))
            }
        }
        return this
    };
    O.prototype.parseNewparam = function (a) {
        for (var b = a.getAttribute("sid"), c = 0; c < a.childNodes.length; c++) {
            var d = a.childNodes[c];
            if (1 == d.nodeType) switch (d.nodeName) {
            case "surface":
                this.surface = (new P(this)).parse(d);
                this.surface.sid = b;
                break;
            case "sampler2D":
                this.sampler = (new T(this)).parse(d);
                this.sampler.sid = b;
                break;
            case "extra":
                break;
            default:
                console.log(d.nodeName)
            }
        }
    };
    O.prototype.parseProfileCOMMON = function (a) {
        for (var b, c = 0; c < a.childNodes.length; c++) {
            var d = a.childNodes[c];
            if (1 == d.nodeType) switch (d.nodeName) {
            case "profile_COMMON":
                this.parseProfileCOMMON(d);
                break;
            case "technique":
                b = d;
                break;
            case "newparam":
                this.parseNewparam(d);
                break;
            case "image":
                d = (new g).parse(d);
                Ua[d.id] = d;
                break;
            case "extra":
                break;
            default:
                console.log(d.nodeName)
            }
        }
        return b
    };
    O.prototype.parseTechnique = function (a) {
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType) switch (c.nodeName) {
            case "constant":
            case "lambert":
            case "blinn":
            case "phong":
                this.shader = (new N(c.nodeName, this)).parse(c)
            }
        }
    };
    J.prototype.parse = function (a) {
        this.url = a.getAttribute("url").replace(/^#/, "");
        return this
    };
    I.prototype.parse = function (a) {
        this.id = a.getAttribute("id");
        this.name = a.getAttribute("name");
        this.source = {};
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType) switch (c.nodeName) {
            case "source":
                c = (new C).parse(c);
                this.source[c.id] = c;
                break;
            case "sampler":
                this.sampler.push((new i(this)).parse(c));
                break;
            case "channel":
                this.channel.push((new D(this)).parse(c))
            }
        }
        return this
    };
    D.prototype.parse = function (a) {
        this.source = a.getAttribute("source").replace(/^#/, "");
        this.target = a.getAttribute("target");
        var b = this.target.split("/");
        b.shift();
        var a = b.shift(),
            c = 0 <= a.indexOf("."),
            d = 0 <= a.indexOf("(");
        if (c) b = a.split("."), this.sid = b.shift(), this.member = b.shift();
        else if (d) {
            b = a.split("(");
            this.sid = b.shift();
            for (var e = 0; e < b.length; e++) b[e] = parseInt(b[e].replace(/\)/, ""));
            this.arrIndices = b
        } else this.sid = a;
        this.fullSid = a;
        this.dotSyntax = c;
        this.arrSyntax = d;
        return this
    };
    i.prototype.parse = function (a) {
        this.id = a.getAttribute("id");
        this.inputs = [];
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType) switch (c.nodeName) {
            case "input":
                this.inputs.push((new F).parse(c))
            }
        }
        return this
    };
    i.prototype.create = function () {
        for (var a = 0; a < this.inputs.length; a++) {
            var b = this.inputs[a],
                c = this.animation.source[b.source];
            switch (b.semantic) {
            case "INPUT":
                this.input = c.read();
                break;
            case "OUTPUT":
                this.output = c.read();
                this.strideOut = c.accessor.stride;
                break;
            case "INTERPOLATION":
                this.interpolation = c.read();
                break;
            case "IN_TANGENT":
                break;
            case "OUT_TANGENT":
                break;
            default:
                console.log(b.semantic)
            }
        }
        this.duration = this.endTime = this.startTime = 0;
        if (this.input.length) {
            this.startTime = 1E8;
            this.endTime = -1E8;
            for (a = 0; a < this.input.length; a++) this.startTime = Math.min(this.startTime, this.input[a]), this.endTime = Math.max(this.endTime, this.input[a]);
            this.duration = this.endTime - this.startTime
        }
    };
    i.prototype.getData = function (a, b) {
        var c;
        if (1 < this.strideOut) {
            c = [];
            for (var b = b * this.strideOut, d = 0; d < this.strideOut; ++d) c[d] = this.output[b + d];
            if (3 === this.strideOut) switch (a) {
            case "rotate":
            case "translate":
                R(c, -1);
                break;
            case "scale":
                R(c, 1)
            }
        } else c = this.output[b];
        return c
    };
    S.prototype.addTarget = function (a, b, c, d) {
        this.targets.push({
            sid: a,
            member: c,
            transform: b,
            data: d
        })
    };
    S.prototype.apply = function (a) {
        for (var b = 0; b < this.targets.length; ++b) {
            var c = this.targets[b];
            (!a || c.sid === a) && c.transform.update(c.data, c.member)
        }
    };
    S.prototype.getTarget = function (a) {
        for (var b = 0; b < this.targets.length; ++b) if (this.targets[b].sid === a) return this.targets[b];
        return null
    };
    S.prototype.hasTarget = function (a) {
        for (var b = 0; b < this.targets.length; ++b) if (this.targets[b].sid === a) return !0;
        return !1
    };
    S.prototype.interpolate = function (a, b) {
        for (var c = 0; c < this.targets.length; ++c) {
            var d = this.targets[c],
                e = a.getTarget(d.sid);
            if (e) {
                var f = (b - this.time) / (a.time - this.time),
                    g = e.data,
                    h = d.data;
                if (0 > f || 1 < f) console.log("Key.interpolate: Warning! Scale out of bounds:" + f), f = 0 > f ? 0 : 1;
                if (h.length) for (var e = [], i = 0; i < h.length; ++i) e[i] = h[i] + (g[i] - h[i]) * f;
                else e = h + (g - h) * f
            } else e = d.data;
            d.transform.update(e, d.member)
        }
    };
    B.prototype.parse = function (a) {
        this.id = a.getAttribute("id");
        this.name = a.getAttribute("name");
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType) switch (c.nodeName) {
            case "optics":
                this.parseOptics(c)
            }
        }
        return this
    };
    B.prototype.parseOptics = function (a) {
        for (var b = 0; b < a.childNodes.length; b++) if ("technique_common" == a.childNodes[b].nodeName) for (var c = a.childNodes[b], d = 0; d < c.childNodes.length; d++) if (this.technique = c.childNodes[d].nodeName, "perspective" == this.technique) for (var e = c.childNodes[d], f = 0; f < e.childNodes.length; f++) {
            var g = e.childNodes[f];
            switch (g.nodeName) {
            case "yfov":
                this.yfov = g.textContent;
                break;
            case "xfov":
                this.xfov = g.textContent;
                break;
            case "znear":
                this.znear = g.textContent;
                break;
            case "zfar":
                this.zfar = g.textContent;
                break;
            case "aspect_ratio":
                this.aspect_ratio = g.textContent
            }
        } else if ("orthographic" == this.technique) {
            e = c.childNodes[d];
            for (f = 0; f < e.childNodes.length; f++) switch (g = e.childNodes[f], g.nodeName) {
            case "xmag":
                this.xmag = g.textContent;
                break;
            case "ymag":
                this.ymag = g.textContent;
                break;
            case "znear":
                this.znear = g.textContent;
                break;
            case "zfar":
                this.zfar = g.textContent;
                break;
            case "aspect_ratio":
                this.aspect_ratio = g.textContent
            }
        }
        return this
    };
    A.prototype.parse = function (a) {
        this.url = a.getAttribute("url").replace(/^#/, "");
        return this
    };
    return {
        load: function (b, c, d) {
            var e = 0;
            if (document.implementation && document.implementation.createDocument) {
                var f = new XMLHttpRequest;
                f.overrideMimeType && f.overrideMimeType("text/xml");
                f.onreadystatechange = function () {
                    if (4 == f.readyState) {
                        if (0 == f.status || 200 == f.status) f.responseXML ? (oa = c, a(f.responseXML, void 0, b)) : console.error("ColladaLoader: Empty or non-existing file (" + b + ")")
                    } else 3 == f.readyState && d && (0 == e && (e = f.getResponseHeader("Content-Length")), d({
                        total: e,
                        loaded: f.responseText.length
                    }))
                };
                f.open("GET", b, !0);
                f.send(null)
            } else alert("Don't know how to parse XML!")
        },
        parse: a,
        setPreferredShading: function (a) {
            Ea = a
        },
        applySkin: e,
        geometries: $a,
        options: ga
    }
};
THREE.JSONLoader = function (a) {
    THREE.Loader.call(this, a)
};
THREE.JSONLoader.prototype = new THREE.Loader;
THREE.JSONLoader.prototype.constructor = THREE.JSONLoader;
THREE.JSONLoader.prototype.supr = THREE.Loader.prototype;
THREE.JSONLoader.prototype.load = function (a, b, c) {
    c = c ? c : this.extractUrlBase(a);
    this.onLoadStart();
    this.loadAjaxJSON(this, a, b, c)
};
THREE.JSONLoader.prototype.loadAjaxJSON = function (a, b, c, d, e) {
    var f = new XMLHttpRequest,
        g = 0;
    f.onreadystatechange = function () {
        if (f.readyState === f.DONE) if (200 === f.status || 0 === f.status) {
            if (f.responseText) {
                var h = JSON.parse(f.responseText);
                a.createModel(h, c, d)
            } else console.warn("THREE.JSONLoader: [" + b + "] seems to be unreachable or file there is empty");
            a.onLoadComplete()
        } else console.error("THREE.JSONLoader: Couldn't load [" + b + "] [" + f.status + "]");
        else f.readyState === f.LOADING ? e && (0 === g && (g = f.getResponseHeader("Content-Length")), e({
            total: g,
            loaded: f.responseText.length
        })) : f.readyState === f.HEADERS_RECEIVED && (g = f.getResponseHeader("Content-Length"))
    };
    f.open("GET", b, !0);
    f.overrideMimeType && f.overrideMimeType("text/plain; charset=x-user-defined");
    f.setRequestHeader("Content-Type", "text/plain");
    f.send(null)
};
THREE.JSONLoader.prototype.createModel = function (a, b, c) {
    var d = new THREE.Geometry,
        e = void 0 !== a.scale ? 1 / a.scale : 1;
    this.initMaterials(d, a.materials, c);
    (function (b) {
        var c, e, l, j, k, p, m, o, r, n, q, s, u, v, t = a.faces;
        p = a.vertices;
        var w = a.normals,
            z = a.colors,
            F = 0;
        for (c = 0; c < a.uvs.length; c++) a.uvs[c].length && F++;
        for (c = 0; c < F; c++) d.faceUvs[c] = [], d.faceVertexUvs[c] = [];
        j = 0;
        for (k = p.length; j < k;) m = new THREE.Vertex, m.position.x = p[j++] * b, m.position.y = p[j++] * b, m.position.z = p[j++] * b, d.vertices.push(m);
        j = 0;
        for (k = t.length; j < k;) {
            b = t[j++];
            p = b & 1;
            l = b & 2;
            c = b & 4;
            e = b & 8;
            o = b & 16;
            m = b & 32;
            n = b & 64;
            b &= 128;
            p ? (q = new THREE.Face4, q.a = t[j++], q.b = t[j++], q.c = t[j++], q.d = t[j++], p = 4) : (q = new THREE.Face3, q.a = t[j++], q.b = t[j++], q.c = t[j++], p = 3);
            if (l) l = t[j++], q.materialIndex = l;
            l = d.faces.length;
            if (c) for (c = 0; c < F; c++) s = a.uvs[c], r = t[j++], v = s[2 * r], r = s[2 * r + 1], d.faceUvs[c][l] = new THREE.UV(v, r);
            if (e) for (c = 0; c < F; c++) {
                s = a.uvs[c];
                u = [];
                for (e = 0; e < p; e++) r = t[j++], v = s[2 * r], r = s[2 * r + 1], u[e] = new THREE.UV(v, r);
                d.faceVertexUvs[c][l] = u
            }
            if (o) o = 3 * t[j++], e = new THREE.Vector3, e.x = w[o++], e.y = w[o++], e.z = w[o], q.normal = e;
            if (m) for (c = 0; c < p; c++) o = 3 * t[j++], e = new THREE.Vector3, e.x = w[o++], e.y = w[o++], e.z = w[o], q.vertexNormals.push(e);
            if (n) m = t[j++], m = new THREE.Color(z[m]), q.color = m;
            if (b) for (c = 0; c < p; c++) m = t[j++], m = new THREE.Color(z[m]), q.vertexColors.push(m);
            d.faces.push(q)
        }
    })(e);
    (function () {
        var b, c, e, l;
        if (a.skinWeights) for (b = 0, c = a.skinWeights.length; b < c; b += 2) e = a.skinWeights[b], l = a.skinWeights[b + 1], d.skinWeights.push(new THREE.Vector4(e, l, 0, 0));
        if (a.skinIndices) for (b = 0, c = a.skinIndices.length; b < c; b += 2) e = a.skinIndices[b], l = a.skinIndices[b + 1], d.skinIndices.push(new THREE.Vector4(e, l, 0, 0));
        d.bones = a.bones;
        d.animation = a.animation
    })();
    (function (b) {
        if (void 0 !== a.morphTargets) {
            var c, e, l, j, k, p, m, o, r;
            for (c = 0, e = a.morphTargets.length; c < e; c++) {
                d.morphTargets[c] = {};
                d.morphTargets[c].name = a.morphTargets[c].name;
                d.morphTargets[c].vertices = [];
                o = d.morphTargets[c].vertices;
                r = a.morphTargets[c].vertices;
                for (l = 0, j = r.length; l < j; l += 3) k = r[l] * b, p = r[l + 1] * b, m = r[l + 2] * b, o.push(new THREE.Vertex(new THREE.Vector3(k, p, m)))
            }
        }
        if (void 0 !== a.morphColors) for (c = 0, e = a.morphColors.length; c < e; c++) {
            d.morphColors[c] = {};
            d.morphColors[c].name = a.morphColors[c].name;
            d.morphColors[c].colors = [];
            j = d.morphColors[c].colors;
            k = a.morphColors[c].colors;
            for (b = 0, l = k.length; b < l; b += 3) p = new THREE.Color(16755200), p.setRGB(k[b], k[b + 1], k[b + 2]), j.push(p)
        }
    })(e);
    d.computeCentroids();
    d.computeFaceNormals();
    this.hasNormals(d) && d.computeTangents();
    b(d)
};
THREE.SceneLoader = function () {
    this.onLoadStart = function () {};
    this.onLoadProgress = function () {};
    this.onLoadComplete = function () {};
    this.callbackSync = function () {};
    this.callbackProgress = function () {}
};
THREE.SceneLoader.prototype.constructor = THREE.SceneLoader;
THREE.SceneLoader.prototype.load = function (a, b) {
    var c = this,
        d = new XMLHttpRequest;
    d.onreadystatechange = function () {
        if (4 == d.readyState) if (200 == d.status || 0 == d.status) {
            var e = JSON.parse(d.responseText);
            c.createScene(e, b, a)
        } else console.error("THREE.SceneLoader: Couldn't load [" + a + "] [" + d.status + "]")
    };
    d.open("GET", a, !0);
    d.overrideMimeType && d.overrideMimeType("text/plain; charset=x-user-defined");
    d.setRequestHeader("Content-Type", "text/plain");
    d.send(null)
};
THREE.SceneLoader.prototype.createScene = function (a, b, c) {
    function d(a, b) {
        return "relativeToHTML" == b ? a : j + "/" + a
    }
    function e() {
        var a;
        for (m in O.objects) if (!B.objects[m]) if (s = O.objects[m], void 0 !== s.geometry) {
            if (K = B.geometries[s.geometry]) a = !1, N = B.materials[s.materials[0]], (a = N instanceof THREE.ShaderMaterial) && K.computeTangents(), t = s.position, w = s.rotation, z = s.quaternion, F = s.scale, z = 0, 0 == s.materials.length && (N = new THREE.MeshFaceMaterial), 1 < s.materials.length && (N = new THREE.MeshFaceMaterial), a = new THREE.Mesh(K, N), a.name = m, a.position.set(t[0], t[1], t[2]), z ? (a.quaternion.set(z[0], z[1], z[2], z[3]), a.useQuaternion = !0) : a.rotation.set(w[0], w[1], w[2]), a.scale.set(F[0], F[1], F[2]), a.visible = s.visible, a.doubleSided = s.doubleSided, a.castShadow = s.castShadow, a.receiveShadow = s.receiveShadow, B.scene.add(a), B.objects[m] = a
        } else t = s.position, w = s.rotation, z = s.quaternion, F = s.scale, z = 0, a = new THREE.Object3D, a.name = m, a.position.set(t[0], t[1], t[2]), z ? (a.quaternion.set(z[0], z[1], z[2], z[3]), a.useQuaternion = !0) : a.rotation.set(w[0], w[1], w[2]), a.scale.set(F[0], F[1], F[2]), a.visible = void 0 !== s.visible ? s.visible : !1, B.scene.add(a), B.objects[m] = a, B.empties[m] = a
    }
    function f(a) {
        return function (b) {
            B.geometries[a] = b;
            e();
            I -= 1;
            l.onLoadComplete();
            h()
        }
    }
    function g(a) {
        return function (b) {
            B.geometries[a] = b
        }
    }
    function h() {
        l.callbackProgress({
            totalModels: i,
            totalTextures: S,
            loadedModels: i - I,
            loadedTextures: S - D
        }, B);
        l.onLoadProgress();
        0 == I && 0 == D && b(B)
    }
    var l = this,
        j = THREE.Loader.prototype.extractUrlBase(c),
        k, p, m, o, r, n, q, s, u, v, t, w, z, F, C, G, K, N, P, T, O, J, I, D, i, S, B;
    O = a;
    c = new THREE.BinaryLoader;
    J = new THREE.JSONLoader;
    D = I = 0;
    B = {
        scene: new THREE.Scene,
        geometries: {},
        materials: {},
        textures: {},
        objects: {},
        cameras: {},
        lights: {},
        fogs: {},
        empties: {}
    };
    if (O.transform && (a = O.transform.position, u = O.transform.rotation, C = O.transform.scale, a && B.scene.position.set(a[0], a[1], a[2]), u && B.scene.rotation.set(u[0], u[1], u[2]), C && B.scene.scale.set(C[0], C[1], C[2]), a || u || C)) B.scene.updateMatrix(), B.scene.updateMatrixWorld();
    a = function () {
        D -= 1;
        h();
        l.onLoadComplete()
    };
    for (r in O.cameras) C = O.cameras[r], "perspective" == C.type ? P = new THREE.PerspectiveCamera(C.fov, C.aspect, C.near, C.far) : "ortho" == C.type && (P = new THREE.OrthographicCamera(C.left, C.right, C.top, C.bottom, C.near, C.far)), t = C.position, u = C.target, C = C.up, P.position.set(t[0], t[1], t[2]), P.target = new THREE.Vector3(u[0], u[1], u[2]), C && P.up.set(C[0], C[1], C[2]), B.cameras[r] = P;
    for (o in O.lights) u = O.lights[o], r = void 0 !== u.color ? u.color : 16777215, P = void 0 !== u.intensity ? u.intensity : 1, "directional" == u.type ? (t = u.direction, v = new THREE.DirectionalLight(r, P), v.position.set(t[0], t[1], t[2]), v.position.normalize()) : "point" == u.type ? (t = u.position, v = u.distance, v = new THREE.PointLight(r, P, v), v.position.set(t[0], t[1], t[2])) : "ambient" == u.type && (v = new THREE.AmbientLight(r)), B.scene.add(v), B.lights[o] = v;
    for (n in O.fogs) o = O.fogs[n], "linear" == o.type ? T = new THREE.Fog(0, o.near, o.far) : "exp2" == o.type && (T = new THREE.FogExp2(0, o.density)), C = o.color, T.color.setRGB(C[0], C[1], C[2]), B.fogs[n] = T;
    if (B.cameras && O.defaults.camera) B.currentCamera = B.cameras[O.defaults.camera];
    if (B.fogs && O.defaults.fog) B.scene.fog = B.fogs[O.defaults.fog];
    C = O.defaults.bgcolor;
    B.bgColor = new THREE.Color;
    B.bgColor.setRGB(C[0], C[1], C[2]);
    B.bgColorAlpha = O.defaults.bgalpha;
    for (k in O.geometries) if (n = O.geometries[k], "bin_mesh" == n.type || "ascii_mesh" == n.type) I += 1, l.onLoadStart();
    i = I;
    for (k in O.geometries) if (n = O.geometries[k], "cube" == n.type) K = new THREE.CubeGeometry(n.width, n.height, n.depth, n.segmentsWidth, n.segmentsHeight, n.segmentsDepth, null, n.flipped, n.sides), B.geometries[k] = K;
    else if ("plane" == n.type) K = new THREE.PlaneGeometry(n.width, n.height, n.segmentsWidth, n.segmentsHeight), B.geometries[k] = K;
    else if ("sphere" == n.type) K = new THREE.SphereGeometry(n.radius, n.segmentsWidth, n.segmentsHeight), B.geometries[k] = K;
    else if ("cylinder" == n.type) K = new THREE.CylinderGeometry(n.topRad, n.botRad, n.height, n.radSegs, n.heightSegs), B.geometries[k] = K;
    else if ("torus" == n.type) K = new THREE.TorusGeometry(n.radius, n.tube, n.segmentsR, n.segmentsT), B.geometries[k] = K;
    else if ("icosahedron" == n.type) K = new THREE.IcosahedronGeometry(n.radius, n.subdivisions), B.geometries[k] = K;
    else if ("bin_mesh" == n.type) c.load(d(n.url, O.urlBaseType), f(k));
    else if ("ascii_mesh" == n.type) J.load(d(n.url, O.urlBaseType), f(k));
    else if ("embedded_mesh" == n.type) n = O.embeds[n.id], n.metadata = O.metadata, n && J.createModel(n, g(k), "");
    for (q in O.textures) if (k = O.textures[q], k.url instanceof Array) {
        D += k.url.length;
        for (n = 0; n < k.url.length; n++) l.onLoadStart()
    } else D += 1, l.onLoadStart();
    S = D;
    for (q in O.textures) {
        k = O.textures[q];
        if (void 0 != k.mapping && void 0 != THREE[k.mapping]) k.mapping = new THREE[k.mapping];
        if (k.url instanceof
        Array) {
            n = [];
            for (T = 0; T < k.url.length; T++) n[T] = d(k.url[T], O.urlBaseType);
            n = THREE.ImageUtils.loadTextureCube(n, k.mapping, a)
        } else {
            n = THREE.ImageUtils.loadTexture(d(k.url, O.urlBaseType), k.mapping, a);
            if (void 0 != THREE[k.minFilter]) n.minFilter = THREE[k.minFilter];
            if (void 0 != THREE[k.magFilter]) n.magFilter = THREE[k.magFilter];
            if (k.repeat) {
                n.repeat.set(k.repeat[0], k.repeat[1]);
                if (1 != k.repeat[0]) n.wrapS = THREE.RepeatWrapping;
                if (1 != k.repeat[1]) n.wrapT = THREE.RepeatWrapping
            }
            k.offset && n.offset.set(k.offset[0], k.offset[1]);
            if (k.wrap) {
                T = {
                    repeat: THREE.RepeatWrapping,
                    mirror: THREE.MirroredRepeatWrapping
                };
                if (void 0 !== T[k.wrap[0]]) n.wrapS = T[k.wrap[0]];
                if (void 0 !== T[k.wrap[1]]) n.wrapT = T[k.wrap[1]]
            }
        }
        B.textures[q] = n
    }
    for (p in O.materials) {
        q = O.materials[p];
        for (G in q.parameters) if ("envMap" == G || "map" == G || "lightMap" == G) q.parameters[G] = B.textures[q.parameters[G]];
        else if ("shading" == G) q.parameters[G] = "flat" == q.parameters[G] ? THREE.FlatShading : THREE.SmoothShading;
        else if ("blending" == G) q.parameters[G] = THREE[q.parameters[G]] ? THREE[q.parameters[G]] : THREE.NormalBlending;
        else if ("combine" == G) q.parameters[G] = "MixOperation" == q.parameters[G] ? THREE.MixOperation : THREE.MultiplyOperation;
        else if ("vertexColors" == G) if ("face" == q.parameters[G]) q.parameters[G] = THREE.FaceColors;
        else if (q.parameters[G]) q.parameters[G] = THREE.VertexColors;
        if (void 0 !== q.parameters.opacity && 1 > q.parameters.opacity) q.parameters.transparent = !0;
        if (q.parameters.normalMap) {
            a = THREE.ShaderUtils.lib.normal;
            k = THREE.UniformsUtils.clone(a.uniforms);
            n = q.parameters.color;
            T = q.parameters.specular;
            c = q.parameters.ambient;
            J = q.parameters.shininess;
            k.tNormal.texture = B.textures[q.parameters.normalMap];
            if (q.parameters.normalMapFactor) k.uNormalScale.value = q.parameters.normalMapFactor;
            if (q.parameters.map) k.tDiffuse.texture = q.parameters.map, k.enableDiffuse.value = !0;
            if (q.parameters.lightMap) k.tAO.texture = q.parameters.lightMap, k.enableAO.value = !0;
            if (q.parameters.specularMap) k.tSpecular.texture = B.textures[q.parameters.specularMap], k.enableSpecular.value = !0;
            k.uDiffuseColor.value.setHex(n);
            k.uSpecularColor.value.setHex(T);
            k.uAmbientColor.value.setHex(c);
            k.uShininess.value = J;
            if (q.parameters.opacity) k.uOpacity.value = q.parameters.opacity;
            N = new THREE.ShaderMaterial({
                fragmentShader: a.fragmentShader,
                vertexShader: a.vertexShader,
                uniforms: k,
                lights: !0,
                fog: !0
            })
        } else N = new THREE[q.type](q.parameters);
        B.materials[p] = N
    }
    e();
    l.callbackSync(B);
    h()
};
THREE.UTF8Loader = function () {};
THREE.UTF8Loader.prototype.load = function (a, b, c) {
    var d = new XMLHttpRequest,
        e = void 0 !== c.scale ? c.scale : 1,
        f = void 0 !== c.offsetX ? c.offsetX : 0,
        g = void 0 !== c.offsetY ? c.offsetY : 0,
        h = void 0 !== c.offsetZ ? c.offsetZ : 0;
    d.onreadystatechange = function () {
        4 == d.readyState ? 200 == d.status || 0 == d.status ? THREE.UTF8Loader.prototype.createModel(d.responseText, b, e, f, g, h) : console.error("THREE.UTF8Loader: Couldn't load [" + a + "] [" + d.status + "]") : 3 != d.readyState && 2 == d.readyState && d.getResponseHeader("Content-Length")
    };
    d.open("GET", a, !0);
    d.send(null)
};
THREE.UTF8Loader.prototype.decompressMesh = function (a) {
    var b = a.charCodeAt(0);
    57344 <= b && (b -= 2048);
    b++;
    for (var c = new Float32Array(8 * b), d = 1, e = 0; 8 > e; e++) {
        for (var f = 0, g = 0; g < b; ++g) {
            var h = a.charCodeAt(g + d),
                f = f + (h >> 1 ^ -(h & 1));
            c[8 * g + e] = f
        }
        d += b
    }
    b = a.length - d;
    f = new Uint16Array(b);
    for (e = g = 0; e < b; e++) h = a.charCodeAt(e + d), f[e] = g - h, 0 == h && g++;
    return [c, f]
};
THREE.UTF8Loader.prototype.createModel = function (a, b, c, d, e, f) {
    var g = function () {
            var b = this;
            b.materials = [];
            THREE.Geometry.call(this);
            var g = THREE.UTF8Loader.prototype.decompressMesh(a),
                j = [],
                k = [];
            (function (a, g, j) {
                for (var k, l, q, s = a.length; j < s; j += g) k = a[j], l = a[j + 1], q = a[j + 2], k = k / 16383 * c, l = l / 16383 * c, q = q / 16383 * c, k += d, l += e, q += f, b.vertices.push(new THREE.Vertex(new THREE.Vector3(k, l, q)))
            })(g[0], 8, 0);
            (function (a, b, c) {
                for (var d, e, f = a.length; c < f; c += b) d = a[c], e = a[c + 1], d /= 1023, e /= 1023, k.push(d, 1 - e)
            })(g[0], 8, 3);
            (function (a, b, c) {
                for (var d, e, f, g = a.length; c < g; c += b) d = a[c], e = a[c + 1], f = a[c + 2], d = (d - 512) / 511, e = (e - 512) / 511, f = (f - 512) / 511, j.push(d, e, f)
            })(g[0], 8, 5);
            (function (a) {
                var c, d, e, f, g, l, u, v, t, w = a.length;
                for (c = 0; c < w; c += 3) {
                    d = a[c];
                    e = a[c + 1];
                    f = a[c + 2];
                    g = b;
                    v = d;
                    t = e;
                    l = f;
                    var z = j[3 * e],
                        F = j[3 * e + 1],
                        C = j[3 * e + 2],
                        G = j[3 * f],
                        K = j[3 * f + 1],
                        N = j[3 * f + 2];
                    u = new THREE.Vector3(j[3 * d], j[3 * d + 1], j[3 * d + 2]);
                    z = new THREE.Vector3(z, F, C);
                    G = new THREE.Vector3(G, K, N);
                    g.faces.push(new THREE.Face3(v, t, l, [u, z, G], null, 0));
                    g = k[2 * d];
                    d = k[2 * d + 1];
                    l = k[2 * e];
                    u = k[2 * e + 1];
                    v = k[2 * f];
                    t = k[2 * f + 1];
                    f = b.faceVertexUvs[0];
                    e = l;
                    l = u;
                    u = [];
                    u.push(new THREE.UV(g, d));
                    u.push(new THREE.UV(e, l));
                    u.push(new THREE.UV(v, t));
                    f.push(u)
                }
            })(g[1]);
            this.computeCentroids();
            this.computeFaceNormals()
        };
    g.prototype = new THREE.Geometry;
    g.prototype.constructor = g;
    b(new g)
};
THREE.ImmediateRenderObject = function () {
    THREE.Object3D.call(this);
    this.render = function () {}
};
THREE.ImmediateRenderObject.prototype = new THREE.Object3D;
THREE.ImmediateRenderObject.prototype.constructor = THREE.ImmediateRenderObject;
THREE.LensFlare = function (a, b, c, d, e) {
    THREE.Object3D.call(this);
    this.lensFlares = [];
    this.positionScreen = new THREE.Vector3;
    this.customUpdateCallback = void 0;
    void 0 !== a && this.add(a, b, c, d, e)
};
THREE.LensFlare.prototype = new THREE.Object3D;
THREE.LensFlare.prototype.constructor = THREE.LensFlare;
THREE.LensFlare.prototype.supr = THREE.Object3D.prototype;
THREE.LensFlare.prototype.add = function (a, b, c, d, e, f) {
    void 0 === b && (b = -1);
    void 0 === c && (c = 0);
    void 0 === f && (f = 1);
    void 0 === e && (e = new THREE.Color(16777215));
    if (void 0 === d) d = THREE.NormalBlending;
    c = Math.min(c, Math.max(0, c));
    this.lensFlares.push({
        texture: a,
        size: b,
        distance: c,
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        rotation: 1,
        opacity: f,
        color: e,
        blending: d
    })
};
THREE.LensFlare.prototype.updateLensFlares = function () {
    var a, b = this.lensFlares.length,
        c, d = 2 * -this.positionScreen.x,
        e = 2 * -this.positionScreen.y;
    for (a = 0; a < b; a++) c = this.lensFlares[a], c.x = this.positionScreen.x + d * c.distance, c.y = this.positionScreen.y + e * c.distance, c.wantedRotation = 0.25 * c.x * Math.PI, c.rotation += 0.25 * (c.wantedRotation - c.rotation)
};
THREE.MorphBlendMesh = function (a, b) {
    THREE.Mesh.call(this, a, b);
    this.animationsMap = {};
    this.animationsList = [];
    var c = this.geometry.morphTargets.length;
    this.createAnimation("__default", 0, c - 1, c / 1);
    this.setAnimationWeight("__default", 1)
};
THREE.MorphBlendMesh.prototype = new THREE.Mesh;
THREE.MorphBlendMesh.prototype.constructor = THREE.MorphBlendMesh;
THREE.MorphBlendMesh.prototype.createAnimation = function (a, b, c, d) {
    b = {
        startFrame: b,
        endFrame: c,
        length: c - b + 1,
        fps: d,
        duration: (c - b) / d,
        lastFrame: 0,
        currentFrame: 0,
        active: !1,
        time: 0,
        direction: 1,
        weight: 1,
        directionBackwards: !1,
        mirroredLoop: !1
    };
    this.animationsMap[a] = b;
    this.animationsList.push(b)
};
THREE.MorphBlendMesh.prototype.autoCreateAnimations = function (a) {
    for (var b = /([a-z]+)(\d+)/, c, d = {}, e = this.geometry, f = 0, g = e.morphTargets.length; f < g; f++) {
        var h = e.morphTargets[f].name.match(b);
        if (h && 1 < h.length) {
            var l = h[1];
            d[l] || (d[l] = {
                start: Infinity,
                end: -Infinity
            });
            h = d[l];
            if (f < h.start) h.start = f;
            if (f > h.end) h.end = f;
            c || (c = l)
        }
    }
    for (l in d) h = d[l], this.createAnimation(l, h.start, h.end, a);
    this.firstAnimation = c
};
THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function (a) {
    if (a = this.animationsMap[a]) a.direction = 1, a.directionBackwards = !1
};
THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function (a) {
    if (a = this.animationsMap[a]) a.direction = -1, a.directionBackwards = !0
};
THREE.MorphBlendMesh.prototype.setAnimationFPS = function (a, b) {
    var c = this.animationsMap[a];
    if (c) c.fps = b, c.duration = (c.end - c.start) / c.fps
};
THREE.MorphBlendMesh.prototype.setAnimationDuration = function (a, b) {
    var c = this.animationsMap[a];
    if (c) c.duration = b, c.fps = (c.end - c.start) / c.duration
};
THREE.MorphBlendMesh.prototype.setAnimationWeight = function (a, b) {
    var c = this.animationsMap[a];
    if (c) c.weight = b
};
THREE.MorphBlendMesh.prototype.setAnimationTime = function (a, b) {
    var c = this.animationsMap[a];
    if (c) c.time = b
};
THREE.MorphBlendMesh.prototype.getAnimationTime = function (a) {
    var b = 0;
    if (a = this.animationsMap[a]) b = a.time;
    return b
};
THREE.MorphBlendMesh.prototype.getAnimationDuration = function (a) {
    var b = -1;
    if (a = this.animationsMap[a]) b = a.duration;
    return b
};
THREE.MorphBlendMesh.prototype.playAnimation = function (a) {
    var b = this.animationsMap[a];
    b ? (b.time = 0, b.active = !0) : console.warn("animation[" + a + "] undefined")
};
THREE.MorphBlendMesh.prototype.stopAnimation = function (a) {
    if (a = this.animationsMap[a]) a.active = !1
};
THREE.MorphBlendMesh.prototype.update = function (a) {
    for (var b = 0, c = this.animationsList.length; b < c; b++) {
        var d = this.animationsList[b];
        if (d.active) {
            var e = d.duration / d.length;
            d.time += d.direction * a;
            if (d.mirroredLoop) {
                if (d.time > d.duration || 0 > d.time) {
                    d.direction *= -1;
                    if (d.time > d.duration) d.time = d.duration, d.directionBackwards = !0;
                    if (0 > d.time) d.time = 0, d.directionBackwards = !1
                }
            } else d.time %= d.duration, 0 > d.time && (d.time += d.duration);
            var f = d.startFrame + THREE.Math.clamp(Math.floor(d.time / e), 0, d.length - 1),
                g = d.weight;
            if (f !== d.currentFrame) this.morphTargetInfluences[d.lastFrame] = 0, this.morphTargetInfluences[d.currentFrame] = 1 * g, this.morphTargetInfluences[f] = 0, d.lastFrame = d.currentFrame, d.currentFrame = f;
            e = d.time % e / e;
            d.directionBackwards && (e = 1 - e);
            this.morphTargetInfluences[d.currentFrame] = e * g;
            this.morphTargetInfluences[d.lastFrame] = (1 - e) * g
        }
    }
};
THREE.LensFlarePlugin = function () {
    function a(a) {
        var c = b.createProgram(),
            d = b.createShader(b.FRAGMENT_SHADER),
            e = b.createShader(b.VERTEX_SHADER);
        b.shaderSource(d, a.fragmentShader);
        b.shaderSource(e, a.vertexShader);
        b.compileShader(d);
        b.compileShader(e);
        b.attachShader(c, d);
        b.attachShader(c, e);
        b.linkProgram(c);
        return c
    }
    var b, c, d, e, f, g, h, l, j, k, p, m, o;
    this.init = function (r) {
        b = r.context;
        c = r;
        d = new Float32Array(16);
        e = new Uint16Array(6);
        r = 0;
        d[r++] = -1;
        d[r++] = -1;
        d[r++] = 0;
        d[r++] = 0;
        d[r++] = 1;
        d[r++] = -1;
        d[r++] = 1;
        d[r++] = 0;
        d[r++] = 1;
        d[r++] = 1;
        d[r++] = 1;
        d[r++] = 1;
        d[r++] = -1;
        d[r++] = 1;
        d[r++] = 0;
        d[r++] = 1;
        r = 0;
        e[r++] = 0;
        e[r++] = 1;
        e[r++] = 2;
        e[r++] = 0;
        e[r++] = 2;
        e[r++] = 3;
        f = b.createBuffer();
        g = b.createBuffer();
        b.bindBuffer(b.ARRAY_BUFFER, f);
        b.bufferData(b.ARRAY_BUFFER, d, b.STATIC_DRAW);
        b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, g);
        b.bufferData(b.ELEMENT_ARRAY_BUFFER, e, b.STATIC_DRAW);
        h = b.createTexture();
        l = b.createTexture();
        b.bindTexture(b.TEXTURE_2D, h);
        b.texImage2D(b.TEXTURE_2D, 0, b.RGB, 16, 16, 0, b.RGB, b.UNSIGNED_BYTE, null);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
        b.bindTexture(b.TEXTURE_2D, l);
        b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, 16, 16, 0, b.RGBA, b.UNSIGNED_BYTE, null);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
        0 >= b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS) ? (j = !1, k = a(THREE.ShaderFlares.lensFlare)) : (j = !0, k = a(THREE.ShaderFlares.lensFlareVertexTexture));
        p = {};
        m = {};
        p.vertex = b.getAttribLocation(k, "position");
        p.uv = b.getAttribLocation(k, "uv");
        m.renderType = b.getUniformLocation(k, "renderType");
        m.map = b.getUniformLocation(k, "map");
        m.occlusionMap = b.getUniformLocation(k, "occlusionMap");
        m.opacity = b.getUniformLocation(k, "opacity");
        m.color = b.getUniformLocation(k, "color");
        m.scale = b.getUniformLocation(k, "scale");
        m.rotation = b.getUniformLocation(k, "rotation");
        m.screenPosition = b.getUniformLocation(k, "screenPosition");
        o = !1
    };
    this.render = function (a, d, e, s) {
        var a = a.__webglFlares,
            u = a.length;
        if (u) {
            var v = new THREE.Vector3,
                t = s / e,
                w = 0.5 * e,
                z = 0.5 * s,
                F = 16 / s,
                C = new THREE.Vector2(F * t, F),
                G = new THREE.Vector3(1, 1, 0),
                K = new THREE.Vector2(1, 1),
                N = m,
                F = p;
            b.useProgram(k);
            o || (b.enableVertexAttribArray(p.vertex), b.enableVertexAttribArray(p.uv), o = !0);
            b.uniform1i(N.occlusionMap, 0);
            b.uniform1i(N.map, 1);
            b.bindBuffer(b.ARRAY_BUFFER, f);
            b.vertexAttribPointer(F.vertex, 2, b.FLOAT, !1, 16, 0);
            b.vertexAttribPointer(F.uv, 2, b.FLOAT, !1, 16, 8);
            b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, g);
            b.disable(b.CULL_FACE);
            b.depthMask(!1);
            var P, T, O, J, I;
            for (P = 0; P < u; P++) if (F = 16 / s, C.set(F * t, F), J = a[P], v.set(J.matrixWorld.n14, J.matrixWorld.n24, J.matrixWorld.n34), d.matrixWorldInverse.multiplyVector3(v), d.projectionMatrix.multiplyVector3(v), G.copy(v), K.x = G.x * w + w, K.y = G.y * z + z, j || 0 < K.x && K.x < e && 0 < K.y && K.y < s) {
                b.activeTexture(b.TEXTURE1);
                b.bindTexture(b.TEXTURE_2D, h);
                b.copyTexImage2D(b.TEXTURE_2D, 0, b.RGB, K.x - 8, K.y - 8, 16, 16, 0);
                b.uniform1i(N.renderType, 0);
                b.uniform2f(N.scale, C.x, C.y);
                b.uniform3f(N.screenPosition, G.x, G.y, G.z);
                b.disable(b.BLEND);
                b.enable(b.DEPTH_TEST);
                b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
                b.activeTexture(b.TEXTURE0);
                b.bindTexture(b.TEXTURE_2D, l);
                b.copyTexImage2D(b.TEXTURE_2D, 0, b.RGBA, K.x - 8, K.y - 8, 16, 16, 0);
                b.uniform1i(N.renderType, 1);
                b.disable(b.DEPTH_TEST);
                b.activeTexture(b.TEXTURE1);
                b.bindTexture(b.TEXTURE_2D, h);
                b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
                J.positionScreen.copy(G);
                J.customUpdateCallback ? J.customUpdateCallback(J) : J.updateLensFlares();
                b.uniform1i(N.renderType, 2);
                b.enable(b.BLEND);
                for (T = 0, O = J.lensFlares.length; T < O; T++) if (I = J.lensFlares[T], 0.001 < I.opacity && 0.001 < I.scale) G.x = I.x, G.y = I.y, G.z = I.z, F = I.size * I.scale / s, C.x = F * t, C.y = F, b.uniform3f(N.screenPosition, G.x, G.y, G.z), b.uniform2f(N.scale, C.x, C.y), b.uniform1f(N.rotation, I.rotation), b.uniform1f(N.opacity, I.opacity), b.uniform3f(N.color, I.color.r, I.color.g, I.color.b), c.setBlending(I.blending, I.blendEquation, I.blendSrc, I.blendDst), c.setTexture(I.texture, 1), b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0)
            }
            b.enable(b.CULL_FACE);
            b.enable(b.DEPTH_TEST);
            b.depthMask(!0)
        }
    }
};
THREE.ShadowMapPlugin = function () {
    var a, b, c, d, e = new THREE.Frustum,
        f = new THREE.Matrix4,
        g = new THREE.Vector3,
        h = new THREE.Vector3;
    this.init = function (e) {
        a = e.context;
        b = e;
        var e = THREE.ShaderLib.depthRGBA,
            f = THREE.UniformsUtils.clone(e.uniforms);
        c = new THREE.ShaderMaterial({
            fragmentShader: e.fragmentShader,
            vertexShader: e.vertexShader,
            uniforms: f
        });
        d = new THREE.ShaderMaterial({
            fragmentShader: e.fragmentShader,
            vertexShader: e.vertexShader,
            uniforms: f,
            morphTargets: !0
        });
        c._shadowPass = !0;
        d._shadowPass = !0
    };
    this.render = function (a, c) {
        b.shadowMapEnabled && b.shadowMapAutoUpdate && this.update(a, c)
    };
    this.update = function (l, j) {
        var k, p, m, o, r, n, q, s, u, v = [];
        o = 0;
        a.clearColor(1, 1, 1, 1);
        a.disable(a.BLEND);
        b.shadowMapCullFrontFaces && a.cullFace(a.FRONT);
        b.setDepthTest(!0);
        for (k = 0, p = l.__lights.length; k < p; k++) if (m = l.__lights[k], m.castShadow) if (m instanceof THREE.DirectionalLight && m.shadowCascade) for (r = 0; r < m.shadowCascadeCount; r++) {
            var t;
            if (m.shadowCascadeArray[r]) t = m.shadowCascadeArray[r];
            else {
                u = m;
                q = r;
                t = new THREE.DirectionalLight;
                t.isVirtual = !0;
                t.onlyShadow = !0;
                t.castShadow = !0;
                t.shadowCameraNear = u.shadowCameraNear;
                t.shadowCameraFar = u.shadowCameraFar;
                t.shadowCameraLeft = u.shadowCameraLeft;
                t.shadowCameraRight = u.shadowCameraRight;
                t.shadowCameraBottom = u.shadowCameraBottom;
                t.shadowCameraTop = u.shadowCameraTop;
                t.shadowCameraVisible = u.shadowCameraVisible;
                t.shadowDarkness = u.shadowDarkness;
                t.shadowBias = u.shadowCascadeBias[q];
                t.shadowMapWidth = u.shadowCascadeWidth[q];
                t.shadowMapHeight = u.shadowCascadeHeight[q];
                t.pointsWorld = [];
                t.pointsFrustum = [];
                s = t.pointsWorld;
                n = t.pointsFrustum;
                for (var w = 0; 8 > w; w++) s[w] = new THREE.Vector3, n[w] = new THREE.Vector3;
                s = u.shadowCascadeNearZ[q];
                u = u.shadowCascadeFarZ[q];
                n[0].set(-1, -1, s);
                n[1].set(1, -1, s);
                n[2].set(-1, 1, s);
                n[3].set(1, 1, s);
                n[4].set(-1, -1, u);
                n[5].set(1, -1, u);
                n[6].set(-1, 1, u);
                n[7].set(1, 1, u);
                t.originalCamera = j;
                n = new THREE.Gyroscope;
                n.position = m.shadowCascadeOffset;
                n.add(t);
                n.add(t.target);
                j.add(n);
                m.shadowCascadeArray[r] = t;
                console.log("Created virtualLight", t)
            }
            q = m;
            s = r;
            u = q.shadowCascadeArray[s];
            u.position.copy(q.position);
            u.target.position.copy(q.target.position);
            u.lookAt(u.target);
            u.shadowCameraVisible = q.shadowCameraVisible;
            u.shadowDarkness = q.shadowDarkness;
            u.shadowBias = q.shadowCascadeBias[s];
            n = q.shadowCascadeNearZ[s];
            q = q.shadowCascadeFarZ[s];
            u = u.pointsFrustum;
            u[0].z = n;
            u[1].z = n;
            u[2].z = n;
            u[3].z = n;
            u[4].z = q;
            u[5].z = q;
            u[6].z = q;
            u[7].z = q;
            v[o] = t;
            o++
        } else v[o] = m, o++;
        for (k = 0, p = v.length; k < p; k++) {
            m = v[k];
            if (!m.shadowMap) m.shadowMap = new THREE.WebGLRenderTarget(m.shadowMapWidth, m.shadowMapHeight, {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat
            }), m.shadowMapSize = new THREE.Vector2(m.shadowMapWidth, m.shadowMapHeight), m.shadowMatrix = new THREE.Matrix4;
            if (!m.shadowCamera) {
                if (m instanceof THREE.SpotLight) m.shadowCamera = new THREE.PerspectiveCamera(m.shadowCameraFov, m.shadowMapWidth / m.shadowMapHeight, m.shadowCameraNear, m.shadowCameraFar);
                else if (m instanceof THREE.DirectionalLight) m.shadowCamera = new THREE.OrthographicCamera(m.shadowCameraLeft, m.shadowCameraRight, m.shadowCameraTop, m.shadowCameraBottom, m.shadowCameraNear, m.shadowCameraFar);
                else {
                    console.error("Unsupported light type for shadow");
                    continue
                }
                l.add(m.shadowCamera);
                b.autoUpdateScene && l.updateMatrixWorld()
            }
            if (m.shadowCameraVisible && !m.cameraHelper) m.cameraHelper = new THREE.CameraHelper(m.shadowCamera), m.shadowCamera.add(m.cameraHelper);
            if (m.isVirtual && t.originalCamera == j) {
                r = j;
                o = m.shadowCamera;
                n = m.pointsFrustum;
                u = m.pointsWorld;
                g.set(Infinity, Infinity, Infinity);
                h.set(-Infinity, -Infinity, -Infinity);
                for (q = 0; 8 > q; q++) {
                    s = u[q];
                    s.copy(n[q]);
                    THREE.ShadowMapPlugin.__projector.unprojectVector(s, r);
                    o.matrixWorldInverse.multiplyVector3(s);
                    if (s.x < g.x) g.x = s.x;
                    if (s.x > h.x) h.x = s.x;
                    if (s.y < g.y) g.y = s.y;
                    if (s.y > h.y) h.y = s.y;
                    if (s.z < g.z) g.z = s.z;
                    if (s.z > h.z) h.z = s.z
                }
                o.left = g.x;
                o.right = h.x;
                o.top = h.y;
                o.bottom = g.y;
                o.updateProjectionMatrix()
            }
            o = m.shadowMap;
            n = m.shadowMatrix;
            r = m.shadowCamera;
            r.position.copy(m.matrixWorld.getPosition());
            r.lookAt(m.target.matrixWorld.getPosition());
            r.updateMatrixWorld();
            r.matrixWorldInverse.getInverse(r.matrixWorld);
            if (m.cameraHelper) m.cameraHelper.lines.visible = m.shadowCameraVisible;
            m.shadowCameraVisible && m.cameraHelper.update();
            n.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
            n.multiplySelf(r.projectionMatrix);
            n.multiplySelf(r.matrixWorldInverse);
            if (!r._viewMatrixArray) r._viewMatrixArray = new Float32Array(16);
            if (!r._projectionMatrixArray) r._projectionMatrixArray = new Float32Array(16);
            r.matrixWorldInverse.flattenToArray(r._viewMatrixArray);
            r.projectionMatrix.flattenToArray(r._projectionMatrixArray);
            f.multiply(r.projectionMatrix, r.matrixWorldInverse);
            e.setFromMatrix(f);
            b.setRenderTarget(o);
            b.clear();
            u = l.__webglObjects;
            for (m = 0, o = u.length; m < o; m++) if (q = u[m], n = q.object, q.render = !1, n.visible && n.castShadow && (!(n instanceof THREE.Mesh) || !n.frustumCulled || e.contains(n))) n.matrixWorld.flattenToArray(n._objectMatrixArray), n._modelViewMatrix.multiplyToArray(r.matrixWorldInverse, n.matrixWorld, n._modelViewMatrixArray), q.render = !0;
            for (m = 0, o = u.length; m < o; m++) if (q = u[m], q.render) n = q.object, q = q.buffer, b.setObjectFaces(n), s = n.customDepthMaterial ? n.customDepthMaterial : n.geometry.morphTargets.length ? d : c, q instanceof THREE.BufferGeometry ? b.renderBufferDirect(r, l.__lights, null, s, q, n) : b.renderBuffer(r, l.__lights, null, s, q, n);
            u = l.__webglObjectsImmediate;
            for (m = 0, o = u.length; m < o; m++) q = u[m], n = q.object, n.visible && n.castShadow && (n.matrixAutoUpdate && n.matrixWorld.flattenToArray(n._objectMatrixArray), n._modelViewMatrix.multiplyToArray(r.matrixWorldInverse, n.matrixWorld, n._modelViewMatrixArray), b.renderImmediateObject(r, l.__lights, null, c, n))
        }
        k = b.getClearColor();
        p = b.getClearAlpha();
        a.clearColor(k.r, k.g, k.b, p);
        a.enable(a.BLEND);
        b.shadowMapCullFrontFaces && a.cullFace(a.BACK)
    }
};
THREE.ShadowMapPlugin.__projector = new THREE.Projector;
THREE.SpritePlugin = function () {
    function a(a, b) {
        return b.z - a.z
    }
    var b, c, d, e, f, g, h, l, j, k;
    this.init = function (a) {
        b = a.context;
        c = a;
        d = new Float32Array(16);
        e = new Uint16Array(6);
        a = 0;
        d[a++] = -1;
        d[a++] = -1;
        d[a++] = 0;
        d[a++] = 1;
        d[a++] = 1;
        d[a++] = -1;
        d[a++] = 1;
        d[a++] = 1;
        d[a++] = 1;
        d[a++] = 1;
        d[a++] = 1;
        d[a++] = 0;
        d[a++] = -1;
        d[a++] = 1;
        d[a++] = 0;
        a = d[a++] = 0;
        e[a++] = 0;
        e[a++] = 1;
        e[a++] = 2;
        e[a++] = 0;
        e[a++] = 2;
        e[a++] = 3;
        f = b.createBuffer();
        g = b.createBuffer();
        b.bindBuffer(b.ARRAY_BUFFER, f);
        b.bufferData(b.ARRAY_BUFFER, d, b.STATIC_DRAW);
        b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, g);
        b.bufferData(b.ELEMENT_ARRAY_BUFFER, e, b.STATIC_DRAW);
        var a = THREE.ShaderSprite.sprite,
            m = b.createProgram(),
            o = b.createShader(b.FRAGMENT_SHADER),
            r = b.createShader(b.VERTEX_SHADER);
        b.shaderSource(o, a.fragmentShader);
        b.shaderSource(r, a.vertexShader);
        b.compileShader(o);
        b.compileShader(r);
        b.attachShader(m, o);
        b.attachShader(m, r);
        b.linkProgram(m);
        h = m;
        l = {};
        j = {};
        l.position = b.getAttribLocation(h, "position");
        l.uv = b.getAttribLocation(h, "uv");
        j.uvOffset = b.getUniformLocation(h, "uvOffset");
        j.uvScale = b.getUniformLocation(h, "uvScale");
        j.rotation = b.getUniformLocation(h, "rotation");
        j.scale = b.getUniformLocation(h, "scale");
        j.alignment = b.getUniformLocation(h, "alignment");
        j.color = b.getUniformLocation(h, "color");
        j.map = b.getUniformLocation(h, "map");
        j.opacity = b.getUniformLocation(h, "opacity");
        j.useScreenCoordinates = b.getUniformLocation(h, "useScreenCoordinates");
        j.affectedByDistance = b.getUniformLocation(h, "affectedByDistance");
        j.screenPosition = b.getUniformLocation(h, "screenPosition");
        j.modelViewMatrix = b.getUniformLocation(h, "modelViewMatrix");
        j.projectionMatrix = b.getUniformLocation(h, "projectionMatrix");
        k = !1
    };
    this.render = function (d, e, o, r) {
        var d = d.__webglSprites,
            n = d.length;
        if (n) {
            var q = l,
                s = j,
                u = r / o,
                o = 0.5 * o,
                v = 0.5 * r,
                t = !0;
            b.useProgram(h);
            k || (b.enableVertexAttribArray(q.position), b.enableVertexAttribArray(q.uv), k = !0);
            b.disable(b.CULL_FACE);
            b.enable(b.BLEND);
            b.depthMask(!0);
            b.bindBuffer(b.ARRAY_BUFFER, f);
            b.vertexAttribPointer(q.position, 2, b.FLOAT, !1, 16, 0);
            b.vertexAttribPointer(q.uv, 2, b.FLOAT, !1, 16, 8);
            b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, g);
            b.uniformMatrix4fv(s.projectionMatrix, !1, e._projectionMatrixArray);
            b.activeTexture(b.TEXTURE0);
            b.uniform1i(s.map, 0);
            for (var w, z = [], q = 0; q < n; q++) if (w = d[q], w.visible && 0 !== w.opacity) w.useScreenCoordinates ? w.z = -w.position.z : (w._modelViewMatrix.multiplyToArray(e.matrixWorldInverse, w.matrixWorld, w._modelViewMatrixArray), w.z = -w._modelViewMatrix.n34);
            d.sort(a);
            for (q = 0; q < n; q++) w = d[q], w.visible && 0 !== w.opacity && w.map && w.map.image && w.map.image.width && (w.useScreenCoordinates ? (b.uniform1i(s.useScreenCoordinates, 1), b.uniform3f(s.screenPosition, (w.position.x - o) / o, (v - w.position.y) / v, Math.max(0, Math.min(1, w.position.z)))) : (b.uniform1i(s.useScreenCoordinates, 0), b.uniform1i(s.affectedByDistance, w.affectedByDistance ? 1 : 0), b.uniformMatrix4fv(s.modelViewMatrix, !1, w._modelViewMatrixArray)), e = w.map.image.width / (w.scaleByViewport ? r : 1), z[0] = e * u * w.scale.x, z[1] = e * w.scale.y, b.uniform2f(s.uvScale, w.uvScale.x, w.uvScale.y), b.uniform2f(s.uvOffset, w.uvOffset.x, w.uvOffset.y), b.uniform2f(s.alignment, w.alignment.x, w.alignment.y), b.uniform1f(s.opacity, w.opacity), b.uniform3f(s.color, w.color.r, w.color.g, w.color.b), b.uniform1f(s.rotation, w.rotation), b.uniform2fv(s.scale, z), w.mergeWith3D && !t ? (b.enable(b.DEPTH_TEST), t = !0) : !w.mergeWith3D && t && (b.disable(b.DEPTH_TEST), t = !1), c.setBlending(w.blending, w.blendEquation, w.blendSrc, w.blendDst), c.setTexture(w.map, 0), b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0));
            b.enable(b.CULL_FACE);
            b.enable(b.DEPTH_TEST);
            b.depthMask(!0)
        }
    }
};
THREE.DepthPassPlugin = function () {
    this.enabled = !1;
    this.renderTarget = null;
    var a, b, c, d, e = new THREE.Frustum,
        f = new THREE.Matrix4;
    this.init = function (e) {
        a = e.context;
        b = e;
        var e = THREE.ShaderLib.depthRGBA,
            f = THREE.UniformsUtils.clone(e.uniforms);
        c = new THREE.ShaderMaterial({
            fragmentShader: e.fragmentShader,
            vertexShader: e.vertexShader,
            uniforms: f
        });
        d = new THREE.ShaderMaterial({
            fragmentShader: e.fragmentShader,
            vertexShader: e.vertexShader,
            uniforms: f,
            morphTargets: !0
        });
        c._shadowPass = !0;
        d._shadowPass = !0
    };
    this.render = function (a, b) {
        this.enabled && this.update(a, b)
    };
    this.update = function (g, h) {
        var l, j, k, p, m, o;
        a.clearColor(1, 1, 1, 1);
        a.disable(a.BLEND);
        b.setDepthTest(!0);
        b.autoUpdateScene && g.updateMatrixWorld();
        if (!h._viewMatrixArray) h._viewMatrixArray = new Float32Array(16);
        if (!h._projectionMatrixArray) h._projectionMatrixArray = new Float32Array(16);
        h.matrixWorldInverse.getInverse(h.matrixWorld);
        h.matrixWorldInverse.flattenToArray(h._viewMatrixArray);
        h.projectionMatrix.flattenToArray(h._projectionMatrixArray);
        f.multiply(h.projectionMatrix, h.matrixWorldInverse);
        e.setFromMatrix(f);
        b.setRenderTarget(this.renderTarget);
        b.clear();
        o = g.__webglObjects;
        for (l = 0, j = o.length; l < j; l++) if (k = o[l], m = k.object, k.render = !1, m.visible && (!(m instanceof THREE.Mesh) || !m.frustumCulled || e.contains(m))) m.matrixWorld.flattenToArray(m._objectMatrixArray), m._modelViewMatrix.multiplyToArray(h.matrixWorldInverse, m.matrixWorld, m._modelViewMatrixArray), k.render = !0;
        for (l = 0, j = o.length; l < j; l++) if (k = o[l], k.render) m = k.object, k = k.buffer, b.setObjectFaces(m), p = m.customDepthMaterial ? m.customDepthMaterial : m.geometry.morphTargets.length ? d : c, k instanceof THREE.BufferGeometry ? b.renderBufferDirect(h, g.__lights, null, p, k, m) : b.renderBuffer(h, g.__lights, null, p, k, m);
        o = g.__webglObjectsImmediate;
        for (l = 0, j = o.length; l < j; l++) k = o[l], m = k.object, m.visible && m.castShadow && (m.matrixAutoUpdate && m.matrixWorld.flattenToArray(m._objectMatrixArray), m._modelViewMatrix.multiplyToArray(h.matrixWorldInverse, m.matrixWorld, m._modelViewMatrixArray), b.renderImmediateObject(h, g.__lights, null, c, m));
        l = b.getClearColor();
        j = b.getClearAlpha();
        a.clearColor(l.r, l.g, l.b, j);
        a.enable(a.BLEND)
    }
};
if (THREE.WebGLRenderer) THREE.AnaglyphWebGLRenderer = function (a) {
    THREE.WebGLRenderer.call(this, a);
    this.autoUpdateScene = !1;
    var b = this,
        c = this.setSize,
        d = this.render,
        e = new THREE.PerspectiveCamera,
        f = new THREE.PerspectiveCamera,
        g = new THREE.Matrix4,
        h = new THREE.Matrix4,
        l, j, k, p;
    e.matrixAutoUpdate = f.matrixAutoUpdate = !1;
    var a = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat
    },
        m = new THREE.WebGLRenderTarget(512, 512, a),
        o = new THREE.WebGLRenderTarget(512, 512, a),
        r = new THREE.PerspectiveCamera(53, 1, 1, 1E4);
    r.position.z = 2;
    var a = new THREE.ShaderMaterial({
        uniforms: {
            mapLeft: {
                type: "t",
                value: 0,
                texture: m
            },
            mapRight: {
                type: "t",
                value: 1,
                texture: o
            }
        },
        vertexShader: "varying vec2 vUv;\nvoid main() {\nvUv = vec2( uv.x, 1.0 - uv.y );\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
        fragmentShader: "uniform sampler2D mapLeft;\nuniform sampler2D mapRight;\nvarying vec2 vUv;\nvoid main() {\nvec4 colorL, colorR;\nvec2 uv = vUv;\ncolorL = texture2D( mapLeft, uv );\ncolorR = texture2D( mapRight, uv );\ngl_FragColor = vec4( colorL.g * 0.7 + colorL.b * 0.3, colorR.g, colorR.b, colorL.a + colorR.a ) * 1.1;\n}"
    }),
        n = new THREE.Scene,
        a = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), a);
    a.rotation.x = Math.PI / 2;
    n.add(a);
    n.add(r);
    this.setSize = function (a, d) {
        c.call(b, a, d);
        m.width = a;
        m.height = d;
        o.width = a;
        o.height = d
    };
    this.render = function (a, c) {
        a.updateMatrixWorld();
        if (l !== c.aspect || j !== c.near || k !== c.far || p !== c.fov) {
            l = c.aspect;
            j = c.near;
            k = c.far;
            p = c.fov;
            var u = c.projectionMatrix.clone(),
                v = 0.5 * (125 / 30),
                t = v * j / 125,
                w = j * Math.tan(p * Math.PI / 360),
                z;
            g.n14 = v;
            h.n14 = -v;
            v = -w * l + t;
            z = w * l + t;
            u.n11 = 2 * j / (z - v);
            u.n13 = (z + v) / (z - v);
            e.projectionMatrix.copy(u);
            v = -w * l - t;
            z = w * l - t;
            u.n11 = 2 * j / (z - v);
            u.n13 = (z + v) / (z - v);
            f.projectionMatrix.copy(u)
        }
        e.matrixWorld.copy(c.matrixWorld).multiplySelf(h);
        e.position.copy(c.position);
        e.near = c.near;
        e.far = c.far;
        d.call(b, a, e, m, !0);
        f.matrixWorld.copy(c.matrixWorld).multiplySelf(g);
        f.position.copy(c.position);
        f.near = c.near;
        f.far = c.far;
        d.call(b, a, f, o, !0);
        n.updateMatrixWorld();
        d.call(b, n, r)
    }
};
if (THREE.WebGLRenderer) THREE.CrosseyedWebGLRenderer = function (a) {
    THREE.WebGLRenderer.call(this, a);
    this.autoClear = !1;
    var b = this,
        c = this.setSize,
        d = this.render,
        e, f, g = new THREE.PerspectiveCamera;
    g.target = new THREE.Vector3(0, 0, 0);
    var h = new THREE.PerspectiveCamera;
    h.target = new THREE.Vector3(0, 0, 0);
    b.separation = 10;
    if (a && void 0 !== a.separation) b.separation = a.separation;
    this.setSize = function (a, d) {
        c.call(b, a, d);
        e = a / 2;
        f = d
    };
    this.render = function (a, c) {
        this.clear();
        g.fov = c.fov;
        g.aspect = 0.5 * c.aspect;
        g.near = c.near;
        g.far = c.far;
        g.updateProjectionMatrix();
        g.position.copy(c.position);
        g.target.copy(c.target);
        g.translateX(b.separation);
        g.lookAt(g.target);
        h.projectionMatrix = g.projectionMatrix;
        h.position.copy(c.position);
        h.target.copy(c.target);
        h.translateX(-b.separation);
        h.lookAt(h.target);
        this.setViewport(0, 0, e, f);
        d.call(b, a, g);
        this.setViewport(e, 0, e, f);
        d.call(b, a, h, !1)
    }
};
THREE.ShaderFlares = {
    lensFlareVertexTexture: {
        vertexShader: "uniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform int renderType;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility = (       visibility.r / 9.0 ) *\n( 1.0 - visibility.g / 9.0 ) *\n(       visibility.b / 9.0 ) *\n( 1.0 - visibility.a / 9.0 );\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
        fragmentShader: "precision mediump float;\nuniform sampler2D map;\nuniform float opacity;\nuniform int renderType;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
    },
    lensFlare: {
        vertexShader: "uniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform int renderType;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
        fragmentShader: "precision mediump float;\nuniform sampler2D map;\nuniform sampler2D occlusionMap;\nuniform float opacity;\nuniform int renderType;\nuniform vec3 color;\nvarying vec2 vUV;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * visibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
    }
};
THREE.ShaderSprite = {
    sprite: {
        vertexShader: "uniform int useScreenCoordinates;\nuniform int affectedByDistance;\nuniform vec3 screenPosition;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 alignment;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( affectedByDistance == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
        fragmentShader: "precision mediump float;\nuniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\n}"
    }
};
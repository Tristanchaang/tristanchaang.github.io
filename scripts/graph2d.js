var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var darkGreen = "#003425";
var green = "#005B41";
var aquamarine = "aquamarine";
var bg = "#2C3333";
var NODE_RADIUS = 30;
function elemById(id) { var _a; return (_a = document.getElementById(id)) !== null && _a !== void 0 ? _a : assert.fail(); }
var graph = elemById("graph");
var nodesPanel = elemById("nodes");
var edgesPanel = elemById("edges");
function setAttrs(obj, attrs, styles) {
    Object.entries(attrs).map(function (_a) {
        var _b = __read(_a, 2), attr = _b[0], val = _b[1];
        obj.setAttribute(attr, String(val));
    });
    Object.entries(styles).map(function (_a) {
        var _b = __read(_a, 2), style = _b[0], val = _b[1];
        obj.style[style] = String(val);
    });
}
function createSVG(tag, attrs, styles, textContent) {
    if (attrs === void 0) { attrs = {}; }
    if (styles === void 0) { styles = {}; }
    if (textContent === void 0) { textContent = ""; }
    var elem = document.createElementNS("http://www.w3.org/2000/svg", tag);
    setAttrs(elem, attrs, styles);
    if (textContent.length > 0)
        elem.textContent = textContent;
    return elem;
}
function cplxAdd(_a, _b) {
    var _c = __read(_a, 2), x1 = _c[0], y1 = _c[1];
    var _d = __read(_b, 2), x2 = _d[0], y2 = _d[1];
    return [x1 + x2, y1 + y2];
}
function cplxMul(_a, _b) {
    var _c = __read(_a, 2), x1 = _c[0], y1 = _c[1];
    var _d = __read(_b, 2), x2 = _d[0], y2 = _d[1];
    return [x1 * x2 - y1 * y2, x1 * y2 + y1 * x2];
}
var Vertex = /** @class */ (function () {
    function Vertex(label, x, y) {
        this.label = label;
        this.x = x;
        this.y = y;
        this.outEdges = [];
        this.g = createSVG("g");
        this.writeHTML();
    }
    Vertex.prototype.addOutEdge = function (e) { this.outEdges.push(e); };
    Vertex.prototype.removeOutEdge = function (edge) { this.outEdges = this.outEdges.filter(function (e) { return (e !== edge); }); };
    Vertex.prototype.setSuperscript = function (s) { this.g.querySelectorAll("text")[1].textContent = s; };
    Vertex.prototype.highlight = function (on, defaultColor) {
        if (defaultColor === void 0) { defaultColor = aquamarine; }
        this.g.querySelector("circle").style.stroke = on ? defaultColor : green;
    };
    Vertex.prototype.move = function (newX, newY) {
        var e_1, _a;
        this.x = newX;
        this.y = newY;
        nodesPanel.removeChild(this.g);
        this.g = createSVG("g");
        this.writeHTML();
        try {
            for (var _b = __values(Edge.all()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var e = _c.value;
                if (e.start === this || e.end === this)
                    e.redraw();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Vertex.prototype.delete = function () {
        var e_2, _a;
        try {
            for (var _b = __values(Edge.all()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var e = _c.value;
                if (e.start.label === this.label || e.end.label === this.label) {
                    e.start.removeOutEdge(e);
                    e.end.removeOutEdge(e);
                    edgesPanel.removeChild(e.g);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        delete Vertex.ids[this.label];
        nodesPanel.removeChild(this.g);
    };
    Vertex.prototype.writeHTML = function () {
        var _this = this;
        this.g.appendChild(createSVG("circle", { cx: this.x, cy: this.y, r: NODE_RADIUS }, { fill: darkGreen, stroke: green, strokeWidth: "8px" }));
        this.g.appendChild(createSVG("text", { x: this.x, y: this.y }, { fill: aquamarine, textAnchor: "middle", alignmentBaseline: "central", fontSize: "30" }, this.label));
        this.g.appendChild(createSVG("text", { x: this.x, y: this.y - NODE_RADIUS * 1.6 }, { fill: aquamarine, textAnchor: "middle", alignmentBaseline: "central", fontSize: "30" }));
        this.g.classList.add("node");
        this.g.onclick = function () { queue.push(_this); };
        nodesPanel.appendChild(this.g);
    };
    Vertex.all = function () {
        var _a, _b, v, e_3_1;
        var e_3, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, 6, 7]);
                    _a = __values(Object.values(Vertex.ids)), _b = _a.next();
                    _d.label = 1;
                case 1:
                    if (!!_b.done) return [3 /*break*/, 4];
                    v = _b.value;
                    return [4 /*yield*/, v];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    _b = _a.next();
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5:
                    e_3_1 = _d.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    };
    Vertex.ids = {};
    return Vertex;
}());
var Edge = /** @class */ (function () {
    function Edge(start, end, weight, bend) {
        this.start = start;
        this.end = end;
        this.weight = weight;
        this.bend = bend;
        this.g = createSVG("g");
        this.label = 0;
        while (Edge.labels.includes(this.label))
            this.label++;
        Edge.labels.push(this.label);
        this.writeHTML();
    }
    Edge.prototype.highlight = function (on) {
        var _a;
        this.g.querySelector("path").style.stroke = on ? aquamarine : green;
        (_a = this.g.querySelector("defs")) === null || _a === void 0 ? void 0 : _a.querySelector("path").setAttribute("fill", on ? aquamarine : green);
    };
    Edge.prototype.delete = function () {
        this.start.removeOutEdge(this);
        edgesPanel.removeChild(this.g);
    };
    Edge.prototype.redraw = function () {
        edgesPanel.removeChild(this.g);
        this.g = createSVG("g");
        this.writeHTML();
    };
    Edge.prototype.writeHTML = function () {
        var _this = this;
        var _a = __read([this.start.x, this.start.y, this.end.x, this.end.y], 4), x1raw = _a[0], y1raw = _a[1], x2raw = _a[2], y2raw = _a[3];
        var shrinkFactor = NODE_RADIUS * 0.9 / (Math.pow((0.25 + Math.pow((this.bend / 100), 2)), 0.5) * Math.pow((Math.pow((x1raw - x2raw), 2) + Math.pow((y1raw - y2raw), 2)), 0.5));
        var _b = __read(cplxAdd([x1raw, y1raw], cplxMul([x2raw - x1raw, y2raw - y1raw], [0.5 * shrinkFactor, this.bend / 100 * shrinkFactor])), 2), x1 = _b[0], y1 = _b[1];
        var _c = __read(cplxAdd([x1raw, y1raw], cplxMul([x2raw - x1raw, y2raw - y1raw], [1 - 0.5 * shrinkFactor, this.bend / 100 * shrinkFactor])), 2), x2 = _c[0], y2 = _c[1];
        var _d = __read(cplxAdd([x1, y1], cplxMul([x2 - x1, y2 - y1], [0.5, this.bend / 100])), 2), xm = _d[0], ym = _d[1];
        var d = "M ".concat(x1, " ").concat(y1, " Q ").concat(xm, " ").concat(ym, " ").concat(x2, " ").concat(y2);
        this.g.appendChild(createSVG("path", { d: d }, { fill: "none", stroke: green, strokeWidth: "10px", markerEnd: "url(#arrow".concat(this.label, ")") }));
        if (this.weight !== 1) {
            this.g.appendChild(createSVG("circle", { cx: (2 * xm + x1 + x2) / 4, cy: (2 * ym + y1 + y2) / 4, r: 15 }, { fill: bg }));
            this.g.appendChild(createSVG("text", { x: (2 * xm + x1 + x2) / 4, y: (2 * ym + y1 + y2) / 4 }, { fill: aquamarine, textAnchor: "middle", alignmentBaseline: "central", fontSize: "20" }, String(this.weight)));
        }
        this.g.classList.add("edge");
        this.g.onclick = function () { queue.push(_this); };
        this.g.appendChild(createSVG("defs"))
            .appendChild(createSVG("marker", { id: "arrow".concat(this.label), viewBox: "0 0 10 10", refX: "3", refY: "3", markerWidth: "10", markerHeight: "10", orient: "auto-start-reverse" }))
            .appendChild(createSVG("path", { d: "M -2 0 L 4 3 L -2 6 L 2 3 L -2 0 z", fill: green }));
        edgesPanel.appendChild(this.g);
    };
    Edge.all = function () {
        var _a, _b, v, _c, _d, e, e_4_1, e_5_1;
        var e_5, _e, e_4, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, 11, 12, 13]);
                    _a = __values(Vertex.all()), _b = _a.next();
                    _g.label = 1;
                case 1:
                    if (!!_b.done) return [3 /*break*/, 10];
                    v = _b.value;
                    _g.label = 2;
                case 2:
                    _g.trys.push([2, 7, 8, 9]);
                    _c = (e_4 = void 0, __values(v.outEdges)), _d = _c.next();
                    _g.label = 3;
                case 3:
                    if (!!_d.done) return [3 /*break*/, 6];
                    e = _d.value;
                    return [4 /*yield*/, e];
                case 4:
                    _g.sent();
                    _g.label = 5;
                case 5:
                    _d = _c.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_4_1 = _g.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7 /*endfinally*/];
                case 9:
                    _b = _a.next();
                    return [3 /*break*/, 1];
                case 10: return [3 /*break*/, 13];
                case 11:
                    e_5_1 = _g.sent();
                    e_5 = { error: e_5_1 };
                    return [3 /*break*/, 13];
                case 12:
                    try {
                        if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                    }
                    finally { if (e_5) throw e_5.error; }
                    return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    };
    Edge.labels = [];
    return Edge;
}());
var Coord = /** @class */ (function () {
    function Coord(x, y) {
        this.x = x;
        this.y = y;
    }
    Coord.prototype.delete = function () { };
    return Coord;
}());
var queue = [];
function existCoord(x, y) {
    var e_6, _a;
    try {
        for (var _b = __values(Vertex.all()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var v = _c.value;
            if (v.x === x && v.y === y)
                return true;
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_6) throw e_6.error; }
    }
    return false;
}
function parseCommand() {
    var _a;
    var fullCmd = (_a = elemById("command-panel")) === null || _a === void 0 ? void 0 : _a.textContent;
    var cmds = fullCmd.split(",").map(function (c) { return c.trim(); });
    return __assign({ highlight: cmds.includes("h"), unhighlight: cmds.includes("uh") }, Object.fromEntries(cmds.filter(function (x) { return x.includes("="); }).map(function (x) { return x.split("="); }).filter(function (x) { return x.length === 2; })));
}
document.addEventListener("click", function (ev) {
    if (ev.target === elemById("alg"))
        return;
    var _a = __read([Math.floor((ev.pageX + 25) / 50) * 50, Math.floor((ev.pageY + 25) / 50) * 50], 2), x = _a[0], y = _a[1];
    if (ev.target === graph && !existCoord(x, y)) {
        queue.push(new Coord(x, y));
    }
    showQueue();
});
document.addEventListener("keydown", function (ev) {
    switch (ev.code) {
        case "Enter": {
            enterPressed();
            break;
        }
        case "Escape": {
            emptyQueue();
            break;
        }
        case "Backspace": {
            delPressed();
            break;
        }
        default: {
            elemById("command-panel").textContent += ev.key;
            break;
        }
    }
});
function enterPressed() {
    var _a, _b;
    var meta = parseCommand();
    if (queue.length === 2 && queue[0] instanceof Vertex && queue[1] instanceof Coord) {
        queue[0].move(queue[1].x, queue[1].y);
        return emptyQueue();
    }
    for (var ix = 0; ix < queue.length; ix++) {
        var queueItem = queue[ix];
        if (queueItem instanceof Vertex) {
            cmdOnObj(meta, queueItem);
            if (ix < queue.length - 1) {
                var nextItem = queue[ix + 1];
                if (nextItem instanceof Vertex) {
                    var edge = new Edge(queueItem, nextItem, Number((_a = meta.w) !== null && _a !== void 0 ? _a : 1), Number((_b = meta.b) !== null && _b !== void 0 ? _b : 0));
                    queueItem.addOutEdge(edge);
                }
            }
        }
        else if (queueItem instanceof Edge) {
            cmdOnObj(meta, queueItem);
        }
        else {
            if (existCoord(queueItem.x, queueItem.y))
                break;
            var newID = 0;
            while (Object.keys(Vertex.ids).includes(String(newID)))
                newID++;
            var node = new Vertex(String(newID), queueItem.x, queueItem.y);
            Vertex.ids[node.label] = node;
        }
    }
    emptyQueue();
}
function delPressed() {
    var e_7, _a;
    try {
        for (var queue_1 = __values(queue), queue_1_1 = queue_1.next(); !queue_1_1.done; queue_1_1 = queue_1.next()) {
            var queueItem = queue_1_1.value;
            queueItem.delete();
        }
    }
    catch (e_7_1) { e_7 = { error: e_7_1 }; }
    finally {
        try {
            if (queue_1_1 && !queue_1_1.done && (_a = queue_1.return)) _a.call(queue_1);
        }
        finally { if (e_7) throw e_7.error; }
    }
    emptyQueue();
}
function emptyQueue() {
    elemById("command-panel").textContent = "";
    while (queue.length > 0) {
        queue.pop();
    }
    ;
    showQueue();
}
function showQueue() {
    var e_8, _a, e_9, _b;
    var queueElem = elemById("queue");
    queueElem.innerHTML = "";
    queueElem.style.transition = "none";
    queueElem.style.right = "-33px";
    try {
        for (var queue_2 = __values(queue), queue_2_1 = queue_2.next(); !queue_2_1.done; queue_2_1 = queue_2.next()) {
            var queueItem = queue_2_1.value;
            var elbox = createSVG("svg");
            elbox.style.height = "43px";
            elbox.style.width = "43px";
            if (queueItem instanceof Vertex) {
                var path = createSVG("path");
                setAttrs(path, { d: "M 37 6 L 6 37", fill: "none" }, { stroke: aquamarine, strokeWidth: 3 });
                elbox.appendChild(path);
                var circ = createSVG("circle");
                setAttrs(circ, { cx: "21.5", cy: "21.5", r: "15" }, { fill: darkGreen, stroke: aquamarine, strokeWidth: 3 });
                elbox.appendChild(circ);
            }
            else if (queueItem instanceof Edge) {
                var path = createSVG("path");
                setAttrs(path, { d: "M 35 8 L 8 35", fill: "none" }, { stroke: aquamarine, strokeWidth: 3 });
                elbox.appendChild(path);
                var circ = createSVG("circle");
                setAttrs(circ, { cx: "35", cy: "8", r: "4" }, { fill: darkGreen, stroke: aquamarine, strokeWidth: 3 });
                elbox.appendChild(circ);
                var cric = createSVG("circle");
                setAttrs(cric, { cx: "8", cy: "35", r: "4" }, { fill: darkGreen, stroke: aquamarine, strokeWidth: 3 });
                elbox.appendChild(cric);
            }
            else {
                try {
                    for (var _c = (e_9 = void 0, __values([
                        "M 16 6 L 6 6 L 6 16", "M 27 37 L 37 37 L 37 27",
                        "M 27 6 L 37 6 L 37 16", "M 6 27 L 6 37 L 16 37"
                    ])), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var drawpath = _d.value;
                        var path = createSVG("path");
                        setAttrs(path, { d: drawpath, fill: "none" }, { stroke: "aquamarine", strokeWidth: 3 });
                        elbox.appendChild(path);
                    }
                }
                catch (e_9_1) { e_9 = { error: e_9_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_9) throw e_9.error; }
                }
            }
            queueElem.appendChild(elbox);
        }
    }
    catch (e_8_1) { e_8 = { error: e_8_1 }; }
    finally {
        try {
            if (queue_2_1 && !queue_2_1.done && (_a = queue_2.return)) _a.call(queue_2);
        }
        finally { if (e_8) throw e_8.error; }
    }
    queueElem.offsetHeight; // reset
    queueElem.style.transition = "right 0.4s";
    queueElem.style.right = "20px";
}
function cmdOnObj(meta, obj) {
    if (meta.highlight)
        obj.highlight(true);
    if (meta.unhighlight)
        obj.highlight(false);
    if (meta.superscript !== undefined && obj instanceof Vertex)
        obj.setSuperscript(meta.superscript);
}
function bfs(s) {
    var visited, cur_level_set, next_level_set, cur_level, cur_level_set_1, cur_level_set_1_1, u, _a, _b, e, v, e_10_1, e_11_1;
    var e_11, _c, e_10, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                visited = new Set([s]);
                return [4 /*yield*/, [s, 0, null]];
            case 1:
                _e.sent();
                cur_level_set = [s];
                next_level_set = [];
                cur_level = 0;
                _e.label = 2;
            case 2:
                if (!(cur_level_set.length > 0)) return [3 /*break*/, 17];
                _e.label = 3;
            case 3:
                _e.trys.push([3, 14, 15, 16]);
                cur_level_set_1 = (e_11 = void 0, __values(cur_level_set)), cur_level_set_1_1 = cur_level_set_1.next();
                _e.label = 4;
            case 4:
                if (!!cur_level_set_1_1.done) return [3 /*break*/, 13];
                u = cur_level_set_1_1.value;
                _e.label = 5;
            case 5:
                _e.trys.push([5, 10, 11, 12]);
                _a = (e_10 = void 0, __values(u.outEdges)), _b = _a.next();
                _e.label = 6;
            case 6:
                if (!!_b.done) return [3 /*break*/, 9];
                e = _b.value;
                v = e.end;
                if (visited.has(v))
                    return [3 /*break*/, 8];
                visited.add(v);
                return [4 /*yield*/, [v, cur_level + 1, e]];
            case 7:
                _e.sent();
                next_level_set.push(v);
                _e.label = 8;
            case 8:
                _b = _a.next();
                return [3 /*break*/, 6];
            case 9: return [3 /*break*/, 12];
            case 10:
                e_10_1 = _e.sent();
                e_10 = { error: e_10_1 };
                return [3 /*break*/, 12];
            case 11:
                try {
                    if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                }
                finally { if (e_10) throw e_10.error; }
                return [7 /*endfinally*/];
            case 12:
                cur_level_set_1_1 = cur_level_set_1.next();
                return [3 /*break*/, 4];
            case 13: return [3 /*break*/, 16];
            case 14:
                e_11_1 = _e.sent();
                e_11 = { error: e_11_1 };
                return [3 /*break*/, 16];
            case 15:
                try {
                    if (cur_level_set_1_1 && !cur_level_set_1_1.done && (_c = cur_level_set_1.return)) _c.call(cur_level_set_1);
                }
                finally { if (e_11) throw e_11.error; }
                return [7 /*endfinally*/];
            case 16:
                cur_level++;
                cur_level_set = next_level_set;
                next_level_set = [];
                return [3 /*break*/, 2];
            case 17: return [2 /*return*/, null];
        }
    });
}
function dfs(s) {
    function _dfs(ss) {
        var _a, _b, e, v, e_12_1;
        var e_12, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    visited.add(ss);
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 8, 9, 10]);
                    _a = __values(ss.outEdges), _b = _a.next();
                    _d.label = 2;
                case 2:
                    if (!!_b.done) return [3 /*break*/, 7];
                    e = _b.value;
                    v = e.end;
                    if (visited.has(v))
                        return [3 /*break*/, 6];
                    return [4 /*yield*/, [v, -1, e]];
                case 3:
                    _d.sent();
                    return [5 /*yield**/, __values(_dfs(v))];
                case 4:
                    _d.sent();
                    return [4 /*yield*/, [v, 0, null]];
                case 5:
                    _d.sent();
                    _d.label = 6;
                case 6:
                    _b = _a.next();
                    return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 10];
                case 8:
                    e_12_1 = _d.sent();
                    e_12 = { error: e_12_1 };
                    return [3 /*break*/, 10];
                case 9:
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_12) throw e_12.error; }
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/, null];
            }
        });
    }
    var visited;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                visited = new Set([s]);
                return [4 /*yield*/, [s, -1, null]];
            case 1:
                _a.sent();
                return [5 /*yield**/, __values(_dfs(s))];
            case 2:
                _a.sent();
                return [4 /*yield*/, [s, 0, null]];
            case 3:
                _a.sent();
                return [2 /*return*/, null];
        }
    });
}
var GraphAlg = /** @class */ (function () {
    function GraphAlg() {
    }
    GraphAlg.activate = function (alg) {
        var _a;
        if (!(queue[0] instanceof Vertex))
            throw Error;
        var algGenerator = (_a = {
            BFS: bfs,
            DFS: dfs
        }[alg]) !== null && _a !== void 0 ? _a : assert.fail();
        GraphAlg.alg = alg;
        GraphAlg.order = algGenerator(queue[0]);
        emptyQueue();
    };
    GraphAlg.next = function () {
        var x = GraphAlg.order.next().value;
        if (x === null)
            return GraphAlg.stop();
        var _a = __read(x, 3), vertex = _a[0], level = _a[1], parent = _a[2];
        vertex.highlight(true, (level >= 0) ? aquamarine : "#ff9c9cff");
        if (GraphAlg.alg === "BFS")
            vertex.setSuperscript(String(level));
        if (parent)
            parent.highlight(true);
    };
    GraphAlg.stop = function () {
        var e_13, _a, e_14, _b;
        GraphAlg.alg = "";
        try {
            for (var _c = __values(Vertex.all()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var v = _d.value;
                v.highlight(false);
                v.setSuperscript("");
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_13) throw e_13.error; }
        }
        try {
            for (var _e = __values(Edge.all()), _f = _e.next(); !_f.done; _f = _e.next()) {
                var e = _f.value;
                e.highlight(false);
            }
        }
        catch (e_14_1) { e_14 = { error: e_14_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_14) throw e_14.error; }
        }
    };
    GraphAlg.alg = "";
    return GraphAlg;
}());
function missionNext() {
    if (GraphAlg.alg === "")
        GraphAlg.activate(elemById("alg").textContent);
    GraphAlg.next();
}
function switchMission() {
    var _a;
    var curMission = elemById("alg").textContent;
    elemById("alg").textContent = (_a = {
        BFS: "DFS",
        DFS: "BFS"
    }[curMission]) !== null && _a !== void 0 ? _a : assert.fail();
}

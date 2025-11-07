var _a;
var darkGreen = "#003425";
var green = "#005B41";
var aquamarine = "aquamarine";
var bg = "#2C3333";
var NODE_RADIUS = 30;
function setAttrs(obj, attrs, styles) {
    Object.entries(attrs).map(function (_a) {
        var attr = _a[0], val = _a[1];
        obj.setAttribute(attr, String(val));
    });
    Object.entries(styles).map(function (_a) {
        var style = _a[0], val = _a[1];
        obj.style[style] = String(val);
    });
}
function createSVG(tag, attrs, styles) {
    if (attrs === void 0) { attrs = {}; }
    if (styles === void 0) { styles = {}; }
    var elem = document.createElementNS("http://www.w3.org/2000/svg", tag);
    setAttrs(elem, attrs, styles);
    return elem;
}
var graph = (_a = document.getElementById("graph")) !== null && _a !== void 0 ? _a : assert.fail();
var Vertex = /** @class */ (function () {
    function Vertex(label, x, y) {
        this.label = label;
        this.x = x;
        this.y = y;
        this.outEdges = [];
    }
    Vertex.prototype.addOutEdge = function (e) { this.outEdges.push(e); };
    Vertex.prototype.removeOutEdge = function (edge) {
        this.outEdges = this.outEdges.filter(function (e) { return (e.label !== edge.label); });
    };
    Vertex.prototype.writeHTML = function () {
        var _this = this;
        var _a;
        var _b = [this.x, this.y, this.label], x = _b[0], y = _b[1], label = _b[2];
        var g = createSVG("g");
        var n = createSVG("circle", { cx: x, cy: y, r: NODE_RADIUS }, { fill: darkGreen, stroke: green, strokeWidth: "8px" });
        var t = createSVG("text", { x: x, y: y }, { fill: aquamarine, textAnchor: "middle", alignmentBaseline: "central", fontSize: "30" });
        t.textContent = label;
        g.appendChild(n);
        g.appendChild(t);
        g.id = label;
        g.classList.add("node");
        g.onclick = function () { queue.push(_this); };
        (_a = graph.querySelector("#nodes")) === null || _a === void 0 ? void 0 : _a.appendChild(g);
    };
    return Vertex;
}());
var Edge = /** @class */ (function () {
    function Edge(label, start, end, weight, bend) {
        this.label = label;
        this.start = start;
        this.end = end;
        this.weight = weight;
        this.bend = bend;
    }
    Edge.prototype.writeHTML = function () {
        var _this = this;
        var _a;
        var _b = [this.start.x, this.start.y, this.end.x, this.end.y], x1raw = _b[0], y1raw = _b[1], x2raw = _b[2], y2raw = _b[3];
        var shrinkFactor = NODE_RADIUS * 0.9 / (Math.pow((0.25 + Math.pow((this.bend / 100), 2)), 0.5) * Math.pow((Math.pow((x1raw - x2raw), 2) + Math.pow((y1raw - y2raw), 2)), 0.5));
        var x1 = (x2raw - x1raw) * 0.5 * shrinkFactor - (y2raw - y1raw) * this.bend / 100 * shrinkFactor + x1raw;
        var y1 = (x2raw - x1raw) * this.bend / 100 * shrinkFactor + (y2raw - y1raw) * 0.5 * shrinkFactor + y1raw;
        var x2 = (x2raw - x1raw) * (1 - 0.5 * shrinkFactor) - (y2raw - y1raw) * this.bend / 100 * shrinkFactor + x1raw;
        var y2 = (x2raw - x1raw) * this.bend / 100 * shrinkFactor + (y2raw - y1raw) * (1 - 0.5 * shrinkFactor) + y1raw;
        var xm = (x2 - x1) * 0.5 - (y2 - y1) * this.bend / 100 + x1;
        var ym = (x2 - x1) * this.bend / 100 + (y2 - y1) * 0.5 + y1;
        var d = "M ".concat(x1, " ").concat(y1, " Q ").concat(xm, " ").concat(ym, " ").concat(x2, " ").concat(y2);
        var g = createSVG("g");
        var p = createSVG("path", { d: d }, { fill: "none", stroke: green, strokeWidth: "10px", markerEnd: "url(#arrow)" });
        g.appendChild(p);
        if (this.weight !== 1) {
            var labelPad = createSVG("circle", { cx: (2 * xm + x1 + x2) / 4, cy: (2 * ym + y1 + y2) / 4, r: 15 }, { fill: bg });
            var label = createSVG("text", { x: (2 * xm + x1 + x2) / 4, y: (2 * ym + y1 + y2) / 4 }, { fill: aquamarine, textAnchor: "middle", alignmentBaseline: "central", fontSize: "20" });
            label.textContent = String(this.weight);
            g.appendChild(labelPad);
            g.appendChild(label);
        }
        g.id = this.label;
        g.classList.add("edge");
        g.onclick = function () { queue.push(_this); };
        (_a = graph.querySelector("#edges")) === null || _a === void 0 ? void 0 : _a.appendChild(g);
    };
    return Edge;
}());
var vertices = {};
var queue = [];
function allEdges() {
    var list = [];
    for (var _i = 0, _a = Object.values(vertices); _i < _a.length; _i++) {
        var v = _a[_i];
        for (var _b = 0, _c = v.outEdges; _b < _c.length; _b++) {
            var e = _c[_b];
            list.push(e);
        }
    }
    return list;
}
function existCoord(x, y) {
    for (var _i = 0, _a = Object.values(vertices); _i < _a.length; _i++) {
        var v = _a[_i];
        if (v.x === x && v.y === y)
            return true;
    }
    return false;
}
function parseCommand() {
    var _a;
    var cmd = (_a = document.getElementById("command-panel")) === null || _a === void 0 ? void 0 : _a.textContent;
    try {
        return Object.fromEntries(cmd.split(",").map(function (c) { return c.trim().split("="); }));
    }
    catch (_b) {
        return {};
    }
}
document.addEventListener("click", function (ev) {
    var _a = [Math.floor((ev.pageX + 25) / 50) * 50, Math.floor((ev.pageY + 25) / 50) * 50], x = _a[0], y = _a[1];
    if (ev.target === graph && !existCoord(x, y)) {
        queue.push([null, x, y]);
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
            document.getElementById("command-panel").textContent += ev.key;
            break;
        }
    }
});
function enterPressed() {
    var _a, _b;
    for (var ix = 0; ix < queue.length; ix++) {
        var queueItem = queue[ix];
        if (queueItem instanceof Vertex) {
            if (ix < queue.length - 1) {
                var nextItem = queue[ix + 1];
                if (nextItem instanceof Vertex) {
                    var eIDs = allEdges().map(function (e) { return e.label; });
                    var newID = -1;
                    while (eIDs.includes(String(newID)))
                        newID--;
                    var meta = parseCommand();
                    var edge = new Edge(String(newID), queueItem, nextItem, Number((_a = meta.w) !== null && _a !== void 0 ? _a : 1), Number((_b = meta.b) !== null && _b !== void 0 ? _b : 0));
                    queueItem.addOutEdge(edge);
                    edge.writeHTML();
                }
            }
        }
        else if (queueItem instanceof Edge) { }
        else {
            var _c = queueItem, _ = _c[0], x = _c[1], y = _c[2];
            if (existCoord(x, y))
                break;
            var newID = 0;
            while (Object.keys(vertices).includes(String(newID)))
                newID++;
            var node = new Vertex(String(newID), x, y);
            vertices[node.label] = node;
            node.writeHTML();
        }
    }
    emptyQueue();
}
function delPressed() {
    var _a, _b, _c, _d, _e, _f;
    for (var _i = 0, queue_1 = queue; _i < queue_1.length; _i++) {
        var queueItem = queue_1[_i];
        if (queueItem instanceof Vertex) {
            for (var _g = 0, _h = allEdges(); _g < _h.length; _g++) {
                var e = _h[_g];
                if (e.start.label === queueItem.label || e.end.label === queueItem.label) {
                    e.start.removeOutEdge(e);
                    e.end.removeOutEdge(e);
                    (_a = graph.querySelector("#edges")) === null || _a === void 0 ? void 0 : _a.removeChild((_b = document.getElementById(e.label)) !== null && _b !== void 0 ? _b : assert.fail());
                }
            }
            delete vertices[queueItem.label];
            (_c = graph.querySelector("#nodes")) === null || _c === void 0 ? void 0 : _c.removeChild((_d = document.getElementById(queueItem.label)) !== null && _d !== void 0 ? _d : assert.fail());
        }
        else if (queueItem instanceof Edge) {
            queueItem.start.removeOutEdge(queueItem);
            (_e = graph.querySelector("#edges")) === null || _e === void 0 ? void 0 : _e.removeChild((_f = document.getElementById(queueItem.label)) !== null && _f !== void 0 ? _f : assert.fail());
        }
    }
    emptyQueue();
}
function emptyQueue() {
    document.getElementById("command-panel").textContent = "";
    while (queue.length > 0) {
        queue.pop();
    }
    ;
    showQueue();
}
function showQueue() {
    var _a;
    var queueElem = (_a = document.getElementById("queue")) !== null && _a !== void 0 ? _a : assert.fail();
    queueElem.innerHTML = "";
    queueElem.style.transition = "none";
    queueElem.style.right = "-33px";
    for (var _i = 0, queue_2 = queue; _i < queue_2.length; _i++) {
        var queueItem = queue_2[_i];
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
            for (var _b = 0, _c = [
                "M 16 6 L 6 6 L 6 16", "M 27 37 L 37 37 L 37 27",
                "M 27 6 L 37 6 L 37 16", "M 6 27 L 6 37 L 16 37"
            ]; _b < _c.length; _b++) {
                var drawpath = _c[_b];
                var path = createSVG("path");
                setAttrs(path, { d: drawpath, fill: "none" }, { stroke: "aquamarine", strokeWidth: 3 });
                elbox.appendChild(path);
            }
        }
        queueElem.appendChild(elbox);
    }
    queueElem.offsetHeight; // reset
    queueElem.style.transition = "right 0.4s";
    queueElem.style.right = "20px";
}

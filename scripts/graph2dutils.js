"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elemById = elemById;
function elemById(id) { var _a; return (_a = document.getElementById(id)) !== null && _a !== void 0 ? _a : assert.fail(); }

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function secureRoute(req, res, next) {
    console.log("Hello, This is a secure route");
    next();
}
exports.default = secureRoute;

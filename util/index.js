"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = exports.LoginChecker = void 0;
function LoginChecker(req) {
    return (req.isAuthenticated() ? true : false);
}
exports.LoginChecker = LoginChecker;
function AuthGuard(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect(`/login}`);
    }
}
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=index.js.map
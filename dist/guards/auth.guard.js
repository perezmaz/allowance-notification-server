"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jwt-simple");
const moment = require("moment");
const config_1 = require("../config");
let AuthGuard = class AuthGuard {
    canActivate(context) {
        try {
            const req = context.switchToHttp().getRequest();
            if (!req.headers.authorization) {
                return false;
            }
            const token = req.headers.authorization.replace(/['"]+/g, '');
            const payload = jwt.decode(token, config_1.jwtToken.SECRET_KEY, true);
            if (payload.expired_at <= moment().unix()) {
                return false;
            }
            return true;
        }
        catch (error) {
            return false;
        }
    }
};
AuthGuard = __decorate([
    common_1.Injectable()
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map
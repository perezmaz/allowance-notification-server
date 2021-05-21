"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webSocket = exports.jwtToken = exports.db = exports.api = void 0;
require('dotenv').config();
const { env } = process;
exports.api = {
    PORT: env.PORT,
    VERSION: env.VERSION,
};
exports.db = {
    HOST: env.DB_HOST,
    PORT: env.DB_PORT,
    DATABASE: env.DATABASE,
    USER: env.DB_USER,
    PASSWORD: env.DB_PASSWORD,
};
exports.jwtToken = {
    SECRET_KEY: env.SECRET_KEY,
};
exports.webSocket = {
    PORT: parseInt(env.SOCKET_PORT),
};
//# sourceMappingURL=config.js.map
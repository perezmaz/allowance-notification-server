"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const message_gateway_1 = require("./message.gateway");
let MessageService = class MessageService {
    constructor(gateway) {
        this.gateway = gateway;
    }
    async send(data) {
        try {
            this.gateway.server.to(data.channel).emit('newMessage', data);
            return {
                status: 200,
                code: 0,
                message: 'Success',
            };
        }
        catch (error) {
            return {
                status: 500,
                code: -1,
                message: error.message,
            };
        }
    }
};
MessageService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [message_gateway_1.MessageGateway])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const message_service_1 = require("./message.service");
const send_message_dto_1 = require("./dto/send-message.dto");
const auth_guard_1 = require("../guards/auth.guard");
const config_1 = require("../config");
let MessageController = class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async send(data) {
        const result = await this.messageService.send(data);
        if (result.code === -1) {
            throw new common_1.InternalServerErrorException(result);
        }
        return result;
    }
    handleErrors(result) {
        switch (result.status) {
            case 500:
                throw new common_1.InternalServerErrorException(result);
            case 404:
                throw new common_1.NotFoundException(result);
            default:
        }
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_message_dto_1.default]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "send", null);
MessageController = __decorate([
    common_1.Controller(`api/${config_1.api.VERSION}/sendMessage`),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageController);
exports.MessageController = MessageController;
//# sourceMappingURL=message.controller.js.map
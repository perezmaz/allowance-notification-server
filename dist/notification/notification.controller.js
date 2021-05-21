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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jwt-simple");
const notification_service_1 = require("./notification.service");
const create_notification_dto_1 = require("./dto/create-notification.dto");
const find_all_notifications_dto_1 = require("./dto/find-all-notifications.dto");
const auth_guard_1 = require("../guards/auth.guard");
const config_1 = require("../config");
let NotificationController = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async create(data, headers) {
        const token = headers.authorization.replace(/['"]+/g, '');
        const user = jwt.decode(token, config_1.jwtToken.SECRET_KEY, true);
        const result = await this.notificationService.create(data, user._id);
        if (result.code === -1) {
            throw new common_1.InternalServerErrorException(result);
        }
        return result;
    }
    async findAll(headers, data) {
        const token = headers.authorization.replace(/['"]+/g, '');
        const user = jwt.decode(token, config_1.jwtToken.SECRET_KEY, true);
        const result = await this.notificationService.findAll(user._id, data);
        if (result.code !== 0) {
            this.handleErrors(result);
        }
        return result;
    }
    async count(headers) {
        const token = headers.authorization.replace(/['"]+/g, '');
        const user = jwt.decode(token, config_1.jwtToken.SECRET_KEY, true);
        const result = await this.notificationService.count(user._id);
        if (result.code !== 0) {
            this.handleErrors(result);
        }
        return result;
    }
    async remove(id, headers) {
        const token = headers.authorization.replace(/['"]+/g, '');
        const user = jwt.decode(token, config_1.jwtToken.SECRET_KEY, true);
        const result = await this.notificationService.remove(id, user._id);
        if (result.code !== 0) {
            this.handleErrors(result);
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
    __param(1, common_1.Headers()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notification_dto_1.CreateNotificationDto, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "create", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, common_1.Headers()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, find_all_notifications_dto_1.FindAllNotificationsDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "findAll", null);
__decorate([
    common_1.Get('/count'),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, common_1.Headers()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "count", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Headers()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "remove", null);
NotificationController = __decorate([
    common_1.Controller(`api/${config_1.api.VERSION}/notification`),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.controller.js.map
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
exports.NotificationGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const config_1 = require("../config");
const send_notification_dto_1 = require("./dto/send-notification.dto");
let NotificationGateway = class NotificationGateway {
    constructor() {
        this.logger = new common_1.Logger('NotificationGateway');
    }
    afterInit() {
        this.logger.log('Notification Gateway up!');
    }
    handleConnection(client) {
        this.logger.log(`Client ${client.id} connected`);
        client.emit('connection', 'Connected to server');
    }
    handleDisconnect(client) {
        this.logger.log(`Client ${client.id} disconnected`);
    }
    sendNotification(data) {
        const { channel } = data;
        if (channel) {
            this.server.to(channel).emit('newNotification', data);
        }
        else {
            this.server.emit('newNotification', data);
        }
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], NotificationGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('newNotification'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_notification_dto_1.default]),
    __metadata("design:returntype", void 0)
], NotificationGateway.prototype, "sendNotification", null);
NotificationGateway = __decorate([
    websockets_1.WebSocketGateway(config_1.webSocket.PORT)
], NotificationGateway);
exports.NotificationGateway = NotificationGateway;
//# sourceMappingURL=notification.gateway.js.map
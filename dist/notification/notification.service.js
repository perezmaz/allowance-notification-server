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
exports.NotificationService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const notification_gateway_1 = require("./notification.gateway");
const notification_schema_1 = require("../schemas/notification.schema");
const user_schema_1 = require("../schemas/user.schema");
const mongoose = require("mongoose");
let NotificationService = class NotificationService {
    constructor(gateway, notificationModel, userModel) {
        this.gateway = gateway;
        this.notificationModel = notificationModel;
        this.userModel = userModel;
    }
    async create(data, userId) {
        try {
            const { message, to, linkId } = data;
            const findedUser = await this.userModel.findById(userId);
            if (!findedUser) {
                return {
                    status: 400,
                    code: -2,
                    message: 'User not found',
                };
            }
            const newData = {
                userFrom: {
                    _id: findedUser._id,
                    name: findedUser.role === 'parent'
                        ? findedUser.parent.name || 'No Name'
                        : findedUser.child.name || 'No Name',
                },
                message,
                userTo: {
                    _id: mongoose.Types.ObjectId(to),
                },
                linkId,
            };
            const newNotification = new this.notificationModel(newData);
            const result = await newNotification.save();
            const broadcastData = {
                user: newData.userFrom.name,
                message,
                to,
            };
            this.gateway.server.emit('newNotification', broadcastData);
            return {
                status: 200,
                code: 0,
                message: 'Success',
                result,
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
    async findAll(userId, data) {
        try {
            const { limit } = data;
            const search = {
                'userTo._id': mongoose.Types.ObjectId(userId),
            };
            const result = await this.notificationModel
                .find(search)
                .sort({ createdAt: -1 })
                .limit(+limit)
                .exec();
            return {
                status: 200,
                code: 0,
                message: 'Success',
                result,
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
    async count(userId) {
        try {
            const search = {
                'userTo._id': mongoose.Types.ObjectId(userId),
            };
            const result = await this.notificationModel.count(search).exec();
            return {
                status: 200,
                code: 0,
                message: 'Success',
                result,
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
    async remove(id, userId) {
        try {
            const search = {
                _id: id,
                'userTo._id': mongoose.Types.ObjectId(userId),
            };
            const result = await this.notificationModel
                .findOneAndDelete(search)
                .exec();
            if (!result) {
                return {
                    status: 404,
                    code: 0,
                    message: 'Record not found',
                };
            }
            return {
                status: 200,
                code: 0,
                message: 'Success',
                result,
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
NotificationService = __decorate([
    common_1.Injectable(),
    __param(1, mongoose_2.InjectModel(notification_schema_1.Notification.name)),
    __param(2, mongoose_2.InjectModel(user_schema_1.User.name)),
    __metadata("design:paramtypes", [notification_gateway_1.NotificationGateway,
        mongoose_1.Model,
        mongoose_1.Model])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map
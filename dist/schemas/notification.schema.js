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
exports.NotificationSchema = exports.Notification = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose = require("mongoose");
class User extends mongoose_2.Document {
}
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", mongoose.Types.ObjectId)
], User.prototype, "_id", void 0);
let Notification = class Notification {
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", User)
], Notification.prototype, "userFrom", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Notification.prototype, "message", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", User)
], Notification.prototype, "userTo", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", mongoose.Types.ObjectId)
], Notification.prototype, "linkId", void 0);
Notification = __decorate([
    mongoose_1.Schema({ timestamps: true })
], Notification);
exports.Notification = Notification;
exports.NotificationSchema = mongoose_1.SchemaFactory.createForClass(Notification);
//# sourceMappingURL=notification.schema.js.map
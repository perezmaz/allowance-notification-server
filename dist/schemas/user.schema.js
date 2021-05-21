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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose = require("mongoose");
class ParentChild extends mongoose_2.Document {
}
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", mongoose.Types.ObjectId)
], ParentChild.prototype, "_id", void 0);
class Child extends mongoose_2.Document {
}
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Child.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", ParentChild)
], Child.prototype, "parent", void 0);
class Parent extends mongoose_2.Document {
}
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Parent.prototype, "name", void 0);
let User = class User {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Child)
], User.prototype, "child", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Parent)
], User.prototype, "parent", void 0);
User = __decorate([
    mongoose_1.Schema()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map
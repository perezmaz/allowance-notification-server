"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer_1 = require("nodemailer");
let MailerService = class MailerService {
    async send(data) {
        const { emailTo, message, subject } = data;
        const transporter = nodemailer_1.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'perezmaz@gmail.com',
                pass: 'xinxxfsqbsamsweu',
            },
        });
        const result = await transporter.sendMail({
            from: 'perezmaz@gmail.com',
            to: emailTo,
            subject,
            html: message,
        });
        return {
            status: 200,
            code: 0,
            message: 'Success',
            result,
        };
    }
};
MailerService = __decorate([
    common_1.Injectable()
], MailerService);
exports.MailerService = MailerService;
//# sourceMappingURL=mailer.service.js.map
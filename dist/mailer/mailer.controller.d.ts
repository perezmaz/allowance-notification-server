import { MailerService } from './mailer.service';
import { SendEmailDto } from './dto/send-email.dto';
import { DefaultResponse } from '../interfaces/default-response.interface';
export declare class MailerController {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    send(data: SendEmailDto): Promise<DefaultResponse>;
}

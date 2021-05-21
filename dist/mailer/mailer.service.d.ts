import { DefaultResponse } from '../interfaces/default-response.interface';
import { SendEmailDto } from './dto/send-email.dto';
export declare class MailerService {
    send(data: SendEmailDto): Promise<DefaultResponse>;
}

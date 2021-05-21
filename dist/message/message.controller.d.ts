import { MessageService } from './message.service';
import SendMessageDto from './dto/send-message.dto';
import { DefaultResponse } from '../interfaces/default-response.interface';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    send(data: SendMessageDto): Promise<DefaultResponse>;
    handleErrors(result: any): void;
}

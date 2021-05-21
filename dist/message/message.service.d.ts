import SendMessageDto from './dto/send-message.dto';
import { MessageGateway } from './message.gateway';
import { DefaultResponse } from '../interfaces/default-response.interface';
export declare class MessageService {
    private gateway;
    constructor(gateway: MessageGateway);
    send(data: SendMessageDto): Promise<DefaultResponse>;
}

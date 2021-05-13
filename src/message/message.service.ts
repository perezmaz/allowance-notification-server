import { Injectable } from '@nestjs/common';
import SendMessageDto from './dto/send-message.dto';
import { MessageGateway } from './message.gateway';
import { DefaultResponse } from '../interfaces/default-response.interface';

@Injectable()
export class MessageService {
  constructor(private gateway: MessageGateway) {}

  async send(data: SendMessageDto): Promise<DefaultResponse> {
    try {
      this.gateway.server.to(data.channel).emit('newMessage', data);

      return {
        status: 200,
        code: 0,
        message: 'Success',
      };
    } catch (error) {
      return {
        status: 500,
        code: -1,
        message: error.message,
      };
    }
  }
}

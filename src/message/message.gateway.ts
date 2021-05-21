import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import SendMessageDto from './dto/send-message.dto';

@WebSocketGateway()
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('newMessage')
  send(@MessageBody() data: SendMessageDto): void {
    this.server.emit('newMessage', data);
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, room: string): void {
    client.join(room);
  }
}

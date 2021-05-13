import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { webSocket } from '../config';
import SendNotificationDto from './dto/send-notification.dto';

@WebSocketGateway(webSocket.PORT)
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('NotificationGateway');

  afterInit() {
    this.logger.log('Notification Gateway up!');
  }

  handleConnection(client): void {
    this.logger.log(`Client ${client.id} connected`);
    client.emit('connection', 'Connected to server');
  }

  handleDisconnect(client): void {
    this.logger.log(`Client ${client.id} disconnected`);
  }

  @SubscribeMessage('newNotification')
  sendNotification(@MessageBody() data: SendNotificationDto): void {
    const { channel } = data;
    if (channel) {
      this.server.to(channel).emit('newNotification', data);
    } else {
      this.server.emit('newNotification', data);
    }
  }
}

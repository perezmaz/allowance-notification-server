import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import SendNotificationDto from './dto/send-notification.dto';
export declare class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private logger;
    afterInit(): void;
    handleConnection(client: any): void;
    handleDisconnect(client: any): void;
    sendNotification(data: SendNotificationDto): void;
}

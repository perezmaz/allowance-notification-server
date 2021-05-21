import { Server, Socket } from 'socket.io';
import SendMessageDto from './dto/send-message.dto';
export declare class MessageGateway {
    server: Server;
    send(data: SendMessageDto): void;
    handleJoin(client: Socket, room: string): void;
}

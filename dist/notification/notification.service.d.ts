import { Model } from 'mongoose';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { FindAllNotificationsDto } from './dto/find-all-notifications.dto';
import { NotificationGateway } from './notification.gateway';
import { NotificationDocument } from '../schemas/notification.schema';
import { UserDocument } from '../schemas/user.schema';
import { DefaultResponse } from '../interfaces/default-response.interface';
export declare class NotificationService {
    private gateway;
    private notificationModel;
    private userModel;
    constructor(gateway: NotificationGateway, notificationModel: Model<NotificationDocument>, userModel: Model<UserDocument>);
    create(data: CreateNotificationDto, userId: string): Promise<DefaultResponse>;
    findAll(userId: string, data: FindAllNotificationsDto): Promise<DefaultResponse>;
    count(userId: string): Promise<DefaultResponse>;
    remove(id: string, userId: string): Promise<DefaultResponse>;
}

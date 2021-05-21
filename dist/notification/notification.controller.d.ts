import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { FindAllNotificationsDto } from './dto/find-all-notifications.dto';
import { DefaultResponse } from '../interfaces/default-response.interface';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    create(data: CreateNotificationDto, headers: any): Promise<DefaultResponse>;
    findAll(headers: any, data: FindAllNotificationsDto): Promise<DefaultResponse>;
    count(headers: any): Promise<DefaultResponse>;
    remove(id: string, headers: any): Promise<DefaultResponse>;
    handleErrors(result: any): void;
}

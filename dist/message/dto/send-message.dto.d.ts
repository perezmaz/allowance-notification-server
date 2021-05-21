declare class User {
    _id: string;
    name: string;
    avatar: string;
}
export default class SendNotificationDto {
    from: User;
    message: string;
    channel: string;
    createdAt: string;
}
export {};

import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export default class SendNotificationDto {
  @IsNotEmpty()
  @MaxLength(300)
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  user: string;

  @IsString()
  to: string;

  @IsString()
  channel: string;
}

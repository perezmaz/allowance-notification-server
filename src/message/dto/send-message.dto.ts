import {
  IsDateString,
  IsNotEmpty,
  IsObject,
  IsString,
  MaxLength,
} from 'class-validator';

class User {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  avatar: string;
}

export default class SendNotificationDto {
  @IsNotEmpty()
  @IsObject()
  from: User;

  @IsNotEmpty()
  @MaxLength(300)
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  channel: string;

  @IsNotEmpty()
  @IsDateString()
  createdAt: string;
}

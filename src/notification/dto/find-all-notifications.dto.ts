import { IsNotEmpty, IsNumberString } from 'class-validator';

export class FindAllNotificationsDto {
  @IsNotEmpty()
  @IsNumberString()
  limit: number;
}

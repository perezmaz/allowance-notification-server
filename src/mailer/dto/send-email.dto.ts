import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class SendEmailDto {
  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsEmail()
  emailTo: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}

import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './dto/send-email.dto';
import { DefaultResponse } from '../interfaces/default-response.interface';
import { api } from '../config';

@Controller(`api/${api.VERSION}/mailer`)
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post()
  async send(@Body() data: SendEmailDto): Promise<DefaultResponse> {
    const result = await this.mailerService.send(data);
    return result;
  }
}

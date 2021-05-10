import { Injectable } from '@nestjs/common';
import { DefaultResponse } from '../interfaces/default-response.interface';
import { SendEmailDto } from './dto/send-email.dto';
import { createTransport } from 'nodemailer';

@Injectable()
export class MailerService {
  async send(data: SendEmailDto): Promise<DefaultResponse> {
    const { emailTo, message, subject } = data;
    const transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'perezmaz@gmail.com',
        pass: 'xinxxfsqbsamsweu',
      },
    });

    const result = await transporter.sendMail({
      from: 'perezmaz@gmail.com',
      to: emailTo,
      subject,
      html: message,
    });

    return {
      status: 200,
      code: 0,
      message: 'Success',
      result,
    };
  }
}

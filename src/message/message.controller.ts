import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import SendMessageDto from './dto/send-message.dto';
import { AuthGuard } from '../guards/auth.guard';
import { DefaultResponse } from '../interfaces/default-response.interface';
import { api } from '../config';

@Controller(`api/${api.VERSION}/sendMessage`)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @UseGuards(AuthGuard)
  async send(@Body() data: SendMessageDto): Promise<DefaultResponse> {
    const result = await this.messageService.send(data);
    if (result.code === -1) {
      throw new InternalServerErrorException(result);
    }
    return result;
  }

  handleErrors(result) {
    switch (result.status) {
      case 500:
        throw new InternalServerErrorException(result);
      case 404:
        throw new NotFoundException(result);
      default:
    }
  }
}

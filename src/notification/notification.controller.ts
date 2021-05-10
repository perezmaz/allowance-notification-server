import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  InternalServerErrorException,
  NotFoundException,
  Headers,
  UseGuards,
  Query,
} from '@nestjs/common';
import * as jwt from 'jwt-simple';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { FindAllNotificationsDto } from './dto/find-all-notifications.dto';
import { AuthGuard } from '../guards/auth.guard';
import { DefaultResponse } from '../interfaces/default-response.interface';
import { api, jwtToken } from '../config';

@Controller(`api/${api.VERSION}/notification`)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() data: CreateNotificationDto,
    @Headers() headers,
  ): Promise<DefaultResponse> {
    const token = headers.authorization.replace(/['"]+/g, '');
    const user = jwt.decode(token, jwtToken.SECRET_KEY, true);

    const result = await this.notificationService.create(data, user._id);
    if (result.code === -1) {
      throw new InternalServerErrorException(result);
    }
    return result;
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(
    @Headers() headers,
    @Query() data: FindAllNotificationsDto,
  ): Promise<DefaultResponse> {
    const token = headers.authorization.replace(/['"]+/g, '');
    const user = jwt.decode(token, jwtToken.SECRET_KEY, true);

    const result = await this.notificationService.findAll(user._id, data);
    if (result.code !== 0) {
      this.handleErrors(result);
    }
    return result;
  }

  @Get('/count')
  @UseGuards(AuthGuard)
  async count(@Headers() headers): Promise<DefaultResponse> {
    const token = headers.authorization.replace(/['"]+/g, '');
    const user = jwt.decode(token, jwtToken.SECRET_KEY, true);

    const result = await this.notificationService.count(user._id);
    if (result.code !== 0) {
      this.handleErrors(result);
    }
    return result;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(
    @Param('id') id: string,
    @Headers() headers,
  ): Promise<DefaultResponse> {
    const token = headers.authorization.replace(/['"]+/g, '');
    const user = jwt.decode(token, jwtToken.SECRET_KEY, true);

    const result = await this.notificationService.remove(id, user._id);
    if (result.code !== 0) {
      this.handleErrors(result);
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

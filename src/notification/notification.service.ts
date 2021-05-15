import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { FindAllNotificationsDto } from './dto/find-all-notifications.dto';
import { NotificationGateway } from './notification.gateway';
import {
  Notification,
  NotificationDocument,
} from '../schemas/notification.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { DefaultResponse } from '../interfaces/default-response.interface';
import * as mongoose from 'mongoose';

@Injectable()
export class NotificationService {
  constructor(
    private gateway: NotificationGateway,
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(
    data: CreateNotificationDto,
    userId: string,
  ): Promise<DefaultResponse> {
    try {
      const { message, to, linkId } = data;
      const findedUser = await this.userModel.findById(userId);
      if (!findedUser) {
        return {
          status: 400,
          code: -2,
          message: 'User not found',
        };
      }

      const newData = {
        userFrom: {
          _id: findedUser._id,
          name:
            findedUser.role === 'parent'
              ? findedUser.parent.name || 'No Name'
              : findedUser.child.name || 'No Name',
        },
        message,
        userTo: {
          _id: mongoose.Types.ObjectId(to),
        },
        linkId,
      };

      const newNotification = new this.notificationModel(newData);

      const result = await newNotification.save();

      const broadcastData = {
        user: newData.userFrom.name,
        message,
        to,
      };

      this.gateway.server.emit('newNotification', broadcastData);

      return {
        status: 200,
        code: 0,
        message: 'Success',
        result,
      };
    } catch (error) {
      return {
        status: 500,
        code: -1,
        message: error.message,
      };
    }
  }

  async findAll(
    userId: string,
    data: FindAllNotificationsDto,
  ): Promise<DefaultResponse> {
    try {
      const { limit } = data;
      const search = {
        'userTo._id': mongoose.Types.ObjectId(userId),
      };

      const result = await this.notificationModel
        .find(search)
        .sort({ createdAt: -1 })
        .limit(+limit)
        .exec();

      return {
        status: 200,
        code: 0,
        message: 'Success',
        result,
      };
    } catch (error) {
      return {
        status: 500,
        code: -1,
        message: error.message,
      };
    }
  }

  async count(userId: string): Promise<DefaultResponse> {
    try {
      const search = {
        'userTo._id': mongoose.Types.ObjectId(userId),
      };

      const result = await this.notificationModel.count(search).exec();

      return {
        status: 200,
        code: 0,
        message: 'Success',
        result,
      };
    } catch (error) {
      return {
        status: 500,
        code: -1,
        message: error.message,
      };
    }
  }

  async remove(id: string, userId: string): Promise<DefaultResponse> {
    try {
      const search = {
        _id: id,
        'userTo._id': mongoose.Types.ObjectId(userId),
      };

      const result = await this.notificationModel
        .findOneAndDelete(search)
        .exec();

      if (!result) {
        return {
          status: 404,
          code: 0,
          message: 'Record not found',
        };
      }

      return {
        status: 200,
        code: 0,
        message: 'Success',
        result,
      };
    } catch (error) {
      return {
        status: 500,
        code: -1,
        message: error.message,
      };
    }
  }
}

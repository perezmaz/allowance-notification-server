import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { MailerModule } from './mailer/mailer.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [NotificationModule, MailerModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

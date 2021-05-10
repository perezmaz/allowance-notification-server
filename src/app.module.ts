import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [NotificationModule, MailerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

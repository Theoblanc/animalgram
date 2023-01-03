import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { bullFactory } from '../settings/bull.factory';
import { NOTIFICATION_QUEUE } from '../settings/constants';
import { smsFactory } from '../settings/sms.setting';

@Module({
  imports: [
    SendGridModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: smsFactory,
      inject: [ConfigService]
    }),
    BullModule.forRootAsync({
      useFactory: bullFactory,
      inject: [ConfigService]
    }),
    BullModule.registerQueue({
      name: NOTIFICATION_QUEUE
    })
  ]
})
export class NotificationModule {}

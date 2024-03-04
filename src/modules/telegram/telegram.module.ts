import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        token: config.get('TELEGRAM_BOT_TOKEN'),
      }),
    }),
  ],
  providers: [TelegramService],
})
export class TelegramModule {}

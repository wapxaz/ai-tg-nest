import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';
import { GeminiAiModule } from 'src/gemini-ai/gemini-ai.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        token: config.get('TELEGRAM_BOT_TOKEN'),
      }),
    }),
    GeminiAiModule,
  ],
  providers: [TelegramService],
})
export class TelegramModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramModule } from './modules/telegram/telegram.module';
import { GeminiAiModule } from './gemini-ai/gemini-ai.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TelegramModule, GeminiAiModule],
})
export class AppModule {}

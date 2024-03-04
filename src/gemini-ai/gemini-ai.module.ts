import { Module } from '@nestjs/common';
import { GeminiAiService } from './gemini-ai.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [GeminiAiService],
  exports: [GeminiAiService],
})
export class GeminiAiModule {}

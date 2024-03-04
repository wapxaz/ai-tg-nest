import { UseFilters } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { TelegrafExceptionFilter } from 'src/common/telegraf-exception.filter';
import { GeminiAiService } from 'src/gemini-ai/gemini-ai.service';
import { Scenes, Telegraf } from 'telegraf';

export interface Context extends Scenes.SceneContext {}

@Update()
@UseFilters(TelegrafExceptionFilter)
export class TelegramService extends Telegraf {
  constructor(
    private readonly config: ConfigService,
    private readonly geminiAiService: GeminiAiService,
  ) {
    super(config.get('TELEGRAM_BOT_TOKEN'));
  }

  @Start()
  async onStart(@Ctx() ctx: Context) {
    try {
      await ctx.reply(
        'Привет, ты в чате с ИИ от google! И я помогу решить любую твою проблему.  Напиши, что тебя тревожит:',
      );
    } catch (e) {
      return 'Временная ошибка. Повтори запрос через несколько минут.';
    }
  }

  @On('text')
  async onMessage(
    @Message('text') text: string,
    @Ctx() ctx: Context,
  ): Promise<string> {
    try {
      //эффект печатания ботом
      ctx.sendChatAction('typing');
      const response = await this.geminiAiService.generateResponse(text);
      return response;
    } catch (e) {
      return 'АПИ ИИ Gemini работает на бесплатном тарифе и есть ограничения по кол-ву запросов, повтори запрос через минуту.';
      //throw new Error(e);
    }
  }
}

import { UseFilters } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { TelegrafExceptionFilter } from 'src/common/telegraf-exception.filter';
import { Scenes, Telegraf } from 'telegraf';

export interface Context extends Scenes.SceneContext {}

@Update()
@UseFilters(TelegrafExceptionFilter)
export class TelegramService extends Telegraf {
  private _token: string;
  constructor(private readonly config: ConfigService) {
    super(config.get('TELEGRAM_BOT_TOKEN'));
    this._token = config.get('TELEGRAM_BOT_TOKEN');
  }

  @Start()
  async onStart(@Ctx() ctx: Context) {
    await ctx.reply(
      'Привет, ты в чате с ИИ от google! И я помогу тебе решить любую твою проблему  Напиши, что тебя тревожит:',
    );
  }

  @On('text')
  onMessage(@Message('text') text: string) {
    return text;
  }
}

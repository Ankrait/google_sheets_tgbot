import { Context } from 'telegraf';

export const inDev = (ctx: Context) => {
	ctx.reply('**Данная функция в разработке**');
};

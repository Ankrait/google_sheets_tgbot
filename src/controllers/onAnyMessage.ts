import { Context } from 'telegraf';
import { Update } from 'telegraf/types';
import { defaultMarkup } from '../markups/default';

export const onAnyMessage = (ctx: Context<Update>) => {
	ctx.reply('Выберите действие', defaultMarkup());
};

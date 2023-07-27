import { Context } from 'telegraf';
import { userMarkup } from '../markups/userMarkup';
import { adminMarkup } from '../markups/adminMarkup';
import { getIsAdmin } from '../services/services';
import { Update } from 'telegraf/types';

export const onAnyMessage = async (ctx: Context<Update.MessageUpdate>) => {
	const userId = ctx.from.id;
	const isAdmin = await getIsAdmin(userId);

	const markup = isAdmin ? adminMarkup : userMarkup;

	ctx.reply('Выберите действие', markup);
};

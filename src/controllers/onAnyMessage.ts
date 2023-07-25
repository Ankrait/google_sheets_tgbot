import { Context } from 'telegraf';
import { defaultMarkup } from '../markups/defaultMarkup';
import { adminMarkup } from '../markups/adminMarkup';
import { getIsAdmin } from '../services/services';

export const onAnyMessage = async (ctx: Context) => {
	const userId = ctx.from!.id;
	const isAdmin = await getIsAdmin(userId);

	const markup = isAdmin ? adminMarkup : defaultMarkup;

	ctx.reply('Выберите действие', markup);
};

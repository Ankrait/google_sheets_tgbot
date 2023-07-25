import { Context } from 'telegraf';
import { defaultMarkup } from '../markups/defaultMarkup';
import { getIsAdmin } from '../services/services';
import { Update } from 'telegraf/types';
import { adminMarkup } from '../markups/adminMarkup';

export const start = async (ctx: Context<Update.MessageUpdate>) => {
	const userId = ctx.from.id;
	const isAdmin = await getIsAdmin(userId);

	const markup = isAdmin ? adminMarkup : defaultMarkup;

	ctx.replyWithSticker(
		'CAACAgIAAxkBAAIDhWS6bctHMkinzJ14I4I36jYeg_RzAALdDgACTV3wSyj9qXggllKeLwQ',
		markup
	);
};

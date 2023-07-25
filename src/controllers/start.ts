import { Context } from 'telegraf';
import { defaultMarkup } from '../markups/default';

export const start = (ctx: Context) => {
	ctx.replyWithSticker(
		'CAACAgIAAxkBAAIDhWS6bctHMkinzJ14I4I36jYeg_RzAALdDgACTV3wSyj9qXggllKeLwQ',
		defaultMarkup()
	);
};

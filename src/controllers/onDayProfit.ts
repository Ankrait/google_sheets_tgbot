import { Context } from 'telegraf';
import { Update } from 'telegraf/types';
import { editLastMessage, getMoneyString } from '../common/utils';
import { userNotFoundMessage } from '../common/appConstants';
import { getDayProfit, getIsAdmin } from '../services/services';

export const onDayProfit = async (
	ctx: Context<Update.MessageUpdate>,
	next: () => Promise<void>
) => {
	const userId = ctx.from.id;

	const isAdmin = await getIsAdmin(userId);
	if (isAdmin) {
		await next();
		return;
	}

	await ctx.sendChatAction('typing');
	const { message_id } = await ctx.reply('Загрузка...');

	const response = await getDayProfit(userId);

	if (!response) {
		return await editLastMessage(ctx, message_id, userNotFoundMessage);
	}

	await editLastMessage(
		ctx,
		message_id,
		(response.profit > 0 ? '✅ ' : '🔻 ') +
			'<b>' +
			getMoneyString(Math.abs(response.profit)) +
			'</b>',
		{ parse_mode: 'HTML' }
	);
};

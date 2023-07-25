import { Context } from 'telegraf';
import { Update } from 'telegraf/types';
import { userNotFoundMessage } from '../common/appConstants';
import { editLastMessage } from '../common/utils/editLastMessage';
import { getIsAdmin, getStatistics } from '../services/services';
import { getMoneyString } from '../common/utils/getMoneyString';
import { getDateString } from '../common/utils/getDateString';

export const onStatistics = async (
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

	const response = await getStatistics(userId);
	if (!response) {
		return await editLastMessage(ctx, message_id, userNotFoundMessage);
	}

	let resultMessage = '';
	response.forEach((day) => {
		resultMessage +=
			getDateString(day.day) +
			'  ---  ' +
			(day.profit > 0 ? '✅ ' : '🔻 ') +
			'<b>' +
			getMoneyString(Math.abs(day.profit)) +
			'</b>\n';
	});

	editLastMessage(ctx, message_id, resultMessage, { parse_mode: 'HTML' });
};

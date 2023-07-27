import { Context } from 'telegraf';
import { Update } from 'telegraf/types';
import { editLastMessage } from '../common/utils';
import { getIsAdmin, getDaysStats } from '../services/services';
import { getMoneyString } from '../common/utils/getMoneyString';
import { getDateString } from '../common/utils/getDateString';

export const onDaysStats = async (
	ctx: Context<Update.MessageUpdate>,
	next: () => Promise<void>
) => {
	const userId = ctx.from.id;

	const isAdmin = await getIsAdmin(userId);
	if (!isAdmin) {
		await next();
		return;
	}

	await ctx.sendChatAction('typing');
	const { message_id } = await ctx.reply('Загрузка...');

	const daysStats = await getDaysStats();

	let resultMessage = '';
	daysStats.forEach((row) => {
		resultMessage +=
			'<b>' +
			getDateString(row.day) +
			'</b>\nНачало дня: <b>' +
			getMoneyString(row.startBalance) +
			'</b>\nКонец дня: <b>' +
			getMoneyString(row.endBalance) +
			'</b>\nПрофит: ' +
			(row.endBalance - row.startBalance > 0 ? '✅ ' : '🔻 ') +
			'<b>' +
			getMoneyString(Math.abs(row.endBalance - row.startBalance)) +
			'</b>\n\n';
	});

	await editLastMessage(ctx, message_id, resultMessage, { parse_mode: 'HTML' });
};

import { Context } from 'telegraf';
import { Update } from 'telegraf/types';
import { editLastMessage } from '../common/utils';
import { userNotFoundMessage } from '../common/appConstants';
import { getIsAdmin, getUserFinance } from '../services/services';
import { getMoneyString } from '../common/utils/getMoneyString';

export const onFinance = async (
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

	const user = await getUserFinance(userId);
	if (!user) {
		return await editLastMessage(ctx, message_id, userNotFoundMessage);
	}

	await editLastMessage(
		ctx,
		message_id,
		'Депозит: <b>' +
			getMoneyString(user.deposit) +
			'</b>\nТекущий баланс: <b>' +
			getMoneyString(user.balance) +
			'</b>\nПрибыль/убыток: ' +
			(user.profit > 0 ? '✅ ' : '🔻 ') +
			'<b>' +
			getMoneyString(Math.abs(user.profit)) +
			'</b>\n',
		{ parse_mode: 'HTML' }
	);
};

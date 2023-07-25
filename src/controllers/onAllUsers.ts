import { Context } from 'telegraf';
import { Update } from 'telegraf/types';
import { editLastMessage } from '../common/utils';
import { userNotFoundMessage } from '../common/appConstants';
import { getIsAdmin, getAllUsers } from '../services/services';
import { getMoneyString } from '../common/utils/getMoneyString';

export const onAllUsers = async (
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

	const users = await getAllUsers();

	let resultMessage = '';
	users.forEach((user) => {
		resultMessage +=
			'<b>' +
			user.name +
			'</b>\nДепозит: <b>' +
			getMoneyString(user.deposit) +
			'</b>\nБаланс: <b>' +
			getMoneyString(user.balance) +
			'</b>\nПрофит: ' +
			(user.profit > 0 ? '✅ ' : '🔻 ') +
			'<b>' +
			getMoneyString(Math.abs(user.profit)) +
			'</b>\n\n';
	});

	await editLastMessage(ctx, message_id, resultMessage, { parse_mode: 'HTML' });
};

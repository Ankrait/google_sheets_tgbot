import { Context } from 'telegraf';
import { Update } from 'telegraf/types';
import {
	editLastMessage,
	getNumber,
	getTable,
	getUserRowFromTable,
} from '../common/utils';
import { userNotFoundMessage } from '../common/appConstants';

export const onFinance = async (ctx: Context<Update.MessageUpdate>) => {
	await ctx.sendChatAction('typing');
	const { message_id } = await ctx.reply('Загрузка...');

	const table = await getTable('users');
	const id = ctx.from.id;

	const userRow = getUserRowFromTable(table, id);

	if (userRow === null) {
		return await editLastMessage(ctx, message_id, userNotFoundMessage);
	}

	const profit = getNumber(table[userRow][5]);

	await editLastMessage(
		ctx,
		message_id,
		'Депозит: ' +
			'<b>' +
			table[userRow][2] +
			'</b>\n' +
			'Текущий баланс: ' +
			'<b>' +
			table[userRow][6] +
			'</b>\n' +
			'Прибыль/убыток: ' +
			(profit > 0 ? '✅ ' : '🔻 ') +
			'<b>' +
			'$' +
			Math.abs(profit).toString().replace('.', ',') +
			'</b>\n',
		{ parse_mode: 'HTML' }
	);
};

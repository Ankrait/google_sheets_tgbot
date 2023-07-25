import { Context } from 'telegraf';
import { Update } from 'telegraf/types';
import {
	editLastMessage,
	getNumber,
	getTable,
	getUserRowFromTable,
	parseDate,
} from '../common/utils';
import { userNotFoundMessage } from '../common/appConstants';

export const onDayProfit = async (ctx: Context<Update.MessageUpdate>) => {
	await ctx.sendChatAction('typing');
	const { message_id } = await ctx.reply('Загрузка...');

	const userTable = await getTable('users');
	const daysTable = await getTable('days');

	const id = ctx.from.id;

	const userRow = getUserRowFromTable(userTable, id);

	if (userRow === null) {
		return await editLastMessage(ctx, message_id, userNotFoundMessage);
	}

	const userDeposit = getNumber(userTable[userRow][2]);
	const userProfit = getNumber(userTable[userRow][5]);
	const userDateIn = parseDate(userTable[userRow][0]);
	if (!userDateIn) {
		return await editLastMessage(ctx, message_id, '**Ошибка данных**');
	}

	let lastDatePos = -1;

	for (let dayI = 0; dayI < daysTable.length; dayI++) {
		const currentDate = parseDate(daysTable[dayI][1]);
		if (!currentDate) {
			continue;
		}

		if (+currentDate >= +userDateIn) {
			lastDatePos = dayI;
		}
	}

	if (lastDatePos === -1) {
		return await editLastMessage(ctx, message_id, '$0');
	}

	const originalBalance = userDeposit + userProfit * 2;
	let dayProfit =
		(originalBalance -
			originalBalance /
				(getNumber(daysTable[lastDatePos][3]) / getNumber(daysTable[lastDatePos][2]))) /
		2;

	dayProfit = Math.round(dayProfit * 100) / 100;

	await editLastMessage(
		ctx,
		message_id,
		(dayProfit > 0 ? '✅ ' : '🔻 ') +
			'$' +
			'<b>' +
			Math.abs(dayProfit).toString().replace('.', ',') +
			'</b>',
		{ parse_mode: 'HTML' }
	);
};

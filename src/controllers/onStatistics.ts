import { Context } from 'telegraf';
import { Update } from 'telegraf/types';
import { getNumber, getTable, getUserRowFromTable, parseDate } from '../common/utils';
import { userNotFoundMessage } from '../common/appConstants';
import { editLastMessage } from '../common/utils/editLastMessage';

export const onStatistics = async (ctx: Context<Update.MessageUpdate>) => {
	await ctx.sendChatAction('typing');
	const { message_id } = await ctx.reply('Загрузка...');

	const userTable = await getTable('users');
	const daysTable = await getTable('days');

	const id = ctx.from.id;

	const userRow = getUserRowFromTable(userTable, id);
	if (userRow === null) {
		return editLastMessage(ctx, message_id, userNotFoundMessage);
	}

	const userDeposit = getNumber(userTable[userRow][2]);
	const userDateIn = parseDate(userTable[userRow][0]);
	if (!userDateIn) {
		return await editLastMessage(ctx, message_id, '**Ошибка данных**');
	}

	let userStatistics: { day: string; value: number }[] = [];

	let lastDayBalance = userDeposit;
	let dayBalance = 0;
	for (let dayI = 0; dayI < daysTable.length; dayI++) {
		const currentDate = parseDate(daysTable[dayI][1]);
		if (!currentDate) {
			continue;
		}

		dayBalance =
			lastDayBalance * (getNumber(daysTable[dayI][3]) / getNumber(daysTable[dayI][2])) ;
		if (+currentDate >= +userDateIn) {
			const value = {
				day: currentDate.toLocaleDateString(),
				value: Math.round((dayBalance - lastDayBalance) / 2 * 100) / 100,
			};
			userStatistics.push(value);
		}
		lastDayBalance = dayBalance;
	}

	let resultMessage = '';
	userStatistics.forEach((element) => {
		resultMessage +=
			element.day +
			'  ---  ' +
			(element.value > 0 ? '✅ ' : '🔻 ') +
			'$' +
			Math.abs(element.value) +
			'\n';
	});

	editLastMessage(ctx, message_id, resultMessage);
};

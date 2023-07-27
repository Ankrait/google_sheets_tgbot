import { Telegraf } from 'telegraf';
import cron from 'node-cron';

import { adminActionsEnum, userActionsEnum } from './common/enums';
import {
	start,
	onFinance,
	onDayProfit,
	inDev,
	onAnyMessage,
	onStatistics,
	onAllUsers,
} from './controllers';
import { getConfig } from './config/config';

export const bot = new Telegraf(getConfig('TOKEN_DEV'));
const tasks: cron.ScheduledTask[] = [];

bot.start(start);

bot.hears(userActionsEnum.Finance, onFinance);
bot.hears(userActionsEnum.DayProfit, onDayProfit);
bot.hears(userActionsEnum.CreateDeposit, inDev);
bot.hears(userActionsEnum.Statistics, onStatistics);

bot.hears(adminActionsEnum.AllUsers, onAllUsers);
bot.hears(adminActionsEnum.Statistics, inDev);

bot.hears('Рассылка', (ctx) => {
	const sendDailyMessage = () => {
		const chatId = ctx.chat.id;

		bot.telegram
			.sendMessage(chatId, 'Привет, это ежедневное сообщение!')
			.then(() => {
				console.log('Сообщение успешно отправлено.');
			})
			.catch((error) => {
				console.error('Ошибка отправки сообщения:', error);
			});
	};
	const task = cron.schedule('1-59 * * * *', () => {
		sendDailyMessage();
	});

});

bot.on('message', onAnyMessage);

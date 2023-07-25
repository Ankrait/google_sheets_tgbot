import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

import { userActionsEnum } from './common/enums';
import {
	start,
	onFinance,
	onDayProfit,
	inDev,
	onAnyMessage,
	onStatistics,
} from './controllers';
import { getConfig } from './config/config';

const bot = new Telegraf(getConfig('TOKEN'));

bot.start(start);
bot.hears(userActionsEnum.Finance, onFinance);
bot.hears(userActionsEnum.DayProfit, onDayProfit);
bot.hears(userActionsEnum.CreateDeposit, inDev);
bot.hears(userActionsEnum.Statistics, onStatistics); // inDev
bot.on(message(), onAnyMessage);

bot.launch().then(() => {
	console.log('Бот запущен');
});

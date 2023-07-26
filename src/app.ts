import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

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

export const bot = new Telegraf(getConfig('TOKEN2'));

bot.start(start);
bot.hears(userActionsEnum.Finance, onFinance);
bot.hears(userActionsEnum.DayProfit, onDayProfit);
bot.hears(userActionsEnum.CreateDeposit, inDev);
bot.hears(userActionsEnum.Statistics, onStatistics);

bot.hears(adminActionsEnum.AllUsers, onAllUsers);
bot.hears(adminActionsEnum.Statistics, inDev);

bot.on(message(), onAnyMessage);

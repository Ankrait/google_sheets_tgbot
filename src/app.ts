import { Markup, Telegraf } from 'telegraf';

import {
	start,
	onFinance,
	onDayProfit,
	inDev,
	onAnyMessage,
	onStatistics,
	onAllUsers,
	onDaysStats,
} from './controllers';
import { adminActionsEnum, userActionsEnum } from './common/enums';
import { getConfig } from './config/config';

export const bot = new Telegraf(getConfig('TOKEN_DEV'));

bot.start(start);

bot.hears(userActionsEnum.Finance, onFinance);
bot.hears(userActionsEnum.DayProfit, onDayProfit);
bot.hears(userActionsEnum.CreateDeposit, inDev);
bot.hears(userActionsEnum.Statistics, onStatistics);

bot.hears(adminActionsEnum.AllUsers, onAllUsers);
bot.hears(adminActionsEnum.DaysStats, onDaysStats);

bot.on('message', onAnyMessage);

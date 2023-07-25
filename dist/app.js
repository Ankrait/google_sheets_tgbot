"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const filters_1 = require("telegraf/filters");
const enums_1 = require("./common/enums");
const controllers_1 = require("./controllers");
const config_1 = require("./config/config");
const bot = new telegraf_1.Telegraf((0, config_1.getConfig)('TOKEN'));
bot.start(controllers_1.start);
bot.hears(enums_1.userActionsEnum.Finance, controllers_1.onFinance);
bot.hears(enums_1.userActionsEnum.DayProfit, controllers_1.onDayProfit);
bot.hears(enums_1.userActionsEnum.CreateDeposit, controllers_1.inDev);
bot.hears(enums_1.userActionsEnum.Statistics, controllers_1.onStatistics);
bot.hears(enums_1.adminActionsEnum.AllUsers, controllers_1.onAllUsers);
bot.hears(enums_1.adminActionsEnum.Statistics, controllers_1.inDev);
bot.on((0, filters_1.message)(), controllers_1.onAnyMessage);
bot.launch().then(() => {
    console.log('Бот запущен');
});

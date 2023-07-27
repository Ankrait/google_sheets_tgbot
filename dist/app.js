"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const telegraf_1 = require("telegraf");
const node_cron_1 = __importDefault(require("node-cron"));
const enums_1 = require("./common/enums");
const controllers_1 = require("./controllers");
const config_1 = require("./config/config");
exports.bot = new telegraf_1.Telegraf((0, config_1.getConfig)('TOKEN'));
const tasks = [];
exports.bot.start(controllers_1.start);
exports.bot.hears(enums_1.userActionsEnum.Finance, controllers_1.onFinance);
exports.bot.hears(enums_1.userActionsEnum.DayProfit, controllers_1.onDayProfit);
exports.bot.hears(enums_1.userActionsEnum.CreateDeposit, controllers_1.inDev);
exports.bot.hears(enums_1.userActionsEnum.Statistics, controllers_1.onStatistics);
exports.bot.hears(enums_1.adminActionsEnum.AllUsers, controllers_1.onAllUsers);
exports.bot.hears(enums_1.adminActionsEnum.Statistics, controllers_1.inDev);
exports.bot.hears('Рассылка', (ctx) => {
    const sendDailyMessage = () => {
        const chatId = ctx.chat.id;
        exports.bot.telegram
            .sendMessage(chatId, 'Привет, это ежедневное сообщение!')
            .then(() => {
            console.log('Сообщение успешно отправлено.');
        })
            .catch((error) => {
            console.error('Ошибка отправки сообщения:', error);
        });
    };
    const task = node_cron_1.default.schedule('1-59 * * * *', () => {
        sendDailyMessage();
    });
});
exports.bot.on('message', controllers_1.onAnyMessage);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const node_cron_1 = __importDefault(require("node-cron"));
const controllers_1 = require("./controllers");
node_cron_1.default.schedule('0-59 * * * *', () => {
    (0, controllers_1.sendDailyMessage)();
});
app_1.bot.launch().then(() => {
    console.log('Бот запущен');
});

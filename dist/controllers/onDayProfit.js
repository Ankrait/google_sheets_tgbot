"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDayProfit = void 0;
const utils_1 = require("../common/utils");
const appConstants_1 = require("../common/appConstants");
const services_1 = require("../services/services");
const onDayProfit = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = ctx.from.id;
    const isAdmin = yield (0, services_1.getIsAdmin)(userId);
    if (isAdmin) {
        yield next();
        return;
    }
    yield ctx.sendChatAction('typing');
    const { message_id } = yield ctx.reply('Загрузка...');
    const response = yield (0, services_1.getDayProfit)(userId);
    if (!response) {
        return yield (0, utils_1.editLastMessage)(ctx, message_id, appConstants_1.userNotFoundMessage);
    }
    yield (0, utils_1.editLastMessage)(ctx, message_id, (response.profit > 0 ? '✅ ' : '🔻 ') +
        '<b>' +
        (0, utils_1.getMoneyString)(Math.abs(response.profit)) +
        '</b>', { parse_mode: 'HTML' });
});
exports.onDayProfit = onDayProfit;

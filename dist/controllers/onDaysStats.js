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
exports.onDaysStats = void 0;
const utils_1 = require("../common/utils");
const services_1 = require("../services/services");
const getMoneyString_1 = require("../common/utils/getMoneyString");
const getDateString_1 = require("../common/utils/getDateString");
const onDaysStats = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = ctx.from.id;
    const isAdmin = yield (0, services_1.getIsAdmin)(userId);
    if (!isAdmin) {
        yield next();
        return;
    }
    yield ctx.sendChatAction('typing');
    const { message_id } = yield ctx.reply('Загрузка...');
    const daysStats = yield (0, services_1.getDaysStats)();
    let resultMessage = '';
    daysStats.forEach((row) => {
        resultMessage +=
            '<b>' +
                (0, getDateString_1.getDateString)(row.day) +
                '</b>\nНачало дня: <b>' +
                (0, getMoneyString_1.getMoneyString)(row.startBalance) +
                '</b>\nКонец дня: <b>' +
                (0, getMoneyString_1.getMoneyString)(row.endBalance) +
                '</b>\nПрофит: ' +
                (row.endBalance - row.startBalance > 0 ? '✅ ' : '🔻 ') +
                '<b>' +
                (0, getMoneyString_1.getMoneyString)(Math.abs(row.endBalance - row.startBalance)) +
                '</b>\n\n';
    });
    yield (0, utils_1.editLastMessage)(ctx, message_id, resultMessage, { parse_mode: 'HTML' });
});
exports.onDaysStats = onDaysStats;

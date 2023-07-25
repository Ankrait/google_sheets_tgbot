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
exports.onFinance = void 0;
const utils_1 = require("../common/utils");
const appConstants_1 = require("../common/appConstants");
const onFinance = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.sendChatAction('typing');
    const { message_id } = yield ctx.reply('Загрузка...');
    const table = yield (0, utils_1.getTable)('users');
    const id = ctx.from.id;
    const userRow = (0, utils_1.getUserRowFromTable)(table, id);
    if (userRow === null) {
        return yield (0, utils_1.editLastMessage)(ctx, message_id, appConstants_1.userNotFoundMessage);
    }
    const profit = (0, utils_1.getNumber)(table[userRow][5]);
    yield (0, utils_1.editLastMessage)(ctx, message_id, 'Депозит: ' +
        '<b>' +
        table[userRow][2] +
        '</b>\n' +
        'Текущий баланс: ' +
        '<b>' +
        table[userRow][6] +
        '</b>\n' +
        'Прибыль/убыток: ' +
        (profit > 0 ? '✅ ' : '🔻 ') +
        '<b>' +
        '$' +
        Math.abs(profit).toString().replace('.', ',') +
        '</b>\n', { parse_mode: 'HTML' });
});
exports.onFinance = onFinance;

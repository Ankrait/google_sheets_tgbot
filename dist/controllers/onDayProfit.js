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
const onDayProfit = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.sendChatAction('typing');
    const { message_id } = yield ctx.reply('Загрузка...');
    const userTable = yield (0, utils_1.getTable)('users');
    const daysTable = yield (0, utils_1.getTable)('days');
    const id = ctx.from.id;
    const userRow = (0, utils_1.getUserRowFromTable)(userTable, id);
    if (userRow === null) {
        return yield (0, utils_1.editLastMessage)(ctx, message_id, appConstants_1.userNotFoundMessage);
    }
    const userDeposit = (0, utils_1.getNumber)(userTable[userRow][2]);
    const userProfit = (0, utils_1.getNumber)(userTable[userRow][5]);
    const userDateIn = (0, utils_1.parseDate)(userTable[userRow][0]);
    if (!userDateIn) {
        return yield (0, utils_1.editLastMessage)(ctx, message_id, '**Ошибка данных**');
    }
    let lastDatePos = -1;
    for (let dayI = 0; dayI < daysTable.length; dayI++) {
        const currentDate = (0, utils_1.parseDate)(daysTable[dayI][1]);
        if (!currentDate) {
            continue;
        }
        if (+currentDate >= +userDateIn) {
            lastDatePos = dayI;
        }
    }
    if (lastDatePos === -1) {
        return yield (0, utils_1.editLastMessage)(ctx, message_id, '$0');
    }
    const originalBalance = userDeposit + userProfit * 2;
    let dayProfit = (originalBalance -
        originalBalance /
            ((0, utils_1.getNumber)(daysTable[lastDatePos][3]) / (0, utils_1.getNumber)(daysTable[lastDatePos][2]))) /
        2;
    dayProfit = Math.round(dayProfit * 100) / 100;
    yield (0, utils_1.editLastMessage)(ctx, message_id, (dayProfit > 0 ? '✅ ' : '🔻 ') +
        '$' +
        '<b>' +
        Math.abs(dayProfit).toString().replace('.', ',') +
        '</b>', { parse_mode: 'HTML' });
});
exports.onDayProfit = onDayProfit;

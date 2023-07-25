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
exports.onStatistics = void 0;
const utils_1 = require("../common/utils");
const appConstants_1 = require("../common/appConstants");
const editLastMessage_1 = require("../common/utils/editLastMessage");
const onStatistics = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.sendChatAction('typing');
    const { message_id } = yield ctx.reply('Загрузка...');
    const userTable = yield (0, utils_1.getTable)('users');
    const daysTable = yield (0, utils_1.getTable)('days');
    const id = ctx.from.id;
    const userRow = (0, utils_1.getUserRowFromTable)(userTable, id);
    if (userRow === null) {
        return (0, editLastMessage_1.editLastMessage)(ctx, message_id, appConstants_1.userNotFoundMessage);
    }
    const userDeposit = (0, utils_1.getNumber)(userTable[userRow][2]);
    const userDateIn = (0, utils_1.parseDate)(userTable[userRow][0]);
    if (!userDateIn) {
        return yield (0, editLastMessage_1.editLastMessage)(ctx, message_id, '**Ошибка данных**');
    }
    let userStatistics = [];
    let lastDayBalance = userDeposit;
    let dayBalance = 0;
    for (let dayI = 0; dayI < daysTable.length; dayI++) {
        const currentDate = (0, utils_1.parseDate)(daysTable[dayI][1]);
        if (!currentDate) {
            continue;
        }
        dayBalance =
            lastDayBalance * ((0, utils_1.getNumber)(daysTable[dayI][3]) / (0, utils_1.getNumber)(daysTable[dayI][2]));
        if (+currentDate >= +userDateIn) {
            const value = {
                day: currentDate.toLocaleDateString(),
                value: Math.round((dayBalance - lastDayBalance) / 2 * 100) / 100,
            };
            userStatistics.push(value);
        }
        lastDayBalance = dayBalance;
    }
    let resultMessage = '';
    userStatistics.forEach((element) => {
        resultMessage +=
            element.day +
                '  ---  ' +
                (element.value > 0 ? '✅ ' : '🔻 ') +
                '$' +
                Math.abs(element.value) +
                '\n';
    });
    (0, editLastMessage_1.editLastMessage)(ctx, message_id, resultMessage);
});
exports.onStatistics = onStatistics;

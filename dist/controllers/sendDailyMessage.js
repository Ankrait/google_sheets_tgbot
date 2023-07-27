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
exports.sendDailyMessage = void 0;
const app_1 = require("../app");
const utils_1 = require("../common/utils");
const getDateString_1 = require("../common/utils/getDateString");
const services_1 = require("../services/services");
let lastDaysStats = [];
const sendDailyMessage = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentDaysStats = yield (0, services_1.getDaysStats)();
    if (currentDaysStats.length === 0) {
        return;
    }
    if (lastDaysStats.length === 0) {
        lastDaysStats = currentDaysStats;
        return;
    }
    const lastDayI = currentDaysStats.length - 1;
    if (lastDaysStats.length === currentDaysStats.length) {
        if (lastDaysStats[lastDayI].endBalance === currentDaysStats[lastDayI].endBalance) {
            return;
        }
    }
    lastDaysStats = currentDaysStats;
    app_1.bot.telegram.sendMessage('156045434', `${(0, getDateString_1.getDateString)(currentDaysStats[lastDayI].day)} --- ${(0, utils_1.getMoneyString)(currentDaysStats[lastDayI].startBalance)} ${(0, utils_1.getMoneyString)(currentDaysStats[lastDayI].endBalance)}`);
    app_1.bot.telegram.sendMessage('747402803', `${(0, getDateString_1.getDateString)(currentDaysStats[lastDayI].day)} --- ${(0, utils_1.getMoneyString)(currentDaysStats[lastDayI].startBalance)} ${(0, utils_1.getMoneyString)(currentDaysStats[lastDayI].endBalance)}`);
});
exports.sendDailyMessage = sendDailyMessage;

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
exports.getDaysStats = exports.getAllUsers = exports.getIsAdmin = exports.getStatistics = exports.getDayProfit = exports.getUserFinance = void 0;
const utils_1 = require("../common/utils");
const getTable_1 = require("./getTable");
const getUserRowFromTable_1 = require("./getUserRowFromTable");
const getUserFinance = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userTable = yield (0, getTable_1.getTable)('users');
    const userRow = (0, getUserRowFromTable_1.getUserRowFromTable)(userTable, id);
    if (userRow === null)
        return null;
    return {
        name: userTable[userRow][3],
        deposit: (0, utils_1.getNumber)(userTable[userRow][2]),
        balance: (0, utils_1.getNumber)(userTable[userRow][6]),
        profit: (0, utils_1.getNumber)(userTable[userRow][5]),
        dateIn: (0, utils_1.parseDate)(userTable[userRow][0]),
    };
});
exports.getUserFinance = getUserFinance;
const getDayProfit = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, exports.getUserFinance)(id);
    if (!user || !user.dateIn)
        return null;
    const daysTable = yield (0, getTable_1.getTable)('days');
    let lastDatePos = -1;
    for (let dayI = 0; dayI < daysTable.length; dayI++) {
        const currentDate = (0, utils_1.parseDate)(daysTable[dayI][1]);
        if (!currentDate) {
            continue;
        }
        if (+currentDate >= +user.dateIn) {
            lastDatePos = dayI;
        }
    }
    if (lastDatePos === -1) {
        return null;
    }
    const originalBalance = user.deposit + user.profit * 2;
    const dayProfit = (originalBalance *
        (1 - (0, utils_1.getNumber)(daysTable[lastDatePos][2]) / (0, utils_1.getNumber)(daysTable[lastDatePos][3]))) /
        2;
    return {
        day: (0, utils_1.parseDate)(daysTable[lastDatePos][1]),
        profit: dayProfit,
    };
});
exports.getDayProfit = getDayProfit;
const getStatistics = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, exports.getUserFinance)(id);
    if (!user || !user.dateIn)
        return null;
    const daysTable = yield (0, getTable_1.getTable)('days');
    let userStatistics = [];
    let lastDayBalance = user.deposit;
    let currentDayBalance = 0;
    for (let dayI = 0; dayI < daysTable.length; dayI++) {
        const currentDate = (0, utils_1.parseDate)(daysTable[dayI][1]);
        if (!currentDate || +currentDate < +user.dateIn) {
            continue;
        }
        currentDayBalance =
            lastDayBalance * ((0, utils_1.getNumber)(daysTable[dayI][3]) / (0, utils_1.getNumber)(daysTable[dayI][2]));
        userStatistics.push({
            day: currentDate,
            profit: (currentDayBalance - lastDayBalance) / 2,
        });
        lastDayBalance = currentDayBalance;
    }
    return userStatistics;
});
exports.getStatistics = getStatistics;
const getIsAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, getTable_1.getTable)('admin');
    return response[1][0]
        .split(',')
        .map((el) => el.trim())
        .includes(id.toString());
});
exports.getIsAdmin = getIsAdmin;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const userTable = yield (0, getTable_1.getTable)('users');
    const users = [];
    for (let i = 0; i < userTable.length; i++) {
        if (userTable[i].length < 7) {
            continue;
        }
        users.push({
            name: userTable[i][3],
            deposit: (0, utils_1.getNumber)(userTable[i][2]),
            balance: (0, utils_1.getNumber)(userTable[i][6]),
            profit: (0, utils_1.getNumber)(userTable[i][5]),
            dateIn: (0, utils_1.parseDate)(userTable[i][0]),
        });
    }
    return users;
});
exports.getAllUsers = getAllUsers;
const getDaysStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const daysTable = yield (0, getTable_1.getTable)('days');
    const result = [];
    for (let dayI = 0; dayI < daysTable.length; dayI++) {
        const currentDate = (0, utils_1.parseDate)(daysTable[dayI][1]);
        if (!currentDate) {
            continue;
        }
        result.push({
            day: currentDate,
            startBalance: (0, utils_1.getNumber)(daysTable[dayI][2]),
            endBalance: (0, utils_1.getNumber)(daysTable[dayI][3]),
        });
    }
    return result;
});
exports.getDaysStats = getDaysStats;

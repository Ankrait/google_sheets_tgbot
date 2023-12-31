"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMarkup = void 0;
const telegraf_1 = require("telegraf");
const enums_1 = require("../common/enums");
exports.userMarkup = telegraf_1.Markup.keyboard([
    enums_1.userActionsEnum.Finance,
    enums_1.userActionsEnum.DayProfit,
    enums_1.userActionsEnum.CreateDeposit,
    enums_1.userActionsEnum.Statistics,
], {
    columns: 2,
}).resize();

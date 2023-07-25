"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMarkup = void 0;
const telegraf_1 = require("telegraf");
const enums_1 = require("../common/enums");
exports.adminMarkup = telegraf_1.Markup.keyboard([enums_1.adminActionsEnum.AllUsers, enums_1.adminActionsEnum.Statistics], {
    columns: 2,
}).resize();

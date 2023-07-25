"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onAnyMessage = void 0;
const default_1 = require("../markups/default");
const onAnyMessage = (ctx) => {
    ctx.reply('Выберите действие', (0, default_1.defaultMarkup)());
};
exports.onAnyMessage = onAnyMessage;

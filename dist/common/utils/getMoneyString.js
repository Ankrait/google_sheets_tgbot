"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMoneyString = void 0;
const getMoneyString = (value) => {
    return '$' + value.toLocaleString('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};
exports.getMoneyString = getMoneyString;

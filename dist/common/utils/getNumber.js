"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumber = void 0;
const getNumber = (str) => {
    return +str.replace(/[%$\s]/g, '').replace(',', '.');
};
exports.getNumber = getNumber;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDate = void 0;
const parseDate = (str) => {
    if (!str)
        return null;
    let parts = str.match(/(\d+)/g);
    if (!parts || parts.length !== 3)
        return null;
    return new Date(+parts[2], +parts[1] - 1, +parts[0]);
};
exports.parseDate = parseDate;

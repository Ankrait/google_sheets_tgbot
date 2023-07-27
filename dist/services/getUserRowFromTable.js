"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserRowFromTable = void 0;
const getUserRowFromTable = (table, userId) => {
    let position = -1;
    for (let i = 0; i < table.length; i++) {
        const hasIdFound = table[i][4]
            .split(',')
            .map((el) => el.trim())
            .includes(userId.toString());
        if (hasIdFound) {
            position = i;
            break;
        }
    }
    return position !== -1 ? position : null;
};
exports.getUserRowFromTable = getUserRowFromTable;

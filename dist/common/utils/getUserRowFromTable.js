"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserRowFromTable = void 0;
const getUserRowFromTable = (table, userId) => {
    let position = -1;
    for (let i = 0; i < table.length; i++) {
        if (+table[i][4] === userId) {
            position = i;
            break;
        }
    }
    return position !== -1 ? position : null;
};
exports.getUserRowFromTable = getUserRowFromTable;

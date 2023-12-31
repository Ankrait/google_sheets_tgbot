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
exports.getTable = void 0;
const googleapis_1 = require("googleapis");
const config_1 = require("../config/config");
const getTable = (type) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let range;
    switch (type) {
        case 'users':
            range = 'A:H';
            break;
        case 'admin':
            range = 'Q:Q';
            break;
        default:
            range = 'J:M';
            break;
    }
    try {
        const sheet = googleapis_1.google.sheets({ version: 'v4', auth: (0, config_1.getConfig)('GOOGLE_API_KEY') });
        const response = yield sheet.spreadsheets.values.get({
            spreadsheetId: (0, config_1.getConfig)('TABLE_ID'),
            range: `${(0, config_1.getConfig)('SHEET_NAME')}!${range}`,
            prettyPrint: true,
        });
        const sliceStart = type === 'admin' ? 0 : 2;
        return (_a = response.data.values) === null || _a === void 0 ? void 0 : _a.slice(sliceStart);
    }
    catch (_b) {
        return [];
    }
});
exports.getTable = getTable;

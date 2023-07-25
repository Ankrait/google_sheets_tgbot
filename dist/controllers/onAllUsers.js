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
exports.onAllUsers = void 0;
const utils_1 = require("../common/utils");
const services_1 = require("../services/services");
const getMoneyString_1 = require("../common/utils/getMoneyString");
const onAllUsers = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = ctx.from.id;
    const isAdmin = yield (0, services_1.getIsAdmin)(userId);
    if (!isAdmin) {
        yield next();
        return;
    }
    yield ctx.sendChatAction('typing');
    const { message_id } = yield ctx.reply('Загрузка...');
    const users = yield (0, services_1.getAllUsers)();
    let resultMessage = '';
    users.forEach((user) => {
        resultMessage +=
            '<b>' +
                user.name +
                '</b>\nДепозит: <b>' +
                (0, getMoneyString_1.getMoneyString)(user.deposit) +
                '</b>\nБаланс: <b>' +
                (0, getMoneyString_1.getMoneyString)(user.balance) +
                '</b>\nПрофит: ' +
                (user.profit > 0 ? '✅ ' : '🔻 ') +
                '<b>' +
                (0, getMoneyString_1.getMoneyString)(Math.abs(user.profit)) +
                '</b>\n\n';
    });
    yield (0, utils_1.editLastMessage)(ctx, message_id, resultMessage, { parse_mode: 'HTML' });
});
exports.onAllUsers = onAllUsers;

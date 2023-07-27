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
exports.onAnyMessage = void 0;
const userMarkup_1 = require("../markups/userMarkup");
const adminMarkup_1 = require("../markups/adminMarkup");
const services_1 = require("../services/services");
const onAnyMessage = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = ctx.from.id;
    const isAdmin = yield (0, services_1.getIsAdmin)(userId);
    const markup = isAdmin ? adminMarkup_1.adminMarkup : userMarkup_1.userMarkup;
    ctx.reply('Выберите действие', markup);
});
exports.onAnyMessage = onAnyMessage;

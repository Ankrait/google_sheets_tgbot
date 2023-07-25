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
exports.start = void 0;
const defaultMarkup_1 = require("../markups/defaultMarkup");
const services_1 = require("../services/services");
const adminMarkup_1 = require("../markups/adminMarkup");
const start = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = ctx.from.id;
    const isAdmin = yield (0, services_1.getIsAdmin)(userId);
    const markup = isAdmin ? adminMarkup_1.adminMarkup : defaultMarkup_1.defaultMarkup;
    ctx.replyWithSticker('CAACAgIAAxkBAAIDhWS6bctHMkinzJ14I4I36jYeg_RzAALdDgACTV3wSyj9qXggllKeLwQ', markup);
});
exports.start = start;

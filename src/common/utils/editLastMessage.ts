import { Context } from 'telegraf';
import { Update } from 'telegraf/types';
import { ExtraEditMessageText } from 'telegraf/typings/telegram-types';

export const editLastMessage = async (
	ctx: Context<Update.MessageUpdate>,
	messageId: number | undefined,
	message: string,
	options?: ExtraEditMessageText
) =>
	await ctx.telegram.editMessageText(ctx.chat.id, messageId, undefined, message, options);

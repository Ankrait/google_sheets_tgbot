import { Markup } from 'telegraf';
import { userActionsEnum } from '../common/enums';

export const defaultMarkup = Markup.keyboard(
	[
		userActionsEnum.Finance,
		userActionsEnum.DayProfit,
		userActionsEnum.CreateDeposit,
		userActionsEnum.Statistics,
	],
	{
		columns: 2,
	}
).resize();

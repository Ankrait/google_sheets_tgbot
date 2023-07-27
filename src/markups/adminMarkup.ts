import { Markup } from 'telegraf';
import { adminActionsEnum } from '../common/enums';

export const adminMarkup = Markup.keyboard(
	[adminActionsEnum.AllUsers, adminActionsEnum.DaysStats],
	{
		columns: 2,
	}
).resize();

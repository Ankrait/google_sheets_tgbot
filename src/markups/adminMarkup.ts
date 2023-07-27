import { Markup } from 'telegraf';
import { adminActionsEnum } from '../common/enums';

export const adminMarkup = Markup.keyboard(
	[adminActionsEnum.AllUsers, adminActionsEnum.Statistics, 'Рассылка'],
	{
		columns: 2,
	}
).resize();

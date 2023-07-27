import { bot } from '../app';
import { getMoneyString } from '../common/utils';
import { getDateString } from '../common/utils/getDateString';
import { getDaysStats } from '../services/services';
import { IDaysStats } from '../services/services.interface';

let lastDaysStats: IDaysStats[] = [];

export const sendDailyMessage = async () => {
	const currentDaysStats = await getDaysStats();
	if (currentDaysStats.length === 0) {
		return;
	}
	if (lastDaysStats.length === 0) {
		lastDaysStats = currentDaysStats;
		return;
	}
	const lastDayI = currentDaysStats.length - 1;
	if (lastDaysStats.length === currentDaysStats.length) {
		if (lastDaysStats[lastDayI].endBalance === currentDaysStats[lastDayI].endBalance) {
			return;
		}
	}

	lastDaysStats = currentDaysStats;

	bot.telegram.sendMessage(
		'156045434',
		`${getDateString(currentDaysStats[lastDayI].day)} --- ${getMoneyString(
			currentDaysStats[lastDayI].startBalance
		)} ${getMoneyString(currentDaysStats[lastDayI].endBalance)}`
	);
	bot.telegram.sendMessage(
		'747402803',
		`${getDateString(currentDaysStats[lastDayI].day)} --- ${getMoneyString(
			currentDaysStats[lastDayI].startBalance
		)} ${getMoneyString(currentDaysStats[lastDayI].endBalance)}`
	);
};

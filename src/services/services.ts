import { getNumber, parseDate } from '../common/utils';
import { getTable } from './getTable';
import { getUserRow } from './getUserRowFromTable';
import { IDayProfit, IUserFinance, IDaysStats } from './services.interface';

export const getUserFinance = async (id: number): Promise<IUserFinance | null> => {
	const userTable = await getTable('users');
	const userRow = getUserRow(userTable, id);

	if (userRow === null) return null;

	return {
		name: userTable[userRow][3],
		deposit: getNumber(userTable[userRow][2]),
		balance: getNumber(userTable[userRow][6]),
		profit: getNumber(userTable[userRow][5]),
		dateIn: parseDate(userTable[userRow][0]),
	};
};

export const getDayProfit = async (id: number): Promise<IDayProfit | null> => {
	const user = await getUserFinance(id);
	if (!user || !user.dateIn) return null;

	const daysTable = await getTable('days');

	let lastDatePos = -1;

	for (let dayI = 0; dayI < daysTable.length; dayI++) {
		const currentDate = parseDate(daysTable[dayI][1]);
		if (!currentDate) {
			continue;
		}

		if (+currentDate >= +user.dateIn) {
			lastDatePos = dayI;
		}
	}

	if (lastDatePos === -1) {
		return null;
	}

	const originalBalance = user.deposit + user.profit * 2;
	const dayProfit =
		(originalBalance *
			(1 - getNumber(daysTable[lastDatePos][2]) / getNumber(daysTable[lastDatePos][3]))) /
		2;

	return {
		day: parseDate(daysTable[lastDatePos][1])!,
		profit: dayProfit,
	};
};

export const getStatistics = async (id: number): Promise<IDayProfit[] | null> => {
	const user = await getUserFinance(id);
	if (!user || !user.dateIn) return null;

	const daysTable = await getTable('days');

	let userStatistics: IDayProfit[] = [];
	let lastDayBalance = user.deposit;
	let currentDayBalance = 0;

	for (let dayI = 0; dayI < daysTable.length; dayI++) {
		const currentDate = parseDate(daysTable[dayI][1]);
		if (!currentDate || +currentDate < +user.dateIn) {
			continue;
		}

		currentDayBalance =
			lastDayBalance * (getNumber(daysTable[dayI][3]) / getNumber(daysTable[dayI][2]));

		userStatistics.push({
			day: currentDate,
			profit: (currentDayBalance - lastDayBalance) / 2,
		});

		lastDayBalance = currentDayBalance;
	}

	return userStatistics;
};

export const getIsAdmin = async (id: number): Promise<boolean> => {
	const response = await getTable('admin');

	return response[1][0]
		.split(',')
		.map((el) => el.trim())
		.includes(id.toString());
};

export const getAllUsers = async (): Promise<IUserFinance[]> => {
	const userTable = await getTable('users');

	const users: IUserFinance[] = [];

	for (let i = 0; i < userTable.length; i++) {
		if (userTable[i].length < 7) {
			continue;
		}

		users.push({
			name: userTable[i][3],
			deposit: getNumber(userTable[i][2]),
			balance: getNumber(userTable[i][6]),
			profit: getNumber(userTable[i][5]),
			dateIn: parseDate(userTable[i][0]),
		});
	}

	return users;
};

export const getDaysStats = async (): Promise<IDaysStats[]> => {
	const daysTable = await getTable('days');

	if (daysTable.length === 0) {
		return [];
	}

	const result: IDaysStats[] = [];

	for (let dayI = 0; dayI < daysTable.length; dayI++) {
		const day = parseDate(daysTable[dayI][1]);
		if (!day) {
			continue;
		}

		const startBalance = getNumber(daysTable[dayI][2]);
		const endBalance = getNumber(daysTable[dayI][3]);

		if (startBalance === endBalance) {
			continue;
		}

		result.push({
			day,
			startBalance,
			endBalance,
		});
	}

	return result;
};

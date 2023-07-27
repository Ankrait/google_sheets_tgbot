export interface IUserFinance {
	name: string;
	deposit: number;
	balance: number;
	profit: number;
	dateIn: Date | null;
}

export interface IDayProfit {
	day: Date;
	profit: number;
}

export interface IDaysStats {
	day: Date;
	startBalance: number;
	endBalance: number;
}
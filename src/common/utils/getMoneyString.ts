export const getMoneyString = (value: number) => {
	return '$' + value.toLocaleString('ru-RU', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
};

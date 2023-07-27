export const getNumber = (str: string | undefined): number => {
	if (!str) return 0;
	return +str.replace(/[%$\s]/g, '').replace(',', '.');
};

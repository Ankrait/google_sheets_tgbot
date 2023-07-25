export const getNumber = (str: string): number => {
	return +str.replace(/[%$\s]/g, '').replace(',', '.');
};

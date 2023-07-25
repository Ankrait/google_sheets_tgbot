export const getUserRowFromTable = (table: string[][], userId: number) => {
	let position = -1;

	for (let i = 0; i < table.length; i++) {
		if (+table[i][4] === userId) {
			position = i;
			break;
		}
	}

	return position !== -1 ? position : null;
};

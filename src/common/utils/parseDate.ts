export const parseDate = (input: string) => {
	var parts = input.match(/(\d+)/g);

	if (!parts || parts.length !== 3) return null;
	return new Date(+parts[2], +parts[1] - 1, +parts[0]);
};

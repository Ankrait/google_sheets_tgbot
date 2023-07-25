import { google } from 'googleapis';
import { getConfig } from '../config/config';

type TableType = 'users' | 'days' | 'admin';

export const getTable = async (type: TableType) => {
	let range: string;
	switch (type) {
		case 'users':
			range = 'A:H';
			break;
		case 'admin':
			range = 'Q:Q';
			break;
		default:
			range = 'J:M';
			break;
	}

	try {
		const sheet = google.sheets({ version: 'v4', auth: getConfig('GOOGLE_API_KEY') });
		const response = await sheet.spreadsheets.values.get({
			spreadsheetId: getConfig('TABLE_ID'),
			range: `${getConfig('SHEET_NAME')}!${range}`,
			prettyPrint: true,
		});

		const sliceStart = type === 'admin' ? 0 : 2;
		return response.data.values?.slice(sliceStart) as string[][];
	} catch {
		return [];
	}
};

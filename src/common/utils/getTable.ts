import { google } from 'googleapis';
import { getConfig } from '../../config/config';

type TableType = 'users' | 'days';

export const getTable = async (type: TableType) => {
	const range = type === 'users' ? 'A:H' : 'J:M';
	try {
		const sheet = google.sheets({ version: 'v4', auth: getConfig('GOOGLE_API_KEY') });
		const response = await sheet.spreadsheets.values.get({
			spreadsheetId: getConfig('TABLE_ID'),
			range: `${getConfig('SHEET_NAME')}!${range}`,
			prettyPrint: true,
		});
		return response.data.values?.slice(2) as string[][];
	} catch {
		return [];
	}
};

import { bot } from './app';
import cron from 'node-cron';

import { sendDailyMessage } from './controllers';

cron.schedule('0-59 * * * *', () => {
	sendDailyMessage();
});

bot.launch().then(() => {
	console.log('Бот запущен');
});

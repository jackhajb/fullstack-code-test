import cron from 'node-cron';
import { iss } from '../api/v1/controllers';

export const updateIssLocation = cron.schedule('*/2 * * * * *', iss.fetchAndWriteIssDataToDB, {
  scheduled: false,
});

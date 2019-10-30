import createApp from './server';
import { logger } from './util';
import { db } from './config';
import { iss } from './cron/index';

const app = createApp(db.url);

(async () => {
  try {
    await app.connect();
    await app.start();
    iss.updateIssLocation.start();
  } catch (err) {
    logger.error(err);
  }
})();

import { Router } from 'express';
import v1Routes from './v1';
import { iss } from './v1/controllers';

export default () => {
  const router = Router();
  router.use('/v1', v1Routes());
  setInterval(iss.fetchAndWriteIssDataToDB, 2000);
  return router;
};

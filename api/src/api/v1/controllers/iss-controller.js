import { iss } from '../services';

export const fetchAndWriteIssDataToDB = async () => {
  const response = await iss.fetchIssLocation();
  let { timestamp, iss_position: { latitude, longitude } } = response.data;
  timestamp = new Date(timestamp * 1000).toISOString();
  iss.writeIssLocation({
    timestamp,
    latitude,
    longitude,
  });
};

export const getIssDataFromDB = async (req, res) => {
  req.statusCode = 200;
  req.message = 'Successfully retrieved iss location data';
  req.operation = iss.getIssLocationFromDB();
  res.exec();
};

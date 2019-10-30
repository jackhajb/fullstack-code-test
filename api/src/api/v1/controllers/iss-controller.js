import { iss } from '../services';

export const fetchAndWriteIssDataToDB = async () => {
  const response = await iss.fetchIssLocation();
  const { timestamp, iss_position: { latitude, longitude } } = response.data;
  const convertedTimestamp = new Date(timestamp * 1000).toISOString();
  iss.writeIssLocation({
    timestamp: convertedTimestamp,
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

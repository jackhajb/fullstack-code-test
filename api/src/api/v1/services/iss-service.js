import { Iss } from '../models';
const axios = require('axios');

export const fetchIssLocation = async () => {
  try {
    return await axios.get('http://api.open-notify.org/iss-now.json');
  } catch (error) {
    console.error(error);
  }
};

export const writeIssLocation = ({
  timestamp,
  longitude,
  latitude,
}) => {
  const issParams = {
    timestamp,
    longitude,
    latitude,
  };
  return Iss.create(issParams);
};

export const getIssLocationFromDB = async () => {
  const location = await Iss.findOne({}, {}, { sort: { timestamp: -1 } });
  return location;
};

import mongoose from 'mongoose';

const issSchema = mongoose.Schema({
  timestamp: {
    type: Date,
    trim: true,
    required: true,
  },
  latitude: {
    type: String,
    trim: true,
    required: true,
  },
  longitude: {
    type: String,
    trim: true,
    required: true,
  },
});

export default mongoose.model('Iss', issSchema);

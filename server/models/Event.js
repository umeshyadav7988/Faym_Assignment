const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  event_type: { 
    type: String, 
    enum: ['view', 'click', 'location'], 
    required: true 
  },
  timestamp: { type: Date, required: true },
  payload: {
    type: mongoose.Schema.Types.Mixed, 
    required: true 
  }
});


module.exports = mongoose.model('Event', EventSchema);

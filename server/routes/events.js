const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.post('/events', async (req, res, next) => {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();
    console.log(`Saved event: ${savedEvent._id} (${savedEvent.event_type})`);
    res.status(201).json(savedEvent);
  } catch (err) {

    next(err);
  }
});

module.exports = router;

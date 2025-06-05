const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/event-counts', async (req, res, next) => {
  try {
    const { start_date, end_date, user_id, event_type } = req.query;
    const filter = {};

  
    if (start_date || end_date) {
      filter.timestamp = {};
      if (start_date) filter.timestamp.$gte = new Date(start_date);
      if (end_date) filter.timestamp.$lte = new Date(end_date);
    }

    if (user_id) filter.user_id = user_id;

    if (event_type) filter.event_type = event_type;

    const count = await Event.countDocuments(filter);
    res.json({ count });
  } catch (err) {
    next(err);
  }
});


router.get('/event-counts-by-type', async (req, res, next) => {
  try {
    const { start_date, end_date } = req.query;
    const match = {};

    if (start_date || end_date) {
      match.timestamp = {};
      if (start_date) match.timestamp.$gte = new Date(start_date);
      if (end_date) match.timestamp.$lte = new Date(end_date);
    }

    const result = await Event.aggregate([
      { $match: match },
      { $group: { _id: '$event_type', count: { $sum: 1 } } }
    ]);


    const countsByType = result.map(r => ({
      event_type: r._id,
      count: r.count
    }));

    res.json(countsByType);
  } catch (err) {
    next(err);
  }
});

module.exports = router;


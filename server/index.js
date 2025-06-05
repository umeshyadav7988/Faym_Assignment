const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const mongoURI = process.env.MONGO_URI ||'mongodb://localhost:27017/mongodb://localhost:27017/faymAssign' ;
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


const eventsRouter = require('./routes/events');
const analyticsRouter = require('./routes/analytics');
app.use('/', eventsRouter);
app.use('/analytics', analyticsRouter);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

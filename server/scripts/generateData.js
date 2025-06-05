const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Event = require('../models/Event');

mongoose.connect('mongodb://localhost:27017/faymAssign', {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(async () => {
  console.log('Connected to MongoDB for data generation');
  const fromDate = new Date('2025-05-01T00:00:00Z');
  const toDate = new Date('2025-05-29T23:59:59Z');

  const events = [];
  const numEvents = faker.number.int({ min: 1000, max: 5000 });
  const eventTypes = ['view', 'click', 'location'];

  for (let i = 0; i < numEvents; i++) {
 
    const userId = faker.number.int({ min: 1, max: 50 }).toString();
    const type = faker.helpers.arrayElement(eventTypes);
    const timestamp = faker.date.between({ from: fromDate, to: toDate });

    let payload;
    if (type === 'view') {
      payload = { page: faker.internet.url() };
    } else if (type === 'click') {
      payload = { element: faker.hacker.noun() };
    } else if (type === 'location') {
      
      payload = {
        latitude: faker.location.latitude(),   
        longitude: faker.location.longitude()  
      };
    }

  
    events.push({
      user_id: userId,
      event_type: type,
      timestamp,
      payload
    });
  }

  
  await Event.insertMany(events);
  console.log(`Inserted ${events.length} events into the database.`);
  
  
  mongoose.connection.close();
}).catch(err => {
  console.error('Error:', err);
});

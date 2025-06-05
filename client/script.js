if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(reg => console.log('Service worker registered', reg))
    .catch(err => console.error('SW registration failed:', err));
}

window.addEventListener('DOMContentLoaded', () => {
  sendEvent('view', { page: window.location.pathname });
});


document.getElementById('clickButton').addEventListener('click', () => {
  sendEvent('click', { element: 'clickButton' });
});

document.getElementById('locationButton').addEventListener('click', () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = position.coords;
        sendEvent('location', { 
          latitude: coords.latitude, 
          longitude: coords.longitude 
        });
      },
      (error) => {
        console.error('Geolocation error:', error);
      }
    );
  } else {
    console.error('Geolocation not supported');
  }
});


function sendEvent(type, payload) {
  const event = {
    user_id: 'client-user',
    event_type: type,
    timestamp: new Date().toISOString(),
    payload: payload
  };
  fetch('http://localhost:3000/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event)
  })
  .then(res => res.json())
  .then(data => console.log('Event sent:', data))
  .catch(err => console.error('Error sending event:', err));
}

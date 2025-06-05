# Web Analytics Event Service

A backend and frontend system to collect, store, and analyze user interaction events (`view`, `click`, `location`) using **Node.js**, **Express.js**, and **MongoDB**.

> 📧 Maintainer: [umeshyadav7988@gmail.com](mailto:umeshyadav7988@gmail.com)

---

## 🧠 Goal

Build a robust backend service to collect, store, and provide aggregated analytics for user interaction events. This project demonstrates:

- Flexible event schema design
- REST API development
- Time-based and type-based analytics using MongoDB aggregation
- Asynchronous client-side event collection via a Service Worker

---

## 🛠 Technologies Used

| Tech        | Purpose                                      |
|-------------|----------------------------------------------|
| Node.js     | Backend runtime environment                  |
| Express.js  | REST API framework                           |
| MongoDB     | NoSQL database for event storage             |
| Mongoose    | ODM for schema modeling and validation       |
| Faker.js    | Generating sample event data                 |
| HTML/CSS/JS | Simple frontend for demo interaction         |
| ServiceWorker | Background event posting                   |
| Morgan      | HTTP request logging                         |

---

## ⚙️ Setup Instructions (Windows)

### 1. Prerequisites

Ensure the following are installed:

- Node.js (v18+ recommended)
- MongoDB (local instance running on default port)

Verify installation:

```bash
node -v
npm -v
mongod --version
````

Start MongoDB service if not already running:

```bash
mongod
```

---

### 2. Clone Repository

```bash
git clone https://github.com/umeshyadav7988/Faym_Assignment.git
cd Faym_Assignment
```

---

### 3. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with:

```env
MONGO_URI=mongodb://localhost:27017/analyticsDB
PORT=5000
```

Generate sample data (1000+ events):

```bash
node scripts/generateData.js
```

Start the backend server:

```bash
npm start
```

---

### 4. Frontend Setup

```bash
cd ../frontend
npx http-server .
```

Open `http://localhost:8080` in your browser.

---

## 📦 API Endpoints

---

### 🔘 POST `/events`

Creates a new user interaction event.

* **Method:** POST
* **Content-Type:** application/json

#### Sample Request:

```json
{
  "user_id": "user123",
  "event_type": "click",
  "payload": {
    "element_id": "btn-login",
    "text": "Login",
    "xpath": "/html/body/button"
  }
}
```

#### Response:

* `202 Accepted` — success
* `400 Bad Request` — validation failed
* `500 Internal Server Error` — server/database error

---

### 📊 GET `/analytics/event-counts`

Get total event count with optional filters.

* **Method:** GET
* **Query Params (optional):**

  * `event_type=view`
  * `start_date=2025-05-01`
  * `end_date=2025-05-29`

#### Response:

```json
{
  "total_events": 12345
}
```

---

### 📈 GET `/analytics/event-counts-by-type`

Get event count grouped by type with optional date filters.

* **Method:** GET
* **Query Params (optional):**

  * `start_date=2025-05-01`
  * `end_date=2025-05-29`

#### Response:

```json
[
  { "event_type": "view", "count": 8000 },
  { "event_type": "click", "count": 3000 },
  { "event_type": "location", "count": 1345 }
]
```

---

## 🧾 Sample Event Schema (MongoDB)

```js
{
  user_id: String,
  event_type: "view" | "click" | "location",
  timestamp: Date, // UTC
  payload: Object
}
```

### Indexed Fields:

* `event_type`
* `timestamp`

---

## 🔍 Sample MongoDB Document

```json
{
  "_id": { "$oid": "68410ec83292e9b11157aa51" },
  "user_id": "18",
  "event_type": "view",
  "timestamp": { "$date": "2025-05-13T01:49:32.561Z" },
  "payload": {
    "page": "https://harmful-declaration.com/"
  },
  "__v": 0
}
```

---

## 🧪 Testing with Postman

1. **POST `/events`** — Send valid/invalid event bodies
2. **GET `/analytics/event-counts`** — With and without filters
3. **GET `/analytics/event-counts-by-type`** — Date range filters

*✅ Screenshots of successful tests are available in the repository under `/screenshots`.*

---

## ❗Challenges Faced

1. Payload structure varies across `event_type`s — required custom validation logic.
2. Ensuring UTC timestamps consistently.
3. Writing flexible MongoDB aggregations with optional filters.
4. IP Whitelisting while using Atlas (resolved by local instance setup).

---

## Future Improvements

* ✅ Authentication & API keys for secure event tracking
* ✅ Analytics Dashboard with charts (e.g., Chart.js or Looker)
* ✅ Redis caching for repeated queries
* ✅ Bulk event API ingestion
* ✅ Geospatial indexing for advanced location analytics
* ✅ Docker + CI/CD for cloud deployment
* ✅ Improved async background processing via Service Worker

---

## 📂 Repository Structure

```
Faym_Assignment/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── scripts/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── index.html
│   └── service-worker.js
├── screenshots/
├── README.md
└── package.json
```

---

## 👨‍💻 Author

**Umesh Yadav**
[GitHub Profile](https://github.com/umeshyadav7988)
[Email](mailto:umeshyadav7988@gmail.com)




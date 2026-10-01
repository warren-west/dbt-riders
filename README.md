# Express API - Ride Management System

A Node.js/Express backend for managing rides, drivers, and customers using Sequelize ORM with SQL Server (Tedious).

## Tech Stack

- **Framework**: Express.js
- **ORM**: Sequelize
- **Database Driver**: Tedious (SQL Server)
- **Runtime**: Node.js

## Setup

```bash
npm install
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server runs on `http://localhost:3000` by default (set `PORT` environment variable to override).

## Configuration

Copy `.env.example` to `.env` and fill in your database credentials:

```bash
cp .env.example .env
```

## Database Models

### Ride
Represents a ride transaction with details about the trip.
- **rideId**: Auto-incrementing primary key
- **city**: String (required) - City where the ride takes place
- **startTime**: Date (required) - When the ride started (defaults to current time)
- **endTime**: Date - When the ride ended
- **distance**: Decimal - Distance traveled
- **price**: Decimal - Fare charged
- **rideState**: Enum ('IN_PROGRESS', 'COMPLETED', 'CANCELED') - Current status

**Relationships**: Belongs to a Driver and a Customer (many-to-one)

### Driver
Represents a driver in the system.
- **fullname**: String (required) - Driver's full name
- **licenseCode**: Enum ('B', 'BA', 'C', 'D', 'E') - Vehicle license category

**Relationships**: Has many Rides (one-to-many)

### Customer
Represents a customer who books rides.
- **name**: String (required) - Customer's name

**Relationships**: Has many Rides (one-to-many)

## Database Connection

The application uses a custom `connectDb()` method attached to the db wrapper object to handle database initialization:

```javascript
// models/index.js
async function connectDb() {
    await sequelize.validate()  // Validates the connection
    await sequelize.sync()       // Syncs all defined models with the database
}

db.connectDb = connectDb
```

This method is invoked in `server.js` before the server starts listening:

```javascript
// server.js
const db = require('./models')

db.connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
        console.log(`Database connection succeeded :)`)
    })
    .catch((err) => {
        console.log(`Database connection failed :(`)
        console.log(err.message)
    })
```

## Endpoints

### General

- `GET /` - Index endpoint, returns a welcome message
- `GET /health` - Health check, returns a status message

### Ride Analytics

- `GET /rides/avePricePerCity` - Returns the average ride price grouped by city, ordered highest to lowest.
- `GET /rides/aveRideTimePerCity` - Returns the average ride duration per city, calculated from `startTime` to `endTime` in minutes.
- `GET /rides/totalRidesPerCity` - Returns the total number of rides per city, ordered by ride count descending.

### Ride Lifecycle

- `POST /rides/start` - Starts a new ride.
  - Required body fields:
    - `city`
    - `DriverId`
    - `CustomerId`
  - Example payload:

```json
{
  "city": "New York",
  "DriverId": 1,
  "CustomerId": 2
}
```

- `PUT /rides/end/:rideId` - Ends an in-progress ride and marks it as completed.
  - Required body fields:
    - `price`
    - `distance`
  - Updates `endTime`, `price`, `distance`, and sets `rideState` to `COMPLETED`.

- `PUT /rides/cancel/:rideId` - Cancels an in-progress ride.
  - Validates that the ride exists and is currently `IN_PROGRESS`.
  - Also requires the ride to be at least one minute old before it can be canceled.
  - Sets `endTime`, `price` to `0.0`, `distance` to `0.0`, and `rideState` to `CANCELED`.

### Response Format

Most ride endpoints return JSON responses in the form:

```json
{
  "status": "Success",
  "data": []
}
```

Error responses return a status code and a descriptive message:

```json
{
  "status": "Error",
  "message": "'city' is required."
}
```

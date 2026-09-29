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

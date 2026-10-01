# DBT Riders - Microservices Architecture

A Node.js/Express microservices platform for managing rides, drivers, customers, and support operations using Sequelize ORM with SQL Server and MySQL databases.

## Architecture Overview

The project is organized into three independent microservices, each with its own database and business logic:

### 1. **Gateway** (Port 3000)
API gateway that routes requests to other microservices using HTTP proxying.

### 2. **Drives Service** (Port 3001)
Manages ride operations, drivers, and customers. Handles ride lifecycle management and analytics.
- Database: SQL Server (Tedious driver)
- Key Models: Ride, Driver, Customer

### 3. **Support Service** (Port 3002)
Manages customer support tickets and employee assignments.
- Database: MySQL
- Key Models: Ticket, Employee

## Tech Stack

- **Framework**: Express.js (v4.x / v5.x)
- **ORM**: Sequelize
- **Databases**: 
  - SQL Server (Tedious driver) - Drives service
  - MySQL - Support service
- **Runtime**: Node.js
- **Routing**: express-http-proxy (Gateway)
- **Utilities**: dotenv, CORS

## Setup & Installation

### Prerequisites
- Node.js installed
- SQL Server running (for Drives service)
- MySQL running (for Support service)

### Install Dependencies

```bash
# Install gateway dependencies
cd gateway
npm install

# Install drives service dependencies
cd ../drives
npm install

# Install support service dependencies
cd ../support
npm install
```

### Configuration

Create `.env` files in each service directory with the required database credentials:

**Gateway (.env)**
```
PORT=3000
```

**Drives Service (.env)**
```
PORT=3001
DB_HOST=your_sql_server_host
DB_PORT=1433
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
```

**Support Service (.env)**
```
PORT=3002
DB_HOST=your_mysql_host
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
```

## Running the Application

### Development Mode (with auto-reload)

```bash
# Terminal 1 - Start Drives Service
cd drives
npm run dev

# Terminal 2 - Start Support Service
cd support
npm run dev

# Terminal 3 - Start Gateway
cd gateway
npm run dev
```

### Production Mode

```bash
# Terminal 1 - Drives Service
cd drives
npm start

# Terminal 2 - Support Service
cd support
npm start

# Terminal 3 - Gateway
cd gateway
npm start
```

The API Gateway will be accessible at `http://localhost:3000`

## Database Models

### Drives Service Models

#### Ride
Represents a ride transaction with details about the trip.
- **rideId**: Auto-incrementing primary key
- **city**: String (required) - City where the ride takes place
- **startTime**: Date (required) - When the ride started (defaults to current time)
- **endTime**: Date - When the ride ended
- **distance**: Decimal - Distance traveled
- **price**: Decimal - Fare charged
- **rideState**: Enum ('IN_PROGRESS', 'COMPLETED', 'CANCELED') - Current status
- **DriverId**: Foreign key to Driver
- **CustomerId**: Foreign key to Customer

**Relationships**: Belongs to a Driver and a Customer (many-to-one)

#### Driver
Represents a driver in the system.
- **id**: Auto-incrementing primary key
- **fullname**: String (required) - Driver's full name
- **licenseCode**: Enum ('B', 'BA', 'C', 'D', 'E') - Vehicle license category

**Relationships**: Has many Rides (one-to-many)

#### Customer
Represents a customer who books rides.
- **id**: Auto-incrementing primary key
- **name**: String (required) - Customer's name

**Relationships**: Has many Rides (one-to-many)

### Support Service Models

#### Employee
Represents a support team employee.
- **id**: Auto-incrementing primary key
- **fullname**: String (required) - Employee's full name

**Relationships**: Has many Tickets (one-to-many)

#### Ticket
Represents a customer support ticket.
- **id**: Auto-incrementing primary key
- **CustomerId**: Foreign key to Customer (from Drives service)
- **EmployeeId**: Foreign key to Employee
- **title**: String (required) - Ticket title
- **description**: String (required) - Detailed description
- **openTime**: Date (required) - When the ticket was opened
- **closeTime**: Date - When the ticket was closed

**Relationships**: Belongs to an Employee (many-to-one)

## API Endpoints

All requests through the gateway are prefixed with `/drives/` or `/support/` which route to the respective microservices.

### Gateway Routes

The gateway proxies requests to:
- `/drives/*` → Drives Service (localhost:3001)
- `/support/*` → Support Service (localhost:3002)

### Drives Service Endpoints

#### General

- **GET** `/` - Index endpoint, returns a welcome message
- **GET** `/health` - Health check, returns status message

#### Ride Analytics

- **GET** `/rides/analytics/average-price-by-city` 
  - Returns the average ride price grouped by city, ordered highest to lowest
  - Response: Array of objects with `city` and `averagePrice`

- **GET** `/rides/analytics/average-duration-by-city`
  - Returns the average ride duration per city, calculated from `startTime` to `endTime` in minutes
  - Response: Array of objects with `city` and `averageRideTime`

- **GET** `/rides/analytics/count-by-city`
  - Returns the total number of rides per city, ordered by ride count descending
  - Response: Array of objects with `city` and `countRides`

#### Ride Lifecycle

- **POST** `/rides` - Starts a new ride
  - Required body fields:
    - `city` (String) - City where the ride takes place
    - `DriverId` (Integer) - ID of the driver
    - `CustomerId` (Integer) - ID of the customer
  - Response: `201 Created` with newly created ride object
  - Errors: `400 Bad Request` if required fields missing, `500 Server Error`
  - Example payload:
  ```json
  {
    "city": "New York",
    "DriverId": 1,
    "CustomerId": 2
  }
  ```

- **POST** `/rides/:rideId/end` - Ends an in-progress ride and marks it as completed
  - Required body fields:
    - `price` (Decimal) - Final fare amount
    - `distance` (Decimal) - Distance traveled
  - Updates: `endTime` (current time), `price`, `distance`, and sets `rideState` to `COMPLETED`
  - Response: `204 No Content`
  - Errors: `400 Bad Request` if required fields missing, `404 Not Found` if ride doesn't exist, `500 Server Error`

- **POST** `/rides/:rideId/cancel` - Cancels an in-progress ride
  - Validates that:
    - The ride exists
    - The ride is currently in `IN_PROGRESS` state
    - The ride is at least one minute old
  - Updates: `endTime` (current time), `price` to `0.0`, `distance` to `0.0`, and sets `rideState` to `CANCELED`
  - Response: `204 No Content`
  - Errors: `400 Bad Request` if ride conditions not met, `404 Not Found` if ride doesn't exist, `500 Server Error`

#### Database Seeding

- **POST** `/seed` - Populates the database with seed data
  - Bulk creates sample Drivers, Customers, and Rides
  - Uses database transactions to ensure data consistency
  - Response: `201 Created` with success message
  - Errors: `500 Server Error` if seeding fails

### Support Service Endpoints

#### Employees

- **GET** `/employees` - Get all employees
  - Response: Array of employee objects with `id` and `fullname`

#### Tickets

- **GET** `/tickets` - Get all support tickets
  - Response: Array of ticket objects with `id`, `CustomerId`, `EmployeeId`, `title`, `description`, `openTime`, and `closeTime`

## Response Format

### Success Response

Most endpoints return JSON responses in the form:

```json
{
  "status": "Success",
  "data": [],
  "message": "Optional message"
}
```

### Error Response

Error responses return an appropriate HTTP status code and a descriptive message:

```json
{
  "status": "Error",
  "message": "Descriptive error message"
}
```

## Database Connection

Each service uses a custom `connectDb()` method attached to the db wrapper object to handle database initialization:

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
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
        console.log(`Database connection succeeded :)`)
    })
    .catch((err) => {
        console.log(`Database connection failed :(`)
        console.log(err.message)
    })
```

## Project Structure

```
dbt-riders/
├── gateway/                    # API Gateway Service
│   ├── index.js               # Gateway entry point
│   ├── package.json
│   └── .env
├── drives/                     # Drives Service (Rides, Drivers, Customers)
│   ├── src/
│   │   ├── server.js          # Server entry point
│   │   ├── app.js             # Express app configuration
│   │   ├── models/            # Sequelize models
│   │   ├── routes/            # API route handlers
│   │   │   ├── index.js       # General routes
│   │   │   ├── health.js      # Health check
│   │   │   ├── rides.js       # Ride endpoints
│   │   │   └── seeds.js       # Database seeding
│   │   └── data/
│   │       └── seed.js        # Seed data
│   ├── package.json
│   └── .env
├── support/                    # Support Service (Tickets, Employees)
│   ├── src/
│   │   ├── server.js          # Server entry point
│   │   ├── app.js             # Express app configuration
│   │   ├── models/            # Sequelize models
│   │   └── routes/            # API route handlers
│   │       ├── employees.js   # Employee endpoints
│   │       └── tickets.js     # Ticket endpoints
│   ├── package.json
│   └── .env
└── README.md
```

## Notes

- Each microservice operates independently and manages its own database
- The Gateway provides a single entry point for all client requests
- Services can be scaled, deployed, and updated independently
- Database migrations and seeding should be handled per-service

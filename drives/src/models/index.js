// fill the process.env object with values
require('dotenv').config()

const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
        // TODO: enable encryption (Azure only)
        options: {
            encrypt: true
        }
    },
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    // only turn on logging when we're in dev mode.
    // if we're in production mode, no logs
    logging: process.env.NODE_ENV === 'dev',
})

// define the db wrapper object
const db = {}
db.sequelize = sequelize

// we will invoke the .connectDb() method in server.js before we start the server listening
async function connectDb() {
    await sequelize.validate()
    // if we're running in production mode,
    // don't use { force: true, alter: true }
    if (process.env.NODE_ENV === 'prod') {
        console.log('NODE_ENV: ', process.env.NODE_ENV)
        await sequelize.sync()
    }
    // if we ARE running in dev mode,
    // use { force: true, alter: true }
    else if (process.env.NODE_ENV === 'dev') {
        console.log('NODE_ENV: ', process.env.NODE_ENV)
        await sequelize.sync({ force: true, alter: true })
    }
}

db.connectDb = connectDb

// import models from the model files
db.Driver = require('./driver')(sequelize, DataTypes)
db.Customer = require('./customer')(sequelize, DataTypes)
db.Ride = require('./ride')(sequelize, DataTypes)

// define associations
// Driver-Ride 1-to-m
db.Driver.hasMany(db.Ride)
db.Ride.belongsTo(db.Driver)

// Customer-Ride 1-to-m
db.Customer.hasMany(db.Ride)
db.Ride.belongsTo(db.Customer)

// export the db wrapper object
module.exports = db
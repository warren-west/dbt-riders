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
    port: process.env.DB_PORT
})

// define the db wrapper object
const db = {}
db.sequelize = sequelize

// we will invoke the .connectDb() method in server.js before we start the server listening
async function connectDb() {
    await sequelize.validate()
    await sequelize.sync() // maybe use { force: true, alter: true }
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
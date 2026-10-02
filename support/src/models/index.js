require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize')

// define the sequelize connection
const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    logging: process.env.NODE_ENV === 'dev',
    dialect: process.env.DB_DIALECT,
})

// initialize db wrapper object
const db = {}
db.sequelize = sequelize

// db connection helper method
async function connectDb() {
    await sequelize.validate()
    if (process.env.NODE_ENV === "dev") {
        await sequelize.sync({ force: true, alter: true })
    } else if (process.env.NODE_ENV === "prod") {
        await sequelize.sync()
    }
}

db.connectDb = connectDb

// define models
db.Employee = require('./employee')(sequelize, DataTypes)
db.Ticket = require('./ticket')(sequelize, DataTypes)

// define model associations
db.Employee.hasMany(db.Ticket)
db.Ticket.belongsTo(db.Employee)

module.exports = db
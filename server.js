const app = require('./app')
const PORT = process.env.PORT || 3000

// import the db wrapper object
const db = require('./models')

// attempt the DB connection
db.connectDb()
    .then(() => {
        // only let the app listen if the database connection is successful
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })

        console.log(`Database connection succeeded :)`)
    })
    .catch((err) => {
        console.log(`Database connection failed :(`)
        console.log(err.message)
    })
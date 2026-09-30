const router = require('express').Router()
const { QueryTypes } = require('sequelize')
const db = require('../models')

// average ride price per city
router.get('/avePricePerCity', async (req, res) => {
    try {
        // execute the SQL command
        const results = await db.sequelize
            .query('select city, CAST(AVG(price) AS DECIMAL(5, 2)) as averagePrice from Rides group by city order by averagePrice desc;', { type: QueryTypes.SELECT })

        // log the results
        // console.log(results)

        // return the results in the response object
        res.json({ status: "Success", data: results })
        return

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ status: "error", message: "Server error" })
        return
    }
})

// average ride time per city
router.get('/aveRideTimePerCity', async (req, res) => {
    try {
        // execute the SQL command
        const results = await db.sequelize
            .query('select city, CAST(AVG(DATEDIFF(second, startTime, endTime))/60.0 AS DECIMAL(5,0)) as averageRideTime from Rides group by city order by averageRideTime desc;', { type: QueryTypes.SELECT })

        // log the results
        // console.log(results)

        // return the results in the response object
        res.json({ status: "Success", data: results })
        return

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ status: "error", message: "Server error" })
        return
    }
})

// total rides per city
router.get('/totalRidesPerCity', async (req, res) => {
    try {
        // execute the SQL command
        const results = await db.sequelize
            .query('select city, COUNT(rideId) as countRides from Rides group by city order by countRides desc, city asc;', { type: QueryTypes.SELECT })

        // log the results
        // console.log(results)

        // return the results in the response object
        res.json({ status: "Success", data: results })
        return

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ status: "error", message: "Server error" })
        return
    }
})

module.exports = router
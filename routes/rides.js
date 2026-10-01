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

// start a new ride
// get CustomerId and DriverId from req.body
// get the city from req.body 
router.post('/start', async (req, res) => {
    try {
        // if city, DriverId, or CustomerId was missing, throw 400 error
        if (!req.body.city) {
            res.status(400).json({ status: "Error", message: "'city' is required." })
            return
        }
        if (!req.body.DriverId) {
            res.status(400).json({ status: "Error", message: "'DriverId' is required." })
            return
        }
        if (!req.body.CustomerId) {
            res.status(400).json({ status: "Error", message: "'CustomerId' is required." })
            return
        }

        // attempt adding the new ride to the DB
        const result = await db.Ride.create(req.body)

        console.log(result) // should be the newly created object, with an id, startTime, and rideState

        // we have success
        res.status(201).json({ status: "Success", data: result, message: "New ride added successfully!" })
        return

    } catch (err) {
        // server error
        res.status(500).json({ status: "Error", message: "Server error" })
        return

    } finally {
        // this will always run, whether or not an error was caught
    }
})

// end a ride IN_PROGRESS
router.put('/end/:rideId', async (req, res) => {
    try {
        // check for missing req.body values (400)
        if (!req.body.price) {
            res.status(400).json({ status: "Error", message: "'price' is required." })
            return
        }
        if (!req.body.distance) {
            res.status(400).json({ status: "Error", message: "'distance' is required." })
            return
        }

        // attempt updating the ride record
        const result = await db.Ride.update({
            endTime: new Date(),
            price: req.body.price,
            distance: req.body.distance,
            rideState: 'COMPLETED'
        },
            {
                where: {
                    rideId: req.params.rideId
                }
            })

        console.log(result)

        // catch 404 error
        if (!result) {
            res.status(404).json({ status: "Error", message: `Ride with ID ${req.params.rideId} not found.` })
            return
        }

        // success
        res.status(204).json()
        return

    } catch (err) {
        // server error
        res.status(500).json({ status: "Error", message: "Server error" })
        return
    }
})

// cancel a ride IN_PROGRESS
router.put('/cancel/:rideId', async (req, res) => {
    // invalidate request if time is less than one minute
    try {
        // check the ride is in IN_PROGRESS state (400)
        // find the ride with rideId
        const currentRide = await db.Ride.findByPk(req.params.rideId)

        // check for 404
        if (!currentRide) {
            res.status(404).json({ status: "Error", message: `Ride with ID ${req.params.rideId} not found.` })
            return
        }
        
        // we have found the ride, check it's rideState
        if (currentRide.rideState !== "IN_PROGRESS") {
            res.status(400).json({ status: "Error", message: `The ride needs to be in progress to cancel.` })
            return
        }

        const diffMinutes = (new Date() - new Date(currentRide.startTime)) / 60000

        console.log(diffMinutes)

        // check time constraint for canceling a ride
        // currentRide must be over 1 minute long to cancel
        if (diffMinutes < 1) {
            // if (the time now - the ride start time, divided by 60000 to convert from ms to minutes, is less than 1)
            res.status(400).json({ status: "Error", message: `The ride needs to be at least one minute long to cancel.\nTry again later.` })
            return
        }

        // attempt updating the ride record
        const result = await db.Ride.update({
            endTime: new Date(),
            price: 0.0,
            distance: 0.0,
            rideState: 'CANCELED'
        },
        {
            where: {
                rideId: req.params.rideId
            }
        })

        // catch 404 error
        if (!result) {
            res.status(404).json({ status: "Error", message: `Ride with ID ${req.params.rideId} not found.` })
            return
        }

        // success
        res.status(204).json()
        return

    } catch (err) {
        // server error
        res.status(500).json({ status: "Error", message: "Server error" })
        return
    }
})

module.exports = router
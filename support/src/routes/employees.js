const router = require('express').Router()

// get all employees
router.get('/', async (req, res) => {
    res.json([
        { id: 1, fullname: "Warren West" },
        { id: 2, fullname: "George Clooney" },
        { id: 3, fullname: "Brad Pitt" },
        { id: 4, fullname: "Bruce Willis" },
    ])
})

module.exports = router
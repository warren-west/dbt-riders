const router = require('express').Router()

// get all tickets
router.get('/', async (req, res) => {
    res.json([
        { id: 1, CustomerId: 1, EmployeeId: 1, title: "Home Screen Bug", description: "The home screen is empty when my GPS is switched off.", openTime: new Date('2026-05-10T10:00:00'), closeTime: new Date('2026-05-21T16:00:00'), isSolved: true },
        { id: 2, CustomerId: 2, EmployeeId: 2, title: "Travel Screen Bug", description: "The travel screen is empty when my GPS is switched off.", openTime: new Date('2026-06-06T10:00:00'), closeTime: null, isSolved: false },
        { id: 3, CustomerId: 3, EmployeeId: 3, title: "Cancel Button Bug", description: "The cancel button doesn't work when my GPS is switched off.", openTime: new Date('2026-06-12T10:00:00'), closeTime: null, isSolved: false },
    ])
})

module.exports = router
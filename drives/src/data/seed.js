const DRIVERS = [
    {
        "fullname": "Nora Johansen",
        "licenseCode": "C"
    },
    {
        "fullname": "Thea Haugen",
        "licenseCode": "BA"
    },
    {
        "fullname": "Erik Martinsen",
        "licenseCode": "B"
    },
    {
        "fullname": "Frida Gundersen",
        "licenseCode": "B"
    },
    {
        "fullname": "Ingrid Pedersen",
        "licenseCode": "BA"
    },
    {
        "fullname": "Anders Eide",
        "licenseCode": "E"
    },
    {
        "fullname": "Ingrid Paulsen",
        "licenseCode": "BA"
    },
    {
        "fullname": "Nikolai Moen",
        "licenseCode": "BA"
    },
    {
        "fullname": "Martin Kristoffersen",
        "licenseCode": "C"
    },
    {
        "fullname": "Lars Johnsen",
        "licenseCode": "D"
    }
]

const CUSTOMERS = [
    {
        "fullname": "Julie Andreassen"
    },
    {
        "fullname": "Emilie Berg"
    },
    {
        "fullname": "Julie Nilsen"
    },
    {
        "fullname": "Astrid Sorensen"
    },
    {
        "fullname": "Erik Henriksen"
    },
    {
        "fullname": "Andreas Mathisen"
    },
    {
        "fullname": "Mats Olsen"
    },
    {
        "fullname": "Ida Martinsen"
    },
    {
        "fullname": "Nora Sorensen"
    },
    {
        "fullname": "Astrid Paulsen"
    },
    {
        "fullname": "Sondre Lie"
    },
    {
        "fullname": "Camilla Bakken"
    },
    {
        "fullname": "Kristian Andersen"
    },
    {
        "fullname": "Magnus Haugen"
    },
    {
        "fullname": "Sondre Pedersen"
    },
    {
        "fullname": "Anders Nilsen"
    },
    {
        "fullname": "Fredrik Andreassen"
    },
    {
        "fullname": "Ida Lund"
    },
    {
        "fullname": "Oskar Lund"
    },
    {
        "fullname": "Andreas Berg"
    },
    {
        "fullname": "Live Andersen"
    },
    {
        "fullname": "Stian Johnsen"
    },
    {
        "fullname": "Nikolai Hagen"
    },
    {
        "fullname": "Oskar Strand"
    },
    {
        "fullname": "Amalie Haugen"
    },
    {
        "fullname": "Tobias Larsen"
    },
    {
        "fullname": "Anders Olsen"
    },
    {
        "fullname": "Tobias Jakobsen"
    },
    {
        "fullname": "Maja Bakken"
    },
    {
        "fullname": "Tobias Berg"
    },
    {
        "fullname": "Linnea Jakobsen"
    },
    {
        "fullname": "Ida Karlsen"
    },
    {
        "fullname": "Mats Jensen"
    },
    {
        "fullname": "Thea Paulsen"
    },
    {
        "fullname": "Nikolai Johannessen"
    },
    {
        "fullname": "Frida Jakobsen"
    },
    {
        "fullname": "Camilla Haugen"
    },
    {
        "fullname": "Jonas Eide"
    },
    {
        "fullname": "Linnea Pedersen"
    },
    {
        "fullname": "Sofie Kristiansen"
    }
]

const RIDES = [
    { DriverId: 7, CustomerId: 25, city: 'Bodo', startTime: new Date('2026-07-15T19:29:00Z'), endTime: new Date('2026-07-15T20:59:00Z'), distance: 35.96, price: 821.45, rideState: 'COMPLETED' },
    { DriverId: 1, CustomerId: 8, city: 'Alesund', startTime: new Date('2026-08-18T09:52:00Z'), endTime: new Date('2026-08-18T10:23:00Z'), distance: 8.29, price: 250.88, rideState: 'IN_PROGRESS' },
    { DriverId: 2, CustomerId: 19, city: 'Drammen', startTime: new Date('2026-09-09T05:01:00Z'), endTime: new Date('2026-09-09T05:04:00Z'), distance: 0.00, price: 0.00, rideState: 'CANCELED' },
    { DriverId: 3, CustomerId: 33, city: 'Bergen', startTime: new Date('2026-07-01T13:05:00Z'), endTime: new Date('2026-07-01T14:48:00Z'), distance: 42.99, price: 1083.30, rideState: 'COMPLETED' },
    { DriverId: 3, CustomerId: 24, city: 'Trondheim', startTime: new Date('2026-07-28T09:57:00Z'), endTime: new Date('2026-07-28T11:05:00Z'), distance: 25.41, price: 600.29, rideState: 'IN_PROGRESS' },
    { DriverId: 8, CustomerId: 2, city: 'Bergen', startTime: new Date('2026-09-10T02:56:00Z'), endTime: new Date('2026-09-10T04:32:00Z'), distance: 41.63, price: 942.25, rideState: 'COMPLETED' },
    { DriverId: 4, CustomerId: 37, city: 'Bergen', startTime: new Date('2026-09-19T05:35:00Z'), endTime: new Date('2026-09-19T06:49:00Z'), distance: 29.57, price: 612.25, rideState: 'IN_PROGRESS' },
    { DriverId: 3, CustomerId: 31, city: 'Alesund', startTime: new Date('2026-08-14T11:39:00Z'), endTime: new Date('2026-08-14T13:13:00Z'), distance: 37.00, price: 887.35, rideState: 'COMPLETED' },
    { DriverId: 9, CustomerId: 13, city: 'Kristiansand', startTime: new Date('2026-08-18T06:43:00Z'), endTime: new Date('2026-08-18T08:20:00Z'), distance: 39.45, price: 996.96, rideState: 'COMPLETED' },
    { DriverId: 8, CustomerId: 8, city: 'Stavanger', startTime: new Date('2026-08-31T09:19:00Z'), endTime: new Date('2026-08-31T10:36:00Z'), distance: 29.77, price: 753.56, rideState: 'COMPLETED' },
    { DriverId: 4, CustomerId: 1, city: 'Bergen', startTime: new Date('2026-08-01T00:33:00Z'), endTime: new Date('2026-08-01T00:51:00Z'), distance: 2.41, price: 104.85, rideState: 'COMPLETED' },
    { DriverId: 2, CustomerId: 3, city: 'Tromso', startTime: new Date('2026-07-06T14:36:00Z'), endTime: new Date('2026-07-06T14:38:00Z'), distance: 0.00, price: 0.00, rideState: 'CANCELED' },
    { DriverId: 3, CustomerId: 37, city: 'Bodo', startTime: new Date('2026-07-22T21:55:00Z'), endTime: new Date('2026-07-22T22:36:00Z'), distance: 13.61, price: 311.78, rideState: 'COMPLETED' },
    { DriverId: 2, CustomerId: 28, city: 'Tromso', startTime: new Date('2026-09-10T16:01:00Z'), endTime: new Date('2026-09-10T17:00:00Z'), distance: 22.07, price: 464.61, rideState: 'COMPLETED' },
    { DriverId: 2, CustomerId: 4, city: 'Drammen', startTime: new Date('2026-08-12T18:13:00Z'), endTime: new Date('2026-08-12T19:43:00Z'), distance: 39.08, price: 908.57, rideState: 'COMPLETED' },
    { DriverId: 4, CustomerId: 13, city: 'Stavanger', startTime: new Date('2026-09-12T02:55:00Z'), endTime: new Date('2026-09-12T02:56:00Z'), distance: 0.00, price: 0.00, rideState: 'CANCELED' },
    { DriverId: 2, CustomerId: 29, city: 'Alesund', startTime: new Date('2026-07-14T00:13:00Z'), endTime: new Date('2026-07-14T01:05:00Z'), distance: 19.85, price: 461.73, rideState: 'COMPLETED' },
    { DriverId: 4, CustomerId: 11, city: 'Drammen', startTime: new Date('2026-08-29T14:37:00Z'), endTime: new Date('2026-08-29T16:20:00Z'), distance: 44.97, price: 1129.52, rideState: 'COMPLETED' },
    { DriverId: 1, CustomerId: 25, city: 'Kristiansand', startTime: new Date('2026-07-20T16:56:00Z'), endTime: new Date('2026-07-20T18:27:00Z'), distance: 39.11, price: 769.94, rideState: 'COMPLETED' },
    { DriverId: 9, CustomerId: 32, city: 'Trondheim', startTime: new Date('2026-09-10T17:08:00Z'), endTime: new Date('2026-09-10T17:50:00Z'), distance: 14.20, price: 370.64, rideState: 'IN_PROGRESS' },
    { DriverId: 1, CustomerId: 21, city: 'Oslo', startTime: new Date('2026-07-21T01:34:00Z'), endTime: new Date('2026-07-21T03:24:00Z'), distance: 43.64, price: 1026.63, rideState: 'COMPLETED' },
    { DriverId: 9, CustomerId: 6, city: 'Trondheim', startTime: new Date('2026-08-13T15:33:00Z'), endTime: new Date('2026-08-13T16:37:00Z'), distance: 23.37, price: 483.04, rideState: 'COMPLETED' },
    { DriverId: 10, CustomerId: 16, city: 'Bodo', startTime: new Date('2026-07-07T10:27:00Z'), endTime: new Date('2026-07-07T11:42:00Z'), distance: 30.87, price: 672.04, rideState: 'COMPLETED' },
    { DriverId: 9, CustomerId: 21, city: 'Kristiansand', startTime: new Date('2026-08-26T15:03:00Z'), endTime: new Date('2026-08-26T15:29:00Z'), distance: 5.07, price: 166.90, rideState: 'COMPLETED' },
    { DriverId: 5, CustomerId: 30, city: 'Tromso', startTime: new Date('2026-09-04T10:32:00Z'), endTime: new Date('2026-09-04T11:14:00Z'), distance: 15.17, price: 359.92, rideState: 'COMPLETED' },
    { DriverId: 10, CustomerId: 7, city: 'Bergen', startTime: new Date('2026-09-24T10:08:00Z'), endTime: new Date('2026-09-24T10:26:00Z'), distance: 3.10, price: 126.18, rideState: 'IN_PROGRESS' },
    { DriverId: 4, CustomerId: 24, city: 'Kristiansand', startTime: new Date('2026-08-16T07:07:00Z'), endTime: new Date('2026-08-16T07:45:00Z'), distance: 13.04, price: 362.09, rideState: 'COMPLETED' },
    { DriverId: 9, CustomerId: 1, city: 'Alesund', startTime: new Date('2026-09-15T03:20:00Z'), endTime: new Date('2026-09-15T04:24:00Z'), distance: 25.13, price: 594.81, rideState: 'COMPLETED' },
    { DriverId: 2, CustomerId: 36, city: 'Trondheim', startTime: new Date('2026-08-30T15:11:00Z'), endTime: new Date('2026-08-30T15:31:00Z'), distance: 6.01, price: 173.30, rideState: 'COMPLETED' },
    { DriverId: 5, CustomerId: 33, city: 'Fredrikstad', startTime: new Date('2026-08-25T07:16:00Z'), endTime: new Date('2026-08-25T07:49:00Z'), distance: 10.66, price: 256.41, rideState: 'COMPLETED' },
    { DriverId: 5, CustomerId: 3, city: 'Oslo', startTime: new Date('2026-09-21T21:54:00Z'), endTime: new Date('2026-09-21T23:24:00Z'), distance: 38.31, price: 881.37, rideState: 'COMPLETED' },
    { DriverId: 8, CustomerId: 36, city: 'Drammen', startTime: new Date('2026-07-13T03:46:00Z'), endTime: new Date('2026-07-13T04:59:00Z'), distance: 29.21, price: 589.61, rideState: 'COMPLETED' },
    { DriverId: 6, CustomerId: 38, city: 'Alesund', startTime: new Date('2026-07-11T10:23:00Z'), endTime: new Date('2026-07-11T10:40:00Z'), distance: 4.77, price: 159.31, rideState: 'COMPLETED' },
    { DriverId: 1, CustomerId: 23, city: 'Stavanger', startTime: new Date('2026-07-12T20:24:00Z'), endTime: new Date('2026-07-12T20:41:00Z'), distance: 3.32, price: 137.33, rideState: 'COMPLETED' },
    { DriverId: 7, CustomerId: 40, city: 'Trondheim', startTime: new Date('2026-08-30T22:56:00Z'), endTime: new Date('2026-08-30T23:22:00Z'), distance: 5.97, price: 198.44, rideState: 'COMPLETED' },
    { DriverId: 1, CustomerId: 12, city: 'Tromso', startTime: new Date('2026-07-22T19:09:00Z'), endTime: new Date('2026-07-22T20:13:00Z'), distance: 26.07, price: 664.04, rideState: 'IN_PROGRESS' },
    { DriverId: 5, CustomerId: 11, city: 'Bergen', startTime: new Date('2026-08-07T17:24:00Z'), endTime: new Date('2026-08-07T17:26:00Z'), distance: 0.00, price: 0.00, rideState: 'CANCELED' },
    { DriverId: 8, CustomerId: 23, city: 'Kristiansand', startTime: new Date('2026-07-04T18:35:00Z'), endTime: new Date('2026-07-04T20:08:00Z'), distance: 38.85, price: 774.72, rideState: 'COMPLETED' },
    { DriverId: 4, CustomerId: 2, city: 'Stavanger', startTime: new Date('2026-09-18T13:26:00Z'), endTime: new Date('2026-09-18T13:28:00Z'), distance: 0.00, price: 0.00, rideState: 'CANCELED' },
    { DriverId: 9, CustomerId: 26, city: 'Alesund', startTime: new Date('2026-07-26T14:37:00Z'), endTime: new Date('2026-07-26T16:12:00Z'), distance: 39.10, price: 820.81, rideState: 'COMPLETED' },
    { DriverId: 5, CustomerId: 3, city: 'Bergen', startTime: new Date('2026-07-03T18:17:00Z'), endTime: new Date('2026-07-03T18:40:00Z'), distance: 6.52, price: 178.99, rideState: 'COMPLETED' },
    { DriverId: 9, CustomerId: 8, city: 'Drammen', startTime: new Date('2026-08-01T17:09:00Z'), endTime: new Date('2026-08-01T18:32:00Z'), distance: 33.19, price: 725.62, rideState: 'COMPLETED' },
    { DriverId: 9, CustomerId: 13, city: 'Tromso', startTime: new Date('2026-07-18T13:14:00Z'), endTime: new Date('2026-07-18T13:43:00Z'), distance: 8.39, price: 202.73, rideState: 'IN_PROGRESS' },
    { DriverId: 2, CustomerId: 20, city: 'Alesund', startTime: new Date('2026-09-25T14:50:00Z'), endTime: new Date('2026-09-25T16:06:00Z'), distance: 30.39, price: 709.19, rideState: 'COMPLETED' },
    { DriverId: 4, CustomerId: 27, city: 'Drammen', startTime: new Date('2026-08-07T10:08:00Z'), endTime: new Date('2026-08-07T10:51:00Z'), distance: 15.69, price: 387.62, rideState: 'COMPLETED' },
    { DriverId: 9, CustomerId: 1, city: 'Kristiansand', startTime: new Date('2026-09-21T10:12:00Z'), endTime: new Date('2026-09-21T10:45:00Z'), distance: 9.07, price: 233.30, rideState: 'COMPLETED' },
    { DriverId: 8, CustomerId: 29, city: 'Fredrikstad', startTime: new Date('2026-08-09T09:06:00Z'), endTime: new Date('2026-08-09T10:38:00Z'), distance: 35.68, price: 830.08, rideState: 'COMPLETED' },
    { DriverId: 5, CustomerId: 33, city: 'Bodo', startTime: new Date('2026-08-16T18:40:00Z'), endTime: new Date('2026-08-16T19:35:00Z'), distance: 22.08, price: 537.19, rideState: 'COMPLETED' },
    { DriverId: 4, CustomerId: 13, city: 'Trondheim', startTime: new Date('2026-09-13T17:52:00Z'), endTime: new Date('2026-09-13T19:34:00Z'), distance: 42.91, price: 991.56, rideState: 'COMPLETED' },
    { DriverId: 2, CustomerId: 30, city: 'Drammen', startTime: new Date('2026-07-23T12:52:00Z'), endTime: new Date('2026-07-23T14:43:00Z'), distance: 44.30, price: 1076.60, rideState: 'COMPLETED' },
]

module.exports = {
    DRIVERS,
    CUSTOMERS,
    RIDES,
}
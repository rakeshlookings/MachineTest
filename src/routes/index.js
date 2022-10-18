const express = require('express')
const router = express.Router()
const ledgerRouter = require('./ledger')
router.use('/ledger', ledgerRouter)

module.exports = router
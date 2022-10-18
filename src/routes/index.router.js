const express = require('express')
const router = express.Router()
const LedgerRouter = require('./Ledger.routes')

router.use('/ledger', LedgerRouter)

module.exports = router
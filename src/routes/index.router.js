const express = require('express')
const router = express.Router()
const LedgerRouter = require('./Ledger.routes')
router.get('/',(req,res)=> { res.send('ok')})
router.use('/ledger', LedgerRouter)

module.exports = router
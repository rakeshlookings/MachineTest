const express = require('express')
const router = express.Router()
const LedgerRouter = require('./ledger.routes')
router.use('/ledger', LedgerRouter)
router.get('/sample', (req,res)=> {
    res.send('ok router')
})
module.exports = router
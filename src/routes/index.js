const express = require('express')
const router = express.Router()
const ledgerRouter = require('./ledger.routes')
router.use('/ledger', ledgerRouter)
router.get('/sample', (req,res)=> {
    res.send('ok router')
})
module.exports = router
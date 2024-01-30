const express   = require('express');
const router    = express.Router();

const stockCtrl = require('../controllers/stockCtrl');
router.get('/stock/list', stockCtrl.getStockList);

module.exports  = router;
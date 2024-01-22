const express   = require('express');
const router    = express.Router();

const jwtCtrl = require('../controllers/jwtController');
router.get('/gettoken', jwtCtrl.getToken);

module.exports = router;
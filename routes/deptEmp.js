const express   = require('express');
const router    = express.Router();

const deptEmpCtrl = require('../controllers/deptEmp');
router.get('/employee/departtment/add', deptEmpCtrl.addDeptEmp);
router.get('/employee/departtment/list', deptEmpCtrl.getEmployeeDept);

module.exports = router;
const express   = require('express');
const router    = express.Router();

const deptEmpCtrl = require('../controllers/deptEmp');
router.get('/departtment/employee/add', deptEmpCtrl.addDepartmentEmployee);
router.get('/employee/departtment/list', deptEmpCtrl.getEmployeeDept);

module.exports = router;
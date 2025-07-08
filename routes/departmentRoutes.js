const express = require('express');
const router = express.Router();
const { createDepartment } = require('../controllers/departmentController');

// POST /api/departments
router.post('/departments', createDepartment);

module.exports = router;

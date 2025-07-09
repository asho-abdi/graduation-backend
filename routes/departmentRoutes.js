const express = require('express');
const router = express.Router();
const { createDepartment } = require('../controllers/departmentController');

// POST /api/departments
router.post('/', createDepartment);

module.exports = router;

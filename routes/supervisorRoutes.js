const express = require('express');
const {
  getAssignedTitles,
  getDepartmentStudents,
  evaluateTitle,
} = require('../controllers/supervisorController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require supervisor role
router.get('/titles', protect(['supervisor']), getAssignedTitles);
router.get('/students', protect(['supervisor']), getDepartmentStudents);
router.post('/evaluate/:titleId', protect(['supervisor']), evaluateTitle);

module.exports = router;

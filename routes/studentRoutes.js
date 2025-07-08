// backend/routes/studentRoutes.js
const express = require('express');
const {
  getStudentProfile,
  submitTitles,
  getMyTitles,
  createGroup,
  updateGroup,
  deleteGroup
} = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All student routes are protected
router.get('/profile',           protect(['student']), getStudentProfile);
router.post('/submit-title',     protect(['student']), submitTitles);
router.get('/my-titles',         protect(['student']), getMyTitles);
router.post('/create-group',     protect(['student']), createGroup);
router.put('/update-group/:id',  protect(['student']), updateGroup);
router.delete('/delete-group/:id', protect(['student']), deleteGroup);

module.exports = router;

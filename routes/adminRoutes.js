 const express = require('express');
 const {
   getAllTitles,
   updateTitleStatus,
   assignSupervisor,
   getAllStudents,
   getAllSupervisors,
   deleteUser,
   updateUser,
   getAllAdmins,
   getAllGroups,
 updateGroup,         // ← import this
  deleteGroup,      // ← optional if you want delete via admin
 } = require('../controllers/adminController');
 const { protect } = require('../middleware/authMiddleware');

 const router = express.Router();

 // All routes protected for 'admin' role
 router.get('/titles', protect(['admin']), getAllTitles);
 router.put('/titles/:titleId/status', protect(['admin']), updateTitleStatus);
 router.put('/titles/:titleId/assign', protect(['admin']), assignSupervisor);
 router.get('/students', protect(['admin']), getAllStudents);
 router.get('/supervisors', protect(['admin']), getAllSupervisors);
 router.delete('/delete-user/:id', protect(['admin']), deleteUser);
 router.put('/update-user/:id', protect(['admin']), updateUser);
 router.get('/admins', protect(['admin']), getAllAdmins);
 router.get('/groups', protect(['admin']), getAllGroups);

 // Edit a group’s name & members
 router.put(
   '/groups/:id',
   protect(['admin']),
   updateGroup
 );

 // DELETE /api/admin/groups/:id
router.delete(
  '/groups/:id',
  protect(['admin']),
  deleteGroup    // <-- import this from adminController
);


 // (Optional) delete a group
 // router.delete('/groups/:id', protect(['admin']), deleteGroup);

 module.exports = router;

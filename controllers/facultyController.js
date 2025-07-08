// const Faculty = require('../models/Faculty');
// const Department = require('../models/Department');
// const Supervisor = require('../models/Supervisor');

// // ✅ Add new faculty with departments and supervisors
// const createFaculty = async (req, res) => {
//   const { name, departmentIds, supervisorIds } = req.body;

//   try {
//     const newFaculty = new Faculty({
//       name,
//       departments: departmentIds,     // array of ObjectIds
//       supervisors: supervisorIds      // array of ObjectIds
//     });

//     await newFaculty.save();
//     res.status(201).json({ message: 'Faculty created', faculty: newFaculty });
//   } catch (err) {
//     console.error('Create Faculty error:', err.message);
//     res.status(500).json({ message: 'Error creating faculty' });
//   }
// };

// // ✅ Get all faculties with populated data
// const getFaculties = async (req, res) => {
//   try {
//     const faculties = await Faculty.find()
//       .populate('departments')
//       .populate('supervisors');
//     res.json(faculties);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to load faculties' });
//   }
// };

// module.exports = { createFaculty, getFaculties };

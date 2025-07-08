const Department = require('../models/Department');
const Faculty = require('../models/Faculty');

const createDepartment = async (req, res) => {
  const { name, facultyId } = req.body;

  try {
    const department = await Department.create({ name, faculty: facultyId });

    await Faculty.findByIdAndUpdate(facultyId, {
      $push: { departments: department._id },
    });

    res.status(201).json({ message: 'Department created', department });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create department', error: error.message });
  }
};

module.exports = { createDepartment };

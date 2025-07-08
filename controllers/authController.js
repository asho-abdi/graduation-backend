const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Supervisor = require('../models/Supervisor');
const Admin = require('../models/Admin');
const Faculty = require('../models/Faculty');
const Department = require('../models/Department');

// ✅ Generate JWT token
const generateToken = (user, role) => {
  return jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// ✅ Register User (with support for student, supervisor, admin)
const registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    group,
    facultyName,
    departmentName
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    let user;

    if (role === 'admin') {
      // Admin doesn’t need faculty/department
      user = new Admin({ name, email, password: hashedPassword });
    } else {
      // 🔍 Create or find Faculty
      let faculty = await Faculty.findOne({ name: facultyName });
      if (!faculty) {
        faculty = new Faculty({ name: facultyName, departments: [] });
        await faculty.save();
      }

      // 🔍 Create or find Department
      let department = await Department.findOne({ name: departmentName, faculty: faculty._id });
      if (!department) {
        department = new Department({ name: departmentName, faculty: faculty._id });
        await department.save();

        // Push department to faculty's list
        faculty.departments.push(department._id);
        await faculty.save();
      }

      // ✅ Create Student or Supervisor
      if (role === 'student') {
        user = new Student({
          name,
          email,
          password: hashedPassword,
          group,
          faculty: faculty._id,
          department: department._id,
        });
      } else if (role === 'supervisor') {
        user = new Supervisor({
          name,
          email,
          password: hashedPassword,
          faculty: faculty._id,
          department: department._id,
        });
      } else {
        return res.status(400).json({ message: 'Invalid role provided.' });
      }
    }

    await user.save();
    const token = generateToken(user, role);

    const responseData = { token, role };
    if (role === 'student') responseData.group = user.group;

    res.status(201).json(responseData);
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// ✅ Login User (unchanged)
const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;
    if (role === 'student') {
      user = await Student.findOne({ email });
    } else if (role === 'supervisor') {
      user = await Supervisor.findOne({ email });
    } else if (role === 'admin') {
      user = await Admin.findOne({ email });
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user, role);

    const responseData = { token, role };
    if (role === 'student') responseData.group = user.group;

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};

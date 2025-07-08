// controllers/adminController.js

const TitleSubmission = require('../models/TitleSubmission');
const Supervisor = require('../models/Supervisor');
const Student    = require('../models/Student');
const Admin      = require('../models/Admin');
const Group      = require('../models/Group');

// ─── View all titles ─────────────────────────────────────────────
const getAllTitles = async (req, res) => {
  try {
    const titles = await TitleSubmission.find()
      .populate('student', 'name')
      .populate('supervisor', 'name');
    res.json(titles);
  } catch (error) {
    console.error('getAllTitles error:', error);
    res.status(500).json({ message: 'Failed to load titles' });
  }
};

// ─── Approve/Reject a title ──────────────────────────────────────
const updateTitleStatus = async (req, res) => {
  const { titleId } = req.params;
  const { status }  = req.body;
  try {
    const title = await TitleSubmission.findById(titleId);
    if (!title) return res.status(404).json({ message: 'Title not found' });

    title.status = status;
    await title.save();
    res.json({ message: `Title ${status}` });
  } catch (error) {
    console.error('updateTitleStatus error:', error);
    res.status(500).json({ message: 'Status update failed' });
  }
};

// ─── Assign a supervisor ────────────────────────────────────────
const assignSupervisor = async (req, res) => {
  const { titleId }     = req.params;
  const { supervisorId } = req.body;
  try {
    const title = await TitleSubmission.findById(titleId);
    const sup   = await Supervisor.findById(supervisorId);
    if (!title || !sup) return res.status(404).json({ message: 'Title or Supervisor not found' });

    title.supervisor = sup._id;
    await title.save();
    sup.assignedTitles.push(title._id);
    await sup.save();

    res.json({ message: 'Supervisor assigned successfully' });
  } catch (error) {
    console.error('assignSupervisor error:', error);
    res.status(500).json({ message: 'Failed to assign supervisor' });
  }
};

// ─── View all students ───────────────────────────────────────────
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate('faculty', 'name')
      .populate('department', 'name');
    res.json(students);
  } catch (error) {
    console.error('getAllStudents error:', error);
    res.status(500).json({ message: 'Failed to load students' });
  }
};

// ─── View all supervisors ────────────────────────────────────────
const getAllSupervisors = async (req, res) => {
  try {
    const supervisors = await Supervisor.find()
      .populate('faculty', 'name')
      .populate('department', 'name');
    res.json(supervisors);
  } catch (error) {
    console.error('getAllSupervisors error:', error);
    res.status(500).json({ message: 'Failed to load supervisors' });
  }
};

// ─── View all admins ─────────────────────────────────────────────
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    console.error('getAllAdmins error:', error);
    res.status(500).json({ message: 'Failed to load admins' });
  }
};

// ─── View all groups ─────────────────────────────────────────────
const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate('createdBy', 'name email');
    res.json(groups);
  } catch (error) {
    console.error('getAllGroups error:', error);
    res.status(500).json({ message: 'Failed to load groups' });
  }
};

// ─── Update a group ─────────────────────────────────────────────
const updateGroup = async (req, res) => {
  const { id }           = req.params;
  const { groupName, members } = req.body;
  try {
    const group = await Group.findById(id);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    group.groupName = groupName;
    group.members   = members;
    await group.save();

    res.json({ message: 'Group updated successfully', data: group });
  } catch (error) {
    console.error('updateGroup error:', error);
    res.status(500).json({ message: 'Failed to update group', error: error.message });
  }
};

const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findByIdAndDelete(id);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    res.json({ message: 'Group deleted successfully' });
  } catch (err) {
    console.error('deleteGroup error:', err);
    res.status(500).json({ message: 'Failed to delete group' });
  }
};

// ─── Delete a user ──────────────────────────────────────────────
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const student    = await Student.findByIdAndDelete(id);
    const supervisor = await Supervisor.findByIdAndDelete(id);
    const admin      = await Admin.findByIdAndDelete(id);
    if (!student && !supervisor && !admin) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('deleteUser error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ─── Update a user ──────────────────────────────────────────────
const updateUser = async (req, res) => {
  const { id }            = req.params;
  const { name, email, department } = req.body;
  try {
    const user =
      (await Student.findById(id)) ||
      (await Supervisor.findById(id)) ||
      (await Admin.findById(id));
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name)       user.name       = name;
    if (email)      user.email      = email;
    if (user.department !== undefined && department) {
      user.department = department;
    }

    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('updateUser error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllTitles,
  updateTitleStatus,
  assignSupervisor,
  getAllStudents,
  getAllSupervisors,
  getAllAdmins,
  getAllGroups,
  updateGroup,
  deleteUser,
  updateUser,
  deleteGroup,

};

const Student = require('../models/Student');
const TitleSubmission = require('../models/TitleSubmission');
const Group = require('../models/Group');

// ✅ Get student profile with titles
const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).populate('titles');
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load student profile' });
  }
};

// ✅ Submit a new title (group included)
// controllers/studentController.js

const submitTitles = async (req, res) => {
  const { titles } = req.body;        // expect: { titles: ['t1', 't2', 't3'] }

  if (!Array.isArray(titles) || titles.length !== 3) {
    return res.status(400).json({ message: 'Please submit exactly 3 titles.' });
  }

  try {
    const student = await Student.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    // create all three submissions in parallel
    const submissions = await Promise.all(
      titles.map((titleText) => {
        const doc = new TitleSubmission({
          title: titleText,
          student: req.user.id,
          group: student.group || 'Group A',
        });
        return doc.save();
      })
    );

    // collect IDs and add to student.titles
    const newIds = submissions.map(sub => sub._id);
    student.titles.push(...newIds);
    await student.save();

    res.status(201).json({ submissions });
  } catch (error) {
    console.error('Error submitting titles:', error);
    res.status(500).json({ message: 'Title submission failed.' });
  }
};



// ✅ Get all titles by student
const getMyTitles = async (req, res) => {
  try {
    const titles = await TitleSubmission.find({ student: req.user.id }).populate('supervisor');
    res.json(titles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load titles' });
  }
};

// ✅ Create a new group
const createGroup = async (req, res) => {
  const { groupName, members } = req.body;

  try {
    const studentId = req.user.id;
    const existingGroup = await Group.findOne({ groupName });

    if (existingGroup) {
      return res.status(400).json({ message: 'Group name already exists' });
    }

    const group = new Group({
      groupName,
      members,
      createdBy: studentId,
    });

    await group.save();
    res.status(201).json({ message: 'Group submitted successfully', data: group });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create group', error: err.message });
  }
};

const updateGroup = async (req, res) => {
  const { id } = req.params;
  const { groupName, members } = req.body;

  try {
    const group = await Group.findById(id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    // Optional: ensure only creator can edit
    if (group.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this group' });
    }

    group.groupName = groupName;
    group.members = members;
    await group.save();

    res.json({ message: 'Group updated successfully', data: group });
  } catch (err) {
    res.status(400).json({ message: 'Failed to update group', error: err.message });
  }
};

const deleteGroup = async (req, res) => {
  const { id } = req.params;

  try {
    const group = await Group.findById(id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    // Optional: ensure only creator can delete
    if (group.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this group' });
    }

    await group.remove();
    res.json({ message: 'Group deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete group', error: err.message });
  }
};

module.exports = {
  getStudentProfile,
  submitTitles,
  getMyTitles,
  createGroup,
  updateGroup,
  deleteGroup
};

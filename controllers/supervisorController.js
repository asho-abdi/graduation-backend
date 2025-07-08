const Supervisor = require('../models/Supervisor');
const TitleSubmission = require('../models/TitleSubmission');
const Student = require('../models/Student');

// View supervisor's assigned titles
const getAssignedTitles = async (req, res) => {
  try {
    const titles = await TitleSubmission.find({ supervisor: req.user.id }).populate('student');
    res.json(titles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load titles' });
  }
};

// View students in supervisor's department
const getDepartmentStudents = async (req, res) => {
  try {
    const supervisor = await Supervisor.findById(req.user.id);
    const students = await Student.find({ department: supervisor.department });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load students' });
  }
};

// Evaluate a title with detailed marks
const evaluateTitle = async (req, res) => {
  const { titleId } = req.params;
  const {
    proposalPoints,
    thesisPoints,
    supervisorPoints,
    totalMarks,
    comment
  } = req.body;

  try {
    const title = await TitleSubmission.findById(titleId);

    if (!title || title.supervisor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update evaluation object
    title.evaluation = {
      proposalPoints,
      thesisPoints,
      supervisorPoints,
      totalMarks,
      comment,
      evaluatedBy: req.user.id,
      evaluatedAt: new Date()
    };

    await title.save();

    res.json({ message: 'Evaluation saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Evaluation failed' });
  }
};

module.exports = {
  getAssignedTitles,
  getDepartmentStudents,
  evaluateTitle,
};

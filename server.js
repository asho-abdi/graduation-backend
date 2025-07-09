require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();

// ✅ Enable CORS for frontend domain
app.use(cors({
  origin: process.env.CLIENT_URL, // ← comes from Render .env
  credentials: true,
}));

app.use(express.json());

// ✅ Mount Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/student', require('./routes/studentRoutes'));
app.use('/api/supervisor', require('./routes/supervisorRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/departments', require('./routes/departmentRoutes'));

// ✅ Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend running ✅' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

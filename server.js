const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// ✅ FIX: place CORS before JSON parser, and allow origin explicitly
app.use(cors({
  origin: 'https://graduation12.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Route imports
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const supervisorRoutes = require('./routes/supervisorRoutes');
const adminRoutes = require('./routes/adminRoutes');
const departmentRoutes = require('./routes/departmentRoutes');

// Route mounts
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/supervisor', supervisorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', departmentRoutes);

app.get('/', (req, res) => {
  res.send('Graduation Management System API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

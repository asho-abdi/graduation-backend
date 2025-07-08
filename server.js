// backend/app.js (or index.js)
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes       = require('./routes/authRoutes');
const studentRoutes    = require('./routes/studentRoutes');     // ← our file
const supervisorRoutes = require('./routes/supervisorRoutes');
const adminRoutes      = require('./routes/adminRoutes');
const departmentRoutes = require('./routes/departmentRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Mount routers
app.use('/api/auth',       authRoutes);
app.use('/api/student',    studentRoutes);    // ← here
app.use('/api/supervisor', supervisorRoutes);
app.use('/api/admin',      adminRoutes);
app.use('/api',            departmentRoutes);

app.get('/', (req, res) => {
  res.send('Graduation Management System API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

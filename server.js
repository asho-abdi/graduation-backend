require('dotenv').config();
const express = require('express');
const cors = require('cors');  // ✅ Declare once

const connectDB = require('./config/db');
connectDB();

const app = express();

// ✅ Confirm CLIENT_URL is loaded
console.log('CLIENT_URL =', process.env.CLIENT_URL);

// ✅ Log every incoming request origin
app.use((req, res, next) => {
  console.log('Incoming Origin:', req.headers.origin);
  next();
});

// ✅ Enable CORS for your frontend domain
app.use(cors({
  origin: 'https://graduation12.com', // your frontend domain
  credentials: true,
}));

// ✅ Parse JSON requests
app.use(express.json());

// ✅ Mount your routes
app.use('/api/auth',       require('./routes/authRoutes'));
app.use('/api/student',    require('./routes/studentRoutes'));
app.use('/api/supervisor', require('./routes/supervisorRoutes'));
app.use('/api/admin',      require('./routes/adminRoutes'));
app.use('/api/departments', require('./routes/departmentRoutes'));

// ✅ Root health check
app.get('/', (req, res) => {
  res.send('Graduation Management System API Running');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

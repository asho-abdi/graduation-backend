require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
connectDB();

const app = express();

// Confirm CLIENT_URL
console.log('CLIENT_URL =', process.env.CLIENT_URL);

// Log incoming origin
app.use((req, res, next) => {
  console.log('Incoming Origin:', req.headers.origin);
  next();
});

// CORS setup
app.use(cors({
  origin: 'https://graduation12.com',
  credentials: true
}));

// Handle preflight OPTIONS requests
app.options('*', cors({
  origin: 'https://graduation12.com',
  credentials: true
}));

// Parse JSON
app.use(express.json());

// Routes
app.use('/api/auth',       require('./routes/authRoutes'));
app.use('/api/student',    require('./routes/studentRoutes'));
app.use('/api/supervisor', require('./routes/supervisorRoutes'));
app.use('/api/admin',      require('./routes/adminRoutes'));
app.use('/api/departments', require('./routes/departmentRoutes'));

// Health checks
app.get('/', (req, res) => {
  res.send('Graduation Management System API Running');
});

app.get('/api', (req, res) => {
  res.send('Graduation Management System API Root');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
connectDB();

const app = express();

// ✅ CORS configuration
const allowedOrigins = ['https://graduation12.com'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Log origin for debugging
app.use((req, res, next) => {
  console.log('Incoming Origin:', req.headers.origin);
  next();
});

// ✅ Mount API routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/student', require('./routes/studentRoutes'));
app.use('/api/supervisor', require('./routes/supervisorRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/departments', require('./routes/departmentRoutes'));

// ✅ Health checks
app.get('/', (req, res) => {
  res.send('Graduation Management System API Running');
});

app.get('/api', (req, res) => {
  res.send('Graduation Management System API Root');
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

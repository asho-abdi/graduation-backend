const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// ————————————————————————————————
// CORS
// ————————————————————————————————

const corsOptions = {
  origin: process.env.CLIENT_URL,      // e.g. https://graduation12.com
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
};

// Log incoming origins (remove in production if you like)
app.use((req, res, next) => {
  console.log('Incoming Origin:', req.headers.origin);
  next();
});

// Enable CORS + preflight
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// JSON parser
app.use(express.json());

// ————————————————————————————————
// Routes
// ————————————————————————————————
const authRoutes       = require('./routes/authRoutes');
const studentRoutes    = require('./routes/studentRoutes');
const supervisorRoutes = require('./routes/supervisorRoutes');
const adminRoutes      = require('./routes/adminRoutes');
const departmentRoutes = require('./routes/departmentRoutes');

app.use('/api/auth',       authRoutes);
app.use('/api/student',    studentRoutes);
app.use('/api/supervisor', supervisorRoutes);
app.use('/api/admin',      adminRoutes);
app.use('/api',            departmentRoutes);

// Health-check
app.get('/', (req, res) => {
  res.send('Graduation Management System API Running');
});

// ————————————————————————————————
// Start server
// ————————————————————————————————
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

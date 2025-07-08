require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const connectDB = require('./config/db');

connectDB();
const app = express();

// 1️⃣ Check that CLIENT_URL is set
console.log('CLIENT_URL =', process.env.CLIENT_URL);

// 2️⃣ Log every incoming Origin
app.use((req, res, next) => {
  console.log('Incoming Origin:', req.headers.origin);
  next();
});

// 3️⃣ TEMP: Allow all origins (for testing only!)
app.use(cors({ origin: true, credentials: true }));
app.options('*', cors({ origin: true, credentials: true }));
console.log('🔥 CORS is now allowing all origins (temporary) 🔥');

app.use(express.json());

// ————————————————————————————————
// Your route mounts
// ————————————————————————————————
app.use('/api/auth',       require('./routes/authRoutes'));
app.use('/api/student',    require('./routes/studentRoutes'));
app.use('/api/supervisor', require('./routes/supervisorRoutes'));
app.use('/api/admin',      require('./routes/adminRoutes'));
app.use('/api',            require('./routes/departmentRoutes'));

app.get('/', (req, res) => {
  res.send('Graduation Management System API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

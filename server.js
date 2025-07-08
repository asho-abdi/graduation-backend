require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();

// Log what CLIENT_URL actually is, to verify env is loaded
console.log('CLIENT_URL=', process.env.CLIENT_URL);

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
};

app.use((req, res, next) => {
  console.log('Incoming Origin:', req.headers.origin);
  next();
});

// Replace your existing CORS setup with this:
app.use(cors({ origin: true, credentials: true }));
app.options('*', cors({ origin: true, credentials: true }));


app.use(express.json());

// your route mounts…
app.use('/api/auth', require('./routes/authRoutes'));
// etc…

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening on port ${process.env.PORT || 5000}`);
});

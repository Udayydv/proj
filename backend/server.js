const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const serverless = require('serverless-http'); // 🔥 important for Vercel

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder (for uploads)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/creator', require('./routes/creator'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/lessons', require('./routes/lessons'));
app.use('/api/enroll', require('./routes/enrollment'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/certificates', require('./routes/certificates'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB Error:', err));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running fine ✅' });
});

// 🧩 Export app for Vercel
module.exports = app;
module.exports.handler = serverless(app);

// 💻 For local dev only
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Local server running on port ${PORT}`));
}

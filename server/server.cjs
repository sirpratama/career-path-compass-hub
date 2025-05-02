const path = require('path'); // Import path module
require('dotenv').config({ path: path.resolve(__dirname, '.env') }); // Load .env variables first, specifying path
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.cjs'); // Updated require path

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---

// Enable CORS for all origins (adjust in production if needed)
// This is necessary because your frontend (localhost:8083) and backend (localhost:3000) are on different ports.
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// --- Routes ---

// Mount the authentication routes under the /api/auth path
app.use('/api/auth', authRoutes);

// Basic root route (optional)
app.get('/api', (req, res) => {
  res.send('Career Path Compass Backend is running!');
});

// --- Server Startup ---
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 
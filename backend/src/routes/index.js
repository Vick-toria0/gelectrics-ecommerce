const express = require('express');
const router = express.Router();
const productRoutes = require('./productRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const orderRoutes = require('./orderRoutes');

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
router.use('/products', productRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/orders', orderRoutes);

// 404 handler for API routes
router.use((req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

module.exports = router;

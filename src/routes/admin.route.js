const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const { dasboard } = require('../controllers/admin.controller');

router.get('/dasboard', authMiddleware, roleMiddleware('ADMIN'), dasboard);

module.exports = router;
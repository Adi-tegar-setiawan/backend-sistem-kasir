const express = require('express')
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware')
const { create, findOne, findAll } = require('../controllers/transaction.controller')

router.post('/', authMiddleware, create);
router.get('/', authMiddleware, findAll);
router.get('/:id', authMiddleware, findOne)

module.exports = router
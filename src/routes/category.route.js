const express = require('express');

const router = express.Router();

const authMiddleware =  require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware')

const {
    create,
    findAll,
    findOne,
    update,
    remove
} = require('../controllers/category.controller')

router.get('/', authMiddleware, findAll)
router.get('/:id', authMiddleware, findOne)

router.post('/', authMiddleware, roleMiddleware("ADMIN"), create)
router.patch('/:id', authMiddleware, roleMiddleware('ADMIN'), update)
router.delete('/:id', authMiddleware, roleMiddleware('ADMIN'), remove)

module.exports = router;

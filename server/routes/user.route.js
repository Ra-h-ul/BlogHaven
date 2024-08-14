const { Router } = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const {
    registerUser,
    loginUser,
    getUser,
    changeAvatar,
    editUser,
    getAuthors
} = require('../controllers/user.controller');

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAuthors);
router.get('/:id', getUser);
router.post('/change-avatar', authMiddleware, changeAvatar);
router.patch('/edit-user', authMiddleware, editUser); // Added authMiddleware

module.exports = router;

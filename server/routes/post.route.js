const { Router } = require('express');
const router = Router();
const authMiddleware = require('../middleware/auth.middleware');

const {
    createPost,
    getPosts,
    getPost,
    getCategoryPost,
    getUserPost,
    editPost,
    deletePost
} = require('../controllers/post.controller');

router.post('/', authMiddleware , createPost);
router.get('/', getPosts);
router.get('/:id' ,getPost);
router.get('/category/:category', getCategoryPost);
router.get('/user/:userId', getUserPost);
router.patch('/edit/:postId', authMiddleware ,editPost);
router.delete('/:id', authMiddleware , deletePost);

module.exports = router;

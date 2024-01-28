import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createComment, getPostComments, likeComment } from '../controllers/comment.controller.js';

const commentRouter = express.Router();

commentRouter.post('/create', verifyToken, createComment);
commentRouter.get('/getPostComments/:postId', getPostComments);
commentRouter.put('/likeComment/:commentId', verifyToken, likeComment);


export default commentRouter;
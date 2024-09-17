import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import postRouter from './routes/post.route.js';
import commentRouter from './routes/comment.route.js';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config()

mongoose.connect(process.env.MONGO).then(
    ()=>{
        console.log('MongoDb is connected!!!');
    }).catch(err=>{
        console.log(err);
    })

const app=express();

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}))

app.use(bodyParser.json());
app.use(cookieParser());

app.listen(3000,()=>{
    console.log("server is running on port 3000!!!");
})

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);

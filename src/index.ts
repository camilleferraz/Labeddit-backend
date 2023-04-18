import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { usersRouter } from './router/usersRouter';
import { postsRouter } from './router/postsRouter';
import {commentsRouter} from './router/commentsRouter';



dotenv.config()

const app =  express()
app.use (cors())
app.use(express.json())

app.listen(Number(process.env.PORT),() =>{
    console.log(`Servidor rodando na porta ${Number(process.env.PORT)}`)
})


app.use("/users",usersRouter)
app.use("/posts",postsRouter)
app.use("/comments",commentsRouter)

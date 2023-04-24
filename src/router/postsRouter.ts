import express from 'express'
import { PostBusiness } from '../business/PostsBusiness'
import { PostController } from '../controller/PostsController'
import { PostDatabase } from '../database/PostsDataBase'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'

export const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

postRouter.get("/", postController.getPosts)
postRouter.post("/", postController.createPost)
postRouter.put("/:id", postController.editPost)
postRouter.delete("/:id", postController.deletePost)
postRouter.put("/:id/like", postController.likeOrDislikePost)
postRouter.get("/comments/:id", postController.getCommentsByPostId)

import express from "express";
import { CommentBusiness } from "../business/CommentsBusiness";
import { CommentsController } from "../controller/CommentsControler";
import { CommentDatabase } from "../database/CommentsDataBase";
import { PostsDatabase } from "../database/PostsDataBase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";



export const commentsRouter = express.Router()

const commentsController = new CommentsController(
    new CommentBusiness(
       
        new PostsDatabase(),
        new CommentDatabase(),
        new IdGenerator(),
        new TokenManager()
)
)

commentsRouter.get("/:id", commentsController.getComments)
commentsRouter.post("/:id", commentsController.createComments)
// commentsRouter.delete("/:id",commentsController.deleteComments)
// commentsRouter.put("/:id", commentsController.likeDislikeComments)
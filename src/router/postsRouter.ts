import express from "express";
import { PostsBusiness } from "../business/PostsBusiness";
import { PostsController } from "../controller/PostsController";
import { PostsDatabase } from "../database/PostsDataBase";
import { UserDatabase } from "../database/UserDataBase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export const postsRouter = express.Router()

const postsController = new PostsController(
    new PostsBusiness(
        new PostsDatabase(),
        new UserDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager(),
        
    )
)

postsRouter.get("/",postsController.getAllPosts)

postsRouter.post("/",postsController.createNewPost)

postsRouter.put("/:id",postsController.editPost)

postsRouter.delete("/:id",postsController.deletePost)

postsRouter.put("/:id/like", postsController.likeDislike)
import express from "express";
import { UserBusiness } from "../business/UsersBusiness";
import { UsersControler } from "../controller/UsersControler";
import { UserDatabase } from "../database/UserDataBase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export const usersRouter = express.Router()

const usersControler = new UsersControler(
    new UserBusiness(
        new UserDatabase,
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)

usersRouter.get("/", usersControler.getAllUsers)

usersRouter.post("/signup", usersControler.signup)
usersRouter.post("/login", usersControler.login)
import { UserDatabase } from "../database/UserDataBase"
import { GetUsersInput, GetUsersOutput, LoginInput, LoginOutput, SignupInput, SignupOutput } from "../dtos/usersDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { User } from "../models/Users"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { TokenPayload, USER_ROLES } from "../types"

export class UserBusiness{
    constructor(
        private userDataBase:UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager){}

    public getAllUsers = async (input:GetUsersInput)=>{

        const {q,token} = input

        if(typeof q !== "string" && q !== undefined){
            throw new BadRequestError("'q' deve ser string ou undefined")
        }

        if(typeof token !== "string" ){
            throw new BadRequestError("Token não preenchido")
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload === null){
            throw new BadRequestError ("Token não é válido")
        }

        if(payload.role !== USER_ROLES.ADMIN){
            throw new BadRequestError ("Permissão inválida para esta requisição.")
        }

        const userDB = await this.userDataBase.findUsers(q)

        const users = userDB.map((userDB)=>{
            const user = new User(
                userDB.id,
                userDB.name,
                userDB.email,
                userDB.password,
                userDB.role,
                userDB.created_at
            )

            return user.toBusinessModel()
        })

        const output: GetUsersOutput = users

        return output
    }

    public signup = async (input: SignupInput): Promise<SignupOutput> => {
        const { name, email, password } = input

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }

        const id = this.idGenerator.generate()

        const passwordHash = await this.hashManager.hash(password)

        const newUser = new User(
            id,
            name,
            email,
            passwordHash,
            USER_ROLES.NORMAL,
            new Date().toISOString()
        )

        const newUserDB = newUser.toDBModel()
        await this.userDataBase.insertUser(newUserDB)

        const tokenPayload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }

        const token = this.tokenManager.createToken(tokenPayload)

        const output: SignupOutput = {
            message: "Cadastro realizado com sucesso",
            token
        }

        return output
    }

    public login = async (input: LoginInput): Promise<LoginOutput> => {
        const { email, password } = input

        if (typeof email !== "string") {
            throw new Error("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new Error("'password' deve ser string")
        }

        const userDB = await this.userDataBase.findUserByEmail(email)

        if (!userDB) {
            throw new NotFoundError("'email' não encontrado")
        }

        const passwordHash = this.hashManager.compare(password, userDB.password)

        if(!passwordHash){
            throw new BadRequestError("'email' ou 'senha' incorretos" )
        }

        // if (password !== userDB.password) {
        //     console.log(userDB.password, password)
        //     throw new BadRequestError("'email' ou 'password' incorretos")
            
        // }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        )

        const payload: TokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
        }

        const token = this.tokenManager.createToken(payload)

        const output: LoginOutput = {
            message: "Login realizado com sucesso",
            token
        }

        return output
    }}
import { CommentDatabase } from "../database/CommentsDataBase";
import { PostsDatabase } from "../database/PostsDataBase";
import { CreateCommentsInputDTO, getCommentsInputDTO } from "../dtos/commentsDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { Comment } from "../models/Comment";
import { NotFoundError } from "../errors/NotFoundError";
import { Posts } from "../models/Posts";

export class CommentBusiness{
    constructor(
        private postDataBase:PostsDatabase,
        private commentDataBase:CommentDatabase,
        private idGenerator: IdGenerator,
        private tokenManager:TokenManager 
    ){}
        //Revisar
    public getComments =async (input:getCommentsInputDTO) => {
        const {token,postId} = input

        if (typeof postId !== "string" && postId !== undefined) {
            throw new BadRequestError("PostId deve ser string ou undefined")
        }

        if(typeof token !== "string"){
            throw new BadRequestError("Token não preenchido")
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload === null){
            throw new BadRequestError("Token inválido.")
        }
        const commentById = await this.commentDataBase.findCommentsById(postId)

        console.log(commentById)

        const output=commentById
        
        return output
    }

    public createComments = async (input: CreateCommentsInputDTO): Promise<void> => {
        const { token, postId, content } = input

        if (typeof content !== "string") {
            throw new BadRequestError("'content' deve ser string")
        }

        if (token === undefined) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("'token' inválido")
        }

        const postExist = await this.commentDataBase.findById(postId)

        if(!postExist){
            throw new NotFoundError("'id' não encontrado")
        }

        const creatorIdPost = payload.id
        //const creatorNickname = payload.nickname

        const post = new Posts(
            postExist.id,
            creatorIdPost,
            postExist.content,
            postExist.likes,
            postExist.dislikes,
            postExist.created_at,
            postExist.updated_at,
            postExist.comments,
            
        )

        const id = this.idGenerator.generate()
        const createdAt = new Date().toISOString()
        const updatedAt = new Date().toISOString()
        const creatorId = payload.id

        const comment = new Comment(
            id,
            creatorId,
            postId,
            content,
            0,
            0,
            createdAt,
            updatedAt
        )

        const commentDB = comment.toDBModel()

        await this.commentDataBase.createNewComment(commentDB)

        const updatedPostDB = post.toDBModel()

        await this.postDataBase.editPost( updatedPostDB,postId)
    }

}
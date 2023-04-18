import { PostsDatabase } from "../database/PostsDataBase"
import{GetAllPostsInputDTO, CreateInputPostsDTO, DeleteInputPostsDTO,LikeDislikeDTO, EditInputDTO} from "../dtos/postsDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { Posts } from "../models/Posts"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { USER_ROLES } from "../types"
import { UserDatabase } from "../database/UserDataBase"
import { User } from "../models/Users"

export class PostsBusiness{
    constructor( 
        private postsDatabase: PostsDatabase,
        private userDataBase:UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashmanager: HashManager){}

    public getAllPosts =async (input:GetAllPostsInputDTO) => {
        
        const {q,token} = input

        if (typeof q !== "string" && q !== undefined) {
            throw new BadRequestError("'q' deve ser string ou undefined")
        }

        if(typeof token !== "string"){
            throw new BadRequestError("Token não preenchido")
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload === null){
            throw new BadRequestError("Token inválido.")
        }
        const postsDB = await this.postsDatabase.findPost(q)

        const posts = postsDB.map((postDB)=>{
            const post = new Posts (
                postDB.id,
                postDB.creator_id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.updated_at,
                postDB.comments
                )

            return post.toBusinessModel()
        })

        
        return posts
}

public createNewPost =async (input:CreateInputPostsDTO) => {
    const {content, token} = input

    if(typeof token !== "string"){
        throw new BadRequestError ("Token não preenchido.")
    }

    const payload = this.tokenManager.getPayload(token)

    if(payload === null){
        throw new BadRequestError ("Token inválido.")
    }

    const id = this.idGenerator.generate()
    const created_at = (new Date()).toISOString()
    const updated_at = (new Date()).toISOString()
    const likes = 0
    const dislikes = 0
    const creator_id = payload.id
    const comments = 0

    if(content !== undefined){
        if(typeof content !== "string"){
            throw new BadRequestError ("Content precisa ser do tipo string")
        }
    }else{
        throw new BadRequestError ("O content não foi informado")
    }

    const newPost = new Posts(
        id,
        creator_id,
        content,
        likes,
        dislikes,
        created_at,
        updated_at,
        comments
    )

    const newPostDB = newPost.toDBModel()
    await this.postsDatabase.createNewPost(newPostDB)

    const output = {
        message:"Postagem realizada.",
        post:newPost
    }

    return output
}

public editPost =async (input:EditInputDTO) => {
    const {id,content,token} = input

    if(typeof token !== "string"){
        throw new BadRequestError ("Token não preenchido.")
    }

    const payload = this.tokenManager.getPayload(token)

    if(payload === null){
        throw new BadRequestError ("Token inválido.")
    }

    const postToEdit = await this.postsDatabase.findPostById(id)

    if(!postToEdit){
        throw new BadRequestError ("Id inválido")
    }

    if(payload.role !== USER_ROLES.ADMIN){
        if(postToEdit.creator_id !== payload.id){
            throw new BadRequestError ("Autorização insuficiente.")
        }
    }


    if(content !== undefined){
        if(typeof content !== "string"){
            throw new BadRequestError("Content deve ser do tipo string")
        }
    }else{
        throw new BadRequestError("Content vazio.")
    }

    const updateAt = (new Date()).toISOString()

    const NewPostToEdit = new Posts(
        id,
        postToEdit.creator_id,
        content,
        postToEdit.likes,
        postToEdit.dislikes,
        postToEdit.created_at,
        updateAt,
        postToEdit.comments
        )

    const postToEditDB = NewPostToEdit.toDBModel()
    await this.postsDatabase.editPost(postToEditDB,id)

    const output={
        message:"Atualização feita com sucesso.",
        post: NewPostToEdit
    }
    return output
}

public deletePost =async (input:DeleteInputPostsDTO) => {
    const {id, token} = input

    if(typeof token !== "string"){
        throw new BadRequestError ("Token não preenchido.")
    }

    const payload = this.tokenManager.getPayload(token)

    if(payload === null){
        throw new BadRequestError ("Token inválido.")
    }

    const postToDelete = await this.postsDatabase.findPostById(id)
    const filterUserDB = await this.userDataBase.findUserById(postToDelete?.creator_id)

    if(filterUserDB?.role !== USER_ROLES.ADMIN){
        if(filterUserDB?.id !== payload.id){
            throw new BadRequestError("Autorização insuficiente.")
        }
    }

    if(postToDelete){
        await this.postsDatabase.deletePostbyId(id)
        const output={
            message:"Post excluído com sucesso",
            post:postToDelete
        }

        return output
    }else{
        throw new BadRequestError("Post não encontrado.")
    }

}

public likeDislike =async (input:LikeDislikeDTO) => {
    const {id,like,token} = input

    if(typeof token !== "string"){
        throw new BadRequestError ("Token não preenchido.")
    }

    const payload = this.tokenManager.getPayload(token)

    if(payload === null){
        throw new BadRequestError ("Token inválido.")
    }

    const postToLike = await this.postsDatabase.findPostById(id)
    const idLikeDislike = await this.postsDatabase.likeDislike(payload.id,id)

    if(!postToLike){
        throw new BadRequestError("Publicação não encontrada")

    }

    const updateAt = (new Date()).toISOString()
    let likes = 0
    let dislikes = 0

    if(likes === 0){
        dislikes=1
    }else if(likes ===1){
        likes =1
    }else{
        throw new BadRequestError ("Informe 0 para dislike e 1 para like")
    }

    const newPostToLike = new Posts (
        id,
        postToLike.creator_id,
        postToLike.content,
        likes,
        dislikes,
        postToLike.created_at,
        updateAt,
        postToLike.comments
        
    )

    const updateLikeDislikeDB = {
        user_id:payload.id,
        post_id:id,
        like:1
    }

    const postToLikeDB = newPostToLike.toDBModel()
    await this.postsDatabase.editPost(postToLikeDB,id)
    await this.postsDatabase.updateLikeDislike(updateLikeDislikeDB)

    if(like===0){
        const output ={
            message:"Dislike recebido",
            post:postToLikeDB
        }
        return output
    }else if(like===1){
        const output ={
            message:"Like recebido",
            post:postToLikeDB
        }
        return output
    }


}
}
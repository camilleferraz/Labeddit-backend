import { Request,Response } from "express";
import { PostsBusiness } from "../business/PostsBusiness";
import{GetAllPostsInputDTO, CreateInputPostsDTO, DeleteInputPostsDTO,EditInputDTO,LikeDislikeDTO} from "../dtos/postsDTO"

export class PostsController{
    constructor(
        private postsBusiness: PostsBusiness
    ){}


    public getAllPosts =async (req:Request, res:Response) => {
       
        try {


           const input: GetAllPostsInputDTO = { 
            q: req.query.q,
            token: req.headers.authorization}

            const output = await this.postsBusiness.getAllPosts(input)

            res.status(200).send(output)
        } 
        
        

        catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            } 
        }
    }

    public createNewPost =async (req:Request, res:Response) => {
        try {
            const input: CreateInputPostsDTO ={
            content: req.body.content,
            token: req.headers.authorization
        }

        const output = await this.postsBusiness.createNewPost(input)

        res.status(201).send(output)

        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            } 
        }
    }

    public editPost =async (req:Request, res:Response) => {
        
         try {             const input: EditInputDTO ={
                id: req.params.id,
                 content:req.body.content,
                 token: req.headers.authorization
             }

         const output = await this.postsBusiness.editPost(input)

         res.status(201).send(output)

            
         } catch (error) {
             console.log(error)
    
             if (req.statusCode === 200) {
                 res.status(500)
            }
    
             if (error instanceof Error) {
                 res.send(error.message)
             } else {
                 res.send("Erro inesperado")
             }     
        }
     }

     public deletePost = async (req:Request, res:Response) => {
         try {
             const input: DeleteInputPostsDTO ={
                 id: req.params.id,
                 token: req.headers.authorization
             }
             const output = await this.postsBusiness.deletePost(input)
             res.status(201).send(output)
            
         } catch (error) {
             console.log(error)
    
             if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }      
        }
    }


    public likeDislike =async (req:Request, res:Response) => {
        try {
            const input: LikeDislikeDTO ={
                id: req.params.id,
                like:req.body.like,
                token: req.headers.authorization
            }

            const output = await this.postsBusiness.likeDislike(input)
            res.status(201).send(output)
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }      
        }
    }

}
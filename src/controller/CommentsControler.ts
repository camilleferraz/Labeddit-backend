import { Request,Response } from "express"
import { CommentBusiness } from "../business/CommentsBusiness"
import { CreateCommentsInputDTO, DeleteCommentsInputDTO, getCommentsInputDTO, LikeDislikeCommentsInputDTO } from "../dtos/commentsDTO"

export class CommentsController{
    constructor(
        private commentsBusiness:CommentBusiness
    ){}

    public getComments =async (req:Request, res:Response) => {
        try {
            const input:getCommentsInputDTO = {
                token:req.headers.authorization,
                postId: req.params.id
            }

            const output = await this.commentsBusiness.getComments(input)
            res.status(200).send(output)

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

    public createComments =async (req:Request, res:Response) => {
        try {
            const input:CreateCommentsInputDTO = {
                token:req.headers.authorization,
                postId: req.params.id,
                content:req.body.content
            }

            const output = await this.commentsBusiness.createComments(input)
            res.status(200).send(output)

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

    // public deleteComments =async (req:Request, res:Response) => {
    //     try {
    //         const input: DeleteCommentsInputDTO= {
    //             token:req.headers.authorization,
    //             idToDelete: req.params.id
    //         }

    //         const output = await this.commentsBusiness.deleteComments(input)
    //         res.status(200).send(output)

    //     } catch (error) {
    //         console.log(error)
    
    //         if (req.statusCode === 200) {
    //             res.status(500)
    //         }
    
    //         if (error instanceof Error) {
    //             res.send(error.message)
    //         } else {
    //             res.send("Erro inesperado")
    //         } 
    //     }
    // }

    // public likeDislikeComments =async (req:Request, res:Response) => {
    //     try {
    //         const input:LikeDislikeCommentsInputDTO = {
    //             idToLikeDislike:req.params.id,
    //             token:req.headers.authorization,
    //             like: req.body.like
    //         }

    //         const output = await this.commentsBusiness.likeDislikeComments(input)
    //         res.status(200).send(output)

    //     } catch (error) {
    //         console.log(error)
    
    //         if (req.statusCode === 200) {
    //             res.status(500)
    //         }
    
    //         if (error instanceof Error) {
    //             res.send(error.message)
    //         } else {
    //             res.send("Erro inesperado")
    //         } 
    //     }
    // }
}
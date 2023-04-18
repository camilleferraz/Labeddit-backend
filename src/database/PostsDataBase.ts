import { PostsDB, LikesDislikesDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";



export class PostsDatabase extends BaseDatabase{
    public static POSTS_TABLE = "posts"
    public static LIKEDISLIKE_TABLE = "likes_and_dislikes"

    public async findPost(q: string | undefined) {
        if (q) {
            const result: PostsDB[] = await BaseDatabase
                .connection(PostsDatabase.POSTS_TABLE)
                .where("name", "LIKE", `%${q}%`)

            return result

        } else {
            const result: PostsDB[] = await BaseDatabase
                .connection(PostsDatabase.POSTS_TABLE)

            return result
        }
    }


    public async findPostById(id: string) {
        const [ productDB ]: PostsDB[] | undefined[] = await BaseDatabase
            .connection(PostsDatabase.POSTS_TABLE)
            .where({ id })

        return productDB
    }

    public createNewPost = async(newPostDB:PostsDB)=>{
        await BaseDatabase.connection(PostsDatabase.POSTS_TABLE)
        .insert(newPostDB)

    }

    public editPost = async(updatePost:PostsDB,id:string)=>{
        await BaseDatabase
        .connection(PostsDatabase.POSTS_TABLE)
        .update(updatePost)
        .where({id:id})
    }

    public deletePostbyId = async(id:string)=>{
        await BaseDatabase
        .connection(PostsDatabase.POSTS_TABLE)
        .del()
        .where({id:id})
    }

    public likeDislike = async(user_id:string, post_id: string)=>{
         const [likeDislikeDB]:LikesDislikesDB[] | undefined = await BaseDatabase
        .connection(PostsDatabase.LIKEDISLIKE_TABLE)
        .select().where({user_id:user_id, post_id: post_id})

        return likeDislikeDB
    }

    public updateLikeDislike = async(updateLD:LikesDislikesDB)=>{
        await BaseDatabase
        .connection(PostsDatabase.LIKEDISLIKE_TABLE)
        .insert(updateLD)
    }}
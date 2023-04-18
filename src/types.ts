export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface TokenPayload {
    id: string,
	name: string,
    role: USER_ROLES
}

export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
}

export interface UserModel {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    createdAt: string
}

export interface PostsDB {
    id: string,
    creator_id:string,
    content:string,
    likes:number,
    dislikes:number,
    created_at:string,
    updated_at:string,
    comments:number
}

export interface PostsModel {
    id: string,
    creatorId:string,
    content:string,
    likes:number,
    dislikes:number,
    createdAt:string,
    updatedAt:string,
    comments:number
}

export interface PostsByUserDB {
    id: string,
    content: string,
    likes:number,
    dislikes:number,
    created_at:string,
    updated_at:string,
    creator_id:string,
    
}

export interface LikesDislikesDB{
    user_id:string,
    post_id:string,
    like:number
}

export interface CommentDB{
    id:string,
    creator_id:string,
    post_id:string,
    content:string,
    likes:number,
    dislikes:number,
    created_at:string,
    updated_at:string
}

export interface CommentModel{
    id:string,
    creatorId:string,
    postId:string,
    content:string,
    likes:number,
    dislikes:number,
    createdAt:string,
    updatedAt:string
}

export interface LikesDislikesCommentDB{
    user_id:string,
    comment_id:string,
    like:number
}

// export enum COMMENT_LIKE{
//     ALREADY_LIKED = "Already liked",
//     ALREADY_DISLIKED = "Already disliked"
// }

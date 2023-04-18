

export interface getCommentsInputDTO{
    token:string | undefined,
    postId:string
}

export interface CreateCommentsInputDTO{
    token:string | undefined,
    postId:string,
    content:unknown
}

export interface EditCommentsInputDTO{
    idToEdit: string,
    token:string | undefined,
    content:unknown
}

export interface DeleteCommentsInputDTO{
    idToDelete: string,
    token:string | undefined,
}

export interface LikeDislikeCommentsInputDTO{
   idToLikeDislike:string,
   token:string|undefined,
   like:unknown
}
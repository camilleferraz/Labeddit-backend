export interface GetAllPostsInputDTO{
    q:unknown,
    token:unknown
}

export interface CreateInputPostsDTO{
    content:string,
    token:string|undefined
}

export interface EditInputDTO{
    id:string,
    content:string,
    token:string|undefined
}

export interface DeleteInputPostsDTO{
    id:string,
    token:string|undefined
}

export interface LikeDislikeDTO{
    id:string,
    like:number,
    token:string|undefined
}
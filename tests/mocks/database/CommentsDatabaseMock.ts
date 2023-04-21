import { BaseDatabase } from "../../../src/database/BaseDatabase"
import { CommentsDB, CommentsWithCreatorDB, COMMENTS_LIKE, LikeDislikeCommentsDB } from "../../../src/types"


export class CommentsDatabaseMock extends BaseDatabase {
    public static TABLE_COMMENTS = "comment"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes"
    public static TABLE_COMMENTS_LIKES_DISLIKES = "comment_likes_dislikes"

    public findCommentsById = async (id: string): Promise<CommentsDB | undefined> => {
        switch (id) {
            case "id-comment-mock":
                return {
                    id: "id-comment-mock",
                    post_id: "id-post-mock",
                    user_id: "id-mock",
                    comments: "primeiro comment mock",
                    likes: 0,
                    dislikes: 0,
                    created_at: new Date().toISOString(),
                }
            case "id-comment-mock2":
                return {
                    id: "id-comment-mock2",
                    post_id: "id-post-mock2",
                    user_id: "id-mock2",
                    comments: "segundo comment mock",
                    likes: 0,
                    dislikes: 0,
                    created_at: new Date().toISOString(),
                }
            default:
                return undefined
        }
    }

    public getCommentsWithCreators = async (): Promise<CommentsWithCreatorDB[]> => {
        return [
            {
                id: "id-comment-mock",
                post_id: "id-post-mock",
                user_id: "id-mock",
                comments: "primeiro comment mock",
                likes: 0,
                dislikes: 0,
                created_at: new Date().toISOString(),
                creator_name: "Normal Mock"
            },
            {
                id: "id-comment-mock2",
                post_id: "id-post-mock2",
                user_id: "id-mock2",
                comments: "segundo comment mock",
                likes: 0,
                dislikes: 0,
                created_at: new Date().toISOString(),
                creator_name: "Normal Mock"
            }
        ]
    }

    public findCommentsWithPostId = async (id: string): Promise<CommentsWithCreatorDB | undefined> => {
        switch (id) {
            case "id-post-mock":
                return {
                    id: "id-comment-mock",
                    post_id: "id-post-mock",
                    user_id: "id-mock",
                    comments: "primeiro comment mock",
                    likes: 0,
                    dislikes: 0,
                    created_at: new Date().toISOString(),
                    creator_name: "Normal Mock"
                }
            case "id-post-mock2":
                return {
                    id: "id-comment-mock2",
                    post_id: "id-post-mock2",
                    user_id: "id-mock2",
                    comments: "segundo comment mock",
                    likes: 0,
                    dislikes: 0,
                    created_at: new Date().toISOString(),
                    creator_name: "Normal Mock"
                }
            default:
                return undefined
        }
    }

    public insertComments = async (newCommentsDB: CommentsDB): Promise<void> => {
    }

    public updateComments = async (newCommentsDB: CommentsDB, id: string): Promise<void> => {
    }

    public deleteComments = async (id: string): Promise<void> => {
    }

    public findCommentsWithCreatorById = async (id: string): Promise<CommentsWithCreatorDB | undefined> => {
        switch (id) {
            case "id-mock":
                return {
                    id: "id-comment-mock",
                    post_id: "id-post-mock",
                    user_id: "id-mock",
                    comments: "primeiro comment mock",
                    likes: 0,
                    dislikes: 0,
                    created_at: new Date().toISOString(),
                    creator_name: "Normal Mock"
                }
            case "id-mock2":
                return {
                    id: "id-comment-mock2",
                    post_id: "id-post-mock2",
                    user_id: "id-mock2",
                    comments: "segundo comment mock",
                    likes: 0,
                    dislikes: 0,
                    created_at: new Date().toISOString(),
                    creator_name: "Normal Mock"
                }
            default:
                return undefined
        }
    }

    public likeOrDislikeComments = async (likeOrDislike: LikeDislikeCommentsDB): Promise<void> => {
    }

    public findLikeDislike = async (likeOrDislikeDBToFind: LikeDislikeCommentsDB): Promise<COMMENTS_LIKE | null> => {

        if (likeOrDislikeDBToFind) {
            return likeOrDislikeDBToFind.like === 1
                ? COMMENTS_LIKE.ALREADY_LIKED
                : COMMENTS_LIKE.ALREADY_DISLIKED

        } else {
            return null
        }
    }

    public removeLikeDislike = async (likeOrDislike: LikeDislikeCommentsDB): Promise<void> => {
    }

    public updateLikeDislike = async (likeOrDislike: LikeDislikeCommentsDB): Promise<void> => {
    }
}
import { PostBusiness } from "../../src/business/PostsBusiness"
import { LikeOrDislikePostInputDTO } from "../../src/dtos/PostsDTO"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { PostDatabaseMock } from "../mocks/database/PostDatabaseMock"
import { IdGeneratorMock } from "../mocks/service/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/service/TokenManagerMock"


describe("LikeOrDislikePost", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Deve dar like/dislike a um post", async () => {

        const input: LikeOrDislikePostInputDTO = {
            idToLikeOrDislike: "id-post-mock",
            token: "token-mock-normal",
            like: true
        }

        const response = await postBusiness.likeOrDislikePost(input)
        expect(response).toBeUndefined()
    })

    test("Token for inválido, reporta erro", async () => {
        
        try {
            const input: LikeOrDislikePostInputDTO = {
                idToLikeOrDislike: "id-post-mock",
                token: undefined,
                like: true
            }
    
            await postBusiness.likeOrDislikePost(input)
            
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("token ausente")
                expect(error.statusCode).toBe(400)
            }
        }       
    })

    test("Like/dislike não for do tipo boolean, reporta erro", async () => {
        expect.assertions(2)

        try {
            const input: LikeOrDislikePostInputDTO = {
                idToLikeOrDislike: "id-post-mock",
                token: "token-mock-normal",
                like: "true"
            }
    
            await postBusiness.likeOrDislikePost(input)
            
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("'like' deve ser boolean")
                expect(error.statusCode).toBe(400)
            }
        }
    })
})
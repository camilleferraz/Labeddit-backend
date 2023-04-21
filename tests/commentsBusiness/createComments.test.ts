import { CreateCommentsInputDTO, GetCommentsInputDTO } from "../../src/dtos/CommentsDTO"
import { CommentBusiness } from "../../src/business/CommentsBusiness"
import { CommentsDatabaseMock } from "../mocks/database/CommentsDatabaseMock"
import { PostDatabaseMock } from "../mocks/database/PostDatabaseMock"
import { IdGeneratorMock } from "../mocks/service/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/service/TokenManagerMock"
import { BadRequestError } from "../../src/errors/BadRequestError"


describe("createComment", () => {
    const commentsBusiness = new CommentBusiness(
        
        new PostDatabaseMock(),
        new CommentsDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Comment realizado com sucesso", async () => {
        const input: CreateCommentsInputDTO = {
            postId: "id-post-mock",
            token: "token-mock-normal",
            comments: "Novo comments"
        }       

        const response = await commentsBusiness.createComments(input)
        expect(response).toBeUndefined()

    })

    test("Se o token for inválido, erro é reportado", async () => {
        expect.assertions(2)

        try {
            const input: CreateCommentsInputDTO = {
                postId: "id-post-mock",
                token: "token-mock-normalerrado",
                comments: "Novo comment"
            }

            await commentsBusiness.createComments(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("'token' inválido")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("Se o comentário não for do tipo string, reporta erro", async () => {
        expect.assertions(2)
        
        try {
            const input: CreateCommentsInputDTO = {
                postId: "id-post-mock",
                token: "token-mock-normal",
                comments: null
            }
    
            await commentsBusiness.createComments(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("'comments' deve ser uma string")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("Se o token não for enviado, reporta erro", async () => {
        expect.assertions(2)

        try {
            const input: CreateCommentsInputDTO = {
                postId: "id-post-mock",
                token: undefined,
                comments: "Novo comment"
            }

            await commentsBusiness.createComments(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("token ausente")
                expect(error.statusCode).toBe(400)
            }
        }
    })
})
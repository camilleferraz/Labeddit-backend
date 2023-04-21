import { DeleteCommentsInputDTO } from "../../src/dtos/CommentsDTO"
import { CommentBusiness } from "../../src/business/CommentsBusiness"
import { CommentsDatabaseMock } from "../mocks/database/CommentsDatabaseMock"
import { PostDatabaseMock } from "../mocks/database/PostDatabaseMock"
import { IdGeneratorMock } from "../mocks/service/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/service/TokenManagerMock"
import { BadRequestError } from "../../src/errors/BadRequestError"

describe("deleteComment", () => {
    const commentsBusiness = new CommentBusiness(
        
        new PostDatabaseMock(),
        new CommentsDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Comment é deletado com sucesso", async () => {
        const input: DeleteCommentsInputDTO = {
            idToDelete: "id-comment-mock",
            token: "token-mock-normal"
        }

        const response = await commentsBusiness.deleteComments(input)
        expect(response).toBeUndefined()
    })

    test("Quando token for inválido, dispara erro", async () => {
        expect.assertions(2)

        try {
            const input: DeleteCommentsInputDTO = {
                idToDelete: "id-mock-admin",
                token: "token-mock-admin-errado"
            }
    
            await commentsBusiness.deleteComments(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("Usuário não está logado")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("Token for do tipo undefined, reporta erro", async () => {
        expect.assertions(2)

        try {
            const input: DeleteCommentsInputDTO = {
                idToDelete: "id-mock-admin",
                token: undefined
            }
    
            await commentsBusiness.deleteComments(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("token é necessário")
                expect(error.statusCode).toBe(400)
            }
        }
    })
})
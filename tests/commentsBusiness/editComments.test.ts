import { IdGeneratorMock } from "../mocks/service/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/service/TokenManagerMock"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { PostDatabaseMock } from "../mocks/database/PostDatabaseMock"
import { EditCommentsInputDTO } from "../../src/dtos/CommentsDTO"
import { CommentBusiness } from "../../src/business/CommentsBusiness"
import { CommentsDatabaseMock } from "../mocks/database/CommentsDatabaseMock"


describe("editComment", () => {
    const commentsBusiness = new CommentBusiness(
        
        new PostDatabaseMock(),
        new CommentsDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Token for do tipo undefined, reporta erro", async () => {
        expect.assertions(2)

        try {
            const input: EditCommentsInputDTO = {
                idToEdit: "id-mock-normal",
                token: undefined,
                comments: "Novo comment"
            }

         await commentsBusiness.editComments(input)

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("token é necessário")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    
    test("Comment for do tipo undefined, reporta erro", async () => {
        expect.assertions(2)

        try {
            const input: EditCommentsInputDTO = {
                idToEdit: "id-mock-normal",
                token: "token-mock-normal",
                comments: undefined
            }

         await commentsBusiness.editComments(input)

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("'comments' deve ser uma string")
                expect(error.statusCode).toBe(400)
            }
        }
    })
})
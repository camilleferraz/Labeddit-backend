import { CommentBusiness } from "../../src/business/CommentsBusiness"
import { GetCommentsInputDTO } from "../../src/dtos/CommentsDTO"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { CommentsDatabaseMock } from "../mocks/database/CommentsDatabaseMock"
import { PostDatabaseMock } from "../mocks/database/PostDatabaseMock"
import { IdGeneratorMock } from "../mocks/service/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/service/TokenManagerMock"

describe("getComment", () => {
    const commentBusiness = new CommentBusiness(
        new PostDatabaseMock(),
        new CommentsDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Token for inválido, reporta erro", async () => {
        expect.assertions(2)
        
        try {
            const input: GetCommentsInputDTO = {
                token: undefined,
                id: ""
            }

            await commentBusiness.getComments(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("token é necessário")
                expect(error.statusCode).toBe(400)
            }
        }
    })
})
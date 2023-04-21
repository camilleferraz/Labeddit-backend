import { PostBusiness } from "../../src/business/PostsBusiness"
import { IdGeneratorMock } from "../mocks/service/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/service/TokenManagerMock"
import { PostDatabaseMock } from "../mocks/database/PostDatabaseMock"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { EditPostInputDTO } from "../../src/dtos/PostsDTO"

describe("editPost", () => {
    const userBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Token for do tipo undefined, reporta erro", async () => {
        
        try {
            const input: EditPostInputDTO = {
                idToEdit: "id-mock-normal",
                token: undefined, 
                content: "Novo post"
            }

         await userBusiness.editPost(input)

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("token ausente")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    
    test("Content for do tipo undefined, reporta erro", async () => {
      
        try {
            const input: EditPostInputDTO = {
                idToEdit: "id-mock-normal",
                token: "token-mock-normal",
                content: undefined
            }

         await userBusiness.editPost(input)

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("'name' deve ser string")
                expect(error.statusCode).toBe(400)
            }
        }
    })
})
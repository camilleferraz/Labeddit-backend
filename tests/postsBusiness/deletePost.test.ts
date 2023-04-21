import { PostBusiness } from "../../src/business/PostsBusiness"
import { DeletePostInputDTO } from "../../src/dtos/PostsDTO"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { NotFoundError } from "../../src/errors/NotFoundError"
import { PostDatabaseMock } from "../mocks/database/PostDatabaseMock"
import { IdGeneratorMock } from "../mocks/service/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/service/TokenManagerMock"


describe("delete", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )
    
    test("Deleção de usuário reakizada com sucesso", async () => {
        const input: DeletePostInputDTO = {
            idToDelete: "id-post-mock2",
            token: "token-mock-admin"
        }
        
        const response = await postBusiness.deletePost(input)       
        expect(response).toBeUndefined()
    })

    test("Token for inválido, reporta erro", async () => {
       

        try {
            const input: DeletePostInputDTO = {
                idToDelete: "id-mock-admin",
                token: "token-mock-admin-errado"
            }
    
            await postBusiness.deletePost(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("token inválido")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("Token for do tipo null, reporta erro", async () => {
        
        try {
            const input: DeletePostInputDTO = {
                idToDelete: "id-mock-errado",
                token: "token-mock-admin"
            }
    
            await postBusiness.deletePost(input)
        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.message).toBe("'id' não encontrado")
                expect(error.statusCode).toBe(404)
            }
        }
    })
})
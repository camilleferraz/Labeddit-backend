import { PostBusiness } from "../../src/business/PostsBusiness"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { IdGeneratorMock } from "../mocks/service/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/service/TokenManagerMock"
import { PostDatabaseMock } from "../mocks/database/PostDatabaseMock"
import { CreatePostInputDTO } from "../../src/dtos/postsDTO"


describe("createPost", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Postagem realizada com sucesso", async () => {
        const input: CreatePostInputDTO = {
            content: "Nova postagem!",
            token: "token-mock-normal"
        }

        const response = await postBusiness.createPost(input)
        expect(response).toBe(true)
    })

    test("Token for do tipo null, reporta erro", async () => {
        expect.assertions(2)

        try {
            const input: CreatePostInputDTO = {
                content: "Nova postagem!",
                token: "token-mock-normalerrado"
            }
    
            await postBusiness.createPost(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("'token' inválido")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("Token for inválido, reporta erro", async () => {
        expect.assertions(2)

        try {
            const input: CreatePostInputDTO = {
                content: "Nova postagem!",
                token: undefined
            }
    
            await postBusiness.createPost(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("token ausente")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("Content não for do tipo string, reporta erro", async () => {
        expect.assertions(2)

        try {
            const input: CreatePostInputDTO = {
                content: null,
                token: "token-mock-normal"
            }
    
            await postBusiness.createPost(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("'content' deve ser uma string")
                expect(error.statusCode).toBe(400)
            }
        }
    })
})
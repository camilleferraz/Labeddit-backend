import { UserBusiness } from "../../src/business/UsersBusiness"
import { SignupInput } from "../../src/dtos/usersDTO"
import { LoginInput } from "../../src/dtos/usersDTO"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { HashManagerMock } from "../mocks/service/HashManagerMock"
import { TokenManagerMock } from "../mocks/service/TokenManagerMock"
import { IdGeneratorMock } from "../mocks/service/IdGeneratorMock"
import { UserDatabaseMock } from "../mocks/database/UserDatabaseMock"

describe("signup", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )
    
    test("cadastro bem-sucedido retorna token", async () => {
        const input: SignupInput = {
            email: "example@email.com",
            name: "Example Mock",
            password: "bananinha"
        }

        const response = await userBusiness.signup(input)
        expect(response.token).toBe("token-mock-normal")
    })

    test("Deve disparar erro caso name não seja string",async()=>{
        
        try {
            const input: SignupInput = {
                email: "example@email.com",
                name: null,
                password: "bananinha"
            }

            await userBusiness.signup(input)

        } catch (error) {
            if(error instanceof BadRequestError){
                expect(error.message).toBe("'name' deve ser string")
                expect(error.statusCode).toBe(400)
            }
        }

    })

    test("Deve disparar um erro caso o email já tenha sido utilizado", async()=>{

        const input: SignupInput = {
            email: "normal@email.com",
            name: "Example Mock",
            password: "bananinha"
        }

        expect(async () =>{
            await userBusiness.signup(input)
        }).rejects.toThrow("'email' já existe")

        expect(async () =>{
            await userBusiness.signup(input)
        }).rejects.toBeInstanceOf(BadRequestError)

    })

    
})
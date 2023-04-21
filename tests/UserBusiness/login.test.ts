import { UserBusiness } from "../../src/business/UsersBusiness"
import { SignupInput } from "../../src/dtos/usersDTO"
import { LoginInput } from "../../src/dtos/usersDTO"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { HashManagerMock } from "../mocks/service/HashManagerMock"
import { TokenManagerMock } from "../mocks/service/TokenManagerMock"
import { IdGeneratorMock } from "../mocks/service/IdGeneratorMock"
import { UserDatabaseMock } from "../mocks/database/UserDatabaseMock"


describe("login", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )
    
    test("login bem-sucedido em conta normal retorna token", async () => {
        const input: LoginInput = {
            email: "normal@email.com",
            password: "bananinha"
        }

        const response = await userBusiness.login(input)
        expect(response.token).toBe("token-mock-normal")
    })

    test("login bem-sucedido em conta admin retorna token", async () => {
        const input: LoginInput = {
            email: "admin@email.com",
            password: "bananinha"
        }

        const response = await userBusiness.login(input)
        expect(response.token).toBe("token-mock-admin")
    })
})
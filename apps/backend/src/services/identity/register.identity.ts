import { logger } from "hono/logger"
import { users, db } from "../../database/index.js"
import bcrypt from 'bcrypt'

/**
 * register a new user
 */
export async function register(params: RegisterUserParams): Promise<void>  {
    try{
        const passwordHash = await bcrypt.hash(params.password, 10)
        db.insert(users).values({
            first_name: params.firstName,
            last_name: params.lastName,
            username: params.username,
            email: params.email,
            passowrd_hash: passwordHash,
        })
    } catch (err) {
        console.log(err)
    }
}

export type RegisterUserParams = {
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

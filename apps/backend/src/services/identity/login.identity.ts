import { and, eq, isNull } from 'drizzle-orm'
import {db, users} from '../../database/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '../../config.js'

/**
 * login with username and password
 */
export async function login(params: LoginUserParams): Promise<LoginUserResult>  {
    const rows = await db.select()
        .from(users)
        .where(and(
            isNull(users.deleted_at), 
            eq(users.username, params.username)
        ))
    if (!rows || rows.length === 0){
        throw new Error('user not found')
    }
    const user = rows[0];
    const isPasswordCorrect = await bcrypt.compare(params.password, user.passowrd_hash)
    if (!isPasswordCorrect) {
        throw new Error('password is not correct')
    }
    
    const payload: TokenPayload = {
        username: user.username
    }
    const token = jwt.sign(payload, config.jwt.secret)
    return {
        token
    }
}

export type LoginUserParams = {
    username: string,
    password: string,
}

export type TokenPayload = {
    username: string
}

export type LoginUserResult = {
    token: string
}

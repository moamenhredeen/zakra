import { and, eq, isNull } from 'drizzle-orm'
import { db } from '@infrastructure/database/data-source.js'
import { users } from '@infrastructure/database/schema.js'
import { verifyPassword } from '@infrastructure/security/password-hashing.service.js'
import {
    generateToken,
    type TokenPayload,
} from '@infrastructure/auth/token.service.js'

// -----------------------  types  -----------------------
export type LoginUserParams = {
    email: string
    password: string
}

export type LoginUserResult = {
    token: string
}

// -----------------------  public api  -----------------------
/**
 * login with username and password
 */
export async function login(params: LoginUserParams): Promise<LoginUserResult> {
    const rows = await db
        .select()
        .from(users)
        .where(and(isNull(users.deleted_at), eq(users.email, params.email)))
    if (!rows || rows.length === 0) {
        throw new Error('user not found')
    }
    const user = rows[0]
    const isPasswordCorrect = await verifyPassword(
        params.password,
        user.passowrd_hash
    )
    if (!isPasswordCorrect) {
        throw new Error('password is not correct')
    }

    // if (!user.verified) {
    //     throw new Error('user is not verified')
    // }

    const payload: TokenPayload = {
        userId: user.id,
    }
    const token = generateToken(payload)
    return {
        token,
    }
}

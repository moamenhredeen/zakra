import { db } from '@infrastructure/database/data-source.js'
import { users } from '@infrastructure/database/schema.js'
import { hashPassword } from '@infrastructure/security/password-hashing.service.js'
import { logError } from '@infrastructure/logging/logger.js'
import { generateToken } from '@infrastructure/auth/token.service.js'
import { sendVerificationEmail } from '@infrastructure/email/email.service.js'

// -----------------------  types  -----------------------

export type RegisterUserParams = {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
}

// -----------------------  public api  -----------------------
/**
 * register a new user
 */
export async function register(params: RegisterUserParams): Promise<void> {
    try {
        const passwordHash = await hashPassword(params.password)
        const rows = await db
            .insert(users)
            .values({
                first_name: params.firstName,
                last_name: params.lastName,
                username: params.username,
                email: params.email,
                passowrd_hash: passwordHash,
                verified: false,
            })
            .returning()

        const user = rows[0]
        const token = generateToken({
            userId: user.id,
        })
        await sendVerificationEmail({
            to: user.email,
            token,
        })
    } catch (err) {
        logError(err)
        // TODO: handle error
    }
}

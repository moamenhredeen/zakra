import { db } from '@infrastructure/database/data-source.js'
import { users } from '@infrastructure/database/schema.js'
import { hashPassword } from '@infrastructure/security/password-hashing.service.js'
import { logError } from '@infrastructure/logging/logger.js'
import { generateToken } from '@infrastructure/auth/token.service.js'
import { sendVerificationEmail } from '@infrastructure/email/email.service.js'
import { and, eq, isNull } from 'drizzle-orm'

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
        const selectedRows = await db
            .select()
            .from(users)
            .where(and(isNull(users.deleted_at), eq(users.email, params.email)))

        if (selectedRows.length === 1) {
            const user = selectedRows[0]
            if (user.verified) {
                return
            }
            // user is not verified
            await verify(user.id, user.email)
            return
        }

        const passwordHash = await hashPassword(params.password)
        await db
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
        // const user = rows[0]
        // await verify(user.id, user.email)
    } catch (err) {
        logError(err)
        // TODO: handle error
    }
}

async function verify(id: number, email: string): Promise<void> {
    const token = generateToken({
        userId: id,
    })
    await sendVerificationEmail({
        to: email,
        token,
    })
}

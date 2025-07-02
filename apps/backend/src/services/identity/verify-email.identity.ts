import { verifyToken } from '@infrastructure/auth/token.service.js'
import { and, isNull, eq } from 'drizzle-orm'
import { db } from '@infrastructure/database/data-source.js'
import { users } from '@infrastructure/database/schema.js'
import { logError } from '@infrastructure/logging/logger.js'

export async function verifyEmail(token: string): Promise<boolean> {
    const result = verifyToken(token)
    if (!result.isValid || !result.payload) {
        return false
    }
    try {
        const rows = await db
            .select()
            .from(users)
            .where(
                and(
                    isNull(users.deleted_at),
                    eq(users.id, result.payload?.userId)
                )
            )
        if (rows.length === 0) {
            return false
        }

        const user = rows[0]
        if (user.verified) {
            return true
        }
        user.verified = true
        await db.update(users).set({
            verified: true,
        })
        return true
    } catch (err) {
        logError(err)
        return false
    }
}

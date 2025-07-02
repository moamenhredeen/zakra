import { and, eq, isNull } from 'drizzle-orm'
import { db } from '@infrastructure/database/data-source.js'
import { users } from '@infrastructure/database/schema.js'

// -------------------------------- types --------------------------------
export type UpdateUserParams = {
    id: string
    firstName?: string
    lastName?: string
    username?: string
}

export type UpdateUserResult = {
    id: string
    username: string
    firstName: string
    lastName: string
    email: string
}

// -------------------------------- public api --------------------------------

/**
 * update user
 * @param params the updated user fields
 */
export async function updateUser(
    params: UpdateUserParams
): Promise<UpdateUserResult> {
    const rows = await db
        .update(users)
        .set({
            first_name: params.firstName || undefined,
            last_name: params.lastName || undefined,
            username: params.username || undefined,
        })
        .where(and(isNull(users.deleted_at), eq(users.id, params.id)))
        .returning()

    if (!rows || rows.length === 0) {
        throw new Error('could not update user')
    }

    const user = rows[0]
    return {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        username: user.username,
    }
}

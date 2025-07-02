import { isNull, and, eq } from 'drizzle-orm'
import { db } from '@infrastructure/database/data-source.js'
import { users } from '@infrastructure/database/schema.js'

// -----------------------  types  -----------------------
export type GetByIdResult = {
    id: string
    username: string
    firstName: string
    lastName: string
    email: string
}

// -----------------------  public api  -----------------------
/**
 * get user by id
 * @param userId the id of the user
 * @throws Error if user was not found
 */
export async function getUserById(id: string): Promise<GetByIdResult> {
    if (!id) {
        throw new Error('invalid id')
    }

    const rows = await db
        .select()
        .from(users)
        .where(and(isNull(users.deleted_at), eq(users.id, id)))

    if (!rows || rows.length === 0) {
        throw new Error('user not found')
    }

    const user = rows[0]
    return {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username,
        email: user.email,
    }
}

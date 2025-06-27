import { isNull, and, eq } from "drizzle-orm"
import { db, users } from "../../database/index.js"

/**
 * get user by id
 * @param userId the id of the user
 * @throws Error if user was not found
 */
export async function getUserById(id: number): Promise<GetByIdResult> {
    if (!id) {
        throw new Error('invalid id')
    }
    
    const rows = await db.select()
        .from(users)
        .where(and(
            isNull(users.deleted_at), 
            eq(users.id, id)
        ))
    
    if (!rows || rows.length === 0){
        throw new Error('user not found')
    }
    
    const user = rows[0]
    return {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username,
        email: user.email
    }
}


export type GetByIdResult = {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
}

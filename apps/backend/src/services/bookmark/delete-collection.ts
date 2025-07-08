import { collections } from '@infrastructure/database/schema.js'
import { db } from '@infrastructure/database/data-source.js'
import { and, eq, isNull } from 'drizzle-orm'

export async function deleteCollection(id: number): Promise<void> {
    const result = await db
        .update(collections)
        .set({ deleted_at: new Date() })
        .where(and(eq(collections.id, id), isNull(collections.deleted_at)))

    if (result.rowCount === 0) {
        throw new Error('Collection not found')
    }
}